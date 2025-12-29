import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import RetroTennis from './components/RetroTennis'

// Root route component
function RootComponent() {
  const [isRetro, setIsRetro] = useState(false)
  
  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsRetro(document.documentElement.getAttribute('data-theme') === 'retro')
    }
    
    checkTheme()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    })
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
      {isRetro && <RetroTennis />}
    </>
  )
}

// Create root route
const rootRoute = createRootRoute({
  component: RootComponent,
})

// Create index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <>
        <Hero />
        <About />
        <Experience />
        <Contact />
      </>
    )
  },
})

// Create route tree
const routeTree = rootRoute.addChildren([indexRoute])

// Create router instance
const router = createRouter({ routeTree })

// Register router type
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return <RouterProvider router={router} />
}

export default App
