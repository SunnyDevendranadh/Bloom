# Bloom

**The Unreasonable Effectiveness of HTML — as an open skill for every AI coding agent.**

**Bloom** is a per-session sticky skill that makes flat markdown bloom into rich, self-contained `.html` artifacts. Drop it into any AI coding agent and reports, reviews, plans, design docs, and interactive editors come back as single `.html` files you can open, click around, and export from — because diffs, diagrams, status reports, and design comparisons are **spatial** information that loses meaning when flattened into prose.

Supported harnesses:

- **Claude Code** — `.claude/skills/bloom/` (sticky session skill)
- **Codex CLI** (OpenAI) — `AGENTS.md`
- **Codex App** (OpenAI web/desktop) — `AGENTS.md` on the linked GitHub repo
- **Factory Droid** — `droids/bloom.md`
- **Gemini CLI** (Google) — `GEMINI.md`
- **OpenCode** (sst) — `AGENTS.md`
- **Cursor** — `.cursorrules` or `.cursor/rules/bloom.mdc`
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

**Manual install** (works today): copy `droids/bloom.md` to your repo's `AGENTS.md` or `~/.codex/AGENTS.md`.

### Codex App

Bloom is queued for submission to the [official Codex plugin marketplace](https://github.com/openai/plugins).

- In the Codex app, click on **Plugins** in the sidebar.
- You should see `Bloom` in the Coding section.
- Click the `+` next to Bloom and follow the prompts.

**Manual install** (works today): commit `AGENTS.md` (copied from `droids/bloom.md`) to the GitHub branch you connect to Codex.

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

**Manual install** (works today): copy `droids/bloom.md` to `GEMINI.md` at the repo root or `~/.gemini/GEMINI.md` global.

### OpenCode

OpenCode uses its own plugin install; install Bloom separately even if you already use it in another harness.

- Tell OpenCode:

```
Fetch and follow instructions from https://raw.githubusercontent.com/SunnyDevendranadh/Bloom/main/plugins/bloom/INSTALL.opencode.md
```

**Manual install** (works today): copy `droids/bloom.md` to your repo's `AGENTS.md`.

### Cursor

- In Cursor Agent chat, install from the marketplace:

```
/add-plugin bloom
```

- Or search for "bloom" in the plugin marketplace.

**Manual install** (works today): copy `droids/bloom.md` to `.cursor/rules/bloom.mdc` or paste the bloom snippet into `.cursorrules`.

### GitHub Copilot CLI

- Register the marketplace:

```
copilot plugin marketplace add SunnyDevendranadh/Bloom
```

- Install the plugin:

```
copilot plugin install bloom@bloom
```

**Manual install** (works today): copy `droids/bloom.md` to your repo's `AGENTS.md`.

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
├── .claude-plugin/
│   └── marketplace.json                         # Bloom marketplace listing
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
│   └── bloom.md                                 # The canonical skill (Factory droid + universal)
├── docs/
│   ├── harness-setup.md                         # Per-agent setup guides
│   ├── categories.md                            # The 9 document categories explained
│   ├── design-system.md                         # Full token reference
│   ├── construction-rules.md                    # The 12 rules for producing HTML
│   └── security.md                              # Security hardening guide
├── templates/
│   ├── exploration-code-approaches.html
│   ├── annotated-pr-review.html
│   ├── design-system-reference.html
│   ├── animation-sandbox.html
│   ├── annotated-flowchart.html
│   ├── slide-deck.html
│   ├── feature-explainer.html
│   ├── status-report.html
│   ├── incident-timeline.html
│   ├── triage-board.html
│   ├── feature-flag-editor.html
│   └── prompt-tuner.html
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

---

## Design system

All templates use CSS custom properties from the same warm palette:

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

## Construction rules

See [`docs/construction-rules.md`](docs/construction-rules.md) for the full 12-rule checklist. Summary:

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
3. Add or improve templates, docs, or the skill itself
4. Make sure templates pass the construction rules checklist
5. Open a PR

---

## License

MIT — see [`LICENSE`](LICENSE).

---

## Acknowledgments

Patterns and philosophy from [The Unreasonable Effectiveness of HTML](https://thariqs.github.io/html-effectiveness/) by the original author.
