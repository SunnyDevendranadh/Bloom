import type { ExtractedBlock, RuleContext } from "./types.ts";

export function buildContext(filePath: string, source: string): RuleContext {
  const lines = source.split(/\r?\n/);
  return {
    filePath,
    source,
    lines,
    styleBlocks: extractBlocks(source, "style"),
    scriptBlocks: extractBlocks(source, "script"),
    bodyHtml: extractSection(source, "body"),
    headHtml: extractSection(source, "head"),
  };
}

export function offsetToLine(source: string, offset: number): number {
  let line = 1;
  for (let i = 0; i < offset && i < source.length; i++) {
    if (source[i] === "\n") line++;
  }
  return line;
}

function parseAttributes(tagInner: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const attrRe = /([a-zA-Z_:][\w:.\-]*)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let m: RegExpExecArray | null;
  while ((m = attrRe.exec(tagInner)) !== null) {
    const name = m[1]!.toLowerCase();
    const value = m[3] ?? m[4] ?? m[5] ?? "";
    attrs[name] = value;
  }
  return attrs;
}

export function extractBlocks(source: string, tagName: string): ExtractedBlock[] {
  const blocks: ExtractedBlock[] = [];
  const openRe = new RegExp(`<${tagName}\\b([^>]*)>`, "gi");
  const closeMarker = `</${tagName}>`;
  const lowerSource = source.toLowerCase();
  let m: RegExpExecArray | null;
  while ((m = openRe.exec(source)) !== null) {
    const openEnd = openRe.lastIndex;
    const closeIdx = lowerSource.indexOf(closeMarker, openEnd);
    if (closeIdx === -1) continue;
    const content = source.slice(openEnd, closeIdx);
    blocks.push({
      content,
      startLine: offsetToLine(source, openEnd),
      endLine: offsetToLine(source, closeIdx),
      attributes: parseAttributes(m[1] ?? ""),
    });
    openRe.lastIndex = closeIdx + closeMarker.length;
  }
  return blocks;
}

export function extractSection(source: string, tagName: string): string {
  const openRe = new RegExp(`<${tagName}\\b[^>]*>`, "i");
  const closeRe = new RegExp(`</${tagName}>`, "i");
  const openMatch = source.match(openRe);
  if (!openMatch || openMatch.index === undefined) return "";
  const start = openMatch.index + openMatch[0].length;
  const tail = source.slice(start);
  const closeMatch = tail.match(closeRe);
  if (!closeMatch || closeMatch.index === undefined) return tail;
  return tail.slice(0, closeMatch.index);
}

export function findAllTags(
  html: string,
  tagName: string,
): Array<{ index: number; tag: string; attrs: Record<string, string> }> {
  const out: Array<{ index: number; tag: string; attrs: Record<string, string> }> = [];
  const re = new RegExp(`<${tagName}\\b([^>]*)>`, "gi");
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    out.push({ index: m.index, tag: m[0], attrs: parseAttributes(m[1] ?? "") });
  }
  return out;
}

export function blockOffsetToLine(block: ExtractedBlock, offsetInContent: number): number {
  let line = block.startLine;
  for (let i = 0; i < offsetInContent && i < block.content.length; i++) {
    if (block.content[i] === "\n") line++;
  }
  return line;
}

export function snippet(lines: string[], line: number): string {
  const idx = line - 1;
  if (idx < 0 || idx >= lines.length) return "";
  return (lines[idx] ?? "").trim().slice(0, 120);
}
