import { Link } from "react-router";
import PageHeader from "../../common/components/PageHeader";
import "./Info.css";

const PARTNER_TYPES = [
  {
    title: "Restaurants & cafés",
    body: "Post surplus at the end of service and have it collected within your chosen window. No cost, no change to your kitchen routine.",
    cta: { to: "/restaurants", label: "Start donating" },
  },
  {
    title: "Grocers & wholesalers",
    body: "Move short-dated stock and cosmetically imperfect produce in bulk instead of paying to dispose of it.",
    cta: { to: "/contact", label: "Talk to us" },
  },
  {
    title: "NGOs & shelters",
    body: "See what is available near you in real time and claim what fits the meals you are already cooking.",
    cta: { to: "/ngos", label: "Join as an NGO" },
  },
  {
    title: "Employers & teams",
    body: "Run a team volunteering day on a collection route, or sponsor a neighbourhood route for a year.",
    cta: { to: "/support", label: "Support us" },
  },
];

const STEPS = [
  "Tell us who you are and roughly how much surplus you expect in a normal week.",
  "We check food handling arrangements and get you set up — usually within two working days.",
  "You post your first listing, and a verified volunteer collects it.",
];

const Partner = () => (
  <>
    <PageHeader
      eyebrow="Partnerships"
      title="Partner with Us"
      description="Every partner closes the gap between food that exists and people who need it. Here is where you might fit."
    />

    <div className="info-page">
      <div className="container">
        <section className="info-section">
          <div className="card-grid">
            {PARTNER_TYPES.map(({ title, body, cta }) => (
              <article key={title} className="card">
                <h3 className="card__title">{title}</h3>
                <p>{body}</p>
                <Link className="btn btn--secondary" to={cta.to}>
                  {cta.label}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section__title">How onboarding works</h2>
          <ol className="prose">
            {STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="info-section" style={{ textAlign: "center" }}>
          <h2>Ready to talk?</h2>
          <p className="info-section__intro">
            Send us a note about your organisation and we will come back to you
            with the right next step.
          </p>
          <Link className="btn btn--primary" to="/contact">
            Contact the partnerships team
          </Link>
        </section>
      </div>
    </div>
  </>
);

export default Partner;
