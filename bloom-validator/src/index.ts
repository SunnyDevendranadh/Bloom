#!/usr/bin/env node
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { buildContext } from "./parser.ts";
import { renderJson, renderText } from "./reporter.ts";
import { ariaLandmarks } from "./rules/aria-landmarks.ts";
import { contrastMinimum } from "./rules/contrast-minimum.ts";
import { editorExportHint } from "./rules/editor-export-hint.ts";
import { focusVisible } from "./rules/focus-visible.ts";
import { headingHierarchy } from "./rules/heading-hierarchy.ts";
import { langAttribute } from "./rules/lang-attribute.ts";
import { noDialogApis } from "./rules/no-dialog-apis.ts";
import { noEmptyElements } from "./rules/no-empty-elements.ts";
import { noExternalDeps } from "./rules/no-external-deps.ts";
import { noExternalUrls } from "./rules/no-external-urls.ts";
import { noHardcodedHex } from "./rules/no-hardcoded-hex.ts";
import { noInlineStylesExceptRoot } from "./rules/no-inline-styles-except-root.ts";
import { noPlaceholderContent } from "./rules/no-placeholder-content.ts";
import { printMediaQuery } from "./rules/print-media-query.ts";
import { responsiveBreakpoints } from "./rules/responsive-breakpoints.ts";
import { responsiveImages } from "./rules/responsive-images.ts";
import { securityHardening } from "./rules/security-hardening.ts";
import { semanticHtml } from "./rules/semantic-html.ts";
import { viewportMeta } from "./rules/viewport-meta.ts";
import type { Issue, Rule, ValidationReport } from "./types.ts";

const ALL_RULES: Rule[] = [
  noExternalDeps,
  noExternalUrls,
  noHardcodedHex,
  semanticHtml,
  headingHierarchy,
  viewportMeta,
  responsiveBreakpoints,
  noPlaceholderContent,
  editorExportHint,
  langAttribute,
  printMediaQuery,
  noInlineStylesExceptRoot,
  noEmptyElements,
  responsiveImages,
  ariaLandmarks,
  focusVisible,
  contrastMinimum,
  securityHardening,
  noDialogApis,
];

export function validate(filePath: string, source: string): ValidationReport {
  const ctx = buildContext(filePath, source);
  const issues: Issue[] = [];
  for (const rule of ALL_RULES) {
    issues.push(...rule.check(ctx));
  }
  issues.sort((a, b) => a.line - b.line || a.rule.localeCompare(b.rule));
  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  return {
    file: filePath,
    passed: errorCount === 0,
    errorCount,
    warningCount,
    issues,
  };
}

function parseArgs(argv: string[]): { files: string[]; json: boolean; noColor: boolean; help: boolean } {
  const files: string[] = [];
  let json = false;
  let noColor = false;
  let help = false;
  for (const arg of argv) {
    if (arg === "--json") json = true;
    else if (arg === "--no-color") noColor = true;
    else if (arg === "-h" || arg === "--help") help = true;
    else if (!arg.startsWith("-")) files.push(arg);
  }
  return { files, json, noColor, help };
}

const HELP_TEXT = `bloom-validate — validate .html files against Bloom's construction and security rules

Usage:
  bloom-validate <file.html> [<file.html> ...] [options]

Options:
  --json        Emit results as JSON
  --no-color    Disable ANSI colors in terminal output
  -h, --help    Show this message

Exit codes:
  0   All files pass (no errors; warnings allowed)
  1   One or more files have errors
  2   Invalid usage or file error`;

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.files.length === 0) {
    process.stdout.write(HELP_TEXT + "\n");
    process.exit(args.help ? 0 : 2);
  }

  const reports: ValidationReport[] = [];
  for (const file of args.files) {
    const abs = resolve(file);
    try {
      statSync(abs);
    } catch {
      process.stderr.write(`bloom-validate: cannot find file: ${file}\n`);
      process.exit(2);
    }
    const source = readFileSync(abs, "utf8");
    reports.push(validate(abs, source));
  }

  if (args.json) {
    const payload = reports.length === 1 ? reports[0] : reports;
    process.stdout.write(renderJson(payload!) + "\n");
  } else {
    const useColor = !args.noColor && process.stdout.isTTY;
    for (const r of reports) {
      process.stdout.write(renderText(r, useColor) + "\n");
    }
  }

  const anyFailed = reports.some((r) => !r.passed);
  process.exit(anyFailed ? 1 : 0);
}

const entry = process.argv[1];
if (entry && (entry.endsWith("index.ts") || entry.endsWith("bloom-validate"))) {
  main();
}
