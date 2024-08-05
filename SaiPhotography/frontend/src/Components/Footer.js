import React from 'react';
import './Footer.css'; // Importing CSS file for styles
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPhone, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-contact-info">
          <h3>Contact Us</h3>
          <p>Malabe, Colombo, Sri Lanka.</p>
          <p><FaPhone className="icon" />: <a href="tel:+9477123456">+94 77123456</a></p>
          <p><FaEnvelope className="icon" />: <a href="mailto:saiphotography@gmail.com">saiphotography@gmail.com</a></p>
        </div>
        
        <div className="footer-social-links">
          <h3>Follow Us On</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
          </div>
        </div>
        
        <div className="footer-opening-hours">
          <h3>Opening Hours</h3>
          <p>Monday - Friday: 08:00 AM - 10:00 PM</p>
          <p>Saturday - Sunday: 07:00 AM - 11:00 PM</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sai Photography. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
