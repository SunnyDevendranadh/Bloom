import type { Issue, Rule } from "../types.ts";
import { lineFromOffset } from "../parser.ts";

/**
 * Rule 12: No alert(), prompt(), or confirm() calls.
 *
 * These blocking dialog APIs provide poor UX and are incompatible with
 * Bloom's progressive enhancement requirement. Use inline UI instead.
 */
export const noDialogApis: Rule = {
  name: "no-dialog-apis",
  description:
    "Blocks alert(), prompt(), and confirm() dialog calls — use inline UI instead",
  check(ctx) {
    const issues: Issue[] = [];

    // Match function calls inside <script> tags only
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    let sm: RegExpExecArray | null;
    while ((sm = scriptRegex.exec(ctx.source)) !== null) {
      const scriptContent = sm[1] ?? "";
      const scriptStart = sm.index + sm[0].indexOf(sm[1]);

      const banned = [
        { pattern: /\balert\s*\(/g, name: "alert()" },
        { pattern: /\bprompt\s*\(/g, name: "prompt()" },
        { pattern: /\bconfirm\s*\(/g, name: "confirm()" },
      ];

      for (const { pattern, name } of banned) {
        pattern.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = pattern.exec(scriptContent)) !== null) {
          const offset = scriptStart + m.index;
          issues.push({
            rule: "no-dialog-apis",
            severity: "error",
            line: lineFromOffset(ctx.lineStarts, offset),
            message: `${name} is not allowed — use inline UI instead`,
          });
        }
      }
    }

    return issues;
  },
};
