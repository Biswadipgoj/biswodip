# Cinematic Portfolio Rebuild from Scratch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Biswadip Goj's personal engineering portfolio (`biswadip.in`) from scratch with a deep obsidian (#06070B) cinematic canvas, radiant neon auroras, tactile floating dock (Poch.studio), fluid motion (Yelm.watch), modular developer ergonomics (Lexspace.io), and dedicated interactive software consoles for each flagship project.

**Architecture:** A unified Next.js 15 App Router architecture with Tailwind CSS and Framer Motion. The core layers comprise: (1) an ambient 60fps SVG/canvas Living Aurora background behind translucent glassmorphic containers; (2) high-contrast, luminous typography with multi-stop gradient clippings; (3) four dedicated interactive software consoles in `WorkSection.tsx` with instant toggling to GitHub Code & Architecture mode; (4) interactive developer sandbox (Conway's Life, POSIX terminal, Virtual Heap Allocator); and (5) a floating pill navigation dock with scroll spy and 2D physics gravity footer.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Matter.js (2D Physics).

**Spec:** `docs/superpowers/specs/2026-09-16-cinematic-portfolio-rebuild-design.md`

## Global Constraints

- Root background: Deep Obsidian `#06070B` — strictly zero milky beige, sandstone, or off-white washed out palettes.
- Architecture diagrams and topology blueprints are strictly confined to `WorkSection.tsx`.
- 100% Computer Science software engineering scope: zero hardware terms (no CPU chassis, GHz clocks, logic gates, or 48-bit MMU).
- Zero horizontal overflow (`scrollWidth === clientWidth`) across mobile (375px), tablet (768px), and desktop (1440px).
- Zero console errors and zero uncaught exceptions in browser runtime.

---

### Task 1: Core Design System & Obsidian Aurora Canvas

**Files:**
- Modify: `app/globals.css`
- Modify: `components/editorial/SpatialAuroraBackground.tsx`
- Modify: `tailwind.config.ts`

**Interfaces:**
- Consumes: CSS custom properties and Tailwind utility classes.
- Produces: Obsidian dark canvas (`#06070B`), luminous typography tokens (`#FFFFFF`, `#E2E8F0`, `#94A3B8`), dark glassmorphic utility classes (`.glass-card-cinematic`, `.neon-border-glow`), and animated multi-layer SVG aurora gradients.

- [ ] **Step 1: Overhaul `globals.css` with Cinematic Obsidian Tokens**
Update `app/globals.css` to define the `#06070B` obsidian base, remove any remaining `#E8EEFD` light theme rules, set typography colors to high-contrast white and slate, and add dark glassmorphic card utilities with vibrant neon borders.

- [ ] **Step 2: Rebuild `SpatialAuroraBackground.tsx` with Radiant Neon Aurora Mesh**
Update the background component to render fluid flowing radiant blobs in Electric Violet (`#8B5CF6`), Cyber Cyan (`#00F0FF`), Poch Candy Pink (`#FFA5C6`), Butter Lemon (`#FFF6C6`), and Mint Emerald (`#10B981`) with smooth mouse-follow parallax and subtle cyber grid overlay.

- [ ] **Step 3: Verify Styling in Next.js Build**
Run `npm run build` to confirm CSS compilation succeeds without syntax errors.

---

### Task 2: Typographic Hero & Poch.studio Floating Dock Overhaul

**Files:**
- Modify: `components/editorial/HeroSection.tsx`
- Modify: `components/editorial/FloatingDock.tsx`

**Interfaces:**
- Consumes: Design tokens from `globals.css` and aurora canvas.
- Produces: High-contrast hero section with animated 3D tilt software topology canvas, prominent gradient typography, and non-overlapping floating pill dock with scroll spy.

- [ ] **Step 1: Rebuild `HeroSection.tsx`**
Update `HeroSection.tsx` with bold display typography (`from-violet-400 via-pink-300 to-cyan-300`), vibrant CTA pills with spring hover micro-interactions, ample bottom padding (min 140px) to prevent dock overlap, and dynamic 3D tilt canvas illustrating software AST and distributed Raft nodes.

- [ ] **Step 2: Polish `FloatingDock.tsx`**
Enhance the floating pill dock with Poch.studio inspired rounded capsule styling (`backdrop-filter: blur(32px)`, `rgba(15, 20, 32, 0.85)`), glowing active indicator dot, spring scale physics on hover, and smooth scroll spy.

- [ ] **Step 3: Verify Hero & Dock Rendering**
Run Next.js build and verify zero viewport overflow and clean layout spacing.

---

### Task 3: Flagship Projects Living Consoles & GitHub Code-to-Arch Inspector

**Files:**
- Modify: `components/editorial/WorkSection.tsx`

**Interfaces:**
- Consumes: Project assets in `public/images/` and GitHub repository links.
- Produces: 4 interactive living software consoles (Erpixa, NanoLink, Nexora, Kestrel), dual-mode toggle between Product UI and GitHub Code & Arch, and full-screen Architecture Inspector Modal.

- [ ] **Step 1: Refine Erpixa ERP Console**
Ensure dark glassmorphism styling, live ARR counter ($124,850), interactive `+ Post Order ($350)` action dynamically balancing double-entry ledger with instant visual feedback, and PostgreSQL RLS active badge.

- [ ] **Step 2: Refine NanoLink Edge Console**
Interactive shortener input with instant hash generation, regional PoP ping radar (Frankfurt, Tokyo, Mumbai, San Jose) with animated latency bars, and burst hit click simulator.

- [ ] **Step 3: Refine Nexora Collaborative Kanban Console**
Interactive draggable/clickable task cards, live peer avatars ("Alice ✍", "Bob ⚡"), monotonic Hybrid Logical Clock (HLC) incrementing, and CRDT conflict-free merge visualizer.

- [ ] **Step 4: Refine Kestrel 5-Node Raft Simulator**
Interactive 5-node cluster ring with animated laser AppendEntries RPC lines, interactive `⚡ Broadcast Log`, `⚠️ Failover Leader`, and `📡 Partition Node` buttons.

- [ ] **Step 5: Perfect GitHub Code & Architecture Mode**
Seamless card toggle displaying cinematic code-to-architecture visualization (`/images/erpixa_code_to_arch.jpg`, etc.), direct GitHub repo links (`Biswadipgoj/...`), syntax-highlighted code, and full-screen Architecture Inspector Modal.

---

### Task 4: Systems Pipeline & Computational Developer Sandbox

**Files:**
- Modify: `components/editorial/AboutSection.tsx`
- Modify: `components/editorial/VirtualComputerSection.tsx`

**Interfaces:**
- Consumes: Software engineering principles and interactive state hooks.
- Produces: 4 software principles pipeline and 3-tab computational developer sandbox (Conway's Game of Life, POSIX Terminal, Heap Allocator).

- [ ] **Step 1: Re-skin `AboutSection.tsx` into Deep Obsidian Theme**
Apply dark volumetric glass cards, glowing neon indicator chips, and strictly software-focused mental models (concurrency, CRDTs, consensus, virtual memory).

- [ ] **Step 2: Re-skin `VirtualComputerSection.tsx`**
Update Conway's Game of Life canvas with glowing cyber emerald/cyan cells, POSIX diagnostic terminal with high-contrast green/cyan monospace output, and Virtual Heap Allocator with segmented memory block visualizer.

---

### Task 5: Tech Stack, Field Notes, Journey & 2D Physics Footer

**Files:**
- Modify: `components/editorial/SystemCraftSection.tsx`
- Modify: `components/editorial/FieldNotesSection.tsx`
- Modify: `components/editorial/JourneySection.tsx`
- Modify: `components/editorial/InteractiveFooter.tsx`
- Modify: `components/Portfolio.tsx`

**Interfaces:**
- Consumes: All editorial components.
- Produces: Complete, unified portfolio root rendering smoothly from Hero to Footer.

- [ ] **Step 1: Polish `SystemCraftSection.tsx` & `FieldNotesSection.tsx`**
Apply dark glass cards, interactive technology badge tabs with live syntax code preview, and benchmark comparison charts.

- [ ] **Step 2: Polish `JourneySection.tsx` & `InteractiveFooter.tsx`**
Ensure chronological roadmap connects cleanly to the 2D Physics Gravity Box with tossable tech tokens, live edge packet route tracer, and instant email copy button.

- [ ] **Step 3: Verify Full Integration & Root Wiring in `Portfolio.tsx`**
Confirm all 8 sections are mounted in sequence with proper section IDs (`sec-001` to `sec-008`) for floating dock navigation.

---

### Task 6: End-to-End Automated Browser Testing & Visual Verification

**Files:**
- Create/Modify: `scripts/test-browser.js`

**Interfaces:**
- Consumes: Live Next.js server on `http://localhost:3000`.
- Produces: Automated test run with Microsoft Edge via Puppeteer, verifying:
  1. 0 console errors and 0 page exceptions.
  2. `hasOverflow: false` across all viewports.
  3. Interactive clicks on ERP post order, NanoLink shortener & pings, Nexora Kanban, and Kestrel Raft simulator.
  4. Full-screen architecture modal open and close.
  5. High-resolution screenshots saved to artifacts.

- [ ] **Step 1: Run Next.js Production Build**
Execute `npm run build` and ensure 0 TypeScript and Webpack errors.

- [ ] **Step 2: Run Automated Edge Browser Test Suite**
Execute `node scripts/test-browser.js` and capture full page screenshots.

- [ ] **Step 3: Inspect Visual Output & Review**
Examine captured screenshots to verify the deep obsidian canvas, vibrant neon auroras, and flawless layout ergonomics.
