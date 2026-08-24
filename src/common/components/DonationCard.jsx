import "./DonationCard.css";

const formatWhen = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

/**
 * One donation, rendered the same way on all three dashboards. `actions` lets
 * each role hang its own buttons off the card without forking the markup.
 */
const DonationCard = ({ donation, showOwner = false, actions }) => {
  const listed = formatWhen(donation.createdAt);

  return (
    <article className="donation-card card">
      <div className="donation-card__body">
        <h3 className="card__title">{donation.foodType}</h3>

        {showOwner && (
          <p className="donation-card__owner">{donation.restaurantName}</p>
        )}

        <p className="donation-card__meta">
          <span>Quantity: {donation.quantity}</span>
          <span>Pickup: {donation.pickupTime}</span>
          {listed && <span>Listed: {listed}</span>}
        </p>

        {donation.additionalNotes && (
          <p className="donation-card__notes">{donation.additionalNotes}</p>
        )}

        {donation.claimedByName && (
          <p className="donation-card__claim">
            Claimed by {donation.claimedByName}
          </p>
        )}
      </div>

      <div className="donation-card__side">
        <span className={`status status--${donation.status.toLowerCase()}`}>
          {donation.status}
        </span>
        {actions && <div className="donation-card__actions">{actions}</div>}
      </div>
    </article>
  );
};

export default DonationCard;
