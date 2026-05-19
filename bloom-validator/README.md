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

The validator currently enforces 10 rules. Each rule is a single file under [`src/rules/`](src/rules/) and is registered in [`src/rule-registry.ts`](src/rule-registry.ts).

| ID | Name | Severity | Description |
|---|---|---|---|
| `rule-1` | `no-external-deps` | error | No `<script src>`, `<link rel="stylesheet">`, `@import`, or ES module `import`/`export` |
| `rule-2` | `no-hardcoded-hex` | error | No `#RRGGBB`/`#RGB`/`#RRGGBBAA` outside `:root` blocks |
| `rule-3` | `semantic-html` | error+warn | Requires `<header>` and `<main>` in `<body>`; warns when no `<section>`/`<article>`/`<nav>`/`<aside>` are used |
| `rule-7` | `print-media-query` | warning | Warns when no `@media print` block is defined in any `<style>` |
| `rule-8` | `heading-hierarchy` | error | Exactly one `<h1>`; no skipped levels (h1 → h3) |
| `rule-10` | `viewport-meta` | error | `<meta name="viewport">` required in `<head>` |
| `rule-12` | `no-dialog-apis` | error | No `alert()`, `prompt()`, or `confirm()` calls in inline `<script>` |
| `rule-13` | `lang-attribute` | error | `<html>` must have a non-empty `lang` attribute |
| `rule-14` | `focus-visible` | warning | Warns when interactive elements exist but no `:focus`/`:focus-visible` style is defined |
| `security` | `security-hardening` | error | Bundle of S2/S3/S4/S5/S6/S8 checks — see below |

The `security-hardening` rule emits issues under these `ruleName`s, all classified under rule id `security`:

- `no-eval`, `no-function-ctor`, `no-string-timer` (S2) — `eval()`, `new Function()`, `setTimeout("...")`, `setInterval("...")`
- `innerHTML-with-variable` (S3) — `.innerHTML = ` from anything but a plain string/template literal
- `no-network` (S4) — `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`
- `no-inline-handlers` (S5) — `onclick=`, `onload=`, any inline `on*=` attribute
- `no-data-html-uri` (S6) — `href="data:text/html"` or `data:text/javascript`
- `no-javascript-uri` (S8) — `javascript:` in `href`, `src`, `action`, `formaction`

### Planned (not yet enforced)

The following are part of Bloom's published construction rules but are not yet implemented in the validator. They are tracked roadmap items, not silent stubs:

- `responsive-images` — `<img>` should declare `max-width`
- `aria-landmarks` — landmark role coverage
- `contrast-minimum` — token-pair contrast heuristic
- `no-empty-elements` — empty `<div>`/`<span>`/`<p>`
- `no-inline-styles-except-root` — `style=` attribute outside `<style>` blocks

If you'd like to implement one, drop a file under `src/rules/`, export a `Rule`, and add it to `src/rule-registry.ts`.

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

12 tests under [`tests/`](tests/) cover one passing file (`valid.html`), one false-positive guard (`valid-with-urls.html`), and one targeted failure fixture per rule family.

## Validating every template, skeleton, and example

```bash
npm run validate-all
```

This runs [`scripts/validate-all.mjs`](scripts/validate-all.mjs), which resolves the artifact list in Node (not via shell globbing) and shells out to `bloom-validate` once with every file. It works identically on Bash, Zsh, PowerShell, and CMD — useful for Windows contributors, and the single canonical command CI uses too.

## Notes on the inline template `<script>`

Bloom templates themselves use inline JavaScript (not TypeScript) because Rule 1 forbids any build step — every artifact has to run from `file://`. This validator is the only place in the Bloom repo where TypeScript runs at all, and it runs in Node, not the browser.
