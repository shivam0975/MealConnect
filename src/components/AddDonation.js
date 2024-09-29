import React, { useState } from 'react';
import './AddDonation.css'; // Importing the CSS for the form styling

const AddDonation = () => {
  const [donationData, setDonationData] = useState({
    restaurantName: '',
    foodType: '',
    quantity: '',
    pickupTime: '',
    additionalNotes: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDonationData({ ...donationData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(donationData);
    // Logic to handle form submission (e.g., POST request)
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
