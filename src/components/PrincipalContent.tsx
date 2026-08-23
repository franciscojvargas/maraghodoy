"use client";

import { usePresentationContent } from "@/hooks/usePresentationContent";
import { principalImages } from "@/content/site";
import ImageTextSection from "./ImageTextSection";
import VenueLogos from "./VenueLogos";
import ResidencyLogos from "./ResidencyLogos";

const RESIDENCY_BLOCK_INDEX = 2;
const VENUE_LOGOS_BLOCK_INDEX = 3;

export default function PrincipalContent() {
  const { blocks } = usePresentationContent();

  return (
    <section>
      {blocks.map((text, i) => (
        <ImageTextSection
          key={i}
          src={principalImages[i] ?? principalImages[0]!}
          alt="Mara Ghodoy"
          extraBelow={
            i === RESIDENCY_BLOCK_INDEX ? (
              <ResidencyLogos />
            ) : i === VENUE_LOGOS_BLOCK_INDEX ? (
              <VenueLogos />
            ) : undefined
          }
        >
          {text}
        </ImageTextSection>
      ))}
    </section>
  );
}
