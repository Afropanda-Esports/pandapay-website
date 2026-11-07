/**
 * Downloads the hotlinked game art in src/content/home.ts into
 * public/images/platforms/ and points the content file at the local copies.
 *
 *   node scripts/localize-game-art.mjs            download + rewrite
 *   node scripts/localize-game-art.mjs --dry-run  show what it would do
 *
 * Images that can't be downloaded stay hotlinked, so it's safe to re-run.
 * If `sharp` is installed the images are saved as 1920px-wide .webp;
 * otherwise they keep their original format.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const FILE = "src/content/home.ts";
const OUT_DIR = "public/images/platforms";
const dry = process.argv.includes("--dry-run");

let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.log("sharp not installed: keeping original image formats.");
}

const EXT = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif", "image/gif": "gif" };
const lines = (await readFile(FILE, "utf8")).split("\n");
let platform = null;
let ok = 0;
let failed = 0;

for (let i = 0; i < lines.length; i++) {
  const p = lines[i].match(/^ {8}id: "([a-z0-9-]+)",$/);
  if (p) platform = p[1];
  const g = lines[i].match(/^(\s*\{ id: ")([^"]+)(", title: "[^"]*", src: ")(https?:\/\/[^"]+)(".*)$/);
  if (!g || !platform) continue;
  const [, a, id, b, url, rest] = g;
  const base = `${platform}-${id}`;
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0", accept: "image/*" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = (res.headers.get("content-type") || "").split(";")[0].trim();
    if (!type.startsWith("image/")) throw new Error(`not an image (${type})`);
    let buf = Buffer.from(await res.arrayBuffer());
    let ext = EXT[type] || "jpg";
    if (sharp) {
      buf = await sharp(buf).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
      ext = "webp";
    }
    const local = `/images/platforms/${base}.${ext}`;
    if (!dry) {
      await mkdir(OUT_DIR, { recursive: true });
      await writeFile(path.join("public", local), buf);
      lines[i] = `${a}${id}${b}${local}${rest}`;
    }
    console.log(`ok     ${base}  ${(buf.length / 1024).toFixed(0)} KB`);
    ok++;
  } catch (e) {
    console.log(`FAILED ${base}  ${e.message}  (left as a hotlink)`);
    failed++;
  }
}

if (!dry && ok) await writeFile(FILE, lines.join("\n"));
console.log(`\n${ok} localised, ${failed} left hotlinked.${dry ? " (dry run, nothing written)" : ""}`);
