# Release checklist

The process for tagging a new Bloom release.

---

## Pre-flight

1. Pick the version. Bloom follows [SemVer](https://semver.org/):
   - **Major** — breaking change to the skill's expected user contract (activation trigger removed, default output directory changed, validator rule made an error after being a warning).
   - **Minor** — additive: new template, new validator rule, new docs section, new harness support.
   - **Patch** — bug fix only. Validator parser fix, template typo, doc clarification.
2. Decide a one-line headline for the release. Write it before changing any file — if you can't write the headline, the scope isn't right yet.

## Audit

Run the full public-readiness audit (see [`public-readiness.md`](public-readiness.md)) and confirm every item is green.

```bash
cd bloom-validator && npm test && npm run validate-all && cd ..
grep -RIn --include='*.html' -E '\b(Lorem|placeholder date|TODO|Template for)' templates/ examples/ || echo "clean"
```

If any step fails, fix the underlying issue and re-run. **Never patch the audit script to make a release pass.**

## Update version-bearing files

| File | What to update |
|---|---|
| `bloom-validator/package.json` | `version` field |
| `.claude-plugin/marketplace.json` | Bloom plugin entry's `version` |
| `plugins/bloom/.claude-plugin/plugin.json` | `version` field |

Keep all three in lockstep.

## Update CHANGELOG (if present) and commit

If a `CHANGELOG.md` exists, add a section for the new version with:

- **Added** — new templates, new validator rules, new harness support, new docs
- **Changed** — non-breaking refactors a user might notice
- **Fixed** — bug fixes
- **Removed** — only if user-visible

Commit on the release branch:

```bash
git checkout -b release/vX.Y.Z
# … edit version files …
git add -A
git commit -m "Release vX.Y.Z"
```

## Open and merge the release PR

1. Open a PR titled `Release vX.Y.Z — <headline>`.
2. Wait for [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) to be green.
3. Get one approving review.
4. Merge to `main` with a merge commit (not squash) so the release boundary is preserved.

## Tag

```bash
git checkout main
git pull origin main
git tag -a vX.Y.Z -m "Bloom vX.Y.Z — <headline>"
git push origin vX.Y.Z
```

## Cut the GitHub release

Use the tag. Paste the headline as the release title. Paste the relevant CHANGELOG section as the body. Attach no binaries — Bloom is plain text.

## Post-release

- Update any pinned marketplace listings (if/when one goes live) to point at the new tag.
- If a harness's marketplace listing is now verified working, move it from "Planned marketplace install" to the primary install path in `README.md`.
- Open issues for any roadmap rules under "Planned (not yet enforced)" in `bloom-validator/README.md` that have a clearer design after this release.

---

## Rollback

If a release ships a regression that affects users (validator false-positives in a common pattern, skill activation broken in a harness):

1. Revert the merge commit on `main`.
2. Cut a patch release (`vX.Y.Z+1`) with the revert.
3. Note the rollback in the next release's CHANGELOG.

Do not force-push to `main` and do not delete the broken tag — leaving it visible is more honest than hiding it.
