import es from "./locales/es";
import en from "./locales/en";

export type Lang = "es" | "en";

export type NavLabelKey = "navPresentation" | "navMedia" | "navRider" | "navContact";

export const navLinks: readonly { href: string; section: "presentacion" | "media" | "rider" | "contacto"; labelKey: NavLabelKey }[] = [
  { href: "/", section: "presentacion", labelKey: "navPresentation" },
  { href: "/media", section: "media", labelKey: "navMedia" },
  { href: "/rider", section: "rider", labelKey: "navRider" },
  { href: "/contacto", section: "contacto", labelKey: "navContact" },
];

export const translations = { es, en };

export type Translations = typeof es;
