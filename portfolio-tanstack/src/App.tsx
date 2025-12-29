import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

// Root route component
function RootComponent() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
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
