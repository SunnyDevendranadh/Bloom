import type { Issue, Rule } from "../types.ts";
import { offsetToLine, snippet } from "../parser.ts";

const URL_CHECKS: Array<{ ruleName: string; re: RegExp; message: string }> = [
  {
    ruleName: "no-external-img",
    re: /<img[^>]+src\s*=\s*["']https?:\/\//gi,
    message: 'External <img src="http(s)://..."> is forbidden — embed images inline (S1 / S4)',
  },
  {
    ruleName: "no-external-link",
    re: /<link[^>]+href\s*=\s*["']https?:\/\//gi,
    message: 'External <link href="http(s)://..."> is forbidden — inline all stylesheets (S1)',
  },
];

export const noExternalUrls: Rule = {
  id: "S1",
  name: "no-external-urls",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    for (const check of URL_CHECKS) {
      check.re.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = check.re.exec(ctx.source)) !== null) {
        const line = offsetToLine(ctx.source, m.index);
        issues.push({
          rule: "S1",
          ruleName: check.ruleName,
          severity: "error",
          line,
          message: check.message,
          snippet: snippet(ctx.lines, line),
        });
      }
    }
    return issues;
  },
};
