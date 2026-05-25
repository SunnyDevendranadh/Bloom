# Installing Bloom in OpenCode

Bloom is a per-session sticky HTML output mode. Once activated, every substantial artifact (status report, PR review, plan, doc, comparison) becomes a self-contained `.html` file. OpenCode reads `AGENTS.md` at the repo root, so installing Bloom in OpenCode means copying the Bloom skill into your `AGENTS.md`.

## Quick install (one command)

Append the canonical Bloom skill into your project's `AGENTS.md`. If `AGENTS.md` doesn't exist yet, create it.

```bash
curl -fsSL https://raw.githubusercontent.com/SunnyDevendranadh/Bloom/main/droids/bloom-core.md >> AGENTS.md
# Optional deep patterns:
curl -fsSL https://raw.githubusercontent.com/SunnyDevendranadh/Bloom/main/droids/bloom-patterns.md >> AGENTS-patterns.md
```

If `AGENTS.md` already has content, the first command appends Bloom core after the existing instructions. Either order works — Bloom's activation logic is keyed to trigger phrases and slash commands, not document position. Skip the second command unless you need triage boards, animation sandboxes, or other interactive UI patterns.

## Verify

The core-only install adds ~210 lines (~9 KB) to `AGENTS.md` — enough for reports, reviews, and companion `.html` files without loading the full patterns appendix.

Open a fresh OpenCode session in the same repo and type:

```
/bloom
```

OpenCode should reply with a one-line plain-text confirmation that Bloom is active and tell you how to deactivate (e.g., `/bloom-off`).

Then test that substantial artifacts produce a file:

```
Show me three approaches to debounced search with tradeoffs.
```

Bloom should write the comparison to `./bloom/<date>-debounced-search-approaches.html` and reply with a one-line path. Open the file in a browser — it should render correctly with no console errors and no network requests.

## Auto-activate per workspace

Drop a `.bloom` file at the repo root (any contents, can be empty):

```bash
touch .bloom
```

Now every OpenCode session in that workspace starts with Bloom already on. No `/bloom` trigger needed.

## Deactivate

In any session, type `/bloom-off` or say "bloom off". OpenCode returns to default markdown output.

## Triggers reference

**Activate**: `/bloom`, `/bloom-on`, `/bloom-mode`, or phrases "bloom on", "let it bloom", "activate bloom".

**Deactivate**: `/bloom-off`, `/no-bloom`, `/bloom-mode-off`, or phrases "bloom off", "stop bloom", "exit bloom".

## Where artifacts land

- Free-standing artifacts (status reports, reviews, plans) → `./bloom/<date>-<slug>.html`
- Companion to a reserved `.md` (e.g., `README.md`) → sibling `.html` next to it (`README.html`). The `.md` stays canonical so OpenCode and GitHub keep working.

## See also

- Core skill: [`droids/bloom-core.md`](https://github.com/SunnyDevendranadh/Bloom/blob/main/droids/bloom-core.md)
- Optional patterns: [`droids/bloom-patterns.md`](https://github.com/SunnyDevendranadh/Bloom/blob/main/droids/bloom-patterns.md)
- Full setup guide for every harness: [`docs/harness-setup.md`](https://github.com/SunnyDevendranadh/Bloom/blob/main/docs/harness-setup.md)
