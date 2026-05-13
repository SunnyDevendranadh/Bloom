# The 9 Document Categories

This document describes each category of output where HTML beats markdown, with the specific patterns that make each one effective.

---

## 1. Exploration & Planning

**Replaces:** Three sequential walls of prose describing different approaches.

**HTML pattern:**
- Side-by-side approach cards in a CSS grid (`grid-template-columns: repeat(3, 1fr)`)
- Each card contains: numbered header, code panel (inline highlighted with CSS classes), tradeoff table (pro/con with colored dots), summary chips (bundle impact, testability, reuse)
- Recommendation footer with colored left border (`border-left: 4px solid var(--clay)`)

**When to use:** "Show me three ways to solve X", "Compare approaches A, B, C", "Explore visual design directions"

---

## 2. Code Review & Understanding

**Replaces:** A pasted terminal diff and a paragraph describing what it does.

**HTML patterns:**

**Annotated PR:** Header with author avatar, branch arrow, +/- stats. Risk-map chips linking to file sections. File cards with colored diff rows (`.add` green, `.del` red, `.ctx` gray) and inline review comment bubbles with severity labels. Collapsed safe files in `<details>`. Action-item checklist footer.

**PR Writeup:** Before/after comparison panels. File-by-file tour with `<details>` sections explaining *why*. Numbered review focus areas. Test plan with checkboxes. Rollout schedule cards.

**Module Map:** SVG boxes-and-arrows diagram with hot path highlighted (`fill="rgba(217,119,87,0.10)" stroke="var(--clay)"`). Step-by-step callstack walkthrough with collapsible source snippets. Sticky sidebar with key files and gotchas.

**When to use:** "Review this PR", "Explain how X flows through the codebase", "Write up PR #312 for reviewers"

---

## 3. Design

**Replaces:** "The primary color is #D97757" in a text doc.

**HTML patterns:**

**Living Design System:** Color swatches with hex value + token name. Type scale with rendered specimens at each size. Spacing ruler with visual bars. Radius cards at each size. Elevation shadows. Live component samples (buttons in all variants, inputs in states, checkboxes, badges).

**Component Variants:** Grid of variant cards with labels. Interactive toolbar (padding range slider, border radio, shadow checkbox). Hover to preview the JSX/prop snippet. Variant-specific notes ("best for: dense lists on tinted backgrounds").

**When to use:** "Document the design system", "Show all button variants", "Create a component library reference"

---

## 4. Prototyping

**Replaces:** "Try an ease-out curve with a 300ms duration" in a comment.

**HTML patterns:**

**Animation Sandbox:** The animated element isolated in a stage. Easing picker buttons that swap a `--ease` CSS custom property at runtime. Keyframe timeline with labeled dots. Copy-paste CSS section with highlighted values.

**Clickable Flow:** Multiple screen mockups as named `<div>` states. Navigation buttons that toggle visibility (not page navigation). Annotation panel explaining design decisions. Open questions section.

**When to use:** "Prototype the task completion animation", "Test the drag-to-reorder sidebar interaction", "Try different easing curves"

---

## 5. Diagrams & Illustrations

**Replaces:** A Mermaid link that won't render in half the viewers.

**HTML patterns:**

**SVG Figure Sheet:** Multiple inline `<svg>` illustrations with `<figcaption>` captions and "Download SVG" buttons (serialize the SVG element via `XMLSerializer`, create a blob, and trigger download). Palette reference strip. Usage notes.

**Annotated Flowchart:** SVG nodes with click handlers. Side panel that updates with node details (title, duration, code snippet). Decision diamonds with pass/fail paths. Legend strip.

**When to use:** "Draw the deploy pipeline", "Create header illustrations for the docs section", "Diagram the auth flow"

---

## 6. Slide Decks

**Replaces:** A Google Slides link or "imagine the next slide" in a meeting doc.

**HTML pattern:**
- Full-viewport `<section class="slide">` elements with `scroll-snap-type: y mandatory`
- Arrow-key navigation via `keydown` listener
- Slide counter in fixed position
- Inverted slides (`background: var(--slate); color: var(--ivory)`) for emphasis
- Stat cards with large serif numbers
- Bar charts as inline SVG

**When to use:** "Weekly status", "Feature pitch", "Decision meeting"

---

## 7. Research & Learning

**Replaces:** A long markdown file that would be skimmed.

**HTML patterns:**

**Feature Explainer:** TL;DR callout box with left border. Collapsible step-by-step sections via `<details>`. Tabbed config snippet switcher (button bar toggles `<pre>` visibility). Callout box (`★` with highlighted border). FAQ as `<dl>`.

**Concept Explainer:** Interactive demo panel (e.g., a hash ring with add/remove node controls). Comparison table (pro/con columns). Sticky glossary sidebar with hover-linked terms.

**When to use:** "Explain how rate limiting works in this repo", "Teach consistent hashing"

---

## 8. Reports

**Replaces:** A plain text email nobody reads.

**HTML patterns:**

**Status Report:** Summary stat grid (`grid-template-columns: repeat(4, 1fr)`). Highlights list with clay dots. Shipped table with risk-colored dots. Inline bar chart SVG. Carryover section with tags.

**Incident Timeline:** Severity/resolution pills. TL;DR in dark box. Minute-by-minute timeline with colored dots (`.impact` = clay, `.mitigated` = olive). Root-cause code diff in dark panel. Impact table. Action-item rows with assignee avatars.

**When to use:** "Weekly status", "Incident postmortem", "Sprint report"

---

## 9. Custom Editors

**Replaces:** A numbered list in a Google Doc that everyone argues about.

**HTML patterns:**

**Triage Board:** 4-column drag-and-drop with native `draggable` API. Tag filtering (click to filter, click again to clear). Point estimation footer. "Copy as markdown" button that serializes columns + tickets. Reset button.

**Feature Flag Editor:** Grouped toggle switches with dependency warnings (flag enabled without prerequisite highlighted with clay border and background). Pending-changes diff in sidebar. "Copy diff" (only changes) and "Copy full JSON" buttons. Reset to initial state.

**Prompt Tuner:** Editable template area with `contenteditable` and highlighted variable slots (clay background for known slots, clay + dashed underline for unknown). 3 sample preview cards rendering live. Token character counter. "Copy prompt" button.

**When to use:** "Prioritize these 24 tickets", "Edit the feature flag config", "Tune the support reply prompt"
