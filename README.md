# Mara Ghodoy — Press Kit

EPK (Electronic Press Kit) en una sola página: presentación, galería, vídeos, SoundCloud, technical rider y contacto. Sitio estático (Next.js App Router con `output: "export"`) con dos idiomas: `/` (español) y `/en` (inglés).

<p align="center">
  <a href="https://www.maraghodoy.com/">
    <img src="https://img.shields.io/badge/%F0%9F%8C%90_Visitar_la_web-maraghodoy.com-white?style=for-the-badge&labelColor=black" alt="Visitar maraghodoy.com" />
  </a>
</p>

## Stack

| Dependencia        | Versión   |
|--------------------|------------|
| Next.js            | 16.x       |
| React              | 19.x       |
| TypeScript         | 5.x        |
| Tailwind CSS       | 4.x        |
| Framer Motion      | 12.x       |
| Node (recomendado) | 20+        |

## Estructura

```
maraghodoy/
├── scripts/          # Utilidades de build (optimización de imágenes, checks)
├── public/images/    # Imágenes optimizadas (hero, galería, press, venues)
├── e2e/              # Smoke test end-to-end
└── src/
    ├── app/          # Rutas (es)/(en), metadata, robots, sitemap, manifest
    ├── components/   # UI: hero, slider, galería, lightbox, secciones, facades
    ├── content/      # Contenido sin CMS: locales es/en, config del sitio, galería
    ├── context/      # LanguageContext, SliderContext
    └── hooks/        # Hooks compartidos
```

## Comandos

| Comando                   | Descripción |
|---------------------------|-------------|
| `npm install`             | Instalar dependencias |
| `npm run dev`             | Servidor de desarrollo con Turbopack |
| `npm run build`           | Build de producción + export estático en `out/` |
| `npm run lint`            | ESLint |
| `npm run typecheck`       | Comprobar tipos |
| `npm run images:optimize` | Optimizar las imágenes de `public/images` |
| `npm run check:headers`   | Verificar consistencia de configuración |
| `npm run test:e2e`        | Smoke test contra `out/` (requiere build previo) |

## Desarrollo local

```bash
npm install
npm run dev
```

Para probar el mismo resultado que en producción:

```bash
npm run build
npx serve out
```

## Añadir contenido

- **Fotos de galería:** copiar el `.webp` a `public/images/gallery/`, ejecutar `npm run images:optimize` y añadir el nombre a `MIXED_ORDER` en `src/content/gallery.ts`.
- **Vídeos:** añadir `{ id, titleKey }` a `videos` en `src/content/site.ts` (con la clave de título en ambos locales).
- **Sesiones SoundCloud:** añadir `{ url, title }` a `soundcloudSessions` en `src/content/site.ts`.
- **Textos:** editar `src/content/locales/es.ts` y `en.ts` (deben mantener las mismas claves).
