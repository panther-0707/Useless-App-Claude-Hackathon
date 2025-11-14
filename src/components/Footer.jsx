import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🏦</span>
              <span className="logo-text">Premier Bank</span>
            </div>
            <p className="footer-description">
              Your trusted financial partner for over 30 years.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><a href="feature1.html">Digital Banking</a></li>
              <li><a href="feature2.html">Investment Services</a></li>
              <li><a href="feature3.html">Business Banking</a></li>
              <li><a href="feature4.html">Security & Protection</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#news">News</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-contact">
              <li>1-800-PREMIER</li>
              <li>support@premierbank.com</li>
              <li>Mon-Fri: 8AM-8PM EST</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Premier Bank. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">Security</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
