import React from "react";
import { Link } from "react-router-dom";
import './RestaurantDashboard.css';

const RestaurantDashboard = ({ donations }) => {
  return (
    <div className="restaurant-dashboard">
      <header className="dashboard-header">
        <h1>Restaurant Dashboard</h1>
        <p>Welcome! Manage your food donations and track recent activity.</p>
      </header>

      <section className="overview">
        <div className="card pending-listings">
          <h2>Pending Food Listings</h2>
          {donations.length === 0 ? (
            <p>No pending listings.</p>
          ) : (
            <ul>
              {donations.map((donation, index) => (
                <li key={index}>
                  <strong>{donation.foodType}</strong> - Quantity: {donation.quantity}, Pickup Time: {donation.pickupTime}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card recent-donations">
          <h2>Recent Food Donations</h2>
          {donations.length === 0 ? (
            <p>No recent donations.</p>
          ) : (
            <ul>
              {donations.slice(-5).map((donation, index) => (
                <li key={index}>
                  <strong>{donation.foodType}</strong> - Quantity: {donation.quantity}, Pickup Time: {donation.pickupTime}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Link to="/add-donation" className="add-donation-link">
        <button className="add-donation-btn">Add New Donation</button>
      </Link>
    </div>
  );
};

export default RestaurantDashboard;
