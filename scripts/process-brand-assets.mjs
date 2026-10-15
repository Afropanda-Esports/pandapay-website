import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(
  process.env.USERPROFILE || process.env.HOME || "",
  ".cursor/projects/c-Users-chibu-Desktop-work-panda-pay/assets",
);

const sources = [
  {
    match: "Logo_Icon_Orange",
    raw: "icon-orange.png",
    out: "icon-orange.png",
  },
  {
    match: "Logo_Icon_Black",
    raw: "icon-black.png",
    out: "icon-black.png",
  },
  {
    match: "Logo_Icon_White",
    raw: "icon-white.png",
    out: "icon-white.png",
  },
  {
    match: "Logo_White_BG-fc4a38ce",
    raw: "wordmark-light.png",
    out: "wordmark-light.png",
  },
  {
    match: "Logo_Black_BG-9036098c",
    raw: "wordmark-dark.png",
    out: "wordmark-dark.png",
  },
  {
    match: "Logo_Orange_BG-d5aa6e13",
    raw: "wordmark-orange.png",
    out: "wordmark-orange.png",
  },
  {
    match: "Logo_White_BG_2",
    raw: "wordmark-light-stacked.png",
    out: "wordmark-light-stacked.png",
  },
  {
    match: "Logo_Black_BG_2",
    raw: "wordmark-dark-stacked.png",
    out: "wordmark-dark-stacked.png",
  },
  {
    match: "Logo_Orange_BG_2",
    raw: "wordmark-orange-stacked.png",
    out: "wordmark-orange-stacked.png",
  },
];

const brandDir = path.join(root, "public/brand");
const rawDir = path.join(brandDir, "raw");

async function findSource(match) {
  const { readdir } = await import("node:fs/promises");
  const files = await readdir(assetsDir);
  const hit = files.find((f) => f.includes(match) && f.endsWith(".png"));
  if (!hit) throw new Error(`Missing source matching ${match}`);
  return path.join(assetsDir, hit);
}

/** Near-black → alpha: ≤8 fully transparent; 9–14 ramp. Keeps charcoal ink. */
function knockOutBlack(data) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    if (max <= 8) {
      data[i + 3] = 0;
    } else if (max <= 14) {
      data[i + 3] = Math.round(((max - 8) / 6) * data[i + 3]);
    }
  }
}

async function makeTransparent(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  knockOutBlack(data);

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(outputPath);
}

await mkdir(rawDir, { recursive: true });

for (const item of sources) {
  const src = await findSource(item.match);
  const rawPath = path.join(rawDir, item.raw);
  const outPath = path.join(brandDir, item.out);
  await copyFile(src, rawPath);
  await makeTransparent(rawPath, outPath);
  console.log(`wrote ${item.out}`);
}

console.log("Brand assets ready.");
