---
name: bloom-plan
description: Decision-transparent planning. 3-4 alternatives per decision, adaptive scale, interactive HTML companions. /bloom-plan or /plan to activate. /plan-off to deactivate.
---

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
