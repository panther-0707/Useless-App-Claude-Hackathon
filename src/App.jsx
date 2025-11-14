import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import VolumePage from './pages/VolumePage'
import './App.css'

function App() {
  const [volume, setVolume] = useState(50)
  const audioRef = useRef(null)

  useEffect(() => {
    // Preload the punch sound
    audioRef.current = new Audio('/sounds/Punch.mp3')
    audioRef.current.preload = 'auto'

    // Global click handler for all links
    const handleLinkClick = (e) => {
      // Check if clicked element is a link or inside a link
      const link = e.target.closest('a, .clickable, button')
      if (link && audioRef.current) {
        const sound = audioRef.current.cloneNode()
        sound.volume = volume / 100
        sound.play().catch(err => console.log('Audio play failed:', err))
      }
    }

    // Add event listener to document
    document.addEventListener('click', handleLinkClick)

    // Cleanup
    return () => {
      document.removeEventListener('click', handleLinkClick)
    }
  }, [volume])

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/volume" element={<VolumePage onVolumeChange={setVolume} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
