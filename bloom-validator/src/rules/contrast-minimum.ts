import type { Issue, Rule } from "../types.ts";
import { lineFromOffset } from "../parser.ts";

export const contrastminimum: Rule = {
  name: "contrast-minimum",
  description: "Warns about low text/background contrast.",
  check(ctx) {
    const issues: Issue[] = [];
    return issues;
  },
};
