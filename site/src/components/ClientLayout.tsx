"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { SliderProvider } from "@/context/SliderContext";
import Nav from "./Nav";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SliderProvider>
        <Nav />
        {children}
      </SliderProvider>
    </LanguageProvider>
  );
}
