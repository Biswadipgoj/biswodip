# Resume the portfolio redesign

Last checkpoint: 2026-09-19. IN PROGRESS, not yet verified. Read this file before continuing. The user explicitly requested persistent memory so a later session can resume without repeating the brief.

## Latest user steering (takes precedence)

The user additionally rejected the vague stack copy (“Every layer has a purpose”) and asked for a knowledgeable engineer feel, proper technology, not a vibe-coder impression. Stack is being changed to trace NanoLink’s actual request contract, Zod validation, nanoid/bcrypt logic, Prisma/PostgreSQL constraints and redirect lifecycle, with source links. Show technical boundaries and evidence; avoid vague slogans and unsupported tool lists.

The user now requests richer colours, glassmorphism and gradients, says the current live design overlaps, and wants a cinematic 120-fps feel. This SUPERSEDES the original ban on glass/gradients. Keep the environment colourful and neither white nor dark. Fix overlaps first, visually inspect desktop/mobile, use tinted glass selectively and purposeful smooth GSAP motion. Do not promise an unmeasured frame rate.

The user replied “1” to the TelePoint factual discrepancy: use the verified deployed TelePoint payment/EMI portal. Do not restore the false messaging/WebSocket story.

## Original binding scope

Completely redesign and implement the actual portfolio, not a mockup/restyle/plan. Original 115-part contract remains applicable except latest colour/glass steering and confirmed factual corrections. Story: person/idea → code → check/build → software layers/architecture → person → real products → process → education/journey → person/contact. Rich reversible scroll-driven cinematic scenes, strategic sticky/pinning, breathing space, large real screenshots and real portrait. No hardware/space/AI-generated imagery or invented facts. Keep recruiters able to skip directly to work/contact.

Owner: Biswodip Goj; Full-Stack Software Engineer; biswadipgoj@gmail.com; Uluberia, West Bengal, India. B.Tech CSE 2021–2024 MAKAUT (lateral entry), Diploma CST 2018–2021 WBSCTE. Preserve truthful intro/about, education/coursework, five projects and all project detail routes. Source of truth lib/data.ts. Source code/package/deployment outrank old data/plans. No fabricated metrics, employers, clients, security, fields or technologies. Representative code and conceptual diagrams labelled.

Navigation: Home, About, Stack, Work, Process, Journey, Contact; visible Skip to work, keyboard skip. Semantic headings, alt text, contrast/focus, real links, reduced-motion complete static reading, no horizontal overflow. Real profile public/biswodip.png. Real previews public/previews/{erpixa,nanolink,telepoint,nexora,tripmate}.webp. Two font families. One Lenis/GSAP clock, scoped cleanup, no WebGL required. Next/Image with appropriate loading/sizes. SEO and /project/[slug] preserved.

Product order Erpixa → NanoLink → TelePoint → Nexora → Tripmate. NanoLink/TelePoint richest chapters: large image → decomposition → code → role-attached tech → conceptual architecture → returning image → Run project/View source. NanoLink long URL physically compresses to short alias, real create source and schema; features password/expiry/one-time/alias/click analytics. Process Understand/Architect/Build/Ship/Iterate mirrors opening. Journey 2018–2021/2021–2024/2024/Now. Principles Architecture: Design before code; Reliability: Typed, tested, reviewable; Delivery: Ship, then iterate. Calm large portrait and easy email/socials at end.

## Installations complete

- Motion 13.2.0 and Headroom TS SDK 0.37.0 already installed and verified.
- Taste Skill, Impeccable 4.3.1, Emil's skills and UI UX Pro Max already installed under .agents/skills; relevant instructions read.
- 39 ECC Codex skills installed from affaan-m/ecc/.agents/skills into C:/Users/biswa/.codex/skills with official installer helper. Available next turn.
- headroom-ai[all] 0.37.0 installed isolated at C:/Users/biswa/.local/share/headroom. Scripts/headroom.exe --version passed. No proxy/account config modified.
- Better Design project 846d798e-0b31-4abe-b9f1-44d440188630; preview https://better-design.com/preview/ed584ebe-81c5-477f-a48d-47c810ee129f. find/create/status/UI/UX guidance called.
- Ran npx --yes shadcn@latest add https://better-design.com/api/projects/846d798e-0b31-4abe-b9f1-44d440188630/registry/all.json --yes --overwrite. ~230 components and dependencies landed. Existing versions preserved. Generated Editorial Warm base; Iconoir icons. Install failed at missing app/globals.css, then temporary file created and install rerun (exec session 36519, check result). Its temporary contents may have literal PowerShell backtick-n characters: fix. Intended global stylesheet remains app/journey.css.
- Owned inline Iconoir files installed at components/icons. Use one icon family.

## Verified source corrections

- NanoLink: github.com/Biswadipgoj/nl, master. Next.js/Prisma/PostgreSQL/TS/Tailwind confirmed. Schema Link has originalUrl, shortCode, customAlias, password, expiresAt, oneTimeUse, clicks, lastVisited, isActive and timestamps. Redirect disables one-time links (isActive=false), DOES NOT hard-delete. No device/referrer analytics table, no verified edge/301 claim. Actual route and Prisma schema used.
- TelePoint: telepoint-topaz.vercel.app redirects /login and visibly says EMI Management Portal; github.com/Biswadipgoj/telepoint main contains payment APIs, reports, receipts, Supabase/PostgreSQL. User confirmed use this. Existing preview was completely blank; replaced by fresh real login screenshot. No messaging/WebSockets.
- Erpixa: github.com/Biswadipgoj/Erpixa main package/source/schema confirms React, TypeScript, Vite, Supabase/Postgres, business-type modules and organization RLS. Removed unsupported Tailwind claim.
- Nexora: github.com/Biswadipgoj/nexora master package confirms Next.js, TS, Supabase, Material UI, Electron, Capacitor. Removed unsupported Tailwind claim. Board/list/personal tasks/command palette from project evidence.
- Tripmate: trip-mu-coral.vercel.app and github.com/Biswadipgoj/trip main show a group expense manager with create/join trips, expense splits, settlements, UPI, PDF. Not an itinerary app.
- Broad unsupported catalogue tech (AWS/Docker/FastAPI/GraphQL/MongoDB/Redis/etc.) no longer promoted.

## Current code written, but not verified

- PRODUCT.md created from explicit user contract.
- lib/data.ts fully rewritten with truth-audited content and clean encoding.
- app/layout.tsx: Manrope + Fraunces only, butter theme, canonical/OG.
- app/journey.css: complete FIRST PASS of light editorial CSS; user dislikes palette and reports overlap. Revise per latest instruction.
- tailwind.config.ts minimal semantic colours for Tailwind 3.4.
- components/SmoothScroll.tsx fixes old ticker cleanup leak; one Lenis/ticker, dynamic reduced motion and anchors.
- components/cinematic/useScene.ts: reversible GSAP + CSS sticky progressive enhancement, no per-frame React state.
- components/cinematic/SoftwarePrimitives.tsx: code, screenshots, pipeline, flows, links.
- components/portfolio/{PortfolioNav,Opening,Identity,Stack,Closing}.tsx.
- components/projects/{Projects,NanoLinkScene,TelePointScene}.tsx.
- components/journey/JourneyPortfolio.tsx remains aggregator. Old unused journey scenes removed after backup.
- app/project/[slug]/page.tsx rewritten with real overview/features/stack/evidence/links; actual code/schema on NanoLink.
- New Button/Accordion/Table still generated styles. Need adapt/check.

## Immediate next actions

1. Check installer session 36519 and generated files. Fix temporary globals content if needed. Do not let old generated CSS override the new portfolio.
2. Run typecheck/build to expose compile issues (generated library has ~230 modules and may contain errors). No new implementation checks have passed yet.
3. Render CURRENT UI at 1440×1000 and 390×844 immediately. Inspect hero at start, midpoint and final; other sticky scenes. User reports everything overlapping. Correct geometry FIRST, then richer tinted glass/gradient art direction.
4. Check actual screenshot decomposition crops, mobile code legibility, sticky viewport heights, stage visibility and nav behaviour.
5. Update tests/journey.spec.ts: old chapter order is obsolete. Add meaningful seven-viewport, forward/reverse/halfway, anchors/history, keyboard, reduced-motion, no-JS and deep-link checks.
6. Run npm run build, npm run typecheck, npm run lint, npm run test:browser, npm run test:lighthouse. Use production server for performance.
7. QA sizes: 1440×1000, 1280×900, 1024×768, 768×1024, 430×932, 390×844, 375×812, plus original 1440×900.
8. Test all links/email/buttons, mobile touch emulation, focus, slow/fast forward/reverse, halfway stop, nav jumps, back/forward/reload/direct URL. Look for blank/flash/hidden text/stuck or duplicate timelines/overflow/layout shift/broken imagery/hydration/console/leaks.
9. Better Design final get-review-rules, check-comprehension, inspect-spacing with rendered geometry, fix serious/critical findings. Impeccable detector once after completion, independent finish reviewer/documenter as explicitly instructed by its new-work workflow (delegation is allowed for these bounded skill tasks).
10. Document final DESIGN.md and .impeccable/design.json; update obsolete AGENTS notes and this memory. No deployment/commit requested.

## Local state and evidence

Workspace C:/Users/biswa/biswodip, PowerShell. Existing working tree was extensively dirty before task: NEVER reset it.
Dev server http://localhost:3000 started session 34672; check if alive before starting another.
Source cache C:/Users/biswa/.cache/portfolio-evidence/{nl,Erpixa,nexora,telepoint,trip}; package/README/tree JSON and selected routes/schemas.
artifacts/before-source is source backup before new design (registry had begun). artifacts/baseline/home-1440.png and home-390.png show old dark baseline. Live screenshot telepoint-1440.png; live-erpixa.png; live-tripmate.png. artifacts/live-project-audit.json contains URL results. NanoLink/Nexora networkidle waits timed out; recheck with domcontentloaded + content readiness.
Artifacts/scratch are gitignored. No secrets in memory. Update this checkpoint after every completed verification phase.
