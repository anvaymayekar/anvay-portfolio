# Anvay Mayekar - Personal Portfolio

A stunning Apple-inspired personal portfolio website featuring glassmorphism design, smooth animations, and bilingual typewriter effects.

## 🎨 Design Features

### Visual Design
- **Glassmorphism Effects**: Soft backdrop blur with semi-transparent backgrounds
- **Gradient Backgrounds**: 
  - Light mode: Soft pastel gradients (pink, purple, cyan)
  - Dark mode: Deep bluish gradients (navy, purple, blue)
- **Typography**: Pinyon Script calligraphic font for hero name, Inter for body text
- **Color Palette**: Purple, pink, and cyan accents throughout

### Animations
- **Bilingual Typewriter**: Alternates between "Anvay Mayekar" (English) and "अन्वय मायेकर" (Marathi) with smooth typing and backspacing effects
- **Blinking Cursor**: Authentic typewriter cursor animation
- **Scroll Animations**: Project cards fade in from bottom with staggered timing
- **Theme Transitions**: Smooth 300-700ms transitions between light and dark modes
- **Hover Effects**: Subtle scale and glow on interactive elements

### Theme System
- **Light/Dark Mode Toggle**: Animated switch button in top-right corner
- **localStorage Persistence**: Theme preference saved between sessions
- **Smooth Transitions**: All colors, backgrounds, and effects transition smoothly

## 📱 Sections

### Hero Section
- Centered glass card with glassmorphism effects
- Bilingual animated name with typewriter effect
- Professional subtitle: "B.Tech (E&CS) — SAKEC, Mumbai • 3rd Semester | Robotics • IoT • Embedded Systems"
- Circular avatar with glass frame and floating animation
- Two CTA buttons: "View Projects" (smooth scroll) and "Resume" (PDF download)

### Projects Section
- Grid layout (1-3 columns based on screen size)
- 6 featured projects in robotics, IoT, and embedded systems:
  1. Smart Home Automation System (ESP32, Arduino, MQTT, Firebase)
  2. Autonomous Line Following Robot (Arduino, C++, PID Control)
  3. Environmental Monitoring Station (Raspberry Pi, Python, InfluxDB, Grafana)
  4. Gesture Controlled Robotic Arm (OpenCV, TensorFlow, Arduino)
  5. Solar Panel Tracking System (Arduino, Servo Motors, LDR Sensors)
  6. Wireless Sensor Network (ESP8266, LoRa, MQTT)
- Each card displays: title, description, tech stack badges, demo/code links
- Fade-in animations on scroll
- Hover effects with elevation and gradient text

### Footer
- Gradient divider line
- Social links with icons: Email, GitHub, LinkedIn
- Glassmorphism styling on icon containers
- Copyright information

## 🛠️ Technical Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter (client-side routing)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Shadcn UI (Button, Badge, Toaster, Tooltip)
- **Data Fetching**: TanStack Query v5

### Backend
- **Server**: Express.js
- **Runtime**: Node.js
- **Storage**: In-memory storage (MemStorage)
- **Validation**: Zod schemas

### API Endpoints
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create new project (with validation)

## 📁 Project Structure

```
client/
├── public/
│   ├── favicon.png
│   └── Anvay_Mayekar_Resume.pdf
├── src/
│   ├── components/
│   │   ├── ui/ (Shadcn components)
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── AnimatedName.tsx
│   │   └── ProjectCard.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── not-found.tsx
│   ├── lib/
│   │   └── queryClient.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
└── ...

server/
├── routes.ts (API endpoints)
├── storage.ts (Data layer)
└── index.ts (Express server)

shared/
└── schema.ts (TypeScript types & Zod schemas)
```

## 🎯 Key Features Implementation

### Glassmorphism CSS
- Backdrop blur: `backdrop-blur-glass` (20px)
- Semi-transparent backgrounds: `bg-white/30` (light), `bg-white/10` (dark)
- Border glow: `border-white/50` with low opacity
- Gradient overlays on hover

### Responsive Design
- **Mobile (<768px)**: Single column, stacked layout, touch-friendly buttons
- **Desktop (≥768px)**: Multi-column grid, side-by-side hero layout
- Fluid typography and spacing
- Optimized for all screen sizes

### Animation Timing
- Typewriter speed: 120ms per character (typing), 80ms (backspacing)
- Pause duration: 2 seconds between language switches
- Cursor blink: 530ms interval
- Scroll fade-in: 500ms with 100ms stagger per card
- Theme transition: 300-700ms

## 🚀 Development

### Run Locally
```bash
npm run dev
```
Server starts on port 5000 with hot module replacement.

### Environment
- Node.js 20
- All dependencies managed via npm
- Uses Replit's fullstack_js template

## 📝 Future Enhancements
- Connect to real Firebase Firestore for project data
- Add contact form with email integration
- Implement blog section for technical articles
- Add project filtering by tech stack
- Performance optimization for lower-powered devices
- Enhanced parallax scrolling effects

## 🎓 About Anvay Mayekar
B.Tech student in Electronics & Computer Science at SAKEC, Mumbai (3rd Semester). Passionate about Robotics, IoT, and Embedded Systems with hands-on experience building innovative hardware and software solutions.

## 📄 License
Personal portfolio project © 2024 Anvay Mayekar
