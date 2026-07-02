"use client";

import { useLanguage } from "@/context/LanguageContext";
import { StaggerChildren, StaggerItem } from "./AnimatedSection";

const riderGroups = [
  { titleKey: "riderSetup", listKey: "riderSetupList" },
  { titleKey: "riderReqs", listKey: "riderReqsList" },
  { titleKey: "riderFormat", listKey: "riderFormatList" },
] as const;

export default function RiderSection() {
  const { t } = useLanguage();

  return (
    <section className="px-6 py-8 md:py-20 max-w-2xl mx-auto">
      <StaggerChildren className="space-y-8 text-neutral-300" staggerDelay={0.1}>
        <StaggerItem>
          <h2 className="text-2xl font-semibold mb-2 text-white">{t.riderTitle}</h2>
        </StaggerItem>
        {riderGroups.map(({ titleKey, listKey }) => (
          <StaggerItem key={titleKey}>
            <h3 className="text-white font-medium mb-2">{t[titleKey]}</h3>
            <ul className="list-disc list-inside space-y-1 text-justify">
              {t[listKey].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </StaggerItem>
        ))}
        <StaggerItem>
          <p className="text-sm text-neutral-500 italic pt-4 text-justify">{t.riderNote}</p>
        </StaggerItem>
      </StaggerChildren>
    </section>
  );
}
