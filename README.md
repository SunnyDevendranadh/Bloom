# Bloom

**The Unreasonable Effectiveness of HTML — as an open skill for every AI coding agent.**

**Bloom** is a per-session sticky skill that makes flat markdown bloom into rich, self-contained `.html` artifacts. Drop it into any AI coding agent and reports, reviews, plans, design docs, and interactive editors come back as single `.html` files you can open, click around, and export from — because diffs, diagrams, status reports, and design comparisons are **spatial** information that loses meaning when flattened into prose.

Supported harnesses (the skill is a single markdown file; copy it to whatever your agent reads):

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

## Bloom Plan — Decision-Transparent Planning

Bloom also ships a **planning skill** that adds Cursor-style Plan-Execute-Verify on top of Bloom's HTML output. Activate it with `/bloom-plan` or `/plan` in any supported harness.

**What it does:**

1. **Research** (read-only phase) — explores the codebase, gathers context, asks clarifying questions
2. **Plan** — writes a structured `.plan.md` and an interactive `.plan.html` companion to `.cursor/plans/`
3. **Approve** — pauses for your explicit approval before making any changes
4. **Execute** — implements the plan step-by-step after you approve
5. **Verify** — runs lint/test, confirms changes against the plan

**What makes it different from regular planning:**

- **Decision transparency** — every decision includes 3-4 alternatives with concrete examples, measurable benchmarks, and explicit "why not chosen" reasoning. No "trust me" choices.
- **Adaptive scale** — automatically adjusts depth: Greenfield (full-scope architecture decisions), Brownfield (execution-level implementation choices), or Phase Planning (task-level steps from a master plan).
- **Interactive HTML companion** — every plan gets a `.plan.html` with expandable decision cards, `localStorage`-persisted checklists, color-coded risk matrices, and a status timeline.

**Install for your harness** — bloom-plan is included in `AGENTS.md`, `GEMINI.md`, and the other harness files when you run `scripts/sync-skill-files.sh`. See the harness-specific files:

| Harness | File |
|---------|------|
| Claude Code | `.claude/skills/bloom-plan/SKILL.md` |
| Cursor | `.cursor/rules/bloom-plan.mdc` |
| Codex CLI / App / OpenCode / Copilot CLI / Aider | `AGENTS.md` (synced via `scripts/sync-skill-files.sh`) |
| Gemini CLI | `GEMINI.md` (synced via `scripts/sync-skill-files.sh`) |
| Factory Droid | Copy `droids/bloom-plan.md` to `.factory/droids/` |
| Continue | Copy `droids/bloom-plan.md` to `.continue/rules/bloom-plan.md` |
| GitHub Copilot VS Code | Append snippet to `.github/copilot-instructions.md` |
| Windsurf | Append snippet to `.windsurfrules` |

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

See [`examples/`](examples/) for worked artifacts:

- [`pr-review-example.html`](examples/pr-review-example.html) — annotated PR review with risk chips, per-file cards, and a next-steps checklist
- [`incident-report-example.html`](examples/incident-report-example.html) — SEV-2 postmortem with timeline, root cause, impact, and action items
- [`design-system-example.html`](examples/design-system-example.html) — living token reference with copyable color chips and a composed preview

---

## Installation

Installation differs by harness. If you use more than one, install Bloom separately for each one. Each install is sticky once activated in a session and stays on until you turn it off or the session ends.

**Every harness section below leads with the manual install — it works today, with no marketplace dependency.** A "Planned marketplace install" subsection is included where one is being prepared, clearly marked as not yet live.

### Claude Code

**Works today: manual install**

Copy the packaged skill into your project (or `~/.claude/skills/`):

```bash
cp -r .claude/skills/bloom /path/to/your-project/.claude/skills/bloom
```

Or drop the whole plugin into a project that uses `.claude-plugin/`:

```bash
cp -r plugins/bloom /path/to/your-project/.claude/plugins/bloom
```

Activate per session with `/bloom`, `/bloom-on`, or by saying "bloom on" / "let it bloom". Deactivate with `/bloom-off`.

**Planned marketplace install** — not yet live

Bloom is queued for submission to Anthropic's official plugin marketplace. Until then, prefer the manual install above. The local Bloom marketplace listing also exists (`.claude-plugin/marketplace.json`); once Anthropic's marketplace ingestion is live for community plugins, this will be a one-liner. Do not paste speculative `/plugin install` commands until that listing is verified.

### Codex CLI

**Works today: manual install**

```bash
cp droids/bloom.md /path/to/your-project/AGENTS.md
# or, globally:
cp droids/bloom.md ~/.codex/AGENTS.md
```

If you already have an `AGENTS.md`, append the contents of `droids/bloom.md` to it instead of replacing it.

**Planned marketplace install** — not yet live

Bloom is planned for submission to the [openai/plugins](https://github.com/openai/plugins) marketplace. Until that listing exists, use the manual install above.

### Codex App

**Works today: manual install**

Commit `AGENTS.md` (copied from `droids/bloom.md`) to the GitHub branch you connect to the Codex app:

```bash
cp droids/bloom.md AGENTS.md
git add AGENTS.md && git commit -m "Add Bloom skill" && git push
```

**Planned marketplace install** — not yet live

Once Bloom is listed in the Codex app's plugin sidebar, install will be a single click. Until then, use the manual install above.

### Factory Droid

**Works today: manual install**

```bash
# Project-scoped:
mkdir -p .factory/droids && cp droids/bloom.md .factory/droids/
# Personal:
mkdir -p ~/.factory/droids && cp droids/bloom.md ~/.factory/droids/
```

**Planned marketplace install** — not yet live

Once Bloom is published to a Factory plugin marketplace, register and install will be a two-liner. Not live yet.

### Gemini CLI

**Works today: manual install**

```bash
cp droids/bloom.md GEMINI.md
# or globally:
cp droids/bloom.md ~/.gemini/GEMINI.md
```

**Planned marketplace install** — not yet live

`gemini extensions install <repo>` may work for some Gemini CLI builds, but the install path has not been validated against the current Gemini CLI release. Until verified, use the manual install above.

### OpenCode

**Works today: manual install**

```bash
cp droids/bloom.md /path/to/your-project/AGENTS.md
```

Optional helper: ask OpenCode itself to follow [`plugins/bloom/INSTALL.opencode.md`](plugins/bloom/INSTALL.opencode.md).

**Planned marketplace install** — not yet live

OpenCode's plugin marketplace ingestion is evolving; once a verified install exists, it will replace this manual step.

### Cursor

**Works today: manual install**

```bash
mkdir -p .cursor/rules && cp droids/bloom.md .cursor/rules/bloom.mdc
# or paste the contents of droids/bloom.md into .cursorrules
```

**Planned marketplace install** — not yet live

If/when Cursor exposes a `/add-plugin bloom` command, it will be added here. Not live yet.

### GitHub Copilot CLI

**Works today: manual install**

```bash
cp droids/bloom.md /path/to/your-project/AGENTS.md
```

**Planned marketplace install** — not yet live

Copilot's plugin marketplace install path has not been verified. Use the manual install above.

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
│       │   ├── bloom/
│       │   │   └── SKILL.md                     # Bloom plugin-packaged skill
│       │   └── bloom-plan/
│       │       └── SKILL.md                     # Bloom Plan plugin-packaged skill
│       └── INSTALL.opencode.md                  # OpenCode install instructions
├── .claude/
│   └── skills/
│       ├── bloom/
│       │   └── SKILL.md                         # Claude Code skill (bloom)
│       └── bloom-plan/
│           └── SKILL.md                         # Claude Code skill (bloom-plan)
├── .cursor/
│   └── rules/
│       ├── bloom.mdc                            # Cursor rule (bloom)
│       └── bloom-plan.mdc                       # Cursor rule (bloom-plan)
├── droids/
│   ├── bloom.md                                 # Canonical cross-harness skill (index)
│   ├── bloom-core.md                            # Bloom core skill (mode, rules, skeleton)
│   ├── bloom-patterns.md                        # Bloom patterns (categories, harness matrix)
│   ├── bloom-plan.md                            # Canonical bloom-plan skill
│   └── bloom-plan-index.md                      # Bloom-plan maintainer index
├── docs/
│   ├── harness-setup.md                         # Per-agent setup guides
│   ├── harness-capabilities.md                  # Harness capability matrix
│   ├── categories.md                            # The 9 document categories explained
│   ├── design-system.md                         # Token reference (v1)
│   ├── design-system-v2.md                      # Dark mode, motion tokens, Tabs, Modal
│   ├── construction-rules.md                    # The 12 rules for producing HTML
│   ├── construction-rules-v2.md                 # Rule 9 revision for templates
│   ├── security.md                              # Security hardening guide
│   ├── public-readiness.md                      # Public-readiness checklist
│   └── release-checklist.md                     # Release process
├── bloom-validator/                             # Zero-dep TypeScript CLI
│   ├── README.md
│   ├── package.json
│   ├── src/
│   │   ├── index.ts                             # CLI entry (bloom-validate)
│   │   ├── parser.ts
│   │   ├── reporter.ts
│   │   ├── rule-registry.ts                     # All active rules in one place
│   │   └── rules/                               # One file per rule
│   └── tests/                                   # node:test suite + fixtures
├── templates/                                   # Production-quality templates
│   ├── annotated-pr-review.html
│   ├── exploration-code-approaches.html
│   ├── incident-timeline.html
│   ├── status-report.html
│   ├── status-report-v2.html
│   └── skeletons/                               # Starter scaffolds (clearly labeled)
│       ├── accessibility-report.html
│       ├── api-documentation.html
│       ├── architecture-decision.html
│       ├── dependency-audit.html
│       ├── design-review.html
│       ├── migration-plan.html
│       ├── monthly-review.html
│       ├── onboarding-guide.html
│       ├── sprint-retro.html
│       └── weekly-digest.html
├── examples/                                    # Fully worked artifacts
│   ├── pr-review-example.html
│   ├── incident-report-example.html
│   ├── design-system-example.html
│   └── feature-flag-editor-example.html
└── .github/
    └── workflows/
        └── ci.yml                               # Validator tests + artifact validation
```

Harnesses that don't have a tracked install target copy from `droids/bloom-plan.md` to their native location:
- **Factory Droid:** `cp droids/bloom-plan.md .factory/droids/bloom-plan.md` (project) or `~/.factory/droids/` (global)
- **Continue:** `cp droids/bloom-plan.md .continue/rules/bloom-plan.md`
- **GitHub Copilot VS Code:** append snippet to `.github/copilot-instructions.md`
- **Windsurf:** append snippet to `.windsurfrules`
- **Pi / General:** paste into system prompt

Templates and skeletons are different:

- **Templates** (`templates/*.html`) are production-quality. Real semantic structure, print styles, focus styles, ready to drop content into.
- **Skeletons** (`templates/skeletons/*.html`) are starter scaffolds. Each opens with a comment marking it as a skeleton and uses `data-template="<slot>"` markers instead of placeholder text. Replace the slots before publishing.

Every file in `templates/` and `examples/` passes [`bloom-validator`](bloom-validator/).

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

**What ships in this repo today:** The templates under [`templates/`](templates/) are mostly **static report layouts** (categories 1–3, 8) — exploration cards, annotated PR review, design review, status reports, retros, audits, and similar. Interactive templates for triage boards and animation sandboxes (categories 4, 9) are also included. For slide decks and custom editors, patterns are documented in [`docs/categories.md`](docs/categories.md) and [`droids/bloom-patterns.md`](droids/bloom-patterns.md). [`templates/status-report-v2.html`](templates/status-report-v2.html) is the richest reference (dark mode, motion tokens, light interaction).

### Templates in this repo

| Template | Interactive | Best for |
|---|---|---|
| [`status-report-v2.html`](templates/status-report-v2.html) | Light | Sprint/status |
| [`annotated-pr-review.html`](templates/annotated-pr-review.html) | No | PR review |
| [`exploration-code-approaches.html`](templates/exploration-code-approaches.html) | No | Approach comparison |
| [`incident-timeline.html`](templates/incident-timeline.html) | No | Incidents |
| [`triage-board.html`](templates/triage-board.html) | Yes | Prioritization |
| [`animation-sandbox.html`](templates/animation-sandbox.html) | Yes | Motion/easing |
| [`status-report.html`](templates/status-report.html) | No | Basic status |
| Skeletons in [`templates/skeletons/`](templates/skeletons/) | No | Starter scaffolds |

---

## Design system

All templates use CSS custom properties from the same warm palette. See [`docs/design-system.md`](docs/design-system.md) for the full reference and [`docs/design-system-v2.md`](docs/design-system-v2.md) for dark-mode tokens (via `prefers-color-scheme`), motion tokens (durations + easings), and the Tabs / Modal component patterns.

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

The validator enforces all of these via the `security-hardening` rule.

---

## Validation

[`bloom-validator/`](bloom-validator/) is a zero-dependency TypeScript CLI that checks any `.html` file against Bloom's construction and security rules. It uses Node ≥ 22.6 native TypeScript type-stripping — no build step, no dependencies.

```bash
# Validate a single file
node bloom-validator/src/index.ts path/to/file.html

# JSON output
node bloom-validator/src/index.ts path/to/file.html --json

# Multiple files at once
node bloom-validator/src/index.ts a.html b.html c.html

# Validate every template, skeleton, and example in this repo
# (Node resolves the file list, so this works on Bash, Zsh, PowerShell, and CMD.)
cd bloom-validator && npm run validate-all
```

Exit codes: `0` clean, `1` errors found, `2` invalid usage.

The validator currently enforces 19 rules:

- `no-external-deps`, `no-external-urls` — no external resources
- `no-hardcoded-hex` — use tokens
- `semantic-html` — `<header>`, `<main>`, semantic elements
- `responsive-breakpoints` — 640px and 960px breakpoints
- `no-placeholder-content` — no lorem ipsum, TODO, stubs (or mark with `data-template=`)
- `editor-export-hint` — clipboard export for editor artifacts
- `heading-hierarchy` — exactly one `<h1>`
- `viewport-meta` — always include
- `lang-attribute` — `<html lang="...">`
- `print-media-query` — `@media print`
- `no-inline-styles-except-root` — no inline `style=`
- `no-empty-elements` — no empty `<div>`, `<span>`, `<p>`
- `responsive-images` — `max-width: 100%` on `<img>`
- `aria-landmarks` — SVG accessibility
- `focus-visible` — focus indicators
- `contrast-minimum` — color contrast warnings
- `no-dialog-apis` — no `alert()`/`prompt()`/`confirm()`
- `security-hardening` (bundles S2–S8: `no-eval`, `innerHTML-with-variable`, `no-network`, `no-inline-handlers`, `no-data-html-uri`, `unsafe-clipboard`, `no-javascript-uri` — see [`bloom-validator/README.md`](bloom-validator/README.md))

Every template under `templates/` and every artifact under `examples/` passes this validator on every push (see [`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

---

## Construction rules

See [`docs/construction-rules.md`](docs/construction-rules.md) for the full checklist, and [`docs/construction-rules-v2.md`](docs/construction-rules-v2.md) for the Rule 9 revision that lets templates ship plausible default content with `data-template="<slot>"` markers instead of `[BRACKET]` placeholders. Summary:

1. **Single file** — All HTML, CSS, JS in one `.html` file
2. **CSS custom properties** — Use the palette tokens, never hard-code colors
3. **Semantic HTML** — `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<aside>`, `<details>`
4. **Inline JS only** — Minimal, no frameworks, no build step
5. **Responsive** — `max-width` wrappers, `clamp()` type, `@media` breakpoints
6. **Export mechanism** — "Copy as markdown/JSON/diff" button on every editor
7. **Print-friendly** — Key content readable without JS; `@media print` block
8. **Accessible** — `aria-label`, `role`, heading hierarchy, focus states
9. **No placeholder content** — Every word specific and real (or marked via `data-template=`)
10. **Viewport meta** — Always include `<meta name="viewport">`
11. **Progressive enhancement** — Core content visible without JS
12. **No `alert()`/`prompt()`/`confirm()`** — Use inline UI

---

## Contributing

1. Fork this repo
2. Create a feature branch
3. Add or improve templates, docs, the skill, or validator rules
4. After editing [`droids/bloom-core.md`](droids/bloom-core.md), run `./scripts/sync-skill-files.sh` to regenerate [`AGENTS.md`](AGENTS.md) and [`GEMINI.md`](GEMINI.md)
5. Run the validator against every template, skeleton, and example:
   ```bash
   cd bloom-validator && npm run validate-all
   ```
6. Run the validator's own tests:
   ```bash
   cd bloom-validator && npm test
   ```
7. Open a PR

See [`docs/public-readiness.md`](docs/public-readiness.md) for the checklist this repo holds itself to, and [`docs/release-checklist.md`](docs/release-checklist.md) for the per-release process.

---

## License

MIT — see [`LICENSE`](LICENSE).

---

## Acknowledgments

Patterns and philosophy from [The Unreasonable Effectiveness of HTML](https://thariqs.github.io/html-effectiveness/) by the original author.
