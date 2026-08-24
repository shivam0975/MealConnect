import { useState } from "react";
import PageHeader from "../../common/components/PageHeader";
import { submitNetlifyForm } from "../../lib/netlifyForms";
import "./VolunteerSignup.css";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  availability: "",
  interests: "",
};

const BENEFITS = [
  "Make a positive impact in your community.",
  "Learn about food waste reduction and sustainability.",
  "Meet like-minded individuals and form lasting friendships.",
  "Receive community service hours and recommendations.",
];

const VolunteerSignup = () => {
  const [volunteerData, setVolunteerData] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVolunteerData((previous) => ({ ...previous, [name]: value }));
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      await submitNetlifyForm("volunteer", volunteerData);
      setSubmitted(true);
      setVolunteerData(EMPTY_FORM);
    } catch (submitError) {
      setError(
        submitError.message || "Could not send that. Please try again shortly."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Volunteer"
        title="Join Us as a Volunteer!"
        description="Become a part of our mission to reduce food waste and help those in need. Together, we can make a difference in our community."
      />

      <div className="volunteer-page">
        <div className="container">
          <div className="volunteer-grid">
            <section className="card volunteer-card">
              <h2 className="card__title">Why Volunteer with Us?</h2>
              <ul className="volunteer-benefits">
                {BENEFITS.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </section>

            <section className="card volunteer-card">
              <h2 className="card__title">Volunteer Signup Form</h2>

              {submitted && (
                <p className="form-status form-status--success" role="status">
                  Thanks for signing up. We will be in touch about a collection
                  route near you.
                </p>
              )}

              {error && (
                <p className="form-status form-status--error" role="alert">
                  {error}
                </p>
              )}

              <form
                name="volunteer"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="volunteer" />
                <p hidden>
                  <label>
                    Leave this empty
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>
                <label className="field" htmlFor="name">
                  <span className="field__label">Full Name</span>
                  <input
                    className="field__control"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Full Name"
                    value={volunteerData.name}
                    onChange={handleInputChange}
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="field" htmlFor="email">
                  <span className="field__label">Email</span>
                  <input
                    className="field__control"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={volunteerData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="field" htmlFor="phone">
                  <span className="field__label">Phone Number</span>
                  <input
                    className="field__control"
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={volunteerData.phone}
                    onChange={handleInputChange}
                    autoComplete="tel"
                    required
                  />
                </label>

                <label className="field" htmlFor="availability">
                  <span className="field__label">Availability</span>
                  <select
                    className="field__control"
                    id="availability"
                    name="availability"
                    value={volunteerData.availability}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Your Availability</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </label>

                <label className="field" htmlFor="interests">
                  <span className="field__label">Areas of Interest</span>
                  {/* This was previously uncontrolled — it had no value or
                      onChange, so whatever the volunteer typed was discarded. */}
                  <textarea
                    className="field__control"
                    id="interests"
                    name="interests"
                    rows="3"
                    placeholder="Tell us about your interests"
                    value={volunteerData.interests}
                    onChange={handleInputChange}
                  />
                </label>

                <button
                  type="submit"
                  className="btn btn--primary btn--block"
                  disabled={busy}
                >
                  {busy ? "Sending…" : "Sign Up Now"}
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteerSignup;
