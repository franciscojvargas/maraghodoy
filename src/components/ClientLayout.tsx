"use client";

import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import { SliderProvider } from "@/context/SliderContext";
import Nav from "./Nav";

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
    <div className="max-md:h-[var(--slide-h)] max-md:overflow-hidden max-md:flex max-md:flex-col md:contents">
      <Nav />
      <div className="max-md:flex-1 max-md:min-h-0 max-md:max-h-[var(--slide-h)] max-md:overflow-hidden">
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
