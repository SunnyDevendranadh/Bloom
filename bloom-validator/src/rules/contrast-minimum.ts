import type { Issue, Rule } from "../types.ts";
import { blockOffsetToLine, snippet } from "../parser.ts";

const RULE_BLOCK_RE = /\{[^{}]*\}/g;
const COLOR_HEX_RE = /color\s*:\s*#[0-9a-fA-F]{3,8}\b/i;
const BG_HEX_RE = /background(?:-color)?\s*:\s*#[0-9a-fA-F]{3,8}\b/i;

export const contrastMinimum: Rule = {
  id: "rule-contrast",
  name: "contrast-minimum",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    for (const block of ctx.styleBlocks) {
      RULE_BLOCK_RE.lastIndex = 0;
      let m: RegExpExecArray | null;
      let warned = false;
      while ((m = RULE_BLOCK_RE.exec(block.content)) !== null) {
        if (warned) break;
        const chunk = m[0];
        if (chunk.includes("var(")) continue;
        if (COLOR_HEX_RE.test(chunk) && BG_HEX_RE.test(chunk)) {
          const line = blockOffsetToLine(block, m.index);
          issues.push({
            rule: "rule-contrast",
            ruleName: "contrast-minimum",
            severity: "warning",
            line,
            message:
              "Hard-coded color and background hex in same rule — verify contrast ratio meets WCAG (Rule contrast)",
            snippet: snippet(ctx.lines, line),
          });
          warned = true;
        }
      }
    }
    return issues;
  },
};
