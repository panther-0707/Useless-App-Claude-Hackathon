import React from 'react'
import Footer from '../components/Footer'
import './CryptocurrencyPage.css'

const CryptocurrencyPage = () => {
  return (
    <div className="cryptocurrency-page">
      <div className="crypto-hero">
        <h1>₿ Cryptocurrency</h1>
        <p>Trade and invest in digital currencies</p>
      </div>
      
      <div className="container">
        <div className="crypto-content">
          <h2>Coming Soon!</h2>
          <p>Our cryptocurrency trading platform is under development.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default CryptocurrencyPage
