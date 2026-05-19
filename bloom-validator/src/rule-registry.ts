import type { Rule } from "./types.ts";
import { focusVisible } from "./rules/focus-visible.ts";
import { headingHierarchy } from "./rules/heading-hierarchy.ts";
import { langAttribute } from "./rules/lang-attribute.ts";
import { noDialogApis } from "./rules/no-dialog-apis.ts";
import { noExternalDeps } from "./rules/no-external-deps.ts";
import { noHardcodedHex } from "./rules/no-hardcoded-hex.ts";
import { printMediaQuery } from "./rules/print-media-query.ts";
import { securityHardening } from "./rules/security-hardening.ts";
import { semanticHtml } from "./rules/semantic-html.ts";
import { viewportMeta } from "./rules/viewport-meta.ts";

export const ALL_RULES: Rule[] = [
  noExternalDeps,
  noHardcodedHex,
  semanticHtml,
  printMediaQuery,
  headingHierarchy,
  viewportMeta,
  noDialogApis,
  langAttribute,
  focusVisible,
  securityHardening,
];
