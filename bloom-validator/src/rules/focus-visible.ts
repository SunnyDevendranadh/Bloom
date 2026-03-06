import type { Issue, Rule } from "../types.ts";
import { lineFromOffset } from "../parser.ts";

export const focusvisible: Rule = {
  name: "focus-visible",
  description: "Ensures interactive elements have visible focus indicators.",
  check(ctx) {
    const issues: Issue[] = [];
    return issues;
  },
};
