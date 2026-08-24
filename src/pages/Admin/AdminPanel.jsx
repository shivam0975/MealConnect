import { Link } from "react-router";
import PageHeader from "../../common/components/PageHeader";
import EmptyState from "../../common/components/EmptyState";
import DonationCard from "../../common/components/DonationCard";
import Spinner from "../../common/components/Spinner";
import useDonations from "../../hooks/useDonations";

/**
 * Admin view: the whole network at a glance. Admins are the only role the API
 * returns every row to, regardless of owner or claim.
 */
const AdminPanel = () => {
  const { donations, isLoading, error } = useDonations();

  const count = (status) => donations.filter((d) => d.status === status).length;
  const pending = count("Pending");

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Admin Panel"
        description="Moderate listings, keep an eye on the network and check platform activity."
      >
        <Link className="btn btn--primary" to="/manage-donations">
          Open moderation queue
        </Link>
      </PageHeader>

      <div className="dashboard">
        <div className="container">
          {error && (
            <p className="form-status form-status--error" role="alert">
              {error}
            </p>
          )}

          <div className="card-grid">
            <div className="stat-card">
              <span className="stat-card__value">{donations.length}</span>
              <p className="stat-card__label">Total listings</p>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">{pending}</span>
              <p className="stat-card__label">Awaiting moderation</p>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">{count("Accepted")}</span>
              <p className="stat-card__label">Claimed</p>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">{count("Collected")}</span>
              <p className="stat-card__label">Collected</p>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">{count("Rejected")}</span>
              <p className="stat-card__label">Declined</p>
            </div>
          </div>

          <section className="dashboard__section">
            <h2 className="dashboard__section-title">Administration</h2>
            <div className="card-grid">
              <article className="card">
                <h3 className="card__title">Moderate food listings</h3>
                <p>
                  {pending > 0
                    ? `${pending} listing${pending === 1 ? "" : "s"} waiting for a decision.`
                    : "Nothing is waiting for a decision right now."}
                </p>
                <Link className="btn btn--primary" to="/manage-donations">
                  Open the queue
                </Link>
              </article>

              <article className="card">
                <h3 className="card__title">Manage users and roles</h3>
                <p>
                  Accounts and roles live in Netlify Identity. Grant the{" "}
                  <code>admin</code> role from your Netlify project under
                  Identity, then edit the user&rsquo;s roles — it cannot be
                  self-assigned at signup.
                </p>
                <a
                  className="btn btn--secondary"
                  href="https://app.netlify.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Netlify
                </a>
              </article>

              <article className="card">
                <h3 className="card__title">Form submissions</h3>
                <p>
                  Contact and volunteer enquiries are captured by Netlify Forms
                  and listed under Forms in your Netlify project.
                </p>
                <a
                  className="btn btn--secondary"
                  href="https://app.netlify.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View submissions
                </a>
              </article>
            </div>
          </section>

          <section className="dashboard__section">
            <h2 className="dashboard__section-title">Latest across the network</h2>
            {isLoading ? (
              <Spinner label="Loading activity…" />
            ) : donations.length === 0 ? (
              <EmptyState
                title="No activity yet"
                description="Listings from every partner restaurant will appear here."
              />
            ) : (
              <ul className="donation-list">
                {donations.slice(0, 6).map((donation) => (
                  <li key={donation.id}>
                    <DonationCard donation={donation} showOwner />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
