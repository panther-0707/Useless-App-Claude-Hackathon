import React from 'react'
import Footer from '../components/Footer'
import './CurrencyExchangePage.css'

const CurrencyExchangePage = () => {
  return (
    <div className="currency-exchange-page">
      <div className="currency-hero">
        <h1>💱 Currency Exchange</h1>
        <p>Exchange currencies at competitive rates</p>
      </div>
      
      <div className="container">
        <div className="exchange-content">
          <h2>Coming Soon!</h2>
          <p>Our currency exchange service is under development.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default CurrencyExchangePage
