# Implementation Plan

Status: rewritten 2026-09-11. This describes the plan actually executed and what remains.

## Objectives

1. Keep the portfolio focused on the real projects and the owner's full-stack engineering profile.
2. Give the tech-stack section an editorial page-transition treatment (folded sheets).
3. Present projects as a curved spatial slider without overlap, clipping or scroll hijacking.
4. Enforce one 1000 px desktop content width and a genuinely responsive mobile layout.
5. Fix all scrolling: anchors, skip controls, and the removal of pinned layouts that clipped content.

## Executed

### Content and positioning
- `lib/data.ts`: role set to "Full-Stack Software Engineer"; hero, process, facts, impact and
  contact copy rewritten around full-stack engineering with business-analysis awareness.
- Tech-stack narrative order restored: Frontend -> Backend & APIs -> DevOps & Cloud -> Data & Tooling.
- Projects reordered to lead with the data-backed builds (Erpixa, NanoLink, Nexora, TelePoint, Tripmate)
  and each now carries a `techStack`.
- Removed unsupported claims (no fabricated metrics, no "recruiter-verified", no fake telemetry).

### Tech stack — page transitions (`components/sections/Skills.tsx`)
- Desktop uses a pinned track (`lg:h-[360vh]`) with a sticky stage; scroll progress selects the layer.
- Each layer enters as a folded sheet from a deterministic edge (right, bottom, left, top) using
  `rotateX/rotateY` plus a `clip-path` reveal; `AnimatePresence mode="wait"` prevents cross-fade overlap.
- Tabs, Prev/Next, auto-play and Arrow/Home/End keys all drive the same state.
- The 12 cards per layer were compacted so a full layer fits the stage at 1440x900, 1920x1080,
  768x1024 and 390x844; only the shortest desktop (1024x768) uses the internal-scroll safety valve.
- Controls scroll the page through a Lenis-aware helper so the pinned track stays in sync.

### Projects — curved slider (`components/sections/Projects.tsx`)
- Desktop: perspective + transform-only coverflow. Center card forward and full size; neighbours
  arc down, rotate away and scale; they stay fully legible (depth from scale/rotation, not opacity).
- Pointer drag, arrow keys, dots and prev/next buttons; a shared section-level `useScroll` drives
  only decorative depth (no per-card scroll hooks).
- Mobile and reduced-motion: native horizontal scroll-snap row, no transforms, all links reachable.

### Layout, scrolling, responsiveness
- `app/globals.css`: `.section-shell` and `.header-inner` both cap at 1000 px; removed the
  `#projects` dark-stage override now that Projects is a light surface; natural-flow pipeline;
  reserved journey-card padding; decorative-sticker overflow fixed.
- `components/ui/SmoothScrollProvider.tsx`: single delegated handler for same-page anchors with
  header offset, focus management, instant skip, popstate/hashchange restore and a Lenis-aware
  programmatic scroll helper. Lenis is limited to fine-pointer desktop.
- `components/Navbar.tsx`: IntersectionObserver replaced with a single-rect-read scrollspy.

### QA
- `scripts/verify-refactor.mjs` (new): 320 px overflow scan, anchor/skip landing checks, project
  route checks, axe-core at 1440 and 390.
- `tests/tech-stack.spec.ts` rewritten; 14/14 pass on desktop and mobile.

## Remaining

- 1024x768 desktop is the one viewport where a layer's card grid needs a few pixels of internal
  scroll inside the pinned stage. Documented rather than hidden.
- Homepage first-load JS is 2.25 MB (Three.js/R3F). Code-splitting the 3D scene was not attempted.
- `scripts/verify-workbench.mjs` is pre-existing and stale; `scripts/verify-refactor.mjs` is the
  maintained browser check and now resolves the browser portably.

## Review follow-ups applied

A post-implementation review flagged and these were fixed in the same change:

- `tests/tech-stack.spec.ts` asserted layer-0 content after navigating to layer 3; it now scopes
  assertions to `#skill-panel-${layer}` and returns to layer 0 before checking `React & Next.js`.
- Projects drag now coalesces pointer events to one state update per frame, and `hostname` is
  computed with `useMemo` instead of on every render.
- Tech-stack background gradients now cross-fade by opacity and orb colours are static (no
  per-frame `background` interpolation or `scale` on heavily-blurred elements).
- The panel transition no longer animates `clip-path` and no longer sets a permanent `will-change`.
- `scripts/verify-refactor.mjs` resolves Edge/Chrome portably, defaults to port 3000 and throws a
  clear error when no browser is found.
- Removed the dead `CraftSpec.metric` field and values, and the orphaned `.tok-str`, `.tok-num`
  and `.term-ok` CSS rules.

