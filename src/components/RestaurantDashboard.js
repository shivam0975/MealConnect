import React from "react";
import './RestaurantDashboard.css'; // Import the CSS
import { Link } from "react-router-dom";

const RestaurantDashboard = () => {
  return (
    <div className="restaurant-dashboard">
      <h1>Restaurant Dashboard</h1>

      <section className="overview">
        <h2>Pending Food Listings</h2>
        <p>No pending listings.</p>

        <h2>Recent Food Donations</h2>
        <p>No recent donations.</p>
        
        <Link to='/add-donation'>
        <button className="add-donation-btn">Add New Donation</button>
        </Link>
      </section>
    </div>
  );
};

export default RestaurantDashboard;
