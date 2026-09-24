#!/usr/bin/env bash
# check-versions.sh — Verify that marketplace.json and plugin.json agree on version.
# Exit 0 if in sync, exit 1 with message if mismatch.
# Run this in CI or as a pre-commit hook.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MARKETPLACE="$ROOT/.claude-plugin/marketplace.json"
PLUGIN="$ROOT/plugins/bloom/.claude-plugin/plugin.json"

MKT_VERSION=$(python3 -c "import json; print(json.load(open('$MARKETPLACE'))['plugins'][0]['version'])")
PLG_VERSION=$(python3 -c "import json; print(json.load(open('$PLUGIN'))['version'])")

if [ "$MKT_VERSION" = "$PLG_VERSION" ]; then
  echo "✓ Versions in sync: $MKT_VERSION"
  exit 0
else
  echo "✗ VERSION MISMATCH:"
  echo "  marketplace.json: $MKT_VERSION"
  echo "  plugin.json:      $PLG_VERSION"
  echo ""
  echo "Fix: ./scripts/bump-version.sh <version>"
  exit 1
fi
