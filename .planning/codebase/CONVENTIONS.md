---
last_mapped_commit: HEAD
---
# Conventions

**Analysis Date:** 2026-09-11

## Code Style
- **Components**: Functional components with React hooks. Arrow function syntax preferred.
- **Styling**: Tailwind CSS utility classes. Premium UI effects (glassmorphism) achieved via global utility classes in `globals.css` combined with `clsx` and `tailwind-merge`.
- **Animations**: `framer-motion` for DOM animations. Variants are strongly typed (e.g., `Variants` imported from `framer-motion`).

## Naming
- PascalCase for React components and files (e.g., `HeroSection.tsx`).
- camelCase for functions and variables.
- kebab-case for CSS files (e.g., `globals.css`).

<!-- refreshed: 2026-09-11 -->
