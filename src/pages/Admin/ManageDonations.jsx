import { useState } from "react";
import PageHeader from "../../common/components/PageHeader";
import EmptyState from "../../common/components/EmptyState";
import Spinner from "../../common/components/Spinner";
import useDonations from "../../hooks/useDonations";

/**
 * Admin moderation queue. Admins can move a listing to any status and remove
 * one outright; the function re-checks the role before applying either.
 */
const ManageDonations = () => {
  const { donations, isLoading, error, updateDonationStatus, removeDonation } =
    useDonations();
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState("");

  const act = async (id, work) => {
    setBusyId(id);
    setActionError("");
    try {
      await work();
    } catch (workError) {
      setActionError(workError.message || "That action failed.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Manage Donations"
        description="Approve or decline the food listings waiting in the queue."
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

          {isLoading ? (
            <Spinner label="Loading the queue…" />
          ) : donations.length === 0 ? (
            <EmptyState
              title="The queue is empty"
              description="Listings submitted by partner restaurants show up here for moderation."
            />
          ) : (
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Food Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Claimed by</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => {
                    const busy = busyId === donation.id;
                    return (
                      <tr key={donation.id}>
                        <td>{donation.restaurantName}</td>
                        <td>{donation.foodType}</td>
                        <td>{donation.quantity}</td>
                        <td>{donation.claimedByName ?? "—"}</td>
                        <td>
                          <span
                            className={`status status--${donation.status.toLowerCase()}`}
                          >
                            {donation.status}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            {donation.status === "Pending" ? (
                              <>
                                <button
                                  type="button"
                                  className="btn btn--sm btn--primary"
                                  disabled={busy}
                                  onClick={() =>
                                    act(donation.id, () =>
                                      updateDonationStatus(donation.id, "Accepted")
                                    )
                                  }
                                >
                                  Accept
                                </button>
                                <button
                                  type="button"
                                  className="btn btn--sm btn--danger"
                                  disabled={busy}
                                  onClick={() =>
                                    act(donation.id, () =>
                                      updateDonationStatus(donation.id, "Rejected")
                                    )
                                  }
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                className="btn btn--sm btn--secondary"
                                disabled={busy}
                                onClick={() =>
                                  act(donation.id, () =>
                                    updateDonationStatus(donation.id, "Pending")
                                  )
                                }
                              >
                                Undo
                              </button>
                            )}
                            <button
                              type="button"
                              className="btn btn--sm btn--danger"
                              disabled={busy}
                              onClick={() =>
                                act(donation.id, () => removeDonation(donation.id))
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageDonations;
