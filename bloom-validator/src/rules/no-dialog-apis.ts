import type { Issue, Rule } from "../types.ts";
import { snippet } from "../parser.ts";

export const noDialogApis: Rule = {
  id: "rule-12",
  name: "no-dialog-apis",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    const banned = [
      { pattern: /\balert\s*\(/g, label: "alert()" },
      { pattern: /\bprompt\s*\(/g, label: "prompt()" },
      { pattern: /\bconfirm\s*\(/g, label: "confirm()" },
    ];

    for (const block of ctx.scriptBlocks) {
      if (block.attributes["src"]) continue;
      for (const { pattern, label } of banned) {
        pattern.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = pattern.exec(block.content)) !== null) {
          const line =
            block.startLine + (block.content.slice(0, m.index).split("\n").length - 1);
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
