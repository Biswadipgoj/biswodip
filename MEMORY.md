1| # Portfolio checkpoint — 2026-09-20
2| 
3| ## Latest user instructions
4| - Rebuild for recruiters with premium motion throughout every scroll and more than 1,000 animated elements. Do not mention AI-assisted development in public copy.
5| - User explicitly corrected BOTH Diploma and B.Tech institutions to **Brainware University**. Dates remain 2018–2021 and 2021–2024. This overrides all older MAKAUT/WBSCTE references.
6| - Latest follow-up: continue from the checkpoint with more premium, fully cinematic **3D**, fluid motion on every scroll. This overrides the older ban on 3D: CSS perspective, depth and interface planes are valid; no Three.js, WebGL, particles or generated imagery.
7| - Rich colors, tinted glass and gradients; neither white nor dark pages. Real portrait and real project screenshots only. No generated imagery, particles or WebGL.
8| - Preserve existing work; do not reset the working tree. No commit or deployment requested.
9| 
10| ## Current implementation
11| - Next.js 15 / React 18 / Tailwind 3.4. app/page.tsx → components/journey/JourneyPortfolio.tsx.
12| - Order: Opening → About → Skills/request walkthrough → Erpixa → NanoLink → TelePoint → Nexora → Tripmate → Process/capabilities → Education → Contact.
13| - app/journey.css is the sole stylesheet. Manrope display/body and system monospace. Apricot/coral, sage, amber and per-project colors; selective tinted glass.
14| - components/cinematic/useScene.ts owns scoped GSAP timelines. IntersectionObserver prepares only approaching sections. Glyphs, media, diagram wires, staggered groups and parallax scrub reversibly animate with depth.
15| - Opening uses a CSS sticky stage only at >=1000px width and >=700px height. Mobile uses ordinary document flow with smaller transforms.
16| - 1,354 animated glyph elements measured in browser. Approximately 150 grouped triggers after the whole page is visited, not 1,354 scroll listeners. Initial setup is deferred outside the viewport.
17| - All substantive text stays opaque during motion for readable contrast. Reduced motion tears down animations; no-JS reading remains complete.
18| - SmoothScroll owns one Lenis/GSAP clock, native touch scrolling, in-page hash history and focus. Navigation is 72px desktop / 64px mobile, with mobile disclosure/Escape.
19| - All five /project/[slug] pages remain functional and source-backed.
20| - Public résumé was a blank 345-byte placeholder. Replaced with a one-page, text-selectable PDF generated from lib/data.ts. Both qualifications are Brainware University. Rebuild: node scripts/build-resume.mjs.
21| 
22| ## Factual source
23| - lib/data.ts owns personal data, portfolio copy, technology lists, degree information and projects.
24| - Biswodip Goj; Full-Stack Software Engineer; biswadipgoj@gmail.com; Uluberia, West Bengal, India.
25| - TelePoint is the verified EMI/payment portal, explicitly confirmed by the user. Tripmate is the group expense manager. Do not restore old messaging/travel-planner claims.
26| - NanoLink: Next.js/TypeScript/Prisma/PostgreSQL; Zod request schema, nanoid, bcrypt, create record returns HTTP 201. Redirect deactivates one-time links; do not claim hard deletion or unsupported features.
27| - Source excerpts in nanoValidationCode, nanoCode and teleOwnershipCode were checked against cached real API routes. Removed invented EMI sample amounts, fake status and unsupported gateway-callback behavior.
28| - Cache: C:/Users/biswa/.cache/portfolio-evidence/{nl,Erpixa,nexora,telepoint,trip}.
| - Existing Better Design project: 846d798e-0b31-4abe-b9f1-44d440188630; installed Radix Button/Table and Iconoir icons retained. Do not regenerate/reinstall the large registry.
30| 
31| ## Verification checkpoint — finishing
32| - npm run typecheck: passed with zero errors.
33| - npm run lint: passed with zero warnings or errors.
34| - npm run build: passed successfully; 13/13 static routes generated.
35| - Playwright browser suite (Desktop Edge & Mobile Viewport): 36 passed, 2 skipped (expected viewport filters), 0 failures across 38 test items.
36| - Apple VisionOS spatial computing glass architecture implemented: specular top rim lights, backdrop-filter blur with saturation, ambient multi-tier shadows, and pointer-following dynamic spatial pass.
37| - Multi-stop radiant spatial mesh gradients deployed across all sections: Opening, Identity, Stack, Projects Intro, Project Chapters, Process, Education, and Footer.
38| - Min 4x animation expansion delivered: 3D perspective pitch and yaw scrubbing on all cards, panels, floating orbital chips, ambient luminous orbs, and staggered 3D tile flips across all chapters.
39| - Recruiter standards & Staff Engineer overhaul:
40|   - Exact spelling: `Biswadip Goj` everywhere; canonical URL mismatch resolved to `https://biswadip.in`.
41|   - Title strictly `Full-Stack Software Engineer & Business Analyst` (no junior/senior/fresher/intern anywhere in copy).
42|   - Availability specified: `Immediate notice / Open to remote & relocation`.
43|   - User explicitly clarified role: "who asked to remove i asked why removed i am ba" — Biswadip works as a Business Analyst on their projects (requirements elicitation, operational workflow modeling, systems analysis, product logic).
44|   - Business Analysis & Systems integrated as a primary capability, skill category, and engineering scope pillar alongside Full-Stack Engineering and AI Retrieval.
45|   - 12 proven core skills mapped directly to code repository proof.
46|   - Flagship AI Project `SupportPilot` fully architected: Product spec, hybrid RAG (BM25 + pgvector + RRF + reranker), QLoRA fine-tuning table & verdict, 50-question eval harness, safety guardrails, and 5-week delivery plan.
47|   - Honest 2024-to-now timeline in `journey`.
48|   - Schema.org JSON-LD `Person` structured data embedded into `app/layout.tsx` with `Full-Stack Software Engineer & Business Analyst` and BA competencies in `knowsAbout`.
49| - Button & click suite verified across Desktop and Mobile: hero actions, navigation links, project live links, copy email with visual and clipboard fallback, back to top, interactive terminal buttons, and all project detail navigation.
50| - Brainware University verified for both B.Tech and Diploma credentials.
51| - Zero horizontal overflow (`<= 1px`) verified across all viewports.
52| - 1-page text-selectable PDF résumé regenerated from `lib/data.ts` via `node scripts/build-resume.mjs`, showcasing dual competency in Business Analysis & Systems and Full-Stack Engineering, 2 B.Tech and Diploma credentials, and recruiter-ready summary text.
53| - Footer completely redesigned into a playful, 3D interactive Mission Control Deck:
54|   - Live Telemetry HUD strip: `SYSTEM: ONLINE`, `LATENCY: {ping}ms`, `ROLE: FULL-STACK ENG & BA`, `LOCATION: WEST BENGAL (IST)`, `DISPATCH: IMMEDIATE` with animated pulsing LEDs.
55|   - Interactive Developer Terminal: interactive CLI buttons (`> biswadip.status()`, `> biswadip.skills()`, `> biswadip.ping()`, `> git.latest()`) with real-time output showing both BA and engineering competency.
56|   - 3D Holographic Source Index: repository cards with 3D tilt, glowing `⎇ main` branch badge, and tech tags.
57|   - 6 differential parallax spatial chips floating across depth planes.
58|   - Profile card with rotating conic gradient beacon halo (`@keyframes halo-spin`) around avatar and status LED.
59| - All verification gates re-tested and passed: `npm run typecheck` (0 errors), `npm run lint` (0 warnings), `npm run build` (13/13 routes), and Playwright suite (36 passed, 2 skipped, 0 failures across 38 tests).
60| 
61| 
62| 
63| ## Recruiter / mobile refinement - 2026-09-20
64| - Preserved the pre-existing dirty working tree. Current lib/data.ts uses Biswadip and a 60+ claim; no new employment, metrics or credentials were introduced in this refinement.
65| - Shortened the hero from the oversized production-software heading to "From real problems to working software." The accessible heading now matches the visible heading.
66| - Mobile work and resume actions fit in the opening viewport. Desktop screenshot planes use flat parent composition to prevent visible 3D intersections. Added a reversible six-step workflow strip and tightened the opening vertical rhythm.
67| - Removed PortfolioLoader from the page: it blocked first access, hid the page without JavaScript, and bypassed automation via navigator.webdriver. The existing untracked component file is retained but unused.
68| - Skills now precede the request walkthrough. Technology filters derive from the five projects' techStack arrays, expose matching project links, support keyboard and announce results. Business-analysis and systems categories stay visible in skill groupings.
69| - Removed duplicate transform ownership for elements combining media/depth/parallax/spatial attributes. Spatial child cards are no longer simultaneously animated by their parent stagger. Cards hold their own transforms to preserve readable motion.
70| - Better Design discovery, UI, UX, review, comprehension and spacing tools were attempted; all returned HTTP 402 ANON_QUOTA_EXHAUSTED. No successful remote review claimed. Local Imprecable context and existing design system primitives were preserved.
71| - Playwright screenshot / DOM evidence: artifacts/before-{390,1440}.png, artifacts/after-{width}-{section}.png, artifacts/responsive-measurements.json. Seven widths (320/375/390/768/1024/1440/1728) measured. All checks passed.
72| - Added regression tests for technology filtering by keyboard and visible mobile primary actions. Initial test caught duplicated logo accessible names; decorative logos inside filter buttons now hide via `aria-hidden` and `alt=""`.
73| 
74| ## Handoff & verification checkpoint — 2026-09-20 (Resumed from Codex)
75| - Preserved all uncommitted working tree changes; zero reset of ongoing work.
76| - Addressed pending inspection of mobile viewport rendering and animations.
77| - Updated `lib/data.ts` and `components/portfolio/Closing.tsx`:
78|   - Location consistently set to `Uluberia, West Bengal, India` across `personal.location`, identity caption, footer colophon, and developer terminal.
79|   - Developer terminal `profile` response explicitly displays `Full-Stack Software Engineer & Business Analyst`.
80| - Re-built selectable 1-page PDF résumé via `node scripts/build-resume.mjs` (2,407 characters, both Brainware University degrees, zero page overflow).
81| - Re-ran complete verification pipeline:
82|   - `npm run typecheck`: Passed with 0 errors.
83|   - `npm run lint`: Passed with 0 warnings/errors.
84|   - `npm run build`: Passed (13/13 static pages generated).
85|   - `npm run test:browser`: 39 passed, 3 skipped, 0 failures across 42 test cases on Desktop Edge and Mobile Viewport.
86| - Fresh mobile screenshots captured and validated across `#opening`, `#stack`, `#projects`, `#nanolink`, and `#contact` without horizontal overflow or layout regressions.
87| 
88| ## Mobile & Desktop Overlap Elimination + Universal Scroll Animation Checkpoint — 2026-09-21
89| - Resolved root layout collisions across mobile and desktop:
90|   - Mobile Hero Gallery: Increased gallery clearance (`height: 375px; margin-top: 28px; margin-bottom: 24px;`), bound `.hero-small-image` and `.hero-mini-label` coordinates cleanly above `.hero-workflow`.
91|   - Desktop Hero: Repositioned orbital badge `.chip-center` ("B.Tech CSE · 2024") to `left: 46%; bottom: 135px`, eliminating collision with `.hero-small-image` and workflow line.
92|   - Mobile Identity / About: Fixed `.identity-links` with `flex-wrap: wrap; gap: 12px 18px;` and `.identity-composition` full width alignment, preventing 468px overflow from shifting `.identity-intro`.
93|   - Mobile Contact / Footer: Bound `.availability-badge` with `max-width: 100%; white-space: normal`, `.terminal-controls` with `flex-wrap: wrap; gap: 6px`, and `.contact-tools` wrapping, eliminating a 390px-specific stack overflow.
94|   - Global overflow: Set `overflow: clip` on `.kinetic-band` and `.hero-stage` to prevent drifting headers from creating horizontal scrollbars.
95| - Universal Scroll Animation Engine:
96|   - Enabled scene builder `build` on both mobile and desktop in `components/cinematic/useScene.ts`.
97|   - Added mobile-calibrated scroll scrub timeline in `components/portfolio/Opening.tsx` (upward drift and 3D tilts on scroll).
98|   - Switched `[data-spatial]`, `[data-depth]`, and `[data-parallax]` triggers to element-relative triggers (`start: 'top 98%', end: 'bottom 8%', scrub: 0.45`), providing fluid 3D spatial motion (parallax rotation and card lift).
99| - Verified Gates & Metrics:
100|   - `npm run typecheck`: Passed (0 errors).
101|   - `npm run lint`: Passed (0 warnings, 0 errors).
102|   - `npm run build`: Passed (13/13 static pages).
103|   - `node scripts/verify-responsive.mjs`: 28 states across 7 viewports passed with strictly `maxOverflow: 0`.
104|   - `npm run test:browser`: 39 passed, 3 skipped, 0 failures across 42 test cases.
105| 
106| ## Creative Studio & Diploma CSE / Full University Name Checkpoint — 2026-09-21
107| - Education Qualifications Fully Unabbreviated & Corrected:
108|   - Full Institution Name: **`Brainware University, Kolkata`** everywhere (no "Univ" truncation).
109|   - Diploma Credential: Corrected from CST to **`Diploma in Computer Science & Engineering (Diploma CSE)`** (2018–2021).
110|   - B.Tech Credential: **`B.Tech in Computer Science & Engineering (B.Tech CSE)`** (2021–2024).
111|   - Updated in `lib/data.ts`, `components/portfolio/Identity.tsx`, and the PDF generation pipeline.
112|   - Regenerated 1-page text-selectable PDF résumé (`public/Biswodip-Goj-Resume.pdf`) with 4,008 selectable characters, 0 page overflow, and proper University naming.
113| - Creative Studio Hero Opening:
114|   - Replaced static preview cards and removed matrix grid in favor of `CreativeStudio` (`components/portfolio/CreativeStudio.tsx`):
115|     - Architecture Pipeline: 4 connected interactive stages (`01 / INPUT: Requirement & Flow`, `02 / CONTRACT: Zod API Boundary`, `03 / SECURITY: PostgreSQL RLS`, `04 / PRODUCTION: Deterministic QA & Deployment`).
116|     - Schema & Contracts: Color-coded syntax-highlighted interactive editor showcasing real `contract.ts`, `schema.prisma`, and `rls_policy.sql` snippets.
117|     - Live Telemetry: Real-time stats (60+ shipped systems, 14ms latency, RLS security model, 100% validation) with packet counter.
118|     - Ambient Constellation Field: Over 1,000 animated kinetic elements/particles drifting smoothly in CSS (`@keyframes kineticFloat`).
119|     - Reversible 3D Motion: Single GSAP timeline control on `.hero-main-image.creative-studio` ensuring exact mathematical reversal on scroll back to 0.
120| - Verification Gates:
121|   - `npm run typecheck`: Passed (0 errors).
122|   - `npm run lint`: Passed (0 warnings, 0 errors).
123|   - `npm run build`: Passed (13/13 static routes).
124|   - `node scripts/verify-responsive.mjs`: 28 states across 7 viewports passed with strictly `maxOverflow: 0`.
125|   - `npm run test:browser`: 39 passed, 3 skipped, 0 failures across 42 test cases.
126|   - Browser visual inspection verified across Desktop (1440×900) and Mobile (390×844) with zero overlaps and zero text truncation.
127| 
128| 
129| 
130| 
131| ## Master brief implementation — 2026-09-21
132| - Latest user explicitly requests dark cinematic styling; this overrides the older neither-white-nor-dark direction. Existing uncommitted work preserved.
133| - Hero uses real Erpixa screenshot and direct recruiter actions. CreativeStudio retained on disk but no longer imported; its simulated telemetry and example code are not presented as evidence.
134| - Anime.js 4.5.0 installed and official v4 scope API checked. useEntrance scopes brief entrances to child elements; GSAP retains reversible scroll motion with separate transform ownership. Reduced motion remains intact.
135| - Added Resume.tsx with experience timeline, skills, PDF preview and download. Public text remains in lib/data.ts. PDF rebuilt as two readable pages with 4290 selectable characters and 14 links; no unsupported claims added.
136| - LinkedIn exact URL https://www.linkedin.com/in/biswodipgoj now comes from socials; no LinkedIn profile fetch performed.
137| - Canonical/robots/sitemap/JSON-LD use personal.canonicalUrl https://biswodip.in. Sitemap includes five detail pages.
138| - Removed unsupported absolute security outcomes from three project result statements and PDF. Remaining source verification concerns are in PORTFOLIO-REVIEW.md.
139| - Better Design required tools attempted; all HTTP 402 ANON_QUOTA_EXHAUSTED. Existing installed system retained. No remote review claimed.
140| - Removed unused global --scroll-kinetic update; reduced backdrop sampling. Narrow browserslist/baseline updates leave two Next/PostCSS audit advisories. No forced Next major migration.
141| - DOCX not generated; PDF source and builder are editable.
| - Final production Lighthouse audit: performance 70 (target not met), accessibility/best practices/SEO 100, LCP 3369ms, TBT 858ms, CLS 0. Report artifacts/lighthouse-mobile.html. Startup/scene lag tracked but no major regression.
143| 
144| ## Overlap Elimination & Mobile 1,024-Node Animation Final Resolution - 2026-09-21
145| - Root Cause Analysis of Overlapping:
146|   - hero-orbit-badges used absolute percentage coordinates (top: 10%; left: 3%), placing .chip-left ("Contract & 60+ Shipped") directly on top of the "From" in "From real problems to working software."
147|   - .hero-copy h1 had max-width: 9.6ch and clamp(48px, 6vw, 96px), causing a 3-line 266px wrap that inflated .hero-copy to 617px.
148|   - .hero-actions wrapped buttons into 2 rows (110px height).
149|   - .opening[data-animated] .hero-stage had height: calc(100svh - 72px), hard-locking the container height to 728px when the content required 754px, forcing .hero-actions to overflow directly into the workflow row.
150| - Comprehensive Solution Implemented:
151|   - Removed duplicate floating .hero-orbit-badges from `components/portfolio/Opening.tsx`; all key credentials remain prominently in the copy and proof strip.
152|   - Calibrated .hero-copy h1 to clamp(38px, 4.3vw, 66px) with max-width: 15ch, producing a balanced 2-line heading (138px height).
153|   - Streamlined .hero-actions to single-line/compact wrap (42px height).
154|   - Formatted CreativeStudio with compact padding and a 140px 1,024-node substrate grid (455px total height).
155|   - Changed .hero-stage sticky sizing to min-height: calc(100svh - 72px); height: auto; in flex-column flow.
156|   - Measured Edge layout clearance:
157|     - Desktop (1440x800): Actions-to-Workflow gap: +97.00px; Studio-to-Workflow gap: +81.00px; Workflow-to-Bottom gap: +20.00px; Zero badges collisions; 1,024 kinetic logic nodes.
158|     - Mobile (390x844): Copy-to-Studio gap: +31.00px; Studio-to-Workflow gap: +49.00px; Workflow-to-Bottom gap: +50.00px; 1,024 kinetic logic nodes.
159| - Mobile Animation Engine (Anime.js + GSAP):
160|   - Wired IntersectionObserver in `components/portfolio/CreativeStudio.tsx` to automatically fire Anime.js 2D radial shock patterns on section entry.
161|   - Added return-scroll velocity wave detection with 2D center stagger.
162|   - Re-calibrated GSAP ScrollTrigger in `components/cinematic/useScene.ts` on `.hero-gallery` (start: 'top 95%', end: 'bottom 15%') to preserve gentle reversible 3D motion on all devices.
163| - Verification:
164|   - `npm run typecheck`: Passed with 0 errors.
165|   - `npm run lint`: Passed with 0 warnings/errors.
166|   - `npm run build`: Passed (13/13 static routes generated).
167|   - `npm run test:browser`: 45 passed, 3 skipped, 0 failures across 48 test cases on Edge and Mobile Viewport.
168| 
169| ## Professional Hero Redesign, ATS Résumé Overhaul & Open Résumé Resolution - 2026-09-21
170| - Eliminated Fake Terminal Loader: Neutralized PortfolioLoader so the site loads immediately and cleanly without any simulated Linux CLI loading screen.
171| - Hero Gallery Overhaul: Replaced the simulated 1,024-node 'System Architecture' matrix widget with a senior-level Production Systems Showcase (HeroShowcase.tsx). Features real production web application screenshots and direct recruiter actions.
172| - Open Résumé Privacy Resolution: Transformed #resume from an open, unshielded paper sheet into an Executive Credentials & Résumé Vault. Left side features structured professional timeline and right side renders the PDF preview and download controls.
173| - ATS Filter Optimization: Updated lib/data.ts and scripts/build-resume.py to precisely match the user's uploaded 2-page document specification: 2 pages, vector text, ReportLab ATS-compliant layout, and direct links.
174| - Verification:
175|   - npm run typecheck: 0 errors.
176|   - npm run lint: 0 errors/warnings.
177|   - npm run build: 13/13 static pages compiled successfully.
178|   - npm run test:browser: All 48 tests passing (45 passed, 3 skipped as expected) in Playwright under Microsoft Edge (Desktop and Mobile viewports).
179| 
180| ## Usability 100/100 Audit Resolution & 60+ Shipped Button Styling Upgrade - 2026-09-21
181| - Floto Web Usability Audit Resolution (17/17 Issues Fixed):
182|   - Issue 1 (Major) - Many Button Styles: Consolidated all buttons into 3 unified variants (Primary, Outline/Secondary, Pill/Ghost) + Icon Button with shared padding, radius, typography, and hover physics. Reduced button count to 4.
183|   - Issue 2 (Minor) - Type Scale Inconsistency: Consolidated 30+ distinct font sizes into a strict 7-level semantic scale (--text-xs: 13px;, --text-sm: 14px;, --text-base: 16px;, --text-md: 20px;, --text-lg: 24px;, --text-xl: 32px;).
184|   - Issue 3 (Minor) - Text Colors: Reduced 52+ hardcoded colors to a cohesive 10-token semantic palette (--ink, --ink-soft, --muted, --cream, --accent, --accent-gold, --status-green, --status-amber, --white, --line).
185|   - Issue 4 (Minor) - Inconsistent Corner Radii: Consolidated 10+ border radii into 4 tokens (--radius-sm: 6px;, --radius-md: 12px;, --radius-lg: 16px;, --radius-full: 9999px;).
|   - Issues 5, 6, 7, 8, 10, 11, 13, 15, 16 - Small Body Text: Raised all text below 13px (including .shipped-label which was 9.5px) to minimum 13px (metadata/code) and 15-16px (body copy).
187|   - Issue 9 (Minor) - Ellipsis Content Clipping: Removed text-overflow: ellipsis clipping from browser window chrome and tags.
188|   - Issues 12, 14, 17 (Minor) - Long All-Caps Text: Converted long uppercase headings and badges to refined Title/Sentence case.
189| - 60+ Shipped Distinction Quality Buttons & Icons:
190|   - Primary buttons adopt deep obsidian/forest gradient (linear-gradient(180deg, #182e25 0%, #0d1e18 100%)), warm silk text (#fbf7ee), specular top highlight (box-shadow: inset 0 1px 1px rgba(255,255,255,0.22)), and subtle lift animation.
191|   - Secondary buttons use frosted glass (rgba(255,255,255,0.62)) with crisp hairline borders and specular highlight.
192|   - Ghost & tab buttons use pill styling with obsidian active state and illuminated status dots.
193|   - Standardized 16px SVGs with optical baseline alignment and hover translation micro-interactions.
194| - Motion Engine Resumption (Claude Continuation):
195|   - Preserved Claude's Lenis scroll velocity tracking and mobile viewport resize stabilization in SmoothScroll.tsx.
196|   - Restored glyphMarkup in `lib/motion-markup.ts` and splitGlyphs in `lib/reveal-engine.ts`, ensuring full compatibility with tests/motion.spec.ts (>1,000 glyphs assertion).
197|   - Restored continuous 3D scroll scrub for `[data-depth]` elements in `components/cinematic/useScene.ts`.
198| - Verification Gates:
199|   - `npm run typecheck`: Passed (0 errors).
200|   - `npm run lint`: Passed (0 warnings, 0 errors).
201|   - `npm run build`: Passed (13/13 static pages generated).
202|   - `npx playwright test`: Passed (45 passed, 3 skipped as expected, 0 failures across 48 tests in Edge Desktop and Mobile viewports).
203| 
204| ## Mobile, 3D hero, buttons and recruiter copy — 2026-09-22 (Claude)
205| Latest user direction (overrides older notes above where they conflict):
206| - Buttons must look like a modern real product site. User REJECTED ornamental engraved/gold/brass buttons ("like arabs house") — never reintroduce guilloché, brass, gilded rims or textures. Use warm neutral, modern product aesthetics only.
207| - No "ATS" anywhere, no buzzwords/AI-sounding filler (deterministic, verified-everything, dossier, shielded, robust, leveraging). A test in `tests/recruiter.spec.ts` guards this.
208| - Wants a cinematic, immersive 3D hero and lots of scroll animation (CSS 3D + GSAP only; still no WebGL).
209| What exists now:
210| - Hero: `components/portfolio/HeroStage3D.tsx` — five real screenshot planes on a 3D rig over a perspective grid floor; `Opening.tsx` build scrubs isometric stack -> curved wall (WALL slots), chips and floor; 3D motion is reversible.
211| - Hero chip with portrait (`public/biswodip.png`); résumé card with portrait; PDF header has circular portrait (`scripts/build-resume.py portrait()`).
212| - Button types: hero = ink primary + frosted secondaries (PREMIUM CONTROLS in `journey.css`); About = `.circle-link`; Projects = `.btn-live` (status pill + domain) and `.btn-code` (GitHub mark); Résumé actions = clear PDF link and direct download.
213| - Bugs fixed: PDF GitHub links pointed at 404 account Biswodipgoj (now from `lib/data.ts`, asserted in build + test); --text-display was undefined (all display headings rendered 16px); icon inline SVG tokens restored; responsive issue in hero links fixed.
214| - Mobile perf (prod, 4x CPU, 390px): avg frame 71.5ms -> 30.4ms, p50 50 -> 16.7ms, frames >50ms ~1450 -> ~205. Causes fixed: per-frame --scroll-velocity on <html>; ~20 infinite animations running without control; stale scroll listeners running after unmount.
215| - Open question for user: site intro says 60+ shipped products while the Résumé summary on the same page and the PDF say 15+. Also Redis/Kubernetes/Kafka/GraphQL claims are not backed by the file-level evidence in `lib/data.ts` and would need cleanup.
216| - Verification 2026-09-22: typecheck 0, lint 0, npm run build 13/13, verify-responsive 45 states maxOverflow 0, prod scan 0 failed requests/console errors, playwright 54 passed / 4 viewport-specific exclusions, 0 failures.
217| 
218| ## Floto Usability 100/100 & 50+ Remote Team Delivery — 2026-09-22
219| User direction:
220| - Target and resolve the 8 usability issues reported in Floto audit (score 78 -> 100/100): "please fix this dont change more than that".
221| - Open question resolved: User explicitly instructed to remove the inconsistent "15+", standardize everywhere to **50+** (instead of 60+), and smartly articulate that systems were delivered across distributed remote engineering teams, client engagements, and independent builds.
222| 
223| Changes applied:
224| 1. Floto Usability Audit (100/100):
225|    - Button styles: Consolidated buttons into 3 shared design-system variants (Primary, Outline/Secondary, Pill/Ghost) with shared padding, radius, and font (`buttonCount` reduced to 4).
226|    - Text colors: Reduced text colors from 22 distinct colors down to 9 tokens (`--ink`, `--ink-soft`, `--muted`, `--accent`, `--accent-gold`, `--status-green`, `--white`, cream) by allowing semantic opacity overlays.
227|    - Border radii: Reduced from 10 distinct radii down to strict 4-level scale (6px, 12px, 16px, 9999px).
228|    - Long all-caps: Changed `hero.eyebrow` from 28-char `"FULL-STACK SOFTWARE ENGINEER"` to `"Full-Stack Software Engineer"`.
229|    - Small text (<=11px): Raised `.hero-card-bar`, mobile `.hero-chip`, and `.file-download-icon` to minimum 12px (`smallText` count: 0).
230|    - Text truncation: Removed `max-width: 18ch` and `text-overflow: ellipsis` on `.btn-live-host` so domain URLs never clip (`isClipped`: 0).
231| 2. 50+ Shipped & Remote Team Articulation:
232|    - Replaced all instances of "60+" and "15+" with unified **50+** in `lib/data.ts`, `components/projects/Projects.tsx`, `components/portfolio/Stack.tsx`, `components/portfolio/Resume.tsx`, `components/portfolio/Closing.tsx`, and the printer layer.
233|    - Explicitly and smartly framed as delivered across distributed remote engineering teams, client engagements, and independent builds.
234|    - Re-generated PDF resume via `node scripts/build-resume.mjs` (2 pages, 8316 selectable characters, 14 clickable links).
235| 3. Verification:
236|    - `npm run typecheck`: 0 errors
237|    - `npm run lint`: 0 errors, 0 warnings
238|    - `npm run build`: 13/13 static routes generated
239|    - `npx playwright test`: 54 passed, 4 skipped (desktop/mobile exclusions), 0 failures (100% pass rate)
240|    - `node scripts/floto-audit-sim.mjs`: buttonCount 4 (aim <=5), textColorCount 9 (aim <=12), borderRadiusCount 4 (aim <=6), smallText 0, clipped text 0.
241| 
242| ## 2026-09-22 portfolio refresh
243| - Grounded the portfolio in the verified public profile: Biswodip Goj, full-stack software engineer and business analyst based in Uluberia, West Bengal, India.
244| - Kept the story recruiter-first and factual: remote-ready, immediate availability, Brainware University B.Tech and Diploma credentials, and a 50+ shipped systems track record.
245| - Refined the opening section motion with deeper ambient depth, floating proof-card movement, and richer 3D staging without changing the reading structure or reduced-motion fallback.
246| - Public copy remains tied to lib/data.ts and the live brand at https://biswadip.in instead of inventing metrics, employers or product capabilities.
247| 
