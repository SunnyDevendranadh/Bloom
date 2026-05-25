#!/usr/bin/env bash
# bump-version.sh — Update version in both plugin manifests atomically.
# Usage: ./scripts/bump-version.sh <version>
#   version must be SemVer (1.2.3) or a full 40-char commit SHA.
#   Same version string in both files = Claude Code won't reinstall.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MARKETPLACE="$ROOT/.claude-plugin/marketplace.json"
PLUGIN="$ROOT/plugins/bloom/.claude-plugin/plugin.json"

VERSION="${1:-}"

if [ -z "$VERSION" ]; then
  echo "Usage: bump-version.sh <version>"
  echo "  version: SemVer (e.g., 1.2.3) or full 40-char commit SHA"
  echo ""
  echo "Current versions:"
  echo "  marketplace: $(python3 -c "import json; print(json.load(open('$MARKETPLACE'))['plugins'][0]['version'])")"
  echo "  plugin:      $(python3 -c "import json; print(json.load(open('$PLUGIN'))['version'])")"
  exit 1
fi

# Validate SemVer or 40-char hex SHA
if ! echo "$VERSION" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.]+)?(\+[a-zA-Z0-9.]+)?$' && \
   ! echo "$VERSION" | grep -qE '^[0-9a-f]{40}$'; then
  echo "Error: version must be SemVer (e.g., 1.2.3) or a 40-char commit SHA"
  echo "Got: $VERSION"
  exit 1
fi

# Read current versions
CUR_MKT=$(python3 -c "import json; print(json.load(open('$MARKETPLACE'))['plugins'][0]['version'])")
CUR_PLG=$(python3 -c "import json; print(json.load(open('$PLUGIN'))['version'])")

if [ "$CUR_MKT" = "$VERSION" ] && [ "$CUR_PLG" = "$VERSION" ]; then
  echo "Both files already at version $VERSION — nothing to do."
  exit 0
fi

echo "Bumping version: $VERSION"
echo "  marketplace.json: $CUR_MKT → $VERSION"
echo "  plugin.json:      $CUR_PLG → $VERSION"

# Update marketplace.json (plugins array, bloom entry)
python3 -c "
import json
with open('$MARKETPLACE') as f:
    data = json.load(f)
for p in data['plugins']:
    if p['name'] == 'bloom':
        p['version'] = '$VERSION'
        break
with open('$MARKETPLACE', 'w') as f:
    json.dump(data, f, indent=2)
    f.write('\n')
"

# Update plugin.json
python3 -c "
import json
with open('$PLUGIN') as f:
    data = json.load(f)
data['version'] = '$VERSION'
with open('$PLUGIN', 'w') as f:
    json.dump(data, f, indent=2)
    f.write('\n')
"

echo "Done. Both manifests at version $VERSION"
echo "Same string = no reinstall ✓"
