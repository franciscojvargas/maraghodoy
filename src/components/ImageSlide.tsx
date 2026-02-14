"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
  extraAbove?: React.ReactNode;
  extraBelow?: React.ReactNode;
};

export default function ImageSlide({ src, alt, children, extraAbove, extraBelow }: Props) {
  return (
    <div className="flex-shrink-0 w-full h-screen max-h-[100dvh] relative flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 px-6 max-w-2xl text-center overflow-y-auto max-h-[100dvh] py-12 flex flex-col items-center justify-center">
        {extraAbove}
        {typeof children === "string" && children.includes("\n") ? (
          <div className="text-lg md:text-xl text-neutral-100 leading-relaxed drop-shadow-lg text-justify space-y-2">
            {children.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
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
