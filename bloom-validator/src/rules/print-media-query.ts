import type { Issue, Rule } from "../types.ts";

const PRINT_RE = /@media[^{]*\bprint\b/i;

export const printMediaQuery: Rule = {
  id: "rule-7",
  name: "print-media-query",
  check(ctx): Issue[] {
    if (ctx.styleBlocks.length === 0) return [];
    for (const block of ctx.styleBlocks) {
      if (PRINT_RE.test(block.content)) return [];
    }
    return [
      {
        rule: "rule-7",
        ruleName: "print-media-query",
        severity: "warning",
        line: ctx.styleBlocks[0]!.startLine,
        message:
          "No @media print block found — add print styles so the artifact is readable on paper (Rule 7)",
      },
    ];
  },
};
