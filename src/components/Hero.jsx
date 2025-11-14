import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Secure Your Financial Future</h1>
          <p className="hero-subtitle">
            Premier Bank offers comprehensive banking solutions designed to help you achieve your financial goals with confidence and security.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">$2.5B+</div>
              <div className="stat-label">Assets Under Management</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500K+</div>
              <div className="stat-label">Satisfied Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Branch Locations</div>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/no" className="btn-primary-large">Explore Services</Link>
            <Link to="/no" className="btn-outline-large">Learn More</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
