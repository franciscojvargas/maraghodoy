"use client";

import Image from "next/image";
import { usePresentationContent } from "@/hooks/usePresentationContent";
import { principalImages } from "@/lib/site";
import ImageTextSection from "./ImageTextSection";
import VenueLogos from "./VenueLogos";

const cosmosLogoSectionIndex = 2;

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
            i === cosmosLogoSectionIndex ? (
              <div className="flex justify-center mt-8">
                <span className="relative block h-36 w-56 md:h-40 md:w-72">
                  <Image
                    src="/images/venues/cosmos.png"
                    alt="Sala Cosmos"
                    fill
                    className="object-contain object-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                    sizes="(max-width: 768px) 224px, 288px"
                  />
                </span>
              </div>
            ) : i === 3 ? (
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
