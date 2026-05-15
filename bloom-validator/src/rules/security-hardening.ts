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
];

const INNER_HTML_RE = /\.innerHTML\s*(?:\+)?=\s*([^;\n]+)/g;

function isSafeInnerHtmlRhs(rawRhs: string): boolean {
  const rhs = rawRhs.trim();
  // Single or double quoted string literal with no embedded interpolation.
  if (/^"(?:[^"\\]|\\.)*"$/.test(rhs)) return true;
  if (/^'(?:[^'\\]|\\.)*'$/.test(rhs)) return true;
  // Template literal with NO ${...} interpolation is also safe.
  if (/^`[^`]*`$/.test(rhs) && !rhs.includes("${")) return true;
  return false;
}

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
      INNER_HTML_RE.lastIndex = 0;
      let im: RegExpExecArray | null;
      while ((im = INNER_HTML_RE.exec(block.content)) !== null) {
        const rhs = im[1] ?? "";
        if (isSafeInnerHtmlRhs(rhs)) continue;
        const line = lineFromOffsetInBlock(block, im.index);
        const reason = rhs.trim().startsWith("`")
          ? "template literal with interpolation"
          : "non-literal expression";
        issues.push({
          rule: "S3",
          ruleName: "innerHTML-with-variable",
          severity: "error",
          line,
          message:
            `.innerHTML assigned from ${reason} — use textContent or createElement for untrusted data (S3)`,
          snippet: snippet(ctx.lines, line),
        });
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
