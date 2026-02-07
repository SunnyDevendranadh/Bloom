# Design System Reference

Complete token reference for all Bloom templates.

---

## Color Tokens

```css
:root {
  /* Primary palette */
  --ivory:    #FAF9F5;   /* Page background */
  --slate:    #141413;   /* Headings, strong text */
  --clay:     #D97757;   /* Primary accent, CTAs, "needs attention" */
  --oat:      #E3DACC;   /* Warm fill, hover states, secondary backgrounds */
  --olive:    #788C5D;   /* Success, "done", "shipped", check marks */
  --rust:     #B04A3F;   /* Danger, "delete", "blocking", "fail", redlines */

  /* Neutral scale */
  --white:    #FFFFFF;   /* Card backgrounds */
  --gray-100: #F0EEE6;   /* Subtle fills, code blocks, hover backgrounds */
  --gray-300: #D1CFC5;   /* Borders, dividers, rule lines */
  --gray-500: #87867F;   /* Muted text, captions, timestamps */
  --gray-700: #3D3D3A;   /* Body text, descriptions */
}
```

### Semantic Usage

| Token | Role | When to use |
|---|---|---|
| `--clay` | Primary accent | CTAs, focus states, selected items, "needs attention", risk tags |
| `--olive` | Success / secondary | "Done", "shipped", "safe", check marks, progress bars |
| `--oat` | Warm fill | Hover backgrounds, inset cards, secondary fills, accent stripes |
| `--rust` | Danger / error | "Delete", "blocking", "fail", redlines, `.del` diff lines |
| `--slate` | Strong text | Headings, emphasis, primary labels, dark backgrounds |
| `--gray-500` | Muted text | Captions, timestamps, secondary descriptions, axis labels |
| `--gray-300` | Borders | Card borders, dividers, rule lines, input borders |
| `--gray-100` | Subtle fills | Code block backgrounds, hover states, chip backgrounds |

---

## Typography

```css
:root {
  --serif: ui-serif, Georgia, "Times New Roman", serif;
  --sans:  system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --mono:  ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;
}
```

### Type Scale

| Name | Font | Size | Line-height | Weight | Letter-spacing | Usage |
|---|---|---|---|---|---|---|
| Display | serif | 48px | 1.1 | 500 | -0.02em | Hero titles, slide titles |
| h1 | serif | 36–38px | 1.15 | 500 | -0.01em | Page titles |
| h2 | serif | 24–27px | 1.3 | 500 | 0 | Section headings |
| h3 | serif | 19–22px | 1.3 | 500 | 0 | Subsection, card titles |
| Body | sans | 15px | 1.6 | 430 | 0 | Main content |
| Small | sans | 13–14px | 1.5 | 430 | 0 | Card descriptions, notes |
| Caption | mono | 11–12px | 1.4 | 500–600 | 0.06–0.12em | Eyebrows, labels, metadata |

---

## Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `--sp-1` | 4px | Inline gaps, tight padding |
| `--sp-2` | 8px | Chip gaps, list item padding |
| `--sp-3` | 12px | Card inner padding, input padding |
| `--sp-4` | 16px | Card inner padding, button padding |
| `--sp-5` | 24px | Section gaps, card grid gap |
| `--sp-6` | 32px | Section top margin |
| `--sp-7` | 48px | Header bottom, major section gaps |
| `--sp-8` | 64px | Page-level vertical rhythm |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--r-xs` | 4px | Tags, small chips |
| `--r-sm` | 8px | Buttons, inputs, inline code |
| `--r-md` | 12px | Cards, panels, dialogs |
| `--r-lg` | 20px | Pill buttons, avatars |

---

## Elevation / Box Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(20,20,19,0.06)` | Subtle lift on focused cards |
| `--shadow-md` | `0 4px 10px rgba(20,20,19,0.08)` | Default card elevation |
| `--shadow-lg` | `0 12px 28px rgba(20,20,19,0.12)` | Hover state, modals |

---

## Component Patterns

### Card

```css
.card {
  background: var(--white);
  border: 1.5px solid var(--gray-300);
  border-radius: 12px;
  padding: 18px 20px 16px;
  transition: transform 150ms ease, box-shadow 150ms ease;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

### Button variants

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 16px;
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  border: 1.5px solid transparent;
  cursor: pointer;
  transition: background 0.12s ease, border-color 0.12s ease;
}
.btn-primary   { background: var(--clay); color: var(--white); }
.btn-primary:hover { background: #C7684C; }
.btn-secondary { background: var(--white); color: var(--slate); border-color: var(--gray-300); }
.btn-ghost     { background: transparent; color: var(--gray-700); border-color: transparent; }
.btn-danger    { background: var(--rust); color: var(--white); }
```

### Chip / Badge

```css
.chip {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  border-radius: 999px;
  gap: 6px;
}
.chip.safe      { background: rgba(120,140,93,0.14); color: var(--olive); }
.chip.attention { background: rgba(217,119,87,0.12); color: var(--clay); }
.chip.medium    { background: var(--oat); color: var(--slate); }
```

### Code / Diff Block

```css
.code-block {
  background: var(--slate);
  border-radius: 12px;
  padding: 18px 20px;
  overflow-x: auto;
}
.code-block pre {
  font-family: var(--mono);
  font-size: 12.5px;
  line-height: 1.65;
  color: #E8E6DE;
  white-space: pre;
}
.kw  { color: var(--clay); }
.str { color: var(--olive); }
.cm  { color: var(--gray-500); }
.fn  { color: #C9B98A; }
```

### Section Pattern

```css
section {
  margin-top: 56px;
  scroll-margin-top: 28px;  /* for anchor links */
}

.sec-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 8px;
}

.sec-head .idx {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--clay);
  background: var(--oat);
  padding: 3px 9px;
  border-radius: 8px;
}

.sec-head h2 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 24px;
  margin: 0;
}
```

---

## Layout Patterns

### Page wrapper

```css
.page {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px;
}
```

Common widths: `860px` (reports, reviews), `980px` (design systems), `1100px` (explainers with sidebars), `1360px` (3-column comparisons).

### Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(316px, 1fr));
  gap: 20px;
}
```

### Sticky sidebar layout

```css
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 40px;
  align-items: start;
}

aside {
  position: sticky;
  top: 24px;
}

@media (max-width: 960px) {
  .layout { grid-template-columns: 1fr; }
  aside { position: static; }
}
```

---

## Print Styles

```css
@media print {
  body { padding: 0; background: white; }
  .page { max-width: 100%; }
  nav, .toolbar, button { display: none; }
  section { break-inside: avoid; }
  .card { break-inside: avoid; box-shadow: none; border: 1px solid #ccc; }
}
```


### Motion Tokens
| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `150ms` | Hover states, tooltips |
| `--duration-normal` | `300ms` | Transitions, expands |
| `--duration-slow` | `500ms` | Page transitions, reveals |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default easing |
