"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useSlider, type MobileSection } from "@/context/SliderContext";
import { useIsMobile } from "@/hooks/useMediaQuery";

/**
 * Ir a una sección desde cualquier sitio. Hay tres casos y conviene tenerlos en
 * un único lugar: en la home móvil se conmuta de sección, en la home de
 * escritorio se baja al ancla, y desde una ruta propia hay que volver a la home.
 *
 * Ojo: el menú de hamburguesa aparece por debajo de 850 px, pero el layout móvil
 * empieza a 768 px. En esa franja el cajón se ve con layout de escritorio, así
 * que sus botones tienen que bajar al ancla, no conmutar sección.
 */
export function useSectionNav() {
  const { lang } = useLanguage();
  const { setCurrentSection } = useSlider();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();

  const homeHref = lang === "en" ? "/en" : "/";
  const onHome = pathname === "/" || pathname === "/en";

  const goToSection = (section: MobileSection) => {
    if (!onHome) {
      setCurrentSection(section);
      router.push(`${homeHref}#${section}`);
      return;
    }
    if (isMobile) {
      setCurrentSection(section);
      const url = section === "presentacion" ? homeHref : `${homeHref}#${section}`;
      if (window.location.pathname + window.location.hash !== url) {
        window.history.pushState(null, "", url);
      }
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return { goToSection, onHome, homeHref };
}
