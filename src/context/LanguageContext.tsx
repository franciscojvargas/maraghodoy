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
import { usePathname } from "next/navigation";
import type { Lang } from "@/content";
import { translations } from "@/content";

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

  const setLang = useCallback((l: Lang) => {
    setOverride(l);
    window.localStorage.setItem(LANG_STORAGE_KEY, l);
    const target = l === "en" ? "/en" : "/";
    window.history.replaceState(null, "", `${target}${window.location.hash}`);
  }, []);

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
