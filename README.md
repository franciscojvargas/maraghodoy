# Mara Ghodoy — Press Kit

EPK (Electronic Press Kit): presentación, eventos, galería, vídeos, SoundCloud, technical rider y contacto.

<p align="center">
  <a href="https://www.maraghodoy.com/">
    <img src="https://img.shields.io/badge/%F0%9F%8C%90_Visitar_la_web-maraghodoy.com-white?style=for-the-badge&labelColor=black" alt="Visitar maraghodoy.com" />
  </a>
</p>

## Stack y versiones

| Dependencia        | Versión   |
|--------------------|------------|
| Next.js            | 16.1.6     |
| React              | ^19.0.0    |
| TypeScript         | ^5         |
| Tailwind CSS       | ^4         |
| Framer Motion      | ^12.33.0   |
| Node (recomendado) | 20.x       |

- **Next.js 16** con App Router (`app/`). Dos rutas estáticas (`/` en español, `/en` en inglés); el contenido se organiza por secciones.
- **React 19** con Server/Client Components; layouts y raíz en servidor; navegación y galería en cliente.
- **Tailwind 4** con PostCSS (`@tailwindcss/postcss`). Tema oscuro por defecto (`class="dark"` en el layout).
- **Framer Motion** para animaciones (reveal, stagger, parallax suave en desktop).
- Desarrollo con **Turbopack** (`next dev --turbopack`).
- **sharp** (solo dev) para el script de optimización de imágenes.

## Estructura del proyecto

El proyecto Next.js está en la **raíz del repositorio**.

```
maraghodoy/
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── carteles/                 # Carteles originales de eventos (fuente, no se publica)
├── scripts/
│   ├── optimize-images.mjs   # Redimensiona/recomprime public/images (salta events/)
│   └── prepare-posters.mjs   # carteles/ -> public/images/events (miniatura + completo)
├── public/
│   ├── _headers              # Cache headers para Cloudflare Pages
│   ├── _redirects            # Redirects para Cloudflare Pages
│   └── images/               # Imágenes optimizadas (hero, galería, press, venues, events)
├── src/
│   ├── app/
│   │   ├── (es)/             # Ruta / — prerenderizada en español (html lang="es")
│   │   ├── (en)/en/          # Ruta /en — prerenderizada en inglés (html lang="en")
│   │   ├── root-document.tsx # <html>/<body> + metadata compartidos por ambos layouts
│   │   ├── robots.ts         # robots.txt generado en build
│   │   ├── sitemap.ts        # sitemap.xml generado en build (/ y /en)
│   │   └── globals.css
│   ├── components/
│   │   ├── HomeClient.tsx          # Punto de entrada: móvil (slider) o desktop (scroll)
│   │   ├── DesktopScrollPage.tsx   # Página desktop con secciones apiladas
│   │   ├── MediaSection.tsx        # Galería + vídeos + SoundCloud + descargas (móvil y desktop)
│   │   ├── RiderSection.tsx        # Technical rider (móvil y desktop)
│   │   ├── ContactSection.tsx      # Contacto (móvil y desktop)
│   │   ├── EmbedFacades.tsx        # YouTube/SoundCloud click-to-load (sin iframes hasta pulsar play)
│   │   ├── MobileSectionShell.tsx  # Contenedor con scroll propio para secciones móviles
│   │   ├── VerticalSlider.tsx      # Slider vertical móvil de la presentación
│   │   └── …                       # Hero, slides, lightbox, nav, iconos
│   ├── content/              # Contenido sin CMS
│   │   ├── locales/          # es.ts, en.ts (mismas claves, tipado compartido)
│   │   ├── site.ts           # Config del sitio: URLs, redes, vídeos, sesiones, descargas
│   │   ├── gallery.ts        # Lista/orden de imágenes de la galería
│   │   └── index.ts          # navLinks, translations, tipos
│   ├── context/              # LanguageContext, SliderContext
│   └── hooks/                # useIsMobile, useLockBodyScroll, useMounted, usePresentationContent
└── out/                      # Generado por el build estático (`output: "export"`)
```

## Decisiones técnicas

- **Responsive:** breakpoint de layout a **768px**; el header pasa a menú de hamburguesa por debajo de **850px** (`--breakpoint-nav`). Móvil: slider vertical (una sección por pantalla). Desktop: página de scroll con secciones apiladas y animaciones. Las secciones Media/Rider/Contacto son **un único componente** compartido entre ambos modos; solo cambia el contenedor. Ambos árboles van en el HTML y la media query decide cuál se ve: el primer paint ya es correcto en cada dispositivo (sin flash) y los assets son los mismos ficheros, así que no hay descarga doble.
- **i18n:** sin librería externa. Locales `es.ts` / `en.ts` con las mismas claves; `LanguageContext` con `t` tipado. Dos rutas estáticas indexables: `/` (español) y `/en` (inglés), con `hreflang` y canonical propios. En `/`, el idioma se detecta de `localStorage` o `navigator.language`; al cambiarlo se persiste y la URL se sincroniza (`history.replaceState`).
- **Navegación:** en desktop, anclas `#presentacion`, `#eventos`, `#media`, `#rider`, `#contacto`; `/eventos` y `/en/events` son rutas propias. `useSectionNav` centraliza los tres casos de salto (home móvil, home desktop, ruta propia). En móvil, slider + nav sincronizada vía `SliderContext`. Los redirects de rutas sin hash viven en `public/_redirects` (con `output: "export"`, Next ignora `redirects()`/`headers()` del config).
- **Galería:** lista en `content/gallery.ts`; 6 imágenes iniciales + "Mostrar más". Lightbox con portal, cerrar/descargar, navegación por teclado, swipe táctil y preload de las imágenes adyacentes.
- **Scroll lock:** hook único `useLockBodyScroll` con contador de bloqueos (menú, lightbox, slider y secciones móviles comparten la lógica sin pisarse).
- **Rendimiento:** imágenes preoptimizadas con `scripts/optimize-images.mjs` (máx 1600px, hero 2400px, webp q80; los logos de salas van en webp de 600px). Los embeds de YouTube/SoundCloud son facades (`EmbedFacades.tsx`): ni un byte de terceros hasta pulsar play. Secciones pesadas con `next/dynamic`; `priority` en el hero. Export estático (`output: "export"`) para Cloudflare Pages; cache inmutable vía `public/_headers`.
- **Accesibilidad:** `MotionConfig reducedMotion="user"` respeta `prefers-reduced-motion`; focus trap (`useFocusTrap`) en menú móvil y lightbox; Escape cierra ambos; `aria-current` en la navegación móvil.
- **SEO:** metadata OG + Twitter card (imagen dedicada 1200×630 en `public/images/og.jpg`, regenerable con el script de imágenes); JSON-LD (`schema.org/Person`); `hreflang`/canonical por ruta; `robots.txt` y `sitemap.xml` generados en build; 404 con branding (`src/app/not-found.tsx`).
- **CI:** GitHub Actions (`.github/workflows/ci.yml`): `lint` + `typecheck` + `build` en cada push/PR.
- **E2E:** `npm run test:e2e` (tras `npm run build`) lanza `e2e/smoke.mjs`: 18 checks contra el export servido con Chrome headless (prerender por idioma, facades, lightbox, navegación móvil). Requiere Chrome local (`CHROME_PATH` para otra ruta).

## Comandos

| Comando                   | Descripción |
|---------------------------|-------------|
| `npm install`             | Instalar dependencias |
| `npm run dev`             | Servidor de desarrollo con Turbopack (recarga en caliente) |
| `npm run build`           | Build de producción + export estático en `out/` |
| `npm run start`           | Servir el build de producción |
| `npm run lint`            | Ejecutar ESLint |
| `npm run typecheck`       | Comprobar tipos con `tsc --noEmit` |
| `npm run images:optimize` | Optimizar las imágenes de `public/images` (ejecutar al añadir fotos nuevas) |
| `npm run posters:prepare` | Generar los derivados de `carteles/` en `public/images/events` |
| `npm run test:e2e`        | Smoke test e2e contra `out/` con Chrome headless (requiere build previo) |

## Cómo lanzar en local (desarrollo)

Para probar el **mismo resultado que en producción** (sitio estático):

```bash
npm run build
npx serve out
```

Luego abrir la URL que indique `serve` (p. ej. `http://localhost:3000`). El contenido de `out/` es lo que Cloudflare Pages sirve.

## Cómo desplegar en Cloudflare Pages

1. Conectar el repositorio a Cloudflare Pages (Dashboard → Pages → Create project → Connect to Git).
2. Configurar el build:
   - **Root directory (Project root):** raíz del repositorio (donde está `package.json`). Dejar vacío o `.`.
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
3. Guardar y desplegar. Cada push a la rama configurada generará un nuevo deploy; las previews de PR tienen su propia URL.

## Añadir contenido

- **Fotos de galería:** copiar el `.webp` a `public/images/gallery/`, ejecutar `npm run images:optimize` y añadir el nombre a `MIXED_ORDER` en `src/content/gallery.ts`.
- **Vídeos:** añadir `{ id, titleKey }` a `videos` en `src/content/site.ts` (con la clave de título en ambos locales).
- **Sesiones SoundCloud:** añadir `{ url, title }` a `soundcloudSessions` en `src/content/site.ts`.
- **Textos:** editar `src/content/locales/es.ts` y `en.ts` (deben mantener las mismas claves).
- **Eventos:** añadir un bloque a `events` en `src/content/events.ts`. El orden del array da igual: la lista se ordena sola de la fecha más reciente a la más antigua. El `lineup` es el resto del cartel sin Mara; se pinta en la ficha y va como `performer` en el JSON-LD, que es lo que asocia a cada artista con ella en Google.
- **Carteles:** dejar el original en `carteles/` con el mismo nombre que el `poster` del evento y ejecutar `npm run posters:prepare`. Genera la miniatura 4:5 y el cartel completo del visor; es idempotente, sólo procesa lo que ha cambiado.
