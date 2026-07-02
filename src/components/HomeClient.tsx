"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { usePresentationContent } from "@/hooks/usePresentationContent";
import { useSlider } from "@/context/SliderContext";
import { principalImages } from "@/content/site";
import VerticalSlider from "@/components/VerticalSlider";
import HeroSlide from "@/components/HeroSlide";
import ImageSlide from "@/components/ImageSlide";
import VenueLogos from "@/components/VenueLogos";
import SectionLinksSlide from "@/components/SectionLinksSlide";
import MobileSectionShell from "@/components/MobileSectionShell";

const COSMOS_LOGO_BLOCK_INDEX = 2;
const VENUE_LOGOS_BLOCK_INDEX = 3;

const cosmosLogoAbove = (
  <div className="flex justify-center mt-8">
    <span className="relative block h-36 w-56 md:h-40 md:w-72">
      <Image
        src="/images/venues/cosmos.webp"
        alt="Sala Cosmos"
        fill
        className="object-contain object-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
        sizes="(max-width: 768px) 224px, 288px"
      />
    </span>
  </div>
);

const DesktopScrollPage = dynamic(
  () => import("@/components/DesktopScrollPage"),
  { ssr: true }
);

const MediaSection = dynamic(() => import("@/components/MediaSection"), { ssr: false });
const RiderSection = dynamic(() => import("@/components/RiderSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: false });

function MobileContent() {
  const { blocks } = usePresentationContent();
  const { currentSection } = useSlider();

  if (currentSection === "presentacion") {
    return (
      <VerticalSlider>
        <HeroSlide />
        {blocks.map((text, i) => (
          <ImageSlide
            key={i}
            src={principalImages[i] ?? principalImages[0]!}
            alt="Mara Ghodoy"
            extraAbove={
              i === COSMOS_LOGO_BLOCK_INDEX
                ? cosmosLogoAbove
                : i === VENUE_LOGOS_BLOCK_INDEX
                  ? <VenueLogos />
                  : undefined
            }
          >
            {text}
          </ImageSlide>
        ))}
        <SectionLinksSlide />
      </VerticalSlider>
    );
  }

  const sections = {
    media: <MediaSection />,
    rider: <RiderSection />,
    contacto: <ContactSection />,
  } as const;

  return <MobileSectionShell>{sections[currentSection]}</MobileSectionShell>;
}

export default function HomeClient() {
  return (
    <>
      <div className="md:hidden max-md:h-full">
        <MobileContent />
      </div>
      <div className="hidden md:block">
        <DesktopScrollPage />
      </div>
    </>
  );
}
