import { createContext } from "react";

/**
 * Kept in its own module so DonationsContext.jsx exports only a component —
 * mixing a component and a non-component export in one file breaks React Fast
 * Refresh for that file.
 */
export const DonationsContext = createContext(null);
