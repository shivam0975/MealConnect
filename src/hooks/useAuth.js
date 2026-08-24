import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

/**
 * Access the current Identity session. Throws rather than returning null so a
 * missing provider fails loudly instead of as a confusing TypeError.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export default useAuth;
