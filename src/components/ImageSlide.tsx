"use client";

import Image from "next/image";
import RevealText from "./RevealText";

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
  extraAbove?: React.ReactNode;
  extraBelow?: React.ReactNode;
};

export default function ImageSlide({ src, alt, children, extraAbove, extraBelow }: Props) {
  return (
    <div className="flex-shrink-0 w-full h-[var(--slide-h)] relative flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/35" />
      </div>
      {/* En un móvil bajo el texto puede no caber y este bloque scrollea; el
          slider lo sabe por `data-scroll-container` y sólo cambia de pase al
          llegar al borde. Va pegado abajo con `mt-auto` y no con `justify-end`:
          con `justify-end` lo que desborda por arriba queda fuera del scroll. */}
      <div
        data-scroll-container
        className="relative z-10 flex-1 flex flex-col px-6 max-w-2xl mx-auto w-full text-center overflow-y-auto overscroll-contain min-h-0 pb-10 pt-20"
      >
        <div className="mt-auto flex flex-col items-center">
          {extraAbove}
          {typeof children === "string" ? (
            <RevealText
              text={children}
              className="text-lg md:text-xl text-neutral-100 leading-relaxed drop-shadow-lg space-y-2"
            />
          ) : (
            <p className="text-lg md:text-xl text-neutral-100 leading-relaxed drop-shadow-lg">
              {children}
            </p>
          )}
          {extraBelow}
        </div>
      </div>
    </div>
  );
}
