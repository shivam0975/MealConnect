/**
 * Netlify Identity signup event function.
 *
 * Runs server-side the moment a user registers, and decides which role they
 * get. The role the visitor picked on the signup form arrives in
 * user_metadata; this promotes it into app_metadata.roles, which is what ends
 * up in the JWT and what `user.roles` exposes to functions and to the client.
 *
 * Security note: "admin" is deliberately NOT self-assignable. A visitor can
 * only ever request "restaurant" or "ngo" — anything else falls back to
 * "restaurant". Admins must be granted in the Netlify UI
 * (Identity > user > Edit roles), so nobody can register their way to
 * moderation powers.
 */

const SELF_SERVICE_ROLES = new Set(["restaurant", "ngo"]);
const DEFAULT_ROLE = "restaurant";

export default {
  userSignup(event) {
    const requested = event.user?.userMetadata?.role;
    const role = SELF_SERVICE_ROLES.has(requested) ? requested : DEFAULT_ROLE;

    return {
      user: {
        ...event.user,
        appMetadata: {
          ...event.user.appMetadata,
          roles: [role],
        },
      },
    };
  },
};
