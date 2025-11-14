import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🏦</span>
            <span className="logo-text">Premier Bank</span>
          </Link>
          <nav className="nav">
            <a href="#home" className="nav-link">Home</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#about" className="nav-link">About</a>
            <Link to="/volume" className="nav-link">Volume</Link>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
          <div className="header-actions">
            <button className="btn-secondary">Sign In</button>
            <button className="btn-primary">Open Account</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
