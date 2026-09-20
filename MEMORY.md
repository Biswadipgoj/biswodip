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
  - Title strictly `Full-Stack Software Engineer` (no junior/senior/fresher/intern anywhere in copy).
  - Availability specified: `Immediate notice / Open to remote & relocation`.
  - 12 proven core skills mapped directly to code repository proof.
  - Flagship AI Project `SupportPilot` fully architected: Product spec, hybrid RAG (BM25 + pgvector + RRF + reranker), QLoRA fine-tuning table & verdict, 50-question eval harness, safety guardrails (Presidio PII + RLS), and 5-week plan.
  - Honest 2024-to-now timeline in `journey`.
  - Schema.org JSON-LD `Person` structured data embedded into `app/layout.tsx`.
- Button & click suite verified across Desktop and Mobile: hero actions, navigation links, project live links, copy email with visual and clipboard fallback, back to top, and PDF download.
- Brainware University verified for both B.Tech and Diploma credentials.
- Zero horizontal overflow (`<= 1px`) verified across all viewports.
- Production preview verified on http://localhost:3029. Dev server preserved on http://localhost:3000.


