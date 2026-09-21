# Workspace rules: biswodip.in

Read MEMORY.md first and keep it current. Never reset existing uncommitted work.

## Current brief
Build a recruiter-facing, continuous software journey with premium reversible animation throughout. Latest instructions ask for more than 1,000 animated elements, richer colors, tinted glass and gradients, and neither white nor dark pages. These supersede older restrictions. Do not mention AI-assisted development in public copy.

## Source and identity
- All public content comes from lib/data.ts. Never invent metrics, employers, credentials or product capabilities.
- Biswodip Goj; biswadipgoj@gmail.com; Uluberia, West Bengal, India.
- User confirmed both qualifications at **Brainware University**: B.Tech CSE 2021–2024; Diploma CSE 2018–2021.
- Projects in order: Erpixa (business management), NanoLink (URL shortening), TelePoint (EMI/payment portal), Nexora (workspace), Tripmate (group expenses).
- Real project source and explicit user corrections override historical descriptions.

## Architecture
- Next.js 15 App Router, React 18, TypeScript, Tailwind 3.4.
- app/page.tsx → components/journey/JourneyPortfolio.tsx, inside SmoothScroll.
- Components live in components/portfolio, components/projects and components/cinematic.
- The path is Opening → About → Skills/request flow → Projects → Process/capabilities → Education → Contact.
- app/journey.css is the sole global stylesheet. Manrope plus system monospace.
- useScene.ts scopes GSAP motion to the owning data-motion-root. Preparing below-fold motion is deferred until the section approaches.
- One Lenis/GSAP clock; native touch scrolling. Reduced motion and no-JS preserve the complete reading experience.
- Project details remain at app/project/[slug]/page.tsx.
- Latest user steering explicitly requests 3D, fluid, cinematic scrolling. Use CSS perspective/3D transforms on real interface planes. No Three.js, WebGL, particles or generated imagery. Use real public/previews/*.webp screenshots and public/biswodip.png.
- Preserve the installed Better Design primitives and Iconoir icons. Do not reinstall the registry.

## Recruiter experience
Keep direct access to projects, source repositories, live apps, contact and the PDF résumé. Both education entries must use the corrected university.
The PDF is generated from lib/data.ts with node scripts/build-resume.mjs. Keep its text selectable and its links usable.

## Verification
npm run build, npm run typecheck, npm run lint and npm run test:browser must pass.
Browser tests use Edge at 1440×900 and 390×844. Check seven responsive widths, forward/reverse scroll, keyboard, hash navigation, reduced motion, no-JS, console errors, overflow and project details.
Use a production server for Lighthouse. Avoid concurrent browser audits when measuring performance.
Dev: http://localhost:3000. Production verification preview: http://localhost:3029.
