# Construction Rules

The 12 non-negotiable rules for every HTML file produced under this skill.

---

## Rule 1: Single file

All HTML, CSS, and JS in one `.html` file. No external dependencies, no CDN links, no import maps, no build step. The file must work when opened directly from the filesystem with `file://`.

**Why:** Agents produce artifacts that need to be immediately viewable. No build step, no server, no network required.

**Rationale:** Copied from [the original](https://thariqs.github.io/html-effectiveness/) — "Everything on this page is itself a single `.html` file."

---

## Rule 2: CSS custom properties

Use the palette tokens via `var(--clay)`, `var(--gray-300)`, etc. Never hard-code hex values in component styles.

**Why:** Tokens ensure visual consistency across all artifacts. They also make theming trivial — swap `--clay: #D97757` for your brand color and everything updates.

**Exception:** SVG `fill` and `stroke` attributes (which don't support `var()`) should use the actual hex values from the palette. In SVG `<style>` blocks, custom properties do work.

---

## Rule 3: Semantic HTML

Use `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<aside>`, `<details>`, `<figure>`, `<figcaption>`, `<table>`, `<dl>` where appropriate. Never use `<div>` when a semantic element fits.

**Why:** Semantic HTML improves accessibility (screen readers navigate by landmark), makes the document structure self-documenting, and improves SEO if published.

**Common patterns:**
- `<header class="page-head">` for page headers
- `<section id="risk-map">` for major content areas
- `<details>` for collapsible content (progressive enhancement — works without JS)
- `<nav class="toc">` for table of contents
- `<aside>` for sidebar content
- `<figure>` + `<figcaption>` for illustrations

---

## Rule 4: Inline JS only

Keep JavaScript minimal and inline in a `<script>` tag at the end of `<body>`. No frameworks, no libraries, no import statements. Maximum acceptable JS is ~60 lines for interaction (drag-and-drop, tab switching, copy-to-clipboard, accordion toggling).

**Why:** The file must be self-contained and work offline. A React bundle defeats the purpose.

**Allowed JS patterns:**
- `addEventListener` for all event handling
- `classList.toggle()` for state changes
- `document.querySelectorAll()` for DOM queries
- `navigator.clipboard.writeText()` with fallback for copy operations
- Native drag-and-drop (`dragstart`, `dragover`, `drop`)
- `IntersectionObserver` for scroll-based effects

**Never:**
- `import` statements
- CDN `<script>` tags
- React, Vue, Svelte, or any framework
- `eval()`, `new Function()`, `setTimeout(string)`, `setInterval(string)`

---

## Rule 5: Responsive

Use `max-width` wrappers (860–1120px), `clamp()` for typography, and `@media` breakpoints at 640px and 960px so files look good on phone, tablet, and desktop.

**Required breakpoints:**
```css
@media (max-width: 640px) {
  /* Single column, smaller text, full-width cards */
}
@media (max-width: 960px) {
  /* Collapse sidebars, reduce grid columns */
}
```

---

## Rule 6: Export mechanism

For any editor-type artifact (triage boards, flag editors, prompt tuners), always include a "Copy as markdown" or "Copy as JSON" button that serializes the user's changes. Use the Clipboard API with a `document.execCommand('copy')` fallback.

**Why:** The user needs to get data out of the HTML and into their workflow (GitHub issues, docs, config files).

**Pattern:**
```javascript
function exportAsMarkdown() {
  var lines = ['## Planning Board'];
  // serialize current state
  return lines.join('\n');
}

copyBtn.addEventListener('click', function () {
  var text = exportAsMarkdown();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(flash, flash);
  } else {
    fallbackCopy(text);
    flash();
  }
});
```

---

## Rule 7: Print-friendly

Key content must be readable without JavaScript. Use `<details>` for progressive disclosure rather than JS-only toggles where possible. Add print styles to hide toolbars and make content flow linearly.

```css
@media print {
  nav, .toolbar, button { display: none; }
  section { break-inside: avoid; }
  .card { box-shadow: none; border: 1px solid #ccc; }
}
```

---

## Rule 8: Accessible

- `aria-label` on SVGs and decorative images
- `role="img"` or `role="img"` with `aria-label` on SVG diagrams
- Proper heading hierarchy: one `<h1>`, `<h2>` per section, no skipped levels
- Visible focus states on interactive elements
- `alt` text on any meaningful images
- Keyboard navigation where applicable (arrow keys for slides, tab for interactive elements)

---

## Rule 9: No placeholder content

Every section has real, specific content. No "Lorem ipsum", no "TODO", no "Your content here". If you don't have actual data, invent realistic fictional data that matches the domain context.

**Bad:** "Company Name", "John Doe", "Task 1"
**Good:** "Acme", "Mira Okafor", "Ship onboarding empty-state rewrite"

---

## Rule 10: Viewport meta

Always include in `<head>`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## Rule 11: Progressive enhancement

Core content must be visible without JavaScript. JS enhances — it does not gate. A user opening the file with JS disabled should still see all text, diagrams, and structural elements.

**Pattern:** Use `<details>` for collapsible sections (works without JS). Use JS to add "click to expand one at a time" behavior on top.

---

## Rule 12: No `alert()` / `prompt()` / `confirm()`

Use inline UI instead:
- Toast-style messages for success/error feedback
- Inline validation near form fields
- Status indicators that update in place

```html
<!-- Bad -->
<script>alert('Copied!');</script>

<!-- Good -->
<button id="copyBtn">Copy</button>
<script>
copyBtn.addEventListener('click', function () {
  // ... copy logic ...
  copyBtn.textContent = 'Copied ✓';
  setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1200);
});
</script>
```


### Rule 13: Print Styles
Include `@media print` styles that hide interactive elements and ensure text is readable at standard paper widths. Key content must render without JavaScript.
