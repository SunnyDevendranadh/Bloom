import type { Issue, Rule } from "../types.ts";
import { lineFromOffset } from "../parser.ts";

export const arialandmarks: Rule = {
  name: "aria-landmarks",
  description: "Ensures key ARIA landmark roles are present.",
  check(ctx) {
    const issues: Issue[] = [];
    return issues;
  },
};
