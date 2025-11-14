import React from 'react'
import VolumeControl from '../components/VolumeControl'
import Footer from '../components/Footer'
import './VolumePage.css'

const VolumePage = ({ onVolumeChange }) => {
  return (
    <div className="volume-page">
      <div className="volume-page-hero">
        <h1>🎯 Volume Control Center</h1>
        <p>Master the art of volume control with our revolutionary cannon system!</p>
      </div>
      <VolumeControl onVolumeChange={onVolumeChange} />
      <Footer />
    </div>
  )
}

export default VolumePage
