import type { Issue, Rule } from "../types.ts";
import { offsetToLine, snippet } from "../parser.ts";

const EXTERNAL_PATTERNS: Array<{ re: RegExp; message: string }> = [
  {
    re: /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi,
    message: 'External <script src="..."> is forbidden (Rule 1 / S1)',
  },
  {
    re: /<link\b[^>]*\brel\s*=\s*["']stylesheet["'][^>]*>/gi,
    message: 'External <link rel="stylesheet"> is forbidden (Rule 1 / S1)',
  },
  {
    re: /<link\b[^>]*\bhref\s*=\s*["'](https?:\/\/|\/\/)[^"']+["'][^>]*>/gi,
    message: "External <link href> with absolute URL is forbidden (Rule 1 / S1)",
  },
  {
    re: /@import\s+(?:url\()?["']?[^"')]+["']?\)?/gi,
    message: "CSS @import is forbidden — all styles must be inline (Rule 1 / S1)",
  },
  {
    re: /\b(?:import|export)\s+(?:[\w*{},\s]+\s+from\s+)?["'][^"']+["']/g,
    message: "ES module import/export is forbidden — keep JS inline (Rule 4)",
  },
];

export const noExternalDeps: Rule = {
  id: "rule-1",
  name: "no-external-deps",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    for (const { re, message } of EXTERNAL_PATTERNS) {
      re.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(ctx.source)) !== null) {
        const line = offsetToLine(ctx.source, m.index);
        issues.push({
          rule: "rule-1",
          ruleName: "no-external-deps",
          severity: "error",
          line,
          message,
          snippet: snippet(ctx.lines, line),
        });
      }
    }
    return issues;
  },
};
