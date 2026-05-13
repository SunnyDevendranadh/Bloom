---
name: html-effectiveness
description: Per-session sticky mode that produces rich, self-contained .html artifacts instead of flat markdown for reports, reviews, plans, docs, comparisons, and editor-like UI. Trigger with /html-effectiveness, /html, /html-on, or phrases like "html mode on", "use html", "respond in html". Deactivate with /html-off or "html mode off".
---

# HTML Effectiveness — Claude Code skill

This skill puts the current session into **HTML Mode**: every substantial artifact (status report, PR review, plan, doc, comparison, diagram, editor UI) is produced as a self-contained `.html` file using the warm clay/olive/oat/slate palette, semantic HTML5, inline CSS + JS, and no external dependencies.

The canonical reference for the skill lives at `droids/html-effectiveness.md` in the HTML.md repo. The rules below are the Claude-Code-specific operating instructions.

---

## Session lifecycle

1. **Activate** when the user message matches an activation trigger (slash or phrase, see below).
2. **Stay sticky** for the rest of the session. Do not re-prompt the user. Do not require re-invocation per turn.
3. **Honor the mode on every turn** until a deactivation trigger fires or the session ends.

### Activation triggers (case-insensitive, may appear anywhere in a user message)

Slash:
- `/html-effectiveness`
- `/html`
- `/html-on`
- `/html-mode`

Phrases:
- "html mode on"
- "activate html mode"
- "enable html effectiveness"
- "use html mode"
- "switch to html mode"
- "html-only mode"
- "respond in html"
- "html responses please"

File marker:
- If `.html-mode` exists at the repo root at session start, activate immediately without waiting for an explicit trigger.

### Deactivation triggers

Slash:
- `/html-off`
- `/html-effectiveness-off`
- `/no-html`
- `/html-mode-off`

Phrases:
- "html mode off"
- "disable html mode"
- "stop html mode"
- "turn off html"
- "exit html mode"
- "deactivate html"

---

## What to produce as HTML (when active)

Write a self-contained `.html` artifact for any of the following:

- Reports — status, weekly, sprint, KPI, monthly
- Reviews — PR, code, design, architecture
- Comparisons — multiple approaches, before/after, A/B
- Documentation — architecture, API, runbooks, ADRs, onboarding
- Plans — implementation, migration, rollout, incident response
- Explainers — concept, feature, system walkthrough
- Diagrams — flow, sequence, module map, dependency graph
- Slide decks and pitches
- Incident timelines and postmortems
- Triage boards, prioritization, kanban
- Editor-like UI — flag editor, prompt tuner, config editor
- Glossaries, FAQs, decision logs

After writing the file, reply with a single plain-text line stating the path. Example:

> Wrote `./artifacts/2025-05-13-pr-312-review.html` — open it in your browser.

Do NOT paste the HTML source into the chat. The file is the artifact.

---

## What stays plain text (even when active)

- Direct one-line factual answers
- Tool execution status updates
- Errors that need to be visible immediately
- Short clarifying questions back to the user
- Code edits inside existing source files (use the Edit tool normally)
- Commit messages, PR titles, branch names
- Shell command output

Rule of thumb: if the user could act on the answer in under 5 seconds of reading, keep it plain text.

---

## Companion-file rule for reserved `.md` filenames

When the user asks you to create or update one of these files and HTML Mode is active, write **both** the canonical `.md` (so the harness contract keeps working) **and** a richer `.html` companion next to it:

| Canonical (.md) | Companion (.html) |
|---|---|
| `README.md` | `README.html` |
| `CLAUDE.md` | `CLAUDE.html` |
| `AGENTS.md` | `AGENTS.html` |
| `CONTRIBUTING.md` | `CONTRIBUTING.html` |
| `CHANGELOG.md` | `CHANGELOG.html` |

Files under `.github/`, `.factory/`, `.cursor/`, `.windsurf/`, `.continue/`, `.claude/`, and `LICENSE` / `CODEOWNERS` follow the same rule: keep the canonical form, add a sibling `.html` if it would be a substantial doc.

For non-reserved docs (`docs/architecture.md`, `notes/sprint-44.md`, etc.), default to writing the `.html` version as the primary artifact unless the user explicitly asks for markdown.

---

## Output-location convention

- Doc with a natural sibling → write the companion next to the original (`README.md` → `README.html`).
- Free-standing artifact → write under `./artifacts/` at the repo root with a kebab-case filename. Prefix with the date when relevant: `./artifacts/2025-05-13-sprint-44-status.html`.
- Create `./artifacts/` if it doesn't exist.

---

## Construction rules (summary — full version in droids/html-effectiveness.md)

Every `.html` file produced must:

1. Be a single file with all CSS and JS inline. No CDN, no external fonts, no build step.
2. Use the design tokens via CSS custom properties — `var(--clay)`, `var(--olive)`, `var(--oat)`, `var(--slate)`, `var(--ivory)`, `var(--rust)`, `var(--gray-100..700)`, `--serif`, `--sans`, `--mono`.
3. Use semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<aside>`, `<details>`, `<figure>`).
4. Keep JavaScript minimal and inline. `addEventListener` only — no inline `on*` attributes, no `eval`, no `new Function`, no `setTimeout(string)`.
5. Be responsive: `max-width` page wrapper, `clamp()` for type, `@media` breakpoints at 640px and 960px.
6. Include export buttons (Copy as markdown / JSON / diff) on any editor-type artifact, with a `document.execCommand('copy')` fallback.
7. Be print-friendly. Core content readable without JS.
8. Be accessible: `aria-label` on SVGs, proper heading hierarchy, visible focus states.
9. Contain real, specific content. No "Lorem ipsum", no "TODO", no placeholders.
10. Include `<meta name="viewport" content="width=device-width, initial-scale=1">`.
11. Be progressive — content visible without JavaScript.
12. Never use `alert()` / `prompt()` / `confirm()` — use inline UI instead.

### Security rules

- No external dependencies (`<link>`, `<script src>`, `@import url()` to external).
- No `fetch()`, `XMLHttpRequest`, `WebSocket`, `EventSource`, or external `<img src>`.
- No `eval()`, `new Function()`, `setTimeout(string)`, `setInterval(string)`.
- No `innerHTML` with user-controlled content — use `createElement` + `textContent`.
- No inline event handlers (`onclick`, `onload`, etc.). Use `addEventListener`.
- No `javascript:` URIs.
- No `data:text/html` or `data:text/javascript` URIs.
- Clipboard export builds the string programmatically — never copies raw `innerHTML`.
- Must work under CSP `default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'`.

---

## Confirmation messages

**On activation** (first time per session):

> HTML Effectiveness mode is on. Artifacts will be written as self-contained `.html` files under `./artifacts/` (companion `.html` alongside any reserved `.md`). Say "html mode off" or `/html-off` to deactivate.

**On deactivation:**

> HTML Effectiveness mode is off. Returning to default markdown output.

Do NOT produce an HTML splash screen on activation. The confirmation is a single plain-text line.

---

## Skeleton

Every produced file uses this skeleton:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>[Specific descriptive title]</title>
  <style>
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
    .page { max-width: 860px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="page"><!-- semantic content --></div>
  <script>
    // addEventListener only; no eval, no innerHTML with user data
  </script>
</body>
</html>
```

---

## Self-check before responding (every turn, when active)

- [ ] Is the response a substantial artifact? If yes → it goes in an `.html` file, not the chat.
- [ ] Is the path under `./artifacts/` or a `.html` companion to an existing `.md`?
- [ ] Did I keep the canonical `.md` in addition to the companion (for reserved filenames)?
- [ ] Is my chat reply a single plain-text line pointing at the file?
- [ ] Did the user's latest message contain a deactivation trigger? If yes → turn off the mode before responding.
