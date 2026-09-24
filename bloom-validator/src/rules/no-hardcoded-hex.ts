import type { Issue, Rule } from "../types.ts";
import { blockOffsetToLine, snippet } from "../parser.ts";

const HEX_RE = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const ROOT_RE = /(:root\s*\{|@media[^{]*\{\s*:root\s*\{)/gi;
const URL_FN_RE = /\burl\s*\([^)]*\)/g;
const STRING_RE = /(["'])(?:\\.|(?!\1).)*\1/g;

function findRootRanges(content: string): Array<[number, number]> {
  const ranges: Array<[number, number]> = [];
  ROOT_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ROOT_RE.exec(content)) !== null) {
    const start = m.index + m[0].length;
    let depth = 1;
    let i = start;
    while (i < content.length && depth > 0) {
      const ch = content[i];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      i++;
    }
    ranges.push([m.index, i]);
  }
  return ranges;
}

function isInsideRoot(offset: number, ranges: Array<[number, number]>): boolean {
  for (const [s, e] of ranges) {
    if (offset >= s && offset <= e) return true;
  }
  return false;
}

// Replace ranges with spaces so offsets stay aligned. This blanks out url(...)
// contents and quoted strings so a `#` inside them is no longer scanned.
function maskRanges(content: string, regex: RegExp): string {
  let masked = content;
  regex.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(content)) !== null) {
    masked =
      masked.slice(0, m.index) +
      " ".repeat(m[0].length) +
      masked.slice(m.index + m[0].length);
  }
  return masked;
}

export const noHardcodedHex: Rule = {
  id: "rule-2",
  name: "no-hardcoded-hex",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    for (const block of ctx.styleBlocks) {
      const rootRanges = findRootRanges(block.content);
      // Strip url(...) and quoted strings so URL fragments / image paths
      // that happen to be hex-like don't false-positive.
      const masked = maskRanges(maskRanges(block.content, URL_FN_RE), STRING_RE);
      HEX_RE.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = HEX_RE.exec(masked)) !== null) {
        if (isInsideRoot(m.index, rootRanges)) continue;
        const line = blockOffsetToLine(block, m.index);
        issues.push({
          rule: "rule-2",
          ruleName: "no-hardcoded-hex",
          severity: "error",
          line,
          message: `Hard-coded hex color "${m[0]}" outside :root — use var(--token) instead (Rule 2)`,
          snippet: snippet(ctx.lines, line),
        });
      }
    }
    return issues;
  },
};
