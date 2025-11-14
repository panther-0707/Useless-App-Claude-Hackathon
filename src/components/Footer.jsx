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
              <li><span className="clickable">Digital Banking</span></li>
              <li><span className="clickable">Investment Services</span></li>
              <li><span className="clickable">Business Banking</span></li>
              <li><span className="clickable">Security & Protection</span></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><span className="clickable">About Us</span></li>
              <li><span className="clickable">Contact</span></li>
              <li><span className="clickable">Careers</span></li>
              <li><span className="clickable">News</span></li>
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
            <span className="clickable">Privacy Policy</span>
            <span className="clickable">Terms of Service</span>
            <span className="clickable">Security</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
