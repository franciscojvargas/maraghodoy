"use client";

import { useEffect } from "react";
import { useSlider, type MobileSection } from "@/context/SliderContext";
import { useIsMobile } from "./useMediaQuery";
import { navLinks } from "@/content";

const SECTIONS = navLinks.map((l) => l.section);

const isSection = (value: string): value is MobileSection =>
  (SECTIONS as readonly string[]).includes(value);

function sectionFromHash(hash: string): MobileSection {
  const raw = decodeURIComponent(hash.replace(/^#/, ""));
  return isSection(raw) ? raw : "presentacion";
}

/**
 * Ata la sección móvil a la URL: `/#rider` abre el rider y el botón Atrás vuelve
 * a la sección anterior. En escritorio no hace falta, las secciones son anclas
 * reales. La lectura del hash va en un efecto y no en el estado inicial para que
 * el primer render del cliente coincida con el HTML, que siempre trae la
 * presentación.
 */
export function useSectionHash() {
  const { setCurrentSection } = useSlider();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;
    const sync = () => setCurrentSection(sectionFromHash(window.location.hash));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [isMobile, setCurrentSection]);
}
