"use client";

import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import { SliderProvider } from "@/context/SliderContext";
import Nav from "./Nav";

// El encajonado a 100dvh es sólo para el slider de la home en móvil. El resto de
// rutas necesitan el scroll del documento, o se quedan en la primera pantalla.
function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/en";

  if (!isHome) {
    return (
      <>
        <Nav />
        {children}
      </>
    );
  }

  return (
    <div className="max-md:h-[100dvh] max-md:overflow-hidden max-md:flex max-md:flex-col md:contents">
      <Nav />
      <div className="max-md:flex-1 max-md:min-h-0 max-md:max-h-[100dvh] max-md:overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <SliderProvider>
          <Shell>{children}</Shell>
        </SliderProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
