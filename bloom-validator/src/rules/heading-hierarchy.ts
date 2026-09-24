import type { Issue, Rule } from "../types.ts";
import { offsetToLine, snippet } from "../parser.ts";

const HEADING_RE = /<h([1-6])\b[^>]*>/gi;

export const headingHierarchy: Rule = {
  id: "rule-8",
  name: "heading-hierarchy",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    const headings: Array<{ level: number; offset: number }> = [];
    HEADING_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = HEADING_RE.exec(ctx.source)) !== null) {
      headings.push({ level: Number(m[1]), offset: m.index });
    }

    const h1Count = headings.filter((h) => h.level === 1).length;
    if (h1Count === 0) {
      issues.push({
        rule: "rule-8",
        ruleName: "heading-hierarchy",
        severity: "error",
        line: 1,
        message: "No <h1> found — every page needs exactly one top-level heading (Rule 8)",
      });
    } else if (h1Count > 1) {
      const second = headings.filter((h) => h.level === 1)[1]!;
      const line = offsetToLine(ctx.source, second.offset);
      issues.push({
        rule: "rule-8",
        ruleName: "heading-hierarchy",
        severity: "error",
        line,
        message: `Found ${h1Count} <h1> elements — use exactly one (Rule 8)`,
        snippet: snippet(ctx.lines, line),
      });
    }

    let prev = 0;
    for (const h of headings) {
      if (prev !== 0 && h.level > prev + 1) {
        const line = offsetToLine(ctx.source, h.offset);
        issues.push({
          rule: "rule-8",
          ruleName: "heading-hierarchy",
          severity: "error",
          line,
          message: `Heading skipped from <h${prev}> to <h${h.level}> — do not skip levels (Rule 8)`,
          snippet: snippet(ctx.lines, line),
        });
      }
      prev = h.level;
    }

    return issues;
  },
};
