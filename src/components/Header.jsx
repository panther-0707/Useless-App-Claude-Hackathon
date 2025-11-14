import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [showServicesDropdown, setShowServicesDropdown] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🏦</span>
            <span className="logo-text">Premier Bank</span>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setShowServicesDropdown(true)}
              onMouseLeave={() => setShowServicesDropdown(false)}
            >
              <a href="#services" className="nav-link">
                Services ▾
              </a>
              {showServicesDropdown && (
                <div className="dropdown-menu">
                  <Link to="/test-typing" className="dropdown-item">⌨️ Test Your Typing</Link>
                </div>
              )}
            </div>
            <Link to="/currency-exchange" className="nav-link">Currency Exchange</Link>
            <Link to="/cryptocurrency" className="nav-link">Cryptocurrency</Link>
            <Link to="/volume" className="nav-link">Volume</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
          <div className="header-actions">
            <Link to="/no" className="btn-secondary">Sign In</Link>
            <Link to="/no" className="btn-primary">Open Account</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
