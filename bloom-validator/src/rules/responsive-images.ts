import type { Issue, Rule } from "../types.ts";
import { findAllTags, offsetToLine, snippet } from "../parser.ts";

const MAX_WIDTH_RE = /max-width\s*:\s*100%/i;
const GLOBAL_IMG_RE = /img\s*\{[^}]*max-width\s*:\s*100%/i;
const ALT_ATTR_RE = /\balt\s*=/i;

export const responsiveImages: Rule = {
  id: "rule-img",
  name: "responsive-images",
  check(ctx): Issue[] {
    const issues: Issue[] = [];
    const allStyles = ctx.styleBlocks.map((b) => b.content).join("\n");
    const hasGlobalImgRule = GLOBAL_IMG_RE.test(allStyles);
    const bodyOffset = ctx.source.indexOf(ctx.bodyHtml);
    const searchHtml = ctx.bodyHtml || ctx.source;
    const baseOffset = bodyOffset >= 0 ? bodyOffset : 0;

    for (const { index, tag } of findAllTags(searchHtml, "img")) {
      const absOffset = baseOffset + index;
      const line = offsetToLine(ctx.source, absOffset);
      const hasInlineMaxWidth = MAX_WIDTH_RE.test(tag);
      if (!hasInlineMaxWidth && !hasGlobalImgRule) {
        issues.push({
          rule: "rule-img",
          ruleName: "responsive-images",
          severity: "error",
          line,
          message:
            "<img> must include max-width: 100% in style or a global img { max-width: 100% } rule (Rule img)",
          snippet: snippet(ctx.lines, line),
        });
      }
      if (!ALT_ATTR_RE.test(tag)) {
        issues.push({
          rule: "rule-img",
          ruleName: "responsive-images",
          severity: "warning",
          line,
          message: "<img> missing alt attribute — use alt=\"\" for decorative images (Rule img)",
          snippet: snippet(ctx.lines, line),
        });
      }
    }
    return issues;
  },
};
