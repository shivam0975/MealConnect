import { useContext } from "react";
import { DonationsContext } from "../context/donations-context";

/**
 * Access the shared donations store. Throws rather than returning null so a
 * missing provider surfaces immediately instead of as a confusing TypeError.
 */
export function useDonations() {
  const context = useContext(DonationsContext);

  if (!context) {
    throw new Error("useDonations must be used within a DonationsProvider");
  }

  return context;
}

export default useDonations;
