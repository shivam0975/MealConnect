import { useCallback, useEffect, useMemo, useState } from "react";
import { DonationsContext } from "./donations-context";
import { donationsApi } from "../lib/api";
import useAuth from "../hooks/useAuth";

/**
 * Donations are served by the Netlify Function backed by Netlify DB rather than
 * kept in localStorage. What each account can see is decided server-side from
 * its Identity role, so this provider just reflects whatever the API returns
 * for the signed-in user.
 */
export const DonationsProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    const signal = { cancelled: false };

    // Written inline rather than as a shared callback so every setState is
    // visibly after the await — no synchronous cascading render on mount.
    (async () => {
      try {
        const { donations } = await donationsApi.list();
        if (signal.cancelled) return;
        setRows(donations ?? []);
        setError("");
      } catch (loadError) {
        if (signal.cancelled) return;
        setError(loadError.message || "Could not load donations.");
      } finally {
        if (!signal.cancelled) setLoading(false);
      }
    })();

    return () => {
      signal.cancelled = true;
    };
  }, [isAuthenticated]);

  /** Manual reload, called from event handlers rather than effects. */
  const refresh = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const { donations } = await donationsApi.list();
      setRows(donations ?? []);
      setError("");
    } catch (loadError) {
      setError(loadError.message || "Could not load donations.");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const addDonation = useCallback(async (donation) => {
    const { donation: created } = await donationsApi.create(donation);
    setRows((previous) => [created, ...previous]);
    return created;
  }, []);

  const updateDonationStatus = useCallback(async (id, status) => {
    const { donation: updated } = await donationsApi.setStatus(id, status);
    setRows((previous) =>
      previous.map((donation) => (donation.id === id ? updated : donation))
    );
    return updated;
  }, []);

  const removeDonation = useCallback(async (id) => {
    await donationsApi.remove(id);
    setRows((previous) => previous.filter((donation) => donation.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      // Derived rather than cleared in an effect: signing out empties the list
      // without an extra render pass.
      donations: isAuthenticated ? rows : [],
      isLoading: isAuthenticated && loading,
      error,
      refresh,
      addDonation,
      updateDonationStatus,
      removeDonation,
    }),
    [
      isAuthenticated,
      rows,
      loading,
      error,
      refresh,
      addDonation,
      updateDonationStatus,
      removeDonation,
    ]
  );

  return (
    <DonationsContext.Provider value={value}>
      {children}
    </DonationsContext.Provider>
  );
};
