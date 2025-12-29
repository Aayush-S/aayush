import { useEffect, useState, useRef } from 'react'
import './AmbientSprites.css'

type SpriteType = 'slime' | 'fairy' | 'mushroom' | 'bird' | 'wizard' | 'knight' | 'villager1' | 'villager2' | 'dragon'

interface SpriteConfig {
  id: number
  type: SpriteType
  x: number
  y?: number
  direction: 'left' | 'right'
  speed: number
}

interface HeroSpriteState {
  id: number
  type: SpriteType
  x: number
  y: number
  vx: number
  vy: number
  direction: 'left' | 'right'
}

interface Spell {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
}

// Pixel art SVG sprites
const spriteImages: Record<SpriteType, string> = {
  slime: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect x='4' y='8' width='8' height='6' fill='%232d6b22'/%3E%3Crect x='3' y='9' width='10' height='4' fill='%232d6b22'/%3E%3Crect x='5' y='7' width='6' height='1' fill='%232d6b22'/%3E%3Crect x='5' y='10' width='2' height='2' fill='%23fff'/%3E%3Crect x='9' y='10' width='2' height='2' fill='%23fff'/%3E%3Crect x='6' y='11' width='1' height='1' fill='%231a1a1a'/%3E%3Crect x='10' y='11' width='1' height='1' fill='%231a1a1a'/%3E%3Crect x='4' y='9' width='1' height='2' fill='%233d8b32'/%3E%3Crect x='5' y='8' width='2' height='1' fill='%233d8b32'/%3E%3C/svg%3E`,
  
  fairy: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect x='7' y='6' width='2' height='3' fill='%23f0c850'/%3E%3Crect x='6' y='7' width='4' height='2' fill='%23f0c850'/%3E%3Crect x='7' y='5' width='2' height='1' fill='%23d4a824'/%3E%3Crect x='3' y='6' width='3' height='4' fill='%23fff' fill-opacity='0.7'/%3E%3Crect x='10' y='6' width='3' height='4' fill='%23fff' fill-opacity='0.7'/%3E%3Crect x='7' y='9' width='1' height='2' fill='%23d4a824'/%3E%3Crect x='8' y='9' width='1' height='2' fill='%23d4a824'/%3E%3Crect x='6' y='6' width='1' height='1' fill='%231a1a1a'/%3E%3Crect x='9' y='6' width='1' height='1' fill='%231a1a1a'/%3E%3C/svg%3E`,
  
  mushroom: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect x='6' y='10' width='4' height='4' fill='%23e8e4d8'/%3E%3Crect x='4' y='6' width='8' height='4' fill='%23c42b3b'/%3E%3Crect x='5' y='5' width='6' height='1' fill='%23c42b3b'/%3E%3Crect x='5' y='7' width='2' height='2' fill='%23fff'/%3E%3Crect x='9' y='6' width='2' height='2' fill='%23fff'/%3E%3Crect x='7' y='8' width='1' height='1' fill='%23fff'/%3E%3C/svg%3E`,
  
  bird: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect x='5' y='7' width='6' height='4' fill='%236b5a8c'/%3E%3Crect x='4' y='8' width='1' height='2' fill='%236b5a8c'/%3E%3Crect x='11' y='8' width='2' height='1' fill='%23d4a824'/%3E%3Crect x='6' y='6' width='4' height='1' fill='%236b5a8c'/%3E%3Crect x='6' y='8' width='1' height='1' fill='%23fff'/%3E%3Crect x='3' y='6' width='2' height='3' fill='%236b5a8c'/%3E%3Crect x='2' y='5' width='2' height='2' fill='%236b5a8c'/%3E%3Crect x='6' y='11' width='1' height='2' fill='%23d4a824'/%3E%3Crect x='9' y='11' width='1' height='2' fill='%23d4a824'/%3E%3C/svg%3E`,

  wizard: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect x='6' y='1' width='4' height='1' fill='%236b5a8c'/%3E%3Crect x='5' y='2' width='6' height='2' fill='%236b5a8c'/%3E%3Crect x='7' y='0' width='2' height='1' fill='%23f0c850'/%3E%3Crect x='6' y='4' width='4' height='3' fill='%23f5deb3'/%3E%3Crect x='6' y='5' width='1' height='1' fill='%231a1a1a'/%3E%3Crect x='9' y='5' width='1' height='1' fill='%231a1a1a'/%3E%3Crect x='5' y='7' width='6' height='5' fill='%236b5a8c'/%3E%3Crect x='4' y='8' width='1' height='3' fill='%236b5a8c'/%3E%3Crect x='11' y='8' width='1' height='3' fill='%236b5a8c'/%3E%3Crect x='12' y='6' width='1' height='5' fill='%238b4513'/%3E%3Crect x='12' y='5' width='1' height='1' fill='%23f0c850'/%3E%3Crect x='6' y='12' width='2' height='2' fill='%236b5a8c'/%3E%3Crect x='8' y='12' width='2' height='2' fill='%236b5a8c'/%3E%3C/svg%3E`,

  knight: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect x='5' y='1' width='6' height='4' fill='%23708090'/%3E%3Crect x='7' y='0' width='2' height='1' fill='%23708090'/%3E%3Crect x='6' y='2' width='1' height='1' fill='%23404040'/%3E%3Crect x='9' y='2' width='1' height='1' fill='%23404040'/%3E%3Crect x='6' y='5' width='4' height='2' fill='%23f5deb3'/%3E%3Crect x='5' y='7' width='6' height='5' fill='%23708090'/%3E%3Crect x='4' y='8' width='1' height='3' fill='%23708090'/%3E%3Crect x='11' y='8' width='1' height='3' fill='%23708090'/%3E%3Crect x='3' y='7' width='1' height='4' fill='%23708090'/%3E%3Crect x='2' y='6' width='1' height='6' fill='%23a0a0a0'/%3E%3Crect x='6' y='12' width='2' height='2' fill='%23708090'/%3E%3Crect x='8' y='12' width='2' height='2' fill='%23708090'/%3E%3Crect x='7' y='8' width='2' height='3' fill='%23c42b3b'/%3E%3C/svg%3E`,

  villager1: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect x='6' y='2' width='4' height='4' fill='%23f5deb3'/%3E%3Crect x='5' y='1' width='6' height='2' fill='%238b4513'/%3E%3Crect x='6' y='4' width='1' height='1' fill='%231a1a1a'/%3E%3Crect x='9' y='4' width='1' height='1' fill='%231a1a1a'/%3E%3Crect x='5' y='6' width='6' height='5' fill='%232d6b22'/%3E%3Crect x='4' y='7' width='1' height='3' fill='%232d6b22'/%3E%3Crect x='11' y='7' width='1' height='3' fill='%232d6b22'/%3E%3Crect x='6' y='11' width='2' height='3' fill='%238b4513'/%3E%3Crect x='8' y='11' width='2' height='3' fill='%238b4513'/%3E%3C/svg%3E`,

  villager2: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect x='6' y='2' width='4' height='4' fill='%23f5deb3'/%3E%3Crect x='5' y='1' width='6' height='3' fill='%23d4a824'/%3E%3Crect x='6' y='4' width='1' height='1' fill='%231a1a1a'/%3E%3Crect x='9' y='4' width='1' height='1' fill='%231a1a1a'/%3E%3Crect x='5' y='6' width='6' height='6' fill='%23c42b3b'/%3E%3Crect x='4' y='7' width='1' height='3' fill='%23f5deb3'/%3E%3Crect x='11' y='7' width='1' height='3' fill='%23f5deb3'/%3E%3Crect x='6' y='12' width='2' height='2' fill='%238b4513'/%3E%3Crect x='8' y='12' width='2' height='2' fill='%238b4513'/%3E%3C/svg%3E`,

  // Baby dragon - cute small dragon with wings
  dragon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect x='5' y='4' width='6' height='5' fill='%23c42b3b'/%3E%3Crect x='4' y='5' width='1' height='3' fill='%23c42b3b'/%3E%3Crect x='11' y='5' width='1' height='3' fill='%23c42b3b'/%3E%3Crect x='6' y='3' width='4' height='1' fill='%23c42b3b'/%3E%3Crect x='5' y='2' width='2' height='2' fill='%23c42b3b'/%3E%3Crect x='9' y='2' width='2' height='2' fill='%23c42b3b'/%3E%3Crect x='5' y='1' width='1' height='1' fill='%23c42b3b'/%3E%3Crect x='10' y='1' width='1' height='1' fill='%23c42b3b'/%3E%3Crect x='6' y='5' width='1' height='1' fill='%23f0c850'/%3E%3Crect x='9' y='5' width='1' height='1' fill='%23f0c850'/%3E%3Crect x='3' y='4' width='2' height='3' fill='%23ff6b6b' fill-opacity='0.6'/%3E%3Crect x='2' y='5' width='1' height='2' fill='%23ff6b6b' fill-opacity='0.6'/%3E%3Crect x='11' y='4' width='2' height='3' fill='%23ff6b6b' fill-opacity='0.6'/%3E%3Crect x='13' y='5' width='1' height='2' fill='%23ff6b6b' fill-opacity='0.6'/%3E%3Crect x='6' y='9' width='1' height='2' fill='%23c42b3b'/%3E%3Crect x='9' y='9' width='1' height='2' fill='%23c42b3b'/%3E%3Crect x='7' y='9' width='2' height='3' fill='%23c42b3b'/%3E%3Crect x='7' y='12' width='1' height='2' fill='%23c42b3b'/%3E%3Crect x='7' y='7' width='2' height='1' fill='%23a01a2a'/%3E%3C/svg%3E`
}

// Firework colors
const fireworkColors = ['#ff6b6b', '#f0c850', '#6b5a8c', '#4ecdc4', '#ff9f43', '#ee5a24']

// Hero section with diagonal movement, interactions, spells and dragon!
export function HeroSprites() {
  const [sprites, setSprites] = useState<HeroSpriteState[]>([
    // Knight chases slimes
    { id: 1, type: 'knight', x: 10, y: 15, vx: 0.018, vy: 0.008, direction: 'right' },
    // Slimes flee from knight
    { id: 2, type: 'slime', x: 30, y: 20, vx: 0.025, vy: -0.01, direction: 'right' },
    { id: 3, type: 'slime', x: 70, y: 25, vx: -0.02, vy: 0.012, direction: 'left' },
    // Wizard casts spells
    { id: 4, type: 'wizard', x: 15, y: 45, vx: 0.01, vy: 0.008, direction: 'right' },
    // Fairies float around freely
    { id: 5, type: 'fairy', x: 50, y: 55, vx: 0.015, vy: 0.02, direction: 'right' },
    { id: 6, type: 'fairy', x: 80, y: 40, vx: -0.018, vy: -0.015, direction: 'left' },
    // Birds fly high
    { id: 7, type: 'bird', x: 20, y: 75, vx: 0.03, vy: 0.01, direction: 'right' },
    // Baby dragon!
    { id: 8, type: 'dragon', x: 60, y: 60, vx: 0.022, vy: 0.018, direction: 'right' },
  ])
  
  const [spells, setSpells] = useState<Spell[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const spellCooldownRef = useRef<number>(0)
  const spellIdRef = useRef<number>(0)
  const particleIdRef = useRef<number>(0)
  
  useEffect(() => {
    const animate = (time: number) => {
      const delta = time - lastTimeRef.current
      lastTimeRef.current = time
      
      // Update sprites
      setSprites(prev => {
        const knight = prev.find(s => s.type === 'knight')
        const wizard = prev.find(s => s.type === 'wizard')
        
        return prev.map(sprite => {
          let { x, y, vx, vy, direction } = sprite
          
          // Slimes flee from knight
          if (sprite.type === 'slime' && knight) {
            const dx = sprite.x - knight.x
            const dy = sprite.y - knight.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 25) {
              vx += (dx / dist) * 0.001
              vy += (dy / dist) * 0.001
            }
          }
          
          // Knight slowly chases nearest slime
          if (sprite.type === 'knight') {
            const slimes = prev.filter(s => s.type === 'slime')
            if (slimes.length > 0) {
              let nearestSlime = slimes[0]
              let nearestDist = Infinity
              for (const slime of slimes) {
                const dx = slime.x - sprite.x
                const dy = slime.y - sprite.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < nearestDist) {
                  nearestDist = dist
                  nearestSlime = slime
                }
              }
              const dx = nearestSlime.x - sprite.x
              const dy = nearestSlime.y - sprite.y
              const dist = Math.sqrt(dx * dx + dy * dy)
              if (dist > 5) {
                vx += (dx / dist) * 0.0003
                vy += (dy / dist) * 0.0003
              }
            }
          }
          
          // Dragon playfully chases fairies
          if (sprite.type === 'dragon') {
            const fairies = prev.filter(s => s.type === 'fairy')
            if (fairies.length > 0) {
              const fairy = fairies[Math.floor(Math.random() * fairies.length)]
              const dx = fairy.x - sprite.x
              const dy = fairy.y - sprite.y
              const dist = Math.sqrt(dx * dx + dy * dy)
              if (dist > 10) {
                vx += (dx / dist) * 0.0002
                vy += (dy / dist) * 0.0002
              }
            }
          }
          
          // Fairies flee from dragon
          if (sprite.type === 'fairy') {
            const dragon = prev.find(s => s.type === 'dragon')
            if (dragon) {
              const dx = sprite.x - dragon.x
              const dy = sprite.y - dragon.y
              const dist = Math.sqrt(dx * dx + dy * dy)
              if (dist < 20) {
                vx += (dx / dist) * 0.0008
                vy += (dy / dist) * 0.0008
              }
            }
          }
          
          // Apply velocity limits
          const maxSpeed = sprite.type === 'bird' ? 0.04 : sprite.type === 'dragon' ? 0.035 : 0.03
          const speed = Math.sqrt(vx * vx + vy * vy)
          if (speed > maxSpeed) {
            vx = (vx / speed) * maxSpeed
            vy = (vy / speed) * maxSpeed
          }
          
          // Apply friction
          vx *= 0.998
          vy *= 0.998
          
          // Update position
          x += vx * delta * 0.05
          y += vy * delta * 0.05
          
          // Bounce off walls
          if (x > 92) { x = 92; vx *= -0.8 }
          if (x < 3) { x = 3; vx *= -0.8 }
          if (y > 85) { y = 85; vy *= -0.8 }
          if (y < 10) { y = 10; vy *= -0.8 }
          
          direction = vx >= 0 ? 'right' : 'left'
          
          return { ...sprite, x, y, vx, vy, direction }
        })
      })
      
      // Wizard shoots spells periodically
      spellCooldownRef.current -= delta
      if (spellCooldownRef.current <= 0) {
        setSprites(prev => {
          const wizard = prev.find(s => s.type === 'wizard')
          if (wizard) {
            const angle = Math.random() * Math.PI * 2
            const speed = 0.04 + Math.random() * 0.02
            setSpells(prevSpells => [...prevSpells, {
              id: ++spellIdRef.current,
              x: wizard.x,
              y: wizard.y + 5,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 100
            }])
          }
          return prev
        })
        spellCooldownRef.current = 6000 + Math.random() * 6000 // 6-12 seconds
      }
      
      // Update spells
      setSpells(prevSpells => {
        const newSpells: Spell[] = []
        const spellsToExplode: Spell[] = []
        
        for (const spell of prevSpells) {
          const newSpell = {
            ...spell,
            x: spell.x + spell.vx * delta * 0.05,
            y: spell.y + spell.vy * delta * 0.05,
            life: spell.life - delta * 0.02
          }
          
          // Check if spell should explode
          if (newSpell.life <= 0 || newSpell.x < 0 || newSpell.x > 100 || newSpell.y < 0 || newSpell.y > 100) {
            spellsToExplode.push(newSpell)
          } else {
            newSpells.push(newSpell)
          }
        }
        
        // Create firework particles for exploding spells
        if (spellsToExplode.length > 0) {
          setParticles(prevParticles => {
            const newParticles = [...prevParticles]
            for (const spell of spellsToExplode) {
              const numParticles = 8 + Math.floor(Math.random() * 6)
              for (let i = 0; i < numParticles; i++) {
                const angle = (Math.PI * 2 * i) / numParticles + Math.random() * 0.3
                const speed = 0.02 + Math.random() * 0.03
                newParticles.push({
                  id: ++particleIdRef.current,
                  x: spell.x,
                  y: spell.y,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed,
                  life: 1,
                  color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)]
                })
              }
            }
            return newParticles
          })
        }
        
        return newSpells
      })
      
      // Update particles
      setParticles(prevParticles => {
        return prevParticles
          .map(p => ({
            ...p,
            x: p.x + p.vx * delta * 0.05,
            y: p.y + p.vy * delta * 0.05,
            vy: p.vy - 0.0001 * delta, // gravity
            life: p.life - delta * 0.002
          }))
          .filter(p => p.life > 0)
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
  }, [])
  
  return (
    <div className="section-sprites section-sprites--hero">
      {/* Sprites */}
      {sprites.map(sprite => (
        <div
          key={sprite.id}
          className={`sprite sprite--${sprite.type} ${sprite.direction === 'left' ? 'sprite--flip' : ''}`}
          style={{
            left: `${sprite.x}%`,
            bottom: `${sprite.y}%`,
            backgroundImage: `url("${spriteImages[sprite.type]}")`
          }}
        />
      ))}
      
      {/* Spells */}
      {spells.map(spell => (
        <div
          key={`spell-${spell.id}`}
          className="spell"
          style={{
            left: `${spell.x}%`,
            bottom: `${spell.y}%`
          }}
        />
      ))}
      
      {/* Firework particles */}
      {particles.map(particle => (
        <div
          key={`particle-${particle.id}`}
          className="particle"
          style={{
            left: `${particle.x}%`,
            bottom: `${particle.y}%`,
            backgroundColor: particle.color,
            opacity: particle.life
          }}
        />
      ))}
    </div>
  )
}

// Regular section sprites (horizontal movement only)
interface SectionSpritesProps {
  sprites: SpriteConfig[]
}

export function SectionSprites({ sprites: initialSprites }: SectionSpritesProps) {
  const [spriteList, setSpriteList] = useState<SpriteConfig[]>(initialSprites)
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  
  useEffect(() => {
    const animate = (time: number) => {
      const delta = time - lastTimeRef.current
      lastTimeRef.current = time
      
      setSpriteList(prev => prev.map(sprite => {
        if (sprite.speed === 0) return sprite
        
        let newX = sprite.x + (sprite.direction === 'right' ? sprite.speed * delta * 0.05 : -sprite.speed * delta * 0.05)
        let newDirection = sprite.direction
        
        if (newX > 92) {
          newX = 92
          newDirection = 'left'
        } else if (newX < 3) {
          newX = 3
          newDirection = 'right'
        }
        
        return { ...sprite, x: newX, direction: newDirection }
      }))
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
  }, [])
  
  return (
    <div className="section-sprites">
      {spriteList.map(sprite => (
        <div
          key={sprite.id}
          className={`sprite sprite--${sprite.type} ${sprite.direction === 'left' ? 'sprite--flip' : ''}`}
          style={{
            left: `${sprite.x}%`,
            bottom: sprite.y ? `${sprite.y}%` : undefined,
            backgroundImage: `url("${spriteImages[sprite.type]}")`
          }}
        />
      ))}
    </div>
  )
}

// Pre-configured sprite sets for other sections
export const aboutSprites: SpriteConfig[] = [
  { id: 3, type: 'wizard', x: 5, direction: 'right', speed: 0.012 },
  { id: 4, type: 'slime', x: 85, direction: 'left', speed: 0.015 },
  { id: 5, type: 'mushroom', x: 92, direction: 'right', speed: 0 },
]

export const experienceSprites: SpriteConfig[] = [
  { id: 6, type: 'knight', x: 3, direction: 'right', speed: 0.018 },
  { id: 7, type: 'villager1', x: 90, direction: 'left', speed: 0.01 },
]

export const contactSprites: SpriteConfig[] = [
  { id: 8, type: 'villager2', x: 8, direction: 'right', speed: 0.008 },
  { id: 9, type: 'dragon', x: 88, direction: 'left', speed: 0.015 },
]
