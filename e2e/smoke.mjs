import { spawn } from "node:child_process";
import { chromium } from "playwright-core";

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
const CHROME = process.env.CHROME_PATH ?? "/usr/bin/google-chrome";

let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "✅" : "❌"} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

const server = spawn("npx", ["serve", "out", "-l", String(PORT)], { stdio: "ignore" });
await new Promise((resolve, reject) => {
  const started = Date.now();
  const poll = async () => {
    try {
      await fetch(BASE);
      resolve();
    } catch {
      if (Date.now() - started > 15000) reject(new Error("serve no arrancó"));
      else setTimeout(poll, 300);
    }
  };
  poll();
});

try {
  const rawEs = await (await fetch(`${BASE}/`)).text();
  const rawEn = await (await fetch(`${BASE}/en`)).text();
  check("/ prerender español", rawEs.includes("hardgroove y el hypnotic"));
  check("/ html lang es", rawEs.includes('<html lang="es"'));
  check("/en prerender inglés", rawEn.includes("rooted in hardgroove"));
  check("/en html lang en", rawEn.includes('<html lang="en"'));
  check("hreflang presente", rawEs.includes('hrefLang="en"'));
  check("JSON-LD presente", rawEs.includes('"@type":"Person"'));
  check("robots.txt", (await fetch(`${BASE}/robots.txt`)).ok);
  check("sitemap.xml", (await fetch(`${BASE}/sitemap.xml`)).ok);
  check("og.jpg", (await fetch(`${BASE}/images/og.jpg`)).ok);

  const browser = await chromium.launch({ executablePath: CHROME, headless: true });

  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "es-ES" });
  const dp = await desktop.newPage();
  const pageErrors = [];
  dp.on("pageerror", (e) => pageErrors.push(e.message));
  await dp.goto(BASE, { waitUntil: "networkidle" });

  check("sin iframes de terceros al cargar", (await dp.locator("iframe").count()) === 0);

  await dp.locator("button", { hasText: "EN" }).first().click();
  await dp.waitForTimeout(400);
  check("toggle EN cambia URL a /en", (await dp.evaluate(() => location.pathname)) === "/en");
  check("toggle EN cambia html lang", (await dp.evaluate(() => document.documentElement.lang)) === "en");

  await dp.locator('#media').scrollIntoViewIfNeeded();
  await dp.waitForTimeout(1000);
  const ytFacade = dp.locator('button[aria-label^="Play: Mara Ghodoy"]').first();
  await ytFacade.scrollIntoViewIfNeeded();
  await ytFacade.click();
  await dp.waitForTimeout(1200);
  check("facade YouTube carga iframe al click", (await dp.locator('iframe[src*="youtube"]').count()) === 1);

  const thumb = dp.locator('button:has(img[src*="gallery"])').first();
  await thumb.scrollIntoViewIfNeeded();
  await thumb.click();
  await dp.waitForTimeout(400);
  check("lightbox abre", await dp.locator('[role="dialog"][aria-modal="true"]').first().isVisible());
  await dp.keyboard.press("ArrowRight");
  await dp.waitForTimeout(200);
  await dp.keyboard.press("Escape");
  await dp.waitForTimeout(300);
  check("lightbox cierra con Escape", (await dp.locator('[role="dialog"]').count()) === 0);
  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    locale: "es-ES",
  });
  const mp = await mobile.newPage();
  mp.on("pageerror", (e) => pageErrors.push(e.message));
  await mp.goto(BASE, { waitUntil: "networkidle" });
  await mp.waitForTimeout(500);
  check("móvil: slider visible", await mp.locator("h1").first().isVisible());

  await mp.locator("button[aria-expanded]").click();
  await mp.waitForTimeout(500);
  await mp.locator('[role="dialog"] button', { hasText: "Media" }).click();
  await mp.waitForTimeout(800);
  check("móvil: sección Media abre", await mp.locator("h2", { hasText: /Imágenes|Images/ }).first().isVisible());
  await mobile.close();

  await browser.close();
  check("sin errores de página", pageErrors.length === 0, pageErrors.join("; "));
} finally {
  server.kill();
}

console.log(failures === 0 ? "\nSmoke OK" : `\n${failures} fallos`);
process.exit(failures === 0 ? 0 : 1);
