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
  // La bio va partida en un <span> por palabra para el revelado, así que hay que
  // comparar sobre el texto sin etiquetas, no sobre el HTML crudo.
  const plano = (html) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
  const bioEs = plano(rawEs);
  const bioEn = plano(rawEn);

  check("/ prerender español", bioEs.includes("hardgroove y el hypnotic"));
  check(
    "bio completa en el HTML prerenderizado",
    ["precisión rítmica", "residente en Cosmos Club", "Grace Dahl"].every((f) =>
      bioEs.includes(f)
    )
  );
  check("/ html lang es", rawEs.includes('<html lang="es"'));
  check("/en prerender inglés", bioEn.includes("rooted in hardgroove"));
  check("/en html lang en", rawEn.includes('<html lang="en"'));
  check("hreflang presente", rawEs.includes('hrefLang="en"'));
  check("JSON-LD presente", rawEs.includes('"@type":"Person"'));
  check("robots.txt", (await fetch(`${BASE}/robots.txt`)).ok);
  check("sitemap.xml", (await fetch(`${BASE}/sitemap.xml`)).ok);
  check("og.jpg", (await fetch(`${BASE}/images/og.jpg`)).ok);

  const rawEventos = await (await fetch(`${BASE}/eventos`)).text();
  const rawEventsEn = await (await fetch(`${BASE}/en/events`)).text();
  check("/eventos prerender español", rawEventos.includes(">Eventos<") && rawEventos.includes('<html lang="es"'));
  check("/en/events prerender inglés", rawEventsEn.includes(">Events<") && rawEventsEn.includes('<html lang="en"'));
  check("/eventos hreflang cruzado", rawEventos.includes('href="https://maraghodoy.com/en/events"'));
  const rawSitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  check("sitemap incluye eventos", rawSitemap.includes("/eventos") && rawSitemap.includes("/en/events"));
  // Desde una ruta propia el nav debe volver a la home, no apuntar a anclas inexistentes.
  check("/eventos: nav enlaza a la home", rawEventos.includes('href="/#media"'));

  // Las aserciones de listado valen igual con la lista vacía que poblada.
  const eventDates = [...rawEventos.matchAll(/dateTime="([^"]+)"/g)].map((m) => Date.parse(m[1]));
  if (eventDates.length === 0) {
    check("/eventos: estado vacío", rawEventos.includes("por confirmar"));
  } else {
    check("/eventos: JSON-LD MusicEvent", rawEventos.includes('"@type":"MusicEvent"'));
    const descending = eventDates.every((d, i) => i === 0 || d <= eventDates[i - 1]);
    check(
      "/eventos: orden estricto de fecha más reciente a más antigua",
      descending,
      `${eventDates.length} fechas`
    );
    const posters = (rawEventos.match(/<img[^>]*\/images\/events\//g) ?? []).length;
    check("/eventos: filas sin cartel no dejan img rota", posters <= eventDates.length);
  }

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

  await dp.locator("#principal").scrollIntoViewIfNeeded();
  await dp.waitForTimeout(600);
  await dp.mouse.wheel(0, 600);
  // El contenedor tarda ~1 s en aparecer, luego 850 ms de espera y ~52 ms por
  // palabra: un bloque largo necesita bastante más que el fundido solo.
  await dp.waitForTimeout(6000);
  const revelado = await dp.evaluate(() => {
    const visibles = [...document.querySelectorAll("[data-reveal]")].filter(
      (el) => el.offsetParent !== null && el.getAttribute("data-reveal") === "run"
    );
    const palabras = visibles.flatMap((el) => [...el.querySelectorAll(".reveal-word")]);
    return {
      bloques: visibles.length,
      total: palabras.length,
      opacas: palabras.filter((w) => parseFloat(getComputedStyle(w).opacity) > 0.99).length,
    };
  });
  check(
    "bio: el revelado termina con todo el texto visible",
    revelado.bloques > 0 && revelado.total > 0 && revelado.opacas === revelado.total,
    `${revelado.opacas}/${revelado.total} palabras en ${revelado.bloques} bloques`
  );

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

  await dp.goto(`${BASE}/eventos`, { waitUntil: "networkidle" });
  await dp.waitForTimeout(600);
  const posterThumbs = dp.locator('button:has(img[src*="/images/events/"])');
  const posterCount = await posterThumbs.count();
  check("/eventos: carteles renderizados", posterCount > 0, `${posterCount} carteles`);
  if (posterCount > 0) {
    // La miniatura es un derivado 4:5; el visor debe abrir el cartel entero.
    await posterThumbs.first().click();
    await dp.waitForTimeout(500);
    const dialog = dp.locator('[role="dialog"][aria-modal="true"]').first();
    check("/eventos: cartel abre el visor", await dialog.isVisible());
    const fullSrc = await dialog.locator("img").first().getAttribute("src");
    check(
      "/eventos: el visor carga el cartel entero, no la miniatura",
      !!fullSrc && fullSrc.includes("/images/events/") && !fullSrc.includes("-thumb"),
      fullSrc ?? "sin src"
    );
    await dp.keyboard.press("Escape");
    await dp.waitForTimeout(300);
  }
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

  await mp.locator("button[aria-expanded]").click();
  await mp.waitForTimeout(500);
  await mp.locator('[role="dialog"] button', { hasText: /Eventos|Events/ }).click();
  await mp.waitForTimeout(800);
  check("móvil: sección Eventos abre", await mp.locator("h2", { hasText: /Eventos|Events/ }).first().isVisible());
  await mobile.close();

  await browser.close();
  check("sin errores de página", pageErrors.length === 0, pageErrors.join("; "));
} finally {
  server.kill();
}

console.log(failures === 0 ? "\nSmoke OK" : `\n${failures} fallos`);
process.exit(failures === 0 ? 0 : 1);
