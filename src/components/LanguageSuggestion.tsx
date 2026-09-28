"use client";

import { useState, useSyncExternalStore, type CSSProperties } from "react";
import { useLanguage, readPreferredLang, rememberLang } from "@/context/LanguageContext";
import { translations, type Lang } from "@/content";

const emptySubscribe = () => () => {};
/** En el servidor y al hidratar no hay preferencia: el aviso nunca va en el HTML. */
const noPreference = () => null;

const enterStyle = { "--reveal-y": "16px", "--reveal-delay": "600ms" } as CSSProperties;

/**
 * Si el visitante prefiere el otro idioma, se lo ofrece en vez de traducir la
 * página por su cuenta. Cerrarlo cuenta como elegir el idioma que está viendo.
 */
export default function LanguageSuggestion() {
  const { lang, setLang } = useLanguage();
  const preferred = useSyncExternalStore<Lang | null>(emptySubscribe, readPreferredLang, noPreference);
  const [dismissed, setDismissed] = useState(false);

  if (!preferred || preferred === lang || dismissed) return null;

  const t = translations[preferred];

  return (
    <aside
      lang={preferred}
      aria-label={t.langSuggestText}
      className="enter fixed inset-x-4 bottom-4 z-[9000] mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-white/15 bg-neutral-950/95 py-2.5 pl-4 pr-2 text-sm shadow-2xl backdrop-blur-md md:inset-x-auto md:right-6 md:bottom-6"
      style={enterStyle}
    >
      <p className="min-w-0 flex-1 text-neutral-300">{t.langSuggestText}</p>
      <button
        type="button"
        onClick={() => setLang(preferred)}
        className="shrink-0 rounded-full bg-white px-3.5 py-2 font-medium text-black transition hover:bg-neutral-200"
      >
        {t.langSuggestAction}
      </button>
      <button
        type="button"
        onClick={() => {
          rememberLang(lang);
          setDismissed(true);
        }}
        aria-label={t.langSuggestDismiss}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4" aria-hidden>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </aside>
  );
}
