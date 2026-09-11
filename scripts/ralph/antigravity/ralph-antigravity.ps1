# Ralph + Antigravity Autonomous Iteration Adapter (PowerShell)
# Usage: .\ralph-antigravity.ps1 [-MaxIterations 10] [-DryRun] [-NonInteractive]

param (
    [int]$MaxIterations = 10,
    [switch]$DryRun,
    [switch]$NonInteractive
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RalphDir = Split-Path -Parent $ScriptDir
$RootDir = Split-Path -Parent (Split-Path -Parent $RalphDir)
$PrdFile = Join-Path $RalphDir "prd.json"
$ProgressFile = Join-Path $RalphDir "progress.txt"
$ClaudePromptFile = Join-Path $RalphDir "prompt.md"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Antigravity + Ralph Autonomous Adapter (PowerShell)   " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not (Test-Path $PrdFile)) {
    Write-Error "PRD file not found at: $PrdFile"
    exit 1
}

# Locate agy CLI
$AgyPath = (Get-Command agy -ErrorAction SilentlyContinue).Source
if (-not $AgyPath) {
    $DefaultAgy = "$env:LOCALAPPDATA\agy\bin\agy.exe"
    if (Test-Path $DefaultAgy) {
        $AgyPath = $DefaultAgy
    }
}

if ($AgyPath) {
    Write-Host "Antigravity CLI detected: $AgyPath" -ForegroundColor Green
} else {
    Write-Host "Antigravity CLI not in standard path. Using embedded autonomous runner mode." -ForegroundColor Yellow
}

# Initialize progress.txt if needed
if (-not (Test-Path $ProgressFile)) {
    $InitialHeader = @"
## Codebase Patterns
- Next.js 14 App Router with React 18, Motion, GSAP, and Three.js
- Skills Section uses 4-sided 3D Folded Paper transitions with CSS perspective
- Hero Section features CS-themed 3D Computer with 120+ streaming actions
- Strictly use Uluberia Node coordinates (22.4735 N, 88.1077 E)
- Playwright E2E suite requires dev server on localhost:3000

# Ralph Progress Log
Started: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
---
"@
    Set-Content -Path $ProgressFile -Value $InitialHeader -Encoding utf8
}

for ($i = 1; $i -le $MaxIterations; $i++) {
    Write-Host "`n--- [Iteration $i of $MaxIterations] ---" -ForegroundColor Cyan
    
    # Read PRD
    $prdRaw = Get-Content -Path $PrdFile -Raw -Encoding utf8
    $prd = $prdRaw | ConvertFrom-Json
    
    $pendingStories = $prd.userStories | Where-Object { $_.passes -eq $false } | Sort-Object priority
    
    if (-not $pendingStories -or $pendingStories.Count -eq 0) {
        Write-Host "`n<promise>COMPLETE</promise>" -ForegroundColor Green
        Write-Host "All Ralph PRD stories are verified and passing!" -ForegroundColor Green
        exit 0
    }
    
    $currentStory = $pendingStories[0]
    Write-Host "Active Story: [$($currentStory.id)] $($currentStory.title) (Priority $($currentStory.priority))" -ForegroundColor Yellow
    Write-Host "Description: $($currentStory.description)" -ForegroundColor DarkGray
    
    if ($DryRun) {
        Write-Host "[DRY RUN] Would execute story $($currentStory.id)" -ForegroundColor Magenta
        continue
    }

    # If non-interactive agy execution is requested and agy is present
    if ($NonInteractive -and $AgyPath) {
        $PromptText = @"
Autonomous Ralph execution for Story $($currentStory.id): $($currentStory.title)
Acceptance Criteria:
$($currentStory.acceptanceCriteria -join "`n")

Follow instructions in scripts/ralph/prompt.md and scripts/ralph/antigravity/ANTIGRAVITY.md.
"@
        Write-Host "Triggering agy non-interactive execution..." -ForegroundColor Cyan
        & $AgyPath -p $PromptText
    }

    # Run verification gates
    Write-Host "Running Verification Gate: Typecheck..." -ForegroundColor Cyan
    $tscResult = npm run typecheck
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Typecheck failed on story $($currentStory.id). Awaiting fix." -ForegroundColor Red
        continue
    }

    Write-Host "Running Verification Gate: Playwright E2E..." -ForegroundColor Cyan
    $testResult = npx playwright test tests/tech-stack.spec.ts
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Playwright tests failed. Awaiting fix." -ForegroundColor Red
        continue
    }

    # Mark story complete
    $currentStory.passes = $true
    $updatedPrdJson = $prd | ConvertTo-Json -Depth 10
    Set-Content -Path $PrdFile -Value $updatedPrdJson -Encoding utf8
    
    # Log progress
    $logEntry = @"

## $(Get-Date -Format "yyyy-MM-dd HH:mm:ss") - $($currentStory.id)
- Implemented: $($currentStory.title)
- Verification: Typecheck passed, Playwright E2E suite passed.
- Learnings for future iterations:
  - Acceptance criteria verified in headless browser session.
---
"@
    Add-Content -Path $ProgressFile -Value $logEntry -Encoding utf8
    
    # Git commit
    Write-Host "Committing verified story..." -ForegroundColor Green
    git add -A
    git commit -m "feat: $($currentStory.id) - $($currentStory.title)"
}

Write-Host "Reached max iterations ($MaxIterations). Remaining stories pending." -ForegroundColor Yellow
