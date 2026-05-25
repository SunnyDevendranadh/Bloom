# Harness Setup Guide

How to install **Bloom** — the per-session sticky HTML skill — for every major AI coding agent.

Bloom is sticky: once activated in a session, it stays on until the session ends or the user deactivates it. Each harness section below shows the marketplace install command (where available), the manual install path as a fallback, plus the activation and deactivation triggers.

For slash-command support, stickiness, and what each harness loads into context, see [`harness-capabilities.md`](./harness-capabilities.md).

---

## Marketplace install (recommended)

For harnesses with a plugin/extension marketplace, the cleanest install is via the marketplace command. The README has the per-harness one-liners; this section is the deep reference for each.

| Harness | Marketplace install |
|---|---|
| Claude Code | `/plugin install bloom@claude-plugins-official` (official, after submission) or `/plugin marketplace add SunnyDevendranadh/Bloom` + `/plugin install bloom@bloom` |
| Codex CLI | `/plugins` → search "bloom" → Install (after submission to openai/plugins) |
| Codex App | Sidebar → Plugins → click `+` on Bloom (after submission to openai/plugins) |
| Factory Droid | `droid plugin marketplace add https://github.com/SunnyDevendranadh/Bloom` + `droid plugin install bloom@bloom` |
| Gemini CLI | `gemini extensions install https://github.com/SunnyDevendranadh/Bloom` |
| OpenCode | "Fetch and follow https://raw.githubusercontent.com/SunnyDevendranadh/Bloom/main/plugins/bloom/INSTALL.opencode.md" |
| Cursor | `/add-plugin bloom` (after marketplace listing) |
| GitHub Copilot CLI | `copilot plugin marketplace add SunnyDevendranadh/Bloom` + `copilot plugin install bloom@bloom` |

If a marketplace listing isn't live yet for your harness, every harness also has a manual install — see its section below.

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

**Recommended: install via plugin marketplace.**

Bloom ships as a Claude Code plugin and is queued for submission to Anthropic's official plugin marketplace.

```
# After submission lands
/plugin install bloom@claude-plugins-official
```

Or install from the Bloom marketplace today:

```
/plugin marketplace add SunnyDevendranadh/Bloom
/plugin install bloom@bloom
```

The plugin packages the bloom skill so it loads automatically into every Claude Code session in workspaces that have it installed. Activate per session with `/bloom`, `/bloom-on`, or by saying "bloom on" / "let it bloom". Deactivate with `/bloom-off`.

**Alternative: install as a raw skill** (no plugin system). Copy the `.claude/skills/bloom/` directory into your project (or `~/.claude/skills/` for global use):

```bash
# Project skill (this repo only)
cp -r .claude/skills/bloom/ /path/to/your-project/.claude/skills/

# Global skill (all your Claude Code sessions)
cp -r .claude/skills/bloom/ ~/.claude/skills/
```

**Alternative: add to `CLAUDE.md`** (project) or `~/.claude/CLAUDE.md` (global). Paste the AGENTS.md snippet from the universal section above.

---

## Codex CLI (OpenAI)

**Recommended: install via the [official Codex plugin marketplace](https://github.com/openai/plugins)** (after submission lands):

```
/plugins
```

Search for `bloom` and select **Install Plugin**.

**Manual install** (works today): the Codex CLI reads `AGENTS.md` at the repo root and `~/.codex/AGENTS.md` for global instructions. By default, install loads **[`droids/bloom-core.md`](../droids/bloom-core.md)** (~210 lines) — enough for reports, reviews, plans, and companion `.html` files. For interactive UI (triage boards, animation sandboxes, annotated diffs, slide decks), also vendor [`droids/bloom-patterns.md`](../droids/bloom-patterns.md) into the repo or append it to a separate `AGENTS-patterns.md`.

```bash
# Project-level bloom core (this repo only)
curl -fsSL https://raw.githubusercontent.com/SunnyDevendranadh/Bloom/main/droids/bloom-core.md >> /path/to/your-project/AGENTS.md

# Global bloom core (all your Codex CLI sessions)
mkdir -p ~/.codex
curl -fsSL https://raw.githubusercontent.com/SunnyDevendranadh/Bloom/main/droids/bloom-core.md >> ~/.codex/AGENTS.md
```

If `AGENTS.md` already exists in either location, the curl commands append after existing instructions. Bloom activates the first time the user message in a Codex CLI session contains `/bloom`, "bloom on", or "let it bloom". See [`harness-capabilities.md`](./harness-capabilities.md) for what each harness loads into context.

---

## Codex App (OpenAI web / desktop)

**Recommended: install via the [official Codex plugin marketplace](https://github.com/openai/plugins)** (after submission lands):

- In the Codex App, click on **Plugins** in the sidebar.
- You should see `Bloom` in the Coding section.
- Click the `+` next to Bloom and follow the prompts.

**Manual install** (works today): the Codex App reads `AGENTS.md` from the GitHub repository it's connected to. Commit repo-root `AGENTS.md` with **[`droids/bloom-core.md`](../droids/bloom-core.md)** content (or run `./scripts/sync-skill-files.sh` in the Bloom repo). For interactive UI patterns, also commit [`droids/bloom-patterns.md`](../droids/bloom-patterns.md) or an `AGENTS-patterns.md` sibling.

1. Commit `AGENTS.md` to your repo root (bloom-core, or paste the universal snippet).
2. Push to the branch you connect to Codex.
3. In the Codex App, open the project and trigger bloom with `/bloom` or "bloom on" in your first message.

Bloom stays sticky for the rest of that Codex App task. To auto-activate without typing a trigger, commit a `.bloom` file at the repo root. See [`harness-capabilities.md`](./harness-capabilities.md) for slash vs phrase activation and context size.

---

## Factory Droid

**Recommended: install via the Factory Droid plugin marketplace.**

```
droid plugin marketplace add https://github.com/SunnyDevendranadh/Bloom
droid plugin install bloom@bloom
```

**Manual install** (works today):

```bash
# Personal — applies to all your projects
cp droids/bloom.md ~/.factory/droids/

# Project — applies to one project only
cp droids/bloom.md .factory/droids/
```

Then invoke the `bloom` droid in your session.

---

## Gemini CLI (Google)

**Recommended: install via the Gemini CLI extensions system.**

```
gemini extensions install https://github.com/SunnyDevendranadh/Bloom
```

Update later with:

```
gemini extensions update bloom
```

**Manual install** (works today): the Gemini CLI reads `GEMINI.md` at the repo root and `~/.gemini/GEMINI.md` for global instructions. By default, install loads **[`droids/bloom-core.md`](../droids/bloom-core.md)** (this repo's `GEMINI.md` is generated from core). For interactive UI, also vendor [`droids/bloom-patterns.md`](../droids/bloom-patterns.md).

```bash
# Project-level bloom core
curl -fsSL https://raw.githubusercontent.com/SunnyDevendranadh/Bloom/main/droids/bloom-core.md >> /path/to/your-project/GEMINI.md

# Global bloom core
mkdir -p ~/.gemini
curl -fsSL https://raw.githubusercontent.com/SunnyDevendranadh/Bloom/main/droids/bloom-core.md >> ~/.gemini/GEMINI.md
```

If `GEMINI.md` already exists, append core or paste the universal AGENTS.md snippet from above at the top — the trigger phrases work identically in Gemini CLI. A `.bloom` file at the repo root auto-activates bloom at session start. See [`harness-capabilities.md`](./harness-capabilities.md) for what loads into context.

---

## OpenCode (sst)

OpenCode uses its own plugin install. Install Bloom separately even if you already use it in another harness.

**Recommended: tell OpenCode to fetch the install doc:**

```
Fetch and follow instructions from https://raw.githubusercontent.com/SunnyDevendranadh/Bloom/main/plugins/bloom/INSTALL.opencode.md
```

Or use the same flow as the Codex CLI manual install — OpenCode reads `AGENTS.md` at the repo root. By default, install loads **[`droids/bloom-core.md`](../droids/bloom-core.md)**; see [`plugins/bloom/INSTALL.opencode.md`](../plugins/bloom/INSTALL.opencode.md) for the one-line curl install. For interactive UI (triage boards, animation sandboxes), also vendor [`droids/bloom-patterns.md`](../droids/bloom-patterns.md).

```bash
# Project-level bloom core
curl -fsSL https://raw.githubusercontent.com/SunnyDevendranadh/Bloom/main/droids/bloom-core.md >> /path/to/your-project/AGENTS.md
```

If you also use OpenCode's `opencode.json` for project config, the AGENTS.md install is independent — bloom triggers work regardless of the JSON config. A `.bloom` file at the repo root auto-activates bloom. See [`harness-capabilities.md`](./harness-capabilities.md) for context size and stickiness.

---

## Cursor

**Recommended: install via the Cursor plugin marketplace** (after listing lands):

```
/add-plugin bloom
```

Or search for "bloom" in the Cursor plugin marketplace.

**Manual install — newer Cursor (`.cursor/rules/*.mdc`):**

```bash
mkdir -p /path/to/your-project/.cursor/rules
cp droids/bloom-core.md /path/to/your-project/.cursor/rules/bloom.mdc
```

**Manual install (recommended):** copy [`.cursor/rules/bloom.mdc`](../.cursor/rules/bloom.mdc) into your project’s `.cursor/rules/`, or use bloom-core in repo-root [`AGENTS.md`](../AGENTS.md) (generated from [`droids/bloom-core.md`](../droids/bloom-core.md)). For interactive UI patterns, open or vendor [`droids/bloom-patterns.md`](../droids/bloom-patterns.md) when building triage boards, sandboxes, or slide decks. See [`harness-capabilities.md`](./harness-capabilities.md) for what Cursor loads into context.

**Legacy Cursor (`.cursorrules` at the repo root):** paste this snippet into `.cursorrules`:

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

**Recommended: install via the GitHub Copilot CLI plugin marketplace.**

```
copilot plugin marketplace add SunnyDevendranadh/Bloom
copilot plugin install bloom@bloom
```

**Manual install** (works today): the GitHub Copilot CLI reads `AGENTS.md` at the repo root. Copy `droids/bloom.md` there:

```bash
cp droids/bloom.md /path/to/your-project/AGENTS.md
```

If `AGENTS.md` already exists, paste the universal AGENTS.md snippet from the top of this doc.

Trigger bloom in the CLI by typing `/bloom` or saying "bloom on" / "let it bloom" in your first prompt. Bloom stays sticky for the rest of the CLI session and deactivates on `/bloom-off` or "bloom off".

A `.bloom` file at the repo root auto-activates bloom for any new Copilot CLI session in that workspace.

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
| Cursor | `.cursor/rules/bloom.mdc` (recommended; `.cursorrules` legacy) |
| GitHub Copilot CLI | `AGENTS.md` |
| GitHub Copilot (VS Code) | `.github/copilot-instructions.md` |
| Windsurf | `.windsurfrules` |
| Aider | `AGENTS.md` (or `.aider.conf.yml`) |
| Continue | `.continue/rules.md` |

The `AGENTS.md` row covers Codex CLI, Codex App, OpenCode, GitHub Copilot CLI, and Aider in one file. Drop bloom there once and five harnesses pick it up.

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
