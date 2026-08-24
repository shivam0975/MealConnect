import React, { useState } from 'react';
import './VolunteerSignup.css';

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
            <header className="signup-header">
                <h1>Join Us as a Volunteer!</h1>
                <p>
                    Become a part of our mission to reduce food waste and help those in need. Together, 
                    we can make a difference in our community!
                </p>
            </header>

            <section className="benefits-section">
                <h2>Why Volunteer with Us?</h2>
                <ul>
                    <li>Make a positive impact in your community.</li>
                    <li>Learn about food waste reduction and sustainability.</li>
                    <li>Meet like-minded individuals and form lasting friendships.</li>
                    <li>Receive community service hours and recommendations.</li>
                </ul>
            </section>

            <section className="signup-form-section">
                <h2>Volunteer Signup Form</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" placeholder="Your Full Name" value={volunteerData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Your Email Address" value={volunteerData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" value={volunteerData.phone} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availability">Availability</label>
                        <select id="availability" name="availability" value={volunteerData.availability} onChange={handleInputChange}required>
                            <option value="">Select Your Availability</option>
                            <option value="weekdays">Weekdays</option>
                            <option value="weekends">Weekends</option>
                            <option value="flexible">Flexible</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="interests">Areas of Interest</label>
                        <textarea id="interests" name="interests" rows="3" placeholder="Tell us about your interests" />
                    </div>
                    <button type="submit" className="submit-btn">Sign Up Now</button>
                </form>
            </section>
        </div>
    );
};

export default VolunteerSignup;

