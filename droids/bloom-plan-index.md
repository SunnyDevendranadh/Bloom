# Bloom Plan — Maintainer Index

The Bloom Plan skill is a single-file skill. **Edit `droids/bloom-plan.md`, not this index.**

**Token budget:** bloom-plan ≈ 960 tokens. bloom-core ≈ 1,137 tokens. Combined ≈ 2,097 tokens (fits 2% budget at 128k context).

**Synced outputs** (regenerate after editing core):

```bash
./scripts/sync-skill-files.sh   # → AGENTS.md, GEMINI.md (both include core + plan)
```

**Full skill** (core + patterns + plan, for Factory / one-shot paste):

```bash
cat droids/bloom-core.md droids/bloom-patterns.md droids/bloom-plan.md > droids/bloom-plan-full.md
```

**Harness installs** (see `docs/harness-setup.md`):

| Harness | Source → Target |
|---------|----------------|
| Claude Code | `droids/bloom-plan.md` → `.claude/skills/bloom-plan/SKILL.md` (with YAML frontmatter) |
| Cursor | `droids/bloom-plan.md` → `.cursor/rules/bloom-plan.mdc` (with YAML frontmatter) |
| Codex CLI / App / OpenCode / Copilot CLI / Aider | Auto-synced into `AGENTS.md` via `scripts/sync-skill-files.sh` |
| Gemini CLI | Auto-synced into `GEMINI.md` via `scripts/sync-skill-files.sh` |
| Factory Droid | `droids/bloom-plan.md` → `.factory/droids/bloom-plan.md` (condensed) or `~/.factory/droids/` |
| Continue | `droids/bloom-plan.md` → `.continue/rules/bloom-plan.md` (condensed) |
| GitHub Copilot VS Code | Append snippet to `.github/copilot-instructions.md` |
| Windsurf | Append snippet to `.windsurfrules` |
| Pi / General | Paste into system prompt |
