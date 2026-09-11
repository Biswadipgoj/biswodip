# Implementation Plan: Autonomous Portfolio Reconstruction & Verification

**Project**: Biswodip Goj — Full-Stack & Systems Engineering Portfolio  
**Branch**: `feat/portfolio-verified-refinement`  
**Target Milestone**: 120 FPS Spatial Web Experience, Ralph Loop Integration, and Rigorous Browser QA  

---

## 1. Product & Engineering Objectives
1. **Full-Stack Engineering Positioning**: Showcase Biswodip Goj as a Full-Stack / Software Engineer with a Computer Science foundation (B.Tech CSE), distributed systems understanding, API design capability, DevOps/cloud tooling, and product/business-analysis awareness. Strictly avoid framing as a UI/UX designer.
2. **Authentic Computer Science Visual Metaphors**: Replace generic glowing sci-fi hardware, random cubes, or CPU chips with genuine software engineering concepts: Abstract Syntax Tree (AST) nodes, circular ring buffers, distributed consensus states, event loops, and bidirectional network telemetry.
3. **Continuous Spatial Motion (120 FPS Target)**: Deliver continuous spatial fluid motion without scroll-hijacking bugs, skipping sequences, or trapped containers.
4. **4-Sided 3D Origami Fold Tech Stack**: Re-engineer the Tech Stack ("System Layers") into an interactive 4-stage folded paper atlas (Frontend → Backend & APIs → DevOps & Cloud → Data & Tooling) with high-contrast chromatic card surfaces and zero text overlap.
5. **Spatial Curved 3D Project Showcase**: Elevate project storytelling with center-item dominance, visible adjacent project depth, real architectural context (e.g. Erpixa multi-tenant PostgreSQL RLS), deep links, and live preview frames.
6. **Geographic Invariant**: Ensure location is accurately maintained as **Uluberia Node, Howrah, West Bengal (22.4735° N, 88.1077° E)** with zero references to Bangalore.

---

## 2. Ralph Loop Autonomous Strategy
- **Upstream Source**: `https://github.com/snarktank/ralph` extracted to `scripts/ralph/`.
- **Project-Local Adapter**: `scripts/ralph/antigravity/` containing `ANTIGRAVITY.md`, `ralph-antigravity.ps1`, and `ralph-antigravity.sh`.
- **Granular PRD**: `scripts/ralph/prd.json` defining 12 discrete user stories (`US-001` to `US-012`) with rigorous acceptance criteria and automated verification steps.
- **Append-Only Progress**: `scripts/ralph/progress.txt` maintaining codebase patterns, iteration logs, and learnings.

---

## 3. Detailed Component Plan & File Architecture

### A. Hero & 3D Terminal Environment
- **Target Files**: `components/sections/Hero.tsx`, `components/ui/Computer3D.tsx`, `app/globals.css`
- **Design & Architecture**:
  - `Computer3D.tsx`: Three.js / R3F spatial desktop terminal running split-screen IDE and streaming 120+ authentic CS operations (`AST_ANALYZER`, `PAGE_CACHE_ALLOC`, `EPOLL_WAIT`, `TCP_SYN_ACK`, `CONSENSUS_VOTE`, `JIT_DEOPT_GUARD`).
  - 4 Orbiting CS Software Primitives: `AST_NODE` (hierarchical syntax node), `RING_BUFFER` (lockless circular queue), `CONSENSUS` (Raft quorum ballot), `EVENT_LOOP` (microtask phase indicator).
  - Ambient mechanical RGB keyboard with reactive key-switch actuation.
  - Capped DPR (`[1, 1.5]`) and offscreen rendering pause via `useInView` / `IntersectionObserver`.

### B. Tech Stack & 4-Sided 3D Origami Fold
- **Target Files**: `components/sections/Skills.tsx`, `tests/tech-stack.spec.ts`
- **Design & Architecture**:
  - Ordered progression: `01 Frontend` → `02 Backend & APIs` → `03 DevOps & Cloud` → `04 Data & Tooling`.
  - `FoldedPaperTransition`: 3D multi-axis origami fold (`rotateX`, `rotateY`, `perspective: 1400px`, dynamic crease lighting and shadow gradients).
  - Telemetry HUD: Real-time active AST parsing rate, throughput metric (e.g. `94.2k ops/sec`), and deterministic directional geometry.
  - Continuous 120 FPS Reel: Autoplay toggle (`▶ 120 FPS Reel` / `⏸ Pause Reel`) with pause-on-hover and keyboard navigation (`1`, `2`, `3`, `4`).
  - High-gradient card typography with verified WCAG AAA contrast against obsidian-slate surfaces.

### C. Projects Spatial Presentation & Routes
- **Target Files**: `data/projects.ts`, `components/sections/Projects.tsx`, `app/projects/[id]/page.tsx`
- **Design & Architecture**:
  - Comprehensive project dataset: Erpixa, AgentForge, StreamPulse, OmniScale, DevGraph, CodeOrbit.
  - Erpixa deep dive: Enterprise ERP/CRM architecture, PostgreSQL Row-Level Security (RLS), Supabase Auth, multi-tenant isolation, KPI metrics.
  - Spatial 3D Curved Slider: Perspective track with center-project focus, smooth rotation, and interactive controls.
  - Dedicated route `/projects/[id]` with browser history preservation.

### D. Architecture & System Thinking
- **Target Files**: `components/sections/Architecture.tsx`
- **Design & Architecture**:
  - Interactive distributed systems topology diagram: Client UI Edge → API Gateway → Microservices Mesh → PostgreSQL & Redis Cluster → Cloud Observability.
  - Interactive nodes demonstrating bidirectional message passing, retry logic, and latency SLAs.

### E. Page Bottom Sequence & Terminal Deck
- **Target Files**: `components/sections/Contact.tsx`, `components/sections/Footer.tsx`
- **Design & Architecture**:
  - Interactive Collaboration Handshake Terminal: Supports commands `status`, `ping`, `hire`, `skills`, and `clear`.
  - Transmission Deck with intent pills (`Full-Time Engineering`, `Architecture Consulting`, `Distributed Systems`).
  - Specular typography wordmark and verified Uluberia Node coordinates.

---

## 4. Verification & QA Protocol

### Automated Verification Gate
1. **TypeScript Typecheck**: `npm run typecheck` (`tsc --noEmit`) must exit with code 0.
2. **ESLint**: `npm run lint` must pass with zero fatal lint errors.
3. **Playwright E2E Suite**: `npx playwright test tests/tech-stack.spec.ts` must pass all test assertions across Desktop and Mobile viewports.
4. **Location Invariant**: Grep verification ensuring zero occurrences of Bangalore/Bengaluru across all source files.

### Visual & Browser Verification
- Multi-viewport screenshot captures across 8 standard breakpoints:
  - 375px (iPhone SE)
  - 390px / 393px (iPhone 14/15/16)
  - 768px (iPad Mini / Tablet Portrait)
  - 1024px (iPad Pro / Small Laptop)
  - 1280px (Standard Desktop)
  - 1440px (MacBook / High-Res Laptop)
  - 1920px (Full HD Desktop)
  - 2000px (Ultrawide Desktop)
- Validation of zero horizontal overflow (`scrollWidth === innerWidth`), visible text contrast, zero card collision, and smooth motion response.
