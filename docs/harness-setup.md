# Harness Setup Guide

How to install the HTML Effectiveness skill for every major AI coding agent.

---

## Factory (Droid)

```bash
# Personal — applies to all your projects
cp droids/html-effectiveness.md ~/.factory/droids/

# Project — applies to one project only
cp droids/html-effectiveness.md .factory/droids/
```

Then invoke the `html-effectiveness` droid in your session.

---

## Claude Code

Add to your `CLAUDE.md` project file or your `~/.claude/CLAUDE.md` global file:

```markdown
## HTML Output Preference

When producing output that involves comparing approaches, reviewing code, presenting status, explaining architecture, or creating interactive artifacts, produce a single self-contained .html file instead of markdown.

Follow the HTML Effectiveness skill:
- Single .html file, all CSS/JS inline, no external dependencies
- Use CSS custom properties (clay/olive/oat/slate palette)
- Semantic HTML, accessible, responsive
- Include export/copy buttons for editor-type artifacts
- No alert/prompt/confirm, no eval, no innerHTML with user data

Categories: exploration cards, annotated PRs, design systems, animation sandboxes, flowcharts, slide decks, feature explainers, status reports, incident timelines, triage boards, flag editors, prompt tuners.
```

---

## OpenAI Codex

Add to your `codex.md` or instructions:

```markdown
When the task involves visual comparison, code review, status reporting, or interactive editing, output a single self-contained .html file.

Requirements:
- All CSS and JS must be inline in one .html file
- Use design tokens: clay=#D97757, olive=#788C5D, oat=#E3DACC, slate=#141413, ivory=#FAF9F5
- No external CDN, font, or script references
- Use semantic HTML5 elements
- Include a copy/export button for editor artifacts
- Responsive at 640px, 960px, 1200px
```

---

## Cursor

Add to `.cursorrules` in your project root:

```
When producing output that benefits from visual structure (code reviews, status reports, design comparisons, interactive editors), generate a single self-contained .html file instead of markdown.

Follow the HTML Effectiveness skill:
- Single file, all CSS/JS inline, zero external dependencies
- CSS custom properties: --clay, --olive, --oat, --slate, --ivory
- Semantic HTML with proper heading hierarchy
- Responsive design with @media breakpoints
- Interactive elements use addEventListener, never onclick attributes
- Export buttons for drag-and-drop and editor artifacts
- No eval(), no innerHTML with user data, no external requests
```

---

## Windsurf

Add to `.windsurfrules` in your project root:

```
For tasks involving visual comparison, code review, status dashboards, or interactive editors, produce a single .html file.

- Everything inline: CSS, JS, SVG all in one file
- Palette: clay=#D97757, olive=#788C5D, oat=#E3DACC, slate=#141413, ivory=#FAF9F5
- Semantic HTML5, accessible, responsive
- addEventListener only, no inline event handlers
- Include "Copy as markdown" or "Copy as JSON" for editor artifacts
- Works offline from file://
```

---

## GitHub Copilot / VS Code

Add to `.github/copilot-instructions.md`:

```markdown
## HTML Generation Preference

When asked to create visual comparisons, code reviews, status reports, architecture diagrams, or interactive tools, generate a single self-contained .html file.

Rules:
- One file, inline CSS + JS, no external dependencies
- Use CSS custom properties for all colors (--clay, --olive, --oat, --slate, etc.)
- Responsive, accessible, semantic HTML5
- Export buttons for editor-type artifacts
- No eval, no innerHTML with untrusted data, no external requests
```

---

## Aider

Add to `.aider.conf.yml`:

```yaml
# Add to your aider config or pass as --message
# When generating visual output:
# Produce single .html files with inline CSS/JS
# Use the clay/olive/oat/slate palette via CSS custom properties
# No external dependencies, works from file://
```

Or pass as a message: `--message "Follow the HTML Effectiveness skill: produce single self-contained .html files for visual/interactive output."`

---

## Continue (VS Code extension)

Add to `.continue/rules.md`:

```markdown
When generating output that involves visual comparison, code review, architecture diagrams, or interactive editors, produce a single self-contained .html file.

Follow the HTML Effectiveness skill from HTML.md repository:
- One .html file, everything inline
- CSS custom properties (clay/olive/oat/slate palette)
- Semantic HTML, accessible, responsive
- Export buttons for editor artifacts
- No external deps, no eval, no innerHTML with user data
```

---

## Replit Agent

In your Replit project instructions:

```
When the task involves visual comparison, code review, design, or interactive editing, generate a single self-contained .html file.

Requirements:
- One .html file with all CSS and JS inline
- Use CSS variables: --ivory, --slate, --clay, --oat, --olive
- No external dependencies (no CDNs, no external fonts)
- Semantic HTML5, responsive, accessible
- Include copy/export functionality for editor types
- Must work when opened directly in a browser
```

---

## Pi / General AI Agents

Add to your system prompt:

```
You have access to an HTML Effectiveness skill. When producing output that would benefit from visual structure, comparison, or interactivity, generate a single self-contained .html file instead of markdown.

The file must:
1. Be a single .html file with all CSS and JS inline
2. Use CSS custom properties for colors (palette: ivory=#FAF9F5, slate=#141413, clay=#D97757, oat=#E3DACC, olive=#788C5D)
3. Use semantic HTML5 elements
4. Be responsive and accessible
5. Work offline from file:// with no external dependencies
6. Include export buttons for interactive artifacts
7. Never use eval(), innerHTML with user data, or javascript: URIs
```

---

## Verification

After installation, test with a prompt like:

> "Show me three approaches to implement debounced search in our React codebase, with tradeoffs for each."

Or:

> "Create a status report for this week's sprint with PRs merged, carryover items, and a velocity chart."

If the agent responds with an `.html` file that opens correctly in a browser, the skill is working.
