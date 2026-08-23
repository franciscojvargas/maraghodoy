"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type MobileSection = "presentacion" | "eventos" | "media" | "rider" | "contacto";

type SliderContextType = {
  currentIndex: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
  setTotalSlides: (n: number) => void;
  currentSection: MobileSection;
  setCurrentSection: (s: MobileSection) => void;
  /** El cajón del header. Vive aquí para que el botón "Ver más" pueda abrirlo. */
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

const SliderContext = createContext<SliderContextType | null>(null);

export function SliderProvider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [currentSection, setCurrentSection] = useState<MobileSection>("presentacion");
  const [menuOpen, setMenuOpen] = useState(false);

  const goToSlide = useCallback((index: number) => {
    const target = Math.max(0, index);
    setCurrentIndex(totalSlides > 0 ? Math.min(target, totalSlides - 1) : target);
  }, [totalSlides]);

  return (
    <SliderContext.Provider
      value={{
        currentIndex,
        totalSlides,
        goToSlide,
        setTotalSlides,
        currentSection,
        setCurrentSection,
        menuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </SliderContext.Provider>
  );
}

export function useSlider() {
  const ctx = useContext(SliderContext);
  if (!ctx) throw new Error("useSlider must be used within SliderProvider");
  return ctx;
}
