import React from 'react'
import './About.css'

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About Premier Bank</h2>
            <p className="about-description">
              For over three decades, Premier Bank has been a trusted financial partner 
              for individuals, families, and businesses. We combine traditional banking 
              values with innovative technology to deliver exceptional service and 
              comprehensive financial solutions.
            </p>
            <p className="about-description">
              Our commitment to security, transparency, and customer satisfaction has 
              made us one of the most respected financial institutions in the industry. 
              We're here to help you achieve your financial goals with confidence.
            </p>
            <div className="about-values">
              <div className="value-item">
                <div className="value-icon">✓</div>
                <div className="value-text">
                  <h4>Trust & Security</h4>
                  <p>Your financial security is our top priority</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">✓</div>
                <div className="value-text">
                  <h4>Innovation</h4>
                  <p>Cutting-edge technology for modern banking</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">✓</div>
                <div className="value-text">
                  <h4>Excellence</h4>
                  <p>Dedicated to providing exceptional service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
