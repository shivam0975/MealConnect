/** Where each role lands when it has no more specific destination. */
export const ROLE_HOME = {
  restaurant: "/restaurants",
  ngo: "/ngos",
  admin: "/admin",
};

/**
 * Roles a visitor may choose for themselves at signup. "admin" is deliberately
 * absent — it is granted from the Netlify Identity UI, never self-claimed. The
 * identity-signup function enforces the same list server-side.
 */
export const SELF_SERVICE_ROLES = ["restaurant", "ngo"];
