<!-- Generated from droids/bloom-core.md + droids/bloom-plan.md — edit sources and run scripts/sync-skill-files.sh -->
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

Decision-transparent planning with Cursor's Plan-Execute-Verify architecture. Activate: `/bloom-plan`, `/plan`, "plan this'", "make a plan". Deactivate: `/plan-off`, "stop planning". Artifacts → `.cursor/plans/`. On activation: confirm mode + deactivation command in plain text. Plan mode also activates bloom mode (plans produce HTML).

---

## The Loop

1. **Research (read-only):** Only `read_file`, `codebase_search`, `grep_search`, `list_dir`, `readLints`, `web_search`, `web_fetch`, `ask_question`. You MUST NOT edit, create, or delete files (except plan artifacts). You MUST NOT run shell commands or execute code.
2. **Plan:** Write `.cursor/plans/<name>.plan.md` + `.cursor/plans/<name>.plan.html`. Name = kebab-case.
3. **Approve:** Pause for explicit approval. User can: approve (proceed), edit the `.plan.md` (re-read and resume), reject (stop, no execution), or scope down (limit to specific steps or a single phase).
4. **Execute:** Enable writes. Implement step-by-step. Update checklist after each step.
5. **Verify:** Re-read all modified files — confirm every change matches the plan. Run lint, typecheck, and tests. If failures: fix, re-verify, update plan. Update plan status from `executing` → `verified` in both `.plan.md` and `.plan.html`.

---

## Scale

Detect which scale applies from the project context and user's prompt:

| Scale | When to use | Deciding what | Decision scope |
|-------|-------------|--------------|----------------|
| **Greenfield** | No codebase exists, or a `0.x` project where no conventions/patterns are established | Tech stack, architecture, project structure, tooling, conventions, security, performance, impl order | Every foundational decision gets a full table with 3–4 alternatives |
| **Brownfield** | Established codebase with existing patterns; user asks to plan a feature or change within it | Which files change, how to match existing patterns, specific data structures or algorithms, exact step order, what could break | Implementation-level choices get tables; foundational decisions are locked |
| **Phase** | A master plan already exists; user asks to plan a specific phase of it | Exact tasks with file paths, what must be done first, how to verify each task, edge cases and regressions | Each task gets a "which approach" table |

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

Real example — what good vs bad looks like:

```
#### Decision: ORM for user auth

**Chosen:** Prisma — type-safe, migrations built-in

| # | Option    | Example                 | Benchmark                          | Why not chosen            |
|---|-----------|-------------------------|------------------------------------|---------------------------|
| ✅ | Prisma    | `prisma` v5, PostgreSQL | 38k★, 1.2M wky, TS-native        | —                         |
| 2 | Drizzle   | `drizzle-orm` v0.29     | 22k★, 0 deps, 3× smaller          | No built-in migrations    |
| 3 | Sequelize | `sequelize` v6          | 29k★, mature, MySQL/Postgres/MSSQL| JS-only, no TS safety     |
```

In `.plan.html`: render each table as an expandable card — chosen in `--clay`, alternatives in `--gray-700`, collapsible rationale.

---

## Plan Structure

1. **Header** — plan name, scale (Greenfield/Brownfield/Phase), date, status. Status transitions: `research` → `draft` → `approved` → `executing` → `verified`
2. **Context** — what we're building and why. 2–4 sentences. Be specific: not "building an API" but "building a JWT-based REST API so the mobile app can authenticate without session cookies". Link any prior plans if phase planning.
3. **Prerequisites** — checkbox list of blockers that must be resolved first
4. **Decisions** — one decision table per area (format above). For Greenfield: cover each foundation. For Brownfield: only implementation choices. For Phase: only task-level approaches.
5. **Steps** — ordered, atomic. Each: files to create/modify, specific action, verification criteria. Must include a concrete file path (not "update config" but "edit `src/config/auth.ts` line 24-38")
6. **Risks** — table with columns: Risk | Likelihood (low/med/high) | Impact (low/med/high) | Mitigation
7. **Verification** — plan verification: lint passes ✓, typecheck passes ✓, tests pass (or new tests written) ✓, no regressions ✓, `.plan.html` companion generated and interactive ✓

---

## HTML Companion

Follow Bloom Construction Rules (1–12) and Security Rules (S1–S8). Required features:

1. **Decision cards** — each decision table as an expandable `<details>` card. Chosen option highlighted in `--clay`, alternatives in `--gray-700`. Click to expand/collapse rationale.
2. **Implementation checklist** — each step as a checkbox that persists to `localStorage` across reloads
3. **Risk matrix** — visual table with color-coded cells: `--rust` for high impact/likelihood, `--clay` for medium, `--olive` for low
4. **Status timeline** — shows current plan status with all phases: Research → Draft → Approved → Executing → Verified. Current phase highlighted.
5. **Scale badge** — displays Greenfield, Brownfield, or Phase Planning
6. **Copy as markdown** — button using Bloom clipboard pattern (Clipboard API + `execCommand('copy')` fallback)
7. **Print stylesheet** — `@media print` hides toolbar, ensures tables and checklists print without UI chrome

---

**Self-check (before finalizing any plan):**
- [ ] Every decision has 3–4 alternatives with concrete examples and verifiable benchmarks
- [ ] Chosen option is clearly marked with justification
- [ ] Scale correctly detected (not over-planning brownfield, not under-planning greenfield)
- [ ] All file paths are specific and real (no "update config" — must be "`src/config/auth.ts` line 24")
- [ ] Steps are ordered correctly with verification criteria per step
- [ ] Risk table has likelihood and impact as low/med/high
- [ ] `.plan.md` and `.plan.html` both written to `.cursor/plans/`
- [ ] User explicitly approved before execution
- [ ] No files were modified during research phase

---

## Patterns appendix (optional)

For triage boards, annotated diffs, slide decks, and clipboard/SVG/diff code, see [droids/bloom-patterns.md](./droids/bloom-patterns.md) in the Bloom repository (or vendor that file into your project).
