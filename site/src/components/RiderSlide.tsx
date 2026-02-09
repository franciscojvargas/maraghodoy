"use client";

import { useLanguage } from "@/context/LanguageContext";

export function RiderContent() {
  const { t } = useLanguage();
  return (
    <section className="px-6 py-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-8">{t.riderTitle}</h2>
      <div className="space-y-6 text-neutral-300">
        <div>
          <h3 className="text-white font-medium mb-2">{t.riderSetup}</h3>
          <ul className="list-disc list-inside space-y-1 text-justify">
            {t.riderSetupList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-medium mb-2">{t.riderReqs}</h3>
          <ul className="list-disc list-inside space-y-1 text-justify">
            {t.riderReqsList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-medium mb-2">{t.riderFormat}</h3>
          <ul className="list-disc list-inside space-y-1 text-justify">
            {t.riderFormatList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-neutral-500 italic pt-4 text-justify">{t.riderNote}</p>
      </div>
    </section>
  );
}

export default function RiderSlide({ slideIndex, embedded }: { slideIndex?: number; embedded?: boolean }) {
  if (embedded) return <RiderContent />;
  return (
    <div className="flex-shrink-0 w-full h-screen max-h-[100dvh] flex flex-col overflow-hidden bg-black" data-scrollable>
      <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y pt-16 pb-12"
        data-scroll-container
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <RiderContent />
      </div>
    </div>
  );
}
