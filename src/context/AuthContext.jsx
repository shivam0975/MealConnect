import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getUser,
  handleAuthCallback,
  hydrateSession,
  login as identityLogin,
  logout as identityLogout,
  onAuthChange,
  signup as identitySignup,
} from "@netlify/identity";
import { AuthContext } from "./auth-context";

/**
 * Reads the role out of the Identity user. The JWT exposes it as `roles`, but
 * fall back to app_metadata for tokens issued before the claim was added.
 */
const readRole = (user) => {
  const roles = user?.roles ?? user?.appMetadata?.roles ?? [];
  if (roles.includes("admin")) return "admin";
  if (roles.includes("ngo")) return "ngo";
  if (roles.includes("restaurant")) return "restaurant";
  return null;
};

/**
 * Wraps Netlify Identity in the shape the app needs.
 *
 * Identity is only present when the site is served by Netlify (`netlify dev`
 * locally, or a deploy). Under a plain Vite dev server every call below fails,
 * so failures are treated as "signed out" rather than being allowed to crash
 * the whole app.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        // Processes the token in the URL after an email confirmation, a
        // password recovery link, an invite, or an OAuth redirect.
        await handleAuthCallback();
        await hydrateSession();
        const current = await getUser();
        if (!cancelled) {
          setUser(current ?? null);
          setStatus(current ? "authenticated" : "anonymous");
        }
      } catch {
        if (!cancelled) {
          setUser(null);
          setStatus("anonymous");
        }
      }
    };

    bootstrap();

    // onAuthChange returns an unsubscribe callback; guard in case it does not.
    let unsubscribe;
    try {
      unsubscribe = onAuthChange((nextUser) => {
        setUser(nextUser ?? null);
        setStatus(nextUser ? "authenticated" : "anonymous");
      });
    } catch {
      unsubscribe = undefined;
    }

    return () => {
      cancelled = true;
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const nextUser = await identityLogin(email, password);
    setUser(nextUser ?? null);
    setStatus(nextUser ? "authenticated" : "anonymous");
    return nextUser;
  }, []);

  const signup = useCallback(async (email, password, { fullName, role }) => {
    // The role travels in user_metadata; the identity-signup function decides
    // what actually lands in app_metadata.roles. Anything sent from here is
    // treated as a request, not a grant.
    const nextUser = await identitySignup(email, password, {
      full_name: fullName,
      role,
    });
    setUser(nextUser ?? null);
    setStatus(nextUser ? "authenticated" : "anonymous");
    return nextUser;
  }, []);

  const logout = useCallback(async () => {
    await identityLogout();
    setUser(null);
    setStatus("anonymous");
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      role: readRole(user),
      isAuthenticated: status === "authenticated" && Boolean(user),
      login,
      signup,
      logout,
    }),
    [user, status, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
