import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { siteConfig, PERSON_ID } from "@/content/site";
import ClientLayout from "@/components/ClientLayout";
import type { Lang } from "@/content";

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
        sameAs: [
          siteConfig.socials.instagram,
          siteConfig.socials.soundcloud,
          siteConfig.socials.youtube,
        ],
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
      </body>
    </html>
  );
}
