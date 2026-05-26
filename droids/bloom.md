# Bloom — Maintainer Index

The Bloom skill is split for harness size limits. **Edit sources, not this index.**

| File | Purpose | ~Tokens |
|------|---------|---------|
| [bloom-core.md](./bloom-core.md) | Mode, design system, rules, skeleton, self-check | ~1,137 |
| [bloom-patterns.md](./bloom-patterns.md) | Categories, harness matrix, clipboard/SVG/diff, delivery | ~3,494 |
| [bloom-plan.md](./bloom-plan.md) | Decision-transparent planning skill | ~900 |

**Synced outputs** (regenerate after editing core):

```bash
./scripts/sync-skill-files.sh   # → AGENTS.md, GEMINI.md
```

**Full skill** (core + patterns, for Factory / one-shot paste):

```bash
cat droids/bloom-core.md droids/bloom-patterns.md > droids/bloom-full.md
```

Capability matrix: [../docs/harness-capabilities.md](../docs/harness-capabilities.md).
