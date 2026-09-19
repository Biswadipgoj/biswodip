# Workspace Memory & Rules: biswadip.in

## Resume checkpoint and latest direction

Read MEMORY.md first and keep it current. Latest user steering: richer colours, glassmorphism and gradients, neither white nor dark; fix overlaps and tune cinematic motion. This overrides older visual restrictions below. TelePoint is the verified EMI/payment portal (explicitly approved by user); Tripmate is the verified group expense manager. Follow actual source over obsolete claims. The full redesign is currently in progress; never reset existing uncommitted work.

## Portfolio Concept — "The Software Journey"
The site is one continuous editorial journey through software, not a sectioned template:

**Opening** (interface approaches the camera, pinned) → **Identity** → **Requirements** → **System architecture** → **Code** → **API** → **Data** → **Testing** → **Projects (5 cinematic chapters)** → **Capabilities** → **About** → **Contact**.

Source of truth for ALL content: `lib/data.ts` (personal, projects with per-chapter palette/flow meta under `project.chapter`, skills, education, socials). Never fabricate features, metrics, employers, or credentials.

## Architecture
- Next.js 15 App Router, React 18, TypeScript, Tailwind 3.4.
- `app/page.tsx` → `components/journey/JourneyPortfolio.tsx`, which renders scenes from `components/journey/` inside `SmoothScroll` (Lenis + GSAP ScrollTrigger bridge).
- Scenes: `OpeningScene, IdentityScene, RequirementsScene, ArchitectureScene, CodeScene, ApiScene, DatabaseScene, TestingScene` (wrapped by `ProcessScenes` under `#process`), `ProjectsSection` (three layouts: expanse=pin-expand, split=sticky, editorial), `CapabilitiesScene`, `AboutScene`, `ContactScene`, `JourneyNav`.
- Project detail pages: `app/project/[slug]/page.tsx` (uses `project.slug`, styled with the project's chapter palette via CSS vars).
- Styles: `app/journey.css` is the only global stylesheet. Scene palettes via `data-scene` attributes (paper/doc/steel/editor/sage/amber/cream/inkwell). Reveal motion via `useReveal` hook (`.rise` → `.in` IntersectionObserver). Pinned scrubs via GSAP in OpeningScene and ProjectsSection expanse layout. `prefers-reduced-motion` disables pinning and reveals — content stays fully readable.
- No 3D, no particles, no Three.js.

## Visual Design Rules (supersede any older directive, including earlier glassmorphism mandates)
- NO pure black or pure white pages; NO neon; NO brand gradients; NO purple/blue AI palette; NO glassmorphism-heavy UI; NO random decorative 3D/particles.
- Multi-atmosphere neutrals: warm paper, steel dark, faded-blue documentation, sage data, amber testing, cream about, warm near-black opening/contact. Each project chapter gets its OWN muted palette from `project.chapter` (bg/ink/accent).
- Visuals must be real: real project screenshots (`public/previews/*.webp`), the real photo (`public/biswodip.png`), real interfaces built from HTML/CSS. No AI-generated imagery ever.
- Every element passes the purpose test: what CSE concept does it show, why does it move, why that color. Restraint over density — not every scene must be animated.

## Verification
- `npm run build` must pass; `npm run test:browser` (Playwright, Edge channel, desktop 1440×900 + mobile 390×844) must pass — it asserts chapter order, real content, per-project screenshots, no horizontal overflow, no console errors, and project detail pages.
- Dev server: `npm run dev` on http://localhost:3000.

## Factual Identity
- Name: Biswodip Goj. Email: biswadipgoj@gmail.com. Location: Uluberia, West Bengal, India.
- Education: B.Tech CSE 2021–2024 (MAKAUT, lateral entry); Diploma CST 2018–2021 (WBSCTE).
- Projects (all live; url + screenshot in lib/data.ts): Erpixa (multi-tenant ERP), NanoLink (URL shortener), Nexora (workspace), TelePoint (real-time messaging — NOT a billing/EMI product), Tripmate (travel planner).
