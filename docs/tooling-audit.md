# Tooling Audit

Status: rewritten 2026-09-11 to describe what is actually installed and what was actually run.

## Present and verified

| Tool | Location | Notes |
|---|---|---|
| Next.js 15 (App Router) | `package.json` | Build and dev server verified |
| React 18 | `package.json` | — |
| TypeScript 5.6 (strict) | `tsconfig.json` | `npm run typecheck` passes |
| Motion (framer-motion v13) | `package.json` (`motion`) | Used for section transitions |
| GSAP | `package.json` (`gsap`) | Present; used in existing scene code |
| Three.js + React Three Fiber + drei | `package.json` | Used by `Computer3D` / scene components |
| Lenis | `package.json` | Smooth scroll, scoped to fine-pointer desktop |
| Tailwind CSS 3.4 | `package.json` | Utility styling |
| Puppeteer Core + @axe-core/puppeteer | `devDependencies` | Used for layout + accessibility checks in `scripts/verify-refactor.mjs` |
| Playwright | `devDependencies` | `tests/tech-stack.spec.ts`, 14 tests, desktop + mobile |
| Lighthouse | `devDependencies` | `scripts/audit-performance.mjs` (not run this session) |
| Ralph | `scripts/ralph/` | Upstream files present (`ralph.sh`, `prompt.md`, `prd.json.example`, `skills/`, `AGENTS.md`, `progress.txt`) |
| Antigravity adapter | `scripts/ralph/antigravity/` | `ANTIGRAVITY.md`, `ralph-antigravity.sh`, `ralph-antigravity.ps1`, `README.md` |

The Playwright config now accepts `PLAYWRIGHT_BASE_URL`, so the suite can target any
running server instead of a hardcoded port.

## Known stale content to treat with caution

- `scripts/ralph/prd.json` and older `docs/*` entries were written by earlier iterations and
  reference projects and features that do not exist in the current source (for example
  "AgentForge", "StreamPulse", "OmniScale", "DevGraph", "CodeOrbit", and a "120 FPS reel").
  The real project list is the five entries in `lib/data.ts`.
- `scripts/verify-workbench.mjs` is pre-existing and stale (it queries selectors such as
  `#github` and `.skill-tabs` that are not in the current app). It was not updated this session;
  `scripts/verify-refactor.mjs` is the maintained check.
- `tests/tech-stack.spec.ts` was rewritten this session to match the current UI and passes
  14/14 across both configured viewports.

## Not verified this session

- Headless Antigravity execution (`agy -p`) — the local executable was not available to probe,
  so no autonomous headless loop was run. The Ralph PRD/progress model was followed manually.
- Lighthouse performance scoring (`npm run test:lighthouse`) — not executed.
