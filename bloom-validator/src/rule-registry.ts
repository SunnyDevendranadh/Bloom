import type { Rule } from "./types.ts";
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

export const ALL_RULES: Rule[] = [
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
