"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import type { CSSProperties } from "react";
import { usePresentationContent } from "@/hooks/usePresentationContent";
import PrincipalContent from "@/components/PrincipalContent";

const EventsSection = dynamic(() => import("@/components/EventsSection"), { ssr: true });
const MediaSection = dynamic(() => import("@/components/MediaSection"), { ssr: true });
const RiderSection = dynamic(() => import("@/components/RiderSection"), { ssr: true });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

/**
 * Entrada del hero por CSS (`.enter`): la anima el navegador al pintar, sin
 * esperar a JS. Con framer el título salía en el HTML a opacidad 0 hasta hidratar.
 */
const heroEnter = (i: number, y: number, duration: number) =>
  ({
    "--reveal-y": `${y}px`,
    "--reveal-duration": `${duration}s`,
    "--reveal-delay": `${200 + i * 120}ms`,
    "--reveal-ease": "cubic-bezier(0.22, 1, 0.36, 1)",
  }) as CSSProperties;

export default function DesktopScrollPage() {
  const { hero } = usePresentationContent();

  return (
    <main>
      <section id="presentacion" className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden pt-20">
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
        <div className="relative z-10 max-w-3xl">
          <h1 className="enter text-5xl md:text-7xl font-bold tracking-tight" style={heroEnter(0, 32, 0.9)}>
            {hero.title}
          </h1>
          <p className="enter mt-6 text-xl text-neutral-300" style={heroEnter(1, 24, 0.8)}>
            {hero.subtitle}
          </p>
          <p className="enter mt-2 text-sm text-neutral-400 uppercase tracking-widest" style={heroEnter(2, 16, 0.7)}>
            {hero.tagline}
          </p>
        </div>
      </section>

      <section id="principal" className="pt-16">
        <PrincipalContent />
      </section>

      <section id="eventos" className="pt-16">
        <EventsSection variant="teaser" />
      </section>

      <section id="media" className="pt-16">
        <MediaSection />
      </section>

      <section id="rider" className="pt-16">
        <RiderSection />
      </section>

      <section id="contacto" className="pt-16">
        <ContactSection />
      </section>

      <footer id="footer" className="pt-4">
        <Footer />
      </footer>
    </main>
  );
}
