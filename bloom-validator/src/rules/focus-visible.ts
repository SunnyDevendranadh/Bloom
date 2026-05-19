import type { Issue, Rule } from "../types.ts";

const INTERACTIVE_RE = /<(?:button|a|input|select|textarea|details|summary)\b/i;
const FOCUS_SELECTOR_RE = /:focus(?:-visible|-within)?\b/;
const OUTLINE_NONE_RE = /\boutline\s*:\s*(?:none|0(?:px)?|hidden)\b(?![^{}]*:focus)/i;

export const focusVisible: Rule = {
  id: "rule-14",
  name: "focus-visible",
  check(ctx): Issue[] {
    const body = ctx.bodyHtml;
    const hasInteractive = INTERACTIVE_RE.test(body);
    if (!hasInteractive) return [];

    let hasFocusStyle = false;
    let outlineNoneOffender: { line: number; block: number } | null = null;

    for (const block of ctx.styleBlocks) {
      if (FOCUS_SELECTOR_RE.test(block.content)) {
        hasFocusStyle = true;
      }
      // Flag broad `outline: none` that isn't scoped to a :focus selector.
      const rules = block.content.split("}");
      let offsetInBlock = 0;
      for (const rule of rules) {
        if (/outline\s*:\s*(?:none|0(?:px)?|hidden)\b/i.test(rule) && !/:focus/i.test(rule)) {
          if (!outlineNoneOffender) {
            outlineNoneOffender = {
              line: block.startLine,
              block: offsetInBlock,
            };
          }
        }
        offsetInBlock += rule.length + 1;
      }
    }

    const issues: Issue[] = [];
    if (!hasFocusStyle) {
      issues.push({
        rule: "rule-14",
        ruleName: "focus-visible",
        severity: "warning",
        line: 1,
        message:
          "No :focus or :focus-visible style found — interactive elements should have a visible focus indicator (Rule 14)",
      });
    }
    if (outlineNoneOffender && !hasFocusStyle) {
      issues.push({
        rule: "rule-14",
        ruleName: "focus-visible",
        severity: "warning",
        line: outlineNoneOffender.line,
        message:
          "`outline: none` removes the default focus ring without providing a :focus-visible replacement (Rule 14)",
      });
    }
    return issues;
  },
};
