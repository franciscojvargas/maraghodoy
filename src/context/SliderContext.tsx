"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type MobileSection = "presentacion" | "media" | "rider" | "contacto";

type SliderContextType = {
  currentIndex: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
  setTotalSlides: (n: number) => void;
  currentSection: MobileSection;
  setCurrentSection: (s: MobileSection) => void;
};

const SliderContext = createContext<SliderContextType | null>(null);

export function SliderProvider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [currentSection, setCurrentSection] = useState<MobileSection>("presentacion");

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((i) => {
      const target = Math.max(0, index);
      if (totalSlides <= 0) return target;
      return Math.min(target, totalSlides - 1);
    });
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
