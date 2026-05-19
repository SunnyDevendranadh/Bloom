# Public-readiness checklist

What this repo holds itself to before any version is announced. The goal is **truthful, installable, validated, demonstrable, and useful out of the box**.

Every public release must pass every item below. If an item is failing, fix the underlying issue — don't dilute the bar.

---

## Truthful

- [ ] Every install command shown in `README.md` is either verified to work today, or clearly marked as **"Planned marketplace install — not yet live"**.
- [ ] The file tree in `README.md` matches the actual filesystem (no listed files that don't exist; no real files missing from the listing).
- [ ] Every rule cited in `README.md` and `bloom-validator/README.md` is actually present in `bloom-validator/src/rule-registry.ts`.
- [ ] No template, skeleton, or example contains the strings `Lorem`, `placeholder date`, `TODO` (outside intentional `data-template` slots), or `Template for <X> content`.
- [ ] No rule file imports a function that doesn't exist (regression-tested by `npm test` failing at import time).
- [ ] No `.md` doc references a path that does not exist on disk.

## Installable

- [ ] Each supported harness has a **manual install** path documented as the primary install method.
- [ ] The manual install for each harness has been performed end-to-end at least once and produced an `.html` artifact.
- [ ] If a marketplace install is shown, it has been verified against the latest release of that harness within the last 30 days. Unverified marketplace commands are removed or moved under "Planned".
- [ ] `cp droids/bloom.md /path/to/AGENTS.md` works for any AGENTS.md-aware harness.

## Validated

- [ ] `cd bloom-validator && npm test` passes locally on Node ≥ 22.6.
- [ ] `node bloom-validator/src/index.ts templates/*.html` exits 0.
- [ ] `node bloom-validator/src/index.ts templates/skeletons/*.html` exits 0.
- [ ] `node bloom-validator/src/index.ts examples/*.html` exits 0.
- [ ] `.github/workflows/ci.yml` is green on the release commit.
- [ ] Every rule in `rule-registry.ts` has at least one fixture under `bloom-validator/tests/fixtures/`.

## Demonstrable

- [ ] `examples/` contains at least three fully worked artifacts that match named categories in `docs/categories.md`.
- [ ] Each example renders correctly when opened from `file://` in Chrome, Safari, and Firefox.
- [ ] Each example prints to a single column with readable text and no broken layout.
- [ ] No example produces a console error or fails CSP defaults.

## Useful out of the box

- [ ] A first-time user can install Bloom for at least one harness in under 3 minutes following only `README.md`.
- [ ] After install, typing `/bloom` (or saying "bloom on") in that harness activates the skill on the next turn without further setup.
- [ ] At least one example artifact in `examples/` is referenced from the README so the user can see the deliverable before installing.
- [ ] `templates/skeletons/` and `templates/` are visibly distinguished in the README, and each skeleton's leading comment makes its purpose clear.

---

## How to run the full audit locally

```bash
# 1. Validator unit tests
cd bloom-validator && npm test && cd ..

# 2. All artifacts
node bloom-validator/src/index.ts \
  templates/*.html \
  templates/skeletons/*.html \
  examples/*.html

# 3. Repo-tree drift check (manual)
git ls-files templates/ examples/ docs/ bloom-validator/src/rules/

# 4. Scan for placeholder leakage
grep -RIn --include='*.html' -E '\b(Lorem|placeholder date|TODO|Template for)' templates/ examples/ || echo "clean"
```

All four steps must succeed before a public-readiness audit is considered green.
