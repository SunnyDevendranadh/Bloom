import type { Issue, Rule } from "../types.ts";

const INTERACTIVE_RE =
  /<button\b|<a\b[^>]*\bhref\s*=|<input\b|<select\b|<textarea\b|\btabindex\s*=/i;
const FOCUS_STYLE_RE = /:focus-visible\b|:focus\b/;

export const focusVisible: Rule = {
  id: "rule-8b",
  name: "focus-visible",
  check(ctx): Issue[] {
    if (!INTERACTIVE_RE.test(ctx.bodyHtml)) return [];
    const allStyles = ctx.styleBlocks.map((b) => b.content).join("\n");
    if (FOCUS_STYLE_RE.test(allStyles)) return [];
    return [
      {
        rule: "rule-8b",
        ruleName: "focus-visible",
        severity: "warning",
        line: 1,
        message:
          "Interactive elements present but no :focus-visible or :focus styles found (Rule 8b)",
      },
    ];
  },
};
