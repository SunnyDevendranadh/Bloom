# bloom-validator

A zero-dependency TypeScript CLI that validates `.html` files against Bloom's construction rules and security rules (S1–S8).

## Quick start

Requires Node ≥ 22.6 (uses native TypeScript type-stripping — no build step).

```bash
node src/index.ts path/to/file.html
node src/index.ts path/to/file.html --json
node src/index.ts a.html b.html c.html
```

Exit codes:

- `0` — all files pass (no errors; warnings are non-blocking)
- `1` — one or more files have errors
- `2` — invalid usage or missing file

## Rules implemented

| ID | Name | Severity | Description |
|---|---|---|---|
| `rule-1` | `no-external-deps` | error | No `<script src>`, `<link rel="stylesheet">`, `@import`, ES module `import`/`export` |
| `S1` | `no-external-img`, `no-external-link` | error | No `<img src="http(s)://...">` or `<link href="http(s)://...">` |
| `rule-2` | `no-hardcoded-hex` | error | No `#RRGGBB`/`#RGB`/`#RRGGBBAA` outside `:root` blocks |
| `rule-3` | `semantic-html` | error+warn | Requires `<header>` and `<main>` in `<body>`; warns when no `<section>`/`<article>`/`<nav>`/`<aside>` are used |
| `rule-5` | `responsive-breakpoints` | error | `@media (max-width: 640px)` and `960px` breakpoints required |
| `rule-6-hint` | `editor-export-hint` | warning | Editor/triage/board artifacts should include clipboard export |
| `rule-9` | `no-placeholder-content` | error | No placeholder dates, lorem ipsum, TODO, generic stubs |
| `rule-8` | `heading-hierarchy` | error | Exactly one `<h1>`; no skipped levels |
| `rule-10` | `viewport-meta` | error | `<meta name="viewport">` required in `<head>` |
| `rule-lang` | `lang-attribute` | error | `<html lang="...">` required |
| `rule-13` | `print-media-query` | error | `@media print` block required in `<style>` |
| `rule-style` | `no-inline-styles-except-root` | error | No inline `style=` attributes (except on `:root` token definitions) |
| `rule-empty` | `no-empty-elements` | error | No empty `<div>`, `<span>`, `<p>`, etc. |
| `rule-img` | `responsive-images` | error+warn | `<img>` must be responsive; missing `alt` is a warning |
| `rule-8a` | `aria-landmarks` | warning | `<svg>` should have `aria-label` or `role="img"` |
| `rule-8b` | `focus-visible` | warning | Interactive elements should define `:focus-visible` styles |
| `rule-contrast` | `contrast-minimum` | warning | Hard-coded `color`/`background` hex pairs may fail contrast |
| `rule-12` | `no-dialog-apis` | error | No `alert()`, `prompt()`, or `confirm()` |
| `S2` | `no-eval`, `no-function-ctor`, `no-string-timer` | error | No `eval()`, `new Function()`, string-based timers |
| `S3` | `innerHTML-with-variable` | error | `.innerHTML` may only be assigned a string literal |
| `S4` | `no-network` | error | No `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource` |
| `S5` | `no-inline-handlers` | error | No `on*=` attributes — use `addEventListener` |
| `S6` | `no-data-html-uri` | error | No `data:text/html` or `data:text/javascript` URIs |
| `S7` | `unsafe-clipboard` | error | No `writeText(...innerHTML)` — build export text programmatically |
| `S8` | `no-javascript-uri` | error | No `javascript:` in `href`, `src`, `action` |

## Manual checklist (not automated)

These Bloom construction/security expectations are documented in `droids/bloom.md` and `docs/security.md` but are **not** fully enforced by the validator (Rule 9 placeholder text **is** automated via `no-placeholder-content`):

- [ ] Single self-contained file opens from `file://` with no console errors
- [ ] Core content readable with JavaScript disabled (progressive enhancement; Rule 11)
- [ ] Export/copy buttons use the safe clipboard pattern on editor artifacts (Rule 6; `editor-export-hint` warns only)
- [ ] `data:image/svg+xml` embeds contain no `<script>` or event handlers (S6 partial)
- [ ] HTML entities escaped in dynamic DOM insertion (S9)
- [ ] Drag-and-drop UIs built with `createElement` / `textContent`, not HTML strings (S10)

## JSON output shape

```json
{
  "file": "/abs/path.html",
  "passed": false,
  "errorCount": 3,
  "warningCount": 0,
  "issues": [
    {
      "rule": "rule-2",
      "ruleName": "no-hardcoded-hex",
      "severity": "error",
      "line": 14,
      "message": "Hard-coded hex color \"#FAF9F5\" outside :root — use var(--token) instead (Rule 2)",
      "snippet": "body { background: #FAF9F5; }"
    }
  ]
}
```

When multiple files are passed, the top level is an array of these objects.

## Running tests

```bash
node --test tests/validator.test.ts
```

The fixtures under `tests/fixtures/` cover one passing file and one targeted failure per rule family.

## Notes on the inline template `<script>`

Bloom templates themselves must include inline JavaScript (not TypeScript) because Rule 1 forbids any build step — the file has to run from `file://`. This validator is the only place in the Bloom repo where TypeScript runs at all, and it runs in Node, not the browser.
