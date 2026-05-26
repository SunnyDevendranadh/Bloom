<!-- Generated from droids/bloom-core.md + droids/bloom-plan.md — run scripts/sync-skill-files.sh -->
# Bloom — Self-Contained HTML Artifact Skill

Produce **self-contained `.html` files** as agent output. Once activated, every substantial artifact blooms from flat markdown into a browsable `.html` file.

---

## Bloom Mode

**Per-session, sticky.** Activates on `/bloom`, `/bloom-on`, `/bloom-mode`, or phrases "bloom on", "let it bloom", "bloom mode on", "activate bloom", "go bloom". Auto-activates if `.bloom` file exists at repo root. Deactivates on `/bloom-off`, `/no-bloom`, "bloom off", "stop bloom". On first activation: confirm mode + deactivation command in plain text. No HTML splash screen.

**Produces HTML** for: reports, reviews, comparisons, docs, plans, explainers, diagrams, decks, timelines, triage boards, editors, glossaries — anything beyond a few sentences of structured markdown. Reply with a single plain-text path line (e.g., `Wrote ./bloom/sprint-44-status.html`). Never dump HTML source into chat.

**Stays plain text** for: one-liners, tool status, errors, short questions, code edits, commit/PR metadata, shell output. Rule of thumb: actionable in under 5 seconds → plain text; skim-later → HTML.

### Companion rule

Reserved `.md` files (`README.md`, `CLAUDE.md`, `AGENTS.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `LICENSE`, paths under `.github/`, `.factory/`, `.cursor/`, `.windsurf/`, `.continue/`, `.claude/`): write the canonical `.md` AND a companion `.html` next to it. Non-reserved docs default to `.html` primary unless user asks for markdown.

### Output location

- Companion: alongside original (`README.md` → `README.html`)
- Free-standing: `./bloom/<date>-<slug>.html` (create `./bloom/` if needed)

---

## Design System

```css
:root {
  --ivory:    #FAF9F5;  --slate:    #141413;
  --clay:     #D97757;  --oat:      #E3DACC;
  --olive:    #788C5D;  --rust:     #B04A3F;
  --gray-100: #F0EEE6;  --gray-300: #D1CFC5;
  --gray-500: #87867F;  --gray-700: #3D3D3A;
  --white:    #FFFFFF;
  --serif: ui-serif, Georgia, "Times New Roman", serif;
  --sans:  system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --mono:  ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;
}
```

`--clay`=accent/CTA, `--olive`=success, `--oat`=warm fill, `--rust`=danger, `--slate`=strong text, `--gray-500`=muted, `--gray-300`=borders, `--gray-100`=subtle fills.

---

## Construction Rules

1. **Single file** — All HTML/CSS/JS in one `.html`. No external deps, CDN, or build step. Works via `file://`.
2. **CSS custom properties** — Use `var(--clay)` etc. Never hard-code hex in component styles.
3. **Semantic HTML** — `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<details>`, `<figure>`, `<table>`, `<dl>` over bare `<div>`.
4. **Inline JS only** — Max ~60 lines. No frameworks or imports.
5. **Responsive** — `max-width` 860–1120px, `clamp()` type, breakpoints at 640px and 960px.
6. **Export** — "Copy as markdown/JSON" with Clipboard API + `execCommand('copy')` fallback on editor artifacts.
7. **Print-friendly** — Core content readable without JS. `<details>` over JS toggles. Print styles hide toolbars.
8. **Accessible** — `aria-label` on SVGs, one `<h1>`, no skipped levels, visible focus, keyboard nav.
9. **No placeholders** — Real, specific content only. No Lorem ipsum or TODO stubs.
10. **Viewport meta** — Always `<meta name="viewport" content="width=device-width, initial-scale=1">`.
11. **Progressive enhancement** — All text/structure visible without JS.
12. **No dialogs** — No `alert()`, `prompt()`, `confirm()`. Use inline toasts.

**Security:** No external deps (S1). No eval/Function/string-setTimeout (S2). No innerHTML with untrusted content (S3). No fetch/XHR/WebSocket (S4). CSP-compatible — addEventListener only (S5). No executable data URIs (S6). Sanitize clipboard — textContent, not innerHTML (S7). No `javascript:` URIs (S8).

---

## HTML Skeleton

```html
<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>[Specific title]</title><style>
:root{--ivory:#FAF9F5;--slate:#141413;--clay:#D97757;--oat:#E3DACC;--olive:#788C5D;--rust:#B04A3F;--gray-100:#F0EEE6;--gray-300:#D1CFC5;--gray-500:#87867F;--gray-700:#3D3D3A;--white:#FFF;--serif:ui-serif,Georgia,"Times New Roman",serif;--sans:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;--mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace}
*{margin:0;padding:0;box-sizing:border-box}body{background:var(--ivory);color:var(--gray-700);font-family:var(--sans);font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased;padding:56px 24px 120px}.page{max-width:860px;margin:0 auto}</style>
</head><body><div class="page"><!-- semantic content --></div>
<script>/* addEventListener only; no eval, no innerHTML with user data */</script>
</body></html>
```

---

**Self-check:** Substantial artifacts → `.html` file (not inline) • Reserved `.md` companions updated • Free-standing under `./bloom/` • Trivial answers stay plain text • Deactivation triggers honored

---

## Bloom Plan (decision-transparent planning)

# Bloom Plan — Decision-Transparent Planning Skill

Decision-transparent planning with Cursor's Plan-Execute-Verify architecture. Activate: `/bloom-plan`, `/plan`, "plan this'", "make a plan". Deactivate: `/plan-off`, "stop planning". Artifacts → `.cursor/plans/`. On activation: confirm mode + deactivation command in plain text. Plan mode also activates bloom mode (plans produce HTML).

---

## The Loop

1. **Research (read-only):** Only `read_file`, `codebase_search`, `grep_search`, `list_dir`, `readLints`, `web_search`, `web_fetch`, `ask_question`. No edits, no shell, no code execution.
2. **Plan:** Write `.cursor/plans/<name>.plan.md` + `.cursor/plans/<name>.plan.html`. Name = kebab-case.
3. **Approve:** Pause for explicit approval. User may approve, edit `.plan.md`, reject, or scope down.
4. **Execute:** Enable writes. Implement step-by-step. Update checklist after each step.
5. **Verify:** Re-read changed files. Run lint/test. Confirm against plan. Update status.

---

## Scale

| Scale | Trigger | Decisions | Depth |
|-------|---------|-----------|-------|
| **Greenfield** | No codebase / `0.x` no patterns | Tech stack → impl order (every foundational decision) | Full tables |
| **Brownfield** | Existing codebase with patterns | Scope, patterns, impl details, step order, rollback | Tables for impl choices only |
| **Phase** | Master plan exists; plan one phase | Tasks, prerequisites, verification, edge cases | Tables for "which approach" |

---

## Decision Tables (mandatory)

Every decision MUST include 3–4 alternatives:

```
#### Decision: [what]

**Chosen:** [Option] — [rationale]

| # | Option | Example | Benchmark | Why not chosen |
|---|--------|---------|-----------|----------------|
| ✅ | [A] | [concrete: library/pattern/API] | [measurable metric] | — |
| 2 | [B] | [concrete] | [metric] | [specific reason] |
| 3 | [C] | [concrete] | [metric] | [specific reason] |
```

**Example** = concrete (library name, pattern, API — never vague). **Benchmark** = verifiable ("2× faster in X", "38k GitHub stars", "0 deps", "used by Stripe"). **Why not chosen** = specific ("adds 450KB bundle", "no TS support", "abandoned 2024").

In `.plan.html`: render each table as an expandable card — chosen in `--clay`, alternatives in `--gray-700`, collapsible rationale.

---

## Plan Structure

1. **Header** — name, scale, date, status (`research → draft → approved → executing → verified`)
2. **Context** — 2–4 sentences; link prior plans if phase planning
3. **Prerequisites** — checkbox list
4. **Decisions** — decision tables per area
5. **Steps** — files, action, verification per step
6. **Risks** — table: risk / likelihood / impact / mitigation
7. **Verification** — lint ✓, typecheck ✓, tests ✓, no regressions ✓, HTML companion ✓

---

## HTML Companion

Follow Bloom Construction Rules (1–12) and Security Rules (S1–S8). Required features:

1. Decision cards — expandable, chosen in `--clay`
2. Checklist — `localStorage`-persisted
3. Risk matrix — `--rust`/`--clay`/`--olive` cells
4. Status timeline — Research → Draft → Approved → Executing → Verified
5. Scale badge — Greenfield / Brownfield / Phase Planning
6. Copy as markdown — Bloom clipboard pattern
7. Print stylesheet — hide toolbar

---

**Self-check:** Decision tables have 3–4 alternatives ✓ • Scale matches project ✓ • File paths specific ✓ • Steps ordered with verification ✓ • `.plan.md` + `.plan.html` in `.cursor/plans/` ✓ • User approved before execution ✓ • No writes in research ✓
