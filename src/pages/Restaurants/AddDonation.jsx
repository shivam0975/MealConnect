import { useState } from "react";
import { useNavigate } from "react-router";
import PageHeader from "../../common/components/PageHeader";
import useDonations from "../../hooks/useDonations";
import "./AddDonation.css";

const EMPTY_FORM = {
  restaurantName: "",
  foodType: "",
  quantity: "",
  pickupTime: "",
  additionalNotes: "",
};

const AddDonation = () => {
  const [donationData, setDonationData] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { addDonation } = useDonations();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDonationData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // The inputs are `required`, but a trimmed check also rejects whitespace.
    const missing = ["restaurantName", "foodType", "quantity", "pickupTime"]
      .filter((field) => !donationData[field].trim());

    if (missing.length > 0) {
      setError("Please fill in every required field before submitting.");
      return;
    }

    setBusy(true);
    setError("");
    try {
      await addDonation(donationData);
      navigate("/restaurants");
    } catch (submitError) {
      // The server re-validates and re-checks the role, so it can reject even
      // when the client-side checks passed.
      setError(submitError.message || "Could not save that donation.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="For restaurants"
        title="Add New Food Donation"
        description="Tell us what is available and when it can be collected. A verified volunteer will handle the pickup."
      />

      <div className="dashboard">
        <div className="container container--narrow">
          <form onSubmit={handleSubmit} className="donation-form card" noValidate>
            {error && (
              <p className="form-status form-status--error" role="alert">
                {error}
              </p>
            )}

            <label className="field">
              <span className="field__label">Restaurant Name</span>
              <input
                className="field__control"
                type="text"
                name="restaurantName"
                value={donationData.restaurantName}
                onChange={handleInputChange}
                autoComplete="organization"
                required
              />
            </label>

            <label className="field">
              <span className="field__label">Type of Food</span>
              <input
                className="field__control"
                type="text"
                name="foodType"
                value={donationData.foodType}
                onChange={handleInputChange}
                required
              />
            </label>

            <label className="field">
              <span className="field__label">Quantity</span>
              <input
                className="field__control"
                type="text"
                name="quantity"
                value={donationData.quantity}
                onChange={handleInputChange}
                required
              />
              <span className="field__hint">For example: 10 meals, 3 trays</span>
            </label>

            <label className="field">
              <span className="field__label">Pickup Time</span>
              <input
                className="field__control"
                type="time"
                name="pickupTime"
                value={donationData.pickupTime}
                onChange={handleInputChange}
                required
              />
            </label>

            <label className="field">
              <span className="field__label">Additional Notes</span>
              <textarea
                className="field__control"
                name="additionalNotes"
                value={donationData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Allergens, packaging, where to collect from..."
              />
            </label>

            <button
              type="submit"
              className="btn btn--primary btn--block"
              disabled={busy}
            >
              {busy ? "Saving…" : "Submit Donation"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDonation;
