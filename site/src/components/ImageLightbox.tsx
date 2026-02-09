"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

type ImageItem = { src: string; alt: string };

export function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onSelectIndex,
  closeLabel = "Salir",
  downloadLabel = "Descargar",
}: {
  images: readonly ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  closeLabel?: string;
  downloadLabel?: string;
}) {
  const image = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onSelectIndex(currentIndex - 1);
      if (e.key === "ArrowRight" && hasNext) onSelectIndex(currentIndex + 1);
    },
    [onClose, onSelectIndex, currentIndex, hasPrev, hasNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!image || !mounted) return null;

  const downloadFilename = image.src.split("/").pop() ?? `maraghodoy-${currentIndex + 1}.jpg`;

  const lightbox = (
    <div
      className="fixed inset-0 flex flex-col bg-black"
      style={{ zIndex: 99999 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada de la imagen"
    >
      <div
        className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 border-b border-white/30"
        style={{ minHeight: 56, backgroundColor: "rgba(0,0,0,0.95)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-full p-2.5 text-white hover:bg-white/15 transition"
          aria-label={closeLabel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <a
          href={image.src}
          download={downloadFilename}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center justify-center rounded-full p-2.5 text-white hover:bg-white/15 transition"
          aria-label={downloadLabel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
      </div>

      <div className="relative flex flex-1 items-center justify-center p-4">
      {hasPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectIndex(currentIndex - 1);
          }}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition md:left-4"
          aria-label="Imagen anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectIndex(currentIndex + 1);
          }}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition md:right-4"
          aria-label="Siguiente imagen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
          </svg>
        </button>
      )}

        <div
          className="relative max-h-full w-full max-w-5xl flex items-center justify-center min-h-0"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={1600}
            className="max-h-[75vh] w-auto object-contain rounded-lg"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <p className="shrink-0 py-2 text-center text-sm text-white/60">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );

  return createPortal(lightbox, document.body);
}
