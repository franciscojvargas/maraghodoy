import type { Metadata } from "next";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";
import { buildEventsJsonLd } from "@/content/events";
import { translations } from "@/content";

export const metadata: Metadata = {
  title: translations.es.eventsMetaTitle,
  description: translations.es.eventsMetaDescription,
  alternates: {
    canonical: "/eventos",
    languages: { es: "/eventos", en: "/en/events" },
  },
};

export default function EventosPage() {
  const jsonLd = buildEventsJsonLd();

  return (
    <main className="pt-20">
      {jsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <EventsSection variant="full" />
      <Footer />
    </main>
  );
}
