# Biswodip Goj — Interactive Portfolio

> An immersive, colorful 3D digital experience that *happens to* showcase my work — not a casual portfolio.

A living, scroll-driven web experience: aurora gradients, a real-time WebGL hero,
magnetic interactions and live, embedded previews of shipped products.

## ✨ Highlights

- **Cinematic 3D hero** — a glassy transmission crystal, orbiting metallic accents and
  ~1,400 additive GPU particles, with mouse-reactive lighting, a scroll-driven camera
  dolly, bloom and subtle chromatic aberration (React Three Fiber + drei + postprocessing).
- **Vibrant aurora identity** — animated mesh gradients in electric blue, cyan, violet,
  emerald, pink and gold. Glassmorphism throughout, high-contrast and readable. No flat black.
- **Buttery motion** — Lenis smooth scrolling, Framer Motion reveals, magnetic ripple
  CTAs, a cursor glow, a gradient scroll-progress bar and an infinite tech marquee.
- **Live project showcases** — each featured project renders the *actual deployed site*
  in a scaled-down, 3D-tilt browser mockup that links straight to the live experience.
- **Interactive GitHub panel** — a magnetic, 3D-tilting glowing logo over an animated
  repository grid.
- **Storytelling flow** — Hero → About → Skills → Work → Journey → GitHub → Contact,
  flowing over one continuous aurora canvas.
- **Accessible & fast** — fully static prerender, lazy-loaded 3D, `prefers-reduced-motion`
  support, semantic landmarks and ARIA labels.

## 🧱 Tech stack

| Area        | Tools                                                            |
| ----------- | --------------------------------------------------------------- |
| Framework   | Next.js 14 (App Router), TypeScript                             |
| Styling     | Tailwind CSS, custom aurora design system                       |
| 3D          | Three.js, React Three Fiber, drei, @react-three/postprocessing  |
| Motion      | Framer Motion, GSAP, Lenis                                      |
| Fonts       | Sora (display) + Inter (body) via `next/font`                   |

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## 🗂 Project structure

```
app/                     # App Router entry, layout, global aurora styles
components/
  scene/HeroScene.tsx    # WebGL hero (crystal, particles, bloom, reactive lights)
  sections/              # Hero, About, Skills, Projects, Journey, GitHub, Contact
  ui/                    # MagneticButton, Counter, SectionHeading, ScrollProgress
  Navbar / Footer / SmoothScroll / CursorGlow
lib/data.ts              # Single content source (personal info, skills, projects, journey)
```

## 🎨 Editing content

All visitor-facing content lives in [`lib/data.ts`](lib/data.ts) — personal info,
stats, navigation, skill groups, projects, journey and social links. It is the single
content layer a future admin panel / CMS would write to, so the experience stays
fully content-driven.

## 🔗 Featured work

- **TelePoint** — https://telepoint-topaz.vercel.app/
- **Trip** — https://trip-mu-coral.vercel.app/

---

Built by **Biswodip Goj** · Uluberia, West Bengal, India · `biswadipgoj@gmail.com`
[github.com/Biswadipgoj](https://github.com/Biswadipgoj)
