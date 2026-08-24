import { Link } from "react-router";
import PageHeader from "../../common/components/PageHeader";
import "./Info.css";

const EVENTS = [
  {
    title: "Community Kitchen Day",
    date: "12 September 2026",
    location: "Riverside Community Centre",
    type: "Volunteering",
    body: "Cook and serve alongside our partner shelters. No experience needed — there is a job for everyone from chopping to washing up.",
  },
  {
    title: "Restaurant Partner Breakfast",
    date: "26 September 2026",
    location: "The Old Exchange",
    type: "Networking",
    body: "An early breakfast for kitchens already donating and any considering it. Come and ask our existing partners what it actually involves.",
  },
  {
    title: "Zero Waste Workshop",
    date: "10 October 2026",
    location: "Online",
    type: "Workshop",
    body: "A practical session on cutting kitchen waste before it happens — portioning, prep planning and stock rotation.",
  },
  {
    title: "Winter Food Drive",
    date: "21 November 2026",
    location: "Citywide",
    type: "Campaign",
    body: "Our biggest collection of the year, ahead of the coldest months. We need drivers, sorters and packers across every neighbourhood.",
  },
];

const Events = () => (
  <>
    <PageHeader
      eyebrow="What's on"
      title="Events"
      description="Come and meet the people behind the network — or roll your sleeves up and join a collection."
    />

    <div className="info-page">
      <div className="container">
        <section className="info-section">
          <h2 className="info-section__title">Upcoming events</h2>

          {EVENTS.map(({ title, date, location, type, body }) => (
            <article key={title} className="listing">
              <div className="listing__body">
                <h3>{title}</h3>
                <p>{body}</p>
                <p className="listing__meta">
                  <span>📅 {date}</span>
                  <span>📍 {location}</span>
                </p>
              </div>
              <div>
                <span className="tag">{type}</span>
              </div>
            </article>
          ))}

          <p className="notice" style={{ marginTop: "var(--space-lg)" }}>
            Registration for each event opens roughly three weeks beforehand.
            <Link to="/contact"> Ask us to add you to the list</Link> and we will
            let you know when it does.
          </p>
        </section>
      </div>
    </div>
  </>
);

export default Events;
