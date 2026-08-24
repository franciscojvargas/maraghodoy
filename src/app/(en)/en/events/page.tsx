import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";
import { buildEventsJsonLd } from "@/content/events";
import { buildEventsMetadata, buildBreadcrumbJsonLd } from "@/app/root-document";

export const metadata = buildEventsMetadata("en");

export default function EventsPage() {
  const jsonLd = [buildBreadcrumbJsonLd("en"), ...buildEventsJsonLd()];

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
