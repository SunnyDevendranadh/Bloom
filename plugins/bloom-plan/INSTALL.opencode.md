# Bloom Plan — Install for OpenCode

## Quick Install

Copy the skill into your project:

```bash
# The AGENTS.md at the repo root already includes bloom-plan.
# If your project doesn't have one, copy it:
cp AGENTS.md /path/to/your-project/AGENTS.md
```

Or append the bloom-plan section to an existing `AGENTS.md`:

```bash
# Extract just the bloom-plan section from the canonical source
sed -n '/## Bloom Plan/,/^---$/p' AGENTS.md >> /path/to/your-project/AGENTS.md
```

## Activation

Send `/bloom-plan` or "plan this" in your first OpenCode message. The skill stays active for the session. Deactivate with `/plan-off`.

## What It Does

Bloom Plan follows Cursor's Plan-Execute-Verify architecture:

1. **Research** (read-only) — explores codebase, asks clarifying questions
2. **Plan** — writes `.cursor/plans/<name>.plan.md` + interactive `.plan.html`
3. **Approval** — pauses for your explicit approval
4. **Execute** — implements step-by-step after approval
5. **Verify** — runs lint/test, confirms against plan

Every decision includes 3-4 alternatives with benchmarks — no "trust me" choices.

Planning scale adapts automatically: Greenfield (full-scope), Brownfield (execution-level), or Phase Planning (task-level).
