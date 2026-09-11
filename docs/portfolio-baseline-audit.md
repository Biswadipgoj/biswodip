# Portfolio Baseline Audit

Date: 2026-09-11. Baseline revision: `3f6c744` plus the pre-existing working tree.

## Preservation

- Started on `main`, one commit ahead of `origin/main`.
- Created `feat/portfolio-verified-refinement` without resetting or stashing anything.
- Baseline had 28 modified tracked files and extensive untracked portfolio, skills, assets, tests and tooling. These are existing work, not disposable experiments.
- No files were staged at entry. Existing artwork, five source-data projects and project routes must be preserved.
- Read-only parallel audits cover architecture/motion, content/tests, and third-party tooling.

## Environment

Windows, Node 24.16.0, npm 11.13.0, npm lockfile. Next.js 14.2.35 App Router, React 18, TypeScript, Tailwind 3, GSAP, Motion, Lenis, Three.js and React Three Fiber. Next production server/Vercel-compatible deployment; no custom deployment script was found at the root.

## Executed Baseline

| Check | Observed result |
| --- | --- |
| `git status --short --branch`, `git log --oneline -10`, `git diff --stat` | Existing work inventoried; no reset or blanket stage |
| `npm ci` | First attempt hit Windows SWC lock from running Next servers; retry installed 572 packages |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS, no warnings |
| `npm run build` | FAIL: missing `/_document`, then middleware manifest; live dev process was restarting and sharing `.next` |
| `npm run test:e2e` | 13 passed, 1 failed in actual Edge desktop/mobile |
| `npm audit --json` | 9 advisories: 1 critical, 6 high, 2 moderate, including installed Next.js |
| Browser baseline | Actual Edge screenshots at 1440x1000 and 390x844; homepage loaded |

Screenshots: `artifacts/baseline-desktop.png`, `artifacts/baseline-mobile.png`; mobile failed-test screenshot under `test-results/tech-stack-Tech-Stack-Sect-cfc6c-st-text-in-Projects-section-Mobile-Viewport/`.

## Observed Defects

1. Full-page captures contain enormous empty lavender and near-black stretches. Initial offscreen content is hidden by reveal setup; long pinned areas amplify the problem.
2. The skills section is a dark, dense technology grid rather than an editorial software atlas. The software motifs are useful material to preserve.
3. The project presentation has useful curved depth and real imagery, but mobile titles/control labels can be hidden and descriptions are truncated.
4. Mobile test failure selects a deliberately hidden desktop `Erpixa` label. The screenshot also shows the selected project moved to Tripmate, making autoplay/scroll timing unsuitable for deterministic assertions and reading.
5. Project screenshot claims `POSTGRES RLS - PROD VERIFIED` even on Tripmate. Architecture claims must be project-specific.
6. Hero foreground uses glowing primitives and a literal monitor. The software-first direction needs more purposeful application-layer storytelling.
7. Legacy README still describes a sculpture, old selectors and obsolete test behavior. Existing smoke script hardcodes five projects and old tab selectors; it is not a valid current acceptance gate.
8. Concurrent dev/build output is unsafe. Development output must be isolated before relying on build results.
9. No unit-test command or broad current navigation/reduced-motion/viewport regression suite is provided by package scripts.

## Limits Of Baseline Evidence

Full-page screenshots do not prove that content is unreachable after scrolling. They do prove that content availability depends on animation setup. Console/network, intermediate fold states, keyboard navigation, live/source endpoints, contrast and performance require the expanded browser QA; they are not baseline PASS claims.
