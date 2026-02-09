"use client";

import Image from "next/image";
import { useSlider } from "@/context/SliderContext";
import { useLanguage } from "@/context/LanguageContext";
import { navLinks } from "@/content";
import type { MobileSection } from "@/context/SliderContext";

const sectionsToShow: MobileSection[] = ["media", "rider", "contacto"];
const BACKGROUND_IMAGE = "/images/cabina-vermas.jpg";

const buttonClass =
  "rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 hover:border-white/60 transition w-full max-w-xs mx-auto block text-center";

export default function SectionLinksSlide() {
  const { setCurrentSection } = useSlider();
  const { t } = useLanguage();

  const links = navLinks.filter((l) => sectionsToShow.includes(l.section));

  return (
    <div className="flex-shrink-0 w-full h-screen max-h-[100dvh] relative flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={BACKGROUND_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/35" />
      </div>
      <div className="relative z-10 text-center">
        <h2 className="text-xl font-semibold text-white mb-6 drop-shadow-lg">{t.presentationNavTitle}</h2>
        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
          {links.map(({ section, labelKey }) => (
            <button
              key={section}
              type="button"
              className={buttonClass}
              onClick={() => setCurrentSection(section)}
            >
              {t[labelKey]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
