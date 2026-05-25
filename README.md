# Bloom

**The Unreasonable Effectiveness of HTML — as an open skill for every AI coding agent.**

**Bloom** is a per-session sticky skill that makes flat markdown bloom into rich, self-contained `.html` artifacts. Drop it into any AI coding agent and reports, reviews, plans, design docs, and interactive editors come back as single `.html` files you can open, click around, and export from — because diffs, diagrams, status reports, and design comparisons are **spatial** information that loses meaning when flattened into prose.

## Who is this for?

Bloom works best when you want **agent-produced deliverables** you can open in a browser: PR reviews, status reports, migration plans, architecture decision records, incident timelines, and similar artifacts that benefit from layout, chips, tables, and export buttons.

It is **not** aimed at everyday coding Q&A, quick one-off fixes, or teams that only want markdown inside GitHub PR comment threads.

**Interactive vs static:** The skill teaches patterns for sandboxes, triage boards, and slide decks. This repo ships starter templates under [`templates/`](templates/) — mostly static report layouts plus interactive references for triage and motion. See [Templates in this repo](#templates-in-this-repo) below. For deep interactive UI, agents should also read [`droids/bloom-patterns.md`](droids/bloom-patterns.md).

---

Supported harnesses:

Capability details (slash commands, stickiness, what each harness loads): [`docs/harness-capabilities.md`](docs/harness-capabilities.md).

- **Claude Code** — `.claude/skills/bloom/` (sticky session skill)
- **Codex CLI** (OpenAI) — `AGENTS.md`
- **Codex App** (OpenAI web/desktop) — `AGENTS.md` on the linked GitHub repo
- **Factory Droid** — `droids/bloom.md`
- **Gemini CLI** (Google) — `GEMINI.md`
- **OpenCode** (sst) — `AGENTS.md`
- **Cursor** — [`.cursor/rules/bloom.mdc`](.cursor/rules/bloom.mdc) (recommended; legacy [`.cursorrules`](https://docs.cursor.com/context/rules) also works)
- **GitHub Copilot CLI** — `AGENTS.md`

Plus Windsurf, Aider, GitHub Copilot for VS Code, Continue, Replit Agent, Pi, and any other system-prompt-aware agent.

Type `/bloom` once and every substantial artifact for the rest of the session becomes a self-contained `.html` file. Reserved files like `README.md`, `CLAUDE.md`, and `AGENTS.md` stay valid markdown and gain a richer `.html` companion next to them. Type `/bloom-off` to go back to plain markdown.

---

## Why

| Flat markdown | Self-contained HTML |
|---|---|
| Three approaches as three scroll-overs | Side-by-side cards with tradeoff tables |
| A diff you scroll through | Annotated diff with severity chips and jump links |
| "Imagine a four-column layout" | Live rendered variants you can actually see |
| "Think about the easing curve" | Animation sandbox with a slider |
| A checklist in a PR description | A triage board you can drag and export |
| A paragraph about token values | Living design system with swatches you copy from |

This skill captures the patterns from [The Unreasonable Effectiveness of HTML](https://thariqs.github.io/html-effectiveness/) and makes them reproducible across every agent harness.

---

## Installation

Installation differs by harness. If you use more than one, install Bloom separately for each one. Each install is sticky once activated in a session and stays on until you turn it off or the session ends.

### Claude Code

Bloom is shipped as a Claude Code plugin via the **Bloom marketplace** and is queued for submission to Anthropic's official plugin marketplace.

**Anthropic Official Marketplace** (after submission lands)

- Install the plugin from Anthropic's official marketplace:

```
/plugin install bloom@claude-plugins-official
```

**Bloom Marketplace**

The Bloom marketplace provides Bloom and any future related plugins for Claude Code.

- Register the marketplace:

```
/plugin marketplace add SunnyDevendranadh/Bloom
```

- Install the plugin from this marketplace:

```
/plugin install bloom@bloom
```

Activate per session with `/bloom`, `/bloom-on`, or by saying "bloom on" / "let it bloom" in any message. Deactivate with `/bloom-off`.

### Codex CLI

Bloom is queued for submission to the [official Codex plugin marketplace](https://github.com/openai/plugins).

- Open the plugin search interface:

```
/plugins
```

- Search for Bloom:

```
bloom
```

- Select `Install Plugin`.

**Manual install** (works today): use repo-root [`AGENTS.md`](AGENTS.md), or copy it to `~/.codex/AGENTS.md` for global use.

### Codex App

Bloom is queued for submission to the [official Codex plugin marketplace](https://github.com/openai/plugins).

- In the Codex app, click on **Plugins** in the sidebar.
- You should see `Bloom` in the Coding section.
- Click the `+` next to Bloom and follow the prompts.

**Manual install** (works today): commit repo-root [`AGENTS.md`](AGENTS.md) to the GitHub branch you connect to Codex.

### Factory Droid

- Register the marketplace:

```
droid plugin marketplace add https://github.com/SunnyDevendranadh/Bloom
```

- Install the plugin:

```
droid plugin install bloom@bloom
```

**Manual install** (works today): `cp droids/bloom.md ~/.factory/droids/` (personal) or `.factory/droids/` (project).

### Gemini CLI

- Install the extension:

```
gemini extensions install https://github.com/SunnyDevendranadh/Bloom
```

- Update later:

```
gemini extensions update bloom
```

**Manual install** (works today): use repo-root [`GEMINI.md`](GEMINI.md) (points at `AGENTS.md`), or copy [`AGENTS.md`](AGENTS.md) to `~/.gemini/GEMINI.md` global.

### OpenCode

OpenCode uses its own plugin install; install Bloom separately even if you already use it in another harness.

- Tell OpenCode:

```
Fetch and follow instructions from https://raw.githubusercontent.com/SunnyDevendranadh/Bloom/main/plugins/bloom/INSTALL.opencode.md
```

**Manual install** (works today): use repo-root [`AGENTS.md`](AGENTS.md).

### Cursor

- In Cursor Agent chat, install from the marketplace:

```
/add-plugin bloom
```

- Or search for "bloom" in the plugin marketplace.

**Manual install** (works today): copy [`.cursor/rules/bloom.mdc`](.cursor/rules/bloom.mdc) into your project’s `.cursor/rules/` (summary rule; full skill in [`AGENTS.md`](AGENTS.md)). **Legacy:** paste the same content into a repo-root `.cursorrules` file if your Cursor setup does not use `.mdc` rules yet.

### GitHub Copilot CLI

- Register the marketplace:

```
copilot plugin marketplace add SunnyDevendranadh/Bloom
```

- Install the plugin:

```
copilot plugin install bloom@bloom
```

**Manual install** (works today): use repo-root [`AGENTS.md`](AGENTS.md).

### Other harnesses

See [`docs/harness-setup.md`](docs/harness-setup.md) for Windsurf, Aider, GitHub Copilot for VS Code, Continue, Replit Agent, Pi, and any system-prompt-aware agent. The same trigger commands (`/bloom`, "bloom on", `/bloom-off`) work everywhere once the skill text is loaded into the harness.

---

## Bloom Mode

Once activated, bloom is **sticky for the rest of the session**. You don't re-invoke it per turn — every substantial artifact comes back as an `.html` file until you deactivate.

**Activate (any of these)**

| Slash | Phrase | File marker |
|---|---|---|
| `/bloom` | "bloom on" | `.bloom` file at repo root |
| `/bloom-on` | "let it bloom" | (auto-enables at session start) |
| `/bloom-mode` | "activate bloom" | |

**Deactivate (any of these)**

| Slash | Phrase |
|---|---|
| `/bloom-off` | "bloom off" |
| `/no-bloom` | "stop bloom" |
| `/bloom-mode-off` | "exit bloom" |

**Where artifacts land**

- Free-standing artifacts (status reports, reviews, plans) → `./bloom/<date>-<slug>.html`
- Companion to a reserved `.md` (e.g., `README.md`) → sibling `.html` next to it (`README.html`)
- The `.md` stays canonical so harnesses and GitHub keep working

### Keeping your repo clean

Agent artifacts default to `./bloom/` and an optional `.bloom` session marker. Add the lines in [`.gitignore`](.gitignore) if you do not want those committed. Commit templates and hand-authored HTML; ignore dated agent drafts unless you want them in history.

**What gets produced as HTML**

Reports, reviews, comparisons, documentation, plans, explainers, diagrams, slide decks, postmortems, triage boards, flag/prompt editors — anything you'd otherwise dump as a wall of markdown.

**What stays plain text**

One-line answers, tool status updates, errors, short clarifying questions, commit messages, shell output. Bloom adds richness where it helps and stays out of the way where it doesn't.

---

## What's included

```
Bloom/
├── README.md                                    # This file
├── LICENSE                                      # MIT
├── AGENTS.md                                    # Bloom skill (Codex, OpenCode, Copilot CLI, Aider)
├── GEMINI.md                                    # Gemini CLI pointer to AGENTS.md
├── .claude-plugin/
│   └── marketplace.json                         # Bloom marketplace listing
├── .cursor/
│   └── rules/
│       └── bloom.mdc                            # Cursor rule (HTML globs → AGENTS.md)
├── plugins/
│   └── bloom/
│       ├── .claude-plugin/
│       │   └── plugin.json                      # Bloom plugin manifest
│       ├── skills/
│       │   └── bloom/
│       │       └── SKILL.md                     # Plugin-packaged skill
│       └── INSTALL.opencode.md                  # OpenCode install instructions
├── .claude/
│   └── skills/
│       └── bloom/
│           └── SKILL.md                         # Claude Code skill (manual install / self-use)
├── droids/
│   └── bloom.md                                 # Canonical skill source (Factory droid)
├── docs/
│   ├── harness-setup.md                         # Per-agent setup guides
│   ├── categories.md                            # The 9 document categories explained
│   ├── design-system.md                         # Full token reference (v1)
│   ├── design-system-v2.md                      # Dark mode, motion tokens, Tabs, Modal
│   ├── construction-rules.md                    # The 12 rules for producing HTML (v1)
│   ├── construction-rules-v2.md                 # Rule 9 revision for templates
│   └── security.md                              # Security hardening guide
├── bloom-validator/                             # Zero-dep CLI — construction + security rules
│   ├── README.md
│   ├── package.json
│   ├── src/
│   │   ├── index.ts                             # CLI entry (bloom-validate)
│   │   ├── parser.ts
│   │   ├── reporter.ts
│   │   └── rules/                               # One file per rule
│   └── tests/                                   # node:test suite + fixtures
├── templates/
│   ├── accessibility-report.html
│   ├── annotated-pr-review.html
│   ├── api-documentation.html
│   ├── architecture-decision.html
│   ├── dependency-audit.html
│   ├── design-review.html
│   ├── exploration-code-approaches.html
│   ├── incident-timeline.html
│   ├── migration-plan.html
│   ├── monthly-review.html
│   ├── onboarding-guide.html
│   ├── sprint-retro.html
│   ├── status-report-v2.html                    # Worked v2 example (data-template slots)
│   ├── status-report.html
│   └── weekly-digest.html
└── examples/
    ├── pr-review-example.html
    ├── incident-report-example.html
    └── design-system-example.html
```

---

## The 9 document categories

| # | Category | What it replaces | Key pattern |
|---|---|---|---|
| 1 | **Exploration & Planning** | Multiple prose descriptions | Side-by-side cards, tradeoff tables, recommendations |
| 2 | **Code Review** | Terminal diff dumps | Annotated diffs with risk chips, severity tags, jump links |
| 3 | **Design** | "Imagine a palette" | Living swatches, type scales, component variant matrices |
| 4 | **Prototyping** | "Think about how this animates" | Easing sliders, clickable flows, CSS copy-paste |
| 5 | **Diagrams & Illustrations** | ASCII art / Mermaid links | Inline SVG with download buttons, interactive flowcharts |
| 6 | **Slide Decks** | "Let me describe the slide" | Arrow-key navigable `<section>` slides |
| 7 | **Research & Learning** | Walls of explanation text | Collapsible steps, tabbed configs, interactive demos, glossary sidebars |
| 8 | **Reports** | Status emails nobody reads | Timeline cards, stat bands, inline bar charts |
| 9 | **Custom Editors** | "Prioritize these in a doc" | Drag boards with markdown export, flag toggles with copy-diff, prompt editors with live preview |

**What ships in this repo today:** The templates under [`templates/`](templates/) are mostly **static report layouts** (categories 1–3, 8) — exploration cards, annotated PR review, design review, status reports, retros, audits, and similar. Agents can still *generate* slide decks, animation sandboxes, and drag-and-drop editors (categories 4–7, 9) from the skill; those patterns are documented in [`docs/categories.md`](docs/categories.md) and [`AGENTS.md`](AGENTS.md), not bundled as starter HTML yet. [`templates/status-report-v2.html`](templates/status-report-v2.html) is the richest reference (dark mode, motion tokens, light interaction).

---

## Templates in this repo

Starter `.html` files under [`templates/`](templates/). Agents can copy structure and swap in real content; run [`bloom-validator`](bloom-validator/) on anything you edit.

| Template | Interactive | Best for |
|---|---|---|
| [`status-report-v2.html`](templates/status-report-v2.html) | Light | Sprint/status |
| [`annotated-pr-review.html`](templates/annotated-pr-review.html) | No | PR review |
| [`exploration-code-approaches.html`](templates/exploration-code-approaches.html) | No | Approach comparison |
| [`incident-timeline.html`](templates/incident-timeline.html) | No | Incidents |
| [`triage-board.html`](templates/triage-board.html) | Yes | Prioritization |
| [`animation-sandbox.html`](templates/animation-sandbox.html) | Yes | Motion/easing |
| Other report starters | No | [`status-report.html`](templates/status-report.html), [`sprint-retro.html`](templates/sprint-retro.html), [`weekly-digest.html`](templates/weekly-digest.html), [`monthly-review.html`](templates/monthly-review.html), [`migration-plan.html`](templates/migration-plan.html), [`onboarding-guide.html`](templates/onboarding-guide.html), [`architecture-decision.html`](templates/architecture-decision.html), [`api-documentation.html`](templates/api-documentation.html), [`design-review.html`](templates/design-review.html), [`dependency-audit.html`](templates/dependency-audit.html), [`accessibility-report.html`](templates/accessibility-report.html) |

Worked examples (not templates): [`examples/`](examples/).

---

## Design system

All templates use CSS custom properties from the same warm palette. See [`docs/design-system.md`](docs/design-system.md) for the full v1 reference and [`docs/design-system-v2.md`](docs/design-system-v2.md) for dark-mode tokens (via `prefers-color-scheme`), motion tokens (durations + easings), and the Tabs / Modal component patterns.

| Token | Value | Usage |
|---|---|---|
| `--ivory` | `#FAF9F5` | Page background |
| `--slate` | `#141413` | Headings, strong text |
| `--clay` | `#D97757` | Primary accent, CTAs, warnings |
| `--oat` | `#E3DACC` | Warm fills, hover states |
| `--olive` | `#788C5D` | Success, secondary accent |
| `--white` | `#FFFFFF` | Card backgrounds |
| `--gray-100` | `#F0EEE6` | Subtle fills, code blocks |
| `--gray-300` | `#D1CFC5` | Borders, dividers |
| `--gray-500` | `#87867F` | Captions, muted labels |
| `--gray-700` | `#3D3D3A` | Body text |

Typography tokens:

| Token | Stack |
|---|---|
| `--serif` | `ui-serif, Georgia, "Times New Roman", serif` |
| `--sans` | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| `--mono` | `ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace` |

---

## Security

All templates follow the security guidelines in [`docs/security.md`](docs/security.md):

- No external dependencies (CDN links, fonts, scripts)
- No `eval()`, `Function()`, or dynamic code execution
- No `innerHTML` with user-controlled content (use `textContent` or DOM APIs)
- No network requests from generated files
- Content Security Policy compatible
- No `data:` URIs for executable content
- All event handlers use `addEventListener`, not inline `on*` attributes

---

## Validation

[![bloom-validator](https://github.com/SunnyDevendranadh/Bloom/actions/workflows/validator.yml/badge.svg)](https://github.com/SunnyDevendranadh/Bloom/actions/workflows/validator.yml)

[`bloom-validator/`](bloom-validator/) is a zero-dependency TypeScript CLI that checks any `.html` file against Bloom's construction and security rules. It uses Node ≥ 22.6 native TypeScript type-stripping — no build step.

```bash
node bloom-validator/src/index.ts path/to/file.html
node bloom-validator/src/index.ts path/to/file.html --json
node bloom-validator/src/index.ts a.html b.html c.html
```

Exit codes: `0` clean, `1` errors found, `2` invalid usage. See [`bloom-validator/README.md`](bloom-validator/README.md) for the full rule table and JSON output shape.

**Contributors:** run the test suite and validate changed HTML before opening a PR:

```bash
cd bloom-validator && npm test
node src/index.ts ../templates/your-template.html
```

---

## Construction rules

See [`docs/construction-rules.md`](docs/construction-rules.md) for the full 12-rule checklist, and [`docs/construction-rules-v2.md`](docs/construction-rules-v2.md) for the Rule 9 revision that lets templates ship plausible default content with `data-template="<slot>"` markers instead of `[BRACKET]` placeholders. Summary:

1. **Single file** — All HTML, CSS, JS in one `.html` file
2. **CSS custom properties** — Use the palette tokens, never hard-code colors
3. **Semantic HTML** — `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<aside>`, `<details>`
4. **Inline JS only** — Minimal, no frameworks, no build step
5. **Responsive** — `max-width` wrappers, `clamp()` type, `@media` breakpoints
6. **Export mechanism** — "Copy as markdown/JSON/diff" button on every editor
7. **Print-friendly** — Key content readable without JS
8. **Accessible** — `aria-label`, `role`, heading hierarchy, focus states
9. **No placeholder content** — Every word specific and real
10. **Viewport meta** — Always include `<meta name="viewport">`
11. **Progressive enhancement** — Core content visible without JS
12. **No `alert()`/`prompt()`/`confirm()`** — Use inline UI

---

## Contributing

1. Fork this repo
2. Create a feature branch
3. Add or improve templates, docs, the skill, or validator rules
4. After editing [`droids/bloom-core.md`](droids/bloom-core.md), run `./scripts/sync-skill-files.sh` to regenerate [`AGENTS.md`](AGENTS.md) and [`GEMINI.md`](GEMINI.md)
5. **Validate changes** (Node ≥ 22.6):
   ```bash
   cd bloom-validator && npm test
   ```
   For new or edited templates/examples:
   ```bash
   cd bloom-validator
   node src/index.ts ../templates/your-file.html
   node src/index.ts ../examples/your-file.html
   ```
   CI runs the same checks on every push to `main` (see [`.github/workflows/validator.yml`](.github/workflows/validator.yml)).
6. Skim [`docs/construction-rules.md`](docs/construction-rules.md) and the [manual checklist](bloom-validator/README.md#manual-checklist-not-automated) for items the CLI does not cover yet (e.g. `file://` smoke test, progressive enhancement)
7. Open a PR

---

## License

MIT — see [`LICENSE`](LICENSE).

---

## Acknowledgments

Patterns and philosophy from [The Unreasonable Effectiveness of HTML](https://thariqs.github.io/html-effectiveness/) by the original author.
