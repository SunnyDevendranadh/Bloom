export type Severity = "error" | "warning";

export interface Issue {
  rule: string;
  ruleName: string;
  severity: Severity;
  line: number;
  column?: number;
  message: string;
  snippet?: string;
}

export interface RuleContext {
  filePath: string;
  source: string;
  lines: string[];
  styleBlocks: ExtractedBlock[];
  scriptBlocks: ExtractedBlock[];
  bodyHtml: string;
  headHtml: string;
}

export interface ExtractedBlock {
  content: string;
  startLine: number;
  endLine: number;
  attributes: Record<string, string>;
}

export interface Rule {
  id: string;
  name: string;
  check: (ctx: RuleContext) => Issue[];
}

export interface ValidationReport {
  file: string;
  passed: boolean;
  errorCount: number;
  warningCount: number;
  issues: Issue[];
}
