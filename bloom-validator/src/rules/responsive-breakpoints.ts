import type { Issue, Rule } from "../types.ts";

const MAX_WIDTH_640_RE = /@media[^{]*max-width[^;{]*640/i;
const MAX_WIDTH_960_RE = /@media[^{]*max-width[^;{]*960/i;

export const responsiveBreakpoints: Rule = {
  id: "rule-5",
  name: "responsive-breakpoints",
  check(ctx): Issue[] {
    const allStyles = ctx.styleBlocks.map((b) => b.content).join("\n");
    const has640 = MAX_WIDTH_640_RE.test(allStyles);
    const has960 = MAX_WIDTH_960_RE.test(allStyles);
    if (has640 && has960) return [];

    const missing: string[] = [];
    if (!has640) missing.push("640");
    if (!has960) missing.push("960");

    return [
      {
        rule: "rule-5",
        ruleName: "responsive-breakpoints",
        severity: "error",
        line: ctx.styleBlocks[0]?.startLine ?? 1,
        message: `Missing @media max-width breakpoint(s) for ${missing.join(" and ")}px (Rule 5)`,
      },
    ];
  },
};
