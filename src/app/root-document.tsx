import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteConfig, PERSON_ID } from "@/content/site";
import ClientLayout from "@/components/ClientLayout";
import type { Lang } from "@/content";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/og.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/images/og.jpg`,
  jobTitle: "DJ & Producer",
  description: siteConfig.description,
  email: `mailto:${siteConfig.email}`,
  sameAs: [
    siteConfig.socials.instagram,
    siteConfig.socials.soundcloud,
    siteConfig.socials.youtube,
  ],
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
