# Software, end to end

This portfolio gives a recruiter a short route to projects, source code, education, a readable résumé and contact details. The longer route follows the actual application boundaries behind the work.

## Visual direction

Manrope supplies both display and body typography; code uses the system monospace stack. Apricot, coral, sage and amber gradients connect the page. Project palettes come from `project.chapter` in `lib/data.ts`. Tinted glass is limited to the navigation, source panels and explanatory diagrams. Photographs and application captures are real assets supplied by the portfolio.

The opening is a layered composition of NanoLink and Tripmate. About pairs an offset portrait with engineering ownership. Skills holds a real API schema beside a vertical request sequence. Five project chapters alternate full-width, split and panoramic compositions. Process uses a sticky diagram, education follows a timeline, and contact closes with source repositories and a direct email link.

## Motion contract

- Scroll is the input: reverse scrolling reverses the animation. No automatic infinite animation loops.
- The page contains 1,354 individually animated glyphs. Each text or source-code block uses one numeric progress tween; letters calculate their stagger from that shared value instead of allocating 1,354 CSS tweens. Approximately 150 timeline/trigger groups support the complete page after all sections have been visited.
- `useScene.ts` prepares approaching sections with IntersectionObserver. It scopes targets to their closest `data-motion-root` so nested project chapters do not receive duplicate animations.
- Glyphs translate 14px in headings and 3px in code. Their text remains opaque and readable. Media enters from 24px on mobile or 60px on desktop and scales from 0.94 to 1. Wires draw with scale, and the software word band tracks scroll horizontally.
- Standard scrub smoothing and the opening use 0.45 seconds. Interface depth uses 0.5 seconds. Hover/tap transitions use 160–220ms and the existing ease-out token. Motion changes only transforms and opacity.
- The latest user request explicitly adds 3D. Screens rotate toward the reader in a 1400px perspective, hold a front-facing reading interval, then recede gently. The opening separates real screenshots in depth; process planes rotate independently. Mobile depth is reduced to 45%. No WebGL or invented 3D assets are used.
- Glyph markup is escaped and rendered as static subtrees to avoid hydrating 1,354 individual React fibers. Letter motion uses direct transform writes with no per-letter computed-style measurements. Other transforms are read before tween writes, and document/font readiness shares one scroll refresh. The original 2 MB portrait icons are delivered as 4 KB / 20 KB image variants.
- Code blocks use `content-visibility: auto`, with intrinsic height derived from their real line count. The browser can defer below-fold code layout while keeping the reading space and accessible text available. This follows the [MDN content-visibility guidance](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility).
- The opening's CSS sticky scene runs at >=1000px width and >=700px height. It approaches the camera over 170svh. Mobile keeps normal reading flow and smaller translations.
- One Lenis/GSAP clock; touch uses native scrolling. Every GSAP context and observer is cleaned up on unmount or motion-preference changes.
- Reduced motion and no-JavaScript modes expose the complete page without pinning or waiting for a reveal. Hash links allow readers to skip the cinematic path.

The implementation follows the official [GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). Better Design animation guidance was loaded and the installed Button/Table primitives and Iconoir family were retained. Other remote Better Design review requests returned HTTP 402 because the account quota was exhausted; their results are not claimed as successful reviews.

## Content integrity

The user confirmed both the Diploma and B.Tech at **Brainware University**. `lib/data.ts` drives the site and the generated résumé. TelePoint is an EMI/payment collection portal and Tripmate manages group expenses. NanoLink's validation and creation excerpts and TelePoint's ownership check come from their real source. The URL compression is explicitly illustrative. No employers, adoption metrics or product capabilities were invented.

## Verification

Use `npm run build`, `npm run typecheck`, `npm run lint` and `npm run test:browser`. The browser suite covers source-backed content, corrected qualifications, a usable PDF, responsive overflow, navigation/history, keyboard disclosure, scroll reversal, reduced motion and no-JavaScript reading. Run Lighthouse on production independently of other browser jobs. Before/after screenshots and measured geometry are stored under `artifacts/rebuild-2026`.

Rebuild the one-page, selectable PDF with `node scripts/build-resume.mjs`; it reads the same TypeScript content source and uses Python reportlab/pypdf. The PDF has live application and repository links for all five projects.
