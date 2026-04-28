#!/usr/bin/env bash
# =============================================================================
# Falak · Preflight Check
# =============================================================================
# Verifies everything is ready before your first Claude Code session.
# Usage:  bash preflight.sh
# Or:     chmod +x preflight.sh && ./preflight.sh
# =============================================================================

set -u  # error on unset vars (but not on command failures — we handle those)

# ---- Colors (disabled if not a TTY) ----
if [ -t 1 ]; then
  RED='\033[0;31m'
  GREEN='\033[0;32m'
  YELLOW='\033[1;33m'
  BLUE='\033[0;34m'
  BOLD='\033[1m'
  DIM='\033[2m'
  NC='\033[0m'
else
  RED=''; GREEN=''; YELLOW=''; BLUE=''; BOLD=''; DIM=''; NC=''
fi

# ---- Counters ----
PASS=0
WARN=0
FAIL=0
INFO=0

# ---- Helpers ----
header() {
  echo ""
  echo -e "${BOLD}${BLUE}━━━ $1 ━━━${NC}"
}

pass() {
  echo -e "  ${GREEN}✓${NC} $1"
  PASS=$((PASS+1))
}

warn() {
  echo -e "  ${YELLOW}⚠${NC} $1"
  WARN=$((WARN+1))
}

fail() {
  echo -e "  ${RED}✗${NC} $1"
  FAIL=$((FAIL+1))
}

info() {
  echo -e "  ${DIM}·${NC} $1"
  INFO=$((INFO+1))
}

# Check if a command exists
has_cmd() {
  command -v "$1" >/dev/null 2>&1
}

# Get version (takes command + version flag, returns first version-like token)
get_version() {
  local cmd="$1"
  local flag="${2:---version}"
  local out
  out=$("$cmd" "$flag" 2>&1 | head -n1)
  # extract first v?X.Y.Z-like token
  echo "$out" | grep -oE '[vV]?[0-9]+\.[0-9]+(\.[0-9]+)?' | head -n1 | sed 's/^[vV]//'
}

# Compare versions. Returns 0 if $1 >= $2
version_ge() {
  [ "$(printf '%s\n' "$2" "$1" | sort -V | head -n1)" = "$2" ]
}

# =============================================================================
# Banner
# =============================================================================
echo ""
echo -e "${BOLD}┌──────────────────────────────────────────────┐${NC}"
echo -e "${BOLD}│  Falak · فَلَك   — Preflight Check           │${NC}"
echo -e "${BOLD}└──────────────────────────────────────────────┘${NC}"
echo ""
echo -e "${DIM}This script verifies your environment is ready for${NC}"
echo -e "${DIM}your first Claude Code session on the Falak project.${NC}"

# =============================================================================
# 1. System info
# =============================================================================
header "System"

OS="$(uname -s 2>/dev/null || echo unknown)"
ARCH="$(uname -m 2>/dev/null || echo unknown)"
info "OS:   $OS"
info "Arch: $ARCH"

case "$OS" in
  Darwin)  pass "macOS detected" ;;
  Linux)   pass "Linux detected" ;;
  MINGW*|MSYS*|CYGWIN*) pass "Windows (Git Bash/WSL) detected" ;;
  *)       warn "Unrecognized OS — proceeding anyway" ;;
esac

# =============================================================================
# 2. Project files (are we in the right folder?)
# =============================================================================
header "Project files"

REQUIRED_FILES=(
  "START_HERE.md"
  "CLAUDE.md"
  "SPEC.md"
  "docs/01_curriculum_and_units.md"
  "docs/02_design_system.md"
  "docs/03_architecture.md"
  "docs/04_tech_stack.md"
  "docs/05_unit_template.md"
  "docs/06_interactive_patterns.md"
  "docs/07_content_guidelines.md"
  "docs/08_build_roadmap.md"
  ".claude/skills/physics-accuracy/SKILL.md"
  ".claude/skills/bilingual-content/SKILL.md"
  ".claude/skills/slide-authoring/SKILL.md"
  ".claude/skills/simulation-builder/SKILL.md"
  ".claude/commands/new-unit.md"
  ".claude/commands/review-unit.md"
)

MISSING=0
for f in "${REQUIRED_FILES[@]}"; do
  if [ -f "$f" ]; then
    :
  else
    fail "Missing: $f"
    MISSING=$((MISSING+1))
  fi
done

if [ $MISSING -eq 0 ]; then
  pass "All ${#REQUIRED_FILES[@]} required project files present"
else
  fail "$MISSING required files missing — are you in the falak_project folder?"
fi

# =============================================================================
# 3. Node.js
# =============================================================================
header "Node.js"

if has_cmd node; then
  NODE_V=$(get_version node --version)
  if [ -z "$NODE_V" ]; then
    warn "Could not parse node version"
  elif version_ge "$NODE_V" "20.0.0"; then
    pass "node v$NODE_V (need ≥ 20)"
  else
    fail "node v$NODE_V is too old — need ≥ 20. Install from nodejs.org or use nvm."
  fi
else
  fail "node not installed. Install Node.js 20+ from nodejs.org"
fi

if has_cmd npm; then
  NPM_V=$(get_version npm --version)
  if [ -n "$NPM_V" ]; then
    pass "npm v$NPM_V"
  else
    warn "npm present but version unreadable"
  fi
else
  fail "npm not found (should come with node)"
fi

# =============================================================================
# 4. pnpm
# =============================================================================
header "pnpm"

if has_cmd pnpm; then
  PNPM_V=$(get_version pnpm --version)
  if [ -z "$PNPM_V" ]; then
    warn "pnpm installed but version unreadable"
  elif version_ge "$PNPM_V" "8.0.0"; then
    pass "pnpm v$PNPM_V (need ≥ 8)"
  else
    warn "pnpm v$PNPM_V may be too old — recommend ≥ 8. Upgrade: npm install -g pnpm"
  fi
else
  fail "pnpm not installed. Run: npm install -g pnpm"
fi

# =============================================================================
# 5. Git
# =============================================================================
header "Git"

if has_cmd git; then
  GIT_V=$(get_version git --version)
  if [ -n "$GIT_V" ]; then
    pass "git v$GIT_V"
  else
    warn "git present but version unreadable"
  fi

  # Check git user configured
  GIT_NAME=$(git config --global user.name 2>/dev/null || true)
  GIT_EMAIL=$(git config --global user.email 2>/dev/null || true)

  if [ -n "$GIT_NAME" ] && [ -n "$GIT_EMAIL" ]; then
    pass "git identity: $GIT_NAME <$GIT_EMAIL>"
  else
    warn "git user.name or user.email not configured globally"
    echo -e "    ${DIM}Set with:${NC}"
    echo -e "      git config --global user.name \"Your Name\""
    echo -e "      git config --global user.email \"you@example.com\""
  fi

  # Check if this folder is a git repo
  if [ -d ".git" ]; then
    pass "current folder is a git repo"
    BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
    [ -n "$BRANCH" ] && info "on branch: $BRANCH"
  else
    warn "current folder is not a git repo yet"
    echo -e "    ${DIM}Initialize with:${NC}  git init && git add . && git commit -m 'chore: initial'"
  fi
else
  fail "git not installed"
fi

# =============================================================================
# 6. Claude Code
# =============================================================================
header "Claude Code"

if has_cmd claude; then
  CLAUDE_V=$(claude --version 2>&1 | head -n1 | grep -oE '[0-9]+\.[0-9]+(\.[0-9]+)?' | head -n1 || echo "")
  if [ -n "$CLAUDE_V" ]; then
    pass "claude v$CLAUDE_V installed"
  else
    pass "claude CLI installed (version unreadable)"
  fi
else
  fail "claude not installed"
  echo -e "    ${DIM}Install from:${NC} https://docs.claude.com"
  echo -e "    ${DIM}Likely:${NC}       npm install -g @anthropic-ai/claude-code"
fi

# =============================================================================
# 7. Optional but useful tools
# =============================================================================
header "Optional tools (nice to have)"

if has_cmd code; then
  pass "VS Code CLI available (\`code .\`)"
else
  info "VS Code CLI not detected — install from code.visualstudio.com"
fi

if has_cmd gh; then
  pass "GitHub CLI available"
else
  info "GitHub CLI not installed — useful for PR workflows (cli.github.com)"
fi

if has_cmd curl; then
  pass "curl available"
else
  warn "curl not available — some npm installs may be affected"
fi

# =============================================================================
# 8. Network reachability (optional, can be slow)
# =============================================================================
header "Network (registry reachability)"

if has_cmd curl; then
  if curl --max-time 5 -fsS https://registry.npmjs.org/ > /dev/null 2>&1; then
    pass "npm registry reachable"
  else
    warn "could not reach npm registry (maybe offline or behind a proxy)"
  fi
else
  info "skipping (curl not available)"
fi

# =============================================================================
# 9. Disk space
# =============================================================================
header "Disk space"

if has_cmd df; then
  # Get available space in current dir (portable-ish)
  AVAIL=$(df -h . 2>/dev/null | awk 'NR==2 {print $4}')
  [ -n "$AVAIL" ] && info "available in this folder: $AVAIL"
  # Check if we have at least 2GB for node_modules
  AVAIL_K=$(df -k . 2>/dev/null | awk 'NR==2 {print $4}')
  if [ -n "$AVAIL_K" ] && [ "$AVAIL_K" -gt 2000000 ]; then
    pass "at least 2 GB available (node_modules needs ~500 MB)"
  else
    warn "less than 2 GB available — node_modules might be tight"
  fi
fi

# =============================================================================
# Summary
# =============================================================================
echo ""
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}  Summary${NC}"
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "  ${GREEN}✓ Pass:${NC}    $PASS"
[ $WARN -gt 0 ] && echo -e "  ${YELLOW}⚠ Warn:${NC}    $WARN" || echo -e "  ${DIM}⚠ Warn:    0${NC}"
[ $FAIL -gt 0 ] && echo -e "  ${RED}✗ Fail:${NC}    $FAIL" || echo -e "  ${DIM}✗ Fail:    0${NC}"
echo ""

if [ $FAIL -gt 0 ]; then
  echo -e "${RED}${BOLD}✗ Not ready.${NC} Fix the ${RED}✗${NC} items above, then re-run this script."
  echo ""
  exit 1
elif [ $WARN -gt 0 ]; then
  echo -e "${YELLOW}${BOLD}⚠ Ready with warnings.${NC} You can proceed, but address ${YELLOW}⚠${NC} items soon."
  echo ""
  echo -e "${BOLD}Next step:${NC}"
  echo -e "  ${DIM}1.${NC} Open this folder in your terminal"
  echo -e "  ${DIM}2.${NC} Run: ${BOLD}claude${NC}"
  echo -e "  ${DIM}3.${NC} Paste the Step 1 prompt from START_HERE.md"
  echo ""
  exit 0
else
  echo -e "${GREEN}${BOLD}✓ All systems go.${NC} You're ready for your first Claude Code session."
  echo ""
  echo -e "${BOLD}Next step:${NC}"
  echo -e "  ${DIM}1.${NC} Run: ${BOLD}claude${NC}"
  echo -e "  ${DIM}2.${NC} Paste the Step 1 prompt from START_HERE.md:"
  echo ""
  echo -e "     ${DIM}Summarize the Falak project in 3 sentences. Then list all${NC}"
  echo -e "     ${DIM}14 units by their English names, with one sentence each${NC}"
  echo -e "     ${DIM}about what that unit's interactive simulation does...${NC}"
  echo ""
  exit 0
fi
