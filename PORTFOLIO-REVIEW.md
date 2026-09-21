# Portfolio and resume review — 2026-09-21

## Implemented
- Preserved Next.js 15, React 18, installed Better Design primitives, Iconoir icons, project detail routes, skill filtering, native mobile scrolling and the existing GSAP/Lenis clock.
- Dark cinematic page surfaces, responsive hero composition using an actual Erpixa screenshot, quieter background decoration, readable light project panels, explicit contact and LinkedIn actions.
- Anime.js 4.5.0 owns short entrance animations on dedicated child elements. GSAP retains reversible scroll timelines; the two engines do not write to the same elements. Scope cleanup and live reduced-motion changes are handled by Anime.js scopes.
- Dedicated resume preview, download, experience timeline and expandable skills section. Header Resume navigates to this section; hero and contact downloads remain direct.
- Correct LinkedIn URL in public data, hero, identity, contact/footer, JSON-LD and PDF. LinkedIn was not fetched or used as a source.
- Canonical URLs, Open Graph, robots and the six-entry sitemap derive from the existing personal.canonicalUrl (https://biswodip.in).
- PDF now has two single-column pages with 9–10pt body text, conventional headings, selectable text and 14 usable link annotations. Both pages were rendered and visually inspected. All professional content derives from lib/data.ts.

## Resume findings and facts requiring owner review
- Previous PDF used approximately 7pt body text, duplicated hardcoded content and introduced unsupported sub-millisecond retrieval and zero-leakage claims. Removed these absolutes and the 60+ count from the PDF; kept project descriptions focused on implementation.
- Existing portfolio data still claims 60+ shipped systems. Supply a project inventory and distinguish public projects, client builds and experiments before using this as a quantified achievement in applications.
- Freelance experience is dated 2024–Present without named clients, individual engagement dates or references. Existing data is preserved; please verify the period and add discloseable client details.
- Training organizations, dates and skills come from existing data, not independently authenticated certificates. Confirm Logicrack and Webguru details against original records.
- Existing AI/RAG skills and advanced infrastructure/messaging skills are retained from the source; confirm hands-on evidence before targeting jobs around these. SupportPilot has historical unverified evaluation numbers in lib/data.ts but is not added to the resume.
- No employment gap was invented from missing dates. No new credentials, metrics or employers were added.
- A DOCX is not generated in this pass. The required document runtime/rendering setup was not available; the PDF builder and source data remain editable.

## Architecture and maintenance findings
- CreativeStudio and PortfolioLoader are retained in the working tree but are not used by the page. CreativeStudio's simulated telemetry and example contract code are no longer presented as project evidence.
- The repository contains a large historical skill catalog and legacy CSS. Existing Three.js, motion, registry and tooling dependencies were retained because removal would require a separate dependency audit; they are not imported by the new components.
- Better Design discovery, UI, UX, review, comprehension and spacing requests all returned HTTP 402 ANON_QUOTA_EXHAUSTED. No remote design approval is claimed.
- npm audit after narrow transitive updates reports two remaining advisories (one moderate, one high), associated with Next.js's nested PostCSS. No forced framework migration was performed.

## Run
- npm run dev — http://localhost:3000
- npm run build; npm run start -- -p 3029 — production preview
- node scripts/build-resume.mjs — regenerate PDF and preview (Python reportlab, pypdf, PyMuPDF and Pillow required)
- npm run typecheck; npm run lint
- PowerShell: $env:PLAYWRIGHT_BASE_URL='http://localhost:3029'; npm run test:browser
- PowerShell: $env:PORTFOLIO_URL='http://localhost:3029'; node scripts/verify-responsive.mjs

## Main changed files
app/journey.css; app/layout.tsx; app/sitemap.ts; app/robots.ts; components/journey/JourneyPortfolio.tsx; components/portfolio/Opening.tsx; components/portfolio/Identity.tsx; components/portfolio/PortfolioNav.tsx; components/portfolio/Resume.tsx; components/cinematic/useEntrance.ts; lib/data.ts; scripts/build-resume.mjs; scripts/build-resume.py; scripts/verify-responsive.mjs; tests/recruiter.spec.ts; package.json; package-lock.json; public/Biswodip-Goj-Resume.pdf; public/resume-preview.webp.

Existing uncommitted work was preserved. No commit or deployment was made.

## Production audit
- npm run build, npm run typecheck and npm run lint pass on the final implementation.
- Lighthouse mobile simulation: performance 70, accessibility 100, best practices 100, SEO 100; LCP 3.369s, TBT 858ms, CLS 0. Its performance gate remains FAILED (target 90 and LCP <=2.5s). The first audit was 69/96; contrast corrections and backdrop/scroll changes improved accessibility but did not resolve startup cost.
- Remaining performance work: reduce initial client hydration/GSAP initialization and legacy scene layout reads. No claim of meeting the Lighthouse performance target.
- Official Anime.js v4 reference used: https://animejs.com/documentation/scope/ and https://github.com/juliangarnier/anime. Installed API declarations checked before implementation.
