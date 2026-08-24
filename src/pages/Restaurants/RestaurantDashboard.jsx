import { useState } from "react";
import { Link } from "react-router";
import PageHeader from "../../common/components/PageHeader";
import EmptyState from "../../common/components/EmptyState";
import DonationCard from "../../common/components/DonationCard";
import Spinner from "../../common/components/Spinner";
import useDonations from "../../hooks/useDonations";
import useAuth from "../../hooks/useAuth";

/**
 * Restaurant view: what have I listed, what is still waiting for collection,
 * and what happened to it. The API only ever returns this account's own rows.
 */
const RestaurantDashboard = () => {
  const { donations, isLoading, error, removeDonation } = useDonations();
  const { user } = useAuth();
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState("");

  const pending = donations.filter((d) => d.status === "Pending");
  const claimed = donations.filter((d) => d.status === "Accepted");
  const collected = donations.filter((d) => d.status === "Collected");

  const handleRemove = async (id) => {
    setBusyId(id);
    setActionError("");
    try {
      await removeDonation(id);
    } catch (removeError) {
      setActionError(removeError.message || "Could not remove that listing.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Restaurant"
        title="Restaurant Dashboard"
        description={
          user?.userMetadata?.full_name
            ? `Signed in as ${user.userMetadata.full_name}. Manage your food donations and track recent activity.`
            : "Manage your food donations and track recent activity."
        }
      >
        <Link className="btn btn--primary" to="/add-donation">
          Add New Donation
        </Link>
      </PageHeader>

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
              <span className="stat-card__value">{donations.length}</span>
              <p className="stat-card__label">Total listings</p>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">{pending.length}</span>
              <p className="stat-card__label">Awaiting a claim</p>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">{claimed.length}</span>
              <p className="stat-card__label">Claimed</p>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">{collected.length}</span>
              <p className="stat-card__label">Collected</p>
            </div>
          </div>

          {isLoading ? (
            <Spinner label="Loading your listings…" />
          ) : (
            <>
              <section className="dashboard__section">
                <h2 className="dashboard__section-title">Awaiting a claim</h2>
                {pending.length === 0 ? (
                  <EmptyState
                    title="Nothing waiting"
                    description="Surplus at the end of service? List it and an NGO nearby can claim it."
                    action={
                      <Link className="btn btn--primary" to="/add-donation">
                        Add a donation
                      </Link>
                    }
                  />
                ) : (
                  <ul className="donation-list">
                    {pending.map((donation) => (
                      <li key={donation.id}>
                        <DonationCard
                          donation={donation}
                          actions={
                            /* Only unclaimed listings can be withdrawn — once an
                               NGO has planned around it, pulling it silently
                               would be worse than leaving it up. */
                            <button
                              type="button"
                              className="btn btn--sm btn--danger"
                              disabled={busyId === donation.id}
                              onClick={() => handleRemove(donation.id)}
                            >
                              {busyId === donation.id ? "Removing…" : "Withdraw"}
                            </button>
                          }
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="dashboard__section">
                <h2 className="dashboard__section-title">Recent activity</h2>
                {donations.length === 0 ? (
                  <EmptyState
                    title="No donations yet"
                    description="Everything you list will appear here with its current status."
                  />
                ) : (
                  <ul className="donation-list">
                    {donations.slice(0, 8).map((donation) => (
                      <li key={donation.id}>
                        <DonationCard donation={donation} />
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

export default RestaurantDashboard;
