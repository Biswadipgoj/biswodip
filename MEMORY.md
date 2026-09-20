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
- Playwright browser suite (Desktop Edge & Mobile Viewport): 36 passed, 2 skipped (expected viewport filters), 0 failures.
- Comprehensive button & click suite added and verified: hero actions, desktop navigation, project live/source links, mobile navigation, copy-email with clipboard fallback & visual confirmation, and back-to-top navigation.
- Multi-scroll animations enriched: Opening stage (floating 3D orbital badges), Identity (counter-depth parallax on portrait sheet), Stack (3D panel depth and expanded kinetic drift ribbon), Projects (3D panel depth and specular hover), and Footer (4-layer floating 3D code chips with parallax and plane tilt).
- Footer completely redesigned: ultra-premium luxury aesthetic with live availability beacon, glassmorphic developer profile card with avatar, role chip and online indicator, 3D repository explorer with repository counter, holographic chromatic parallax signature, and magnetic back-to-top button.
- Brainware University authentic vector SVG logo rendered in education cards with smooth hover scale and tilt.
- AI/ML Engineering & modern backend skills integrated across lib/data.ts and synced with brand marks in components/ui/TechLogo.tsx.
- PDF résumé regenerated with 2,115 selectable characters reflecting Brainware University and AI/ML competencies.
- Zero horizontal overflow across both desktop and mobile viewports.
- Production preview verified on http://localhost:3029. Dev server preserved on http://localhost:3000.

