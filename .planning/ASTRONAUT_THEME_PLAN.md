# Astronaut/Space Theme - 3D Animated Portfolio Plan

## Vision
Create a **premium, immersive 3D portfolio** where the user is an astronaut floating through space, with their CSE projects as "space stations" and "planets" they've built. Every section is a 3D space scene with scroll-driven animations that feel like flying through the cosmos.

## Core Theme: "CSE Astronaut"
- **Background**: Deep space with nebulae, stars, planets
- **Hero**: Astronaut floating, helmet reflecting code/tech
- **About**: Space station interior view
- **Skills**: Constellation of tech stars/orbits
- **Projects**: Planets/stations orbiting - click to explore
- **Journey**: Timeline as orbital path
- **Contact**: Mission control / comms array

## 3D Animation Requirements (1000/100 Vibe)

### StudioScene (Main Background)
- **Astronaut model** floating in center with subtle idle animation
- **Helmet visor** reflects scrolling content / code snippets
- **Particle field** - stars, dust, cosmic rays
- **Nebulae** - animated volumetric clouds
- **Planets** representing projects orbiting
- **Scroll-driven**: Camera orbits astronaut, planets orbit faster, nebulae shift
- **Mouse parallax**: Subtle camera shift on mouse move

### Hero Section
- **Astronaut floating** with typed code appearing in visor reflection
- **Staggered reveal**: Name → Role → Tagline → CTA
- **Scroll parallax**: Astronaut drifts, stars streak, nebulae rotate
- **CTA button**: "Launch Mission" with thrust animation

### About Section
- **Space station interior** 3D scene
- **Floating panels** with info cards
- **Scroll reveals**: Panels slide in from airlock
- **Parallax**: Depth layers move at different speeds

### Skills Section
- **Constellation view**: Tech skills as stars in orbits
- **Interactive**: Hover star → expands to show details
- **Scroll**: Camera pulls back to show full constellation
- **Drag/throw**: Physics-based star interaction

### Projects Section
- **Solar system view**: Each project = planet with rings
- **Horizontal scroll** = orbital traversal
- **Hover planet**: Rings expand, info panel slides from side
- **Click**: Zoom into planet surface (project detail)
- **Scroll-driven**: Planets orbit, camera follows path

### Journey Section
- **Orbital timeline**: Path around a central star
- **Each step** = orbit milestone with particle burst
- **Scroll**: Camera follows orbital path

### Contact Section
- **Mission control**: Comms array, antennas
- **Form** = transmission interface
- **Send** = particle beam animation to "Earth"

## Technical Stack
- **React Three Fiber (R3F)** for 3D
- **@react-three/drei** for helpers
- **Framer Motion** for DOM animations
- **Lenis** for smooth scroll
- **GLSL shaders** for custom effects (nebula, visor reflection, stars)
- **GSAP** for complex timeline animations (optional)

## Color Palette (Space Theme)
```css
--space-bg: #03030a;           /* Deep space black */
--space-deep: #0a0a1a;         /* Slightly lighter */
--nebula-purple: #7c3aed;      /* Purple nebula */
--nebula-cyan: #06b6d4;        /* Cyan nebula */
--nebula-pink: #ec4899;        /* Pink nebula */
--star-white: #f8fafc;         /* Star white */
--star-gold: #fbbf24;          /* Gold stars */
--astronaut-white: #e2e8f0;    /* Suit white */
--visor-cyan: #22d3ee;         /* Visor reflection */
--engine-glow: #fb923c;        /* Thruster orange */
--accent-cyan: #22d3ee;        /* Primary accent */
--accent-purple: #a855f7;      /* Secondary accent */
--accent-emerald: #10b981;     /* Success/green */
```

## Animation Principles
1. **Physics-based**: Spring, damping, mass
2. **Scroll-driven**: Every scroll = camera/space movement
3. **Layered parallax**: 5+ depth layers
4. **Staggered reveals**: 0.08-0.15s stagger
5. **Hover/touch feedback**: Immediate 3D response
6. **Performance**: 60fps, GPU accelerated, reduced motion support

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Lenis smooth scroll provider
- [ ] Space theme CSS variables
- [ ] Base 3D scene setup (stars, camera, lighting)
- [ ] Astronaut model integration (GLTF or procedural)

### Phase 2: Hero & StudioScene (Week 1-2)
- [ ] Astronaut floating with idle animation
- [ ] Helmet visor shader with code reflection
- [ ] Scroll-driven camera orbit
- [ ] Nebula volumetric shader
- [ ] Particle star field

### Phase 3: Sections with 3D (Week 2)
- [ ] About: Space station interior
- [ ] Skills: Constellation orbits
- [ ] Projects: Solar system planets
- [ ] Journey: Orbital timeline
- [ ] Contact: Mission control

### Phase 4: Polish (Week 2-3)
- [ ] Sound design (subtle)
- [ ] Loading sequence (boot → launch)
- [ ] Performance optimization
- [ ] Mobile fallback (2.5D)
- [ ] Accessibility (reduced motion)

## File Structure Changes
```
components/
├── scene/
│   ├── StudioScene.tsx          # Main 3D background (REDESIGN)
│   ├── Astronaut.tsx            # Astronaut model + animations
│   ├── Nebula.tsx               # Volumetric nebula shader
│   ├── StarField.tsx            # Particle star system
│   ├── ProjectPlanets.tsx       # Solar system for projects
│   ├── SpaceStation.tsx         # About section interior
│   ├── Constellation.tsx        # Skills constellation
│   └── MissionControl.tsx       # Contact section
├── ui/
│   ├── SmoothScroll.tsx         # Lenis wrapper
│   ├── ScrollReveal.tsx         # Scroll-triggered reveals
│   ├── ParallaxLayer.tsx        # Parallax wrapper
│   └── MagneticButton.tsx       # Enhanced with 3D tilt
├── sections/
│   ├── Hero.tsx                 # Astronaut hero
│   ├── About.tsx                # Space station
│   ├── Skills.tsx               # Constellation
│   ├── Projects.tsx             # Solar system
│   ├── Journey.tsx              # Orbital timeline
│   ├── Impact.tsx               # Value props
│   └── Contact.tsx              # Mission control
```

## Performance Budget
- **Initial load**: < 3s
- **3D scene init**: < 1s
- **Frame time**: < 16.6ms (60fps)
- **Memory**: < 100MB
- **Bundle**: < 500KB gzipped (3D assets lazy loaded)

## Reduced Motion
- All 3D animations respect `prefers-reduced-motion`
- Fallback: Static astronaut, fade-in sections
- Lenis disabled, native scroll

## Accessibility
- Semantic HTML maintained
- Focus indicators visible
- Color contrast WCAG AA
- Screen reader friendly
- Keyboard navigation