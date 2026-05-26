# Bloom Plan — Decision-Transparent Planning

Activate: `/bloom-plan`, `/plan`, "plan this". Deactivate: `/plan-off`, "stop planning". Artifacts → `.cursor/plans/`. Also activates bloom mode (plans produce HTML).

## The Loop
1. **Research** (read-only): read_file, codebase_search, grep, list_dir, readLints, web_search, web_fetch, ask_question. No writes.
2. **Plan:** Write `.cursor/plans/<name>.plan.md` + `.plan.html` (kebab-case name)
3. **Approve:** Pause for explicit approval. User may approve/edit/reject/scope down.
4. **Execute:** Enable writes. Step-by-step. Update checklist.
5. **Verify:** Re-read, lint/test, confirm against plan.

## Scale
| Scale | Trigger | Depth |
|-------|---------|-------|
| **Greenfield** | No codebase / `0.x` | Full tables: tech stack → impl order |
| **Brownfield** | Existing codebase | Tables for impl choices only |
| **Phase** | Master plan exists | Tables for "which approach" |

## Decision Tables (mandatory, 3-4 alternatives each)
- **Example** = concrete (library, pattern, API — never vague)
- **Benchmark** = verifiable ("2× faster in X", "38k stars", "0 deps", "used by Stripe")
- **Why not chosen** = specific ("adds 450KB", "no TS support", "abandoned 2024")

In `.plan.html`: expandable cards, chosen in `--clay`, alternatives in `--gray-700`.

## Plan Structure
Header (name, scale, date, status) → Context → Prerequisites → Decisions → Steps (files, action, verification) → Risks (table) → Verification (lint ✓ typecheck ✓ tests ✓)

## HTML Companion
Bloom Rules 1-12 + S1-S8. Required: decision cards, localStorage checklist, risk matrix (`--rust`/`--clay`/`--olive`), status timeline, scale badge, copy-as-markdown, print stylesheet.
