import type { Issue, Rule } from "../types.ts";
import { offsetToLine, snippet } from "../parser.ts";

const EMPTY_ELEMENT_RE =
  /<(p|div|span|section|article)\b[^>]*>\s*<\/\1>/gi;

export const noEmptyElements: Rule = {
  id: "rule-empty",
  name: "no-empty-elements",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    const html = ctx.bodyHtml || ctx.source;
    const baseOffset = ctx.bodyHtml
      ? ctx.source.indexOf(ctx.bodyHtml)
      : 0;
    EMPTY_ELEMENT_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = EMPTY_ELEMENT_RE.exec(html)) !== null) {
      const line = offsetToLine(ctx.source, baseOffset + m.index);
      issues.push({
        rule: "rule-empty",
        ruleName: "no-empty-elements",
        severity: "error",
        line,
        message: "empty element",
        snippet: snippet(ctx.lines, line),
      });
    }
    return issues;
  },
};
