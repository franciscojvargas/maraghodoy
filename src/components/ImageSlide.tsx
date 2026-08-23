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
    <div className="flex-shrink-0 w-full h-screen max-h-[100dvh] relative flex flex-col overflow-hidden">
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
      <div className="relative z-10 flex-1 flex flex-col items-center justify-end px-6 max-w-2xl mx-auto w-full text-center overflow-y-auto min-h-0 pb-10 pt-20">
        {extraAbove}
        {typeof children === "string" ? (
          <RevealText
            text={children}
            className="text-lg md:text-xl text-neutral-100 leading-relaxed drop-shadow-lg text-justify space-y-2"
          />
        ) : (
          <p className="text-lg md:text-xl text-neutral-100 leading-relaxed drop-shadow-lg text-justify">
            {children}
          </p>
        )}
        {extraBelow}
      </div>
    </div>
  );
}
