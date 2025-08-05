import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './Homepage.css'; // Import the CSS
import logo from './logo1.png';
import bt1 from './bt1.png';
import bt2 from './bt3.png';
import signup from './SignUp.svg';
import dnt from './donation.svg';
import pick from './delivery.svg';
import Stats from './StatsSection';
import About from './AboutSection';
import Footer from "./Footer";
import ImpactStories from "./ImpactStories";

const Homepage = () => {
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="homepage">

      <div className="main">
        <header className="homepage-header">
          <nav data-aos="fade-left">
            <Link to="/">Home</Link>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/ngos">NGOs</Link>
            <Link to="/volunteer">Volunteer</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </header>

        <section className="hero">
          <h2 data-aos="fade">Turn Surplus Food <br /> Into Shared <br /> Meals</h2>
          <div className="vegim" data-aos="fade-right">
            <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png' alt="Veggies" />
          </div>
          <div className="vegim1" data-aos="fade-left">
            <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png' alt="Sushi" />
          </div>
          <div className="cta-buttons" data-aos="fade">
            <Link to="/restaurants">
              <button className="for-restaurants-btn">
                For Restaurants: Donate Food
                <img src={bt1} alt="Donate Food" style={{ padding:'40px 0 0 0 '  }} />
              </button>
            </Link>
            <Link to="/ngos">
              <button className="for-ngos-btn">
                For NGOs: <br />Receive Food <br />
                <img src={bt2} alt="Receive Food" style={{ width: '80%', border:'auto' , borderRadius:'200px'}}/>
              </button>
            </Link>
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
          <div className="step" data-aos="fade-right">
            <img src={signup} alt="Step 1: Sign Up" />
            <h3>Step 1: Sign Up</h3>
            <p>Create an account as a restaurant or NGO to participate in the food donation process.</p>
          </div>
          <div className="step" data-aos="fade-out">
            <img src={dnt} alt="Step 2: Donate Food" />
            <h3>Step 2: Donate Food</h3>
            <p>Restaurants can list surplus food items available for donation to NGOs in need.</p>
          </div>
          <div className="step" data-aos="fade-left">
            <img src={pick} alt="Step 3: Pickup and Deliver" />
            <h3>Step 3: Pickup & Deliver</h3>
            <p>NGOs will pick up the food donations and deliver them to people in need.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <Stats />
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <Footer />
      </footer>

      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Homepage;
