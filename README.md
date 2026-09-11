# Biswodip Goj â€” Creative developer portfolio

A saturated, full-color portfolio rebuilt around clear project storytelling and a fluid, interactive 3D sculpture.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm run build
npm start
npx tsc --noEmit --incremental false
node test-redesign.mjs
```

The browser smoke test expects the app on port 3000 and Microsoft Edge at its standard Windows installation path. It saves desktop, mobile, and contact screenshots locally.

## Design

- Coral-to-violet hero, mint project section, lavender expertise, apricot biography, and pink contact canvas.
- Editorial typography and responsive layouts from mobile through wide desktop.
- Real Three.js sculpture: drag to rotate, pull apart, bring together.
- GSAP ScrollTrigger reveals and progress, GSAP ticker-synchronized Lenis scrolling, magnetic buttons, pointer-driven 3D card tilt, animated color shapes, and continuous accents.
- Motion toggle freezes continuous 3D animation. System reduced-motion preferences use a static fallback.
- WebGL loads separately, pauses rendering when outside the viewport, and has an error fallback.
- Keyboard-visible focus, skip link, semantic sections, mobile navigation with Escape support, and copy-email feedback.

## Main source

- `app/page.tsx`: page entry.
- `components/Portfolio.tsx`: rebuilt portfolio and interactions.
- `components/scene/StudioScene.tsx`: real-time 3D sculpture.
- `app/globals.css`: responsive custom design system.
- `lib/data.ts`: original personal information, projects, and education.
- `public/biswodip.png`, `public/trip-preview.png`: existing image assets.

Legacy sections remain in the repository for reference but are not mounted by the new page.

## Content integrity

Erpixa and TelePoint previews are labeled conceptual interface illustrations; Tripmate uses the existing screenshot. Live links point to the original projects. No invented employment results, testimonials, or hiring guarantees are added. A resume button is intentionally absent until a real resume file is supplied.

## Verification

Run the production build and browser smoke test after changes. The test covers desktop/mobile overflow, WebGL mounting and dragging, the explode control, motion toggle, expertise categories, mobile navigation and Escape, system reduced motion, and browser exceptions.

The Next.js font configuration downloads Sora and Inter during builds, so the initial build needs network access.

## GSAP lifecycle

The scoped animation owner is components/useStudioMotion.ts. It reverts its GSAP context and media queries, removes pointer and visibility listeners, unregisters its ticker callback, and destroys Lenis when motion is paused or the component unmounts. System reduced-motion preference bypasses the animation setup. Background-tab visibility pauses the decorative loops. The Three.js frame delta is clamped, and scaling reuses the existing vector instead of allocating each frame.
