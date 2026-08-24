import React from 'react';
import './ManageDonations.css'; // Importing the CSS for styling

const ManageDonations = () => {
  const donations = [
    { id: 1, restaurant: 'Pizza Place', foodType: 'Pizza', quantity: 20, status: 'Pending' },
    { id: 2, restaurant: 'Salad Bar', foodType: 'Salad', quantity: 15, status: 'Pending' },
    { id: 3, restaurant: 'Burger Joint', foodType: 'Burgers', quantity: 30, status: 'Accepted' },
    { id: 4, restaurant: 'Taco Stand', foodType: 'Tacos', quantity: 10, status: 'Rejected' },
  ];

  const handleAccept = (id) => {
    console.log(`Accepted donation from ID: ${id}`);
    // Logic to update the donation status
  };

  const handleReject = (id) => {
    console.log(`Rejected donation from ID: ${id}`);
    // Logic to update the donation status
  };

  return (
    <div className="manage-donations">
      <h1>Manage Donations</h1>
      <div className="donation-list">
        <table>
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Food Type</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.restaurant}</td>
                <td>{donation.foodType}</td>
                <td>{donation.quantity}</td>
                <td>{donation.status}</td>
                <td>
                  {donation.status === 'Pending' ? (
                    <>
                      <button
                        className="action-btn accept-btn"
                        onClick={() => handleAccept(donation.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="action-btn reject-btn"
                        onClick={() => handleReject(donation.id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>{donation.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDonations;
