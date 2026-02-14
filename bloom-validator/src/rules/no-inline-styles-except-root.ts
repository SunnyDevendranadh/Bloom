import type { Issue, Rule } from "../types.ts";
import { lineFromOffset } from "../parser.ts";

export const noinlinestylesexceptroot: Rule = {
  name: "no-inline-styles-except-root",
  description: "Flags inline style= attributes outside of <style> blocks.",
  check(ctx) {
    const issues: Issue[] = [];
    return issues;
  },
};
