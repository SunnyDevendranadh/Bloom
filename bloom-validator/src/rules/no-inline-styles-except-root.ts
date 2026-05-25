import type { Issue, Rule } from "../types.ts";
import { offsetToLine, snippet } from "../parser.ts";

const STYLE_ATTR_RE = /<[^>]+\sstyle\s*=\s*("([^"]*)"|'([^']*)'|[^\s>]+)[^>]*>/gi;

export const noInlineStylesExceptRoot: Rule = {
  id: "rule-17",
  name: "no-inline-styles-except-root",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    let m: RegExpExecArray | null;
    STYLE_ATTR_RE.lastIndex = 0;

    while ((m = STYLE_ATTR_RE.exec(ctx.source)) !== null) {
      const line = offsetToLine(ctx.source, m.index);
      issues.push({
        rule: "rule-17",
        ruleName: "no-inline-styles-except-root",
        severity: "error",
        line,
        message:
          "Inline `style=` attributes are forbidden — move styles into the document stylesheet and use tokens (Rule 17)",
        snippet: snippet(ctx.lines, line),
      });
    }

    return issues;
  },
};
