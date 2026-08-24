import { createContext } from "react";

/**
 * Kept separate from AuthContext.jsx so that file exports only a component and
 * React Fast Refresh keeps working.
 */
export const AuthContext = createContext(null);
