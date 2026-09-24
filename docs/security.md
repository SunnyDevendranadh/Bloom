# Security Hardening Guide

Security rules for HTML files produced by this skill. Every generated file must be safe to open, share, and deploy.

---

## S1: No external dependencies

No `<link>` to external CSS, no `<script src="...">` from CDNs, no `@import` for fonts, no `font-face` references to external URLs. Everything must be inline. The file must work offline and behind air-gapped networks.

**Rationale:** External dependencies create tracking vectors, require network access, and break when CDNs go down.

```html
<!-- FORBIDDEN -->
<link rel="stylesheet" href="https://cdn.example.com/tailwind.css">
<script src="https://cdn.example.com/react.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet">

<!-- REQUIRED -->
<style>
  /* All styles inline */
  :root { --sans: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
</style>
```

---

## S2: No code execution from strings

Never use `eval()`, `new Function()`, `setTimeout(string)`, or `setInterval(string)`. All logic must be in explicit function declarations or arrow functions.

**Rationale:** String-based code execution is the #1 vector for injection attacks if any part of the content comes from user input.

```javascript
// FORBIDDEN
eval('alert("hello")');
new Function('return 1')();
setTimeout('doSomething()', 100);
setInterval('tick()', 1000);

// REQUIRED
setTimeout(function () { doSomething(); }, 100);
setInterval(function () { tick(); }, 1000);
```

---

## S3: No innerHTML with untrusted content

When building DOM from data (user input, API responses, localStorage), use `document.createElement()`, `element.textContent`, and `element.setAttribute()`. Only use `innerHTML` when the content is entirely controlled and known-safe (e.g., your own template strings with no user input interpolated).

**Rationale:** `innerHTML` with user data enables XSS. Even if current content is safe, future changes might introduce vectors.

```javascript
// FORBIDDEN
card.innerHTML = '<h3>' + userInput + '</h3>';

// REQUIRED
var h3 = document.createElement('h3');
h3.textContent = userInput;
card.appendChild(h3);

// ACCEPTABLE (entirely controlled content)
element.innerHTML = '<div class="stage"><div class="es-a"><h3>No tasks yet</h3></div></div>';
```

---

## S4: No network requests

Generated files must not make `fetch()`, `XMLHttpRequest`, `WebSocket`, `EventSource`, or `<img src="...">` requests to external servers. The file is a static document.

**Rationale:** Network requests from HTML files can exfiltrate data or load malicious content.

```html
<!-- FORBIDDEN -->
<img src="https://tracker.example.com/pixel.gif">
<script>fetch('/api/data');</script>
<link rel="dns-prefetch" href="//tracker.example.com">
```

---

## S5: Content Security Policy compatible

The file must work under a strict CSP:

```
Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'
```

This means:
- No inline event handlers (`onclick`, `onload`, `onerror`, etc.)
- No `javascript:` URIs
- All event handling via `addEventListener`

```html
<!-- FORBIDDEN -->
<button onclick="handleClick()">Go</button>
<a href="javascript:void(0)">Link</a>
<body onload="init()">

<!-- REQUIRED -->
<button id="btn">Go</button>
<script>
document.getElementById('btn').addEventListener('click', handleClick);
</script>
```

---

## S6: No data: URIs for executable content

Never use `data:text/html`, `data:text/javascript`, or `data:application/json` URIs. `data:image/svg+xml` is acceptable only if the SVG contains no `<script>` elements, no `on*` event handlers, and no `href="javascript:"` attributes.

```html
<!-- FORBIDDEN -->
<iframe src="data:text/html,<script>alert(1)</script>">
<a href="data:text/html,...">Link</a>

<!-- ACCEPTABLE (safe SVG) -->
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3Crect%20width='100'%20height='100'/%3E%3C/svg%3E">
```

---

## S7: Sanitize clipboard output

When implementing "Copy as markdown/JSON" export buttons:

1. Build the output string programmatically (not from innerHTML)
2. Use `textContent` or manual escaping for any user-influenced data
3. Never copy raw `innerHTML` to the clipboard

```javascript
// FORBIDDEN
navigator.clipboard.writeText(element.innerHTML);

// REQUIRED
function buildMarkdown(tickets) {
  return tickets.map(function (t) {
    return '- **' + t.id + '** ' + t.title + ' — ' + t.tag;
  }).join('\n');
}
navigator.clipboard.writeText(buildMarkdown(currentTickets));
```

---

## S8: No `javascript:` URIs

Never use `href="javascript:..."` or `action="javascript:..."`. Use `<button>` elements with `addEventListener` instead.

```html
<!-- FORBIDDEN -->
<a href="javascript:showPanel('x')">Show X</a>
<form action="javascript:void(0)">

<!-- REQUIRED -->
<button id="showX">Show X</button>
<script>
document.getElementById('showX').addEventListener('click', function () {
  showPanel('x');
});
</script>
```

---

## S9: Escape HTML entities in dynamic content

When inserting system-generated content (file paths, code snippets, ticket titles) into the DOM, always escape HTML entities:

```javascript
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
```

---

## S10: Use `document.createElement()` for drag-and-drop

When implementing drag-and-drop (triage boards, etc.), create elements via `document.createElement()` and `element.textContent` rather than building HTML strings. This prevents injection through ticket titles or descriptions.

---

## Self-check before delivery

Run through this list before delivering any `.html` file:

- [ ] File opens correctly from `file://` with no console errors
- [ ] No `<script src>`, `<link href>`, or `@import url()` pointing to external resources
- [ ] No `eval()`, `new Function()`, or string-based `setTimeout`/`setInterval`
- [ ] No `innerHTML` with user-controlled data
- [ ] No `fetch()`, `XMLHttpRequest`, or `WebSocket` calls
- [ ] No `onclick`, `onload`, or `on*` inline handlers — only `addEventListener`
- [ ] No `javascript:` URIs
- [ ] No `data:` URIs for executable content
- [ ] Clipboard output is built programmatically, not from innerHTML
- [ ] Content-Security-Policy compatible
