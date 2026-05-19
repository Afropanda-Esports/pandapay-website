/**
 * Resize inventory promos for card display (~280px wide) and emit WebP.
 * Run after adding/replacing PNGs in public/inventory/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INVENTORY_DIR = path.resolve(__dirname, '../public/inventory');
/** 280px card × 2 for retina */
const TARGET_WIDTH = 560;

async function optimizeFile(filename) {
  if (!filename.endsWith('.png')) return;

  const inputPath = path.join(INVENTORY_DIR, filename);
  const base = filename.replace(/\.png$/i, '');
  const webpPath = path.join(INVENTORY_DIR, `${base}.webp`);

  const meta = await sharp(inputPath).metadata();
  const before = fs.statSync(inputPath).size;

  await sharp(inputPath)
    .rotate()
    .resize(TARGET_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 82, effort: 4 })
    .toFile(webpPath);

  const after = fs.statSync(webpPath).size;
  fs.unlinkSync(inputPath);

  console.log(
    `${base}: ${(before / 1024).toFixed(0)}KB PNG → ${(after / 1024).toFixed(0)}KB WebP (${meta.width}×${meta.height})`,
  );
}

const files = fs.readdirSync(INVENTORY_DIR);
await Promise.all(files.map((f) => optimizeFile(f)));
console.log('Done. Inventory images are WebP in public/inventory/.');
