"use client";

import Image from "next/image";
import { usePresentationContent } from "@/hooks/usePresentationContent";

export default function HeroSlide() {
  const { hero } = usePresentationContent();

  return (
    <div className="flex-shrink-0 w-full h-screen max-h-[100dvh] flex flex-col text-center px-6 relative overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
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
    </div>
  );
}
