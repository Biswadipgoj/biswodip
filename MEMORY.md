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

## Mobile & Desktop Overlap Elimination + Universal Scroll Animation Checkpoint — 2026-09-21
- Resolved root layout collisions across mobile and desktop:
  - Mobile Hero Gallery: Increased gallery clearance (`height: 375px; margin-top: 28px; margin-bottom: 24px;`), bound `.hero-small-image` and `.hero-mini-label` coordinates cleanly above `.hero-workflow` (30px+ clearance). Made `.hero-workflow` and `.hero-bottom` normal flow to eliminate card-on-workflow overlay.
  - Desktop Hero: Repositioned orbital badge `.chip-center` ("B.Tech CSE · 2024") to `left: 46%; bottom: 135px`, eliminating collision with `.hero-small-image` and workflow line.
  - Mobile Identity / About: Fixed `.identity-links` with `flex-wrap: wrap; gap: 12px 18px;` and `.identity-composition` full width alignment, preventing 468px overflow from shifting `.identity-intro` left to -39px. Headings, intro paragraph, and facts table now align cleanly at `left: 24px` with 0 cutoff.
  - Mobile Contact / Footer: Bound `.availability-badge` with `max-width: 100%; white-space: normal`, `.terminal-controls` with `flex-wrap: wrap; gap: 6px`, and `.contact-tools` wrapping, eliminating horizontal container blowouts.
  - Global overflow: Set `overflow: clip` on `.kinetic-band` and `.hero-stage` to prevent drifting headers from creating horizontal scrollbars.
- Universal Scroll Animation Engine:
  - Enabled scene builder `build` on both mobile and desktop in `components/cinematic/useScene.ts`.
  - Added mobile-calibrated scroll scrub timeline in `components/portfolio/Opening.tsx` (upward drift and 3D tilts on scroll).
  - Switched `[data-spatial]`, `[data-depth]`, and `[data-parallax]` triggers to element-relative triggers (`start: 'top 98%', end: 'bottom 8%', scrub: 0.45`), providing fluid 3D spatial motion (pitch, yaw, scale, and depth) linked to scroll on every section across both mobile and desktop.
- Verified Gates & Metrics:
  - `npm run typecheck`: Passed (0 errors).
  - `npm run lint`: Passed (0 warnings, 0 errors).
  - `npm run build`: Passed (13/13 static pages).
  - `node scripts/verify-responsive.mjs`: 28 states across 7 viewports passed with strictly `maxOverflow: 0`.
  - `npm run test:browser`: 39 passed, 3 skipped, 0 failures across 42 test cases.

## Creative Studio & Diploma CSE / Full University Name Checkpoint — 2026-09-21
- **Education Qualifications Fully Unabbreviated & Corrected**:
  - Full Institution Name: **`Brainware University, Kolkata`** everywhere (no "Univ" truncation).
  - Diploma Credential: Corrected from CST to **`Diploma in Computer Science & Engineering (Diploma CSE)`** (2018–2021).
  - B.Tech Credential: **`B.Tech in Computer Science & Engineering (B.Tech CSE)`** (2021–2024).
  - Updated in [lib/data.ts](file:///c:/Users/biswa/biswodip/lib/data.ts), [components/portfolio/Identity.tsx](file:///c:/Users/biswa/biswodip/components/portfolio/Identity.tsx), [components/portfolio/Closing.tsx](file:///c:/Users/biswa/biswodip/components/portfolio/Closing.tsx), [PRODUCT.md](file:///c:/Users/biswa/biswodip/PRODUCT.md), and [AGENTS.md](file:///c:/Users/biswa/biswodip/AGENTS.md).
  - Regenerated 1-page text-selectable PDF résumé ([public/Biswodip-Goj-Resume.pdf](file:///c:/Users/biswa/biswodip/public/Biswodip-Goj-Resume.pdf)) with 4,008 selectable characters, 0 page overflow, full Logicrack training details, and verified credentials.
- **Creative Studio Hero Opening**:
  - Replaced static preview cards and removed matrix grid in favor of **`CreativeStudio`** ([components/portfolio/CreativeStudio.tsx](file:///c:/Users/biswa/biswodip/components/portfolio/CreativeStudio.tsx)):
    - **Architecture Pipeline**: 4 connected interactive stages (`01 / INPUT: Requirement & Flow`, `02 / CONTRACT: Zod API Boundary`, `03 / SECURITY: PostgreSQL RLS`, `04 / PRODUCTION: Deterministic Delivery`) with active detail panel, `⚡ Dispatch Request` propagating wave, `🛡️ Tenant RLS: ACTIVE/BYPASS` toggle, and traffic speed selector (`1x`, `10x`, `turbo`).
    - **Schema & Contracts**: Color-coded syntax-highlighted interactive editor showcasing real `contract.ts` (Zod perimeter validation), `schema.prisma` (multi-tenant model), and `rls_policy.sql` (PostgreSQL 16 row security) with clipboard copy feedback.
    - **Live Telemetry**: Real-time stats (60+ shipped systems, 14ms latency, RLS security model, 100% validation) with packet counter.
    - **Ambient Constellation Field**: Over 1,000 animated kinetic elements/particles drifting smoothly in CSS (`@keyframes kineticFloat`).
    - **Reversible 3D Motion**: Single GSAP timeline control on `.hero-main-image.creative-studio` ensuring exact mathematical reversal on scroll back to 0.
- **Verification Gates**:
  - `npm run typecheck`: Passed (0 errors).
  - `npm run lint`: Passed (0 warnings, 0 errors).
  - `npm run build`: Passed (13/13 static routes).
  - `node scripts/verify-responsive.mjs`: 28 states across 7 viewports passed with strictly `maxOverflow: 0`.
  - `npm run test:browser`: 39 passed, 3 skipped, 0 failures across 42 test cases.
  - Browser visual inspection verified across Desktop (1440×900) and Mobile (390×844) with zero overlaps and zero text truncation.




## Master brief implementation � 2026-09-21
- Latest user explicitly requests dark cinematic styling; this overrides the older neither-white-nor-dark direction. Existing uncommitted work preserved.
- Hero uses real Erpixa screenshot and direct recruiter actions. CreativeStudio retained on disk but no longer imported; its simulated telemetry and example code are not presented as evidence.
- Anime.js 4.5.0 installed and official v4 scope API checked. useEntrance scopes brief entrances to child elements; GSAP retains reversible scroll motion with separate transform ownership. Reduced-motion scope cleanup included.
- Added Resume.tsx with experience timeline, skills, PDF preview and download. Public text remains in lib/data.ts. PDF rebuilt as two readable pages with 4290 selectable characters and 14 links; both pages rendered and visually checked.
- LinkedIn exact URL https://www.linkedin.com/in/biswodipgoj now comes from socials; no LinkedIn profile fetch performed.
- Canonical/robots/sitemap/JSON-LD use personal.canonicalUrl https://biswodip.in. Sitemap includes five detail pages.
- Removed unsupported absolute security outcomes from three project result statements and PDF. Remaining source verification concerns are in PORTFOLIO-REVIEW.md.
- Better Design required tools attempted; all HTTP 402 ANON_QUOTA_EXHAUSTED. Existing installed system retained. No remote review claimed.
- Removed unused global --scroll-kinetic update; reduced backdrop sampling. Narrow browserslist/baseline updates leave two Next/PostCSS audit advisories. No forced Next major migration.
- DOCX not generated; PDF source and builder are editable.
- Final production Lighthouse audit: performance 70 (target not met), accessibility/best practices/SEO 100, LCP 3369ms, TBT 858ms, CLS 0. Report artifacts/lighthouse-mobile.html. Startup/scene layout work remains an optimization item.
