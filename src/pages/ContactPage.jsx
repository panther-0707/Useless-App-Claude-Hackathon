import React from 'react'
import Footer from '../components/Footer'
import RagebaitChat from '../components/RagebaitChat'
import './ContactPage.css'

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>📞 Contact Us</h1>
        <p>Get in touch with our AI-powered support</p>
      </div>
      
      <div className="container">
        <div className="contact-content">
          <h2>Chat with Premier Bank AI</h2>
          <p>Ask us anything about our services (or don't, we don't really care)</p>
          <div className="chatbot-wrapper">
            <RagebaitChat />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default ContactPage
