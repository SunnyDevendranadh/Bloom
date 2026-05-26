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
