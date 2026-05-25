import type { Issue, Rule } from "../types.ts";

const PRINT_MEDIA_RE = /@media\s+print\b/i;

export const printMediaQuery: Rule = {
  id: "rule-13",
  name: "print-media-query",
  check(ctx): Issue[] {
    const allStyles = ctx.styleBlocks.map((b) => b.content).join("\n");
    if (PRINT_MEDIA_RE.test(allStyles)) return [];
    return [
      {
        rule: "rule-13",
        ruleName: "print-media-query",
        severity: "error",
        line: 1,
        message: "missing @media print (Rule 13)",
      },
    ];
  },
};
