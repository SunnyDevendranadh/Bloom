import type { Issue, Rule } from "../types.ts";

const EDITOR_NAME_RE = /(?:triage|board|editor)/i;
const TITLE_RE = /<title\b[^>]*>([\s\S]*?)<\/title>/i;
const WRITE_TEXT_RE = /writeText\s*\(/;
const EXEC_COPY_RE = /execCommand\s*\(\s*['"]copy['"]/;

export const editorExportHint: Rule = {
  id: "rule-6-hint",
  name: "editor-export-hint",
  check(ctx): Issue[] {
    const title = ctx.source.match(TITLE_RE)?.[1]?.trim() ?? "";
    const suggestsEditor = EDITOR_NAME_RE.test(ctx.filePath) || EDITOR_NAME_RE.test(title);
    if (!suggestsEditor) return [];

    const allScripts = ctx.scriptBlocks.map((b) => b.content).join("\n");
    const hasCopyExport = WRITE_TEXT_RE.test(allScripts) || EXEC_COPY_RE.test(allScripts);
    if (hasCopyExport) return [];

    return [
      {
        rule: "rule-6-hint",
        ruleName: "editor-export-hint",
        severity: "warning",
        line: 1,
        message:
          "Editor/triage/board artifact may be missing clipboard export (writeText or execCommand('copy')) (Rule 6 hint)",
      },
    ];
  },
};
