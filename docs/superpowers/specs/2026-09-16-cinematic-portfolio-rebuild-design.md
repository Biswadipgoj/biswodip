# Technical Design Specification: Cinematic Portfolio Rebuild from Scratch

**Project**: `biswadip.in`  
**Engineer**: Biswadip Goj (Full-Stack & Systems Software Engineer)  
**Date**: 2026-09-16  
**Status**: Approved Architectural Spec  

---

## 1. Vision & Core Philosophy

This specification details the complete ground-up rebuild of Biswadip Goj's personal engineering portfolio (`biswadip.in`). The design purges all dull, milky off-white and beige palettes ("cum color") in favor of a **deep cinematic obsidian environment** illuminated by **radiant neon auroras**, **volumetric dark glassmorphism**, and **tactile, playful micro-interactions** synthesized from `poch.studio`, `lexspace.io`, and `ylem.watch`.

### Key Directives:
1. **Luminous Dark Canvas**: Deep obsidian (`#06070B`) foundation with active multi-layer fluid aurora blooms (Electric Violet `#8B5CF6`, Cyber Aqua `#00F0FF`, Poch Hot Pink `#FFA5C6`, Butter Lemon `#FFF6C6`, and Mint Emerald `#10B981`).
2. **Every Project Has Its Own Living Interface**: Real, interactive software consoles embedded in the portfolio for all 4 flagship systems (Erpixa ERP, NanoLink Edge, Nexora CRDT, Kestrel Raft).
3. **Architecture Made from GitHub Code**: Instant toggle on each project card linking to Biswadip's GitHub repositories (`Biswadipgoj/...`) with cinematic code-to-architecture visualizations and full-screen Architecture Inspector.
4. **Architecture Diagrams Exclusively in Work Section**: Architectural blueprints and topology diagrams are strictly confined to `WorkSection.tsx`.
5. **Strictly 100% Software Engineering**: Biswadip is a Computer Science graduate (B.Tech CSE). Zero hardware terms (no CPU chassis, GHz clocks, logic gates, or 48-bit MMU). Only OS software, virtual memory, process scheduling, distributed consensus, CRDTs, sockets, and web apps.
6. **Poch.studio & Yelm.watch Motion Synthesis**: Tactile floating pill navigation dock with spring bounce and scroll spy, fluid momentum transitions, and playful interactive buttons.

---

## 2. Design System & Tokens

### 2.1 Color Palette
- **Canvas Base**: `#06070B` (Deep Obsidian Void)
- **Glass Elevated**: `rgba(13, 17, 28, 0.78)` with `backdrop-filter: blur(28px) saturate(190%)`
- **Glass Inset / Recessed**: `rgba(8, 11, 20, 0.85)`
- **Glass Border Subtle**: `rgba(255, 255, 255, 0.10)`
- **Glass Border Active / Hover**: `rgba(139, 92, 246, 0.45)` with subtle neon box-shadow
- **Text Primary (Heading)**: `#FFFFFF` (Ultra-crisp white)
- **Text Secondary (Body)**: `#E2E8F0` (Luminous slate-white, AAA contrast)
- **Text Muted / Meta**: `#94A3B8` (Soft metallic silver)
- **Text Faint / Borders**: `#475569`
- **Neon Accents**:
  - `Electric Violet`: `#8B5CF6` / `#A78BFA`
  - `Cyber Aqua / Cyan`: `#00F0FF` / `#06B6D4`
  - `Poch Candy Pink`: `#FFA5C6` / `#F43F5E`
  - `Butter Lemon Yellow`: `#FFF6C6` / `#FBBF24`
  - `Cyber Mint Emerald`: `#10B981` / `#34D399`
  - `Hyper Indigo`: `#6366F1`

### 2.2 Typography Hierarchy
- **Display Serif / Sans Blend**: Outfit / Inter paired with JetBrains Mono for code.
- **Hero Title**: Bold multi-stop gradient clipping: `bg-gradient-to-r from-violet-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent`.
- **System Badges & Chips**: Monospaced status pill tags with glowing pulsing indicator dots.

### 2.3 Motion System
- **Spring Curves**: `cubic-bezier(0.16, 1, 0.3, 1)` for smooth elastic expansion.
- **Micro-interactions**: Scale `1.03` with active tap depression `0.97` on all clickable pills.
- **Floating Dock**: Fixed at bottom center (`bottom: 28px`), spring hover expansion, active indicator glow pill, and audio/haptic click feedback.

---

## 3. Section Blueprint

### Section 01: Hero Section (`HeroSection.tsx`)
- High-impact headline: *"Software engineer crafting resilient web systems, distributed backends, and low-latency tools."*
- Subtitle: Engineering focus (B.Tech CSE, Full-Stack & Systems Software).
- Dynamic 3D interactive tilt canvas: Live animated Software Network Topology / AST Compiler graph with live mouse reaction.
- Quick CTA buttons: *"Explore Projects ↓"* (vibrant violet-to-pink gradient pill) and *"Read GitHub Code ↗"* (glassmorphic pill).
- Ample bottom spacing ensuring zero collision with the floating dock.

### Section 02: Systems Pipeline (`AboutSection.tsx`)
- Software engineering mental model: High-performance concurrency, database internals, and distributed resilience.
- 4 interactive software principles:
  1. *Deterministic Execution* (Process scheduling & virtual memory).
  2. *Zero-Copy Concurrency* (Rust Tokio async & non-blocking epoll).
  3. *Conflict-Free Replication* (State-based CRDTs & causal ordering).
  4. *Quorum Consensus* (Raft leader election & AppendEntries log replication).

### Section 03: Production Work & Living Consoles (`WorkSection.tsx`)
- 4 flagship systems, each with its own **living interactive software console**:
  1. **Erpixa (Enterprise Resource Platform)**:
     - Real-time revenue counter ($124,850 ARR), PostgreSQL RLS active status.
     - Interactive `+ Post Order ($350)` action dynamically balancing double-entry ledger (`Debit = Credit`).
  2. **NanoLink (Global Edge URL & Telemetry Mesh)**:
     - Real-time shortener simulator with input, live hash generation, and copy link action.
     - Interactive regional ping radar (`Tokyo 7.8ms`, `Frankfurt 5.2ms`, `Mumbai 3.1ms`, `San Jose 6.4ms`).
     - `+100 Hits` burst click simulator with real-time counter animation.
  3. **Nexora (Collaborative Real-Time Suite)**:
     - Live collaborative Kanban board with draggable/clickable tasks between `In Progress` and `Done`.
     - Live peer cursor avatars ("Alice ✍", "Bob ⚡", "Biswadip").
     - Monotonic Hybrid Logical Clock (`HLC: 172948190.13`) incrementing on edits.
  4. **Kestrel (Rust Distributed Raft Consensus Engine)**:
     - Interactive 5-node cluster ring (Node 01 to Node 05).
     - Interactive `⚡ Broadcast Log` (sending laser RPC packets across nodes), `⚠️ Failover Leader` (incrementing term), and `📡 Partition / Heal Node`.
- **GitHub Code & Architecture Mode**:
  - Seamless toggle on every card between `🖥️ Product UI` and `⚡ GitHub Code & Arch`.
  - Displays cinematic code-to-architecture visual (`erpixa_code_to_arch.jpg`, etc.) and verified repository source code.
  - "Inspect Full Blueprint" launches the full-screen Architecture Inspector Modal.

### Section 04: Developer Computational Sandbox (`VirtualComputerSection.tsx`)
- 60fps Conway's Game of Life cellular automaton with interactive play/pause, step, and clear controls.
- Interactive POSIX Developer Diagnostic Terminal with live shell commands (`help`, `top`, `sysinfo`, `bench`, `cat`).
- Interactive Virtual Heap Allocator visualizer showing memory chunk allocation and fragmentation.

### Section 05: System Craft & Tech Stack (`SystemCraftSection.tsx`)
- Software engineering stack organized into 4 architectural layers:
  1. *Full-Stack Web & Interfaces* (TypeScript, Next.js, React, Tailwind, WebSockets).
  2. *Backend & Distributed Systems* (Go, Rust, Node.js, Raft, gRPC, Tokio).
  3. *Data & State Engines* (PostgreSQL, Redis, CRDTs, SQLite, Prisma).
  4. *Infrastructure & Runtime Edge* (Cloudflare Workers, Docker, Linux, Git, CI/CD).
- Interactive badge switching with live syntax code preview for each technology.

### Section 06: Field Notes & Research Lab (`FieldNotesSection.tsx`)
- Deep-dive technical whitepapers and benchmark studies:
  1. *Benchmarking CRDTs vs OT in High-Latency WebSockets*.
  2. *Zero-Lock ACID Ledgers in Multi-Tenant PostgreSQL*.
  3. *Optimizing Tail Latencies at the Cloudflare Edge*.
- Interactive benchmark comparison charts and interactive note inspector.

### Section 07: Journey & Milestones (`JourneySection.tsx`)
- Chronological engineering roadmap: From academic foundational CS (Algorithms, Operating Systems, Networks) to building production distributed systems and open-source tools.

### Section 08: Interactive Kinetic Footer (`InteractiveFooter.tsx`)
- Interactive 2D Physics Gravity Box with tossable tech tokens (Rust, TypeScript, Next.js, Raft, PostgreSQL).
- Live edge packet route tracer showing ping to client IP.
- One-click copy email action (`biswadipgoj@gmail.com`) with instant toast confirmation.
- Social and GitHub links (`github.com/Biswadipgoj`, `x.com/biswadipgoj`).

---

## 4. Verification & Quality Gates

1. **Clean Next.js Build**: `npm run build` must compile cleanly with 0 TypeScript and Webpack errors.
2. **0 Console Errors & 0 Uncaught Exceptions**: Verified via automated browser testing.
3. **No Horizontal Overflow**: `scrollWidth === clientWidth` on all viewports (1440px desktop, 768px tablet, 375px mobile).
4. **Interactive Validation**: Every interactive widget (ERP order, NanoLink shorten & ping, Nexora Kanban, Kestrel Raft, Conway Life, Terminal, Physics tokens) must respond instantly to clicks with visual feedback.
