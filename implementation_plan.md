# Implementation Plan — `/bloom-plan` Skill

## What Was Built

Two skill definition files implementing the `/bloom-plan` skill with Cursor's Plan-Execute-Verify architecture as the brain, enhanced with decision transparency (3-4 alternatives + benchmarks per decision) and Bloom HTML output.

### Files Created

| File | Purpose | Harness |
|------|---------|---------|
| `droids/bloom-plan.md` | Canonical skill definition — source of truth | All (derive from this) |
| `droids/bloom-plan-index.md` | Maintainer index, file listing, sync commands | Internal |
| `.cursor/rules/bloom-plan.mdc` | Cursor rule with YAML frontmatter | Cursor |
| `.claude/skills/bloom-plan/SKILL.md` | Claude Code skill with YAML frontmatter | Claude Code |
| `plugins/bloom/skills/bloom-plan/SKILL.md` | Plugin marketplace package skill | Claude Code marketplace |
| `AGENTS.md` | Synced: includes bloom-core + bloom-plan | Codex CLI, Codex App, OpenCode, Copilot CLI, Aider |
| `GEMINI.md` | Synced: includes bloom-core + bloom-plan | Gemini CLI |

### Harnesses with runtime-only install targets (NOT tracked in git)

Users copy from `droids/bloom-plan.md` to their harness-native location:

| Harness | Target location | Install command |
|---------|----------------|----------------|
| Factory Droid | `.factory/droids/bloom-plan.md` (project) or `~/.factory/droids/bloom-plan.md` (global) | `cp droids/bloom-plan.md .factory/droids/bloom-plan.md` |
| Continue | `.continue/rules/bloom-plan.md` | `cp droids/bloom-plan.md .continue/rules/bloom-plan.md` |
| GitHub Copilot VS Code | `.github/copilot-instructions.md` (append) | Append snippet from `droids/bloom-plan.md` |
| Windsurf | `.windsurfrules` (append) | Append snippet from `droids/bloom-plan.md` |
| Pi / General | System prompt | Paste from `droids/bloom-plan.md` |

---

## Architecture: Plan-Execute-Verify Loop

The `/bloom-plan` skill follows the Plan-Execute-Verify architecture used by leading AI coding tools:

| Plan Phase | `/bloom-plan` Implementation |
|---|---|
| Read-only research (search, read, grep, list, lint) | Phase 1 — Research: identical tool restrictions, no write access |
| Plan generation → `.cursor/plans/` | Phase 2 — Plan: `.cursor/plans/<name>.plan.md` + interactive `.plan.html` companion |
| User reviews and edits the plan | Phase 3 — Approval: user approves, edits, scopes down, or rejects |
| Execution with write tools enabled | Phase 4 — Execute: write tools enabled, step-by-step implementation |
| Validation (lint, test, confirm) | Phase 5 — Verify: re-read files, run lint/test, confirm against plan |

**What `/bloom-plan` adds:**

1. **Decision transparency** — Every decision (architectural, implementation, task-level) includes 3-4 alternatives with concrete examples, benchmarks, and explicit "why not chosen" reasoning.
2. **Adaptive planning scale** — Automatically detects whether the project is greenfield, brownfield, or phase-of-a-larger-plan, and adjusts planning depth accordingly.
3. **Self-audit** — Rates benchmark quality (Strong/Weak/Empty) before presenting the plan. Weak benchmarks get strengthened; trivial decisions collapse to one-liners.
4. **Cross-cutting analysis** — Every plan covers security surface, test strategy, observability, and rollback — not just implementation steps.
5. **Contingency paths** — Every step and risk includes an exact recovery plan if something fails.
6. **Execution context validation** — Preconditions (tools, runtimes, package managers) are validated during research and noted in the plan.
7. **Bloom HTML companion** — Every plan generates an interactive `.plan.html` file with decision cards, checklists, risk matrices, and a status timeline.
8. **Explicit approval gate** — The agent pauses for user approval before execution.

---

## Adaptive Planning Scale

The skill detects and adjusts to three scales:

| Scale | Trigger | Depth |
|-------|---------|-------|
| **A — Greenfield** | No existing codebase, or `0.x` with no patterns | Full-scope: tech stack, architecture, tooling, conventions, security, performance. Every foundational decision gets a decision table. |
| **B — Brownfield** | Existing codebase with established patterns | Execution-level: which files change, pattern consistency, implementation details, step order, rollback risks. Decisions scoped to the change. |
| **C — Phase Planning** | Master plan exists; user requests planning for a phase | Task-level: atomic steps with file paths, prerequisites, verification criteria. Decisions at "which implementation approach" level. |

All three scales produce the same decision table format — the difference is what gets decided.

---

## Decision Transparency Format

Every decision in every plan includes a table with 3-4 alternatives:

```markdown
#### Decision: [What you're deciding]

**Chosen:** [Option] — [rationale]

| # | Option | Example | Benchmark | Why not chosen |
|---|--------|---------|-----------|----------------|
| ✅ | Option A | Concrete code/library/pattern | Measurable metric | — |
| 2 | Option B | Concrete example | Metric | Specific reason |
| 3 | Option C | Concrete example | Metric | Specific reason |
| 4 | Option D | Concrete example | Metric | Specific reason |
```

**Rules:**
- "Example" must be concrete — a library name, code pattern, API, not vague descriptions.
- "Benchmark" must be verifiable — perf numbers, GitHub stars, production usage, dependency counts.
- "Why not chosen" must be specific — exact bundle sizes, missing features, version issues.

---

## HTML Companion Features

Every `.plan.html` file includes:

1. **Decision cards** — interactive expandable cards, chosen option in `--clay`, alternatives in `--gray-700`
2. **Implementation checklist** — checkboxes persisted to `localStorage`
3. **Risk matrix** — color-coded using `--rust`/`--clay`/`--olive`
4. **Status timeline** — Research → Draft → Approved → Executing → Verified
5. **Scale badge** — Greenfield / Brownfield / Phase Planning
6. **Copy as markdown** — Bloom clipboard utility pattern
7. **Print stylesheet** — hides toolbar, clean print output

All Bloom Construction Rules and Security Rules apply (single file, CSS custom properties, semantic HTML, inline JS only, responsive, no external deps, no eval, no network requests, CSP compatible).

---

## Open Questions (Resolved)

| Question | Resolution |
|----------|-----------|
| Plan location: `.cursor/plans/` vs `./bloom/plans/`? | `.cursor/plans/` — this is what Cursor's native plan mode reads. Staying here means Cursor's UI can discover and display the plans. |
| Include automated validation scripts? | No — keep the SKILL.md focused on agent instructions. A validation script could be added to `scripts/` separately if desired. |
| Personal global skill at `~/.cursor/skills/`? | Not created — Cursor uses `.cursor/rules/*.mdc` for project-local rules. A global version could go in `~/.cursor/rules/` if needed later. |

---

## Verification

### Manual Verification Steps

1. Open a Cursor workspace and type `/bloom-plan` in agent mode
2. Verify the agent enters research phase (read-only tools only)
3. Verify the agent produces both `.plan.md` and `.plan.html` in `.cursor/plans/`
4. Verify every decision has 3-4 alternatives with concrete examples and benchmarks
5. Verify the agent pauses for approval before execution
6. Open the `.plan.html` file in a browser and check:
   - Decision cards render correctly
   - Checkboxes persist across reloads
   - Copy as markdown works
   - Print stylesheet hides toolbar
   - Responsive layout works at 640px, 960px, and 1200px widths

### Automated Checks

- Lint the `.mdc` frontmatter (valid YAML with description, globs, alwaysApply)
- Validate the HTML companion against Bloom Construction Rules (no external deps, CSS custom properties, semantic HTML, viewport meta)
