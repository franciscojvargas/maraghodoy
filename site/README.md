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
| Node (recomendado) | 18.x / 20.x|

- **Next.js 16** con App Router (`app/`). Una única ruta `/`; el contenido se organiza por secciones.
- **React 19** con Server/Client Components; layouts y raíz en servidor; navegación y galería en cliente.
- **Tailwind 4** con PostCSS (`@tailwindcss/postcss`). Tema oscuro por defecto (`class="dark"` en el layout).
- **Framer Motion** para animaciones (reveal, stagger, parallax suave en desktop).
- Desarrollo con **Turbopack** (`next dev --turbopack`).

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── content/
│   ├── locales/es.ts, en.ts
│   ├── site.ts
│   ├── gallery.ts
│   └── index.ts
├── context/
├── hooks/
└── lib/
```

Contenido en `content/` (sin CMS). Imágenes en `public/images/`; `next/image` con `sizes` adecuados.

## Decisiones técnicas

- **Responsive:** breakpoint único a **768px**. Móvil: slider vertical (una sección por pantalla). Desktop: página de scroll con secciones apiladas y animaciones.
- **i18n:** sin librería externa. Locales `es.ts` / `en.ts`; `LanguageContext` con `t` tipado.
- **Navegación:** en desktop, anclas `#principal`, `#media`, `#rider`, `#contacto`. En móvil, slider + nav sincronizada vía `SliderContext`. Redirects en `next.config.mjs` de rutas sin hash a hashes.
- **Galería:** lista en `content/gallery.ts`; 6 imágenes iniciales + “Mostrar más”. Lightbox con portal, cerrar/descargar, navegación por teclado.
- **Contacto:** enlace mailto al email de `content/site.ts` y enlaces a redes (Instagram, SoundCloud, YouTube).
- **Rendimiento:** secciones pesadas con `next/dynamic` en desktop; `priority` en la imagen del hero.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

## Despliegue

Proyecto preparado para **Vercel** (raíz del repo = raíz del proyecto).
