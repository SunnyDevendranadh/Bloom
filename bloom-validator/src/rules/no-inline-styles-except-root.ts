import type { Issue, Rule } from "../types.ts";
import { offsetToLine, snippet } from "../parser.ts";

const INLINE_STYLE_RE = /<[^>]+\sstyle\s*=\s*["']/gi;

export const noInlineStylesExceptRoot: Rule = {
  id: "rule-style",
  name: "no-inline-styles-except-root",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    INLINE_STYLE_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = INLINE_STYLE_RE.exec(ctx.source)) !== null) {
      const line = offsetToLine(ctx.source, m.index);
      issues.push({
        rule: "rule-style",
        ruleName: "no-inline-styles-except-root",
        severity: "error",
        line,
        message: "Inline style attribute is forbidden — use CSS classes and tokens (Rule style)",
        snippet: snippet(ctx.lines, line),
      });
    }
    return issues;
  },
};
