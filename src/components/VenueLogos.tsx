"use client";

import { useState } from "react";
import Image from "next/image";

const textLogoClass = "text-white font-bold text-base md:text-lg tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] whitespace-nowrap";

const venues: { name: string; textLabel: string; logo: string | null }[] = [
  { name: "Sala Cosmos", textLabel: "COSMOS", logo: "/images/venues/cosmos.png" },
  { name: "Paris15", textLabel: "Paris15", logo: "/images/venues/paris15.png" },
  { name: "Basshaus", textLabel: "BASSHAUS", logo: null },
  { name: "Pandora", textLabel: "Pandora", logo: "/images/venues/pandora.png" },
];

function VenueItem({
  name,
  textLabel,
  logo,
  showFallback,
  onError,
}: {
  name: string;
  textLabel: string;
  logo: string | null;
  showFallback: boolean;
  onError: () => void;
}) {
  const useText = !logo || showFallback;

  if (useText) {
    return (
      <span className={`flex items-center justify-center h-16 md:h-20 ${textLogoClass}`}>
        {textLabel}
      </span>
    );
  }

  return (
    <span className="relative flex shrink-0 h-24 w-56 md:h-32 md:w-80">
      <Image
        src={logo}
        alt={name}
        fill
        className="object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
        sizes="(max-width: 768px) 280px, 340px"
        onError={onError}
      />
    </span>
  );
}

export default function VenueLogos() {
  const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set());

  return (
    <div className="mt-8 md:mt-10 grid grid-cols-2 place-items-center gap-6 md:gap-10 max-w-2xl mx-auto">
      {venues.map(({ name, textLabel, logo }) => (
        <VenueItem
          key={name}
          name={name}
          textLabel={textLabel}
          logo={logo}
          showFallback={failedLogos.has(name)}
          onError={() => setFailedLogos((prev) => new Set(prev).add(name))}
        />
      ))}
    </div>
  );
}
