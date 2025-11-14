import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import About from '../components/About'
import Footer from '../components/Footer'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  )
}

export default HomePage
