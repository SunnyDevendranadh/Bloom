<!-- Generated from droids/bloom-core.md + droids/bloom-plan.md — run scripts/sync-skill-files.sh -->
# Bloom — Self-Contained HTML Artifact Skill

Produce **self-contained `.html` files** as agent output. Once activated, every substantial artifact blooms from flat markdown into a browsable `.html` file.

---

## Bloom Mode

**Per-session, sticky.** Activates on `/bloom`, `/bloom-on`, `/bloom-mode`, or phrases "bloom on", "let it bloom", "bloom mode on", "activate bloom", "go bloom". Auto-activates if `.bloom` file exists at repo root. Deactivates on `/bloom-off`, `/no-bloom`, "bloom off", "stop bloom". On first activation: confirm mode + deactivation command in plain text. No HTML splash screen. Off by default at session start; most recent toggle wins.

**Produces HTML** for: reports, reviews, comparisons, docs, plans, explainers, diagrams, decks, timelines, triage boards, editors, glossaries — anything beyond a few sentences of structured markdown. Reply with a single plain-text path line (e.g., `Wrote ./bloom/sprint-44-status.html`). Never dump HTML source into chat.

**Stays plain text** for: one-liners, tool status, errors, short questions, code edits, commit/PR metadata, shell output. Rule of thumb: actionable in under 5 seconds → plain text; skim-later → HTML.

### Companion rule

Reserved `.md` files (`README.md`, `CLAUDE.md`, `AGENTS.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `LICENSE`, paths under `.github/`, `.factory/`, `.cursor/`, `.windsurf/`, `.continue/`, `.claude/`): write both the canonical `.md` (source of truth) AND a companion `.html` next to it that uses the full design system and interactivity. Non-reserved docs default to `.html` primary unless user asks for markdown.

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

**Self-check:** Substantial artifacts → `.html` file (not inline, reserved `.md` companions updated too) • Free-standing under `./bloom/` (kebab-case) • Trivial answers stay plain text • Deactivation triggers honored before responding

---

## Bloom Plan (decision-transparent planning)

# Bloom Plan — Decision-Transparent Planning Skill

Decision-transparent planning with Plan-Execute-Verify. Activate: `/bloom-plan`, `/plan`, "plan this", "make a plan". Deactivate: `/plan-off`, "stop planning". Artifacts → `.cursor/plans/`. On activation: confirm mode + deactivation command in plain text. Plan mode auto-activates bloom mode (plans produce HTML).

---

## The Loop

1. **Research (read-only):** Only read, search, grep, list, lint, web_search, web_fetch, ask_question. No edits, no shell commands, no code execution. Validate preconditions: check what tools, languages, and runtimes are available in the execution environment. Note these in Context.
2. **Plan:** Write `.cursor/plans/<name>.plan.md` + `.cursor/plans/<name>.plan.html`. Name = kebab-case. Run self-audit (below) before presenting the plan.
3. **Approve:** Pause for explicit approval. User can: approve (proceed), edit the `.plan.md` (re-read and resume), reject (stop), or scope down.
4. **Execute:** Implement step-by-step. Update checklist after each step. If a step fails, follow its contingency path (see Steps format below).
5. **Verify:** Re-read all modified files — confirm every change matches the plan. Run lint, typecheck, and tests. Fix failures, re-verify, update plan. Transition status `executing` → `verified`.

---

## Scale

Detect from project context and user prompt:

| Scale | Trigger | Decision scope |
|-------|---------|----------------|
| **Greenfield** | No codebase, or `0.x` with no conventions | Every foundational decision gets a full table (stack, architecture, tooling, security, perf, impl order) |
| **Brownfield** | Established codebase with patterns | Implementation-level choices get tables; foundational decisions locked |
| **Phase** | Master plan exists, planning a phase | Task-level "which approach" tables; atomic steps with file paths |

---

## Self-Audit (mandatory, before presenting plan)

Rate every decision's benchmark quality on a 3-point scale:

| Rating | Criteria | Action |
|--------|----------|--------|
| **Strong** | Verifiable metric (stars, deps, perf numbers, prod usage) | Keep table as-is |
| **Weak** | Observation only ("dir exists", "feels cleaner", "implies curated") | Strengthen to a metric, or collapse to one-line rationale |
| **Empty** | All alternatives interchangeable, choice is trivial | Skip table; write one-line rationale |

**Collapse rule:** If all alternatives are equally valid (e.g., directory location for a one-file script, language choice for a single `print` statement), DO NOT force a table. Write: "Decision: [what]. Chosen: [option]. Alternatives considered: [B, C] — not meaningfully different." This prevents ceremony over substance.

Anti-pattern (from hello-world test): "Dir already in repo" as a benchmark. Fix: "0 added deps, no packaging impact, pre-existing `.gitignore` cover."

---

## Decision Tables

Every non-trivial decision (per self-audit) MUST include 3–4 alternatives:

```
#### Decision: [what]

**Chosen:** [Option] — [rationale]

| # | Option | Example | Benchmark | Why not chosen |
|---|--------|---------|-----------|----------------|
| ✅ | [A] | [concrete: library/pattern/API] | [measurable metric] | — |
| 2 | [B] | [concrete] | [metric] | [specific reason] |
| 3 | [C] | [concrete] | [metric] | [specific reason] |
```

**Example** = concrete (library name, pattern, API — never vague). **Benchmark** = verifiable and specific: "38k stars", "0 deps", "2× faster", "used by Stripe" — never "dir exists" or "feels right". **Why not chosen** = specific tradeoff: "adds 450KB", "no TS support", "abandoned 2024".

In `.plan.html`: expandable `<details>` cards — chosen in `--clay`, alternatives in `--gray-700`.

---

## Plan Structure

1. **Header** — name, scale, date, status. Transitions: `research` → `draft` → `approved` → `executing` → `verified`
2. **Context** — what and why. 2–4 sentences. Concrete: "JWT-based REST API so mobile app authenticates without session cookies." Note execution environment (tools, runtimes, package managers available). Link prior plans if phase planning.
3. **Prerequisites** — checkbox list of blockers to resolve first. Include tools/runtimes verified available during research.
4. **Decisions** — one table per non-trivial area (self-audited). Greenfield: every foundation. Brownfield: implementation only. Phase: task-level only.
5. **Steps** — ordered, atomic. Each step: files to create/modify, specific action, verification criteria, **contingency** (exact revert/recovery if step fails). Use concrete file paths ("edit `src/config/auth.ts` line 24-38", not "update config").
6. **Cross-cutting** — security surface (new deps, auth, data flow), test strategy (unit/integration/e2e), observability (logging, metrics, error paths), rollback plan (revert path if any step fails).
7. **Risks** — table: Risk | Likelihood (low/med/high) | Impact (low/med/high) | Mitigation | Contingency
8. **Verification** — lint ✓, typecheck ✓, tests ✓, no regressions ✓, `.plan.html` companion ✓

---

## HTML Companion

Follow Bloom Construction Rules (1–12) and Security Rules (S1–S8). Required: decision cards as expandable `<details>`, checklist persisting to `localStorage`, risk matrix (color-coded: `--rust`=high, `--clay`=med, `--olive`=low), status timeline (Research→Draft→Approved→Executing→Verified), scale badge, copy-as-markdown button (Clipboard API + `execCommand('copy')` fallback), `@media print` stylesheet.

---

**Self-check (before finalizing any plan):**
- [ ] Self-audit completed: weak benchmarks strengthened or collapsed, empty tables skipped
- [ ] Every kept decision has 3–4 alternatives with concrete examples and verifiable benchmarks
- [ ] Scale correctly detected (not over-planning trivial scope, not under-planning greenfield)
- [ ] Every step has a contingency path ("if this fails, revert by...")
- [ ] Cross-cutting section covers security, testing, observability, rollback
- [ ] Execution environment validated and noted in prerequisites
- [ ] All file paths are specific and real
- [ ] `.plan.md` and `.plan.html` both written to `.cursor/plans/`
- [ ] User explicitly approved before execution
- [ ] No files were modified during research phase
