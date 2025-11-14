import React from 'react'
import './Features.css'

const Features = () => {
  const features = [
    {
      id: 1,
      icon: '💳',
      title: 'Digital Banking',
      description: 'Access your accounts anytime, anywhere with our secure digital platform.',
      link: 'feature1.html'
    },
    {
      id: 2,
      icon: '💰',
      title: 'Investment Services',
      description: 'Expert financial advisors to help you grow and protect your wealth.',
      link: 'feature2.html'
    },
    {
      id: 3,
      icon: '📊',
      title: 'Business Banking',
      description: 'Comprehensive solutions tailored for businesses of all sizes.',
      link: 'feature3.html'
    },
    {
      id: 4,
      icon: '🔒',
      title: 'Security & Protection',
      description: 'Advanced security measures to keep your financial information safe.',
      link: 'feature4.html'
    },
    {
      id: 5,
      icon: '📱',
      title: 'Mobile Banking',
      description: 'Bank on the go with our intuitive mobile banking application.',
      link: 'feature5.html'
    },
    {
      id: 6,
      icon: '🌟',
      title: 'Premium Services',
      description: 'Exclusive benefits and personalized service for premium members.',
      link: 'feature6.html'
    }
  ]

  return (
    <section className="features" id="services">
      <div className="container">
        <div className="features-header">
          <h2 className="section-title">Our Banking Services</h2>
          <p className="section-subtitle">
            Discover comprehensive financial solutions designed to meet all your banking needs
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <a
              key={feature.id}
              href={feature.link}
              className="feature-card"
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <span className="feature-link">Learn More →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
