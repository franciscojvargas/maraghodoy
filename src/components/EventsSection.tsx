"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { orderedEvents, posterFull, posterThumb, type EventItem } from "@/content/events";
import { AppleReveal } from "./AnimatedSection";
import { ImageLightbox } from "./ImageLightbox";
import SectionJump from "./SectionJump";

const TEASER_COUNT = 5;

const seeAllClass =
  "items-center gap-2 rounded-full border border-white/40 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/60 hover:bg-white/10";

// Obligatorio: sin zona fija, prerender (UTC) y navegador dan días distintos
// para un bolo de madrugada. Cada evento usa la suya para que la fecha coincida
// con la del cartel, no con la hora peninsular.
const DEFAULT_TIME_ZONE = "Europe/Madrid";

function makeFormatters(lang: string) {
  const cache = new Map<string, Intl.DateTimeFormat>();
  return (timeZone = DEFAULT_TIME_ZONE) => {
    let formatter = cache.get(timeZone);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone,
      });
      cache.set(timeZone, formatter);
    }
    return formatter;
  };
}

const withoutAccents = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Cuando el título ya es la ciudad (o la sala), repetirla debajo sobra. Compara
 * sin tildes para que "Los Ángeles" y "Los Angeles" cuenten como lo mismo.
 */
function contextLine(event: EventItem) {
  const city =
    withoutAccents(event.venue) === withoutAccents(event.city) ? null : event.city;
  return [city, event.note].filter(Boolean).join(" · ");
}

function dayAndMonth(formatter: Intl.DateTimeFormat, iso: string) {
  const parts = formatter.formatToParts(new Date(iso));
  return {
    day: parts.find((p) => p.type === "day")?.value ?? "",
    month: parts.find((p) => p.type === "month")?.value ?? "",
  };
}

function EventRow({
  event,
  formatter,
  onOpenPoster,
}: {
  event: EventItem;
  formatter: Intl.DateTimeFormat;
  onOpenPoster?: () => void;
}) {
  const { day, month } = dayAndMonth(formatter, event.date);
  const context = contextLine(event);

  return (
    <li className="flex items-center gap-4 py-4 sm:gap-6 sm:py-5">
      <div className="relative w-16 shrink-0 overflow-hidden rounded-lg aspect-[4/5] sm:w-20 lg:w-24">
        {event.poster ? (
          <button
            type="button"
            onClick={onOpenPoster}
            className="group block h-full w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
          >
            <Image
              src={posterThumb(event.poster)}
              alt={`${event.venue} · ${event.city}`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
            />
          </button>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-white/10 bg-white/5">
            <span className="text-xl font-semibold leading-none text-white">{day}</span>
            <span className="mt-1 text-[10px] uppercase tracking-wider text-neutral-400">
              {month}
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-6">
        <time
          dateTime={event.date}
          className="block text-xs uppercase tracking-widest text-neutral-400 sm:w-44 sm:shrink-0"
        >
          {formatter.format(new Date(event.date))}
        </time>
        <div className="min-w-0">
          <p className="mt-1 font-medium text-white sm:mt-0">{event.venue}</p>
          {context && <p className="text-sm text-neutral-400">{context}</p>}
          {event.lineup && (
            <p className="mt-1 text-xs leading-relaxed text-neutral-500">
              {event.lineup.join(" · ")}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default function EventsSection({
  variant = "full",
}: {
  variant?: "teaser" | "full";
}) {
  const { t, lang } = useLanguage();
  const [posterIndex, setPosterIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const formatterFor = useMemo(() => makeFormatters(lang), [lang]);

  // En escritorio la home es un scroll continuo: "ver todos" despliega aquí
  // mismo en vez de saltar a /eventos, que rompería ese formato. En móvil, que
  // navega por secciones, se mantiene el enlace a la página.
  const showAll = variant === "full" || expanded;
  const list = showAll ? orderedEvents : orderedEvents.slice(0, TEASER_COUNT);
  const showSeeAll = variant === "teaser" && orderedEvents.length > TEASER_COUNT;

  // Sólo los que tienen cartel, para que las flechas del visor no salten huecos.
  const posters = useMemo(
    () =>
      list
        .filter((event) => event.poster)
        .map((event) => ({
          src: posterFull(event.poster!),
          alt: `${event.venue} · ${event.city}`,
        })),
    [list]
  );

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-16">
      {/* Sólo el encabezado: sobre la lista entera el disparo por intersección
          falla en móvil y la capa de composición sale carísima. */}
      <AppleReveal delay={0}>
        <h2 className="mb-6 text-2xl font-semibold">{t.eventsTitle}</h2>
      </AppleReveal>

      {list.length === 0 ? (
        <p className="text-neutral-400">{t.eventsEmpty}</p>
      ) : (
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {list.map((event) => (
            <EventRow
              key={event.id}
              event={event}
              formatter={formatterFor(event.timeZone)}
              onOpenPoster={
                event.poster
                  ? () =>
                      setPosterIndex(
                        posters.findIndex((p) => p.src === posterFull(event.poster!))
                      )
                  : undefined
              }
            />
          ))}
        </ul>
      )}

      {posterIndex !== null && posterIndex >= 0 && (
        <ImageLightbox
          images={posters}
          currentIndex={posterIndex}
          onClose={() => setPosterIndex(null)}
          onSelectIndex={setPosterIndex}
          closeLabel={t.lightboxClose}
          downloadLabel={t.lightboxDownload}
        />
      )}

      {showSeeAll && (
        <div className="mt-6 flex justify-center">
          <Link
            href={lang === "en" ? "/en/events" : "/eventos"}
            className={`inline-flex md:hidden ${seeAllClass}`}
          >
            {t.eventsSeeAll}
          </Link>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={`hidden md:inline-flex ${seeAllClass}`}
          >
            {expanded ? t.eventsSeeLess : t.eventsSeeAll}
          </button>
        </div>
      )}

      <SectionJump />
    </section>
  );
}
