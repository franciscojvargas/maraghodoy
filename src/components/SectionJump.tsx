"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useSlider } from "@/context/SliderContext";

const buttonClass =
  "inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/60 hover:bg-white/10";

function MenuGlyph() {
  return (
    <span className="flex h-3.5 w-4 flex-col justify-between" aria-hidden>
      <span className="block h-0.5 w-full rounded-full bg-current" />
      <span className="block h-0.5 w-full rounded-full bg-current" />
      <span className="block h-0.5 w-full rounded-full bg-current" />
    </span>
  );
}

/**
 * Cierre de sección, sólo en móvil: abre el cajón del header, que ya lista todas
 * las secciones. En escritorio no hace falta porque la página es un scroll
 * continuo. El corte es por CSS y no por `useIsMobile` a propósito: así el
 * primer paint ya es correcto y no hay salto tras hidratar.
 */
export default function SectionJump() {
  const { t } = useLanguage();
  const { setMenuOpen } = useSlider();

  return (
    <div className="mt-12 flex justify-center border-t border-white/10 pt-8 md:hidden">
      <button type="button" onClick={() => setMenuOpen(true)} className={buttonClass}>
        {t.presentationNavTitle}
        <MenuGlyph />
      </button>
    </div>
  );
}
