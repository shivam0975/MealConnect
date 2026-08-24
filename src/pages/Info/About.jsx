import { Link } from "react-router";
import PageHeader from "../../common/components/PageHeader";
import distributing from "../../assets/images/distributing.jpg";
import "./Info.css";

const VALUES = [
  {
    title: "Nothing good goes to waste",
    body: "Surplus food is not waste until we let it become waste. Every meal we move is a meal that would otherwise have been thrown out.",
  },
  {
    title: "Dignity first",
    body: "The people we serve are neighbours, not statistics. Food arrives fresh, safe and presented the way anyone would want to receive it.",
  },
  {
    title: "Local by design",
    body: "Food is collected and delivered within the same community, so donations reach the people living closest to where the surplus appeared.",
  },
  {
    title: "Open about our numbers",
    body: "Restaurants and partners can see what they contributed and where it went. Impact should be measurable, not merely claimed.",
  },
];

const METRICS = [
  { value: "1,000,000+", label: "Meals distributed" },
  { value: "500+", label: "Partner restaurants" },
  { value: "250+", label: "NGOs supported" },
  { value: "2,000+", label: "Active volunteers" },
];

const About = () => (
  <>
    <PageHeader
      eyebrow="About us"
      title="Who We Are"
      description="MealConnect links restaurants with surplus food to the NGOs and shelters feeding their communities — before that food goes in a bin."
    />

    <div className="info-page">
      <div className="container">
        <section className="info-section info-split">
          <div>
            <h2>Our story</h2>
            <p>
              MealConnect started with a simple, uncomfortable observation: on the
              same street, one kitchen was throwing away trays of untouched food
              while a shelter two blocks away was turning people away.
            </p>
            <p>
              The problem was never supply. It was coordination — nobody could
              reliably match food that existed right now with the people who
              needed it right now. So we built the thing that connects them: a
              place for restaurants to post surplus, for NGOs to claim it, and
              for volunteers to move it.
            </p>
            <p>
              Today that network spans hundreds of kitchens and community
              organisations, and every one of them is solving the same local
              problem we started with.
            </p>
          </div>
          <img
            src={distributing}
            alt="Volunteers distributing food to community members"
            loading="lazy"
          />
        </section>

        <section className="info-section">
          <h2 className="info-section__title">What we stand for</h2>
          <div className="card-grid">
            {VALUES.map(({ title, body }) => (
              <article key={title} className="value-card">
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section__title">Where we are today</h2>
          <div className="metric-grid">
            {METRICS.map(({ value, label }) => (
              <div key={label} className="metric">
                <span className="metric__value">{value}</span>
                <p className="metric__label">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="info-section" style={{ textAlign: "center" }}>
          <h2>Want to be part of it?</h2>
          <p className="info-section__intro">
            Whether you run a kitchen, coordinate an NGO or have a free afternoon,
            there is a way in.
          </p>
          <div className="page-header__actions">
            <Link className="btn btn--primary" to="/restaurants">
              Donate surplus food
            </Link>
            <Link className="btn btn--secondary" to="/volunteer">
              Volunteer with us
            </Link>
          </div>
        </section>
      </div>
    </div>
  </>
);

export default About;
