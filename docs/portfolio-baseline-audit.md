# Portfolio Baseline Audit

Status: rewritten 2026-09-11 to match the code that is actually in the repository.
Earlier versions of this file described features that were not present (for example six
projects that do not exist in `lib/data.ts`). Those claims were removed.

## How the audit was performed

- Read the app tree, `lib/data.ts`, section components, `app/globals.css`, and config.
- Ran `npm run typecheck`, `npm run lint`, and `npm run build`.
- Ran headless-browser measurements (Puppeteer/Edge) at 320, 390, 768, 1024, 1440 and 1920 px:
  page width vs. viewport, element bounding boxes, clipping, and duplicate/overflowing elements.
- Ran axe-core accessibility analysis at 1440 and 390 px.
- Ran the Playwright suite (`tests/tech-stack.spec.ts`) at 1440x900 and 390x844.

## Defects found and their status

| Defect | Evidence | Status |
|---|---|---|
| Horizontal page overflow on phones | `documentWidth` was 484 px on a 320 px viewport | Fixed — now exactly 320 px |
| Projects section clipped on mobile | A fixed-height pinned stage needed 792 px inside a 568 px viewport, clipping cards and their links | Fixed — curved slider with a horizontal scroll-snap mobile fallback |
| Skills section clipped | Desktop stage `scrollHeight` exceeded the viewport height by ~113 px | Fixed — pinned stage sized to content, internal-scroll safety valve only at 1024x768 |
| `#github` nav link had no destination | `Navbar` rendered an anchor to a section that was not mounted | Fixed — replaced with `#pipeline` |
| Inconsistent desktop width | Header measured 1376 px while the shell capped at 1280 px and Skills/Projects used `max-w-7xl` | Fixed — single 1000 px cap shared by header and sections |
| Duplicate DOM `id` | `id="terminal-command"` existed in both `About.tsx` and `TerminalDispatch.tsx` | Fixed — dispatch input renamed `dispatch-command` |
| Dangling `aria-controls` | Skills tabs pointed at panel ids that were not mounted for inactive layers | Fixed — removed |
| Inspector focus-trap re-ran on every parent render | `onClose` identity changed each render | Fixed — stored in a ref, trap mounts once |
| Scroll handler re-rendered every frame | Skills progress bar and Navbar scrollspy ran per-frame state updates / repeated rect reads | Fixed — integer-gated and single-rect-read handlers |
| Fabricated telemetry and claims | "PRODUCTION DEPLOYED", "48 Recruiter-Verified", fake ping latency, pseudo-precise metrics | Removed; remaining demos are labelled illustrative |
| Low-contrast text | axe flagged dimmed project slides and a counter | Fixed — 0 serious/critical axe findings at 1440 and 390 |

## Verified current baseline

- `npm run typecheck` — pass
- `npm run lint` — pass
- `npm run build` — pass, 13/13 pages generated, 5 project detail routes
- `npx playwright test` — 14/14 pass (Desktop Edge 1440x900, Mobile 390x844)
- axe-core — no critical or serious violations at 1440 or 390
- No page-level horizontal overflow at 320/390/768/1024/1440/1920
