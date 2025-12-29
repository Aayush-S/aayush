# Portfolio Design System

A minimal, professional portfolio with a clean white background and forest green accents. Inspired by simple, effective portfolios like Twohy Design Works.

## Design Philosophy

**Simple. Clean. Effective.**

- Mostly white background (light mode)
- Forest/emerald green as accent color
- Automatic dark mode support
- No gradients, no unnecessary effects
- Focus on content and typography
- Professional and timeless

## Color Palette

### Light Mode (Default)
```
Background:
--bg-primary:    #ffffff   (Main background)
--bg-secondary:  #fafafa   (Alternate sections)
--bg-tertiary:   #f5f5f5   (Cards, placeholders)

Text:
--text-primary:   #1a1a1a  (Headings, body)
--text-secondary: #666666  (Subtitles, descriptions)
--text-tertiary:  #999999  (Meta text, dates)

Accent (Forest Green):
--accent-primary:   #2d5016  (Main green)
--accent-secondary: #1a3409  (Darker green)
--accent-hover:     #4a7c3b  (Hover states)

Borders:
--border-color: #e0e0e0
--border-hover: #2d5016
```

### Dark Mode
```
Background:
--bg-primary:   #0a0a0a   (Main background)
--bg-secondary: #1a1a1a   (Alternate sections)
--bg-tertiary:  #2a2a2a   (Cards, placeholders)

Text:
--text-primary:   #ffffff  (Headings, body)
--text-secondary: #b0b0b0  (Subtitles, descriptions)
--text-tertiary:  #808080  (Meta text, dates)

Accent (Lighter Green):
--accent-primary:   #6fa85c  (Main green)
--accent-secondary: #8bc34a  (Lighter green)
--accent-hover:     #a5d6a7  (Hover states)

Borders:
--border-color: #2a2a2a
--border-hover: #6fa85c
```

## Typography

**Font Stack:**
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
sans-serif
```

**Sizes:**
- Body: 16px / 1rem
- Line height: 1.7 for readability
- Hero title: 4rem (desktop) → 2.5rem (mobile)
- Section titles: 2.5rem (desktop) → 1.75rem (mobile)
- Subtle letter-spacing on titles: -0.02em

## Components

### Navigation
- Fixed top navigation
- Clean border bottom
- Simple hover effects
- No underlines unless hovered

### Hero
- Full viewport height
- Large, bold typography
- Typing animation on name
- Green accent on name
- Simple button CTAs

### About
- Alternating background (secondary)
- Two-column layout (content + photo)
- Simple skill badges
- Clean borders on hover

### Experience
- Timeline with simple line
- Small dot markers
- Clean card-like items
- Technology tags

### Contact
- Alternating background (secondary)
- Vertical list of contact methods
- Clean hover states
- Icon + text layout

### Footer
- Simple centered text
- Link to TanStack
- Border top only

## Interactions

**Minimal but Meaningful:**
- Color transitions on hover (0.2s ease)
- Border color changes
- No complex animations
- No parallax or floating effects
- Simple typing effect on hero name only

## Responsive Breakpoints

```css
Mobile:  max-width: 640px
Tablet:  max-width: 968px
Desktop: 1000px max-width container
```

## Dark Mode

Automatically switches based on system preference using:
```css
@media (prefers-color-scheme: dark)
```

Users don't need to toggle - it follows their system settings.

## Accessibility

- Focus visible states with accent color
- Semantic HTML structure
- Good color contrast ratios
- Keyboard navigation support
- Clear hierarchy

## What's NOT in This Design

- Gradients
- Floating animations
- Parallax effects
- Complex hover effects
- Background patterns
- Fancy transitions
- Cursor trails
- Heavy animations

## What IS in This Design

- Clean white space
- Clear typography hierarchy
- Subtle, meaningful accents
- Fast loading times
- Professional appearance
- Excellent readability
- Timeless design
- Easy to maintain  

## Inspiration

Inspired by portfolios like:
- Twohy Design Works
- Minimalist Swiss design
- Modern editorial layouts
- Clean SaaS websites

## File Structure

```
src/
├── App.css                  # Global styles, color variables
├── components/
│   ├── Navigation.tsx/css   # Simple fixed nav
│   ├── Hero.tsx/css         # Clean hero with typing
│   ├── About.tsx/css        # About with skills
│   ├── Experience.tsx/css   # Timeline layout
│   ├── Contact.tsx/css      # Contact list
│   └── Footer.tsx/css       # Simple footer
```

## Customization

**To change colors:**
Edit `src/App.css` lines 1-30 (CSS variables)

**To add sections:**
Create new component, keep the same simple style

**To modify content:**
Edit the component files directly

---

**Remember:** Less is more. Let the content shine.

