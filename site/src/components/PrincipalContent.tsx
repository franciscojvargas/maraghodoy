"use client";

import { usePresentationContent } from "@/hooks/usePresentationContent";
import ImageTextSection from "./ImageTextSection";
import VenueLogos from "./VenueLogos";

const principalImages = [
  "/images/press-1.jpg",
  "/images/press-2.jpg",
  "/images/press-3.jpg",
  "/images/press-4.jpg",
  "/images/press-5.jpg",
];

export default function PrincipalContent() {
  const { blocks } = usePresentationContent();

  return (
    <section>
      {blocks.map((text, i) => (
        <ImageTextSection
          key={i}
          src={principalImages[i] ?? principalImages[0]}
          alt="Mara Ghodoy"
          extraBelow={i === 3 ? <VenueLogos /> : undefined}
        >
          {text}
        </ImageTextSection>
      ))}
    </section>
  );
}
