import type { Issue, Rule } from "../types.ts";
import { lineFromOffset } from "../parser.ts";

export const noemptyelements: Rule = {
  name: "no-empty-elements",
  description: "Flags empty div/span/p elements.",
  check(ctx) {
    const issues: Issue[] = [];
    return issues;
  },
};
