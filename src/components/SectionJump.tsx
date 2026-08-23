"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useSlider, type MobileSection } from "@/context/SliderContext";
import { useSectionNav } from "@/hooks/useSectionNav";
import { navLinks } from "@/content";

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
 * Cierre de sección. En móvil basta un "Ver más" que abre el cajón del header,
 * que ya lista todas las secciones. En escritorio no hay cajón, así que se
 * pintan los saltos concretos que se le pasen.
 *
 * El corte es por CSS y no por `useIsMobile` a propósito: así el primer paint
 * ya es correcto y no hay salto tras hidratar.
 */
export default function SectionJump({
  sections = [],
}: {
  sections?: readonly MobileSection[];
}) {
  const { t } = useLanguage();
  const { setMenuOpen } = useSlider();
  const { goToSection } = useSectionNav();

  const labelFor = (section: MobileSection) => {
    const link = navLinks.find((l) => l.section === section);
    return link ? t[link.labelKey] : section;
  };

  return (
    <div
      className={`mt-12 border-t border-white/10 pt-8 ${
        sections.length === 0 ? "md:hidden" : ""
      }`}
    >
      <div className="flex justify-center md:hidden">
        <button type="button" onClick={() => setMenuOpen(true)} className={buttonClass}>
          {t.presentationNavTitle}
          <MenuGlyph />
        </button>
      </div>

      {sections.length > 0 && (
        <div className="hidden flex-wrap justify-center gap-3 md:flex">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => goToSection(section)}
              className={buttonClass}
            >
              {labelFor(section)}
              <span aria-hidden>→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
