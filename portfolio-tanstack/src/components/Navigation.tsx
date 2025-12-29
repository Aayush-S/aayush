import { useEffect, useState } from 'react'
import './Navigation.css'

type Theme = 'light' | 'dark' | 'retro'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // Apply saved theme if present; otherwise match system preference.
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme: Theme = savedTheme ?? (prefersDark ? 'dark' : 'light')

    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)

    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cycleTheme = () => {
    const order: Theme[] = ['light', 'dark', 'retro']
    const idx = order.indexOf(theme)
    const next = order[(idx + 1) % order.length] ?? 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo">AS</a>
        <div className="nav-right">
          <ul className="nav-menu">
            <li>
              <button onClick={() => scrollToSection('about')} className="nav-link">
                About
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('experience')} className="nav-link">
                Experience
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('contact')} className="nav-link">
                Contact
              </button>
            </li>
          </ul>
          <button 
            onClick={cycleTheme} 
            className="theme-toggle"
            aria-label="Change theme"
          >
            <span className="theme-toggle-label">Theme</span>
            <span className="theme-toggle-value">{theme}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

