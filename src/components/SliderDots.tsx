"use client";

import { useSlider } from "@/context/SliderContext";
import { useLanguage } from "@/context/LanguageContext";

/** Cuántas pantallas quedan: la presentación son siete pases y sólo había la flecha del hero. */
export default function SliderDots() {
  const { currentIndex, totalSlides, goToSlide } = useSlider();
  const { t } = useLanguage();

  if (totalSlides < 2) return null;

  return (
    <div className="pointer-events-auto fixed right-2 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-1 md:hidden">
      {Array.from({ length: totalSlides }, (_, i) => {
        const active = i === currentIndex;
        return (
          <button
            key={i}
            type="button"
            onClick={() => goToSlide(i)}
            aria-label={`${t.navGoToSlide} ${i + 1}`}
            aria-current={active ? "true" : undefined}
            className="flex h-6 w-6 items-center justify-center"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                active ? "h-4 w-1 bg-white" : "h-1 w-1 bg-white/40"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
