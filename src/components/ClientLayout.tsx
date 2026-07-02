"use client";

import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/context/LanguageContext";
import { SliderProvider } from "@/context/SliderContext";
import Nav from "./Nav";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <SliderProvider>
        <div className="max-md:h-[100dvh] max-md:overflow-hidden max-md:flex max-md:flex-col md:contents">
          <Nav />
          <div className="max-md:flex-1 max-md:min-h-0 max-md:max-h-[100dvh] max-md:overflow-hidden">
            {children}
          </div>
        </div>
        </SliderProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
