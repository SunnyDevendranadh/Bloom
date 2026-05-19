#!/usr/bin/env node
// Resolve every Bloom artifact in the repo and run bloom-validate over them.
// Globs are expanded in Node so this works identically on Bash, Zsh, PowerShell,
// and CMD without relying on shell glob expansion.

import { readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const VALIDATOR_DIR = resolve(HERE, "..");
const REPO_ROOT = resolve(VALIDATOR_DIR, "..");

const GROUPS = ["templates", "templates/skeletons", "examples"];

function htmlFilesIn(relDir) {
  const abs = join(REPO_ROOT, relDir);
  let entries;
  try {
    entries = readdirSync(abs);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`validate-all: directory not found: ${relDir}`);
      process.exit(2);
    }
    throw err;
  }
  return entries
    .filter((name) => name.endsWith(".html"))
    .map((name) => join(abs, name))
    .filter((p) => statSync(p).isFile())
    .sort();
}

const files = GROUPS.flatMap(htmlFilesIn);

if (files.length === 0) {
  console.error("validate-all: no .html files found to validate");
  process.exit(2);
}

const result = spawnSync(
  process.execPath,
  [join(VALIDATOR_DIR, "src", "index.ts"), ...files],
  { stdio: "inherit", cwd: VALIDATOR_DIR },
);

process.exit(result.status ?? 1);
