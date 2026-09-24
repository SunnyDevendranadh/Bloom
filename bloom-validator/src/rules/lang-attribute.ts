import type { Issue, Rule } from "../types.ts";
import { offsetToLine, snippet } from "../parser.ts";

const HTML_OPEN_RE = /<html\b([^>]*)>/i;
const LANG_ATTR_RE = /\blang\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i;

export const langAttribute: Rule = {
  id: "rule-13",
  name: "lang-attribute",
  check(ctx): Issue[] {
    const match = HTML_OPEN_RE.exec(ctx.source);
    if (!match) {
      return [
        {
          rule: "rule-13",
          ruleName: "lang-attribute",
          severity: "error",
          line: 1,
          message: "No <html> element found (Rule 13)",
        },
      ];
    }
    const attrs = match[1] ?? "";
    const langMatch = LANG_ATTR_RE.exec(attrs);
    const line = offsetToLine(ctx.source, match.index);
    if (!langMatch) {
      return [
        {
          rule: "rule-13",
          ruleName: "lang-attribute",
          severity: "error",
          line,
          message: '<html> is missing a lang attribute — add lang="en" or your document language (Rule 13)',
          snippet: snippet(ctx.lines, line),
        },
      ];
    }
    const value = (langMatch[2] ?? langMatch[3] ?? langMatch[4] ?? "").trim();
    if (value === "") {
      return [
        {
          rule: "rule-13",
          ruleName: "lang-attribute",
          severity: "error",
          line,
          message: '<html lang=""> is empty — set a valid BCP-47 language code like "en" (Rule 13)',
          snippet: snippet(ctx.lines, line),
        },
      ];
    }
    return [];
  },
};
