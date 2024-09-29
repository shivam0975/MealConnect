import React, { useState } from 'react';
import './VolunteerSignup.css'; // Importing the CSS for styling

const VolunteerSignup = () => {
  const [volunteerData, setVolunteerData] = useState({
    name: '',
    email: '',
    phone: '',
    availability: '',
    additionalNotes: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVolunteerData({ ...volunteerData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(volunteerData);
    // Logic to handle form submission (e.g., POST request)
  };

  return (
    <div className="volunteer-signup">
      <h1>Volunteer Sign-Up</h1>
      <p>Join us in our mission to fight food waste and hunger! Fill out the form below to become a volunteer.</p>
      <form onSubmit={handleSubmit} className="volunteer-form">
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={volunteerData.name}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Email Address:
          <input
            type="email"
            name="email"
            value={volunteerData.email}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={volunteerData.phone}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Availability:
          <input
            type="text"
            name="availability"
            value={volunteerData.availability}
            onChange={handleInputChange}
            placeholder="e.g., Weekends, Weekdays after 5 PM"
            required
          />
        </label>

        <label>
          Additional Notes:
          <textarea
            name="additionalNotes"
            value={volunteerData.additionalNotes}
            onChange={handleInputChange}
            placeholder="Any additional info you'd like us to know..."
          />
        </label>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default VolunteerSignup;
