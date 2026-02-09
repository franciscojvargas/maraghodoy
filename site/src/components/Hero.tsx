import { siteConfig } from "@/lib/site";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Mara Ghodoy"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </div>
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          {siteConfig.name}
        </h1>
        <p className="mt-6 text-xl text-neutral-300">DJ / Producer</p>
        <p className="mt-2 text-sm text-neutral-400 uppercase tracking-widest">
          Hardgroove · Techno hipnótico
        </p>
        <a
          href="#contact"
          className="inline-block mt-10 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 hover:border-white/60 transition"
        >
          Booking & Contact
        </a>
      </div>
    </section>
  );
}
