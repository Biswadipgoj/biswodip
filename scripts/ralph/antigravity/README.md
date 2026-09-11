# Ralph Antigravity Integration Adapter

This directory provides project-local bridges between the [snarktank/ralph](https://github.com/snarktank/ralph) autonomous loop methodology and **Google Antigravity (AGY)**.

## Files
- `ANTIGRAVITY.md`: Specifications, security protocols, and operational lifecycle.
- `ralph-antigravity.ps1`: Windows PowerShell execution loop with native JSON parsing and scoped verification.
- `ralph-antigravity.sh`: POSIX/Bash execution wrapper.
- `README.md`: This integration overview.

## Operational Modes
1. **Interactive Pair-Programming (Default)**:
   The primary Antigravity agent inspects `scripts/ralph/prd.json`, reads `scripts/ralph/progress.txt`, selects the next pending story, executes it with browser-level verification, updates tests, logs progress, and commits.
2. **Headless CLI Loop (`agy -p`)**:
   When using the Antigravity CLI in headless mode, `ralph-antigravity.ps1` invokes `agy.exe -p` with scoped command permissions, running typechecks, E2E tests, and state updates per iteration.
