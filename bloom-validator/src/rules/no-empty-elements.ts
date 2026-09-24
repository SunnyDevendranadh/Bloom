import type { Issue, Rule } from "../types.ts";
import { offsetToLine, snippet } from "../parser.ts";

const EMPTY_ELEMENT_RE = /<(div|span|p)\b([^>]*)>\s*<\/\1>/gi;

export const noEmptyElements: Rule = {
  id: "rule-16",
  name: "no-empty-elements",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    let m: RegExpExecArray | null;
    EMPTY_ELEMENT_RE.lastIndex = 0;

    while ((m = EMPTY_ELEMENT_RE.exec(ctx.source)) !== null) {
      const attrs = m[2] ?? "";
      if (/\b(?:aria-hidden|data-template|class|role)\b/i.test(attrs)) continue;

      const line = offsetToLine(ctx.source, m.index);
      issues.push({
        rule: "rule-16",
        ruleName: "no-empty-elements",
        severity: "warning",
        line,
        message: `Empty <${m[1]}> element found — remove it or mark intentional generated content with data-template (Rule 16)`,
        snippet: snippet(ctx.lines, line),
      });
    }

    return issues;
  },
};
