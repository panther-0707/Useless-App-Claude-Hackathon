import React from 'react'
import Footer from '../components/Footer'
import './TestTypingPage.css'

const TestTypingPage = () => {
  return (
    <div className="test-typing-page">
      <div className="typing-hero">
        <h1>⌨️ Test Your Typing</h1>
        <p>Measure your typing speed and accuracy</p>
      </div>
      
      <div className="container">
        <div className="typing-content">
          <h2>Coming Soon!</h2>
          <p>Our typing test feature is under development.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default TestTypingPage
