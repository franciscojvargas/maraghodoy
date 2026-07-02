import sharp from "sharp";
import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const QUALITY = 80;

async function optimizeWebp(file, maxDim) {
  const before = (await stat(file)).size;
  const tmp = `${file}.tmp.webp`;
  await sharp(file)
    .resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(tmp);
  const after = (await stat(tmp)).size;
  if (after < before) {
    await rename(tmp, file);
    console.log(`${path.relative(ROOT, file)}: ${Math.round(before / 1024)}K -> ${Math.round(after / 1024)}K`);
  } else {
    await unlink(tmp);
  }
}

async function pngToWebp(file, maxDim) {
  const out = file.replace(/\.png$/, ".webp");
  await sharp(file)
    .resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(out);
  console.log(`${path.relative(ROOT, file)} -> ${path.basename(out)}`);
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.name.endsWith(".webp")) {
      await optimizeWebp(full, entry.name === "hero.webp" ? 2400 : 1600);
    } else if (entry.name.endsWith(".png")) {
      await pngToWebp(full, 600);
    }
  }
}

await walk(ROOT);

await sharp(path.join(ROOT, "hero.webp"))
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(ROOT, "og.jpg"));
console.log("og.jpg regenerada.");

console.log("Listo.");
