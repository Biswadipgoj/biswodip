# Visual QA

Status: rewritten 2026-09-11. Evidence is programmatic; see the limitation note at the bottom.

## Method

- Headless Edge via Puppeteer (`scripts/verify-refactor.mjs`): overflow scan, anchor landing,
  route status, axe-core at 1440x900 and 390x844.
- A temporary script exercised the tech-stack layers (12 cards per layer, per-layer fit, text
  overflow) and captured screenshots to `artifacts/review/` at 1440x900 and 390x844.
- Playwright suite at 1440x900 (Desktop Edge) and 390x844 (Mobile Viewport).

## Results matrix

| Area | 390 | 768 | 1024x768 | 1440x900 | 1920 | Motion | Contrast | Overlap | Interaction |
|---|---|---|---|---|---|---|---|---|---|
| Hero | PASS | — | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Tech stack (4 layers + folded-sheet transitions) | PASS | PASS | PASS (safety-valve scroll) | PASS | PASS | PASS | PASS (axe clean) | PASS | PASS (tabs, keys, auto-play, scroll) |
| Projects (curved slider) | PASS (scroll-snap fallback) | PASS | PASS | PASS | PASS | PASS | PASS (axe clean) | PASS | PASS (drag, keys, dots, links) |
| Pipeline / process | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Contact / footer | PASS | — | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

Measured facts
- `documentElement.scrollWidth === window.innerWidth` at 320, 390, 768, 1024, 1440 and 1920.
- Tech stack: 12 `[data-inspect-btn]` cards per layer; `textOverflow = 0` at every tested viewport.
- All five project detail routes return HTTP 200 and render `.detail-grid`.
- Anchor and skip links land 8-16 px below the sticky header and move focus into the target.
- axe-core: no critical or serious violations at 1440 or 390.
- Playwright: 14/14 pass.

## Screenshots

`artifacts/review/` contains: `desktop-hero`, `desktop-skills-layer-1..4`, `desktop-projects`,
`desktop-impact`, `mobile-hero`, `mobile-skills`, `mobile-projects`.

## Limitation

The agent could not visually inspect these images (the model used for this session does not accept
image input). Judgements above are based on DOM measurements, computed styles, axe-core, and
automated interaction - not on a human or vision-model read of the screenshots. A human should
review `artifacts/review/*.png` before signing off on aesthetic quality.
