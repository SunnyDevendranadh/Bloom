# Harness Setup Guide

How to install the HTML Effectiveness skill for every major AI coding agent.

The skill ships with **Session Mode**: once activated, it stays sticky until the session ends or the user explicitly deactivates. Each harness section below shows the install path plus the activation/deactivation triggers that work in that environment.

---

## Universal triggers

Once installed, any harness should recognize these in a user message:

| Action | Slash | Phrase |
|---|---|---|
| Activate | `/html-effectiveness`, `/html`, `/html-on`, `/html-mode` | "html mode on", "use html mode", "respond in html", "enable html effectiveness" |
| Deactivate | `/html-off`, `/html-effectiveness-off`, `/no-html`, `/html-mode-off` | "html mode off", "stop html mode", "exit html mode" |
| Auto-activate at session start | — | Place an `.html-mode` file (any contents) at the repo root |

The slashes are recognized by harnesses that natively support slash commands (Claude Code, Continue, etc.). The phrases are interpreted by the skill instructions themselves and work in every harness.

---

## Factory (Droid)

```bash
# Personal — applies to all your projects
cp droids/html-effectiveness.md ~/.factory/droids/

# Project — applies to one project only
cp droids/html-effectiveness.md .factory/droids/
```

Then invoke the `html-effectiveness` droid in your session.

---

## Claude Code

**Recommended: install as a sticky session skill.**

Copy the `.claude/skills/html-effectiveness/` directory into your project (or `~/.claude/skills/` for global use):

```bash
# Project skill (this repo only)
cp -r .claude/skills/html-effectiveness/ /path/to/your-project/.claude/skills/

# Global skill (all your Claude Code sessions)
cp -r .claude/skills/html-effectiveness/ ~/.claude/skills/
```

Then in any session:

```
/html-effectiveness
```

The mode stays sticky for the rest of the session. Substantial artifacts (reports, reviews, plans, docs) come back as `.html` files under `./artifacts/`. Reserved files like `README.md` / `CLAUDE.md` / `AGENTS.md` stay valid markdown and gain a companion `.html` next to them. Deactivate with `/html-off`.

**Alternative: add to your `CLAUDE.md`** project file or `~/.claude/CLAUDE.md` global file:

```markdown
## HTML Output Preference (Session Mode)

This project uses the HTML Effectiveness skill in Session Mode.

Activation triggers (case-insensitive, anywhere in a user message):
- Slash: /html-effectiveness, /html, /html-on, /html-mode
- Phrases: "html mode on", "use html mode", "respond in html"
- File marker: presence of `.html-mode` at repo root auto-activates the mode at session start

Once activated, the mode stays sticky for the rest of the session until /html-off (or "html mode off") fires.

When active, produce a self-contained .html file for any substantial artifact (reports, reviews, plans, docs, comparisons, diagrams, postmortems, editor UI). Write free-standing artifacts under ./artifacts/ with kebab-case filenames. For reserved files (README.md, CLAUDE.md, AGENTS.md, CONTRIBUTING.md, CHANGELOG.md), keep the canonical .md and write a companion .html alongside.

Rules for every .html produced:
- Single file, all CSS/JS inline, no external dependencies
- CSS custom properties (clay/olive/oat/slate palette)
- Semantic HTML, accessible, responsive at 640px/960px/1200px
- Export/copy buttons for editor-type artifacts
- No alert/prompt/confirm, no eval, no innerHTML with user data, no external requests

Plain text (not HTML) for: one-line answers, tool status, errors, commit messages, shell output.

Categories: exploration cards, annotated PRs, design systems, animation sandboxes, flowcharts, slide decks, feature explainers, status reports, incident timelines, triage boards, flag editors, prompt tuners.
```

---

## OpenAI Codex

Add to your `codex.md` or instructions:

```markdown
This project uses the HTML Effectiveness skill in Session Mode.

Session Mode activates when the user message contains any of:
- Slash: /html-effectiveness, /html, /html-on
- Phrases: "html mode on", "use html mode", "respond in html"
Deactivates with /html-off or "html mode off".

While active, output a self-contained .html file for substantial artifacts (reports, reviews, plans, docs, comparisons, diagrams, postmortems, editor UI). Write free-standing artifacts to ./artifacts/<date>-<slug>.html. For reserved files (README.md, CLAUDE.md, AGENTS.md), keep the canonical .md and write a companion .html alongside. Keep one-liners, tool status, and errors as plain text.

Requirements for every .html produced:
- All CSS and JS must be inline in one .html file
- Use design tokens: clay=#D97757, olive=#788C5D, oat=#E3DACC, slate=#141413, ivory=#FAF9F5
- No external CDN, font, or script references
- Use semantic HTML5 elements
- Include a copy/export button for editor artifacts
- Responsive at 640px, 960px, 1200px
```

---

## Cursor

Add to `.cursorrules` in your project root:

```
HTML Effectiveness skill in Session Mode.

Activate when a user message contains /html-effectiveness, /html, /html-on, /html-mode, or phrases like "html mode on", "use html mode", "respond in html". Stay sticky for the rest of the session. Deactivate on /html-off, /no-html, or "html mode off". A `.html-mode` file at the repo root auto-activates at session start.

While active, generate a self-contained .html file for any substantial artifact (reports, reviews, plans, docs, comparisons, diagrams, postmortems, editor UI). Free-standing artifacts go under ./artifacts/<date>-<slug>.html. For reserved files (README.md, CLAUDE.md, AGENTS.md, CONTRIBUTING.md, CHANGELOG.md), keep the canonical .md and write a companion .html alongside. Keep short replies, tool status, errors, and commit messages as plain text.

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

## Windsurf

Add to `.windsurfrules` in your project root:

```
HTML Effectiveness skill in Session Mode.

Activate on /html-effectiveness, /html, /html-on, /html-mode, or phrases "html mode on", "use html mode", "respond in html". Stays sticky for the rest of the session. Deactivate on /html-off, /no-html, or "html mode off".

When active, produce a single .html file for substantial artifacts (reports, reviews, plans, docs, comparisons, postmortems, editor UI). Free-standing artifacts go under ./artifacts/<date>-<slug>.html. Reserved files (README.md, CLAUDE.md, AGENTS.md) stay as .md and get a companion .html sibling. Short answers, tool status, errors stay plain text.

For every .html produced:
- Everything inline: CSS, JS, SVG all in one file
- Palette: clay=#D97757, olive=#788C5D, oat=#E3DACC, slate=#141413, ivory=#FAF9F5
- Semantic HTML5, accessible, responsive at 640px / 960px
- addEventListener only, no inline event handlers
- Include "Copy as markdown" or "Copy as JSON" for editor artifacts
- Works offline from file://
```

---

## GitHub Copilot / VS Code

Add to `.github/copilot-instructions.md`:

```markdown
## HTML Generation Preference (Session Mode)

This project uses the HTML Effectiveness skill in Session Mode.

Activate on /html-effectiveness, /html, /html-on, or phrases "html mode on", "use html mode", "respond in html". Stays sticky for the rest of the session until /html-off or "html mode off". An `.html-mode` file at the repo root auto-activates.

When active, generate a single self-contained .html file for any substantial artifact (visual comparisons, code reviews, status reports, architecture diagrams, plans, docs, postmortems, interactive tools). Free-standing artifacts go under ./artifacts/<date>-<slug>.html. For reserved files (README.md, CLAUDE.md, AGENTS.md), keep the canonical .md and write a companion .html alongside. Short replies, tool status, errors, and commit messages stay plain text.

Rules for every .html produced:
- One file, inline CSS + JS, no external dependencies
- Use CSS custom properties for all colors (--clay, --olive, --oat, --slate, etc.)
- Responsive, accessible, semantic HTML5
- Export buttons for editor-type artifacts
- No eval, no innerHTML with untrusted data, no external requests
```

---

## Aider

Add to `.aider.conf.yml` or pass as an initial `--message`:

```yaml
# HTML Effectiveness skill in Session Mode.
# Activate on /html-effectiveness, /html, /html-on, or "html mode on", "use html mode", "respond in html".
# Stays sticky for the rest of the session. Deactivate on /html-off or "html mode off".
# An .html-mode file at the repo root auto-activates.
#
# While active, produce single self-contained .html files for substantial artifacts.
# Free-standing artifacts go under ./artifacts/<date>-<slug>.html.
# Reserved files (README.md, CLAUDE.md, AGENTS.md) stay as .md; write a companion .html alongside.
# Short answers, tool status, errors stay plain text.
#
# For every .html: use the clay/olive/oat/slate palette via CSS custom properties,
# all CSS/JS inline, no external dependencies, works from file://.
```

Or pass as a message: `--message "Follow the HTML Effectiveness skill in Session Mode. Stay sticky once activated. Produce companion .html for reserved .md files."`

---

## Continue (VS Code extension)

Add to `.continue/rules.md`:

```markdown
HTML Effectiveness skill in Session Mode (from the HTML.md repository).

Activate on /html-effectiveness, /html, /html-on, or phrases "html mode on", "use html mode", "respond in html". Stays sticky for the rest of the session until /html-off or "html mode off". An `.html-mode` file at the repo root auto-activates.

While active, produce a single self-contained .html file for substantial artifacts (visual comparisons, code reviews, architecture diagrams, plans, docs, postmortems, editor UI). Free-standing artifacts go under ./artifacts/<date>-<slug>.html. Reserved files (README.md, CLAUDE.md, AGENTS.md) stay as .md and get a companion .html sibling. Short replies, tool status, errors stay plain text.

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
HTML Effectiveness skill in Session Mode.

Activate on /html-effectiveness, /html, /html-on, or "html mode on", "use html mode", "respond in html". Stays sticky for the rest of the session. Deactivate on /html-off or "html mode off". An `.html-mode` file at the repo root auto-activates at session start.

While active, generate a single self-contained .html file for substantial artifacts (visual comparisons, code reviews, design docs, plans, postmortems, interactive editors). Free-standing artifacts go under ./artifacts/<date>-<slug>.html. Reserved files (README.md, CLAUDE.md, AGENTS.md) stay as .md and get a companion .html sibling. Short replies, tool status, errors stay plain text.

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
You have access to an HTML Effectiveness skill that supports Session Mode.

Session Mode activates when the user message contains any of /html-effectiveness, /html, /html-on, /html-mode, or phrases "html mode on", "use html mode", "respond in html", "enable html effectiveness". Once active, it stays sticky for the rest of the session until /html-off, /no-html, or "html mode off" fires. A `.html-mode` file at the workspace root auto-activates at session start.

When Session Mode is active, generate a single self-contained .html file for any substantial artifact (reports, reviews, plans, docs, comparisons, diagrams, postmortems, editor UI). Free-standing artifacts go under ./artifacts/<date>-<slug>.html. For reserved files (README.md, CLAUDE.md, AGENTS.md, CONTRIBUTING.md, CHANGELOG.md), keep the canonical .md as the contract and write a companion .html alongside. One-line answers, tool status, errors, commit messages, and shell output stay plain text.

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

## Verification

After installation, test the activation lifecycle:

**1. Verify activation.** Send:

> `/html-effectiveness`

The agent should reply with a one-line plain-text confirmation naming the mode and how to deactivate. No HTML splash screen.

**2. Verify substantial artifact produces a file.** Send:

> "Show me three approaches to implement debounced search in our React codebase, with tradeoffs for each."

Or:

> "Create a status report for this week's sprint with PRs merged, carryover items, and a velocity chart."

The agent should write an `.html` file under `./artifacts/` (or alongside the relevant source) and reply with a single line pointing at the file path. Open the file — it should render correctly in a browser with no console errors and no network requests.

**3. Verify companion-file rule.** Send:

> "Update CLAUDE.md to mention our new test runner."

The agent should update `CLAUDE.md` (canonical markdown) and also write a richer `CLAUDE.html` companion next to it.

**4. Verify short replies stay plain text.** Send:

> "What port does the dev server run on?"

The agent should answer in one or two lines of plain text. No HTML artifact for trivial answers.

**5. Verify deactivation.** Send:

> `/html-off`

The agent should confirm in plain text and return to default markdown behavior on the next turn.
