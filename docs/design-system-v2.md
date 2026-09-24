# Design System Reference — v2

Extends [`design-system.md`](./design-system.md) with three additions:

1. Dark-mode tokens that auto-apply via `prefers-color-scheme`
2. Motion tokens (durations + easings)
3. Two new complex components: **Tabs** and **Modal/Dialog**

Everything here composes with the v1 tokens — no v1 file needs to be replaced.

---

## 1. Dark-mode tokens

Inside the same `:root` block, add a `@media (prefers-color-scheme: dark)` override that swaps the surface, text, and neutral scale. The clay/olive/oat/rust accents keep their hue but slightly desaturate so they read cleanly on a dark surface.

```css
:root {
  /* light defaults (from v1) */
  --ivory:    #FAF9F5;
  --slate:    #141413;
  --white:    #FFFFFF;
  --gray-100: #F0EEE6;
  --gray-300: #D1CFC5;
  --gray-500: #87867F;
  --gray-700: #3D3D3A;
  --clay:     #D97757;
  --oat:      #E3DACC;
  --olive:    #788C5D;
  --rust:     #B04A3F;
}

@media (prefers-color-scheme: dark) {
  :root {
    --ivory:    #1A1A18;   /* page background */
    --slate:    #F5F4F0;   /* headings, strong text */
    --white:    #232320;   /* card backgrounds */
    --gray-100: #2A2A27;   /* subtle fills */
    --gray-300: #4A4A45;   /* borders, dividers */
    --gray-500: #9A998F;   /* muted text */
    --gray-700: #C5C3BC;   /* body text */
    --oat:      #3A352D;   /* warm fill */
    --clay:     #E08868;   /* slightly lighter for AA contrast on dark bg */
    --olive:    #94A573;
    --rust:     #C5604F;
  }
}
```

### Why this works without per-component overrides

Because every v1 component reads from `var(--token)`, the override propagates automatically:

| Component | Light surface | Dark surface |
|---|---|---|
| `.card` | `var(--white)` `#FFFFFF` | `var(--white)` `#232320` |
| `body` | `var(--ivory)` `#FAF9F5` | `var(--ivory)` `#1A1A18` |
| `.chip` border | `var(--gray-300)` `#D1CFC5` | `var(--gray-300)` `#4A4A45` |
| `h1`, `h2` | `var(--slate)` `#141413` | `var(--slate)` `#F5F4F0` |

### What you still need to handle manually

Three categories of values are *not* tokenised in v1 and need a dark-mode pair:

1. **Hard-coded `rgba()` shadows** in `--shadow-*` tokens. Add dark variants:

    ```css
    :root {
      --shadow-sm: 0 1px 2px rgba(20,20,19,0.06);
      --shadow-md: 0 4px 10px rgba(20,20,19,0.08);
      --shadow-lg: 0 12px 28px rgba(20,20,19,0.12);
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --shadow-sm: 0 1px 2px rgba(0,0,0,0.35);
        --shadow-md: 0 4px 10px rgba(0,0,0,0.45);
        --shadow-lg: 0 12px 28px rgba(0,0,0,0.55);
      }
    }
    ```

2. **Inline-tinted chip backgrounds** like `rgba(120,140,93,0.14)`. These read fine on both surfaces because the alpha lets the underlying surface bleed through. Leave as-is.

3. **SVG `fill`/`stroke` attribute values**. Use `currentColor` plus `color: var(--clay)` on the parent, then both modes work.

### Manual toggle (optional)

If you want a user-controlled override on top of `prefers-color-scheme`, add a `data-theme` attribute to `<html>`:

```css
:root[data-theme="dark"] {
  --ivory: #1A1A18;
  /* ... same overrides as above ... */
}
:root[data-theme="light"] {
  /* explicit light reset, useful when user opted into light on a dark OS */
  --ivory: #FAF9F5;
}
```

Then a toggle button in the UI flips `document.documentElement.dataset.theme` between `"light"`, `"dark"`, or removes the attribute to fall back to `prefers-color-scheme`.

---

## 2. Motion tokens

```css
:root {
  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;

  --ease-out:     cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out:  cubic-bezier(0.65, 0.00, 0.35, 1.00);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1.00);
}
```

### When to use which

| Token | Use for |
|---|---|
| `--duration-fast` | Color/border state changes, button press feedback, focus ring |
| `--duration-normal` | Card lift on hover, panel slide, tab indicator move |
| `--duration-slow` | Modal enter/exit, drawer open, page-level transitions |
| `--ease-out` | The default — most UI motion (decelerates into rest) |
| `--ease-in-out` | Symmetric transitions (open ↔ close, expand ↔ collapse) |
| `--ease-spring` | Playful arrivals — toast slide-in, "added to list" confirmation |

### Reduced motion

Always pair motion tokens with a `prefers-reduced-motion` guard:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Updated card pattern using motion tokens

```css
.card {
  background: var(--white);
  border: 1.5px solid var(--gray-300);
  border-radius: 12px;
  padding: 18px 20px 16px;
  transition:
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

---

## 3. Component pattern: Tabs

An accessible tablist with keyboard navigation, focus management, and a clay-coloured active indicator.

### Markup

```html
<div class="tabs">
  <div class="tab-list" role="tablist" aria-label="Status sections">
    <button id="tab-shipped" class="tab" role="tab" aria-selected="true" aria-controls="panel-shipped" tabindex="0">
      Shipped
    </button>
    <button id="tab-progress" class="tab" role="tab" aria-selected="false" aria-controls="panel-progress" tabindex="-1">
      In Progress
    </button>
    <button id="tab-blocked" class="tab" role="tab" aria-selected="false" aria-controls="panel-blocked" tabindex="-1">
      Blocked
    </button>
  </div>

  <section id="panel-shipped" class="tab-panel" role="tabpanel" aria-labelledby="tab-shipped">
    <!-- panel content -->
  </section>
  <section id="panel-progress" class="tab-panel" role="tabpanel" aria-labelledby="tab-progress" hidden>
    <!-- panel content -->
  </section>
  <section id="panel-blocked" class="tab-panel" role="tabpanel" aria-labelledby="tab-blocked" hidden>
    <!-- panel content -->
  </section>
</div>
```

### Styles

```css
.tab-list {
  display: flex;
  gap: 4px;
  border-bottom: 1.5px solid var(--gray-300);
  margin-bottom: 24px;
}
.tab {
  position: relative;
  appearance: none;
  background: transparent;
  border: none;
  padding: 12px 18px 14px;
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-500);
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-out);
}
.tab:hover { color: var(--gray-700); }
.tab:focus-visible {
  outline: 2px solid var(--clay);
  outline-offset: -2px;
  border-radius: 6px 6px 0 0;
}
.tab[aria-selected="true"] { color: var(--slate); }
.tab[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1.5px;
  height: 2.5px;
  background: var(--clay);
  border-radius: 2px 2px 0 0;
  transition: transform var(--duration-normal) var(--ease-out);
}
.tab-panel[hidden] { display: none; }
.tab-panel {
  animation: tab-fade var(--duration-normal) var(--ease-out);
}
@keyframes tab-fade {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Script (inline, ~25 lines)

```javascript
(function () {
  var list = document.querySelector('.tab-list');
  if (!list) return;
  var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));

  function activate(target) {
    tabs.forEach(function (t) {
      var isActive = t === target;
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      t.setAttribute('tabindex', isActive ? '0' : '-1');
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !isActive;
    });
    target.focus();
  }

  list.addEventListener('click', function (e) {
    var tab = e.target.closest('[role="tab"]');
    if (tab) activate(tab);
  });

  list.addEventListener('keydown', function (e) {
    var current = tabs.indexOf(document.activeElement);
    if (current === -1) return;
    if (e.key === 'ArrowRight') activate(tabs[(current + 1) % tabs.length]);
    else if (e.key === 'ArrowLeft') activate(tabs[(current - 1 + tabs.length) % tabs.length]);
    else if (e.key === 'Home') activate(tabs[0]);
    else if (e.key === 'End') activate(tabs[tabs.length - 1]);
  });
})();
```

### Accessibility checklist

- `role="tablist"` on the container, `role="tab"` on buttons, `role="tabpanel"` on panels
- `aria-selected`, `aria-controls`, `aria-labelledby` wired correctly
- Roving `tabindex`: only the selected tab is in the tab order
- ArrowLeft / ArrowRight / Home / End for keyboard nav
- `hidden` attribute on inactive panels (not `display: none` via class) so screen readers skip them

---

## 4. Component pattern: Modal / Dialog

Uses the native HTML5 `<dialog>` element — gets focus trap, `Esc` to close, and `::backdrop` for free. No focus-trap library required.

### Markup

```html
<button class="btn btn-primary" id="open-modal">Open details</button>

<dialog id="details-modal" class="modal" aria-labelledby="modal-title">
  <header class="modal-head">
    <h2 id="modal-title">Risk details</h2>
    <button class="modal-close" aria-label="Close" id="close-modal">×</button>
  </header>
  <div class="modal-body">
    <p>The webhook timeout in the OAuth handler exceeds the SLA by 1.8s on the 95th percentile.</p>
  </div>
  <footer class="modal-foot">
    <button class="btn btn-secondary" id="cancel-modal">Cancel</button>
    <button class="btn btn-primary" id="confirm-modal">Acknowledge</button>
  </footer>
</dialog>
```

### Styles

```css
.modal {
  border: none;
  border-radius: 12px;
  padding: 0;
  max-width: 520px;
  width: calc(100vw - 48px);
  background: var(--white);
  color: var(--gray-700);
  box-shadow: var(--shadow-lg);
  animation: modal-in var(--duration-normal) var(--ease-out);
}
.modal::backdrop {
  background: rgba(20,20,19,0.45);
  animation: backdrop-in var(--duration-normal) var(--ease-out);
}
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 22px;
  background: var(--clay);
  color: var(--white);
  border-radius: 12px 12px 0 0;
}
.modal-head h2 {
  margin: 0;
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 500;
  color: var(--white);
}
.modal-close {
  appearance: none;
  background: transparent;
  border: none;
  color: var(--white);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
}
.modal-close:hover    { background: rgba(255,255,255,0.18); }
.modal-close:focus-visible {
  outline: 2px solid var(--white);
  outline-offset: 1px;
}
.modal-body { padding: 22px; }
.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 22px 18px;
  border-top: 1px solid var(--gray-100);
}
@keyframes modal-in {
  from { opacity: 0; transform: translateY(-12px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

### Script (inline, ~20 lines)

```javascript
(function () {
  var modal = document.getElementById('details-modal');
  var openBtn = document.getElementById('open-modal');
  var closeBtn = document.getElementById('close-modal');
  var cancelBtn = document.getElementById('cancel-modal');
  if (!modal || !openBtn) return;

  openBtn.addEventListener('click', function () { modal.showModal(); });
  closeBtn.addEventListener('click', function () { modal.close(); });
  cancelBtn.addEventListener('click', function () { modal.close(); });

  modal.addEventListener('click', function (e) {
    // close on backdrop click: the click target is the <dialog> itself, not its content
    var rect = modal.getBoundingClientRect();
    var inside =
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top  && e.clientY <= rect.bottom;
    if (!inside) modal.close();
  });
})();
```

### Why use native `<dialog>`

- **Focus trap is automatic** — `showModal()` traps Tab inside the dialog
- **`Esc` closes for free** — fires a `cancel` event, then a `close` event
- **`::backdrop` is the dimmer** — no separate overlay element
- **`inert` attribute applied to rest of page** — screen readers can't reach background content
- **Returns focus to the trigger** when `.close()` is called

### Accessibility checklist

- `aria-labelledby` points to the `<h2>` title id
- Close button has `aria-label="Close"` (the `×` glyph alone is not readable)
- Clay-coloured header has white text — contrast ratio is 4.8:1, AA-compliant
- The backdrop click detection uses bounding-rect math (the click event on `<dialog>` itself fires when you click the backdrop because the backdrop is inside the dialog's box)

---

## 5. Skeleton update

Use this as the new starting skeleton when generating artifacts. Drop the v2 token additions into the existing `:root` block:

```html
<style>
:root {
  /* v1 palette + typography + spacing + radii + shadows … (unchanged) */

  /* v2 additions */
  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;
  --ease-out:     cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out:  cubic-bezier(0.65, 0.00, 0.35, 1.00);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1.00);
}

@media (prefers-color-scheme: dark) {
  :root {
    --ivory: #1A1A18; --slate: #F5F4F0; --white: #232320;
    --gray-100: #2A2A27; --gray-300: #4A4A45; --gray-500: #9A998F; --gray-700: #C5C3BC;
    --oat: #3A352D; --clay: #E08868; --olive: #94A573; --rust: #C5604F;
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.35);
    --shadow-md: 0 4px 10px rgba(0,0,0,0.45);
    --shadow-lg: 0 12px 28px rgba(0,0,0,0.55);
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
```
