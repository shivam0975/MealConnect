import React from "react";

const AdminPanel = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <section className="users">
        <h2>Manage Users</h2>
        <p>List of registered restaurants, NGOs, and volunteers...</p>
      </section>

      <section className="donations">
        <h2>Moderate Food Listings</h2>
        <p>List of food donations pending approval...</p>
      </section>

      <section className="stats">
        <h2>Platform Statistics</h2>
        <p>Food donations, meals served, and other metrics...</p>
      </section>
    </div>
  );
};

export default AdminPanel;
