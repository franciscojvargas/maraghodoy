"use client";

import { createContext, useContext, useCallback, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "@/content";
import { localizedPath, translations } from "@/content";

const LANG_STORAGE_KEY = "maraghodoy-lang";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)[Lang];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

/** Guarda la elección del visitante. Sin almacenamiento (modo privado) no pasa nada. */
export function rememberLang(lang: Lang) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {}
}

/** Lo que eligió la última vez o, si nunca eligió, el idioma del navegador. */
export function readPreferredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {}
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

/**
 * El idioma es siempre el de la ruta: `/` y `/eventos` en español, `/en/…` en
 * inglés. Si se dedujera del navegador, `/` se pintaría en inglés para quien lo
 * tenga en inglés —Googlebot incluido— con el título y el canonical en español,
 * y Google vería `/` y `/en` como la misma página. La preferencia del visitante
 * sólo se usa para sugerirle el otro idioma (`LanguageSuggestion`).
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const lang: Lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";

  /** Cada idioma tiene su ruta: cambiarlo es navegar, y así cambian también `<title>` y canonical. */
  const setLang = useCallback(
    (l: Lang) => {
      rememberLang(l);
      const target = localizedPath(pathname, l);
      if (target !== pathname) router.replace(`${target}${window.location.hash}`);
    },
    [pathname, router]
  );

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
