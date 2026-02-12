"use client";

import { useLanguage } from "@/context/LanguageContext";
import { StaggerChildren, StaggerItem } from "./AnimatedSection";

export default function TechnicalRider() {
  const { t } = useLanguage();

  return (
    <section id="rider" className="px-6 py-20 max-w-2xl mx-auto">
      <StaggerChildren className="space-y-8 text-neutral-300" staggerDelay={0.1}>
        <StaggerItem>
          <h2 className="text-2xl font-semibold mb-10 text-white">{t.riderTitle}</h2>
        </StaggerItem>
        <StaggerItem>
          <h3 className="text-white font-medium mb-2">{t.riderSetup}</h3>
          <ul className="list-disc list-inside space-y-1 text-justify">
            {t.riderSetupList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </StaggerItem>
        <StaggerItem>
          <h3 className="text-white font-medium mb-2">{t.riderReqs}</h3>
          <ul className="list-disc list-inside space-y-1 text-justify">
            {t.riderReqsList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </StaggerItem>
        <StaggerItem>
          <h3 className="text-white font-medium mb-2">{t.riderFormat}</h3>
          <ul className="list-disc list-inside space-y-1 text-justify">
            {t.riderFormatList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </StaggerItem>
        <StaggerItem>
          <p className="text-sm text-neutral-500 italic pt-4 text-justify">{t.riderNote}</p>
        </StaggerItem>
      </StaggerChildren>
    </section>
  );
}
