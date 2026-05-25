# Bloom — Patterns & Harness Appendix

Supplement to [bloom-core.md](./bloom-core.md). Use for document-type patterns, code snippets, and per-harness installation.

---

## When to Use HTML at All (outside Bloom mode)

Even when bloom is off, the agent may opt into producing an `.html` file for a specific response when the output benefits from:

- **Spatial comparison** — side-by-side approaches, before/after, variant matrices
- **Visual structure** — annotated diffs, risk maps, timelines, flowcharts, diagrams
- **Interactivity** — drag-and-drop boards, toggle editors, animation sandboxes, clickable flows
- **Scannability** — status reports, incident timelines, design token references, slide decks
- **Exploration** — choosing between design directions, prioritizing tickets, tuning prompts

Do NOT use HTML for:
- Simple one-line answers
- Code snippets that will be directly committed
- Configuration file edits
- Terminal command output

---

## Document Categories

### Category 1: Exploration & Planning

**When:** Comparing multiple approaches, planning implementation, exploring design directions.

**Patterns:**
- Side-by-side approach cards with code panels, tradeoff tables (pro/con with colored dots), and summary chips (bundle impact, testability, reuse)
- Visual design direction grid (2×2 or 3×1) with live-rendered previews and light/dark toggle
- Implementation plan with milestone timeline (vertical dots + lines), data-flow SVG diagram, inline mockups, key code panels, risk table, and open questions

### Category 2: Code Review

**When:** Reviewing a PR, explaining code architecture, writing up a PR for reviewers.

**Patterns:**
- Annotated PR: header with author/branch/stats, risk-map chips linking to file sections, file cards with colored diff rows and inline review comments (blocking vs nit), collapsible safe files, action-item checklist
- PR writeup: before/after comparison panels, file-by-file tour with `<details>` expandable sections showing the *why*, review focus areas numbered, test plan with checkboxes, rollout schedule
- Module map: SVG boxes-and-arrows diagram with hot path highlighted, step-by-step callstack walkthrough with collapsible source snippets, sidebar with key files and gotchas

### Category 3: Design

**When:** Documenting or reviewing a design system, comparing component variants.

**Patterns:**
- Living design system: color swatches with hex + token name, type scale with rendered specimens, spacing ruler with pixel bars, radius + elevation cards, live component samples (buttons, inputs, checkboxes, badges)
- Component variant matrix: grid of variants with labels, interactive toolbar (padding slider, border toggle, shadow checkbox), hover-to-preview JSX snippet panel

### Category 4: Prototyping

**When:** Testing animations, interaction flows, or micro-interactions.

**Patterns:**
- Animation sandbox: the animated element in a stage, easing picker buttons that swap a CSS custom property, keyframe timeline visualization, copy-paste CSS section
- Clickable flow: multiple screen mockups linked by `<button>` navigation, annotations explaining design decisions, open questions section

### Category 5: Diagrams & Illustrations

**When:** Creating figures for docs, drawing process flows.

**Patterns:**
- SVG figure sheet: multiple inline SVGs with captions and per-figure download buttons (serialize to blob), palette reference strip, usage notes
- Annotated flowchart: SVG nodes with click-to-reveal detail panel, decision diamonds with pass/fail paths, side panel showing clicked node details

### Category 6: Slide Decks

**When:** Presenting status, pitching a feature, running a meeting.

**Patterns:**
- Full-viewport `<section>` slides with `scroll-snap-type: y mandatory`, arrow-key navigation via `keydown` listener, slide counter, inverted slides for emphasis

### Category 7: Research & Learning

**When:** Explaining a feature, teaching a concept, onboarding.

**Patterns:**
- Feature explainer: TL;DR callout, collapsible request-path steps, tabbed config snippets, callout box, FAQ as `<dl>`
- Concept explainer: interactive demo panel (e.g., hash ring with sliders), comparison table, glossary sidebar with hover-linked terms

### Category 8: Reports

**When:** Weekly status, incident postmortems, metrics summaries.

**Patterns:**
- Status report: summary stat cards, highlights list, shipped table with risk dots, inline bar chart SVG, carryover section with tags
- Incident timeline: severity/resolution pills, TL;DR dark box, minute-by-minute timeline with colored dots, root-cause code diff, impact table, action-item checklist with assignees

### Category 9: Custom Editors

**When:** Prioritizing work, editing config, tuning prompts.

**Patterns:**
- Triage board: 4-column drag-and-drop with ticket cards, tag filtering, point estimation, "Copy as markdown" export
- Feature flag editor: grouped toggles with dependency warnings (border-left highlight), pending-changes diff sidebar, "Copy diff" and "Copy full JSON" buttons
- Prompt tuner: editable template with highlighted variable slots, 3 sample previews rendering live as you type, token counter, "Copy prompt" button

---

## Agent Harness Invocation

### Claude Code
Install path: `.claude/skills/bloom/SKILL.md` (project) or `~/.claude/skills/bloom/SKILL.md` (global). Activate per session with `/bloom`. One-shot:
```
Produce a single self-contained .html file that [description]. Use inline CSS with the clay/olive/oat/slate palette. Include [interactive feature]. Write the file to [path].
```

### Codex CLI (OpenAI)
Install path: `AGENTS.md` at repo root or `~/.codex/AGENTS.md` global. Run `scripts/sync-skill-files.sh` or copy `droids/bloom-core.md` there. One-shot:
```
Create a self-contained HTML file at [path]. The file should [description]. All CSS and JS must be inline. Use the following design tokens: clay=#D97757, olive=#788C5D, oat=#E3DACC, slate=#141413, ivory=#FAF9F5.
```

### Codex App (OpenAI web/desktop)
Install path: commit `AGENTS.md` (with bloom skill) to the GitHub branch you connect to the Codex App. Trigger bloom with `/bloom` or "bloom on" in your first message. Commit a `.bloom` file at the repo root to auto-activate without typing the trigger.

### Factory Droid
Install path: `.factory/droids/bloom.md` (project) or `~/.factory/droids/bloom.md` (global). Invoke the `bloom` droid in your session.

### Gemini CLI (Google)
Install path: `GEMINI.md` at repo root or `~/.gemini/GEMINI.md` global. Run `scripts/sync-skill-files.sh` or copy `droids/bloom-core.md` there. Bloom triggers work identically — `/bloom`, "bloom on", "let it bloom".

### OpenCode (sst)
Install path: `AGENTS.md` at repo root. Run `scripts/sync-skill-files.sh` or copy `droids/bloom-core.md` there. Project config in `opencode.json` is independent — bloom triggers work regardless.

### Cursor
- **Recommended:** Copy `.cursor/rules/bloom.mdc` from this repo (contains bloom-core inlined).
- **Optional:** Vendor `droids/bloom-patterns.md` for triage boards, diff CSS, etc.
- **Legacy:** Repo-root `.cursorrules` with bloom-core paste only.

One-shot:
```
Write [path].html — a single self-contained file with [description]. Inline all styles and scripts. Use CSS custom properties from the warm palette (clay, olive, oat, slate). Make it interactive with [specific behavior].
```

### GitHub Copilot CLI
Install path: `AGENTS.md` at repo root. Run `scripts/sync-skill-files.sh` or copy `droids/bloom-core.md` there. Trigger with `/bloom` or "bloom on" in your first prompt. Commit a `.bloom` file at the repo root to auto-activate per workspace.

### Windsurf
Install path: `.windsurfrules` at repo root. Paste bloom-core rules.
```
Write [path].html — a single self-contained file with [description]. Inline all styles and scripts. Use CSS custom properties from the warm palette (clay, olive, oat, slate). Make it interactive with [specific behavior].
```

### Aider
Install path: `AGENTS.md` at repo root (preferred), or `.aider.conf.yml` `read` instruction, or `--message` flag. One-shot:
```
Create [path].html as a single self-contained HTML file. [Description]. All styles and scripts inline. Use CSS variables --clay, --olive, --oat, --slate, --ivory for colors.
```

### GitHub Copilot (VS Code) / Continue
Add bloom-core contents to `.github/copilot-instructions.md` or `.continue/rules.md`.

### Pi / Replit / General
Paste bloom-core into the agent's system prompt or custom-instructions field. One-shot:
```
Generate a single .html file with [description]. Everything must be self-contained (no external assets). Use semantic HTML5, inline CSS with custom properties for theming, and minimal inline JS for interactivity.
```

### System prompt injection
For any agent that supports system prompts or custom instructions, paste bloom-core as-is (or the full concatenation from `bloom-full.md`).

### Cross-harness install matrix

| Harness | File that triggers install |
|---|---|
| Claude Code | `.claude/skills/bloom/SKILL.md` |
| Codex CLI | `AGENTS.md` |
| Codex App | `AGENTS.md` (committed to linked branch) |
| Factory Droid | `.factory/droids/bloom.md` |
| Gemini CLI | `GEMINI.md` |
| OpenCode | `AGENTS.md` |
| Cursor | `.cursor/rules/bloom.mdc` (recommended; `.cursorrules` legacy) |
| GitHub Copilot CLI | `AGENTS.md` |
| GitHub Copilot (VS Code) | `.github/copilot-instructions.md` |
| Windsurf | `.windsurfrules` |
| Aider | `AGENTS.md` (or `.aider.conf.yml`) |
| Continue | `.continue/rules.md` |

A single `AGENTS.md` covers Codex CLI, Codex App, OpenCode, GitHub Copilot CLI, and Aider. Regenerate with `scripts/sync-skill-files.sh`.

---

## Clipboard Utility Pattern

For any artifact with an export button, use this safe clipboard pattern:

```javascript
function copyToClipboard(text, buttonEl) {
  var success = false;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      flashButton(buttonEl);
    }, function () {
      fallbackCopy(text);
      flashButton(buttonEl);
    });
  } else {
    fallbackCopy(text);
    flashButton(buttonEl);
  }
}

function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) { /* silent */ }
  document.body.removeChild(ta);
}

function flashButton(btn) {
  var orig = btn.textContent;
  btn.textContent = 'Copied';
  btn.style.background = 'var(--olive)';
  setTimeout(function () {
    btn.textContent = orig;
    btn.style.background = '';
  }, 1200);
}
```

---

## SVG Diagram Pattern

For inline SVG diagrams in flowcharts and module maps:

```html
<svg viewBox="0 0 720 280" role="img" aria-label="[Description]">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--gray-500)"/>
    </marker>
  </defs>

  <!-- Boxes -->
  <rect class="box" x="30" y="40" width="150" height="64" rx="10"
        fill="var(--white)" stroke="var(--gray-300)" stroke-width="1.5"/>
  <text x="105" y="68" text-anchor="middle"
        font-family="var(--mono)" font-size="12" fill="var(--slate)">[Label]</text>

  <!-- Hot-path highlight -->
  <rect class="box hot" x="460" y="40" width="180" height="64" rx="10"
        fill="rgba(217,119,87,0.10)" stroke="var(--clay)" stroke-width="1.5"/>

  <!-- Arrows -->
  <line x1="180" y1="72" x2="460" y2="72" stroke="var(--gray-500)"
        stroke-width="1.5" marker-end="url(#arrow)"/>
</svg>
```

---

## Diff Rendering Pattern

For code reviews and incident root-cause sections:

```html
<div class="diff">
  <div class="diff-row hunk">
    <span class="ln"></span><span class="mark"></span>
    <span class="code">@@ -42,14 +42,17 @@</span>
  </div>
  <div class="diff-row ctx">
    <span class="ln">42</span><span class="mark"> </span>
    <span class="code">  const { data: tasks } = useTasks(boardId);</span>
  </div>
  <div class="diff-row del">
    <span class="ln">43</span><span class="mark">-</span>
    <span class="code">  const [pending, setPending] = useState(null);</span>
  </div>
  <div class="diff-row add">
    <span class="ln">43</span><span class="mark">+</span>
    <span class="code">  const { mutate, isPending } = useOptimisticTasks(boardId);</span>
  </div>
</div>
```

With CSS:
```css
.diff { background: var(--slate); font-family: var(--mono); font-size: 12.5px; overflow-x: auto; }
.diff-row { display: grid; grid-template-columns: 48px 18px 1fr; padding: 0 14px 0 0; white-space: pre; }
.diff-row .ln { text-align: right; padding-right: 14px; color: var(--gray-500); user-select: none; }
.diff-row .mark { text-align: center; color: var(--gray-500); }
.diff-row .code { color: #E8E6DC; }
.diff-row.ctx .code { color: #B8B6AC; }
.diff-row.add { background: rgba(120,140,93,0.15); }
.diff-row.add .mark { color: var(--olive); }
.diff-row.del { background: rgba(176,74,63,0.15); }
.diff-row.del .mark { color: var(--rust); }
```

---

## Self-Check Checklist

Before delivering any `.html` file, verify:

- [ ] File opens correctly from `file://` with no console errors
- [ ] No external network requests (check Network tab)
- [ ] All colors use CSS custom properties, no hard-coded hex
- [ ] Semantic HTML elements used throughout
- [ ] Responsive at 640px, 960px, and 1200px widths
- [ ] No `eval()`, `innerHTML` with user data, unsafe clipboard copy, or `javascript:` URIs
- [ ] All event handlers use `addEventListener`
- [ ] Export/copy button works (if editor-type artifact)
- [ ] Content is readable with JavaScript disabled
- [ ] No placeholder text — all content is specific and real
- [ ] `<meta name="viewport">` present
- [ ] Proper heading hierarchy (one `<h1>`, no skipped levels)
- [ ] SVGs have `aria-label` or `role="img"`
