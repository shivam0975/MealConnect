import { Link } from "react-router";
import PageHeader from "../../common/components/PageHeader";
import "./Info.css";

const ROLES = [
  {
    title: "Operations Coordinator",
    team: "Operations",
    location: "On-site",
    contract: "Full time",
    body: "Own the daily rhythm of collections across a set of neighbourhoods — matching listings to NGOs and keeping volunteer routes covered.",
  },
  {
    title: "Partnerships Manager",
    team: "Partnerships",
    location: "Hybrid",
    contract: "Full time",
    body: "Bring new restaurants, grocers and wholesalers onto the network, and keep existing partners donating consistently.",
  },
  {
    title: "Volunteer Programme Lead",
    team: "Community",
    location: "Hybrid",
    contract: "Part time",
    body: "Recruit, train and look after the volunteers who move the food. This is the role that decides whether a route survives its first month.",
  },
  {
    title: "Frontend Engineer",
    team: "Technology",
    location: "Remote",
    contract: "Full time",
    body: "Build the tools restaurants, NGOs and volunteers actually use. Small team, real users, immediate feedback.",
  },
];

const BENEFITS = [
  "Flexible hours built around collection windows, not a fixed 9-to-5",
  "A genuine four-day week for full-time roles",
  "Training and certification in food safety and handling",
  "A team that can point at the meals it moved this week",
];

const Careers = () => (
  <>
    <PageHeader
      eyebrow="Join the team"
      title="Careers"
      description="Small organisation, unusually direct feedback loop between the work you do and the meals that reach someone."
    />

    <div className="info-page">
      <div className="container">
        <section className="info-section">
          <h2 className="info-section__title">Open roles</h2>

          {ROLES.map(({ title, team, location, contract, body }) => (
            <article key={title} className="listing">
              <div className="listing__body">
                <h3>{title}</h3>
                <p>{body}</p>
                <p className="listing__meta">
                  <span>🏷️ {team}</span>
                  <span>📍 {location}</span>
                  <span>🕒 {contract}</span>
                </p>
              </div>
              <Link className="btn btn--primary" to="/contact">
                Apply
              </Link>
            </article>
          ))}
        </section>

        <section className="info-section">
          <h2 className="info-section__title">Working here</h2>
          <ul className="prose">
            {BENEFITS.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="notice">
            Nothing here fits but you still want in? Send us a note anyway —
            several of our team wrote to us before the role existed.
          </p>
        </section>
      </div>
    </div>
  </>
);

export default Careers;
