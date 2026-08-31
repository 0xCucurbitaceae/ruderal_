import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The crack artwork, read once at build time so it can be inlined into the
 * page. Every route is prerendered, so this never runs on a request.
 *
 * public/design/hero-cracks.svg carries the classes and per-branch masks the
 * load animation needs; globals.css explains what drives them.
 */
export const cracksSvg = readFileSync(
  join(process.cwd(), "public/design/hero-cracks.svg"),
  "utf8",
).replace("<svg ", '<svg class="block size-full" ');
