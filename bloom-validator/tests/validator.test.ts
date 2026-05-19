import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { validate } from "../src/index.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES = join(HERE, "fixtures");

function load(name: string): { path: string; source: string } {
  const path = join(FIXTURES, name);
  return { path, source: readFileSync(path, "utf8") };
}

describe("bloom-validator", () => {
  it("valid.html has zero issues across all rules", () => {
    const { path, source } = load("valid.html");
    const report = validate(path, source);
    assert.equal(
      report.issues.length,
      0,
      `expected zero issues, got ${report.issues.length}: ${JSON.stringify(report.issues, null, 2)}`,
    );
    assert.equal(report.passed, true);
    assert.equal(report.errorCount, 0);
    assert.equal(report.warningCount, 0);
  });

  it("valid-with-urls.html does not false-positive on hex inside url() or strings", () => {
    const { path, source } = load("valid-with-urls.html");
    const report = validate(path, source);
    const hexIssues = report.issues.filter((i) => i.ruleName === "no-hardcoded-hex");
    assert.equal(
      hexIssues.length,
      0,
      `expected zero hex issues, got: ${JSON.stringify(hexIssues, null, 2)}`,
    );
  });

  it("flags external script/link/import (Rule 1, Rule 4)", () => {
    const { path, source } = load("invalid-external-deps.html");
    const report = validate(path, source);
    assert.equal(report.passed, false);
    const rules = new Set(report.issues.map((i) => i.ruleName));
    assert.ok(rules.has("no-external-deps"), `missing no-external-deps in ${[...rules].join(",")}`);
    const messages = report.issues.map((i) => i.message).join("\n");
    assert.match(messages, /script src/i);
    assert.match(messages, /stylesheet/i);
    assert.match(messages, /@import/i);
    assert.match(messages, /import\/export/i);
    assert.match(messages, /Dynamic import/i, "should flag await import(...) dynamic import");
  });

  it("flags hard-coded hex outside :root (Rule 2)", () => {
    const { path, source } = load("invalid-hex.html");
    const report = validate(path, source);
    assert.equal(report.passed, false);
    const hexIssues = report.issues.filter((i) => i.ruleName === "no-hardcoded-hex");
    assert.ok(hexIssues.length >= 3, `expected ≥3 hex issues, got ${hexIssues.length}`);
    for (const issue of hexIssues) {
      assert.doesNotMatch(issue.message, /D97757/, "tokens in :root should not be flagged");
    }
  });

  it("flags missing semantic landmarks (Rule 3)", () => {
    const { path, source } = load("invalid-semantic.html");
    const report = validate(path, source);
    assert.equal(report.passed, false);
    const semantic = report.issues.filter((i) => i.ruleName === "semantic-html");
    assert.ok(semantic.length >= 2, `expected ≥2 semantic issues, got ${semantic.length}`);
    const messages = semantic.map((i) => i.message).join("\n");
    assert.match(messages, /<header>/);
    assert.match(messages, /<main>/);
  });

  it("flags heading hierarchy violations (Rule 8)", () => {
    const { path, source } = load("invalid-heading.html");
    const report = validate(path, source);
    assert.equal(report.passed, false);
    const heading = report.issues.filter((i) => i.ruleName === "heading-hierarchy");
    const messages = heading.map((i) => i.message).join("\n");
    assert.match(messages, /skipped/i, "should detect h1→h3 skip");
    assert.match(messages, /2 <h1>/, "should detect duplicate h1");
  });

  it("flags security violations (S2/S3/S4/S5/S6/S8)", () => {
    const { path, source } = load("invalid-security.html");
    const report = validate(path, source);
    assert.equal(report.passed, false);
    const rules = new Set(report.issues.map((i) => i.ruleName));
    for (const expected of [
      "no-eval",
      "no-function-ctor",
      "no-string-timer",
      "no-network",
      "innerHTML-with-variable",
      "no-inline-handlers",
      "no-javascript-uri",
      "no-data-html-uri",
    ]) {
      assert.ok(rules.has(expected), `missing security rule: ${expected} (found: ${[...rules].join(", ")})`);
    }
    const innerHtmlIssues = report.issues.filter((i) => i.ruleName === "innerHTML-with-variable");
    const messages = innerHtmlIssues.map((i) => i.message).join("\n");
    assert.match(messages, /template literal with interpolation/i, "should flag `${x}` template literals");
    assert.match(messages, /non-literal expression/i, "should flag bare variable assignments");
    assert.equal(
      innerHtmlIssues.length,
      2,
      "should flag variable + template-with-interp but NOT the static string literal",
    );
  });

  it("flags alert(), prompt(), and confirm() calls (Rule 12)", () => {
    const { path, source } = load("invalid-dialog-apis.html");
    const report = validate(path, source);
    assert.equal(report.passed, false);
    const dialogIssues = report.issues.filter(
      (i) => i.ruleName === "no-dialog-apis"
    );
    assert.equal(
      dialogIssues.length,
      3,
      `expected 3 dialog issues, got ${dialogIssues.length}: ${JSON.stringify(dialogIssues)}`
    );
    const messages = dialogIssues.map((i) => i.message).join("\n");
    assert.match(messages, /alert\(\)/, "should flag alert()");
    assert.match(messages, /prompt\(\)/, "should flag prompt()");
    assert.match(messages, /confirm\(\)/, "should flag confirm()");
  });

  it("emits JSON-serializable issues with line numbers", () => {
    const { path, source } = load("invalid-hex.html");
    const report = validate(path, source);
    const json = JSON.stringify(report);
    const parsed = JSON.parse(json);
    assert.ok(Array.isArray(parsed.issues));
    for (const issue of parsed.issues) {
      assert.equal(typeof issue.line, "number");
      assert.ok(issue.line >= 1, `line should be ≥1, got ${issue.line}`);
    }
  });

  it("returns passed:true with errorCount:0 on valid file", () => {
    const { path, source } = load("valid.html");
    const report = validate(path, source);
    assert.deepEqual(
      { passed: report.passed, errorCount: report.errorCount },
      { passed: true, errorCount: 0 },
    );
  });

  it("flags missing lang attribute on <html> (Rule 13)", () => {
    const { path, source } = load("invalid-lang.html");
    const report = validate(path, source);
    assert.equal(report.passed, false);
    const langIssues = report.issues.filter((i) => i.ruleName === "lang-attribute");
    assert.equal(langIssues.length, 1, `expected 1 lang issue, got ${langIssues.length}`);
    assert.match(langIssues[0]!.message, /missing a lang attribute/);
  });

  it("warns when no @media print and no :focus styles (Rules 7, 14)", () => {
    const { path, source } = load("invalid-print-focus.html");
    const report = validate(path, source);
    // Both rules emit warnings, not errors, so passed should still be true.
    assert.equal(report.errorCount, 0, `expected 0 errors, got ${report.errorCount}`);
    const printIssues = report.issues.filter((i) => i.ruleName === "print-media-query");
    const focusIssues = report.issues.filter((i) => i.ruleName === "focus-visible");
    assert.equal(printIssues.length, 1, "expected exactly 1 print-media-query warning");
    assert.equal(printIssues[0]!.severity, "warning");
    assert.ok(focusIssues.length >= 1, "expected at least 1 focus-visible warning");
    for (const issue of focusIssues) {
      assert.equal(issue.severity, "warning");
    }
  });

  it("flags unresponsive images, empty elements, and inline styles", () => {
    const { path, source } = load("invalid-responsive-empty-inline-style.html");
    const report = validate(path, source);
    assert.equal(report.passed, false);

    const rules = new Set(report.issues.map((i) => i.ruleName));
    assert.ok(rules.has("responsive-images"), `missing responsive-images in ${[...rules].join(", ")}`);
    assert.ok(rules.has("no-empty-elements"), `missing no-empty-elements in ${[...rules].join(", ")}`);
    assert.ok(
      rules.has("no-inline-styles-except-root"),
      `missing no-inline-styles-except-root in ${[...rules].join(", ")}`,
    );

    const inlineStyle = report.issues.find((i) => i.ruleName === "no-inline-styles-except-root");
    assert.equal(inlineStyle?.severity, "error");
  });
});
