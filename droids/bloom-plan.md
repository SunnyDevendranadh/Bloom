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
