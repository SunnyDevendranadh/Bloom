# Bloom Skill Developer-Utility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Bloom’s skills genuinely useful across harnesses — not only on Claude Code — by fixing thin installs, reducing token cost, shipping interactive reference templates, and aligning docs with what developers actually get.

**Architecture:** Treat `droids/bloom.md` as the **source of truth**, split into **`bloom-core.md`** (session + rules + skeleton, ~180 lines) and **`bloom-patterns.md`** (categories + copy-paste patterns, ~450 lines). Generated/synced consumer files: `AGENTS.md` (core + pointer), `GEMINI.md` (core inlined), `.cursor/rules/bloom.mdc` (core + triggers, ~120 lines). Keep Claude `SKILL.md` as the optimized entry (~225 lines) with explicit link to patterns. Add **2 interactive templates** that prove Category 4/9. Document harness limits (no runtime `/bloom` on all tools).

**Tech Stack:** Markdown skill files, HTML templates, existing `bloom-validator`, no new runtime.

---

## Evaluation findings → plan mapping

| Finding | Phase | Task |
|---------|-------|------|
| Cursor `bloom.mdc` only 6 lines | 2 | Expand mdc with core skill inlined |
| `GEMINI.md` unusable alone | 2 | Inline `bloom-core.md` |
| `droids/bloom.md` says copy full file to `.mdc` | 5 | Fix install instructions |
| 626-line `AGENTS.md` token cost | 3 | Split core vs patterns |
| No `.gitignore` for `./bloom/`, `.bloom` | 1 | Add + document |
| Category 9/4 promised, not shipped | 4 | `triage-board.html`, `animation-sandbox.html` |
| `/bloom` is convention not runtime | 1, 5 | Harness capability matrix |
| README oversells interactivity | 1, 4 | Honest positioning + SKILL category notes |
| Marketing vs templates mismatch | 4 | Template index in SKILL + README |

---

## File map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `droids/bloom-core.md` | Triggers, lifecycle, output rules, 12+8 rule summaries, skeleton, bloom self-check |
| Create | `droids/bloom-patterns.md` | 9 categories, clipboard/SVG/diff patterns, per-harness one-shots |
| Refactor | `droids/bloom.md` | Thin wrapper: title + “canonical split” + include instructions OR concat script doc |
| Replace | `AGENTS.md` | `bloom-core.md` + appendix pointer |
| Replace | `GEMINI.md` | Full `bloom-core.md` content |
| Expand | `.cursor/rules/bloom.mdc` | Core + triggers (~100–140 lines, under Cursor rule size guidance) |
| Update | `.claude/skills/bloom/SKILL.md`, `plugins/bloom/skills/bloom/SKILL.md` | Category honesty + links to new templates |
| Create | `templates/triage-board.html` | Category 9 reference (DnD + export) |
| Create | `templates/animation-sandbox.html` | Category 4 reference (easing slider) |
| Create | `.gitignore` | `.bloom`, `bloom/`, optional `*.html` companions policy |
| Create | `docs/harness-capabilities.md` | Slash commands, sticky behavior, what each harness loads |
| Update | `README.md`, `docs/harness-setup.md`, `plugins/bloom/INSTALL.opencode.md` | Install paths, gitignore, core vs full skill |
| Create | `scripts/sync-agents.sh` (optional) | `cat bloom-core.md > AGENTS.md` for maintainers |

---

## Phase 1 — Developer ergonomics & honest positioning

**Exit criterion:** New contributor knows where artifacts go, what each harness loads, and README does not oversell interactivity.

### Task 1.1: Add `.gitignore` for agent artifacts

**Create:** `.gitignore`

```gitignore
# Bloom session artifacts (agent-generated; opt-in to commit)
.bloom
bloom/

# Optional: uncomment if you do not want HTML companions in git
# README.html
# AGENTS.html
# CLAUDE.html
```

- [ ] Add section to `README.md` under **Output convention** (or new **Using Bloom in your repo**):

```markdown
### Keeping your repo clean

Agent artifacts default to `./bloom/` and an optional `.bloom` session marker. Add the lines in [`.gitignore`](.gitignore) if you do not want those committed. Commit templates and hand-authored HTML; ignore dated agent drafts unless you want them in history.
```

### Task 1.2: Harness capabilities matrix

**Create:** `docs/harness-capabilities.md`

| Harness | What loads | `/bloom` recognized? | Sticky without re-prompt? | Full patterns available? |
|---------|------------|----------------------|---------------------------|--------------------------|
| Claude Code | `SKILL.md` → full rules on demand | Yes (skill) | Yes | Yes (repo or droids) |
| Cursor | `.cursor/rules/bloom.mdc` | Phrase only* | If rule in context | Patterns via repo link |
| Codex/OpenCode | `AGENTS.md` (core) | Phrase | Prompt-dependent | `bloom-patterns.md` in repo |
| Gemini | `GEMINI.md` (core) | Phrase | Prompt-dependent | Same |

\*Document: Cursor does not ship a Bloom runtime; triggers are natural-language + rule text.

- [ ] Link from `README.md` Installation section and `docs/harness-setup.md` intro.

### Task 1.3: README “Who is this for?” blurb

**Modify:** `README.md` (after opening paragraph)

Add ~5 sentences:

- Best for: PR reviews, status reports, plans, ADRs, incident docs via agents.
- Not for: replacing everyday coding chat or GitHub-native markdown review threads.
- Interactive editors: **skill teaches patterns**; **repo ships 2 interactive templates** + static report starters.

- [ ] Tone: factual, no hype.

---

## Phase 2 — Fix thin harness installs (Critical for Cursor/Gemini)

**Exit criterion:** Cursor rule and `GEMINI.md` standalone activate usable Bloom mode without opening another file.

### Task 2.1: Extract `droids/bloom-core.md`

**Create** by moving (not duplicating forever) these sections from `droids/bloom.md`:

1. Title + Bloom Mode (activation/deactivation triggers, `.bloom` file)
2. What gets produced as HTML / what stays plain text
3. Companion-file rule + output-location convention
4. Session memory (one paragraph)
5. Design System (`:root` tokens table — compact)
6. Construction Rules 1–12 (one paragraph each, no long code blocks)
7. Security Rules S1–S8 (one line each)
8. HTML Skeleton (full skeleton block — agents need this)
9. Bloom Self-Check checklist (6 items from end of droids)
10. Confirmation message templates (activate/deactivate)

**Target:** ≤ 200 lines.

- [ ] Do **not** include: 9 category essays, clipboard utility full code, SVG/diff CSS blocks, harness install matrix.

### Task 2.2: Extract `droids/bloom-patterns.md`

**Create** with remaining content:

- When to Use HTML (non-bloom mode)
- Document Categories 1–9 (full pattern descriptions)
- Clipboard Utility Pattern (full JS)
- SVG Diagram Pattern
- Diff Rendering Pattern + CSS
- Self-Check Checklist (file delivery, 12 items)
- Cross-harness install matrix + one-shot prompts

**Target:** ~400–450 lines.

### Task 2.3: Refactor `droids/bloom.md` as canonical index

**Replace body** with:

```markdown
# Bloom — Self-Contained HTML Artifact Skill

> **Maintainers:** Edit `bloom-core.md` and `bloom-patterns.md`. Run `scripts/sync-skill-files.sh` to regenerate consumer files.

## Files

| File | Audience |
|------|----------|
| [bloom-core.md](./bloom-core.md) | Every harness (session mode + rules) |
| [bloom-patterns.md](./bloom-patterns.md) | Deep reference when building complex UI |

## Full skill (single file)

To produce a monolithic skill for paste/install:

\`\`\`bash
cat bloom-core.md bloom-patterns.md > bloom-full.md
\`\`\`

`AGENTS.md` in the repo root is synced from `bloom-core.md` plus an appendix pointer.
```

### Task 2.4: Expand `.cursor/rules/bloom.mdc`

**Replace** 6-line pointer with **inlined `bloom-core.md`** content (YAML frontmatter unchanged).

Frontmatter addition:

```yaml
alwaysApply: false
```

(or `true` only if user wants bloom always on — default `false`, activate via phrases).

- [ ] Keep under ~15k characters if possible; if over, trim redundant examples in core before paste.
- [ ] End mdc with: `For category patterns (triage board, diff rows, slide deck), read droids/bloom-patterns.md in the Bloom repo or project vendor copy.`

### Task 2.5: Replace `GEMINI.md`

**Replace** one-liner with full contents of `bloom-core.md` (same as AGENTS.md body).

Add header:

```markdown
<!-- Synced from droids/bloom-core.md — do not edit here; edit source and run scripts/sync-skill-files.sh -->
```

### Task 2.6: Sync script (maintainer ergonomics)

**Create:** `scripts/sync-skill-files.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CORE="$ROOT/droids/bloom-core.md"
{
  echo "<!-- Generated from droids/bloom-core.md - run scripts/sync-skill-files.sh -->"
  cat "$CORE"
  echo ""
  echo "---"
  echo ""
  echo "## Patterns appendix (optional)"
  echo ""
  echo "For triage boards, annotated diffs, slide decks, and clipboard/SVG/diff code, see"
  echo "[droids/bloom-patterns.md](./droids/bloom-patterns.md) in the Bloom repository"
  echo "or vendor that file into your project."
} > "$ROOT/AGENTS.md"
cp "$CORE" "$ROOT/GEMINI.md"  # or same wrapper as AGENTS
# Optional: fail if AGENTS.md drifted without sync
echo "Synced AGENTS.md and GEMINI.md from bloom-core.md"
```

- [ ] `chmod +x scripts/sync-skill-files.sh`
- [ ] Document in `CONTRIBUTING.md` or README Contributing.

**Verify Task 2:** Open `GEMINI.md` and `.cursor/rules/bloom.mdc` — a developer should see triggers, construction summary, and skeleton without opening other files.

---

## Phase 3 — Claude SKILL.md alignment

**Exit criterion:** Claude entry matches split; points to interactive templates.

### Task 3.1: Update both `SKILL.md` copies

**Files:**
- `.claude/skills/bloom/SKILL.md`
- `plugins/bloom/skills/bloom/SKILL.md`

- [ ] Change line “canonical reference: droids/bloom.md” → `droids/bloom-core.md` + `droids/bloom-patterns.md`.
- [ ] After “What to produce as HTML”, add **Shipped templates** list:

| Template | Category |
|----------|----------|
| `annotated-pr-review.html` | Code review |
| `status-report-v2.html` | Reports |
| `triage-board.html` | Custom editors (interactive) |
| `animation-sandbox.html` | Prototyping (interactive) |

- [ ] Add note: Categories 4–7, 9 **patterns** are in `bloom-patterns.md`; agents should read when user asks for slides/DnD/sandbox.

### Task 3.2: Plugin description accuracy

**Modify:** `plugins/bloom/.claude-plugin/plugin.json` description — mention “report & review templates; optional interactive references”.

---

## Phase 4 — Interactive reference templates (Important)

**Exit criterion:** Both new templates pass `bloom-validate`; demonstrate export + interaction per skill rules.

### Task 4.1: `templates/triage-board.html` (Category 9)

**Requirements:**
- 3–4 columns (Backlog / Doing / Done / Blocked) with native drag-and-drop (`dragstart`, `dragover`, `drop`)
- Ticket cards with title, tag, points
- **Copy as markdown** button using clipboard pattern from `bloom-patterns.md` (build string in JS, no `innerHTML` to clipboard)
- Full tokens, 640/960 breakpoints, `@media print`, `:focus-visible`, semantic HTML, fictional tickets
- JS ≤ 60 lines preferred; split helpers if needed
- `data-template` on column titles optional

**Test:**

```bash
cd bloom-validator && node src/index.ts ../templates/triage-board.html
```

### Task 4.2: `templates/animation-sandbox.html` (Category 4)

**Requirements:**
- Stage with animated box (CSS keyframes)
- Buttons or range input to swap `--ease` custom property (out, in-out, bounce)
- Read-only CSS snippet panel (`textContent`, not user input)
- Same construction baseline as other templates
- No external deps

### Task 4.3: Update validator CI loop

**Modify:** `.github/workflows/validator.yml` — no change needed if glob already covers `templates/*.html`.

### Task 4.4: Examples optional

**Create** (optional, if time):
- `examples/triage-board-example.html` — thin copy for README link

---

## Phase 5 — Documentation sync (Important)

### Task 5.1: Fix Cursor install text in `droids/bloom-patterns.md`

**Find/replace** in harness section (moved to patterns file):

**Old:** `Install path (newer): .cursor/rules/bloom.mdc. Copy droids/bloom.md there.`

**New:**

```markdown
### Cursor
- **Recommended:** Copy `.cursor/rules/bloom.mdc` from this repo into your project's `.cursor/rules/`. It contains the core Bloom skill (~120 lines).
- **Optional depth:** Vendor `droids/bloom-patterns.md` for triage boards, diff CSS, etc.
- **Legacy:** Repo-root `.cursorrules` paste of bloom-core only.
```

Apply same fix in `AGENTS.md` after sync if harness section stays in core — **prefer harness matrix only in patterns file**; core links to `docs/harness-capabilities.md`.

### Task 5.2: Update `docs/harness-setup.md`

- [ ] Per-harness sections: “loads **core**” vs “load **patterns** for interactive UI”
- [ ] OpenCode install: recommend `curl bloom-core` not full 626-line append (update `INSTALL.opencode.md`)

**Modify:** `plugins/bloom/INSTALL.opencode.md`

```bash
# Core only (~180 lines)
curl -fsSL .../droids/bloom-core.md >> AGENTS.md
# Optional patterns
curl -fsSL .../droids/bloom-patterns.md >> AGENTS-patterns.md
```

### Task 5.3: README template table

**Add** after templates tree:

| Template | Interactive? | Use when |
|----------|--------------|----------|
| `status-report-v2.html` | Light | Sprint/status |
| `annotated-pr-review.html` | No | PR review |
| `triage-board.html` | **Yes** (DnD + export) | Prioritization |
| `animation-sandbox.html` | **Yes** | Easing/motion demos |
| … | No | Other report types |

---

## Phase 6 — Verification & developer smoke test

### Task 6.1: Automated

```bash
cd bloom-validator && npm test
for f in templates/triage-board.html templates/animation-sandbox.html; do
  node src/index.ts "../$f" || exit 1
done
./scripts/sync-skill-files.sh
diff -q droids/bloom-core.md GEMINI.md  # after stripping generated header, or document intentional wrapper diff
```

### Task 6.2: Manual harness smoke checklist

**Create:** `docs/skill-smoke-test.md`

Per harness, 3 steps:

1. Activate (“bloom on” or `/bloom`)
2. Ask: “Compare three auth middleware approaches with tradeoffs”
3. Expect: `./bloom/*.html` path in reply; file opens `file://` with zero network requests

| Harness | Tester | Pass? |
|---------|--------|-------|
| Claude Code | | |
| Cursor (with mdc) | | |
| Codex (AGENTS.md core) | | |

### Task 6.3: Line-count guard (optional)

**Create:** `scripts/check-skill-sizes.sh`

- Fail CI if `bloom-core.md` > 220 lines
- Fail if `bloom.mdc` < 80 lines (regression to pointer-only)

---

## Suggested PR breakdown

| PR | Phases | Title |
|----|--------|-------|
| 1 | 1 | `docs: gitignore, harness matrix, honest README positioning` |
| 2 | 2–3 | `feat(skill): split core/patterns; fix Cursor and Gemini installs` |
| 3 | 4 | `feat(templates): triage board and animation sandbox references` |
| 4 | 5–6 | `docs: harness setup sync, smoke test, sync script` |

---

## Acceptance checklist (definition of done)

- [ ] `bloom-core.md` ≤ 220 lines; `bloom-patterns.md` has categories + patterns
- [ ] `AGENTS.md` / `GEMINI.md` usable **without** opening other files for a status report task
- [ ] `.cursor/rules/bloom.mdc` ≥ 80 lines with triggers + skeleton (not pointer-only)
- [ ] `droids/bloom.md` install text does not say “copy full bloom.md to mdc”
- [ ] `.gitignore` covers `.bloom` and `bloom/`
- [ ] `templates/triage-board.html` and `animation-sandbox.html` pass validator
- [ ] `docs/harness-capabilities.md` exists and linked
- [ ] `scripts/sync-skill-files.sh` documented in Contributing
- [ ] README template table marks interactive vs static
- [ ] `npm test` still 21/21 pass

---

## Estimated effort

| Phase | Hours |
|-------|-------|
| 1 | 1–2 |
| 2 | 3–4 |
| 3 | 1 |
| 4 | 4–6 |
| 5 | 2–3 |
| 6 | 1–2 |
| **Total** | **12–18 h** |

---

## Execution handoff

Plan saved to `docs/superpowers/plans/2026-05-24-skill-developer-utility.md`.

**Options:**

1. **Subagent-driven** — phased PRs with review after Phase 2 (skill split) and Phase 4 (templates).
2. **Inline** — start Phase 1 + Phase 2.1–2.5 (skill split) in this session.

Which approach do you want?
