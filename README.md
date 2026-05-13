# HTML.md

**The Unreasonable Effectiveness of HTML — as an open skill for every AI coding agent.**

A production-grade, self-contained skill that teaches any AI coding agent (Claude Code, Codex, Cursor, Windsurf, Aider, Pi, Copilot, Continue, and others) to produce rich, interactive `.html` files instead of flat markdown — because diffs, diagrams, status reports, and design comparisons are **spatial** information that loses meaning when flattened into prose.

Activate it once per session and every substantial artifact — reports, reviews, plans, docs, comparisons — becomes a self-contained `.html` file until you turn it off. Reserved files like `README.md`, `CLAUDE.md`, and `AGENTS.md` stay valid markdown and gain a richer `.html` companion next to them.

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

## Quick start

### Option 1: Claude Code (sticky session skill)

Copy the `.claude/skills/html-effectiveness/` directory into your project (or `~/.claude/skills/` for global):

```bash
# Project skill (applies to this project only)
cp -r .claude/skills/html-effectiveness/ /path/to/your-project/.claude/skills/

# Global skill (applies to all your Claude Code sessions)
cp -r .claude/skills/html-effectiveness/ ~/.claude/skills/
```

Then in any session, activate with `/html-effectiveness` (or `/html`, `/html-on`) — the mode stays sticky until you run `/html-off`.

### Option 2: Factory Droid

Copy `droids/html-effectiveness.md` into your Factory droids directory:

```bash
# Personal droid (applies to all your projects)
cp droids/html-effectiveness.md ~/.factory/droids/

# Project droid (applies to one project)
cp droids/html-effectiveness.md .factory/droids/
```

Then invoke it in your project.

### Option 3: Direct system prompt

Copy the contents of [`droids/html-effectiveness.md`](droids/html-effectiveness.md) into your system prompt, custom instructions, or `.cursorrules` / `.windsurfrules` / `AGENTS.md` file.

### Option 4: Agent-specific setup

See [`docs/harness-setup.md`](docs/harness-setup.md) for per-harness configuration (Claude Code, Codex, Cursor, Copilot, Aider, etc.).

---

## Session Mode

Once activated, the skill is **sticky for the rest of the session**. You don't re-invoke it per turn — every substantial artifact comes back as an `.html` file until you deactivate.

**Activate (any of these)**

| Slash | Phrase | File marker |
|---|---|---|
| `/html-effectiveness` | "html mode on" | `.html-mode` file at repo root |
| `/html` | "use html mode" | (auto-enables at session start) |
| `/html-on` | "respond in html" | |
| `/html-mode` | "enable html effectiveness" | |

**Deactivate (any of these)**

| Slash | Phrase |
|---|---|
| `/html-off` | "html mode off" |
| `/no-html` | "stop html mode" |
| `/html-mode-off` | "exit html mode" |

**Where artifacts land**

- Free-standing artifacts (status reports, reviews, plans) → `./artifacts/<date>-<slug>.html`
- Companion to a reserved `.md` (e.g., `README.md`) → sibling `.html` next to it (`README.html`)
- The `.md` stays canonical so harnesses and GitHub keep working

**What gets produced as HTML**

Reports, reviews, comparisons, documentation, plans, explainers, diagrams, slide decks, postmortems, triage boards, flag/prompt editors — anything you'd otherwise dump as a wall of markdown.

**What stays plain text**

One-line answers, tool status updates, errors, short clarifying questions, commit messages, shell output. The mode adds richness where it helps and stays out of the way where it doesn't.

---

## What's included

```
HTML.md/
├── README.md                                    # This file
├── LICENSE                                      # MIT
├── .claude/
│   └── skills/
│       └── html-effectiveness/
│           └── SKILL.md                         # Claude Code session skill
├── droids/
│   └── html-effectiveness.md                    # The canonical skill (Factory droid + universal)
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
