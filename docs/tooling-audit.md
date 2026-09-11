# Tooling & Dependency Audit

**Project**: Biswodip Goj — Full-Stack & Systems Engineering Portfolio  
**Audit Date**: September 2026  
**Environment**: Windows 11 / Node.js v20.16.0 / PowerShell / Google Antigravity IDE  

---

## 1. Upstream Ralph Integration (`snarktank/ralph`)
- **Repository Source**: `https://github.com/snarktank/ralph` (main branch)
- **Local Directory**: `scripts/ralph/`
- **Installation Method**: Direct archive extraction of upstream `main` branch into `scripts/ralph/`.
- **Verified Upstream Assets**:
  - `ralph.sh`: Present (supports `--tool amp|claude`, iterations, branch archiving, and `<promise>COMPLETE</promise>` stop condition).
  - `prompt.md`: Present (full autonomous coding instructions, progress log formatting, AGENTS.md conventions).
  - `CLAUDE.md`: Present (commands for building, linting, testing, and branch handling).
  - `AGENTS.md`: Present (system instructions for autonomous loops).
  - `prd.json.example`: Present (defines schema with `project`, `branchName`, `userStories` array).
  - `skills/prd/SKILL.md`: Present (PRD generation skill).
  - `skills/ralph/SKILL.md`: Present (Ralph loop execution skill).
- **Tooling Verification**:
  - **jq**: Not present in system PATH on Windows. Upstream `ralph.sh` relies on `jq` for bash parsing. **Remediation**: Built project-local Windows adapter `scripts/ralph/antigravity/ralph-antigravity.ps1` utilizing native PowerShell `ConvertFrom-Json` and Node.js JSON capabilities.
  - **Git Repository**: Available and active on feature branch `feat/portfolio-verified-refinement`.
  - **Antigravity CLI**: Verified at `C:\Users\biswa\AppData\Local\agy\bin\agy.exe`. Tested with `--help`, confirming `-p` / `--print` non-interactive execution mode.
  - **Antigravity Adapter**: Installed at `scripts/ralph/antigravity/` with `ANTIGRAVITY.md`, `ralph-antigravity.ps1`, and `ralph-antigravity.sh`.

---

## 2. Requested Libraries & Visual Frameworks Audit

| Tool / Resource | Status | Version / Path | Assessment & Integration |
|---|---|---|---|
| **Motion** (`motion.dev`) | **Installed & Active** | `motion@^13.2.0` | Primary declarative animation engine for layout transitions, scroll progress, and spring physics across Hero, Skills, and Projects. |
| **GSAP** | **Installed & Active** | `gsap@^3.12.5` | Utilized for high-precision timeline scrubbing and continuous micro-interactions without conflict. |
| **Three.js** | **Installed & Active** | `three@^0.169.0` | Core WebGL rendering engine. Powers the 3D Computer terminal, floating AST nodes, and ambient perspective scenes. |
| **React Three Fiber** | **Installed & Active** | `@react-three/fiber@^8.17.10` | React wrapper for Three.js. Verified in `components/ui/Computer3D.tsx` with capped DPR (`[1, 1.5]`) and offscreen lifecycle pause. |
| **Drei / Postprocessing** | **Installed & Active** | `@react-three/drei@^9.114.0`, `@react-three/postprocessing@^2.16.3` | Spatial camera controls, Float, Html overlays, and chromatic aberration effects. |
| **Skiper UI** (`@skiper-ui/skiper40`) | **Installed & Integrated** | `components/ui/skiper-ui/skiper40.tsx` | Installed component providing 3D interactive magnetic link shaders and typography hover physics. Referenced in `components.json`. |
| **Playwright** | **Installed & Active** | `@playwright/test@^1.63.0` | End-to-end browser test runner. Configured in `playwright.config.ts`. Verified with 14/14 automated assertions passing on desktop and mobile. |
| **open-gsd/gsd-core** | **Audited & Active** | Loaded in `.gemini/config/skills/` | Full suite of 30+ GSD engineering lifecycle skills available to Antigravity. |
| **piakaus/impeccable** | **Audited & Active** | `.agents/skills/impeccable/` | Anti-slop frontend design system, typography hierarchy, micro-interactions, and contrast governance. |
| **Leonxlnx/taste-skill** | **Audited & Active** | `.agents/skills/design-taste-frontend/` | Editorial and high-end design taste skill preventing generic AI templates and slop patterns. |
| **Panniantong/agent-reach** | **Audited** | Documented in `promt.md` | External browser automation utility. Playwright and Antigravity Browser Subagents provide direct, native browser interaction without redundant external daemons. |
| **Kilo / animmasterlib.dev** | **Audited** | Reference concepts in `promt.md` | Architectural inspiration for continuous 120 FPS frame pacing, 3D perspective layering, and fluid multi-axis card transforms. |

---

## 3. Dependency Bloat & Conflict Mitigation
- **Animation Framework Harmony**: Motion handles component-level layout springs and exit transitions; GSAP handles deterministic timeline interpolation; R3F handles 3D canvases. All three run on decoupled requestAnimationFrame loops with hardware acceleration (`transform`, `opacity`, `translate3d`).
- **WebGL Memory Management**: Canvas rendering is constrained to capped DPR (`1.5x`), uses `<AdaptiveDpr />`, and disposes geometry and textures when components unmount or exit the viewport.
