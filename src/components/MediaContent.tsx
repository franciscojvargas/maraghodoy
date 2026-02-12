"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";
import { galleryImages, INITIAL_GALLERY_COUNT } from "@/content/gallery";
import Image from "next/image";
import { IconSoundCloud } from "./SocialIcons";
import { ImageLightbox } from "./ImageLightbox";
import { PdfIcon, DownloadArrowIcon } from "./DownloadIcons";

const soundcloudSessionTitles: Record<string, "soundcloudSession1" | "soundcloudSession2" | "soundcloudSession3"> = {
  [siteConfig.soundcloudSessions[0]]: "soundcloudSession1",
  [siteConfig.soundcloudSessions[1]]: "soundcloudSession2",
  [siteConfig.soundcloudSessions[2]]: "soundcloudSession3",
};

export function MediaContent() {
  const { t } = useLanguage();
  const [galleryExpanded, setGalleryExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const initialImages = galleryImages.slice(0, INITIAL_GALLERY_COUNT);
  const moreImages = galleryImages.slice(INITIAL_GALLERY_COUNT);
  const hasMore = galleryImages.length > INITIAL_GALLERY_COUNT;

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-8 max-w-5xl mx-auto pb-8 sm:pb-20">
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl font-semibold mb-4 sm:mb-6">{t.imagesTitle}</h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {initialImages.map(({ src, alt }) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightboxIndex(galleryImages.findIndex((img) => img.src === src))}
              className="relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
            >
              <Image src={src} alt={alt} fill className="object-cover" sizes="50vw" />
            </button>
          ))}
          {galleryExpanded &&
            moreImages.map(({ src, alt }) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(galleryImages.findIndex((img) => img.src === src))}
                className="relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
              >
                <Image src={src} alt={alt} fill className="object-cover" sizes="50vw" />
              </button>
            ))}
        </div>
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
      </div>

      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl font-semibold mb-4 sm:mb-6">{t.videosTitle}</h2>
        <div className="space-y-4 sm:space-y-6">
          <a
            href="https://youtu.be/vWLnck3Br4k"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-neutral-900">
              <iframe
                title="Mara Ghodoy - Electrolunch"
                src="https://www.youtube.com/embed/vWLnck3Br4k"
                loading="lazy"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="sr-only">{t.videoElectrolunch}</p>
          </a>
          <a
            href="https://youtu.be/MSB1qcutY_M"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-neutral-900">
              <iframe
                title="Mara Ghodoy - Rastro Live"
                src="https://www.youtube.com/embed/MSB1qcutY_M"
                loading="lazy"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="sr-only">{t.videoRastroLive}</p>
          </a>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 sm:mb-6">{t.soundcloudLabel}</h2>
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          {[siteConfig.soundcloudSessions[0]].map((url) => (
            <div key={url} className="rounded-lg sm:rounded-xl overflow-hidden bg-neutral-900/80">
              <iframe
                title={t[soundcloudSessionTitles[url] ?? "soundcloudSession1"]}
                width="100%"
                height="166"
                allow="autoplay"
                loading="lazy"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&inverse=false&auto_play=false&show_user=true`}
                className="border-0"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={siteConfig.socials.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200 w-full"
            aria-label={t.openSoundCloud}
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 group-hover:bg-white/15 text-[#ff5500] transition-colors shrink-0">
              <IconSoundCloud className="w-8 h-8" />
            </span>
            <div className="min-w-0">
              <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-0.5">{t.soundcloudLabel}</span>
              <span className="block text-white font-medium">{t.soundcloudButtonSubtitle}</span>
            </div>
          </a>
        </div>
      </div>

      <div className="mt-12 sm:mt-8">
        <h2 className="text-2xl font-semibold mb-4 sm:mb-6">{t.downloadSectionTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={siteConfig.downloads.pressKitPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 group-hover:bg-white/15 text-white transition-colors shrink-0">
              <PdfIcon className="w-8 h-8" />
            </span>
            <div className="min-w-0">
              <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-0.5">{t.downloadPressKitPdf}</span>
              <span className="block text-white font-medium">{t.downloadPressKitSubtitle}</span>
            </div>
          </a>
          <a
            href={siteConfig.downloads.mediaFolder}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 group-hover:bg-white/15 text-white transition-colors shrink-0">
              <DownloadArrowIcon className="w-8 h-8" />
            </span>
            <div className="min-w-0">
              <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-0.5">
                Google Drive
              </span>
              <span className="block text-white font-medium">
                {t.downloadMediaFolderSubtitle}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
