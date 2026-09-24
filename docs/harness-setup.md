# Harness Setup Guide

How to install **Bloom** — the per-session sticky HTML skill — for every major AI coding agent.

Bloom is sticky: once activated in a session, it stays on until the session ends or the user deactivates it. **Every harness section leads with the manual install — it works today.** Marketplace commands are listed under "Planned marketplace install" where one is in flight; they are deliberately not the primary recommendation until verified live.

---

## Manual install (primary path for every harness)

The single source of truth for Bloom is [`droids/bloom.md`](../droids/bloom.md) and for Bloom Plan is [`droids/bloom-plan.md`](../droids/bloom-plan.md). Every harness install is some variation of copying those files into the location the harness reads. After editing `droids/bloom-core.md` or `droids/bloom-plan.md`, run `./scripts/sync-skill-files.sh` to update `AGENTS.md` and `GEMINI.md`.

| Harness | Bloom install | Bloom Plan install |
|---|---|---|
| Claude Code | `cp -r .claude/skills/bloom /path/to/project/.claude/skills/` | `cp -r .claude/skills/bloom-plan /path/to/project/.claude/skills/` |
| Codex CLI | `cp droids/bloom.md /path/to/project/AGENTS.md` | Included in synced `AGENTS.md` |
| Codex App | `cp droids/bloom.md AGENTS.md && git commit && git push` | Included in synced `AGENTS.md` |
| Factory Droid | `cp droids/bloom.md .factory/droids/` | `cp droids/bloom-plan.md .factory/droids/bloom-plan.md` |
| Gemini CLI | `cp droids/bloom.md GEMINI.md` | Included in synced `GEMINI.md` |
| OpenCode | `cp droids/bloom.md /path/to/project/AGENTS.md` | Included in synced `AGENTS.md` |
| Cursor | `cp droids/bloom.md .cursor/rules/bloom.mdc` | `cp .cursor/rules/bloom-plan.mdc /path/to/project/.cursor/rules/` |
| GitHub Copilot CLI | `cp droids/bloom.md /path/to/project/AGENTS.md` | Included in synced `AGENTS.md` |

Note: For Factory Droid and Continue, the install targets (`.factory/droids/`, `.continue/rules/`) are runtime locations not tracked in git — copy from `droids/` to the harness-native directory.

Per-harness deep notes are in each section below.

## Planned marketplace installs (not yet live)

A marketplace listing is being prepared for several harnesses. Until each one is verified working against the harness's current release, do **not** paste the corresponding command — use the manual install above.

| Harness | Status |
|---|---|
| Claude Code | Queued for Anthropic's official plugin marketplace. Local `.claude-plugin/marketplace.json` exists but ingestion path not yet verified. |
| Codex CLI / Codex App | Queued for `openai/plugins`. Not live. |
| Factory Droid | Plugin marketplace install path not yet verified against current Factory CLI. |
| Gemini CLI | `gemini extensions install <repo>` may work on some builds; not verified against the current Gemini CLI release. |
| OpenCode | Marketplace ingestion is evolving; helper at [`plugins/bloom/INSTALL.opencode.md`](../plugins/bloom/INSTALL.opencode.md). |
| Cursor | No verified `/add-plugin` flow yet. |
| GitHub Copilot CLI | Plugin marketplace install path not yet verified. |

When a listing goes live and is end-to-end verified, it gets promoted out of this section and into the primary install path.

---

## Universal triggers

Once installed, any harness should recognize these in a user message:

| Action | Slash | Phrase |
|---|---|---|
| Activate | `/bloom`, `/bloom-on`, `/bloom-mode` | "bloom on", "let it bloom", "bloom mode on", "activate bloom" |
| Deactivate | `/bloom-off`, `/no-bloom`, `/bloom-mode-off` | "bloom off", "bloom mode off", "stop bloom", "exit bloom" |
| Auto-activate at session start | — | Place a `.bloom` file (any contents) at the repo root |

Slashes are recognized by harnesses that natively support slash commands (Claude Code, Continue, etc.). The phrases are interpreted by the skill instructions themselves and work in every harness.

---

## AGENTS.md (universal markdown contract)

`AGENTS.md` is becoming the de-facto cross-harness contract: a single markdown file at the repo root that AI coding agents read for project-specific instructions. **Codex CLI, Codex App, OpenCode, and GitHub Copilot CLI** all read it. Aider, Continue, and several others honor it too.

The simplest install for all of them is to copy the canonical bloom skill into your project's `AGENTS.md`:

```bash
# Append bloom into an existing AGENTS.md, or create a new one
cp droids/bloom.md /path/to/your-project/AGENTS.md
```

If you already have an `AGENTS.md`, paste the snippet below at the top — it's short enough to live alongside other instructions:

```markdown
## Bloom (sticky HTML output mode)

This project uses Bloom — a per-session sticky HTML output mode from
https://github.com/SunnyDevendranadh/Bloom.

Activation triggers (case-insensitive, anywhere in a user message):
- Slash: /bloom, /bloom-on, /bloom-mode
- Phrases: "bloom on", "let it bloom", "activate bloom"
- File marker: a `.bloom` file at the repo root auto-activates at session start

Deactivation: /bloom-off, /no-bloom, or "bloom off", "stop bloom".

Once activated, bloom stays sticky for the rest of the session.

When bloom is on, produce a self-contained .html file for any substantial
artifact (reports, reviews, plans, docs, comparisons, diagrams, postmortems,
editor UI). Free-standing artifacts go under ./bloom/<date>-<slug>.html.
For reserved files (README.md, CLAUDE.md, AGENTS.md, CONTRIBUTING.md,
CHANGELOG.md), keep the canonical .md and write a companion .html alongside.

Plain text (not HTML) for: one-line answers, tool status, errors, commit
messages, shell output.

Rules for every .html produced:
- Single file, all CSS/JS inline, no external dependencies
- CSS custom properties: --clay (#D97757), --olive (#788C5D), --oat (#E3DACC),
  --slate (#141413), --ivory (#FAF9F5), --rust (#B04A3F)
- Semantic HTML5, accessible, responsive at 640px and 960px breakpoints
- addEventListener only — no inline event handlers, no eval, no innerHTML
  with user data, no external requests, no alert/prompt/confirm
- Export/copy buttons for editor-type artifacts
```

That snippet is what the per-harness sections below repeat. If you've already done the AGENTS.md install once, you can skip the per-harness blocks for any agent that reads AGENTS.md.

---

## Claude Code

**Works today: install as a raw skill.** Copy the `.claude/skills/bloom/` directory into your project (or `~/.claude/skills/` for global use):

```bash
# Project skill (one repo)
cp -r .claude/skills/bloom/ /path/to/your-project/.claude/skills/

# Global skill (every Claude Code session you start)
cp -r .claude/skills/bloom/ ~/.claude/skills/
```

Activate per session with `/bloom`, `/bloom-on`, or by saying "bloom on" / "let it bloom". Deactivate with `/bloom-off`.

**Alternative: add to `CLAUDE.md`** (project) or `~/.claude/CLAUDE.md` (global). Paste the AGENTS.md snippet from the universal section above.

**Planned marketplace install — not yet live.** Bloom is queued for Anthropic's official plugin marketplace. A local Bloom marketplace listing (`.claude-plugin/marketplace.json`) exists in this repo, but ingestion against the current Claude Code release has not been verified end-to-end. Do not paste `/plugin install bloom@…` commands until that is confirmed working.

---

## Codex CLI (OpenAI)

**Works today: manual install.** The Codex CLI reads `AGENTS.md` at the repo root and `~/.codex/AGENTS.md` for global instructions.

```bash
# Project-level bloom (this repo only)
cp droids/bloom.md /path/to/your-project/AGENTS.md

# Global bloom (all your Codex CLI sessions)
mkdir -p ~/.codex
cp droids/bloom.md ~/.codex/AGENTS.md
```

If `AGENTS.md` already exists in either location, append the universal AGENTS.md snippet from the section above. Bloom activates the first time the user message in a Codex CLI session contains `/bloom`, "bloom on", or "let it bloom".

**Planned marketplace install — not yet live.** Bloom is planned for submission to the [openai/plugins](https://github.com/openai/plugins) marketplace. Until that listing is verified working against the current Codex CLI release, use the manual install above.

---

## Codex App (OpenAI web / desktop)

**Works today: manual install.** The Codex App reads `AGENTS.md` from the GitHub repository it's connected to.

1. Commit `AGENTS.md` to your repo root (copy `droids/bloom.md` or paste the universal snippet).
2. Push to the branch you connect to Codex.
3. In the Codex App, open the project and trigger bloom with `/bloom` or "bloom on" in your first message.

Bloom stays sticky for the rest of that Codex App task. To auto-activate without typing a trigger, commit a `.bloom` file at the repo root.

**Planned marketplace install — not yet live.** Once Bloom is listed in the Codex app's plugin sidebar, install will be a single click. Until then, use the manual install above.

---

## Factory Droid

**Works today: manual install.**

```bash
# Personal — applies to all your projects
mkdir -p ~/.factory/droids && cp droids/bloom.md ~/.factory/droids/

# Project — applies to one project only
mkdir -p .factory/droids && cp droids/bloom.md .factory/droids/
```

Then invoke the `bloom` droid in your session.

**Planned marketplace install — not yet live.** Once Bloom is published to a Factory plugin marketplace, register and install will be a two-liner. Until that path is verified against the current Factory CLI, use the manual install above.

---

## Gemini CLI (Google)

**Works today: manual install.** The Gemini CLI reads `GEMINI.md` at the repo root and `~/.gemini/GEMINI.md` for global instructions.

```bash
# Project-level bloom
cp droids/bloom.md /path/to/your-project/GEMINI.md

# Global bloom
mkdir -p ~/.gemini
cp droids/bloom.md ~/.gemini/GEMINI.md
```

If `GEMINI.md` already exists, paste the universal AGENTS.md snippet from above at the top — the trigger phrases work identically in Gemini CLI. A `.bloom` file at the repo root auto-activates bloom at session start.

**Planned extensions install — not yet verified.** `gemini extensions install <repo>` may work on some Gemini CLI builds, but the install path has not been validated against the current release. Until verified, use the manual install above.

---

## OpenCode (sst)

**Works today: manual install.** OpenCode reads `AGENTS.md` at the repo root.

```bash
# Project-level
cp droids/bloom.md /path/to/your-project/AGENTS.md
```

If you also use OpenCode's `opencode.json` for project config, the AGENTS.md install is independent — bloom triggers work regardless of the JSON config. A `.bloom` file at the repo root auto-activates bloom.

**Optional helper.** You can also ask OpenCode itself to follow [`plugins/bloom/INSTALL.opencode.md`](../plugins/bloom/INSTALL.opencode.md) — that prompt walks the agent through the same manual install above.

---

## Cursor

**Works today: manual install (newer Cursor, `.cursor/rules/*.mdc`):**

```bash
mkdir -p /path/to/your-project/.cursor/rules
cp droids/bloom.md /path/to/your-project/.cursor/rules/bloom.mdc
```

**Planned marketplace install — not yet live.** If/when Cursor exposes a `/add-plugin bloom` command and Bloom is listed in their marketplace, it will be added here. Until then, use the manual install above.

**Manual install — legacy Cursor (`.cursorrules` at the repo root):**

Paste this snippet into `.cursorrules`:

```
Bloom — per-session sticky HTML output mode.

Activate when a user message contains /bloom, /bloom-on, /bloom-mode, or phrases like "bloom on", "let it bloom", "activate bloom". Stay sticky for the rest of the session. Deactivate on /bloom-off, /no-bloom, or "bloom off". A `.bloom` file at the repo root auto-activates at session start.

While bloom is on, generate a self-contained .html file for any substantial artifact (reports, reviews, plans, docs, comparisons, diagrams, postmortems, editor UI). Free-standing artifacts go under ./bloom/<date>-<slug>.html. For reserved files (README.md, CLAUDE.md, AGENTS.md, CONTRIBUTING.md, CHANGELOG.md), keep the canonical .md and write a companion .html alongside. Keep short replies, tool status, errors, and commit messages as plain text.

For every .html produced:
- Single file, all CSS/JS inline, zero external dependencies
- CSS custom properties: --clay, --olive, --oat, --slate, --ivory
- Semantic HTML with proper heading hierarchy
- Responsive design with @media breakpoints at 640px and 960px
- Interactive elements use addEventListener, never onclick attributes
- Export buttons for drag-and-drop and editor artifacts
- No eval(), no innerHTML with user data, no external requests
```

---

## GitHub Copilot CLI

**Works today: manual install.** The GitHub Copilot CLI reads `AGENTS.md` at the repo root. Copy `droids/bloom.md` there:

```bash
cp droids/bloom.md /path/to/your-project/AGENTS.md
```

If `AGENTS.md` already exists, paste the universal AGENTS.md snippet from the top of this doc.

Trigger bloom in the CLI by typing `/bloom` or saying "bloom on" / "let it bloom" in your first prompt. Bloom stays sticky for the rest of the CLI session and deactivates on `/bloom-off` or "bloom off".

A `.bloom` file at the repo root auto-activates bloom for any new Copilot CLI session in that workspace.

**Planned marketplace install — not yet live.** Copilot CLI's plugin marketplace install path has not been verified. Use the manual install above.

---

## GitHub Copilot for VS Code

Add to `.github/copilot-instructions.md`:

```markdown
## Bloom (sticky HTML mode)

This project uses Bloom — a per-session sticky HTML output mode.

Activate on /bloom, /bloom-on, or phrases "bloom on", "let it bloom", "activate bloom". Stays sticky for the rest of the session until /bloom-off or "bloom off". A `.bloom` file at the repo root auto-activates.

When bloom is on, generate a single self-contained .html file for any substantial artifact (visual comparisons, code reviews, status reports, architecture diagrams, plans, docs, postmortems, interactive tools). Free-standing artifacts go under ./bloom/<date>-<slug>.html. For reserved files (README.md, CLAUDE.md, AGENTS.md), keep the canonical .md and write a companion .html alongside. Short replies, tool status, errors, and commit messages stay plain text.

Rules for every .html produced:
- One file, inline CSS + JS, no external dependencies
- Use CSS custom properties for all colors (--clay, --olive, --oat, --slate, etc.)
- Responsive, accessible, semantic HTML5
- Export buttons for editor-type artifacts
- No eval, no innerHTML with untrusted data, no external requests
```

---

## Windsurf

Add to `.windsurfrules` in your project root:

```
Bloom — per-session sticky HTML output mode.

Activate on /bloom, /bloom-on, /bloom-mode, or phrases "bloom on", "let it bloom", "activate bloom". Stays sticky for the rest of the session. Deactivate on /bloom-off, /no-bloom, or "bloom off".

When bloom is on, produce a single .html file for substantial artifacts (reports, reviews, plans, docs, comparisons, postmortems, editor UI). Free-standing artifacts go under ./bloom/<date>-<slug>.html. Reserved files (README.md, CLAUDE.md, AGENTS.md) stay as .md and get a companion .html sibling. Short answers, tool status, errors stay plain text.

For every .html produced:
- Everything inline: CSS, JS, SVG all in one file
- Palette: clay=#D97757, olive=#788C5D, oat=#E3DACC, slate=#141413, ivory=#FAF9F5
- Semantic HTML5, accessible, responsive at 640px / 960px
- addEventListener only, no inline event handlers
- Include "Copy as markdown" or "Copy as JSON" for editor artifacts
- Works offline from file://
```

---

## Aider

Aider reads `AGENTS.md` (and a few other config files). The simplest install:

```bash
cp droids/bloom.md /path/to/your-project/AGENTS.md
```

Or pass as a message: `--message "Follow the Bloom skill. Stay sticky once activated. Produce companion .html for reserved .md files."`

You can also drop the universal snippet into `.aider.conf.yml` as the `read` instruction.

---

## Continue (VS Code extension)

Add to `.continue/rules.md`:

```markdown
Bloom — per-session sticky HTML output mode (from the Bloom repository).

Activate on /bloom, /bloom-on, or phrases "bloom on", "let it bloom", "activate bloom". Stays sticky for the rest of the session until /bloom-off or "bloom off". A `.bloom` file at the repo root auto-activates.

While bloom is on, produce a single self-contained .html file for substantial artifacts (visual comparisons, code reviews, architecture diagrams, plans, docs, postmortems, editor UI). Free-standing artifacts go under ./bloom/<date>-<slug>.html. Reserved files (README.md, CLAUDE.md, AGENTS.md) stay as .md and get a companion .html sibling. Short replies, tool status, errors stay plain text.

For every .html produced:
- One file, everything inline
- CSS custom properties (clay/olive/oat/slate palette)
- Semantic HTML, accessible, responsive
- Export buttons for editor artifacts
- No external deps, no eval, no innerHTML with user data
```

---

## Replit Agent

In your Replit project instructions:

```
Bloom — per-session sticky HTML output mode.

Activate on /bloom, /bloom-on, or "bloom on", "let it bloom", "activate bloom". Stays sticky for the rest of the session. Deactivate on /bloom-off or "bloom off". A `.bloom` file at the repo root auto-activates at session start.

While bloom is on, generate a single self-contained .html file for substantial artifacts (visual comparisons, code reviews, design docs, plans, postmortems, interactive editors). Free-standing artifacts go under ./bloom/<date>-<slug>.html. Reserved files (README.md, CLAUDE.md, AGENTS.md) stay as .md and get a companion .html sibling. Short replies, tool status, errors stay plain text.

Requirements for every .html produced:
- One .html file with all CSS and JS inline
- Use CSS variables: --ivory, --slate, --clay, --oat, --olive
- No external dependencies (no CDNs, no external fonts)
- Semantic HTML5, responsive, accessible
- Include copy/export functionality for editor types
- Must work when opened directly in a browser
```

---

## Pi / General AI Agents

Add to your system prompt:

```
You have access to the Bloom skill — a per-session sticky HTML output mode.

Bloom activates when the user message contains any of /bloom, /bloom-on, /bloom-mode, or phrases "bloom on", "let it bloom", "activate bloom", "bloom please". Once active, it stays sticky for the rest of the session until /bloom-off, /no-bloom, or "bloom off" fires. A `.bloom` file at the workspace root auto-activates at session start.

When bloom is on, generate a single self-contained .html file for any substantial artifact (reports, reviews, plans, docs, comparisons, diagrams, postmortems, editor UI). Free-standing artifacts go under ./bloom/<date>-<slug>.html. For reserved files (README.md, CLAUDE.md, AGENTS.md, CONTRIBUTING.md, CHANGELOG.md), keep the canonical .md as the contract and write a companion .html alongside. One-line answers, tool status, errors, commit messages, and shell output stay plain text.

The .html file must:
1. Be a single .html file with all CSS and JS inline
2. Use CSS custom properties for colors (palette: ivory=#FAF9F5, slate=#141413, clay=#D97757, oat=#E3DACC, olive=#788C5D)
3. Use semantic HTML5 elements
4. Be responsive and accessible
5. Work offline from file:// with no external dependencies
6. Include export buttons for interactive artifacts
7. Never use eval(), innerHTML with user data, or javascript: URIs
```

---

## Cross-harness install matrix

If you want bloom available across multiple harnesses in one repo, the cheapest install is:

| Harness | File that triggers install |
|---|---|
| Claude Code | `.claude/skills/bloom/SKILL.md` |
| Codex CLI | `AGENTS.md` |
| Codex App | `AGENTS.md` (committed to the linked GitHub branch) |
| Factory Droid | `.factory/droids/bloom.md` |
| Gemini CLI | `GEMINI.md` |
| OpenCode | `AGENTS.md` |
| Cursor | `.cursor/rules/bloom.mdc` (or `.cursorrules` legacy) |
| GitHub Copilot CLI | `AGENTS.md` |
| GitHub Copilot (VS Code) | `.github/copilot-instructions.md` |
| Windsurf | `.windsurfrules` |
| Aider | `AGENTS.md` (or `.aider.conf.yml`) |
| Continue | `.continue/rules.md` |

The `AGENTS.md` row covers Codex CLI, Codex App, OpenCode, GitHub Copilot CLI, and Aider in one file. Drop bloom there once and five harnesses pick it up. Bloom Plan is included in `AGENTS.md` and `GEMINI.md` via the sync script (`./scripts/sync-skill-files.sh`).

**Bloom Plan** has harness-specific files that must be installed separately:

| Harness | Bloom Plan source → target |
|---------|---------------------------|
| Claude Code | `.claude/skills/bloom-plan/SKILL.md` (tracked in repo with YAML frontmatter) |
| Cursor | `.cursor/rules/bloom-plan.mdc` (tracked in repo with YAML frontmatter) |
| Factory Droid | `droids/bloom-plan.md` → `.factory/droids/bloom-plan.md` (copy, not tracked) |
| Continue | `droids/bloom-plan.md` → `.continue/rules/bloom-plan.md` (copy, not tracked) |
| GitHub Copilot (VS Code) | Append bloom-plan snippet to `.github/copilot-instructions.md` (not tracked) |
| Windsurf | Append bloom-plan snippet to `.windsurfrules` (not tracked) |

---

## Verification

After installation, test the activation lifecycle:

**1. Verify activation.** Send:

> `/bloom`

The agent should reply with a one-line plain-text confirmation naming bloom and how to deactivate. No HTML splash screen.

**2. Verify substantial artifact produces a file.** Send:

> "Show me three approaches to implement debounced search in our React codebase, with tradeoffs for each."

Or:

> "Create a status report for this week's sprint with PRs merged, carryover items, and a velocity chart."

The agent should write an `.html` file under `./bloom/` (or alongside the relevant source) and reply with a single line pointing at the file path. Open the file — it should render correctly in a browser with no console errors and no network requests.

**3. Verify companion-file rule.** Send:

> "Update CLAUDE.md to mention our new test runner."

The agent should update `CLAUDE.md` (canonical markdown) and also write a richer `CLAUDE.html` companion next to it.

**4. Verify short replies stay plain text.** Send:

> "What port does the dev server run on?"

The agent should answer in one or two lines of plain text. No HTML artifact for trivial answers.

**5. Verify deactivation.** Send:

> `/bloom-off`

The agent should confirm in plain text and return to default markdown behavior on the next turn.

---

## Bloom Plan verification

After installing bloom-plan for your harness, test the planning lifecycle:

**1. Verify activation.** Send:

> `/bloom-plan`

The agent should confirm in plain text that planning mode is active, list the deactivation command (`/plan-off`), and note that plan artifacts go to `.cursor/plans/`.

**2. Verify plan generation.** Send:

> "Plan the architecture for a URL shortener service"

The agent should enter a research phase (read-only), then produce both a `.plan.md` and `.plan.html` in `.cursor/plans/`. Every decision section should have 3-4 alternatives with concrete examples and benchmarks.

**3. Verify approval gate.** After the plan is written, the agent should pause and ask for explicit approval before executing any changes.

**4. Verify adaptive scale.** Try each:

- Greenfield: "Plan a new project from scratch" — full-scope decisions (tech stack, architecture, etc.)
- Brownfield: "Plan adding auth to this codebase" — execution-level decisions (which files, which patterns)
- Phase: "The master plan has 5 phases. Plan phase 1" — task-level decisions (atomic steps, verification)

**5. Verify deactivation.** Send:

> `/plan-off`

The agent should confirm in plain text and return to default behavior.
