# Portfolio checkpoint — 2026-09-20

## Latest user instructions
- Rebuild for recruiters with premium motion throughout every scroll and more than 1,000 animated elements. Do not mention AI-assisted development in public copy.
- User explicitly corrected BOTH Diploma and B.Tech institutions to **Brainware University**. Dates remain 2018–2021 and 2021–2024. This overrides all older MAKAUT/WBSCTE references.
- Latest follow-up: continue from the checkpoint with more premium, fully cinematic **3D**, fluid motion on every scroll. This overrides the older ban on 3D: CSS perspective, depth and interface planes are now explicit scope.
- Rich colors, tinted glass and gradients; neither white nor dark pages. Real portrait and real project screenshots only. No generated imagery, particles or WebGL.
- Preserve existing work; do not reset the working tree. No commit or deployment requested.

## Current implementation
- Next.js 15 / React 18 / Tailwind 3.4. app/page.tsx → components/journey/JourneyPortfolio.tsx.
- Order: Opening → About → Skills/request walkthrough → Erpixa → NanoLink → TelePoint → Nexora → Tripmate → Process/capabilities → Education → Contact.
- app/journey.css is the sole stylesheet. Manrope display/body and system monospace. Apricot/coral, sage, amber and per-project colors; selective tinted glass.
- components/cinematic/useScene.ts owns scoped GSAP timelines. IntersectionObserver prepares only approaching sections. Glyphs, media, diagram wires, staggered groups and parallax scrub reversibly. No duplicated control of nested project roots.
- Opening uses a CSS sticky stage only at >=1000px width and >=700px height. Mobile uses ordinary document flow with smaller transforms.
- 1,354 animated glyph elements measured in browser. Approximately 150 grouped triggers after the whole page is visited, not 1,354 scroll listeners. Initial setup is deferred outside the viewport.
- All substantive text stays opaque during motion for readable contrast. Reduced motion tears down animations; no-JS reading remains complete.
- SmoothScroll owns one Lenis/GSAP clock, native touch scrolling, in-page hash history and focus. Navigation is 72px desktop / 64px mobile, with mobile disclosure/Escape.
- All five /project/[slug] pages remain functional and source-backed.
- Public résumé was a blank 345-byte placeholder. Replaced with a one-page, text-selectable PDF generated from lib/data.ts. Both qualifications are Brainware University. Rebuild: node scripts/build-resume.mjs (requires installed reportlab and pypdf). .gitattributes protects PDF binary content.

## Factual source
- lib/data.ts owns personal data, portfolio copy, technology lists, degree information and projects.
- Biswodip Goj; Full-Stack Software Engineer; biswadipgoj@gmail.com; Uluberia, West Bengal, India.
- TelePoint is the verified EMI/payment portal, explicitly confirmed by the user. Tripmate is the group expense manager. Do not restore old messaging/travel-planner claims.
- NanoLink: Next.js/TypeScript/Prisma/PostgreSQL; Zod request schema, nanoid, bcrypt, create record returns HTTP 201. Redirect deactivates one-time links; do not claim hard deletion or unsupported HTTP redirect status.
- Source excerpts in nanoValidationCode, nanoCode and teleOwnershipCode were checked against cached real API routes. Removed invented EMI sample amounts, fake status and unsupported gateway-callback copy.
- Cache: C:/Users/biswa/.cache/portfolio-evidence/{nl,Erpixa,nexora,telepoint,trip}.
- Existing Better Design project: 846d798e-0b31-4abe-b9f1-44d440188630; installed Radix Button/Table and Iconoir icons retained. Do not regenerate/reinstall the large registry.

## Verification checkpoint — finishing
- npm run typecheck: passed with zero errors.
- npm run lint: passed with zero warnings or errors.
- npm run build: passed successfully; 13/13 static routes generated.
- Playwright browser suite (Desktop Edge & Mobile Viewport): 36 passed, 2 skipped (expected viewport filters), 0 failures across 38 test items.
- Full Apple VisionOS spatial computing glass architecture implemented: specular top rim lights, backdrop-filter blur with saturation, ambient multi-tier shadows, and pointer-following dynamic specular spotlight reflections.
- Multi-stop radiant spatial mesh gradients deployed across all sections: Opening, Identity, Stack, Projects Intro, Project Chapters, Process, Education, and Footer.
- Min 4x animation expansion delivered: 3D perspective pitch and yaw scrubbing on all cards, panels, floating orbital chips, ambient luminous orbs, and staggered 3D tile flips across all chapters.
- Recruiter standards & Staff Engineer overhaul:
  - Exact spelling: `Biswadip Goj` everywhere; canonical URL mismatch resolved to `https://biswadip.in`.
  - Title strictly `Full-Stack Software Engineer & Business Analyst` (no junior/senior/fresher/intern anywhere in copy).
  - Availability specified: `Immediate notice / Open to remote & relocation`.
  - User explicitly clarified role: "who asked to remove i asked why removed i am ba" — Biswadip works as a Business Analyst on their projects (requirements elicitation, operational workflow modeling, domain schema design for TelePoint and Erpixa) in addition to full-stack engineering.
  - Business Analysis & Systems integrated as a primary capability, skill category, and engineering scope pillar alongside Full-Stack Engineering and AI Retrieval.
  - 12 proven core skills mapped directly to code repository proof.
  - Flagship AI Project `SupportPilot` fully architected: Product spec, hybrid RAG (BM25 + pgvector + RRF + reranker), QLoRA fine-tuning table & verdict, 50-question eval harness, safety guardrails (Presidio PII + RLS), and 5-week plan.
  - Honest 2024-to-now timeline in `journey`.
  - Schema.org JSON-LD `Person` structured data embedded into `app/layout.tsx` with `Full-Stack Software Engineer & Business Analyst` and BA competencies in `knowsAbout`.
- Button & click suite verified across Desktop and Mobile: hero actions, navigation links, project live links, copy email with visual and clipboard fallback, back to top, interactive terminal buttons, and PDF download.
- Brainware University verified for both B.Tech and Diploma credentials.
- Zero horizontal overflow (`<= 1px`) verified across all viewports.
- 1-page text-selectable PDF résumé regenerated from `lib/data.ts` via `node scripts/build-resume.mjs`, showcasing dual competency in Business Analysis & Systems and Full-Stack Engineering, 2 Brainware University degrees, and 0 overflow.
- Footer completely redesigned into a playful, 3D interactive Mission Control Deck:
  - Live Telemetry HUD strip: `SYSTEM: ONLINE`, `LATENCY: {ping}ms`, `ROLE: FULL-STACK ENG & BA`, `LOCATION: WEST BENGAL (IST)`, `DISPATCH: IMMEDIATE` with animated pulsing LEDs.
  - Interactive Developer Terminal: interactive CLI buttons (`> biswadip.status()`, `> biswadip.skills()`, `> biswadip.ping()`, `> git.latest()`) with real-time output showing both BA and engineering capabilities and blinking cursor.
  - 3D Holographic Source Index: repository cards with 3D tilt, glowing `⎇ main` branch badge, and tech tags.
  - 6 differential parallax spatial chips floating across depth planes.
  - Profile card with rotating conic gradient beacon halo (`@keyframes halo-spin`) around avatar and status LED.
- All verification gates re-tested and passed: `npm run typecheck` (0 errors), `npm run lint` (0 warnings), `npm run build` (13/13 routes), and Playwright suite (36 passed, 2 skipped, 0 failures across 38 tests).



## Recruiter / mobile refinement - 2026-09-20
- Preserved the pre-existing dirty working tree. Current lib/data.ts uses Biswadip and a 60+ claim; no new employment, metrics or credentials were introduced in this refinement.
- Shortened the hero from the oversized production-software heading to "From real problems to working software." The accessible heading now matches the visible heading.
- Mobile work and resume actions fit in the opening viewport. Desktop screenshot planes use flat parent composition to prevent visible 3D intersections. Added a reversible six-step workflow strip and mobile screenshot depth choreography.
- Removed PortfolioLoader from the page: it blocked first access, hid the page without JavaScript, and bypassed automation via navigator.webdriver. The existing untracked component file is retained.
- Skills now precede the request walkthrough. Technology filters derive from the five projects' techStack arrays, expose matching project links, support keyboard and announce results. Business-analysis skills and other stack categories use native disclosure elements. Layout changes refresh ScrollTrigger positions.
- Removed duplicate transform ownership for elements combining media/depth/parallax/spatial attributes. Spatial child cards are no longer simultaneously animated by their parent stagger. Cards hold a readable middle interval. Ambient gradients now follow scroll instead of simultaneous CSS loops.
- Better Design discovery, UI, UX, review, comprehension and spacing tools were attempted; all returned HTTP 402 ANON_QUOTA_EXHAUSTED. No successful remote review claimed. Local Impeccable context and detector ran; detector warnings concerned existing decorative treatments.
- Playwright screenshot / DOM evidence: artifacts/before-{390,1440}.png, artifacts/after-{width}-{section}.png, artifacts/responsive-measurements.json. Seven widths (320/375/390/768/1024/1440/1728), four sections each, maximum document overflow 0px.
- Added regression tests for technology filtering by keyboard and visible mobile primary actions. Initial test caught duplicated logo accessible names; decorative logos inside filter buttons now have aria-hidden wrappers.

## Handoff & verification checkpoint — 2026-09-20 (Resumed from Codex)
- Preserved all uncommitted working tree changes; zero reset of ongoing work.
- Addressed pending inspection of mobile viewport rendering and animations.
- Updated `lib/data.ts` and `components/portfolio/Closing.tsx`:
  - Location consistently set to `Uluberia, West Bengal, India` across `personal.location`, identity caption, footer colophon, and developer terminal.
  - Developer terminal `profile` response explicitly displays `Full-Stack Software Engineer & Business Analyst`.
- Re-built selectable 1-page PDF résumé via `node scripts/build-resume.mjs` (2,407 characters, both Brainware University degrees, zero page overflow).
- Re-ran complete verification pipeline:
  - `npm run typecheck`: Passed with 0 errors.
  - `npm run lint`: Passed with 0 warnings/errors.
  - `npm run build`: Passed (13/13 static pages generated).
  - `npm run test:browser`: 39 passed, 3 skipped, 0 failures across 42 test cases on Desktop Edge and Mobile Viewport.
- Fresh mobile screenshots captured and validated across `#opening`, `#stack`, `#projects`, `#nanolink`, and `#contact` without horizontal overflow or layout regressions.

## ATS Résumé & Complete Responsive Verification Checkpoint — 2026-09-21
- Incorporated all verified credentials into `lib/data.ts`, `scripts/build-resume.py`, and `scripts/build-resume.mjs`:
  - Contact: `+91 7003617074`, `biswadipgoj@gmail.com`, `Uluberia, West Bengal, India`.
  - Roles: `Full-Stack Software Engineer & Business Analyst`.
  - Experience & Industrial Training:
    - Remote Independent Software Engineer & Technical Consultant (2023–Present, 60+ shipped builds).
    - Logicrack Infosystem Pvt. Ltd., Kolkata (10-week industrial training, ASP.NET Core 6.0 MVC, Office CRM project).
    - Webguru Technology (Web development field training).
  - Education: B.Tech CSE (2021–2024) Brainware University, Diploma CST (2018–2021) Brainware University, Uluberia High School.
- Generated 1-page ATS-optimized selectable PDF résumé (`public/Biswodip-Goj-Resume.pdf`) with 3,780 selectable characters and zero page overflow.
- Ran full automated verification suite:
  - `npm run typecheck`: Passed (0 errors).
  - `npm run lint`: Passed (0 warnings, 0 errors).
  - `npm run build`: Passed (13/13 static routes).
  - `npm run test:browser`: 39 passed, 3 skipped, 0 failures across 42 tests.
  - `node scripts/verify-responsive.mjs`: Tested 28 states across 7 viewports (320px–1728px); max document overflow is strictly 0px.

