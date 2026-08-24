import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import PageHeader from "../../common/components/PageHeader";
import { submitNetlifyForm } from "../../lib/netlifyForms";
import "./Contact.css";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

const SOCIAL_LINKS = [
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://twitter.com", label: "Twitter", Icon: FaTwitter },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
];

const Contact = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      // Goes to Netlify Forms; submissions appear under Forms in the Netlify
      // project. The matching hidden form lives in index.html.
      await submitNetlifyForm("contact", formData);
      setSubmitted(true);
      setFormData(EMPTY_FORM);
    } catch (submitError) {
      setError(
        submitError.message ||
          "Could not send that message. Please email us instead."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch with Us"
        description="Have questions or want to learn more about our work in reducing food waste and supporting communities? Reach out — we'd love to hear from you."
      />

      <div className="contact-page">
        <div className="container">
          <div className="contact-grid">
            <section className="card contact-card">
              <h2 className="card__title">Send Us a Message</h2>

              {submitted && (
                <p className="form-status form-status--success" role="status">
                  Thanks — your message is on its way. We usually reply within
                  two working days.
                </p>
              )}

              {error && (
                <p className="form-status form-status--error" role="alert">
                  {error}
                </p>
              )}

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                {/* Mirrors the hidden form in index.html so a no-JS submit still
                    reaches the right Netlify form. */}
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>
                    Leave this empty
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>
                <label className="field">
                  <span className="field__label">Name</span>
                  <input
                    className="field__control"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="field">
                  <span className="field__label">Email</span>
                  <input
                    className="field__control"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="field">
                  <span className="field__label">Subject</span>
                  <input
                    className="field__control"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                  />
                </label>

                <label className="field">
                  <span className="field__label">Message</span>
                  <textarea
                    className="field__control"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="btn btn--primary btn--block"
                  disabled={busy}
                >
                  {busy ? "Sending…" : "Submit"}
                </button>
              </form>
            </section>

            <section className="card contact-card">
              <h2 className="card__title">Contact Information</h2>
              <ul className="contact-details">
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@mealconnect.org">info@mealconnect.org</a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+11234567890">+1 (123) 456-7890</a>
                </li>
                <li>
                  <strong>Address:</strong> 123 Charity Lane, City, State, ZIP
                </li>
              </ul>

              <h3 className="contact-social-heading">Connect with Us</h3>
              <ul className="contact-social">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
