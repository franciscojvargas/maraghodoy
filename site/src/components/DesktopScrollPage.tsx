"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePresentationContent } from "@/hooks/usePresentationContent";
import PrincipalContent from "@/components/PrincipalContent";

const MediaSectionDesktop = dynamic(() => import("@/components/MediaSectionDesktop"), { ssr: true });
const TechnicalRider = dynamic(() => import("@/components/TechnicalRider"), { ssr: true });
const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

const heroEase = [0.22, 1, 0.36, 1] as const;

export default function DesktopScrollPage() {
  const { hero } = usePresentationContent();

  return (
    <main>
      <section id="presentacion" className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden pt-20">
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
        <motion.div
          className="relative z-10 max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.2 },
            },
            hidden: {},
          }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight"
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.9, ease: heroEase }}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="mt-6 text-xl text-neutral-300"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: heroEase }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.p
            className="mt-2 text-sm text-neutral-400 uppercase tracking-widest"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: heroEase }}
          >
            {hero.tagline}
          </motion.p>
        </motion.div>
      </section>

      <section id="principal" className="pt-16">
        <PrincipalContent />
      </section>

      <section id="media" className="pt-16">
        <MediaSectionDesktop />
      </section>

      <section id="rider" className="pt-16">
        <TechnicalRider />
      </section>

      <section id="contacto" className="pt-16">
        <ContactForm />
      </section>

      <footer id="footer" className="pt-4">
        <Footer />
      </footer>
    </main>
  );
}
