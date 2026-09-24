# bloom-validator

A zero-dependency TypeScript CLI that validates `.html` files against Bloom's construction and security rules. Runs on Node ≥ 22.6 using native TypeScript type-stripping — no build step, no dependencies.

## Quick start

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

The validator currently enforces 19 rules. Each rule is a single file under [`src/rules/`](src/rules/) and is registered in [`src/rule-registry.ts`](src/rule-registry.ts).

| ID | Name | Severity | Description |
|---|---|---|---|
| `rule-1` | `no-external-deps` | error | No `<script src>`, `<link rel="stylesheet">`, `@import`, or ES module `import`/`export` |
| `S1` | `no-external-img`, `no-external-link` | error | No `<img src="http(s)://...">` or `<link href="http(s)://...">` |
| `rule-2` | `no-hardcoded-hex` | error | No `#RRGGBB`/`#RGB`/`#RRGGBBAA` outside `:root` blocks |
| `rule-3` | `semantic-html` | error+warn | Requires `<header>` and `<main>` in `<body>`; warns when no `<section>`/`<article>`/`<nav>`/`<aside>` are used |
| `rule-5` | `responsive-breakpoints` | error | `@media (max-width: 640px)` and `960px` breakpoints required |
| `rule-6-hint` | `editor-export-hint` | warning | Editor/triage/board artifacts should include clipboard export |
| `rule-9` | `no-placeholder-content` | error | No placeholder dates, lorem ipsum, TODO, generic stubs (or mark with `data-template=`) |
| `rule-8` | `heading-hierarchy` | error | Exactly one `<h1>`; no skipped levels (h1 → h3) |
| `rule-10` | `viewport-meta` | error | `<meta name="viewport">` required in `<head>` |
| `rule-13` | `lang-attribute` | error | `<html>` must have a non-empty `lang` attribute |
| `rule-7` | `print-media-query` | warning | Warns when no `@media print` block is defined in any `<style>` |
| `rule-17` | `no-inline-styles-except-root` | error | No inline `style=` attributes; move styles into the document stylesheet and use tokens |
| `rule-16` | `no-empty-elements` | warning | Warns on empty `<div>`, `<span>`, and `<p>` elements unless marked with `data-template` or `aria-hidden` |
| `rule-15` | `responsive-images` | warning | Warns when `<img>` elements exist but no responsive `img { max-width: 100%; ... }` style is defined |
| `rule-8a` | `aria-landmarks` | warning | `<svg>` should have `aria-label` or `role="img"` |
| `rule-14` | `focus-visible` | warning | Warns when interactive elements exist but no `:focus`/`:focus-visible` style is defined |
| `rule-contrast` | `contrast-minimum` | warning | Hard-coded `color`/`background` hex pairs may fail contrast ratio |
| `rule-12` | `no-dialog-apis` | error | No `alert()`, `prompt()`, or `confirm()` calls in inline `<script>` |
| `security` | `security-hardening` | error | Bundle of S2/S3/S4/S5/S6/S7/S8 checks — see below |

The `security-hardening` rule emits issues under these `ruleName`s, all classified under rule id `security`:

- `no-eval`, `no-function-ctor`, `no-string-timer` (S2) — `eval()`, `new Function()`, `setTimeout("...")`, `setInterval("...")`
- `innerHTML-with-variable` (S3) — `.innerHTML = ` from anything but a plain string/template literal
- `no-network` (S4) — `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`
- `no-inline-handlers` (S5) — `onclick=`, `onload=`, any inline `on*=` attribute
- `no-data-html-uri` (S6) — `href="data:text/html"` or `data:text/javascript`
- `unsafe-clipboard` (S7) — No `writeText(...innerHTML)`; build export text programmatically
- `no-javascript-uri` (S8) — `javascript:` in `href`, `src`, `action`, `formaction`

### Manual checklist (not automated)

These Bloom construction/security expectations are documented in the skill but are not fully enforced by the validator:

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
npm test
```

13 tests under [`tests/`](tests/) cover one passing file (`valid.html`), one false-positive guard (`valid-with-urls.html`), and one targeted failure fixture per rule family.

## Validating every template, skeleton, and example

```bash
npm run validate-all
```

This runs [`scripts/validate-all.mjs`](scripts/validate-all.mjs), which resolves the artifact list in Node (not via shell globbing) and shells out to `bloom-validate` once with every file. It works identically on Bash, Zsh, PowerShell, and CMD — useful for Windows contributors, and the single canonical command CI uses too.

## Notes on the inline template `<script>`

Bloom templates themselves use inline JavaScript (not TypeScript) because Rule 1 forbids any build step — every artifact has to run from `file://`. This validator is the only place in the Bloom repo where TypeScript runs at all, and it runs in Node, not the browser.
