---
last_mapped_commit: HEAD
---
# Architecture

**Analysis Date:** 2026-09-11

## Core Patterns
- **Next.js App Router**: Page-based routing under `app/`.
- **R3F Global Canvas**: The 3D scene (`StudioScene`) is rendered in a fixed background layer, allowing normal DOM elements to scroll over it.
- **React Context**: Used for global state (e.g., `ExperienceProvider` for WebGL/DOM syncing).
- **Component Composition**: Page content is composed in `components/Portfolio.tsx` using section components (`Hero`, `About`, `Projects`).

## Data Flow
- Standard React unidirectional flow.
- Context API shares loaded state and theme variables across components.

<!-- refreshed: 2026-09-11 -->
