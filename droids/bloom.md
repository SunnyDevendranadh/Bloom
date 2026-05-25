# Bloom — Maintainer Index

The Bloom skill is split for harness size limits. **Edit sources, not this index.**

| File | Purpose | ~Lines |
|------|---------|--------|
| [bloom-core.md](./bloom-core.md) | Mode, design system, rules, skeleton, bloom self-check | ≤220 |
| [bloom-patterns.md](./bloom-patterns.md) | Categories, harness matrix, clipboard/SVG/diff, delivery checklist | ~400 |

**Synced outputs** (regenerate after editing core):

```bash
./scripts/sync-skill-files.sh   # → AGENTS.md, GEMINI.md
```

**Full skill** (core + patterns, for Factory / one-shot paste):

```bash
cat droids/bloom-core.md droids/bloom-patterns.md > droids/bloom-full.md
```

Capability matrix: [../docs/harness-capabilities.md](../docs/harness-capabilities.md).
