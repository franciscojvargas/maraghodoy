import es from "./locales/es";
import en from "./locales/en";

export type Lang = "es" | "en";

export type NavLabelKey = "navPresentation" | "navEvents" | "navMedia" | "navRider" | "navContact";

export const navLinks: readonly { href: string; section: "presentacion" | "eventos" | "media" | "rider" | "contacto"; labelKey: NavLabelKey }[] = [
  { href: "/", section: "presentacion", labelKey: "navPresentation" },
  { href: "/eventos", section: "eventos", labelKey: "navEvents" },
  { href: "/media", section: "media", labelKey: "navMedia" },
  { href: "/rider", section: "rider", labelKey: "navRider" },
  { href: "/contacto", section: "contacto", labelKey: "navContact" },
];

const localizedRoutes: readonly Record<Lang, string>[] = [
  { es: "/", en: "/en" },
  { es: "/eventos", en: "/en/events" },
];

const normalize = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

/** La misma página en el otro idioma; si la ruta no está mapeada, la home. */
export function localizedPath(pathname: string, lang: Lang): string {
  const current = normalize(pathname);
  const route = localizedRoutes.find((r) => r.es === current || r.en === current);
  return route ? route[lang] : localizedRoutes[0][lang];
}

export const translations = { es, en };
