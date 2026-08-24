import { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

import "./Homepage.css";
import restaurantsImage from "../../assets/images/bt1.png";
import ngosImage from "../../assets/images/bt3.png";
import signup from "../../assets/images/SignUp.svg";
import dnt from "../../assets/images/donation.svg";
import pick from "../../assets/images/delivery.svg";
import Stats from "./StatsSection";
import About from "./AboutSection";
import ImpactStories from "./ImpactStories";

const CTAS = [
  {
    to: "/restaurants",
    label: "For Restaurants",
    action: "Donate Food",
    image: restaurantsImage,
  },
  { to: "/ngos", label: "For NGOs", action: "Receive Food", image: ngosImage },
];

const STEPS = [
  {
    image: signup,
    alt: "Step 1: Sign Up",
    title: "Step 1: Sign Up",
    body: "Create an account as a restaurant or NGO to participate in the food donation process.",
    animation: "fade-right",
  },
  {
    image: dnt,
    alt: "Step 2: Donate Food",
    title: "Step 2: Donate Food",
    body: "Restaurants can list surplus food items available for donation to NGOs in need.",
    animation: "fade-up",
  },
  {
    image: pick,
    alt: "Step 3: Pickup and Deliver",
    title: "Step 3: Pickup & Deliver",
    body: "NGOs will pick up the food donations and deliver them to people in need.",
    animation: "fade-left",
  },
];

const Homepage = () => {
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);

  return (
    <div className="homepage">
      <div className="main">
        <section className="hero">
          {/* Decorative produce flanking the headline. Hidden on phones, where
              there is no room for it beside the text. */}
          <div className="vegim" data-aos="fade-right" aria-hidden="true">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
              alt=""
            />
          </div>
          <div className="vegim1" data-aos="fade-left" aria-hidden="true">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
              alt=""
            />
          </div>

          <h1 className="hero__title" data-aos="fade">
            Turn Surplus Food <br /> Into Shared <br /> Meals
          </h1>

          <div className="cta-buttons" data-aos="fade">
            {CTAS.map(({ to, label, action, image }) => (
              <Link to={to} key={to} className="cta-link">
                {/* Label / action / media in the same order and the same boxes
                    for both cards, so the pair stays visually parallel. */}
                <span className="cta-button">
                  <span className="cta-button__label">{label}</span>
                  <span className="cta-button__action">{action}</span>
                  <span className="cta-button__media">
                    <img src={image} alt="" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* About Section */}
      <section className="about">
        <About />
      </section>

      {/* Impact Stories Section */}
      <section className="impact-stories">
        <ImpactStories />
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          {STEPS.map(({ image, alt, title, body, animation }) => (
            <div className="step" key={title} data-aos={animation}>
              <img src={image} alt={alt} />
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <Stats />
      </section>
    </div>
  );
};

export default Homepage;
