#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CORE="$ROOT/droids/bloom-core.md"
PLAN="$ROOT/droids/bloom-plan.md"

# --- AGENTS.md (Codex CLI, Codex App, OpenCode, GitHub Copilot CLI, Aider) ---
{
  echo "<!-- Generated from droids/bloom-core.md + droids/bloom-plan.md — edit sources and run scripts/sync-skill-files.sh -->"
  cat "$CORE"
  echo ""
  echo "---"
  echo ""
  echo "## Bloom Plan (decision-transparent planning)"
  echo ""
  cat "$PLAN"
  echo ""
  echo "---"
  echo ""
  echo "## Patterns appendix (optional)"
  echo ""
  echo "For triage boards, annotated diffs, slide decks, and clipboard/SVG/diff code, see [droids/bloom-patterns.md](./droids/bloom-patterns.md) in the Bloom repository (or vendor that file into your project)."
} > "$ROOT/AGENTS.md"

# --- GEMINI.md (Gemini CLI) ---
{
  echo "<!-- Generated from droids/bloom-core.md + droids/bloom-plan.md — run scripts/sync-skill-files.sh -->"
  cat "$CORE"
  echo ""
  echo "---"
  echo ""
  echo "## Bloom Plan (decision-transparent planning)"
  echo ""
  cat "$PLAN"
} > "$ROOT/GEMINI.md"

# --- .cursor/rules/bloom-plan.mdc ---
# Cursor rule files need frontmatter; sync from the canonical droids source.
# (The .mdc file is maintained manually since it needs YAML frontmatter
#  and globs. The sync script does NOT overwrite it.)

# --- .claude/skills/bloom-plan/SKILL.md ---
# (Maintained manually — it has YAML frontmatter specific to Claude Code.)
# The sync script does NOT overwrite it.

# --- .factory/droids/bloom-plan.md ---
# (Maintained manually — it's a condensed version for Factory droids.)
# The sync script does NOT overwrite it.

chmod +x "$ROOT/scripts/sync-skill-files.sh"
echo "Synced AGENTS.md and GEMINI.md (with bloom-plan)"
