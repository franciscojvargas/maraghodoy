/**
 * Redimensiona y recomprime public/images (salvo events/, que es de
 * prepare-posters.mjs). Idempotente: recomprimir a q80 un webp que ya es q80
 * casi siempre pesa menos, así que se aceptaría y la foto perdería calidad en
 * cada pasada. Por eso cada fichero procesado queda anotado con su hash en
 * optimized-images.json, y sólo se toca lo nuevo o lo que ha cambiado.
 */
import sharp from "sharp";
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPTS = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(SCRIPTS, "..", "public", "images");
const MANIFEST = path.join(SCRIPTS, "optimized-images.json");
const QUALITY = 80;

const sha256 = async (file) => createHash("sha256").update(await readFile(file)).digest("hex");

/** Ruta relativa a public/images, siempre con "/", como clave del registro. */
const key = (file) => path.relative(ROOT, file).split(path.sep).join("/");

let manifest = {};
try {
  manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
} catch {
  // Sin registro todo cuenta como nuevo.
}

const record = async (file) => {
  manifest[key(file)] = await sha256(file);
};

async function optimizeWebp(file, maxDim) {
  if (manifest[key(file)] === (await sha256(file))) return;
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
  await record(file);
}

async function pngToWebp(file, maxDim) {
  const out = file.replace(/\.png$/, ".webp");
  await sharp(file)
    .resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(out);
  await record(out);
  console.log(`${path.relative(ROOT, file)} -> ${path.basename(out)}`);
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // events/ ya lo comprime prepare-posters.mjs; repasarlo sólo degradaría.
      if (entry.name === "events") continue;
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

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);

console.log("Listo.");
