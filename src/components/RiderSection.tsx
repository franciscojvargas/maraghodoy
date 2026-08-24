"use client";

import { useLanguage } from "@/context/LanguageContext";
import { AppleReveal } from "./AnimatedSection";
import SectionJump from "./SectionJump";

function Group({
  index,
  title,
  items,
}: {
  index: string;
  title: string;
  items: readonly string[];
}) {
  return (
    <div>
      <h3 className="flex items-baseline gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white">
        <span className="text-[10px] tabular-nums text-neutral-500">{index}</span>
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-snug text-neutral-300">
            <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-white/30" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RiderSection() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-16">
      <AppleReveal delay={0}>
        <h2 className="mb-6 text-2xl font-semibold text-white">{t.riderTitle}</h2>

        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03]">
          {/* El 5/7 iguala las dos columnas: cinco líneas contra siete. */}
          <div className="grid divide-y divide-white/10 md:grid-cols-[5fr_7fr] md:divide-x md:divide-y-0">
            <div className="space-y-8 p-6 sm:p-8">
              <Group index="01" title={t.riderSetup} items={t.riderSetupList} />
              <Group index="02" title={t.riderFormat} items={t.riderFormatList} />
            </div>
            <div className="p-6 sm:p-8">
              <Group index="03" title={t.riderReqs} items={t.riderReqsList} />
            </div>
          </div>

          <p className="border-t border-white/10 bg-white/[0.02] px-6 py-4 text-sm text-neutral-400 sm:px-8">
            {t.riderNote}
          </p>
        </div>
      </AppleReveal>

      <SectionJump />
    </section>
  );
}
