"use client";

import { usePresentationContent } from "@/hooks/usePresentationContent";
import { principalImages } from "@/lib/site";
import ImageTextSection from "./ImageTextSection";
import VenueLogos from "./VenueLogos";

export default function PrincipalContent() {
  const { blocks } = usePresentationContent();

  return (
    <section>
      {blocks.map((text, i) => (
        <ImageTextSection
          key={i}
          src={principalImages[i] ?? principalImages[0]!}
          alt="Mara Ghodoy"
          extraBelow={i === 3 ? <VenueLogos /> : undefined}
        >
          {text}
        </ImageTextSection>
      ))}
    </section>
  );
}
