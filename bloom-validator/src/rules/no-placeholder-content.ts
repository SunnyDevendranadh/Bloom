import { offsetToLine } from "../parser.ts";
import type { Issue, Rule } from "../types.ts";

const PLACEHOLDER_PATTERNS: Array<{ label: string; re: RegExp }> = [
  { label: "placeholder date", re: /placeholder date/i },
  { label: "lorem ipsum", re: /lorem ipsum/i },
  { label: "your content here", re: /your content here/i },
  { label: "template for", re: /template for/i },
  { label: "TODO", re: /\bTODO\b/i },
  { label: "TBD", re: /\bTBD\b/i },
  { label: "Company Name", re: /Company Name/i },
  { label: "John Doe", re: /John Doe/i },
  { label: "Task 1", re: /Task 1/i },
];

const BRACKET_TEXT_RE = /\[[^\]]+\]/;

function bodyStartOffset(source: string): number {
  const openMatch = source.match(/<body\b[^>]*>/i);
  if (!openMatch || openMatch.index === undefined) return 0;
  return openMatch.index + openMatch[0].length;
}

function bodyEndOffset(source: string, bodyStart: number): number {
  const tail = source.slice(bodyStart);
  const closeMatch = tail.match(/<\/body>/i);
  if (!closeMatch || closeMatch.index === undefined) return source.length;
  return bodyStart + closeMatch.index;
}

function isInsideComment(text: string, index: number): boolean {
  const commentRe = /<!--[\s\S]*?-->/g;
  let m: RegExpExecArray | null;
  while ((m = commentRe.exec(text)) !== null) {
    if (index >= m.index && index < m.index + m[0].length) return true;
  }
  return false;
}

function lineStartOffset(lines: string[], line: number): number {
  if (line <= 1) return 0;
  return lines.slice(0, line - 1).join("\n").length + 1;
}

function shouldSkipMatch(line: string, matchText: string, matchIndexInLine: number): boolean {
  const beforeMatch = line.slice(0, matchIndexInLine);
  if (/data-template\s*=/.test(beforeMatch)) return true;
  if (BRACKET_TEXT_RE.test(matchText) && /data-template\s*=/.test(line)) return true;
  return false;
}

export const noPlaceholderContent: Rule = {
  id: "rule-9",
  name: "no-placeholder-content",
  check(ctx): Issue[] {
    const bodyStart = bodyStartOffset(ctx.source);
    const bodyEnd = bodyEndOffset(ctx.source, bodyStart);
    const bodySource = ctx.source.slice(bodyStart, bodyEnd);

    const issues: Issue[] = [];
    const seen = new Set<string>();

    for (const { label, re } of PLACEHOLDER_PATTERNS) {
      const pattern = new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`);
      let m: RegExpExecArray | null;
      while ((m = pattern.exec(bodySource)) !== null) {
        if (isInsideComment(bodySource, m.index)) continue;

        const absOffset = bodyStart + m.index;
        const line = offsetToLine(ctx.source, absOffset);
        const lineText = ctx.lines[line - 1] ?? "";
        const matchIndexInLine = absOffset - lineStartOffset(ctx.lines, line);

        if (shouldSkipMatch(lineText, m[0], matchIndexInLine)) continue;

        const key = `${line}:${label}`;
        if (seen.has(key)) continue;
        seen.add(key);

        issues.push({
          rule: "rule-9",
          ruleName: "no-placeholder-content",
          severity: "error",
          line,
          message: `Placeholder content detected: "${label}" (Rule 9)`,
          snippet: lineText.trim().slice(0, 120),
        });
      }
    }

    return issues;
  },
};
