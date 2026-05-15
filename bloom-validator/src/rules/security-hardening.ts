import type { Issue, Rule } from "../types.ts";
import { lineFromOffsetInBlock, offsetToLine, snippet } from "../parser.ts";

interface SecCheck {
  id: string;
  ruleName: string;
  re: RegExp;
  message: string;
  scope: "script" | "source";
}

const SCRIPT_CHECKS: SecCheck[] = [
  {
    id: "S2",
    ruleName: "no-eval",
    re: /\beval\s*\(/g,
    message: "eval() is forbidden — never execute code from strings (S2)",
    scope: "script",
  },
  {
    id: "S2",
    ruleName: "no-function-ctor",
    re: /\bnew\s+Function\s*\(/g,
    message: "new Function() is forbidden — never execute code from strings (S2)",
    scope: "script",
  },
  {
    id: "S2",
    ruleName: "no-string-timer",
    re: /\bset(?:Timeout|Interval)\s*\(\s*["'`]/g,
    message: "setTimeout/setInterval with a string argument is forbidden — pass a function (S2)",
    scope: "script",
  },
  {
    id: "S4",
    ruleName: "no-network",
    re: /\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/g,
    message: "Network APIs (fetch/XMLHttpRequest/WebSocket/EventSource) are forbidden (S4)",
    scope: "script",
  },
  {
    id: "S3",
    ruleName: "innerHTML-with-variable",
    re: /\.innerHTML\s*(?:\+)?=\s*(?!["'`])[^;\n]+/g,
    message:
      ".innerHTML assigned from a variable — use textContent or createElement for untrusted data (S3)",
    scope: "script",
  },
];

const SOURCE_CHECKS: SecCheck[] = [
  {
    id: "S5",
    ruleName: "no-inline-handlers",
    re: /<[^>]*\bon[a-z]+\s*=\s*["'][^"']*["'][^>]*>/gi,
    message: "Inline on* event handler attribute is forbidden — use addEventListener (S5)",
    scope: "source",
  },
  {
    id: "S8",
    ruleName: "no-javascript-uri",
    re: /\b(?:href|src|action|formaction)\s*=\s*["']javascript:/gi,
    message: "javascript: URI is forbidden — use <button> with addEventListener (S8)",
    scope: "source",
  },
  {
    id: "S6",
    ruleName: "no-data-html-uri",
    re: /\b(?:href|src)\s*=\s*["']data:text\/(?:html|javascript)/gi,
    message: "data:text/html or data:text/javascript URIs are forbidden (S6)",
    scope: "source",
  },
];

export const securityHardening: Rule = {
  id: "security",
  name: "security-hardening",
  check(ctx): Issue[] {
    const issues: Issue[] = [];

    for (const block of ctx.scriptBlocks) {
      if (block.attributes["src"]) continue;
      for (const check of SCRIPT_CHECKS) {
        check.re.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = check.re.exec(block.content)) !== null) {
          const line = lineFromOffsetInBlock(block, m.index);
          issues.push({
            rule: check.id,
            ruleName: check.ruleName,
            severity: "error",
            line,
            message: check.message,
            snippet: snippet(ctx.lines, line),
          });
        }
      }
    }

    for (const check of SOURCE_CHECKS) {
      check.re.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = check.re.exec(ctx.source)) !== null) {
        const line = offsetToLine(ctx.source, m.index);
        issues.push({
          rule: check.id,
          ruleName: check.ruleName,
          severity: "error",
          line,
          message: check.message,
          snippet: snippet(ctx.lines, line),
        });
      }
    }

    return issues;
  },
};
