import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { siteConfig, PERSON_ID } from "@/content/site";
import ClientLayout from "@/components/ClientLayout";
import { translations, type Lang } from "@/content";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export function buildMetadata(lang: Lang): Metadata {
  const description = siteConfig.description[lang];
  const url = lang === "en" ? `${siteConfig.url}/en` : siteConfig.url;

  return {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.title,
    description,
    openGraph: {
      title: siteConfig.title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: "/images/og.jpg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — DJ & Producer`,
        },
      ],
      type: "website",
      locale: lang === "en" ? "en_US" : "es_ES",
      alternateLocale: lang === "en" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description,
      images: ["/images/og.jpg"],
    },
  };
}

const EVENTS_PATH: Record<Lang, string> = { es: "/eventos", en: "/en/events" };

/** Metadata de las rutas de eventos; si no, heredan el Open Graph de la portada. */
export function buildEventsMetadata(lang: Lang): Metadata {
  const t = translations[lang];
  const path = EVENTS_PATH[lang];
  const title = t.eventsMetaTitle;
  const description = t.eventsMetaDescription;

  return {
    title,
    description,
    alternates: { canonical: path, languages: EVENTS_PATH },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      images: [
        {
          url: "/images/og.jpg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — DJ & Producer`,
        },
      ],
      type: "website",
      locale: lang === "en" ? "en_US" : "es_ES",
      alternateLocale: lang === "en" ? "es_ES" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description, images: ["/images/og.jpg"] },
  };
}

/** Miga de pan para el resultado de búsqueda de /eventos. */
export function buildBreadcrumbJsonLd(lang: Lang) {
  const home = lang === "en" ? `${siteConfig.url}/en` : siteConfig.url;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteConfig.name, item: home },
      {
        "@type": "ListItem",
        position: 2,
        name: translations[lang].navEvents,
        item: `${siteConfig.url}${EVENTS_PATH[lang]}`,
      },
    ],
  };
}

export const baseViewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

function buildJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: siteConfig.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/images/og.jpg`,
        jobTitle: "DJ & Producer",
        description: siteConfig.description[lang],
        email: `mailto:${siteConfig.email}`,
        homeLocation: { "@type": "Place", name: "Sevilla, España" },
        // El de RA entra sólo si existe: un enlace vacío ensucia el grafo.
        sameAs: [
          siteConfig.socials.instagram,
          siteConfig.socials.soundcloud,
          siteConfig.socials.youtube,
          siteConfig.socials.tiktok,
          siteConfig.socials.residentAdvisor,
        ].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: lang,
        about: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

export default function RootDocument({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className="dark">
      <body className={`${spaceGrotesk.variable} min-h-screen bg-black text-white antialiased font-sans`}>
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
        />
        <ClientLayout>{children}</ClientLayout>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
