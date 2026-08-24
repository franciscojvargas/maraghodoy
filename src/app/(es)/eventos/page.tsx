import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";
import { buildEventsJsonLd } from "@/content/events";
import { buildEventsMetadata, buildBreadcrumbJsonLd } from "@/app/root-document";

export const metadata = buildEventsMetadata("es");

export default function EventosPage() {
  const jsonLd = [buildBreadcrumbJsonLd("es"), ...buildEventsJsonLd()];

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
