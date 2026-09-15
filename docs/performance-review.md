# Performance Review

Status: rewritten 2026-09-11. Only measured values are stated.

## Build output

`npm run build` reports a homepage First Load JS of **2.25 MB** (2.36 MB with page code).
Shared chunks are 103 kB; the remainder is page-specific (Three.js / React Three Fiber / drei
and the animation runtime, pulled in by the hero 3D scene).

Project detail routes are 111 kB first load — they do not load the 3D scene.

## Optimisations applied this session

- Removed per-frame React state churn:
  - Skills progress bar now updates only when the integer percentage changes and only on desktop.
  - Navbar scrollspy reads each section rect once per frame and skips redundant `setActive`.
- Removed per-card `useScroll` hooks in Projects; a single section-level `useScroll` drives
  decorative depth only.
- `Computer3D` is dynamically imported with `ssr: false` and a lightweight loading fallback.
- Pinned tech-stack stage is bounded (`lg:h-screen` with a content-fit grid) so offscreen work
  is limited; motion is disabled when the section is out of view (auto-play gated by `useInView`).
- Anchor/skip navigation uses a single delegated document listener instead of per-link handlers.

## Known limitations

- The 2.25 MB homepage bundle is the main outstanding performance item. Code-splitting the hero
  3D scene (or replacing it with a static poster until interaction) would be the highest-impact
  next step. This was not attempted in this session.
- No Lighthouse run or long-task/frame-pacing profile was executed this session, so no FPS claims
  are made. The master brief's "120 FPS" target is explicitly **not** claimed; only that no
  clipping, overlap, or runaway scroll length was observed.
- The pinned tech-stack stage uses a small internal scroll at 1024x768 because that viewport is
  shorter than the stage's content; this is a deliberate safety valve, not a measurement failure.
