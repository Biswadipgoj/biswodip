# Portfolio Visual Redesign Plan

## Goal

Create a distinctive CSE engineering portfolio with dimensional visuals, readable content, and a cohesive colored background. Neither near-black nor white/near-white should dominate the page. Preserve project content, routes, and useful interactions.

## Direction: The Engineering Workbench

Use mineral blue-gray surfaces, ink typography, precise technical details, and one carefully composed 3D engineering artifact. Aim for a designed product experience rather than a field of decorative particles or white glass cards.

Starting palette, subject to rendered contrast checks:

| Role | Color |
| --- | --- |
| Page foundation | #A9BEC6 |
| Raised colored surface | #BBCBC7 |
| Recessed surface | #91ABB5 |
| Primary text | #172D39 |
| Secondary text | #354F5C |
| Functional teal | #00656A |
| Secondary cobalt | #3155A6 |
| Copper detail | #984927 |

Use mostly opaque tinted surfaces, crisp borders, and soft directional shadows. No near-white glass wash. Reserve gradients for restrained environmental color, not paragraph text. Keep accent colors limited and verify text contrast rather than assuming it.

## Current Problems To Resolve

- globals.css, aurora.css, and layout.tsx define conflicting theme tokens and dark-mode behavior.
- AnimatedTechGrid and StudioScene paint dark backgrounds independently of the page palette.
- Legacy section selectors retain dark panels and compete with newer section styles.
- Blanket glass-descendant positioning and z-index rules create fragile stacking.
- Handwritten CSS contains invalid alpha syntax such as rgb(var(--accent-cyan))/20.
- Multiple scroll providers and stacked motion wrappers undermine stable content positioning.
- Skills descriptions are hover-dependent, and bright accents/hover text need a light-surface contrast pass.
- Earlier Lighthouse measurements were made against development mode; they are not a production baseline.
- Existing browser scripts contain stale selectors. Previous source inspection did not establish visual correctness.

## Phase 1: Unify The Foundation

1. Consolidate semantic color tokens and remove conflicting active legacy theme rules without discarding needed layout rules.
2. Align body, section backgrounds, navigation, forms, project detail pages, browser theme color, scene fog, and static fallbacks.
3. Correct invalid CSS declarations and replace blanket stacking rules with explicit component layering.
4. Establish consistent content width, section spacing, border radii, and a clear type scale. Use the existing fonts where suitable; pair expressive headings with quiet body type and small monospace labels.

Checkpoint: render desktop and mobile screenshots before adding more effects. Confirm the foundation looks distinctly colored, not black or white.

## Phase 2: Compose The Hero And Projects

### Hero

- Lead with Biswodip's identity and concrete engineering focus instead of a generic oversized slogan.
- Use an asymmetric text-and-object composition with one strong project CTA and a quieter contact action.
- Replace full-screen abstract clutter with a contained compute-module/PCB assembly: layered chip, traces, connectors, and restrained technical annotations.
- Keep the artwork beside the copy, never obscuring it. Provide an intentional static/mobile composition.

### Projects

- Preserve all project entries and working detail links.
- Create non-overlapping showcase rows with generous preview images and a stable text column.
- Present problem, implementation, and outcome using existing verified content; do not invent metrics.
- Add a subtle vertical trace/index motif to connect the work without making it a generic card grid.
- Set explicit image sizes and consistent preview surfaces. Keep controls and text readable throughout scrolling.

Checkpoint: review hero and project screenshots at desktop and mobile sizes before propagating the style.

## Phase 3: Bring Every Section Into The Same System

- About: readable portrait/profile composition, compact facts, terminal as a secondary interaction rather than the dominant panel.
- Skills: architecture-oriented groups with visible descriptions and project evidence. Keep optional transition controls unobtrusive; remove hover-only information and ensure touch access.
- Journey: clear chronological alignment, calm typography, and one consistent timeline treatment.
- Impact: editorial metric layout with strong hierarchy, not competing gradients and particles.
- Contact: confident closing statement, readable form fields, obvious focus states, and minimal decoration.
- Project detail pages/navigation/footer: use the same tokens, spacing, typography, and button language.

## Phase 4: Purposeful Motion

- Reference supplied by the user: https://jiro.build/components/header/pet-daycare-header-pawvie. Inspect its rendered preview in a browser before specifying a faithful adaptation; fetched page text does not reveal actual animation timing, choreography, or interaction.
- Adapt the reference's verified motion characteristics to original CSE subject matter, not pet imagery or branding. Record the observed entrance order, easing, layering, and hover behavior during that inspection.
- Proposed CSE choreography: heading and CTA enter in a short stagger while a layered compute module assembles beside them; signal traces illuminate after assembly. Keep the primary copy visible promptly, with no loading gate.
- Use small pointer-responsive movements on the hero artifact and subtle spring feedback on controls. Keep perpetual motion limited to a few signal details; do not rotate whole reading surfaces continuously.
- Keep the 3D identity, but give each section one main motion idea.
- Use one smooth-scroll owner with correct cleanup.
- Apply shared pause/reduced-motion behavior to CSS, DOM animation, timers, and WebGL.
- Avoid compounded wrapper transforms. Settle cards flat while users read or interact.
- Stop offscreen animation; reduce mobile particle counts and rendering cost; lazy-load the hero scene.
- Correct geometry and timer issues identified during implementation.

## Overlap Prevention: Required Before Polish

- Reproduce current collisions in browser screenshots at the hero, section boundaries, About facts, skills transitions, project rows, and contact form before changing layout.
- Keep content in normal grid/flex flow. Reserve absolute positioning for artwork inside a bounded stage; decorative overlap is allowed only within that stage, never over copy, controls, or adjacent sections.
- Remove stacked parallax transforms on content containers. Animate a visual child within a stable layout box, with reserved space for its full travel.
- Give navigation a deliberate stacking layer and anchor scroll offset. Use local isolation for artwork rather than global z-index escalation.
- During skills category changes, preserve enough panel height for the outgoing and incoming content so subsequent sections do not jump or collide. Recalculate for wrapping and viewport changes.
- Use min-width: 0 where grid/flex children must shrink, wrap long labels and URLs, constrain image aspect ratios, and stack desktop compositions on small screens.
- Do not hide overflow globally as a substitute for correcting clipped content. Clip decorative layers only where intended.
- Test start, midpoint, and end of animated states, rapid category changes, expanded content, resized viewports, and 200% zoom. Check both screenshots and relevant bounding rectangles; intentional decorative intersections are excluded from collision assertions.

## Phase 5: Verify The Actual Result

- Update browser tests to match current components before relying on them.
- Capture and inspect screenshots at 390, 768, and 1440px; also check overflow at 320 and 1920px.
- Verify each section after scrolling, all skills categories, hover/focus states, forms, navigation, and project routes.
- Check text contrast, keyboard navigation, touch access, reduced motion, and scene failure fallback.
- Run typecheck, lint, and production build; report remaining warnings honestly.
- Run Lighthouse against a production server, not next dev. Target performance >=90, accessibility >=95, LCP <=2.5s, and CLS <=0.1; record actual results rather than promise scores.

## Acceptance Criteria

- Page backgrounds are visibly mineral blue-gray/sage, neither near-black nor near-white.
- No legacy dark section unexpectedly interrupts the palette.
- Hero has a recognizable engineering identity and a clear content hierarchy.
- All project entries remain accessible and non-overlapping.
- No heading, paragraph, image, input, or CTA collides with adjacent content at supported widths or during animation. Reference-inspired motion must not compromise this requirement.
- Text remains readable on mobile and during interaction; no essential hover-only content.
- Animation supports the composition without obstructing reading or input.
- Screenshots and production checks substantiate the final result.

## Execution Order

Foundation -> hero/projects -> remaining sections -> motion refinement -> browser and production validation. Do not repeat the previous approach of changing colors globally and declaring the visual result verified without inspecting it.
