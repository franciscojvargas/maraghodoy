import { readFileSync } from "node:fs";

const cfHeaders = {};
let inRootBlock = false;
for (const line of readFileSync("public/_headers", "utf8").split(/\r?\n/)) {
  if (!line.startsWith("  ")) {
    inRootBlock = line.trim() === "/*";
    continue;
  }
  if (!inRootBlock) continue;
  const sep = line.indexOf(":");
  cfHeaders[line.slice(0, sep).trim().toLowerCase()] = line.slice(sep + 1).trim();
}

const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
const rootRule = vercel.headers.find((h) => h.source === "/(.*)" && !h.has);
const vcHeaders = Object.fromEntries(
  rootRule.headers.map(({ key, value }) => [key.toLowerCase(), value])
);

let failures = 0;
for (const key of new Set([...Object.keys(cfHeaders), ...Object.keys(vcHeaders)])) {
  if (cfHeaders[key] !== vcHeaders[key]) {
    console.error(
      `❌ ${key}\n   _headers:    ${cfHeaders[key] ?? "(ausente)"}\n   vercel.json: ${vcHeaders[key] ?? "(ausente)"}`
    );
    failures++;
  }
}

if (failures > 0) {
  console.error(`\n${failures} cabecera(s) desincronizada(s) entre Cloudflare y Vercel.`);
  process.exit(1);
}
console.log(`✅ Cabeceras de seguridad sincronizadas entre Cloudflare y Vercel (${Object.keys(cfHeaders).length})`);
