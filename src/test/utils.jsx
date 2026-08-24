import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import App from "../App";
import { AuthProvider } from "../context/AuthContext";
import { DonationsProvider } from "../context/DonationsContext";

/**
 * Build a Netlify Identity user object of the shape @netlify/identity returns.
 */
export const makeUser = ({ role, id = "user-1", email = "user@example.com" }) => ({
  id,
  email,
  roles: role ? [role] : [],
  appMetadata: { roles: role ? [role] : [] },
  userMetadata: { full_name: "Test User", role },
});

export const makeDonation = (overrides = {}) => ({
  id: "donation-1",
  ownerId: "user-1",
  restaurantName: "Test Kitchen",
  foodType: "Pasta",
  quantity: "12 meals",
  pickupTime: "18:30",
  additionalNotes: null,
  status: "Pending",
  claimedBy: null,
  claimedByName: null,
  createdAt: "2026-08-01T10:00:00.000Z",
  updatedAt: "2026-08-01T10:00:00.000Z",
  ...overrides,
});

/**
 * Stub the donations API at the fetch layer, so the real client in lib/api.js
 * (URL building, error handling) is exercised rather than mocked away.
 */
export const mockDonationsFetch = (donations = []) => {
  const fetchMock = vi.fn(async (url, options = {}) => {
    const method = options.method ?? "GET";
    const body = options.body ? JSON.parse(options.body) : null;

    const respond = (payload, status = 200) => ({
      ok: status >= 200 && status < 300,
      status,
      json: async () => payload,
    });

    if (method === "GET") return respond({ donations });
    if (method === "POST") {
      return respond({ donation: makeDonation({ ...body, id: "created-1" }) }, 201);
    }
    if (method === "PATCH") {
      const existing = donations.find((d) => d.id === body.id);
      return respond({ donation: { ...existing, status: body.status } });
    }
    if (method === "DELETE") return respond({ id: String(url) });
    return respond({ error: "unexpected" }, 405);
  });

  globalThis.fetch = fetchMock;
  return fetchMock;
};

export const renderApp = (path = "/") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <DonationsProvider>
          <App />
        </DonationsProvider>
      </AuthProvider>
    </MemoryRouter>
  );
