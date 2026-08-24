import React, { useState } from "react";
import './Contact.css'; // CSS for styling

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Submit the form to the backend
  };

  return (
    <section className="contact-section">
      <div className="contact-header">
        <h2>Get in Touch with Us</h2>
        <p>
          Have questions or want to learn more about our work in reducing food waste and supporting communities? Reach out—we'd love to hear from you!
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-form">
          <h3>Send Us a Message</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Subject
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange}/>
            </label>
            <label>
              Message
              <textarea name="message" placeholder="Write your message here..." value={formData.message} onChange={handleChange} required></textarea>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="contact-details">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> info@mealconnect.org</p>
            <p><strong>Phone:</strong> +1 (123) 456-7890</p>
            <p><strong>Address:</strong> 123 Charity Lane, City, State, ZIP</p>
          </div>

          <div className="contact-social">
            <h3>Connect with Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


