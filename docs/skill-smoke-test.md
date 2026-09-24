# Bloom skill — manual smoke test

Use this checklist after changing `droids/bloom-core.md`, harness installs, or templates. Automated gates: `cd bloom-validator && npm test` and CI (`.github/workflows/validator.yml`).

## Prerequisites

- Node ≥ 22.6 for `bloom-validator`
- Bloom installed for the harness under test (see [harness-capabilities.md](./harness-capabilities.md))

## Test A — Activation

| Step | Action | Expected |
|------|--------|----------|
| A1 | Start a **fresh** agent session in a repo with Bloom installed | Session loads without errors |
| A2 | Send: `bloom on` or `/bloom` (if harness supports slash) | One-line plain-text confirmation; mentions `./bloom/` and how to turn off |
| A3 | Send: `bloom off` | Plain-text confirmation; returns to normal markdown behavior |

## Test B — Substantial artifact (core skill)

| Step | Action | Expected |
|------|--------|----------|
| B1 | `bloom on` | Confirmed |
| B2 | Ask: *Compare three approaches to debounced search in our stack, with tradeoffs and a recommendation.* | Agent writes `./bloom/<date>-*.html` (or similar); chat reply is **one line** with the path, not HTML pasted inline |
| B3 | Open the file via `file://` in a browser | Renders with warm palette; **no** network requests in DevTools |
| B4 | Run: `cd bloom-validator && node src/index.ts ../bloom/<that-file>.html` | Exit code `0` (no errors) |

## Test C — Harness-specific

| Harness | Install under test | B2 pass? | Notes |
|---------|-------------------|----------|-------|
| Claude Code | `.claude/skills/bloom/SKILL.md` | | |
| Cursor | `.cursor/rules/bloom.mdc` (no separate AGENTS required) | | Core inlined in mdc |
| Codex / OpenCode | `AGENTS.md` (synced core) | | |
| Gemini CLI | `GEMINI.md` (core) | | |

## Test D — Interactive patterns (optional)

Requires agent to read `droids/bloom-patterns.md` or repo templates.

| Step | Action | Expected |
|------|--------|----------|
| D1 | Ask: *Build a triage board for these five tickets: …* | Uses column layout; export button; no `alert()` |
| D2 | Validate output | `node bloom-validator/src/index.ts <file>.html` → pass |

Reference templates: `templates/triage-board.html`, `templates/animation-sandbox.html`.

## Test E — Repo hygiene

| Step | Action | Expected |
|------|--------|----------|
| E1 | After tests, check `git status` | `.bloom` and `bloom/` ignored if using root `.gitignore` |

## Maintainer sync

After editing `droids/bloom-core.md`:

```bash
./scripts/sync-skill-files.sh
```

Confirm `AGENTS.md` and `GEMINI.md` headers show the generated comment.
