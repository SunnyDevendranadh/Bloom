import type { Issue, Rule } from "../types.ts";
import { offsetToLine, snippet } from "../parser.ts";

const SVG_TAG_RE = /<svg\b([^>]*)>/gi;
const ARIA_LABEL_RE = /\baria-label\s*=/i;
const ROLE_IMG_RE = /\brole\s*=\s*["']img["']/i;

export const ariaLandmarks: Rule = {
  id: "rule-8a",
  name: "aria-landmarks",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    SVG_TAG_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = SVG_TAG_RE.exec(ctx.source)) !== null) {
      const attrs = m[1] ?? "";
      if (ARIA_LABEL_RE.test(attrs) || ROLE_IMG_RE.test(attrs)) continue;
      const line = offsetToLine(ctx.source, m.index);
      issues.push({
        rule: "rule-8a",
        ruleName: "aria-landmarks",
        severity: "warning",
        line,
        message:
          '<svg> missing aria-label or role="img" — add accessible name for screen readers (Rule 8a)',
        snippet: snippet(ctx.lines, line),
      });
    }
    return issues;
  },
};
