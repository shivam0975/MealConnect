import React from 'react';
import './NGODashboard.css'; // Importing the CSS for styling
import { Link } from 'react-router-dom';

const NGODashboard = () => {
  return (
    <div className="ngo-dashboard">
      <h1>NGO Dashboard</h1>
      <div className="summary">
        <div className="card">
          <h2>Total Donations</h2>
          <p>120</p>
        </div>
        <div className="card">
          <h2>Pending Donations</h2>
          <p>30</p>
        </div>
        <div className="card">
          <h2>Completed Donations</h2>
          <p>90</p>
        </div>
      </div>

      <div className="donation-list">
        <h2>Recent Donations</h2>
        <table>
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Food Type</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pizza Place</td>
              <td>Pizza</td>
              <td>20</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>Salad Bar</td>
              <td>Salad</td>
              <td>15</td>
              <td>Completed</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      <button className="manage-btn">
  <Link to="/manage-donations" style={{ color: 'white', textDecoration: 'none' }}>
    Manage Donations
  </Link>
</button>
    </div>
  );
};

export default NGODashboard;
