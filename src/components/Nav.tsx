"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSlider } from "@/context/SliderContext";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useMounted } from "@/hooks/useMounted";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { siteConfig } from "@/content/site";
import type { NavLabelKey } from "@/content";
import { navLinks } from "@/content";
import { IconSoundCloud, IconInstagram, IconYouTube, IconTikTok, IconResidentAdvisor } from "./SocialIcons";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSectionNav } from "@/hooks/useSectionNav";

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
  const { goToSlide, currentIndex, currentSection, menuOpen, setMenuOpen } = useSlider();
  const { goToSection, onHome, homeHref } = useSectionNav();
  const mounted = useMounted();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  useLockBodyScroll(menuOpen);

  const menuRef = useRef<HTMLDivElement>(null);
  useFocusTrap(menuRef, menuOpen);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, setMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const headerScrolled = isMobile
    ? currentSection !== "presentacion" || currentIndex > 0
    : scrolled;

  const mobileMenu = (
    <AnimatePresence>
      {menuOpen && mounted && (
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
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[280px] z-[9999] flex flex-col bg-neutral-950 border-l border-neutral-700 shadow-2xl"
            style={{ boxShadow: "-10px 0 40px rgba(0,0,0,0.5)" }}
            role="dialog"
            aria-modal="true"
            aria-label={t.navMenu}
          >
            <div className="flex flex-col gap-0.5 pt-24 pb-8 px-6 overflow-y-auto">
              {navLinks.map(({ href, section }) => (
                <button
                  key={href}
                  type="button"
                  onClick={() => {
                    goToSection(section);
                    closeMenu();
                  }}
                  aria-current={currentSection === section ? "page" : undefined}
                  className={`py-3.5 px-4 rounded-lg text-left font-medium hover:bg-white/10 active:bg-white/15 transition w-full ${
                    currentSection === section ? "text-white bg-white/5" : "text-neutral-300"
                  }`}
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
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition"
                aria-label="TikTok"
              >
                <IconTikTok className="w-6 h-6" />
              </a>
              {siteConfig.socials.residentAdvisor && (
                <a
                  href={siteConfig.socials.residentAdvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition"
                  aria-label="Resident Advisor"
                >
                  <IconResidentAdvisor className="w-6 h-6" />
                </a>
              )}
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
                goToSection("presentacion");
                goToSlide(0);
              }}
              className="text-lg font-semibold text-white hover:opacity-80 transition text-left min-h-[44px] min-w-[44px] flex items-center"
            >
              {siteConfig.name}
            </button>
          ) : (
            <a
              // Fuera de la home no hay ancla a la que bajar: ahí el logo navega.
              href={onHome ? "#presentacion" : homeHref}
              onClick={(e) => {
                if (!onHome) return;
                e.preventDefault();
                document.getElementById("presentacion")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-lg font-semibold text-white hover:opacity-80 transition flex items-center min-h-[44px]"
            >
              {siteConfig.name}
            </a>
          )}

          <div className="hidden nav:flex items-center gap-1 md:gap-4">
            {navLinks.map(({ href, section }) =>
              isMobile ? (
                <button
                  key={href}
                  type="button"
                  onClick={() => goToSection(section)}
                  aria-current={currentSection === section ? "page" : undefined}
                  className={`text-sm font-medium transition px-3 py-2 rounded-lg hover:text-white min-h-[44px] ${
                    currentSection === section ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {getNavLabel(href, t)}
                </button>
              ) : (
                <a
                  key={href}
                  href={onHome ? `#${section}` : `${homeHref}#${section}`}
                  className="text-sm font-medium transition px-3 py-2 rounded-lg text-neutral-400 hover:text-white"
                >
                  {getNavLabel(href, t)}
                </a>
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
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition min-h-[44px] min-w-[44px]"
            aria-label={menuOpen ? t.navMenuClose : t.navMenuOpen}
            aria-expanded={menuOpen}
          >
            <MenuButtonIcon open={menuOpen} />
          </button>
        </nav>
      </motion.header>

      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
}
