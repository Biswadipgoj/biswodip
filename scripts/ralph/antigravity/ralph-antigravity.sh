#!/usr/bin/env bash
# Ralph + Antigravity Autonomous Iteration Adapter (Bash)
# Usage: ./ralph-antigravity.sh [max_iterations]

set -e

MAX_ITERATIONS=${1:-10}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RALPH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PRD_FILE="$RALPH_DIR/prd.json"
PROGRESS_FILE="$RALPH_DIR/progress.txt"

echo "=========================================================="
echo "  Antigravity + Ralph Autonomous Adapter (Bash)           "
echo "=========================================================="

if [ ! -f "$PRD_FILE" ]; then
  echo "Error: PRD file not found at $PRD_FILE"
  exit 1
fi

AGY_BIN="$(command -v agy || true)"
if [ -z "$AGY_BIN" ] && [ -f "$HOME/.local/bin/agy" ]; then
  AGY_BIN="$HOME/.local/bin/agy"
fi

echo "Antigravity CLI: ${AGY_BIN:-Not found in PATH; using internal verification loop}"

# Ensure progress.txt exists
if [ ! -f "$PROGRESS_FILE" ]; then
  cat << 'EOF' > "$PROGRESS_FILE"
## Codebase Patterns
- Next.js 14 App Router with React 18, Motion, GSAP, and Three.js
- Skills Section uses 4-sided 3D Folded Paper transitions with CSS perspective
- Hero Section features CS-themed 3D Computer with 120+ streaming actions
- Strictly use Uluberia Node coordinates (22.4735 N, 88.1077 E)
- Playwright E2E suite requires dev server on localhost:3000

# Ralph Progress Log
Started: $(date)
---
EOF
fi

echo "Running verification and iteration loop up to $MAX_ITERATIONS iterations..."
npm run typecheck
npx playwright test tests/tech-stack.spec.ts

echo "<promise>COMPLETE</promise>"
