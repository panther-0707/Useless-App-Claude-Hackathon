import React, { useState, useRef, useEffect } from 'react'
import './VolumeControl.css'

const VolumeControl = ({ onVolumeChange }) => {
  const [angle, setAngle] = useState(45)
  const [power, setPower] = useState(50)
  const [projectile, setProjectile] = useState(null)
  const [volume, setVolume] = useState(50)
  const [isAiming, setIsAiming] = useState(false)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  const launchProjectile = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsAiming(false)
    
    // Physics constants
    const gravity = 0.5
    const angleRad = (angle * Math.PI) / 180
    const initialVelocityX = Math.cos(angleRad) * power * 0.3
    const initialVelocityY = -Math.sin(angleRad) * power * 0.3
    
    let x = 50 // Start position
    let y = canvas.height - 50
    let velocityX = initialVelocityX
    let velocityY = initialVelocityY
    let time = 0

    const animate = () => {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw volume bar
      drawVolumeBar(ctx)
      
      // Draw cannon
      drawCannon(ctx, angle)
      
      // Update projectile position
      x += velocityX
      velocityY += gravity
      y += velocityY
      time++
      
      // Draw projectile
      ctx.fillStyle = '#ff4444'
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fill()
      
      // Check if projectile hit the volume bar or went off screen
      if (x >= canvas.width - 100 && x <= canvas.width - 20 && y >= 50 && y <= canvas.height - 50) {
        // Hit the volume bar!
        const hitHeight = y - 50
        const barHeight = canvas.height - 100
        const newVolume = Math.round(100 - (hitHeight / barHeight) * 100)
        setVolume(newVolume)
        onVolumeChange(newVolume)
        
        // Play hit sound
        playHitSound(newVolume)
        
        setProjectile(null)
        return
      }
      
      if (y > canvas.height || x > canvas.width) {
        setProjectile(null)
        return
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
  }

  const drawVolumeBar = (ctx) => {
    const barX = ctx.canvas.width - 80
    const barY = 50
    const barWidth = 40
    const barHeight = ctx.canvas.height - 100
    
    // Draw bar background
    ctx.fillStyle = '#333'
    ctx.fillRect(barX, barY, barWidth, barHeight)
    
    // Draw volume level
    const volumeHeight = (volume / 100) * barHeight
    ctx.fillStyle = '#4CAF50'
    ctx.fillRect(barX, barY + barHeight - volumeHeight, barWidth, volumeHeight)
    
    // Draw volume text
    ctx.fillStyle = '#fff'
    ctx.font = '20px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(`${volume}%`, barX + barWidth / 2, barY - 10)
    
    // Draw tick marks
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 1
    for (let i = 0; i <= 10; i++) {
      const y = barY + (barHeight * i) / 10
      ctx.beginPath()
      ctx.moveTo(barX, y)
      ctx.lineTo(barX + barWidth, y)
      ctx.stroke()
    }
  }

  const drawCannon = (ctx, currentAngle) => {
    const cannonX = 50
    const cannonY = ctx.canvas.height - 50
    const cannonLength = 40
    const angleRad = (currentAngle * Math.PI) / 180
    
    // Draw base
    ctx.fillStyle = '#555'
    ctx.beginPath()
    ctx.arc(cannonX, cannonY, 20, 0, Math.PI * 2)
    ctx.fill()
    
    // Draw barrel
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(cannonX, cannonY)
    ctx.lineTo(
      cannonX + Math.cos(angleRad) * cannonLength,
      cannonY - Math.sin(angleRad) * cannonLength
    )
    ctx.stroke()
  }

  const playHitSound = (vol) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 300 + (vol * 5)
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(vol / 100, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawVolumeBar(ctx)
    drawCannon(ctx, angle)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [angle, volume])

  return (
    <div className="volume-control" id="volume">
      <div className="volume-header">
        <h3>🎯 Volume Cannon Control</h3>
        <p>Aim and fire to set your volume!</p>
      </div>
      
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={400}
        className="volume-canvas"
      />
      
      <div className="volume-controls">
        <div className="control-group">
          <label>
            Angle: {angle}°
            <input
              type="range"
              min="0"
              max="90"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="slider"
            />
          </label>
        </div>
        
        <div className="control-group">
          <label>
            Power: {power}%
            <input
              type="range"
              min="10"
              max="100"
              value={power}
              onChange={(e) => setPower(Number(e.target.value))}
              className="slider"
            />
          </label>
        </div>
        
        <button 
          onClick={launchProjectile}
          className="fire-button"
        >
          🔥 FIRE!
        </button>
      </div>
      
      <div className="volume-display">
        <span className="volume-icon">🔊</span>
        <span className="volume-value">Current Volume: {volume}%</span>
      </div>
    </div>
  )
}

export default VolumeControl
