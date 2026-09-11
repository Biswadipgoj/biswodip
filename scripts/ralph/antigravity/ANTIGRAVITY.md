# Antigravity + Ralph Autonomous Engineering Protocol

## Architectural Overview
This document specifies the project-local integration between **Google Antigravity (AGY)** and the **Ralph Autonomous Agent Loop** (`snarktank/ralph`).

Upstream Ralph natively loops across Claude Code or Amp by piping prompts non-interactively. Google Antigravity provides the local `agy` executable (`C:\Users\biswa\AppData\Local\agy\bin\agy.exe`) which supports non-interactive execution via `agy -p` (`--print`) or `--prompt-interactive`.

## Adapter Responsibilities
1. **PRD Parsing**: Read `scripts/ralph/prd.json` to identify pending stories sorted by priority (lowest numeric value first).
2. **Progress Memory**: Read and maintain `scripts/ralph/progress.txt` (append-only progress logs with `## Codebase Patterns` preserved at the top).
3. **Execution Boundary**: Execute precisely ONE user story per iteration.
4. **Verification Gate**: Run verification suite (`npm run typecheck`, `npm run build`, `npx playwright test`).
5. **State Synchronization**: Update `prd.json` setting `"passes": true` upon verified completion.
6. **Atomic Git Commit**: Commit passing state formatted as `feat: [Story ID] - [Story Title]`.
7. **Scoped Security Protocol**: Scoped execution without unrestricted permissions, maintaining workspace sandbox constraints.

## Antigravity CLI Verification
- Executable Path: `C:\Users\biswa\AppData\Local\agy\bin\agy.exe`
- Non-interactive Flag: `-p` / `--print`
- Context Continuation: `-c` / `--continue`
- Permission Model: Scoped command permissions for `npm`, `node`, `playwright`, and `git`. Unrestricted `--dangerously-skip-permissions` is avoided by default to maintain safe boundaries.

## Interactive Agent Mode
When running within an active Antigravity session, the agent executes the Ralph protocol deterministically:
1. Load `prd.json`.
2. Select next `passes: false` story by priority.
3. Implement code changes.
4. Execute verification tests (`playwright`, `typecheck`, `build`).
5. Perform browser visual verification with screenshot artifacts.
6. Record learnings to `progress.txt` and nearby `AGENTS.md`.
7. Mark story `passes: true` in `prd.json`.
8. Commit git changes.
