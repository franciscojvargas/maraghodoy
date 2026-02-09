"use client";

import { useLanguage } from "@/context/LanguageContext";

export function usePresentationContent() {
  const { t } = useLanguage();
  return {
    hero: {
      title: t.homeTitle,
      subtitle: t.homeSubtitle,
      tagline: t.homeTagline,
    },
    blocks: t.principalBlocks,
  };
}
