import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Most Shameless Lie — one confession, flat voice, no excuse.
// Revised wording: the first draft claimed understanding; this one
// admits the agreement itself was empty, which is the shameless part.
// The line below is the lie itself, exactly as it was told.
const LIE = "I said yes without listening.";

function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/).length;
}

function validateLie(text: string): void {
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("lie must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("lie must not carry surrounding whitespace");
  }
  const chars = [...text].length;
  if (chars < 1 || chars > 88) {
    throw new Error(`lie must be 1-88 characters, got ${chars}`);
  }
  const words = countWords(text);
  if (words < 1 || words > 5) {
    throw new Error(`lie must be 1-5 words, got ${words}`);
  }
  if (text.trim().length === 0) {
    throw new Error("lie must not be only whitespace");
  }
}

function main(): void {
  validateLie(LIE);
  const outDir = process.env.ENTRY_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LIE, "utf8");
  const back = readFileSync(outPath, "utf8");
  if (back !== LIE) {
    throw new Error("read-back mismatch: file does not match the lie");
  }
  const words = countWords(back);
  const chars = [...back].length;
  console.log(`wrote ${outPath}: ${words} words, ${chars} chars`);
}

main();
