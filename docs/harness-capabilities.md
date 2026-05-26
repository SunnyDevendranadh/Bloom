# Harness capabilities

Bloom is a **skill convention**, not a runtime. There is no Bloom daemon, CLI server, or IDE extension that intercepts messages. Harnesses load markdown instructions into the agent context; activation (`/bloom`, phrases, or a `.bloom` file) tells the model to follow those instructions for the rest of the session.

---

## Capability matrix

### Bloom (HTML artifact mode)

| Harness | Primary install | `/bloom` slash | Sticky without re-prompt | Full patterns (categories, copy-paste UI) |
|---------|-----------------|----------------|---------------------------|-------------------------------------------|
| **Claude Code** | `.claude/skills/bloom/SKILL.md` (or plugin marketplace) | Yes — native skill slash | Yes — skill stays loaded for the session | Yes — `SKILL.md` + repo `droids/bloom.md` / templates |
| **Cursor** | `.cursor/rules/bloom.mdc` (expanded in Phase 2) | No — phrases and rule text only* | Yes — if the rule is in context for the session | Via repo: `AGENTS.md`, `droids/bloom.md`; `bloom-patterns.md` after Phase 3 |
| **Codex CLI / Codex App** | Repo-root `AGENTS.md` | Phrase only | Prompt-dependent (context window + turns) | `droids/bloom-patterns.md` in repo (Phase 3) |
| **OpenCode** | `AGENTS.md` + `plugins/bloom/INSTALL.opencode.md` | Phrase only | Prompt-dependent | Same as Codex |
| **GitHub Copilot CLI** | `AGENTS.md` (marketplace or manual) | Phrase only | Prompt-dependent | Same as Codex |
| **Gemini CLI** | `GEMINI.md` (points at / inlines `AGENTS.md`) | Phrase only | Prompt-dependent | Same as Codex |
| **Factory Droid** | `droids/bloom.md` | Phrase only | Prompt-dependent | Full file in `droids/bloom.md` today |
| **Windsurf, Aider, Continue, Copilot VS Code, Pi, etc.** | `AGENTS.md` or harness-specific rules file | Varies by harness | Prompt-dependent | `AGENTS.md` + optional vendor of `droids/` |

\* **Cursor** does not ship a Bloom runtime. Slash-looking text in chat is not a guaranteed command unless Cursor maps it; rely on **natural-language triggers** and the **rule/skill text** loaded into context.

### Bloom Plan (decision-transparent planning mode)

| Harness | Primary install | `/plan` slash | Decision tables | Adaptive scale | HTML companion |
|---------|-----------------|---------------|-----------------|----------------|----------------|
| **Claude Code** | `.claude/skills/bloom-plan/SKILL.md` | Yes — native skill slash | Yes | Yes (Greenfield / Brownfield / Phase) | Yes |
| **Cursor** | `.cursor/rules/bloom-plan.mdc` | No — phrases only* | Yes | Yes | Yes |
| **Codex CLI / Codex App** | `AGENTS.md` (synced) | Phrase only | Yes | Yes | Yes |
| **OpenCode** | `AGENTS.md` + `plugins/bloom-plan/INSTALL.opencode.md` | Phrase only | Yes | Yes | Yes |
| **GitHub Copilot CLI** | `AGENTS.md` (synced) | Phrase only | Yes | Yes | Yes |
| **Gemini CLI** | `GEMINI.md` (synced) | Phrase only | Yes | Yes | Yes |
| **Factory Droid** | Copy `droids/bloom-plan.md` to `.factory/droids/` | Phrase only | Yes | Yes | Yes |
| **Continue** | Copy `droids/bloom-plan.md` to `.continue/rules/bloom-plan.md` | Phrase only | Yes | Yes | Yes |
| **GitHub Copilot VS Code** | `.github/copilot-instructions.md` (append) | Phrase only | Yes | Yes | Yes |
| **Windsurf** | `.windsurfrules` (append) | Phrase only | Yes | Yes | Yes |
| **Aider** | `AGENTS.md` (synced) | Phrase only | Yes | Yes | Yes |

\* **Cursor** does not ship a Bloom runtime. Slash-looking text in chat is not a guaranteed command unless Cursor maps it; rely on **natural-language triggers** and the **rule/skill text** loaded into context.

### Notes

- **`/bloom` is a harness/skill convention**, not a guaranteed cross-tool command. Only harnesses with native skill slash support (notably Claude Code) treat `/bloom` as a first-class activation.
- **Sticky** means: once activated, the agent should keep producing HTML artifacts until deactivation or session end, without the user repeating "bloom on" every turn. Effectiveness depends on whether the skill text remains in context (Claude skills and loaded Cursor rules) vs. turn-limited `AGENTS.md` snippets.
- **Full patterns** = triage boards, animation sandboxes, annotated diffs, slide decks, etc. Codex/OpenCode/Copilot/Gemini installs today load **`AGENTS.md` (core)**; deep pattern blocks will live in **`droids/bloom-patterns.md`** (Phase 3) and should be read from the repo when building complex UI.

---

## What loads into context

| Harness | What the agent actually sees | Typical size / shape |
|---------|------------------------------|----------------------|
| Claude Code | `SKILL.md` from plugin or `.claude/skills/bloom/` | ~220 lines; optimized entry, links to repo |
| Cursor | `.cursor/rules/bloom.mdc` when HTML globs match or rule is @-included; often also `AGENTS.md` | Today: short summary → `AGENTS.md`; Phase 2 inlines core in `.mdc` |
| Codex / OpenCode / Copilot CLI | Repo-root `AGENTS.md` (full skill today) | Large single file; Phase 3 splits to core + pointer |
| Gemini CLI | `GEMINI.md` at repo root or global | Pointer or inlined core (Phase 2) |
| Factory | `droids/bloom.md` via droid plugin or `~/.factory/droids/` | Full canonical skill |
| Other agents | `AGENTS.md`, `.cursorrules` legacy, Windsurf rules, etc. | Whatever you copy or merge into the harness contract file |

**Repo assets (not auto-loaded):** `templates/*.html`, `docs/categories.md`, `docs/construction-rules.md`, `bloom-validator/`. Agents should open these when generating or validating HTML; they are not injected unless the harness indexes the whole repo or the user @-mentions them.

**Session markers:** A `.bloom` file at the repo root is a convention for auto-activate-at-start; git-ignore it if you do not want it committed (see [`.gitignore`](../.gitignore)).

---

## Recommended install per harness

| Harness | Recommended | Manual fallback |
|---------|-------------|-----------------|
| **Claude Code** | Bloom marketplace: `/plugin marketplace add SunnyDevendranadh/Bloom` then `/plugin install bloom@bloom` | Copy `.claude/skills/bloom/` or use plugin under `plugins/bloom/` |
| **Cursor** | `/add-plugin bloom` when listed; else copy [`.cursor/rules/bloom.mdc`](../.cursor/rules/bloom.mdc) | Legacy `.cursorrules` with same content; keep [`AGENTS.md`](../AGENTS.md) in repo for full skill |
| **Codex CLI / App** | Official plugin marketplace when live | Repo-root [`AGENTS.md`](../AGENTS.md) or `~/.codex/AGENTS.md` |
| **OpenCode** | Follow [`plugins/bloom/INSTALL.opencode.md`](../plugins/bloom/INSTALL.opencode.md) | [`AGENTS.md`](../AGENTS.md) |
| **GitHub Copilot CLI** | `copilot plugin marketplace add` + `copilot plugin install bloom@bloom` | [`AGENTS.md`](../AGENTS.md) |
| **Gemini CLI** | `gemini extensions install https://github.com/SunnyDevendranadh/Bloom` | [`GEMINI.md`](../GEMINI.md) or global copy of [`AGENTS.md`](../AGENTS.md) |
| **Factory Droid** | `droid plugin install bloom@bloom` | `cp droids/bloom.md ~/.factory/droids/` or `.factory/droids/` |
| **Everything else** | See [`harness-setup.md`](./harness-setup.md) | Paste Bloom snippet into harness system prompt / rules file |

For step-by-step commands and marketplace status, see [`harness-setup.md`](./harness-setup.md) and the [README Installation section](../README.md#installation).

---

## Output conventions (all harnesses)

- Free-standing artifacts → `./bloom/<date>-<slug>.html`
- Reserved markdown (`README.md`, `AGENTS.md`, …) → keep `.md` canonical; optional sibling `.html`
- Deactivate with `/bloom-off`, `/no-bloom`, or phrases like "bloom off"

To keep agent drafts out of git, use the root [`.gitignore`](../.gitignore).
