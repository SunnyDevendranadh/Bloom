import type { Issue, Rule } from "../types.ts";

const HTML_TAG_RE = /<html\b[^>]*>/i;
const LANG_ATTR_RE = /lang\s*=\s*["'][^"']+["']/i;

export const langAttribute: Rule = {
  id: "rule-lang",
  name: "lang-attribute",
  check(ctx): Issue[] {
    const tag = ctx.source.match(HTML_TAG_RE)?.[0];
    if (tag && LANG_ATTR_RE.test(tag)) return [];
    return [
      {
        rule: "rule-lang",
        ruleName: "lang-attribute",
        severity: "error",
        line: 1,
        message: 'Missing lang attribute on <html> (e.g. <html lang="en">)',
      },
    ];
  },
};
