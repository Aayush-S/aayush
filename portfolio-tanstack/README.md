# Portfolio - Built with TanStack

A modern, extensible one-page portfolio built with **React**, **TypeScript**, **Vite**, and **[TanStack Router](https://tanstack.com/router)**.

## Features

- **TanStack Router** - Type-safe routing for easy extensibility
- **Minimal Design** - Clean white background with forest green accents
- **Auto Dark Mode** - Follows system preferences
- **Fully Responsive** - Works on all devices
- **Simple & Clean** - No gradients, no unnecessary effects
- **Easily Extensible** - Component-based architecture
- **TypeScript** - Type-safe development
- **React 18** - Modern React with hooks

## Tech Stack

- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vite.dev/) - Fast build tool
- [TanStack Router](https://tanstack.com/router) - Type-safe routing
- Custom CSS - Unique styling with CSS variables

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Customization

### Personal Information

Edit these files to add your information:

#### `src/components/Hero.tsx`
- Update your name and subtitle
- Change the typing animation text

#### `src/components/About.tsx`
- Update the about text
- Modify the skills array with your technologies
- Replace the profile placeholder with your photo

#### `src/components/Experience.tsx`
- Update the `experiences` array with your work history
- Add/remove positions as needed
- Customize company names, dates, and descriptions

#### `src/components/Contact.tsx`
- Update the `contactLinks` array with your contact info
- Add your email, LinkedIn, GitHub, etc.

### Color Customization

Edit `src/App.css` to change the color scheme:

```css
:root {
  /* Light Mode */
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
  --accent-primary: #2d5016;  /* Forest green accent */
  /* ... */
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0a0a0a;
    --text-primary: #ffffff;
    --accent-primary: #6fa85c;  /* Lighter green for dark mode */
    /* ... */
  }
}
```

The design automatically switches between light and dark modes based on system preferences.

See `DESIGN.md` for the complete color palette and design system.

### Adding New Pages

Thanks to TanStack Router, adding new pages is easy:

1. Create a new route in `src/App.tsx`:

```typescript
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})
```

2. Add it to the route tree:

```typescript
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute, // Add your new route
])
```

### Adding New Sections

Create a new component in `src/components/`:

```typescript
// src/components/Projects.tsx
export default function Projects() {
  return (
    <section id="projects" className="projects">
      {/* Your content */}
    </section>
  )
}
```

Then import and add it to `App.tsx`:

```typescript
import Projects from './components/Projects'

// In the Index component:
<>
  <Hero />
  <About />
  <Projects /> {/* Add here */}
  <Experience />
  <Contact />
</>
```

## Design Philosophy

**Simple. Clean. Effective.**

The portfolio follows a minimal design approach:

- **Light Mode**: Clean white background with forest green accents (default)
- **Dark Mode**: Dark background with lighter green accents (auto-switches)
- **No gradients** - Just clean, solid colors
- **No complex animations** - Simple, meaningful interactions
- **Typography-focused** - Let your content shine

The theme switches automatically based on your system settings using `prefers-color-scheme`.

See `DESIGN.md` for the complete design system documentation.

## Components Structure

```
src/
├── components/
│   ├── Navigation.tsx/css   # Fixed navigation bar
│   ├── Hero.tsx/css         # Landing section with animation
│   ├── About.tsx/css        # About and skills section
│   ├── Experience.tsx/css   # Timeline of work experience
│   ├── Contact.tsx/css      # Contact links
│   └── Footer.tsx/css       # Footer with credits
├── App.tsx                  # Router setup and layout
├── App.css                  # Global styles and variables
└── main.tsx                 # React entry point
```

## Extensibility Features

Built with TanStack Router, your portfolio is ready to grow:

- **Easy Navigation**: Add navigation between different pages
- **Type-Safe Routes**: TypeScript ensures route safety
- **Search Params**: Use TanStack Router's search params for state
- **Nested Routes**: Create complex layouts easily
- **Code Splitting**: Automatically optimized loading

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Free to use and customize for your personal portfolio.

## Credits

Built with [TanStack](https://tanstack.com/) - High-quality open-source software for web developers.

---

**Built by Aayush Seth** - Feel free to customize and make it your own.
