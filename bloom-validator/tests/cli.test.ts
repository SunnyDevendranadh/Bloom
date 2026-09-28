import { strict as assert } from "node:assert";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const cli = join(here, "../src/index.ts");
const validFile = join(here, "fixtures/valid.html");

function run(...args: string[]) {
  return spawnSync(process.execPath, ["--experimental-strip-types", cli, ...args], {
    encoding: "utf8",
  });
}

test("CLI rejects unknown options instead of silently ignoring them", () => {
  const result = run(validFile, "--jsoon");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /unknown option: --jsoon/);
  assert.equal(result.stdout, "");
});

test("CLI reports directories as usage errors without a stack trace", () => {
  const result = run(here);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /not a regular file:/);
  assert.doesNotMatch(result.stderr, /Error:|at main/);
});

test("CLI reports missing files without a stack trace", () => {
  const result = run(join(here, "fixtures/does-not-exist.html"));
  assert.equal(result.status, 2);
  assert.match(result.stderr, /cannot read/);
  assert.doesNotMatch(result.stderr, /at main/);
});

test("CLI still emits a JSON report for a valid file", () => {
  const result = run(validFile, "--json");
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.passed, true);
  assert.equal(report.errorCount, 0);
});
