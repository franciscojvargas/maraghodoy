"use client";

import Image from "next/image";
import { usePresentationContent } from "@/hooks/usePresentationContent";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSlide() {
  const { hero } = usePresentationContent();
  const { t } = useLanguage();

  return (
    <div className="flex-shrink-0 w-full h-screen max-h-[100dvh] flex flex-col text-center px-6 relative overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.webp"
          alt="Mara Ghodoy"
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </div>
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          {hero.title}
        </h1>
        <p className="mt-6 text-xl text-neutral-300">{hero.subtitle}</p>
        <p className="mt-2 text-sm text-neutral-400 uppercase tracking-widest">
          {hero.tagline}
        </p>
      </div>
      <div
        className="relative z-10 flex flex-col items-center pb-6"
        aria-hidden
      >
        <span className="text-[10px] text-white/50 uppercase tracking-widest mb-1.5">
          {t.heroSwipeHint}
        </span>
        <svg
          className="w-6 h-6 text-white/50 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
