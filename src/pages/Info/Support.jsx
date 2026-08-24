import { Link } from "react-router";
import PageHeader from "../../common/components/PageHeader";
import "./Info.css";

const WAYS = [
  {
    title: "Give money",
    body: "Cash covers the unglamorous parts — fuel, insulated bags, cold storage and coordination.",
    to: "/donate",
    label: "Donate",
  },
  {
    title: "Give food",
    body: "If you run a kitchen, your surplus is the whole point. Listing it takes under a minute.",
    to: "/restaurants",
    label: "Donate food",
  },
  {
    title: "Give time",
    body: "Collections need people. Drivers, cyclists, walkers and sorters all keep routes running.",
    to: "/volunteer",
    label: "Volunteer",
  },
  {
    title: "Give introductions",
    body: "Know a restaurant, shelter or employer who should be involved? An introduction goes further than you would think.",
    to: "/partner",
    label: "Partner with us",
  },
];

const Support = () => (
  <>
    <PageHeader
      eyebrow="Get involved"
      title="Support Us"
      description="Four ways to help, and none of them require you to be a food business."
    />

    <div className="info-page">
      <div className="container">
        <section className="info-section">
          <div className="card-grid">
            {WAYS.map(({ title, body, to, label }) => (
              <article key={title} className="card">
                <h3 className="card__title">{title}</h3>
                <p>{body}</p>
                <Link className="btn btn--secondary" to={to}>
                  {label}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section__title">Spread the word</h2>
          <p className="info-section__intro">
            A surprising amount of our growth comes from someone simply telling a
            chef or a shelter coordinator that we exist. If you have two minutes,
            that is genuinely the most useful thing you can do.
          </p>
          <div className="page-header__actions">
            <Link className="btn btn--primary" to="/blog">
              Read our stories
            </Link>
            <Link className="btn btn--secondary" to="/about">
              Learn about us
            </Link>
          </div>
        </section>
      </div>
    </div>
  </>
);

export default Support;
