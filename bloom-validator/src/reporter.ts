import type { Issue, ValidationReport } from "./types.ts";

const ANSI = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

function color(useColor: boolean, code: string, text: string): string {
  if (!useColor) return text;
  return `${code}${text}${ANSI.reset}`;
}

export function renderText(report: ValidationReport, useColor: boolean): string {
  const out: string[] = [];
  const header = color(useColor, ANSI.bold, `bloom-validate ${report.file}`);
  out.push(header);

  if (report.issues.length === 0) {
    out.push(color(useColor, ANSI.green, "  ✓ No issues found. All Bloom rules satisfied."));
    return out.join("\n");
  }

  const grouped = new Map<string, Issue[]>();
  for (const issue of report.issues) {
    const key = `${issue.rule}/${issue.ruleName}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(issue);
  }

  for (const [key, issues] of grouped) {
    const head = color(useColor, ANSI.cyan, `  [${key}]`);
    out.push(`${head} ${issues.length} issue${issues.length === 1 ? "" : "s"}`);
    for (const issue of issues) {
      const sevColor = issue.severity === "error" ? ANSI.red : ANSI.yellow;
      const sev = color(useColor, sevColor, issue.severity.toUpperCase());
      const loc = color(useColor, ANSI.gray, `line ${issue.line}`);
      out.push(`    ${sev} ${loc}  ${issue.message}`);
      if (issue.snippet) {
        out.push(color(useColor, ANSI.dim, `      › ${issue.snippet}`));
      }
    }
  }

  out.push("");
  const summary =
    `${report.errorCount} error${report.errorCount === 1 ? "" : "s"}, ` +
    `${report.warningCount} warning${report.warningCount === 1 ? "" : "s"}`;
  const summaryColor = report.passed ? ANSI.green : ANSI.red;
  const verdict = report.passed ? "PASS" : "FAIL";
  out.push(color(useColor, ANSI.bold + summaryColor, `  ${verdict} — ${summary}`));

  return out.join("\n");
}

export function renderJson(report: ValidationReport | ValidationReport[]): string {
  return JSON.stringify(report, null, 2);
}
