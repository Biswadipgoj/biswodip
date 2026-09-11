---
last_mapped_commit: HEAD
---
# Concerns

**Analysis Date:** 2026-09-11

## Technical Debt & Issues
- **Animation Complexity**: Combining R3F (WebGL) and Framer Motion (DOM) with Lenis (Smooth Scroll) can cause performance issues if not carefully synchronized.
- **Strict Typing**: Occasional TS errors (like missing `Variants` type in `framer-motion`) have caused build breaks in the past. Strict typing must be enforced for all animation variants.
- **File Deletion Risks**: The core `Portfolio.tsx` acts as the primary hub bridging WebGL and the DOM. Accidental deletions or refactors of this file break the entire app.

<!-- refreshed: 2026-09-11 -->
