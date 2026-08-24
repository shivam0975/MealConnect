import { useState } from "react";
import { Link } from "react-router";
import PageHeader from "../../common/components/PageHeader";
import "./Info.css";

const TIERS = [
  { amount: 10, funds: "Covers the fuel for one volunteer collection run." },
  { amount: 25, funds: "Puts insulated transport bags into a new partner kitchen." },
  { amount: 50, funds: "Keeps a neighbourhood collection route running for a week." },
  { amount: 100, funds: "Onboards and trains a new NGO onto the network." },
];

const Donate = () => {
  const [selected, setSelected] = useState(TIERS[1].amount);

  return (
    <>
      <PageHeader
        eyebrow="Support our work"
        title="Donate"
        description="Food is given to us for free. Moving it is what costs money — fuel, cold storage, insulated bags and the people who coordinate it all."
      />

      <div className="info-page">
        <div className="container">
          <section className="info-section">
            <h2 className="info-section__title">What your donation funds</h2>
            <div className="card-grid">
              {TIERS.map(({ amount, funds }) => {
                const isSelected = selected === amount;
                return (
                  <button
                    type="button"
                    key={amount}
                    onClick={() => setSelected(amount)}
                    aria-pressed={isSelected}
                    className="card value-card"
                    style={{
                      textAlign: "left",
                      cursor: "pointer",
                      border: `2px solid ${
                        isSelected ? "var(--color-grass)" : "transparent"
                      }`,
                    }}
                  >
                    <h3>${amount}</h3>
                    <p>{funds}</p>
                  </button>
                );
              })}
            </div>

            <p
              className="notice"
              style={{ marginTop: "var(--space-lg)" }}
              role="status"
            >
              <strong>Online giving is not connected yet.</strong> We are still
              setting up our payment provider, so this page cannot take card
              details. To give ${selected} today, or to arrange a regular
              donation, <Link to="/contact">get in touch</Link> and we will send
              you our bank transfer details directly.
            </p>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">Other ways to give</h2>
            <div className="card-grid">
              <article className="card">
                <h3 className="card__title">Donate food</h3>
                <p>
                  If you run a kitchen, surplus food is worth far more to us than
                  cash. List it and a volunteer will collect it.
                </p>
                <Link className="btn btn--secondary" to="/restaurants">
                  Donate food
                </Link>
              </article>
              <article className="card">
                <h3 className="card__title">Donate time</h3>
                <p>
                  Collections need drivers, cyclists and walkers. A couple of
                  hours a week keeps a route alive.
                </p>
                <Link className="btn btn--secondary" to="/volunteer">
                  Volunteer
                </Link>
              </article>
              <article className="card">
                <h3 className="card__title">Donate reach</h3>
                <p>
                  Introduce us to a restaurant, a shelter or an employer who
                  might partner with us. Most of our network arrived this way.
                </p>
                <Link className="btn btn--secondary" to="/partner">
                  Partner with us
                </Link>
              </article>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Donate;
