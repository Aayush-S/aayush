import { useEffect, useRef, useState, useCallback } from 'react'
import './RetroTennis.css'

interface Vector2 {
  x: number
  y: number
}

export default function RetroTennis() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  
  const [racketHeld, setRacketHeld] = useState(false)
  const [racketPos, setRacketPos] = useState<Vector2>({ x: 120, y: 300 })
  const [ballPos, setBallPos] = useState<Vector2>({ x: 0, y: 0 })
  const [ballVel, setBallVel] = useState<Vector2>({ x: 0, y: 0 })
  const [initialized, setInitialized] = useState(false)
  
  const prevRacketPos = useRef<Vector2>({ x: 120, y: 300 })
  const ballPosRef = useRef<Vector2>({ x: 0, y: 0 })
  const ballVelRef = useRef<Vector2>({ x: 0, y: 0 })
  
  // Physics constants
  const FRICTION = 0.995
  const WALL_BOUNCE = 0.7
  const BALL_RADIUS = 24
  const RACKET_RADIUS = 40
  const HIT_FORCE = 1.5
  
  // Initialize ball position
  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized) {
      const startX = window.innerWidth - 150
      const startY = 200
      setBallPos({ x: startX, y: startY })
      ballPosRef.current = { x: startX, y: startY }
      setInitialized(true)
    }
  }, [initialized])
  
  // Handle mouse/touch movement
  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (racketHeld) {
      const newPos = { x: e.clientX, y: e.clientY }
      setRacketPos(newPos)
    }
  }, [racketHeld])
  
  // Handle picking up racket
  const handleRacketClick = () => {
    setRacketHeld(!racketHeld)
  }
  
  // Handle dropping racket
  const handlePointerUp = useCallback(() => {
    // Keep racket held until clicked again
  }, [])
  
  // Physics loop
  useEffect(() => {
    if (!initialized) return
    
    const updatePhysics = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const delta = Math.min((time - lastTimeRef.current) / 16.67, 2) // Cap delta to prevent huge jumps
      lastTimeRef.current = time
      
      let pos = { ...ballPosRef.current }
      let vel = { ...ballVelRef.current }
      
      // Apply velocity
      pos.x += vel.x * delta
      pos.y += vel.y * delta
      
      // Apply friction
      vel.x *= FRICTION
      vel.y *= FRICTION
      
      // Wall collisions
      const minX = BALL_RADIUS
      const maxX = window.innerWidth - BALL_RADIUS
      const minY = BALL_RADIUS
      const maxY = window.innerHeight - BALL_RADIUS
      
      if (pos.x <= minX) {
        pos.x = minX
        vel.x = Math.abs(vel.x) * WALL_BOUNCE
      }
      if (pos.x >= maxX) {
        pos.x = maxX
        vel.x = -Math.abs(vel.x) * WALL_BOUNCE
      }
      if (pos.y <= minY) {
        pos.y = minY
        vel.y = Math.abs(vel.y) * WALL_BOUNCE
      }
      if (pos.y >= maxY) {
        pos.y = maxY
        vel.y = -Math.abs(vel.y) * WALL_BOUNCE
      }
      
      // Stop if velocity is very small
      if (Math.abs(vel.x) < 0.01) vel.x = 0
      if (Math.abs(vel.y) < 0.01) vel.y = 0
      
      ballPosRef.current = pos
      ballVelRef.current = vel
      setBallPos(pos)
      setBallVel(vel)
      
      animationRef.current = requestAnimationFrame(updatePhysics)
    }
    
    animationRef.current = requestAnimationFrame(updatePhysics)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initialized])
  
  // Check for racket-ball collision
  useEffect(() => {
    if (!racketHeld) return
    
    const dx = ballPosRef.current.x - racketPos.x
    const dy = ballPosRef.current.y - racketPos.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < BALL_RADIUS + RACKET_RADIUS) {
      // Calculate hit direction based on racket movement
      const racketVelX = racketPos.x - prevRacketPos.current.x
      const racketVelY = racketPos.y - prevRacketPos.current.y
      
      // Normalize collision direction
      const nx = dx / distance
      const ny = dy / distance
      
      // Push ball away from racket
      const overlap = BALL_RADIUS + RACKET_RADIUS - distance
      ballPosRef.current.x += nx * overlap
      ballPosRef.current.y += ny * overlap
      
      // Apply hit force based on racket velocity + collision direction
      const hitSpeed = Math.sqrt(racketVelX * racketVelX + racketVelY * racketVelY)
      const force = Math.max(hitSpeed * HIT_FORCE, 8)
      
      ballVelRef.current.x = nx * force + racketVelX * 0.5
      ballVelRef.current.y = ny * force + racketVelY * 0.5
      
      // Cap max velocity
      const maxVel = 25
      const currentSpeed = Math.sqrt(ballVelRef.current.x ** 2 + ballVelRef.current.y ** 2)
      if (currentSpeed > maxVel) {
        ballVelRef.current.x = (ballVelRef.current.x / currentSpeed) * maxVel
        ballVelRef.current.y = (ballVelRef.current.y / currentSpeed) * maxVel
      }
    }
    
    prevRacketPos.current = { ...racketPos }
  }, [racketPos, racketHeld])
  
  // Event listeners
  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])
  
  if (!initialized) return null
  
  return (
    <div ref={containerRef} className="retro-tennis">
      {/* Tennis Ball */}
      <div 
        className="tennis-ball"
        style={{
          left: ballPos.x - BALL_RADIUS,
          top: ballPos.y - BALL_RADIUS,
        }}
      />
      
      {/* Tennis Racket */}
      <div 
        className={`tennis-racket ${racketHeld ? 'held' : ''}`}
        style={{
          left: racketPos.x - RACKET_RADIUS,
          top: racketPos.y - RACKET_RADIUS,
        }}
        onClick={handleRacketClick}
      />
      
    </div>
  )
}

