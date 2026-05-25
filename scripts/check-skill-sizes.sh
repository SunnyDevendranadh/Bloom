#!/usr/bin/env bash
# Guard against skill packaging regressions (pointer-only Cursor rule, bloated core).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CORE="$ROOT/droids/bloom-core.md"
MDC="$ROOT/.cursor/rules/bloom.mdc"

core_lines=$(wc -l < "$CORE" | tr -d ' ')
mdc_lines=$(wc -l < "$MDC" | tr -d ' ')

err=0
if [[ "$core_lines" -gt 220 ]]; then
  echo "FAIL: bloom-core.md has $core_lines lines (max 220)" >&2
  err=1
fi
if [[ "$mdc_lines" -lt 80 ]]; then
  echo "FAIL: bloom.mdc has $mdc_lines lines (min 80 — likely pointer-only)" >&2
  err=1
fi

if [[ "$err" -eq 0 ]]; then
  echo "OK: bloom-core.md=$core_lines lines, bloom.mdc=$mdc_lines lines"
fi
exit "$err"
