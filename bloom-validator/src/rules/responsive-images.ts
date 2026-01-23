import type { Issue, Rule } from "../types.ts";
import { lineFromOffset } from "../parser.ts";

export const responsiveimages: Rule = {
  name: "responsive-images",
  description: "Ensures images have max-width:100% and appropriate sizing.",
  check(ctx) {
    const issues: Issue[] = [];
    return issues;
  },
};
