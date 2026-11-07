import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const markPath = path.join(publicDir, "brand/icon-orange.png");

await mkdir(publicDir, { recursive: true });

const mark = sharp(markPath).ensureAlpha();

async function resizeMark(size) {
  return mark
    .clone()
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

async function onCanvas(size, bg, markRatio = 0.8) {
  const markSize = Math.round(size * markRatio);
  const markBuf = await mark
    .clone()
    .resize(markSize, markSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const left = Math.round((size - markSize) / 2);
  const top = Math.round((size - markSize) / 2);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: bg,
    },
  })
    .composite([{ input: markBuf, left, top }])
    .png()
    .toBuffer();
}

const favicon96 = await resizeMark(96);
await writeFile(path.join(publicDir, "favicon-96x96.png"), favicon96);

const ico = await toIco([
  await resizeMark(16),
  await resizeMark(32),
  await resizeMark(48),
]);
await writeFile(path.join(publicDir, "favicon.ico"), ico);

const apple = await onCanvas(180, { r: 255, g: 255, b: 255, alpha: 1 }, 0.78);
await writeFile(path.join(publicDir, "apple-touch-icon.png"), apple);

const maskableBg = { r: 12, g: 12, b: 12, alpha: 1 };
await writeFile(
  path.join(publicDir, "web-app-manifest-192x192.png"),
  await onCanvas(192, maskableBg, 0.8),
);
await writeFile(
  path.join(publicDir, "web-app-manifest-512x512.png"),
  await onCanvas(512, maskableBg, 0.8),
);

const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" role="img" aria-label="Panda Pay">
  <image href="/brand/icon-orange.png" width="128" height="128" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
await writeFile(path.join(publicDir, "favicon.svg"), faviconSvg);

console.log("Favicons generated.");
