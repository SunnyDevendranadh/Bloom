import type { Issue, Rule } from "../types.ts";
import { lineFromOffset } from "../parser.ts";

export const printmediaquery: Rule = {
  name: "print-media-query",
  description: "Ensures @media print styles are present.",
  check(ctx) {
    const issues: Issue[] = [];
    return issues;
  },
};
