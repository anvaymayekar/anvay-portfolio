# Design Guidelines for Apple-Inspired Portfolio Website

## Design Approach
**Reference-Based Approach**: Apple Design Language
- Glassmorphism effects with soft blur
- Soft pastel gradients (light mode) and deep bluish gradients (dark mode)
- Smooth, continuous animations throughout
- Minimalist, centered layouts with breathing room

## Typography
**Primary Font (Hero Name)**: Pinyon Script or similar calligraphic font via Google Fonts
- Hero name: Large display size (4xl-6xl)
- Subtitle: Small, low-opacity text (sm)

**Body Font**: System font stack (Apple-style)
- Project titles: Bold, medium-large (xl-2xl)
- Descriptions: Regular weight, comfortable reading size (base-lg)
- Footer text: Small, low opacity (sm)

## Layout System
**Spacing**: Tailwind units of 4, 6, 8, 12, 16, 20
- Consistent padding: p-8 to p-12 for sections
- Card spacing: gap-8 between project cards
- Button spacing: px-6 py-3 for glass buttons

**Structure**:
- Hero: Centered glass card with circular photo avatar on right
- Projects: Grid layout (1-3 columns responsive)
- Footer: Centered with gradient divider line

## Core Components

### Hero Section
- **Glass Card Container**: Backdrop blur (blur-xl), rounded-2xl corners, soft shadow, semi-transparent background
- **Circular Avatar**: Glass-framed photo on right side of card
- **Typewriter Animation**: Animates "Anvay Mayekar" → backspace → "अन्वय मायेकर" → repeat, with blinking cursor
- **Subtitle**: "B.Tech (E&CS) — SAKEC, Mumbai • 3rd Semester | Robotics • IoT • Embedded Systems"
- **CTA Buttons**: Two glass-style buttons ("Projects" anchor link, "Resume" PDF link) with blur backgrounds

### Dark/Light Mode Toggle
- Animated switch using Framer Motion
- Positioned top-right corner
- Light mode: Soft pastel gradient background
- Dark mode: Deep bluish gradient with enhanced glass depth
- Smooth transitions for all elements (background, text, glass opacity)
- Theme persistence via localStorage

### Projects Section
- **Animation**: Fade-in from bottom on scroll using Framer Motion
- **Project Cards**: Glass boxes with:
  - Project title (bold)
  - Description text
  - Tech stack pills/tags
  - Live/demo link button
- **Data Source**: Firebase Firestore (placeholder config with dummy data)

### Footer
- Gradient line divider above footer
- Contact icons: Email, GitHub, LinkedIn (lucide-react icons)
- Centered layout with low opacity text
- Minimal, clean spacing

## Visual Effects

### Glassmorphism
- Backdrop filter blur (blur-xl to blur-2xl)
- Semi-transparent backgrounds (bg-white/10 to bg-white/20)
- Soft shadows for depth
- Border glow effects (border with low opacity white)

### Gradients
**Light Mode**: Soft pastels
- Background: gradient from soft pink/purple to blue/cyan tones

**Dark Mode**: Deep blues
- Background: gradient from deep navy to dark purple/blue

### Animations
- Typewriter effect: Smooth typing/backspacing with blinking cursor
- Scroll animations: Fade-in from bottom for project cards
- Hover effects: Subtle scale/glow on buttons and cards
- Theme transition: Smooth color and background changes
- Optional: Subtle floating/parallax effects on hero elements

## Responsive Design
**Mobile (< 768px)**:
- Single column layout
- Stack avatar below name in hero
- Full-width glass cards
- Touch-friendly button sizes

**Desktop (≥ 768px)**:
- Hero: Side-by-side layout (name/content left, avatar right)
- Projects: 2-3 column grid
- Generous spacing and breathing room

## Design Details
- **Border Radius**: rounded-2xl consistently across all cards/buttons
- **Shadows**: Soft, layered shadows for depth (shadow-lg to shadow-2xl)
- **Transitions**: All interactive elements use smooth transitions (transition-all duration-300)
- **Hover States**: Subtle scale (scale-105) and increased glow/shadow

## Images
No hero background image. The design relies on gradient backgrounds and a circular photo avatar (professional headshot of Anvay Mayekar) positioned in the hero glass card.