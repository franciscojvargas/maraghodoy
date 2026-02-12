# Mara Ghodoy — Press Kit

EPK (Electronic Press Kit) en una sola página: presentación, galería, vídeos, SoundCloud, technical rider y contacto.

## Stack y versiones

| Dependencia        | Versión   |
|--------------------|------------|
| Next.js            | 16.1.6     |
| React              | ^19.0.0    |
| TypeScript         | ^5         |
| Tailwind CSS       | ^4         |
| Framer Motion      | ^12.33.0   |
| Node (recomendado) | 20.x       |

- **Next.js 16** con App Router (`app/`). Una única ruta `/`; el contenido se organiza por secciones.
- **React 19** con Server/Client Components; layouts y raíz en servidor; navegación y galería en cliente.
- **Tailwind 4** con PostCSS (`@tailwindcss/postcss`). Tema oscuro por defecto (`class="dark"` en el layout).
- **Framer Motion** para animaciones (reveal, stagger, parallax suave en desktop).
- Desarrollo con **Turbopack** (`next dev --turbopack`).

## Estructura del proyecto

El proyecto Next.js está en la **raíz del repositorio**.

```
maraghodoy/
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── public/
│   └── images/          # Imágenes estáticas (hero, galería, press)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/      # Componentes React (HeroSlide, galería, rider, etc.)
│   ├── content/         # Contenido sin CMS
│   │   ├── locales/     # es.ts, en.ts
│   │   ├── site.ts      # Config y textos del sitio
│   │   ├── gallery.ts   # Lista de imágenes de la galería
│   │   └── index.ts
│   ├── context/         # LanguageContext, SliderContext
│   ├── hooks/
│   └── lib/             # site, translations
└── out/                 # Generado automáticamente por el build estático (`output: "export"`)
```

## Decisiones técnicas

- **Responsive:** breakpoint único a **768px**. Móvil: slider vertical (una sección por pantalla). Desktop: página de scroll con secciones apiladas y animaciones.
- **i18n:** sin librería externa. Locales `es.ts` / `en.ts`; `LanguageContext` con `t` tipado.
- **Navegación:** en desktop, anclas `#principal`, `#media`, `#rider`, `#contacto`. En móvil, slider + nav sincronizada vía `SliderContext`. Redirects en `next.config.mjs` de rutas sin hash a hashes.
- **Galería:** lista en `content/gallery.ts`; 6 imágenes iniciales + “Mostrar más”. Lightbox con portal, cerrar/descargar, navegación por teclado.
- **Contacto:** enlace mailto al email de `content/site.ts` y enlaces a redes (Instagram, SoundCloud, YouTube).
- **Rendimiento:** secciones pesadas con `next/dynamic` en desktop; `priority` en la imagen del hero. Export estático (`output: "export"`) para Cloudflare Pages.

## Comandos

| Comando           | Descripción |
|-------------------|-------------|
| `npm install`     | Instalar dependencias |
| `npm run dev`     | Servidor de desarrollo con Turbopack (recarga en caliente) |
| `npm run build`   | Build de producción **y** export estático en `out/` (por `output: "export"`) |
| `npm run start`   | Servir el build de producción (requiere `npm run build` antes) |
| `npm run lint`    | Ejecutar ESLint |

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
