import Link from "next/link";
import { siteConfig } from "@/content/site";
import "./globals.css";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black">
      <p className="text-sm uppercase tracking-widest text-neutral-500 mb-3">404</p>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{siteConfig.name}</h1>
      <p className="text-neutral-400 mb-8">
        Esta página no existe · This page does not exist
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 hover:border-white/60 transition"
      >
        Volver al inicio · Back home
      </Link>
    </main>
  );
}
