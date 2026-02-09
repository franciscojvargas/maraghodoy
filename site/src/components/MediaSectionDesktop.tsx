"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";
import { galleryImages, INITIAL_GALLERY_COUNT } from "@/content/gallery";
import Image from "next/image";
import { motion } from "framer-motion";
import { AppleReveal, AppleStagger, AppleStaggerItem } from "./AnimatedSection";
import { IconSoundCloud, IconInstagram, IconYouTube } from "./SocialIcons";
import { ImageLightbox } from "./ImageLightbox";
import { PdfIcon, DownloadArrowIcon } from "./DownloadIcons";

const soundcloudSessionTitles: Record<string, "soundcloudSession1" | "soundcloudSession2" | "soundcloudSession3"> = {
  [siteConfig.soundcloudSessions[0]]: "soundcloudSession1",
  [siteConfig.soundcloudSessions[1]]: "soundcloudSession2",
  [siteConfig.soundcloudSessions[2]]: "soundcloudSession3",
};

export default function MediaSectionDesktop() {
  const { t } = useLanguage();
  const [galleryExpanded, setGalleryExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const initialImages = galleryImages.slice(0, INITIAL_GALLERY_COUNT);
  const moreImages = galleryImages.slice(INITIAL_GALLERY_COUNT);
  const hasMore = galleryImages.length > INITIAL_GALLERY_COUNT;

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <AppleReveal delay={0.05}>
        <h2 className="text-2xl font-semibold mb-6">{t.imagesTitle}</h2>
        <AppleStagger className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.07}>
          {initialImages.map(({ src, alt }) => (
            <AppleStaggerItem key={src}>
              <button
                type="button"
                onClick={() => setLightboxIndex(galleryImages.findIndex((img) => img.src === src))}
                className="relative aspect-[3/4] w-full rounded-xl overflow-hidden group text-left focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </button>
            </AppleStaggerItem>
          ))}
        </AppleStagger>
        {galleryExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4"
          >
            {moreImages.map(({ src, alt }) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(galleryImages.findIndex((img) => img.src === src))}
                className="relative aspect-[3/4] w-full rounded-xl overflow-hidden group text-left focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </button>
            ))}
          </motion.div>
        )}
        {lightboxIndex !== null && (
          <ImageLightbox
            images={galleryImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onSelectIndex={setLightboxIndex}
            closeLabel={t.lightboxClose}
            downloadLabel={t.lightboxDownload}
          />
        )}
        {hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setGalleryExpanded((e) => !e)}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 hover:border-white/60 transition"
            >
              {galleryExpanded ? t.showLessGallery : t.showMoreGallery}
            </button>
          </div>
        )}
      </AppleReveal>

      <div className="mt-16">
        <AppleReveal delay={0}>
          <h2 className="text-2xl font-semibold mb-6">{t.videosTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div className="group">
              <div className="aspect-video rounded-xl overflow-hidden bg-neutral-900 shadow-xl ring-1 ring-neutral-800/50 transition duration-300 group-hover:ring-neutral-600/50">
                <iframe
                  title="Mara Ghodoy - Electrolunch"
                  src="https://www.youtube.com/embed/vWLnck3Br4k"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-white font-medium">{t.videoElectrolunch}</p>
              <a
                href="https://youtu.be/vWLnck3Br4k?si=MCuEvOSUQ2MHfHrQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition underline"
              >
                <IconYouTube className="w-4 h-4" />
                {t.openYouTube}
              </a>
            </div>
            <div className="group">
              <div className="aspect-video rounded-xl overflow-hidden bg-neutral-900 shadow-xl ring-1 ring-neutral-800/50 transition duration-300 group-hover:ring-neutral-600/50">
                <iframe
                  title="Mara Ghodoy - Rastro Live"
                  src="https://www.youtube.com/embed/MSB1qcutY_M"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-white font-medium">{t.videoRastroLive}</p>
              <a
                href="https://youtu.be/MSB1qcutY_M?si=3HxvGsTGWWX-8Trl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition underline"
              >
                <IconYouTube className="w-4 h-4" />
                {t.openYouTube}
              </a>
            </div>
          </div>
        </AppleReveal>
      </div>

      <div className="mt-16">
        <AppleReveal delay={0.06}>
          <h2 className="text-2xl font-semibold mb-6">{t.downloadSectionTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.a
              href={siteConfig.downloads.pressKitPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 group-hover:bg-white/15 text-white transition-colors shrink-0">
                <PdfIcon className="w-8 h-8" />
              </span>
              <div className="min-w-0">
                <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-0.5">{t.downloadPressKitPdf}</span>
              </div>
            </motion.a>
            <motion.a
              href={siteConfig.downloads.mediaFolder}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 group-hover:bg-white/15 text-white transition-colors shrink-0">
                <DownloadArrowIcon className="w-8 h-8" />
              </span>
              <div className="min-w-0">
                <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-0.5">{t.downloadMediaFolder}</span>
                <span className="block text-white font-medium">Google Drive</span>
              </div>
            </motion.a>
          </div>
        </AppleReveal>
      </div>

      <div className="mt-16 pb-20">
        <AppleReveal delay={0.08}>
          <h2 className="text-2xl font-semibold mb-6">{t.soundcloudLabel}</h2>
          <p className="text-neutral-400 text-sm mb-3">{t.soundcloudProfileText}</p>
          <a
            href={siteConfig.socials.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 hover:border-white/60 transition mb-8"
          >
            <IconSoundCloud className="w-5 h-5 shrink-0 text-[#ff5500]" />
            {t.openSoundCloud}
          </a>
          <div className="space-y-8">
            {siteConfig.soundcloudSessions.map((url) => (
              <div key={url} className="rounded-xl overflow-hidden bg-neutral-900/80 ring-1 ring-neutral-800/50">
                <p className="text-white font-medium px-4 pt-4 pb-1 text-sm">
                  {t[soundcloudSessionTitles[url] ?? "soundcloudSession1"]}
                </p>
                <iframe
                  title={t[soundcloudSessionTitles[url] ?? "soundcloudSession1"]}
                  width="100%"
                  height="166"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&inverse=false&auto_play=false&show_user=true`}
                  className="border-0"
                />
              </div>
            ))}
          </div>
        </AppleReveal>
      </div>
    </section>
  );
}
