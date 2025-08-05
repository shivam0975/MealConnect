import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddDonation.css';

const AddDonation = ({ onAddDonation }) => {
  const [donationData, setDonationData] = useState({
    restaurantName: '',
    foodType: '',
    quantity: '',
    pickupTime: '',
    additionalNotes: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDonationData({ ...donationData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddDonation(donationData); // Add the new donation
    navigate('/restaurants'); // Redirect to dashboard
  };

  return (
    <div className="add-donation">
      <h1>Add New Food Donation</h1>
      <form onSubmit={handleSubmit} className="donation-form">
        <label>
          Restaurant Name:
          <input
            type="text"
            name="restaurantName"
            value={donationData.restaurantName}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Type of Food:
          <input
            type="text"
            name="foodType"
            value={donationData.foodType}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Quantity (e.g., 10 meals):
          <input
            type="text"
            name="quantity"
            value={donationData.quantity}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Pickup Time:
          <input
            type="time"
            name="pickupTime"
            value={donationData.pickupTime}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Additional Notes:
          <textarea
            name="additionalNotes"
            value={donationData.additionalNotes}
            onChange={handleInputChange}
            placeholder="Any special instructions..."
          />
        </label>

        <button type="submit" className="submit-btn">
          Submit Donation
        </button>
      </form>
    </div>
  );
};

export default AddDonation;
