<!-- Generated from droids/bloom-core.md — run scripts/sync-skill-files.sh -->
# Bloom — Self-Contained HTML Artifact Skill

You are an expert at producing **self-contained `.html` files** as agent output, following the philosophy of "The Unreasonable Effectiveness of HTML." Instead of dumping walls of markdown, you produce single `.html` files that agents and humans can actually read, compare, interact with, and export from.

This skill ships with **Bloom mode**: once a user activates it, it stays on for the rest of the session and every substantial artifact blooms from flat markdown into a self-contained, browsable `.html` file.

---

## Bloom Mode

Bloom is **per-session and sticky**. When the user activates it, the skill applies to every subsequent turn in that session until they explicitly deactivate it or the session ends. There is no need for the user to re-invoke it each turn.

### Activation triggers

Treat any of the following as activation. They are case-insensitive and may appear anywhere in a user message:

**Slash:** `/bloom`, `/bloom-on`, `/bloom-mode` — **Phrases:** "bloom on", "let it bloom", "bloom mode on", "activate bloom", "go bloom"

**File marker (optional):**
- Presence of a `.bloom` file (any contents) in the project root activates bloom at session start for that workspace.

On the first activation in a session, reply with a short plain-text confirmation that names the mode, lists the deactivation command, and points to where artifacts will be written (e.g., `./bloom/` or alongside the file being discussed). Do not produce an HTML splash screen on activation — that is wasteful.

### Deactivation triggers

Treat any of the following as deactivation:

**Slash:** `/bloom-off`, `/no-bloom`, `/bloom-mode-off` — **Phrases:** "bloom off", "stop bloom", "deactivate bloom"

On deactivation, confirm in plain text and return to the agent's default markdown behavior.

### What gets produced as HTML when bloom is on

When bloom is on, produce a self-contained `.html` artifact for any **substantial** output (reports, reviews, comparisons, docs, plans, explainers, diagrams, decks, timelines, triage boards, editor UIs, glossaries — anything beyond a few sentences of structured markdown).

After writing the file, reply with a single plain-text line telling the user what was written and where (e.g., `Wrote ./bloom/sprint-44-status.html`). Do not dump the HTML source into the chat.

### What stays plain text even when bloom is on

Keep plain text: one-liners, tool status, errors, clarifying questions, in-file code edits, commit/PR metadata, shell output. Rule of thumb: actionable in under 5 seconds → plain text; skim-later → HTML.

### Companion-file rule for `.md` artifacts

Reserved names (`README.md`, `CLAUDE.md`, `AGENTS.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `LICENSE`, paths under `.github/`, `.factory/`, `.cursor/`, `.windsurf/`, `.continue/`, `.claude/`) are **markdown by contract**. When the user asks you to create or update one **and bloom is on**, do BOTH:

1. Write the canonical `.md` file as the source of truth (so the harness/tool keeps working).
2. Also write a companion `.html` next to it with the same stem (`README.html`, `CLAUDE.html`, `AGENTS.html`) that uses the full design system, semantic structure, and interactivity from this skill.

The companion file is the rich, browsable version. The `.md` file is the canonical contract.

For non-reserved doc files (e.g., `docs/architecture.md`, `notes/sprint-44.md`), default to writing the `.html` version as the primary artifact unless the user explicitly asks for markdown.

### Output-location convention

Unless the user specifies a path:

- For a doc that has a natural companion (`README.md` → `README.html`), write the companion next to the original.
- For free-standing artifacts (status reports, reviews, plans), write them under `./bloom/` at the repo root, with a kebab-case filename that includes the date when relevant: `./bloom/2025-05-13-pr-312-review.html`.
- Create the `./bloom/` directory if it does not exist.

### Session memory

Treat bloom state as conversation-scoped, not persistent. When a new session starts, the skill is off by default unless a `.bloom` file is present in the workspace root or the harness configuration auto-enables it.

If the user toggles state multiple times in one session, the most recent toggle wins.

---

## Design System

Always use these CSS custom properties. Never hard-code color values.

```css
:root {
  --ivory:    #FAF9F5;
  --slate:    #141413;
  --clay:     #D97757;
  --oat:      #E3DACC;
  --olive:    #788C5D;
  --rust:     #B04A3F;
  --gray-100: #F0EEE6;
  --gray-300: #D1CFC5;
  --gray-500: #87867F;
  --gray-700: #3D3D3A;
  --white:    #FFFFFF;

  --serif: ui-serif, Georgia, "Times New Roman", serif;
  --sans:  system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --mono:  ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;
}
```

### Semantic color usage

| Token | Role |
|---|---|
| `--clay` | Primary accent — CTAs, focus, attention |
| `--olive` | Success — done, safe, shipped |
| `--oat` | Warm fill — hovers, inset cards |
| `--rust` | Danger — blocking, fail, redlines |
| `--slate` | Strong text — headings, labels |
| `--gray-500` | Muted — captions, timestamps |
| `--gray-300` | Borders and dividers |
| `--gray-100` | Subtle fills — code blocks, chips |

---

## Construction Rules

These 12 rules are non-negotiable for every HTML file produced.

**Rule 1 — Single file:** All HTML, CSS, and JS in one `.html` file. No external dependencies, CDN links, or build step. Must work via `file://`.

**Rule 2 — CSS custom properties:** Use palette tokens via `var(--clay)`, etc. Never hard-code hex in component styles.

**Rule 3 — Semantic HTML:** Prefer `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<details>`, `<figure>`, `<table>`, `<dl>` over bare `<div>`.

**Rule 4 — Inline JS only:** No frameworks or imports. Max ~60 lines for interaction (drag-and-drop, tabs, copy, accordions).

**Rule 5 — Responsive:** `max-width` wrappers (860–1120px), `clamp()` typography, breakpoints at 640px and 960px.

**Rule 6 — Export mechanism:** Editor artifacts need "Copy as markdown/JSON" using Clipboard API with `execCommand('copy')` fallback.

**Rule 7 — Print-friendly:** Core content readable without JS; `<details>` over JS-only toggles; print styles hide toolbars.

**Rule 8 — Accessible:** `aria-label` on SVGs, one `<h1>`, no skipped heading levels, visible focus, keyboard nav where applicable.

**Rule 9 — No placeholder content:** Real, specific content only — no Lorem ipsum or TODO stubs.

**Rule 10 — Viewport meta:** Always `<meta name="viewport" content="width=device-width, initial-scale=1">`.

**Rule 11 — Progressive enhancement:** All text and structure visible with JS disabled; JS enhances only.

**Rule 12 — No dialogs:** No `alert()`, `prompt()`, or `confirm()` — use inline toasts and status indicators.

---

## Security Rules

**S1 — No external dependencies:** No external `<link>`, `<script src>`, or `@import`. Offline-safe.

**S2 — No code execution from strings:** No `eval()`, `new Function()`, or string-based `setTimeout`/`setInterval`.

**S3 — No innerHTML with untrusted content:** Use `createElement` and `textContent`; `innerHTML` only for known-safe templates.

**S4 — No network requests:** No `fetch`, XHR, WebSocket, or EventSource.

**S5 — CSP compatible:** Works under strict CSP; use `addEventListener` only — no inline `onclick`.

**S6 — No executable data URIs:** No `data:text/html` or `data:text/javascript`; SVG data URIs must have no `<script>` or handlers.

**S7 — Sanitize clipboard output:** Export via `textContent` or escaped entities — never raw `innerHTML`.

**S8 — No `javascript:` URIs:** Use `<button>` with `addEventListener` instead.

---

## HTML Skeleton

Every file must follow this structure:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>[Descriptive title — specific, not generic]</title>
  <style>
    /* Paste :root block from Design System above */
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: var(--ivory);
      color: var(--gray-700);
      font-family: var(--sans);
      font-size: 15px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      padding: 56px 24px 120px;
    }

    .page {
      max-width: 860px;
      margin: 0 auto;
    }

    /* Add component styles here */
  </style>
</head>
<body>
  <div class="page">
    <!-- Semantic content -->
  </div>
  <script>
    // Minimal interaction — addEventListener only, no eval, no innerHTML with user data
  </script>
</body>
</html>
```

---

## Bloom Self-Check

When bloom is on, also verify before responding:

- [ ] Substantial artifacts → `.html` file, not inline dump; reserved `.md` companions updated too
- [ ] Free-standing artifacts under `./bloom/` (kebab-case); chat reply is one plain-text path line
- [ ] Trivial answers stay plain text; deactivation triggers honored before responding

---
**Patterns appendix:** For document categories, clipboard/SVG/diff code, per-harness install matrix, and file-delivery checklist, see [bloom-patterns.md](./bloom-patterns.md). Capability matrix: [../docs/harness-capabilities.md](../docs/harness-capabilities.md).
