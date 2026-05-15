# Construction Rules — v2

This document is an addendum to [`construction-rules.md`](./construction-rules.md). It clarifies Rule 9 ("no placeholder content") for the specific case of **templates** — files in `templates/` that exist to be copied and filled in.

The v1 rules stay in force everywhere else; this v2 only rewrites Rule 9.

---

## Rule 9 (revised): Templates use data-attribute markers, not bracket placeholders

The original Rule 9 forbids placeholder content such as `[PROJECT]`, `[NUM]`, or `Lorem ipsum`. That rule remains in full force for **generated artifacts** — every status report, review, plan, or explainer produced for a user must contain real, specific content.

But Bloom's `templates/` directory serves a different purpose: those files are the **starting skeleton** an author copies before authoring a real artifact. They need to:

1. Render cleanly in a browser as-is (so an author can preview the layout)
2. Carry no fake-looking strings like `[PROJECT]` that would visually leak into the rendered output
3. Be **machine-fillable** — an agent or tool should be able to populate a template by name, not by string-replacing bracket tokens

### Required pattern for `templates/*.html`

Every fillable slot in a template gets:

1. **Real, plausible default content** as the rendered text (so the preview is honest)
2. A `data-template="<slot-name>"` attribute on the same element
3. (Optional) a `data-template-format="text|number|date|markdown"` attribute when the value needs typed coercion

```html
<!-- BEFORE (v1 — fails Rule 9) -->
<h1>[PROJECT] — Week [NUM]</h1>
<div class="date-range">[DATE RANGE]</div>

<!-- AFTER (v2 — passes Rule 9) -->
<h1 data-template="title">Acme — Sprint 44</h1>
<div class="date-range" data-template="date-range">May 6 – May 12, 2026</div>
```

If you open the template in a browser without populating it, you see real-looking sample data. If a tool or agent fills it, it reads the slot names from `data-template` attributes and overwrites the `textContent`.

### Companion fill script (inline, under 60 lines)

Templates may include this opt-in fill script at the end of `<body>`. It is dormant unless the page is given a `?bloom-fill=...` query parameter, a `BLOOM_FILL` global, or a `data-bloom-fill` JSON blob on `<html>`. With no signal, the sample data renders unchanged.

```javascript
(function () {
  function readSource() {
    if (typeof window.BLOOM_FILL === 'object' && window.BLOOM_FILL) {
      return window.BLOOM_FILL;
    }
    var attr = document.documentElement.getAttribute('data-bloom-fill');
    if (attr) {
      try { return JSON.parse(attr); } catch (e) { return null; }
    }
    var params = new URLSearchParams(window.location.search);
    var raw = params.get('bloom-fill');
    if (raw) {
      try { return JSON.parse(decodeURIComponent(raw)); } catch (e) { return null; }
    }
    return null;
  }

  var data = readSource();
  if (!data) return;

  document.querySelectorAll('[data-template]').forEach(function (el) {
    var key = el.getAttribute('data-template');
    if (!Object.prototype.hasOwnProperty.call(data, key)) return;
    var value = data[key];
    if (value === null || value === undefined) return;
    el.textContent = String(value);
  });
})();
```

Key properties:

- **Inline only** — no `<script src>`, no imports (Rule 1 / S1)
- **`addEventListener`-free** because there's no UI; pure read-and-render (Rule 4 / S5)
- **`textContent` only** — never `innerHTML` (S3). User-supplied values cannot inject HTML.
- **JSON parsed in a try/catch** — bad input silently no-ops rather than throwing
- **No network calls** — input comes from a global, a `data-` attribute, or the query string (S4)
- **Reads as a static document** when no data source is present — the sample content is the default render

### Why this resolves the original tension

| Concern | v1 problem | v2 solution |
|---|---|---|
| Rendered template shows ugly `[FOO]` text | Yes | No — real sample content is the default |
| Author can still see "where things go" | Forced to read code | `data-template` attributes are visible in DevTools |
| Machine fill is reliable | Required brittle string replace | Keyed lookup, no string substitution |
| Validator passes Rule 9 | Failed on `[PROJECT]` | Passes — no bracket placeholders anywhere |
| Validator passes Rule 2 (hex tokens) | Was already fine | Still fine — script touches `textContent` only |
| File works opened from `file://` | Yes | Yes — script is a no-op without input |

### What still counts as a Rule 9 violation in templates

Even with this revision, the following are still **not allowed** in `templates/*.html`:

- `Lorem ipsum`, `TODO`, `FIXME`, `Your content here`
- Bracket tokens: `[NAME]`, `[NUM]`, `{{value}}`, `${placeholder}`
- Generic names like `Company Name`, `John Doe`, `Task 1`, `Example Inc.`
- Empty `<td>` or `<li>` elements meant as "fill these in"

The default content rendered in the template must be **plausible domain content** — names, dates, numbers, and titles that could be real.

### Migration guide

For each existing template under `templates/`:

1. Replace every `[TOKEN]` with realistic sample content
2. Add `data-template="<slot-name>"` to the element that held it
3. Use kebab-case names matching what an agent would supply: `title`, `date-range`, `week-number`, `metric-1-label`, `metric-1-value`, etc.
4. Append the fill script from above at the end of `<body>` (it is the same script for every template — copy verbatim)
5. Run `bloom-validate templates/<file>.html` and confirm a clean pass

See `templates/status-report-v2.html` for a complete worked example.
