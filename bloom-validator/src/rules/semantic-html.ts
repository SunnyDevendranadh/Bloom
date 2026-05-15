import type { Issue, Rule } from "../types.ts";

const REQUIRED_LANDMARKS = ["header", "main"] as const;
const RECOMMENDED_LANDMARKS = ["section", "article", "nav", "aside"] as const;

function hasTag(html: string, tag: string): boolean {
  return new RegExp(`<${tag}\\b`, "i").test(html);
}

export const semanticHtml: Rule = {
  id: "rule-3",
  name: "semantic-html",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    const body = ctx.bodyHtml;

    for (const landmark of REQUIRED_LANDMARKS) {
      if (!hasTag(body, landmark)) {
        issues.push({
          rule: "rule-3",
          ruleName: "semantic-html",
          severity: "error",
          line: 1,
          message: `Missing required semantic landmark <${landmark}> in <body> (Rule 3)`,
        });
      }
    }

    const hasAnyContentLandmark = RECOMMENDED_LANDMARKS.some((t) => hasTag(body, t));
    if (!hasAnyContentLandmark) {
      issues.push({
        rule: "rule-3",
        ruleName: "semantic-html",
        severity: "warning",
        line: 1,
        message: `No <section>, <article>, <nav>, or <aside> found — prefer semantic elements over <div> (Rule 3)`,
      });
    }

    return issues;
  },
};
