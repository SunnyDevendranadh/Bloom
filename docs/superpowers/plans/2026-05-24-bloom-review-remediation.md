# Bloom Review Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Bloom production-ready for open source and marketplace distribution by fixing the broken validator, implementing or removing filler rules, aligning docs/templates/README with reality, and adding CI.

**Architecture:** Work in dependency order — green tests first, then rule implementations sharing `parser.ts` helpers (`offsetToLine`, `lineFromOffsetInBlock`, `snippet`), then wire all rules in `index.ts`, then templates/docs as separate PR-sized phases. Prefer **implement** over **delete** for the 8 stub rules (matches AGENTS.md “replace filler with real content”). Rules that are hard to lint (Rule 6 export buttons, Rule 11 progressive enhancement) get **warning**-severity heuristics or documented “manual checklist only.”

**Tech Stack:** Node ≥22.6, native `node --test`, zero-dep TypeScript in `bloom-validator/`, HTML/CSS templates, markdown docs.

---

## File map (what changes where)

| Area | Create | Modify | Delete |
|------|--------|--------|--------|
| Validator core | `rules/responsive-breakpoints.ts`, `rules/no-placeholder-content.ts`, `rules/no-external-urls.ts` (S1 img) | `parser.ts`, `types.ts`, `index.ts`, all `rules/*.ts` | — |
| Validator tests | `fixtures/invalid-*.html` per new rule | `validator.test.ts`, `invalid-dialog-apis.html` | — |
| CI | `.github/workflows/validator.yml` | — | — |
| Harness | `AGENTS.md`, `.cursor/rules/bloom.mdc` (optional) | — | — |
| Templates | — | 9 thin templates + bracket headers on rich templates | or merge thin → one `starter-template.html` |
| Docs | — | `README.md`, `bloom-validator/README.md`, `droids/bloom.md`, `docs/security.md` | — |
| Examples | `examples/*.html` (3) | `README.md` tree | — |

---

## Phase 0 — Unblock tests (Critical)

**Exit criterion:** `cd bloom-validator && npm test` exits 0.

### Task 0.1: Fix `no-dialog-apis` rule module

**Files:**
- Modify: `bloom-validator/src/rules/no-dialog-apis.ts`
- Modify: `bloom-validator/tests/fixtures/invalid-dialog-apis.html`
- Test: `bloom-validator/tests/validator.test.ts`

- [ ] **Step 1: Fix imports and Issue shape**

Replace broken import and align with `viewport-meta.ts` / `security-hardening.ts`:

```typescript
import type { Issue, Rule } from "../types.ts";
import { offsetToLine, snippet } from "../parser.ts";

export const noDialogApis: Rule = {
  id: "rule-12",
  name: "no-dialog-apis",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    const banned = [
      { pattern: /\balert\s*\(/g, label: "alert()" },
      { pattern: /\bprompt\s*\(/g, label: "prompt()" },
      { pattern: /\bconfirm\s*\(/g, label: "confirm()" },
    ];

    for (const block of ctx.scriptBlocks) {
      if (block.attributes["src"]) continue;
      for (const { pattern, label } of banned) {
        pattern.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = pattern.exec(block.content)) !== null) {
          const line = block.startLine + (block.content.slice(0, m.index).split("\n").length - 1);
          issues.push({
            rule: "rule-12",
            ruleName: "no-dialog-apis",
            severity: "error",
            line,
            message: `${label} is not allowed — use inline UI instead (Rule 12)`,
            snippet: snippet(block.content, m.index),
          });
        }
      }
    }
    return issues;
  },
};
```

- [ ] **Step 2: Rewrite dialog fixture (script-only)**

`invalid-dialog-apis.html` — remove `onclick` handlers (those are S5, tested in `invalid-security.html`). Use:

```html
<script>
alert('x');
prompt('y');
confirm('z');
</script>
```

- [ ] **Step 3: Run tests**

```bash
cd bloom-validator && npm test
```

Expected: all tests pass including dialog test (3 issues, `ruleName === "no-dialog-apis"`).

- [ ] **Step 4: Commit** (only if user requests)

```bash
git add bloom-validator/src/rules/no-dialog-apis.ts bloom-validator/tests/fixtures/invalid-dialog-apis.html
git commit -m "fix(validator): repair no-dialog-apis rule and fixture"
```

---

## Phase 1 — Rule interface normalization (Important)

**Exit criterion:** Every `Rule` export has `id`, `name`, `check`; no `description` field; no `lineFromOffset` imports anywhere.

### Task 1.1: Normalize `Rule` type usage

**Files:**
- Modify: all `bloom-validator/src/rules/*.ts`

- [ ] Remove `description` from stub rules when implementing (Phase 2).
- [ ] Ensure every rule exports `id` matching docs (`rule-N` or `S#`).
- [ ] Grep cleanup: `rg 'lineFromOffset' bloom-validator` → must be empty.

### Task 1.2: Deduplicate import in `no-external-deps.ts`

**Files:** `bloom-validator/src/rules/no-external-deps.ts:2-4`

- [ ] Single `import { ... } from "../parser.ts"` line.

---

## Phase 2 — Implement eight stub rules (Important)

Wire each in `bloom-validator/src/index.ts` `ALL_RULES` after implementation. Add fixture + test per rule.

| File | `id` | Implementation sketch | Severity |
|------|------|----------------------|----------|
| `lang-attribute.ts` | `rule-lang` | Error if `<html` missing `lang=` in source | error |
| `print-media-query.ts` | `rule-13` | Error if no `@media print` in any `styleBlocks` | error |
| `responsive-images.ts` | `rule-img` | Error on `<img` without `max-width:100%` or `width`/`height` in inline style; warn if missing `alt` on non-empty src | error/warn |
| `aria-landmarks.ts` | `rule-8a` | Warn if `<body>` has no `role=` on header/main and missing `<header>`/`<main>` already covered by semantic — add warn for `<svg` without `aria-label` or `role="img"` | warning |
| `focus-visible.ts` | `rule-8b` | Warn if interactive selectors (`button`, `a`, `input`, `[tabindex]`) in CSS lack `:focus-visible` or `:focus` rule in style blocks | warning |
| `no-empty-elements.ts` | `rule-empty` | Error on `<p></p>`, `<div></div>`, `<span></span>` with only whitespace | error |
| `no-inline-styles-except-root.ts` | `rule-style` | Error on `style="..."` outside `:root` / first 200 chars heuristic: scan tags for ` style=` not in `<html` | error |
| `contrast-minimum.ts` | `rule-contrast` | **Defer v1:** warn only when `color:` and `background:` both hard-coded hex in same rule block (full contrast calc is out of scope) OR document as manual |

**Rename exports** to camelCase: `ariaLandmarks`, `langAttribute`, etc. (fix `arialandmarks` typo).

### Task 2.1: `lang-attribute`

- [ ] Implement check on `ctx.source` for `<html[^>]*\blang\s*=\s*["'][^"']+["']`.
- [ ] Fixture: `invalid-lang.html` without lang.
- [ ] Test asserts `ruleName === "lang-attribute"`.

### Task 2.2: `print-media-query`

- [ ] Scan concatenated `ctx.styleBlocks` for `@media\s+print`.
- [ ] Fixture: `invalid-print.html` missing print block.
- [ ] Test + ensure `valid.html` still passes.

### Task 2.3: `responsive-images`

- [ ] Regex `<img\b[^>]*>` in `ctx.bodyHtml`; flag missing `alt` (warn), missing responsive hint (error): `style=.*max-width:\s*100%` or class known from design system optional.

### Task 2.4: `no-empty-elements`

- [ ] Match empty semantic tags: `<(p|div|span|section|article)\b[^>]*>\s*</\1>`.

### Task 2.5: `no-inline-styles-except-root`

- [ ] Flag ` style="` on tags other than allowing none (Bloom Rule: tokens in CSS, not inline — error on any element `style=`).

### Task 2.6: `aria-landmarks` + `focus-visible`

- [ ] Warning-only rules; document in validator README as warnings.

### Task 2.7: `contrast-minimum`

- [ ] **Option A (recommended):** Implement warn when `#` hex appears in both `color` and `background` in same selector block without `var(`.
- [ ] **Option B:** Remove file; document as manual checklist in README.

### Task 2.8: Register all rules

**File:** `bloom-validator/src/index.ts`

```typescript
const ALL_RULES: Rule[] = [
  noExternalDeps,
  noHardcodedHex,
  semanticHtml,
  headingHierarchy,
  viewportMeta,
  langAttribute,
  responsiveBreakpoints, // Phase 3
  noPlaceholderContent,  // Phase 3
  printMediaQuery,
  responsiveImages,
  noEmptyElements,
  noInlineStylesExceptRoot,
  ariaLandmarks,
  focusVisible,
  contrastMinimum,
  securityHardening,
  noDialogApis,
];
```

- [ ] Run full test suite; update `valid.html` if new rules require print/lang/responsive CSS.

---

## Phase 3 — Missing construction rules (Important)

### Task 3.1: `responsive-breakpoints.ts` (Rule 5)

**Create:** `bloom-validator/src/rules/responsive-breakpoints.ts`

- [ ] Error if no `@media` with `max-width` matching `640` or `960` (allow `640px`, `63.9375rem`, etc.).
- [ ] Fixture: `invalid-responsive.html`
- [ ] Test + register in `index.ts`

### Task 3.2: `no-placeholder-content.ts` (Rule 9)

**Create:** `bloom-validator/src/rules/no-placeholder-content.ts`

- [ ] Error on case-insensitive patterns: `placeholder date`, `lorem ipsum`, `your content here`, `template for`, `TODO`, `TBD`, `Company Name`, `John Doe`, `Task 1` (tune list from `docs/construction-rules.md`).
- [ ] Allow `data-template` attribute values and `[TITLE]` only inside elements with `data-template` parent per `construction-rules-v2.md`.
- [ ] Fixture: `invalid-placeholder.html`
- [ ] **Update thin templates** in Phase 5 so they pass.

### Task 3.3: Rule 6 / Rule 11 (heuristic warnings)

**Create:** `bloom-validator/src/rules/editor-export-hint.ts` (optional)

- [ ] **Warning** if filename or `<title>` contains `triage`, `editor`, `board` but no `clipboard.writeText` or `execCommand('copy')` in scripts.
- [ ] **Warning** if `display:\s*none` on `main` or `article` without `<details>` in body (weak heuristic for Rule 11).

Document in README: not fully automatable.

---

## Phase 4 — Security gaps (Important)

**File:** `bloom-validator/src/rules/security-hardening.ts` or new `no-external-urls.ts`

### Task 4.1: External resource URLs (S1 extension)

- [ ] Error on `<img[^>]+src\s*=\s*["']https?://` and `<a[^>]+href\s*=\s*["']https?://` for assets (allow `mailto:` optional).
- [ ] Fixture: `invalid-external-img.html`
- [ ] Test

### Task 4.2: Clipboard sanitization (S7)

Add to `SCRIPT_CHECKS` or separate scan:

- [ ] Error: `clipboard\.writeText\s*\([^)]*\.innerHTML`
- [ ] Error: `writeText\s*\(\s*[^)]*\+` near innerHTML reads (heuristic)
- [ ] Fixture lines in `invalid-security.html`

### Task 4.3: S9 / S10 (warnings)

- [ ] Warn if `innerHTML` used and no `escapeHtml` function defined when variable assignment detected.
- [ ] Warn on `innerHTML` in drag/drop handlers without `createElement` nearby (heuristic, low priority).

### Task 4.4: Unify security numbering in docs

**Files:** `droids/bloom.md`, `docs/security.md`, `bloom-validator/README.md`

- [ ] **Canonical table** (single source of truth):

| ID | Topic | Validator `ruleName` |
|----|-------|---------------------|
| S1 | No external deps | `no-external-deps` + `no-external-urls` |
| S2 | No eval / string timers | `no-eval`, etc. |
| S3 | innerHTML | `innerHTML-with-variable` |
| S4 | No network | `no-network` |
| S5 | No inline handlers | `no-inline-handlers` |
| S6 | No data: HTML/JS URIs | `no-data-html-uri` |
| S7 | Clipboard + innerHTML | `unsafe-clipboard` (new) |
| S8 | No javascript: URIs | `no-javascript-uri` |

- [ ] Fix `droids/bloom.md` — current S7 duplicates S8; renumber to match `docs/security.md`.

---

## Phase 5 — Templates (Important)

**Reference template:** `templates/status-report-v2.html` (copy structure, tokens, print block, breakpoints).

### Task 5.1: Upgrade nine thin templates

**Files:** (each ~21 lines today)

- `accessibility-report.html`
- `onboarding-guide.html`
- `migration-plan.html`
- `sprint-retro.html`
- `design-review.html`
- `monthly-review.html`
- `dependency-audit.html`
- `weekly-digest.html`
- `api-documentation.html`
- `architecture-decision.html`
- `status-report.html` (v1 — align with v2 or deprecate)

Per file:

- [ ] Full `:root` token block from design-system-v2
- [ ] `@media (max-width: 640px)` and `960px`
- [ ] `@media print { nav, button { display: none; } }`
- [ ] Realistic fictional content (Rule 9) — no “placeholder date”
- [ ] Use `data-template="slot-name"` for agent-fillable fields per `docs/construction-rules-v2.md`
- [ ] Run `node src/index.ts templates/<name>.html` — zero errors

### Task 5.2: Rich templates — bracket slots

**Files:** `exploration-code-approaches.html`, `annotated-pr-review.html`, `incident-timeline.html`

- [ ] Wrap `[TITLE]`-style text in elements with `data-template="title"` OR document in SKILL as intentional agent slots (validator exemption via parent `data-template`).

### Task 5.3: Template index in SKILL

**Files:** `plugins/bloom/skills/bloom/SKILL.md`, `.claude/skills/bloom/SKILL.md`

- [ ] List **recommended** templates (4–5 rich) vs **starters** (upgraded thin set).

---

## Phase 6 — README, harness files, examples (Important)

### Task 6.1: Fix README repo tree

**File:** `README.md` lines ~240–274

- [ ] Replace tree with **actual** files from `templates/`, `docs/`, `bloom-validator/`.
- [ ] Remove references to non-existent: `design-system-reference.html`, `animation-sandbox.html`, `triage-board.html`, etc. OR add them in Phase 5.4.

### Task 6.2: Ship harness entrypoints

- [ ] **Create** `AGENTS.md` — copy from `droids/bloom.md` (or symlink documented in README).
- [ ] **Create** `GEMINI.md` — same content or one-line pointer to `AGENTS.md`.
- [ ] **Create** `.cursor/rules/bloom.mdc` with frontmatter + condensed skill (or pointer).
- [ ] Update install sections for Codex/OpenCode/Cursor to match real paths.

### Task 6.3: Add `examples/` directory

**Create:**

- `examples/pr-review-example.html` — minimal copy from `annotated-pr-review.html` with sample data
- `examples/incident-report-example.html` — from `incident-timeline.html`
- `examples/design-system-example.html` — token swatch page

- [ ] Link from README.

### Task 6.4: Validator README honesty

**File:** `bloom-validator/README.md`

- [ ] Split table: **Implemented (error)** | **Implemented (warning)** | **Manual checklist only**
- [ ] Update `package.json` description to match (“validates Bloom construction and security rules” without hard-coding “12+8” unless true).
- [ ] Add Rule 12 row for `no-dialog-apis`.

---

## Phase 7 — CI and final verification (Minor → release gate)

### Task 7.1: GitHub Actions

**Create:** `.github/workflows/validator.yml`

```yaml
name: bloom-validator
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
      - run: cd bloom-validator && npm test
      - run: cd bloom-validator && node src/index.ts tests/fixtures/valid.html
```

- [ ] Confirm workflow passes on branch.

### Task 7.2: Full-repo validation sweep

```bash
cd bloom-validator
for f in ../templates/*.html ../examples/*.html; do
  node src/index.ts "$f" || echo FAIL: $f
done
```

- [ ] Fix any template regressions.

### Task 7.3: Request code review (skill)

After Phase 0–2 land:

```bash
BASE_SHA=$(git rev-parse HEAD~N)  # commits in phase
HEAD_SHA=$(git rev-parse HEAD)
```

Dispatch reviewer per `requesting-code-review` skill. **Do not merge** until Critical = 0 and Important addressed or explicitly deferred with README notes.

---

## Phase 8 — Optional enhancements (Minor)

- [ ] `semantic-html.ts`: compute line from `<body>` offset instead of always `line: 1`
- [ ] Add `bloom-validate --help` test in `validator.test.ts`
- [ ] Marketplace README badge: “validator tests passing”
- [ ] Consider contrast rule v2 with real WCAG math (separate plan)

---

## Suggested PR / commit breakdown

| PR | Phases | Title |
|----|--------|-------|
| 1 | 0–1 | `fix(validator): unblock tests, normalize Rule interface` |
| 2 | 2–3 | `feat(validator): implement stub rules + responsive + placeholder` |
| 3 | 4 | `feat(validator): security S7, external URLs, doc renumber` |
| 4 | 5 | `feat(templates): replace placeholder shells with real starters` |
| 5 | 6–7 | `docs: README accuracy, harness files, CI` |

User preference: single branch vs stacked PRs — either works; phases are ordered by dependency.

---

## Acceptance checklist (definition of done)

- [ ] `cd bloom-validator && npm test` — 100% pass
- [ ] No `lineFromOffset` imports; every rule has `id` + `ruleName` on issues
- [ ] `invalid-dialog-apis.html` tests Rule 12 only; S5 stays in `invalid-security.html`
- [ ] All 15 templates + 3 examples pass `bloom-validate` with zero errors
- [ ] README tree matches disk; `AGENTS.md` exists at repo root
- [ ] `droids/bloom.md` and `docs/security.md` S1–S10 numbering aligned
- [ ] GitHub Actions green on `main`
- [ ] Code review skill: **Ready to merge: Yes** for validator; **OSS/marketplace: Yes**

---

## Spec coverage self-review

| Review finding | Plan task |
|----------------|-----------|
| Critical: broken import | Phase 0 |
| Critical: Issue shape | Phase 0 |
| Critical: dialog/fixture mismatch | Phase 0 |
| Critical: docs overclaim | Phase 6.4, 2.8 |
| Important: 8 stubs | Phase 2 |
| Important: rules 5–7, 9, 11, 13 | Phase 2–3 |
| Important: security gaps | Phase 4 |
| Important: thin templates | Phase 5 |
| Important: README paths | Phase 6 |
| Important: fixture split | Phase 0 |
| Important: S7 doc drift | Phase 4.4 |
| Minor: Rule id, duplicate import | Phase 1 |
| Minor: semantic line 1 | Phase 8 |
| Minor: CI | Phase 7 |
| Minor: bracket placeholders | Phase 5.2 |

**Deferred with documentation:** Full WCAG contrast automation (Task 2.7 Option B), perfect Rule 11 detection.

---

## Estimated effort

| Phase | Hours (skilled dev) |
|-------|---------------------|
| 0 | 0.5 |
| 1 | 0.5 |
| 2 | 4–6 |
| 3 | 2–3 |
| 4 | 2–3 |
| 5 | 6–10 |
| 6 | 2–3 |
| 7 | 0.5 |
| **Total** | **~18–26 h** |

---

## Execution handoff

Plan saved. Choose how to implement:

1. **Subagent-driven (recommended)** — one subagent per phase/task, code review after Phase 0 and Phase 2.
2. **Inline in this session** — execute Phase 0 immediately, checkpoint, continue.

Which approach do you want?
