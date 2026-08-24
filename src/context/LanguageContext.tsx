"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "@/content";
import { translations, localizedPath } from "@/content";

const LANG_STORAGE_KEY = "maraghodoy-lang";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)[Lang];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const emptySubscribe = () => () => {};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const routeLang: Lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";

  const getSnapshot = useCallback((): Lang => {
    if (routeLang === "en") return "en";
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
    return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
  }, [routeLang]);

  const detectedLang = useSyncExternalStore(emptySubscribe, getSnapshot, () => routeLang);
  const [override, setOverride] = useState<Lang | null>(null);
  const lang = override ?? detectedLang;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  /**
   * Cambia de idioma sin perder la página. Si la ruta equivalente es otra se
   * navega de verdad, para que el `<title>` y el canonical sean los suyos; si es
   * la misma, basta con reescribir la URL sin tocar el historial.
   */
  const setLang = useCallback(
    (l: Lang) => {
      setOverride(l);
      window.localStorage.setItem(LANG_STORAGE_KEY, l);
      const target = localizedPath(pathname, l);
      const hash = window.location.hash;
      if (target === pathname) {
        window.history.replaceState(null, "", `${target}${hash}`);
        return;
      }
      router.replace(`${target}${hash}`);
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
