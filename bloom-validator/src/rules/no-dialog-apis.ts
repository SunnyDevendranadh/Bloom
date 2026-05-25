import type { Issue, Rule } from "../types.ts";
import { blockOffsetToLine, snippet } from "../parser.ts";

const BANNED = [
  { pattern: /\balert\s*\(/g, label: "alert()" },
  { pattern: /\bprompt\s*\(/g, label: "prompt()" },
  { pattern: /\bconfirm\s*\(/g, label: "confirm()" },
];

export const noDialogApis: Rule = {
  id: "rule-12",
  name: "no-dialog-apis",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    for (const block of ctx.scriptBlocks) {
      if (block.attributes["src"]) continue;
      for (const { pattern, label } of BANNED) {
        pattern.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = pattern.exec(block.content)) !== null) {
          const line = blockOffsetToLine(block, m.index);
          issues.push({
            rule: "rule-12",
            ruleName: "no-dialog-apis",
            severity: "error",
            line,
            message: `${label} is not allowed — use inline UI instead (Rule 12)`,
            snippet: snippet(ctx.lines, line),
          });
        }
      }
    }
    return issues;
  },
};
