import React from 'react';
import './Footer.css';
import Logo from './logo3.png'; // Import your logo image
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
    return (
        <footer className="footer">

                <div className="footer-content">
                    {/* Logo and Tagline */}
                    <div className="footer-logo-tagline">
                        <img src={Logo} alt="Logo" className="footer-logo" />
                        <p className="footer-tagline">Feeding Communities <br/> Reducing Waste</p>
                    </div>

                    {/* Follow Us Section */}
                    <div className="footer-follow">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Links Section */}
                <div className="footer-links">
                    <div className="link-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/donate">Donate</a></li>
                            <li><a href="/volunteer">Volunteer</a></li>
                        </ul>
                    </div>
                    <div className="link-section">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/blog">Blog</a></li>
                        </ul>
                    </div>
                    <div className="link-section">
                        <h4>Get Involved</h4>
                        <ul>
                            <li><a href="/partner">Partner with Us</a></li>
                            <li><a href="/events">Events</a></li>
                            <li><a href="/careers">Careers</a></li>
                            <li><a href="/support">Support Us</a></li>
                        </ul>
                    </div>
                </div>


                {/* Copyright Section */}
                <div className="footer-copyright">
                    <p>&copy; {new Date().getFullYear()} Your Organization. All rights reserved.</p>
                </div>
        </footer>
    );
};

export default Footer;
