import { useState } from "react";
import PageHeader from "../../common/components/PageHeader";
import EmptyState from "../../common/components/EmptyState";
import DonationCard from "../../common/components/DonationCard";
import Spinner from "../../common/components/Spinner";
import useDonations from "../../hooks/useDonations";
import useAuth from "../../hooks/useAuth";

/**
 * NGO view: claim what is available, then work through what you claimed.
 * The API returns Pending listings from every restaurant plus this NGO's own
 * claims — never another organisation's.
 */
const NGODashboard = () => {
  const { donations, isLoading, error, updateDonationStatus } = useDonations();
  const { user } = useAuth();
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState("");

  const available = donations.filter((d) => d.status === "Pending");
  const ours = donations.filter((d) => d.claimedBy === user?.id);
  const inProgress = ours.filter((d) => d.status === "Accepted");
  const collected = ours.filter((d) => d.status === "Collected");

  const run = async (id, status) => {
    setBusyId(id);
    setActionError("");
    try {
      await updateDonationStatus(id, status);
    } catch (updateError) {
      setActionError(updateError.message || "Could not update that donation.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="NGO"
        title="NGO Dashboard"
        description="Claim donations that fit the meals you are cooking, then mark them collected once they are picked up."
      />

      <div className="dashboard">
        <div className="container">
          {error && (
            <p className="form-status form-status--error" role="alert">
              {error}
            </p>
          )}
          {actionError && (
            <p className="form-status form-status--error" role="alert">
              {actionError}
            </p>
          )}

          <div className="card-grid">
            <div className="stat-card">
              <span className="stat-card__value">{available.length}</span>
              <p className="stat-card__label">Available now</p>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">{inProgress.length}</span>
              <p className="stat-card__label">Claimed by you</p>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">{collected.length}</span>
              <p className="stat-card__label">Collected</p>
            </div>
          </div>

          {isLoading ? (
            <Spinner label="Looking for donations near you…" />
          ) : (
            <>
              <section className="dashboard__section">
                <h2 className="dashboard__section-title">Available to claim</h2>
                {available.length === 0 ? (
                  <EmptyState
                    title="Nothing available right now"
                    description="When a partner restaurant lists surplus food it will show up here straight away."
                  />
                ) : (
                  <ul className="donation-list">
                    {available.map((donation) => (
                      <li key={donation.id}>
                        <DonationCard
                          donation={donation}
                          showOwner
                          actions={
                            <button
                              type="button"
                              className="btn btn--sm btn--primary"
                              disabled={busyId === donation.id}
                              onClick={() => run(donation.id, "Accepted")}
                            >
                              {busyId === donation.id ? "Claiming…" : "Claim"}
                            </button>
                          }
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="dashboard__section">
                <h2 className="dashboard__section-title">Your claims</h2>
                {inProgress.length === 0 ? (
                  <EmptyState
                    title="You have not claimed anything yet"
                    description="Claimed donations stay here until you mark them collected."
                  />
                ) : (
                  <ul className="donation-list">
                    {inProgress.map((donation) => (
                      <li key={donation.id}>
                        <DonationCard
                          donation={donation}
                          showOwner
                          actions={
                            <>
                              <button
                                type="button"
                                className="btn btn--sm btn--primary"
                                disabled={busyId === donation.id}
                                onClick={() => run(donation.id, "Collected")}
                              >
                                {busyId === donation.id
                                  ? "Saving…"
                                  : "Mark collected"}
                              </button>
                              {/* Releasing puts it back in the shared pool for
                                  another NGO rather than losing the listing. */}
                              <button
                                type="button"
                                className="btn btn--sm btn--secondary"
                                disabled={busyId === donation.id}
                                onClick={() => run(donation.id, "Pending")}
                              >
                                Release
                              </button>
                            </>
                          }
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NGODashboard;
