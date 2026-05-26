# Bloom Plan — Maintainer Index

The Bloom Plan skill is a single-file skill. **Edit `droids/bloom-plan.md`, not this index.**

**Synced outputs** (regenerate after editing):

```bash
./scripts/sync-skill-files.sh   # → AGENTS.md, GEMINI.md (both include core + plan)
```

**Full skill** (for Factory / one-shot paste):

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
| Factory Droid | `droids/bloom-plan.md` → `.factory/droids/bloom-plan.md` or `~/.factory/droids/bloom-plan.md` |
| Continue | `droids/bloom-plan.md` → `.continue/rules/bloom-plan.md` |
| GitHub Copilot VS Code | Append snippet to `.github/copilot-instructions.md` |
| Windsurf | Append snippet to `.windsurfrules` |
| Pi / General | Paste into system prompt |
