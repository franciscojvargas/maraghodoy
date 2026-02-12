"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSlider } from "@/context/SliderContext";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { siteConfig } from "@/lib/site";
import type { NavLabelKey } from "@/lib/translations";
import { navLinks } from "@/lib/translations";
import { IconSoundCloud, IconInstagram, IconYouTube } from "./SocialIcons";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const navItems = [...navLinks];

function getNavLabel(href: string, t: Record<NavLabelKey, string>) {
  const item = navLinks.find((l) => l.href === href);
  return item ? t[item.labelKey] : "";
}

function MenuButtonIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-6 flex-col justify-between items-stretch" aria-hidden>
      <motion.span
        className="block h-0.5 w-full bg-white origin-center rounded-full"
        animate={{
          rotate: open ? 45 : 0,
          y: open ? 6 : 0,
        }}
        transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
      />
      <motion.span
        className="block h-0.5 w-full bg-white origin-center rounded-full"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="block h-0.5 w-full bg-white origin-center rounded-full"
        animate={{
          rotate: open ? -45 : 0,
          y: open ? -6 : 0,
        }}
        transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
      />
    </span>
  );
}

export default function Nav() {
  const { lang, setLang, t } = useLanguage();
  const isMobile = useIsMobile();
  const { goToSlide, currentIndex, setCurrentSection, currentSection } = useSlider();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  const headerScrolled = isMobile
    ? currentSection !== "presentacion" || currentIndex > 0
    : scrolled;

  const displayNavItems = navItems;

  const mobileMenu = (
    <AnimatePresence>
      {mobileOpen && mounted && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-[9998]"
            onClick={closeMenu}
            aria-hidden
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[280px] z-[9999] flex flex-col bg-neutral-950 border-l border-neutral-700 shadow-2xl"
            style={{ boxShadow: "-10px 0 40px rgba(0,0,0,0.5)" }}
          >
            <div className="flex flex-col gap-0.5 pt-24 pb-8 px-6 overflow-y-auto">
              {displayNavItems.map(({ href, section }) => (
                <button
                  key={href}
                  type="button"
                  onClick={() => {
                    setCurrentSection(section);
                    closeMenu();
                  }}
                  className="py-3.5 px-4 rounded-lg text-left text-white font-medium hover:bg-white/10 active:bg-white/15 transition w-full"
                >
                  {getNavLabel(href, t)}
                </button>
              ))}
            </div>

            <div className="px-6 flex items-center gap-4">
              <a
                href={siteConfig.socials.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-neutral-400 hover:text-[#ff5500] hover:bg-white/10 transition"
                aria-label="SoundCloud"
              >
                <IconSoundCloud className="w-6 h-6" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition"
                aria-label="Instagram"
              >
                <IconInstagram className="w-6 h-6" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-neutral-400 hover:text-[#ff0000] hover:bg-white/10 transition"
                aria-label="YouTube"
              >
                <IconYouTube className="w-6 h-6" />
              </a>
            </div>

            <div className="mt-6 px-6">
              <div className="flex gap-1 rounded-full bg-neutral-800 border border-neutral-600 px-1 py-1 w-fit">
                <button
                  type="button"
                  onClick={() => setLang("es")}
                  className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    lang === "es" ? "text-black" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {lang === "es" && (
                    <motion.span
                      layoutId="nav-lang-pill-mobile"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">ES</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    lang === "en" ? "text-black" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {lang === "en" && (
                    <motion.span
                      layoutId="nav-lang-pill-mobile"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">EN</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-300 pointer-events-auto select-auto ${
          headerScrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {isMobile ? (
            <button
              type="button"
              onClick={() => {
                setCurrentSection("presentacion");
                goToSlide(0);
              }}
              className="text-lg font-semibold text-white hover:opacity-80 transition text-left min-h-[44px] min-w-[44px] flex items-center"
            >
              {siteConfig.name}
            </button>
          ) : (
            <Link
              href="/#presentacion"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("presentacion")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-lg font-semibold text-white hover:opacity-80 transition flex items-center min-h-[44px]"
            >
              {siteConfig.name}
            </Link>
          )}

          <div className="hidden sm:flex items-center gap-1 md:gap-6">
            {displayNavItems.map(({ href, section }) =>
              isMobile ? (
                <button
                  key={href}
                  type="button"
                  onClick={() => setCurrentSection(section)}
                  className="text-sm font-medium transition px-3 py-2 rounded-lg text-neutral-400 hover:text-white min-h-[44px]"
                >
                  {getNavLabel(href, t)}
                </button>
              ) : (
                <Link
                  key={href}
                  href={href === "/" ? "/#presentacion" : `/#${href.slice(1)}`}
                  className="text-sm font-medium transition px-3 py-2 rounded-lg text-neutral-400 hover:text-white"
                >
                  {getNavLabel(href, t)}
                </Link>
              )
            )}
            <div className="flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-1 py-1">
              <button
                type="button"
                onClick={() => setLang("es")}
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  lang === "es" ? "text-black" : "text-neutral-400 hover:text-white"
                }`}
              >
                {lang === "es" && (
                  <motion.span
                    layoutId="nav-lang-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">ES</span>
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  lang === "en" ? "text-black" : "text-neutral-400 hover:text-white"
                }`}
              >
                {lang === "en" && (
                  <motion.span
                    layoutId="nav-lang-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">EN</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition min-h-[44px] min-w-[44px]"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            <MenuButtonIcon open={mobileOpen} />
          </button>
        </nav>
      </motion.header>

      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
}
