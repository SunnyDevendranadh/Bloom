import type { Issue, Rule } from "../types.ts";
import { offsetToLine, snippet } from "../parser.ts";

const IMG_RE = /<img\b[^>]*>/gi;
const RESPONSIVE_IMG_CSS_RE =
  /(?:^|})\s*(?:img|picture\s+img|figure\s+img|\.responsive-img)\b[^{]*\{[^}]*\bmax-width\s*:\s*100%/i;

export const responsiveImages: Rule = {
  id: "rule-15",
  name: "responsive-images",
  check(ctx): Issue[] {
    const images = [...ctx.source.matchAll(IMG_RE)];
    if (images.length === 0) return [];

    const hasResponsiveRule = ctx.styleBlocks.some((block) =>
      RESPONSIVE_IMG_CSS_RE.test(block.content),
    );
    if (hasResponsiveRule) return [];

    const first = images[0]!;
    const line = offsetToLine(ctx.source, first.index ?? 0);
    return [
      {
        rule: "rule-15",
        ruleName: "responsive-images",
        severity: "warning",
        line,
        message:
          "Images are present but no responsive `img { max-width: 100%; ... }` style was found (Rule 15)",
        snippet: snippet(ctx.lines, line),
      },
    ];
  },
};
