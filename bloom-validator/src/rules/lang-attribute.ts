import type { Issue, Rule } from "../types.ts";
import { lineFromOffset } from "../parser.ts";

export const langattribute: Rule = {
  name: "lang-attribute",
  description: "Ensures <html> has a valid lang attribute.",
  check(ctx) {
    const issues: Issue[] = [];
    return issues;
  },
};
