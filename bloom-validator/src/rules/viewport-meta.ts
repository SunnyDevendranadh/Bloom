import type { Issue, Rule } from "../types.ts";

const VIEWPORT_RE = /<meta\b[^>]*\bname\s*=\s*["']viewport["'][^>]*>/i;

export const viewportMeta: Rule = {
  id: "rule-10",
  name: "viewport-meta",
  check(ctx): Issue[] {
    if (VIEWPORT_RE.test(ctx.headHtml)) return [];
    return [
      {
        rule: "rule-10",
        ruleName: "viewport-meta",
        severity: "error",
        line: 1,
        message:
          'Missing <meta name="viewport" content="width=device-width, initial-scale=1"> in <head> (Rule 10)',
      },
    ];
  },
};
