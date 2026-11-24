// One-Liner Marathon — entry writer.
// Writes a single one-line comedy joke to /output/entry.txt (or $OUTPUT_DIR
// for local testing), then validates the written file and verifies it
// byte-for-byte against the entry text, so a bad write can never pass
// silently. Runs on Node 22+ with no dependencies.

import { mkdirSync, readdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I bought a standing desk to fix my posture and now I just slouch vertically.";

const MAX_CHARS = 280;
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// The entry itself must be a single non-empty line within the cap.
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > MAX_CHARS) {
  fail(`entry is ${charCount} characters, outside the 1-${MAX_CHARS} range`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  fail("entry must not be only whitespace");
}
if (ENTRY !== ENTRY.trim()) {
  fail("entry must not start or end with whitespace");
}
// Strict UTF-8 round-trip: the text must survive an encode/decode cycle
// unchanged, so no replacement characters or invalid sequences can slip in.
const utf8RoundTrip = Buffer.from(ENTRY, "utf8").toString("utf8");
if (utf8RoundTrip !== ENTRY) {
  fail("entry is not valid UTF-8 text");
}

// Make sure the output directory exists, then clear only its CONTENTS.
// Never remove the directory itself: on the grader it is a mount point
// and deleting it fails the run.
mkdirSync(OUTPUT_DIR, { recursive: true });
for (const name of readdirSync(OUTPUT_DIR)) {
  rmSync(join(OUTPUT_DIR, name), { recursive: true, force: true });
}

writeFileSync(OUTPUT_FILE, ENTRY, "utf8");

// Read the file back and verify it byte-for-byte.
const written = readFileSync(OUTPUT_FILE, "utf8");
if (written !== ENTRY) {
  fail("read-back mismatch: entry.txt does not match the entry text");
}
const writtenBytes = Buffer.byteLength(written, "utf8");
if ([...written].length !== charCount) {
  fail("read-back mismatch: character count changed on disk");
}
// The gate counts the file's characters: no trailing newline is allowed to
// sneak in, and the on-disk bytes must be exactly the entry's UTF-8 bytes.
if (written.endsWith("\n") || written.endsWith("\r")) {
  fail("read-back mismatch: entry.txt ends with a newline");
}
const writtenRaw = readFileSync(OUTPUT_FILE);
if (!writtenRaw.equals(Buffer.from(ENTRY, "utf8"))) {
  fail("read-back mismatch: entry.txt bytes differ from the entry text");
}

console.log(`wrote ${OUTPUT_FILE}`);
console.log(`entry: ${written}`);
console.log(`characters: ${charCount}, bytes: ${writtenBytes}, lines: 1`);
