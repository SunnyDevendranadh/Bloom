#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CORE="$ROOT/droids/bloom-core.md"
{
  echo "<!-- Generated from droids/bloom-core.md — edit source and run scripts/sync-skill-files.sh -->"
  cat "$CORE"
  echo ""
  echo "---"
  echo ""
  echo "## Patterns appendix (optional)"
  echo ""
  echo "For triage boards, annotated diffs, slide decks, and clipboard/SVG/diff code, see [droids/bloom-patterns.md](./droids/bloom-patterns.md) in the Bloom repository (or vendor that file into your project)."
} > "$ROOT/AGENTS.md"
{
  echo "<!-- Generated from droids/bloom-core.md — run scripts/sync-skill-files.sh -->"
  cat "$CORE"
} > "$ROOT/GEMINI.md"
chmod +x "$ROOT/scripts/sync-skill-files.sh"
echo "Synced AGENTS.md and GEMINI.md"
