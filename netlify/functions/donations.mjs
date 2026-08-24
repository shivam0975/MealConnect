import { getDatabase } from "@netlify/database";
import { getUser } from "@netlify/identity";

/**
 * Donations API.
 *
 *   GET    /api/donations        list, scoped to what the caller's role may see
 *   POST   /api/donations        create a listing            (restaurant)
 *   PATCH  /api/donations        change a listing's status   (ngo | admin)
 *   DELETE /api/donations?id=..  remove a listing            (owner | admin)
 *
 * Every branch re-checks the caller's role against the database row. The
 * client-side route guards are a UX convenience only — this is the boundary
 * that actually enforces access.
 */

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const VALID_STATUSES = ["Pending", "Accepted", "Rejected", "Collected"];

/** Postgres rows come back snake_case; the client works in camelCase. */
const toDonation = (row) => ({
  id: row.id,
  ownerId: row.owner_id,
  restaurantName: row.restaurant_name,
  foodType: row.food_type,
  quantity: row.quantity,
  pickupTime: row.pickup_time,
  additionalNotes: row.additional_notes,
  status: row.status,
  claimedBy: row.claimed_by,
  claimedByName: row.claimed_by_name,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const roleOf = (user) => {
  const roles = user.roles ?? [];
  if (roles.includes("admin")) return "admin";
  if (roles.includes("ngo")) return "ngo";
  if (roles.includes("restaurant")) return "restaurant";
  return null;
};

export default async (req) => {
  const user = await getUser();
  if (!user) return json({ error: "Not signed in." }, 401);

  const role = roleOf(user);
  if (!role) {
    return json(
      { error: "Your account has no role assigned. Contact an administrator." },
      403
    );
  }

  const db = getDatabase();

  try {
    switch (req.method) {
      case "GET":
        return await listDonations(db, user, role);
      case "POST":
        return await createDonation(db, req, user, role);
      case "PATCH":
        return await updateStatus(db, req, user, role);
      case "DELETE":
        return await deleteDonation(db, req, user, role);
      default:
        return json({ error: `${req.method} not supported.` }, 405);
    }
  } catch (error) {
    // Log the detail server-side; return something generic to the caller so
    // database internals are not leaked to the browser.
    console.error("donations function failed", error);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
};

async function listDonations(db, user, role) {
  let rows;

  if (role === "admin") {
    rows = await db.sql`
      SELECT * FROM donations ORDER BY created_at DESC
    `;
  } else if (role === "ngo") {
    // NGOs see what is still available plus anything they claimed themselves.
    rows = await db.sql`
      SELECT * FROM donations
      WHERE status = 'Pending' OR claimed_by = ${user.id}
      ORDER BY created_at DESC
    `;
  } else {
    // Restaurants only ever see their own listings.
    rows = await db.sql`
      SELECT * FROM donations
      WHERE owner_id = ${user.id}
      ORDER BY created_at DESC
    `;
  }

  return json({ donations: rows.map(toDonation) });
}

async function createDonation(db, req, user, role) {
  if (role !== "restaurant") {
    return json({ error: "Only restaurant accounts can list food." }, 403);
  }

  const body = await req.json().catch(() => null);
  if (!body) return json({ error: "Expected a JSON body." }, 400);

  const restaurantName = String(body.restaurantName ?? "").trim();
  const foodType = String(body.foodType ?? "").trim();
  const quantity = String(body.quantity ?? "").trim();
  const pickupTime = String(body.pickupTime ?? "").trim();
  const additionalNotes = String(body.additionalNotes ?? "").trim() || null;

  if (!restaurantName || !foodType || !quantity || !pickupTime) {
    return json(
      { error: "Restaurant name, food type, quantity and pickup time are required." },
      400
    );
  }

  const [row] = await db.sql`
    INSERT INTO donations
      (owner_id, restaurant_name, food_type, quantity, pickup_time, additional_notes)
    VALUES
      (${user.id}, ${restaurantName}, ${foodType}, ${quantity}, ${pickupTime}, ${additionalNotes})
    RETURNING *
  `;

  return json({ donation: toDonation(row) }, 201);
}

async function updateStatus(db, req, user, role) {
  const body = await req.json().catch(() => null);
  if (!body) return json({ error: "Expected a JSON body." }, 400);

  const { id, status } = body;
  if (!id || !VALID_STATUSES.includes(status)) {
    return json(
      { error: `id is required and status must be one of: ${VALID_STATUSES.join(", ")}.` },
      400
    );
  }

  const [existing] = await db.sql`SELECT * FROM donations WHERE id = ${id}`;
  if (!existing) return json({ error: "Donation not found." }, 404);

  if (role === "restaurant") {
    return json({ error: "Restaurants cannot change a listing's status." }, 403);
  }

  if (role === "ngo") {
    const isClaimable = existing.status === "Pending" && status === "Accepted";
    const isOwnClaim = existing.claimed_by === user.id;

    if (!isClaimable && !isOwnClaim) {
      return json(
        { error: "You can only claim available donations or update your own." },
        403
      );
    }

    // Claiming stamps the NGO onto the row so nobody else can take it.
    const claimedBy = isClaimable ? user.id : existing.claimed_by;
    const claimedByName = isClaimable
      ? user.userMetadata?.full_name || user.email
      : existing.claimed_by_name;

    const [row] = await db.sql`
      UPDATE donations
      SET status = ${status},
          claimed_by = ${claimedBy},
          claimed_by_name = ${claimedByName},
          updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;
    return json({ donation: toDonation(row) });
  }

  // Admin: may set any status, and clears the claim when sending a listing back
  // to the pool.
  const clearClaim = status === "Pending" || status === "Rejected";
  const [row] = await db.sql`
    UPDATE donations
    SET status = ${status},
        claimed_by = ${clearClaim ? null : existing.claimed_by},
        claimed_by_name = ${clearClaim ? null : existing.claimed_by_name},
        updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `;
  return json({ donation: toDonation(row) });
}

async function deleteDonation(db, req, user, role) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return json({ error: "An id query parameter is required." }, 400);

  const [existing] = await db.sql`SELECT * FROM donations WHERE id = ${id}`;
  if (!existing) return json({ error: "Donation not found." }, 404);

  const isOwner = existing.owner_id === user.id;
  if (role !== "admin" && !isOwner) {
    return json({ error: "You can only remove your own listings." }, 403);
  }

  await db.sql`DELETE FROM donations WHERE id = ${id}`;
  return json({ id });
}
