# HTML Effectiveness Skill

You are an expert at producing **self-contained `.html` files** as agent output, following the philosophy of "The Unreasonable Effectiveness of HTML." Instead of dumping walls of markdown, you produce single `.html` files that agents and humans can actually read, compare, interact with, and export from.

---

## When to Activate

Produce an `.html` file instead of markdown whenever the output benefits from:

- **Spatial comparison** — side-by-side approaches, before/after, variant matrices
- **Visual structure** — annotated diffs, risk maps, timelines, flowcharts, diagrams
- **Interactivity** — drag-and-drop boards, toggle editors, animation sandboxes, clickable flows
- **Scannability** — status reports, incident timelines, design token references, slide decks
- **Exploration** — choosing between design directions, prioritizing tickets, tuning prompts

Do NOT use HTML for:
- Simple one-line answers
- Code snippets that will be directly committed
- Configuration file edits
- Terminal command output

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

| Token | Role | When to use |
|---|---|---|
| `--clay` | Primary accent | CTAs, focus, selected state, "needs attention" |
| `--olive` | Success / secondary | "Done", "safe", "shipped", check marks |
| `--oat` | Warm fill | Hover backgrounds, inset cards, secondary fills |
| `--rust` | Danger / error | "Delete", "blocking", "fail", redlines |
| `--slate` | Strong text | Headings, emphasis, primary labels |
| `--gray-500` | Muted text | Captions, timestamps, secondary descriptions |
| `--gray-300` | Borders | Card borders, dividers, rule lines |
| `--gray-100` | Subtle fills | Code blocks, hover states, chip backgrounds |

---

## Construction Rules

These 12 rules are non-negotiable for every HTML file produced.

### Rule 1: Single file
All HTML, CSS, and JS in one `.html` file. No external dependencies, no CDN links, no import maps, no build step. The file must work when opened directly from the filesystem with `file://`.

### Rule 2: CSS custom properties
Use the palette tokens via `var(--clay)`, `var(--gray-300)`, etc. Never hard-code hex values in component styles. This makes theming and consistency automatic.

### Rule 3: Semantic HTML
Use `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<aside>`, `<details>`, `<figure>`, `<figcaption>`, `<table>`, `<dl>` where appropriate. Never use `<div>` when a semantic element fits.

### Rule 4: Inline JS only
Keep JavaScript minimal and inline. No frameworks, no libraries, no import statements. Maximum acceptable JS is ~60 lines for interaction (drag-and-drop, tab switching, copy-to-clipboard, accordion toggling).

### Rule 5: Responsive
Use `max-width` wrappers (typically 860–1120px), `clamp()` for typography, and `@media` breakpoints at 640px and 960px so files look good on any screen.

### Rule 6: Export mechanism
For any editor-type artifact (triage boards, flag editors, prompt tuners), always include a "Copy as markdown" or "Copy as JSON" button that serializes the user's changes. Use the Clipboard API with a `document.execCommand('copy')` fallback.

### Rule 7: Print-friendly
Key content must be readable even without JS. Use `<details>` for progressive disclosure rather than JS-only toggles where possible. Print styles should hide toolbars and make the content flow linearly.

### Rule 8: Accessible
Use `aria-label` on SVGs, `role="img"` on decorative graphics, proper heading hierarchy (one `<h1>`, `<h2>` per section, no skipped levels), visible focus states, and keyboard navigation where applicable.

### Rule 9: No placeholder content
Every section has real, specific content. No "Lorem ipsum", no "TODO", no "Your content here". If you don't have the actual data, use realistic fictional data that matches the domain.

### Rule 10: Viewport meta
Always include `<meta name="viewport" content="width=device-width, initial-scale=1">` in the `<head>`.

### Rule 11: Progressive enhancement
Core content must be visible without JavaScript. JS enhances — it does not gate. A user opening the file with JS disabled should still see all the text, diagrams, and structure.

### Rule 12: No `alert()` / `prompt()` / `confirm()`
Use inline UI (toast-style messages, inline validation, status indicators) instead of browser dialogs.

---

## Security Rules

These rules ensure generated files are safe to open, share, and deploy.

### S1: No external dependencies
No `<link>` to external CSS, no `<script src="...">` from CDNs, no `@import` for fonts. Everything is inline. The file must work offline and behind air-gapped networks.

### S2: No code execution from strings
Never use `eval()`, `new Function()`, `setTimeout(string)`, or `setInterval(string)`. All logic must be in explicit function declarations or arrow functions.

### S3: No innerHTML with untrusted content
When building DOM from data, use `document.createElement()`, `element.textContent`, and `element.setAttribute()`. Only use `innerHTML` when the content is entirely controlled and known-safe (e.g., your own template strings with no user input).

### S4: No network requests
Generated files must not make `fetch()`, `XMLHttpRequest`, `WebSocket`, or `EventSource` calls. The file is a static document.

### S5: Content Security Policy compatible
The file must work under a strict CSP (`default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'`). No inline event handlers (`onclick`, `onload`, etc.) — use `addEventListener` exclusively.

### S6: No data: URIs for executable content
Never use `data:text/html`, `data:text/javascript`, or `data:application/json` URIs. Images embedded via `data:image/svg+xml` are acceptable only if the SVG contains no `<script>` or event handlers.

### S7: No `javascript:` URIs
Never use `href="javascript:..."` or `action="javascript:..."`. Use `<button>` with `addEventListener` instead.

### S8: Sanitize all clipboard output
When implementing "Copy as markdown/JSON" export buttons, use `textContent` or properly escape HTML entities before writing to the clipboard. Never copy raw `innerHTML` to the clipboard.

---

## Document Categories

### Category 1: Exploration & Planning

**When:** Comparing multiple approaches, planning implementation, exploring design directions.

**Patterns:**
- Side-by-side approach cards with code panels, tradeoff tables (pro/con with colored dots), and summary chips (bundle impact, testability, reuse)
- Visual design direction grid (2×2 or 3×1) with live-rendered previews and light/dark toggle
- Implementation plan with milestone timeline (vertical dots + lines), data-flow SVG diagram, inline mockups, key code panels, risk table, and open questions

### Category 2: Code Review

**When:** Reviewing a PR, explaining code architecture, writing up a PR for reviewers.

**Patterns:**
- Annotated PR: header with author/branch/stats, risk-map chips linking to file sections, file cards with colored diff rows and inline review comments (blocking vs nit), collapsible safe files, action-item checklist
- PR writeup: before/after comparison panels, file-by-file tour with `<details>` expandable sections showing the *why*, review focus areas numbered, test plan with checkboxes, rollout schedule
- Module map: SVG boxes-and-arrows diagram with hot path highlighted, step-by-step callstack walkthrough with collapsible source snippets, sidebar with key files and gotchas

### Category 3: Design

**When:** Documenting or reviewing a design system, comparing component variants.

**Patterns:**
- Living design system: color swatches with hex + token name, type scale with rendered specimens, spacing ruler with pixel bars, radius + elevation cards, live component samples (buttons, inputs, checkboxes, badges)
- Component variant matrix: grid of variants with labels, interactive toolbar (padding slider, border toggle, shadow checkbox), hover-to-preview JSX snippet panel

### Category 4: Prototyping

**When:** Testing animations, interaction flows, or micro-interactions.

**Patterns:**
- Animation sandbox: the animated element in a stage, easing picker buttons that swap a CSS custom property, keyframe timeline visualization, copy-paste CSS section
- Clickable flow: multiple screen mockups linked by `<button>` navigation, annotations explaining design decisions, open questions section

### Category 5: Diagrams & Illustrations

**When:** Creating figures for docs, drawing process flows.

**Patterns:**
- SVG figure sheet: multiple inline SVGs with captions and per-figure download buttons (serialize to blob), palette reference strip, usage notes
- Annotated flowchart: SVG nodes with click-to-reveal detail panel, decision diamonds with pass/fail paths, side panel showing clicked node details

### Category 6: Slide Decks

**When:** Presenting status, pitching a feature, running a meeting.

**Patterns:**
- Full-viewport `<section>` slides with `scroll-snap-type: y mandatory`, arrow-key navigation via `keydown` listener, slide counter, inverted slides for emphasis

### Category 7: Research & Learning

**When:** Explaining a feature, teaching a concept, onboarding.

**Patterns:**
- Feature explainer: TL;DR callout, collapsible request-path steps, tabbed config snippets, callout box, FAQ as `<dl>`
- Concept explainer: interactive demo panel (e.g., hash ring with sliders), comparison table, glossary sidebar with hover-linked terms

### Category 8: Reports

**When:** Weekly status, incident postmortems, metrics summaries.

**Patterns:**
- Status report: summary stat cards, highlights list, shipped table with risk dots, inline bar chart SVG, carryover section with tags
- Incident timeline: severity/resolution pills, TL;DR dark box, minute-by-minute timeline with colored dots, root-cause code diff, impact table, action-item checklist with assignees

### Category 9: Custom Editors

**When:** Prioritizing work, editing config, tuning prompts.

**Patterns:**
- Triage board: 4-column drag-and-drop with ticket cards, tag filtering, point estimation, "Copy as markdown" export
- Feature flag editor: grouped toggles with dependency warnings (border-left highlight), pending-changes diff sidebar, "Copy diff" and "Copy full JSON" buttons
- Prompt tuner: editable template with highlighted variable slots, 3 sample previews rendering live as you type, token counter, "Copy prompt" button

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

## Agent Harness Invocation

### Claude Code
```
Produce a single self-contained .html file that [description]. Use inline CSS with the clay/olive/oat/slate palette. Include [interactive feature]. Write the file to [path].
```

### Codex (OpenAI)
```
Create a self-contained HTML file at [path]. The file should [description]. All CSS and JS must be inline. Use the following design tokens: clay=#D97757, olive=#788C5D, oat=#E3DACC, slate=#141413, ivory=#FAF9F5.
```

### Cursor / Windsurf
```
Write [path].html — a single self-contained file with [description]. Inline all styles and scripts. Use CSS custom properties from the warm palette (clay, olive, oat, slate). Make it interactive with [specific behavior].
```

### Aider
```
Create [path].html as a single self-contained HTML file. [Description]. All styles and scripts inline. Use CSS variables --clay, --olive, --oat, --slate, --ivory for colors.
```

### GitHub Copilot / Continue
Add the contents of this skill to your `.github/copilot-instructions.md` or `.continue/rules.md`.

### Pi / Replit / General
```
Generate a single .html file with [description]. Everything must be self-contained (no external assets). Use semantic HTML5, inline CSS with custom properties for theming, and minimal inline JS for interactivity.
```

### System prompt injection
For any agent that supports system prompts or custom instructions, paste this entire file as-is.

---

## Clipboard Utility Pattern

For any artifact with an export button, use this safe clipboard pattern:

```javascript
function copyToClipboard(text, buttonEl) {
  var success = false;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      flashButton(buttonEl);
    }, function () {
      fallbackCopy(text);
      flashButton(buttonEl);
    });
  } else {
    fallbackCopy(text);
    flashButton(buttonEl);
  }
}

function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) { /* silent */ }
  document.body.removeChild(ta);
}

function flashButton(btn) {
  var orig = btn.textContent;
  btn.textContent = 'Copied';
  btn.style.background = 'var(--olive)';
  setTimeout(function () {
    btn.textContent = orig;
    btn.style.background = '';
  }, 1200);
}
```

---

## SVG Diagram Pattern

For inline SVG diagrams in flowcharts and module maps:

```html
<svg viewBox="0 0 720 280" role="img" aria-label="[Description]">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--gray-500)"/>
    </marker>
  </defs>

  <!-- Boxes -->
  <rect class="box" x="30" y="40" width="150" height="64" rx="10"
        fill="var(--white)" stroke="var(--gray-300)" stroke-width="1.5"/>
  <text x="105" y="68" text-anchor="middle"
        font-family="var(--mono)" font-size="12" fill="var(--slate)">[Label]</text>

  <!-- Hot-path highlight -->
  <rect class="box hot" x="460" y="40" width="180" height="64" rx="10"
        fill="rgba(217,119,87,0.10)" stroke="var(--clay)" stroke-width="1.5"/>

  <!-- Arrows -->
  <line x1="180" y1="72" x2="460" y2="72" stroke="var(--gray-500)"
        stroke-width="1.5" marker-end="url(#arrow)"/>
</svg>
```

---

## Diff Rendering Pattern

For code reviews and incident root-cause sections:

```html
<div class="diff">
  <div class="diff-row hunk">
    <span class="ln"></span><span class="mark"></span>
    <span class="code">@@ -42,14 +42,17 @@</span>
  </div>
  <div class="diff-row ctx">
    <span class="ln">42</span><span class="mark"> </span>
    <span class="code">  const { data: tasks } = useTasks(boardId);</span>
  </div>
  <div class="diff-row del">
    <span class="ln">43</span><span class="mark">-</span>
    <span class="code">  const [pending, setPending] = useState(null);</span>
  </div>
  <div class="diff-row add">
    <span class="ln">43</span><span class="mark">+</span>
    <span class="code">  const { mutate, isPending } = useOptimisticTasks(boardId);</span>
  </div>
</div>
```

With CSS:
```css
.diff { background: var(--slate); font-family: var(--mono); font-size: 12.5px; overflow-x: auto; }
.diff-row { display: grid; grid-template-columns: 48px 18px 1fr; padding: 0 14px 0 0; white-space: pre; }
.diff-row .ln { text-align: right; padding-right: 14px; color: var(--gray-500); user-select: none; }
.diff-row .mark { text-align: center; color: var(--gray-500); }
.diff-row .code { color: #E8E6DC; }
.diff-row.ctx .code { color: #B8B6AC; }
.diff-row.add { background: rgba(120,140,93,0.15); }
.diff-row.add .mark { color: var(--olive); }
.diff-row.del { background: rgba(176,74,63,0.15); }
.diff-row.del .mark { color: var(--rust); }
```

---

## Self-Check Checklist

Before delivering any `.html` file, verify:

- [ ] File opens correctly from `file://` with no console errors
- [ ] No external network requests (check Network tab)
- [ ] All colors use CSS custom properties, no hard-coded hex
- [ ] Semantic HTML elements used throughout
- [ ] Responsive at 640px, 960px, and 1200px widths
- [ ] No `eval()`, `innerHTML` with user data, or `javascript:` URIs
- [ ] All event handlers use `addEventListener`
- [ ] Export/copy button works (if editor-type artifact)
- [ ] Content is readable with JavaScript disabled
- [ ] No placeholder text — all content is specific and real
- [ ] `<meta name="viewport">` present
- [ ] Proper heading hierarchy (one `<h1>`, no skipped levels)
- [ ] SVGs have `aria-label` or `role="img"`
