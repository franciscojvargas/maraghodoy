"use client";

import dynamic from "next/dynamic";
import { usePresentationContent } from "@/hooks/usePresentationContent";
import { useSlider } from "@/context/SliderContext";
import { principalImages } from "@/content/site";
import VerticalSlider from "@/components/VerticalSlider";
import HeroSlide from "@/components/HeroSlide";
import ImageSlide from "@/components/ImageSlide";
import VenueLogos from "@/components/VenueLogos";
import ResidencyLogos from "@/components/ResidencyLogos";
import SectionLinksSlide from "@/components/SectionLinksSlide";
import MobileSectionShell from "@/components/MobileSectionShell";

const RESIDENCY_BLOCK_INDEX = 2;
const VENUE_LOGOS_BLOCK_INDEX = 3;

const DesktopScrollPage = dynamic(
  () => import("@/components/DesktopScrollPage"),
  { ssr: true }
);

const EventsSection = dynamic(() => import("@/components/EventsSection"), { ssr: false });
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
              i === RESIDENCY_BLOCK_INDEX ? (
                <ResidencyLogos />
              ) : i === VENUE_LOGOS_BLOCK_INDEX ? (
                <VenueLogos />
              ) : undefined
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
    eventos: <EventsSection variant="teaser" />,
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
