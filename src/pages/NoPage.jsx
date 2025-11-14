import React from 'react'
import { Link } from 'react-router-dom'
import './NoPage.css'

const NoPage = () => {
  return (
    <div className="no-page">
      <div className="no-content">
        <h1>NO</h1>
        <Link to="/" className="go-home-button">Go Home</Link>
      </div>
    </div>
  )
}

export default NoPage
