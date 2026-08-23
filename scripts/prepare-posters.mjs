/**
 * carteles/ (originales) -> public/images/events/, dos derivados por cartel:
 *   <slug>-thumb.webp  4:5 exacto, para la fila del listado
 *   <slug>.webp        cartel entero, para el visor
 *
 * Los originales vienen en proporciones de 0.51 a 0.99 y a veces con la extensión
 * equivocada; normalizar aquí evita que el listado lidie con eso. Idempotente:
 * reprocesar un webp ya comprimido lo degrada en cada pasada.
 */
import sharp from "sharp";
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "carteles");
const DEST = path.join(ROOT, "public", "images", "events");

// La fila pinta 64 px en móvil y 80 px de sm en adelante: 240 es 3x del máximo.
const THUMB = { width: 240, height: 300, quality: 70 };
const FULL = { width: 1000, height: 1600, quality: 76 };

const SOURCE_EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i;

async function mtimeOrZero(file) {
  try {
    return (await stat(file)).mtimeMs;
  } catch {
    return 0;
  }
}

async function build(source, dest, transform) {
  if ((await mtimeOrZero(dest)) > (await mtimeOrZero(source))) return null;
  await transform().toFile(dest);
  return Math.round((await stat(dest)).size / 1024);
}

await mkdir(DEST, { recursive: true });

const files = (await readdir(SRC)).filter((f) => SOURCE_EXT.test(f)).sort();
if (files.length === 0) {
  console.log("No hay carteles en carteles/.");
  process.exit(0);
}

let generated = 0;
let totalKb = 0;

for (const file of files) {
  const source = path.join(SRC, file);
  const slug = file.replace(SOURCE_EXT, "");
  const meta = await sharp(source).metadata();

  const thumbKb = await build(source, path.join(DEST, `${slug}-thumb.webp`), () =>
    sharp(source)
      // Centrado a propósito: probado contra "attention" y "top", es el único que
      // conserva enteros los nombres del lineup, que van al centro del cartel.
      .resize(THUMB.width, THUMB.height, { fit: "cover", position: "centre" })
      .webp({ quality: THUMB.quality, effort: 6 })
  );

  const fullKb = await build(source, path.join(DEST, `${slug}.webp`), () =>
    sharp(source)
      .resize(FULL.width, FULL.height, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: FULL.quality, effort: 6 })
  );

  if (thumbKb === null && fullKb === null) continue;

  generated++;
  totalKb += (thumbKb ?? 0) + (fullKb ?? 0);
  const ratio = (meta.width / meta.height).toFixed(2);
  console.log(
    `${slug}  ${meta.format} ${meta.width}x${meta.height} (r=${ratio})  ->  thumb ${thumbKb ?? "="}K · full ${fullKb ?? "="}K`
  );
}

console.log(
  generated === 0
    ? `Sin cambios: ${files.length} carteles ya estaban al día.`
    : `Listo. ${generated}/${files.length} carteles procesados, ${totalKb}K generados.`
);
