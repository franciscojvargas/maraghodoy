"use client";

import dynamic from "next/dynamic";
import { usePresentationContent } from "@/hooks/usePresentationContent";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useSlider } from "@/context/SliderContext";
import { principalImages } from "@/lib/site";
import VerticalSlider from "@/components/VerticalSlider";
import HeroSlide from "@/components/HeroSlide";
import ImageSlide from "@/components/ImageSlide";
import VenueLogos from "@/components/VenueLogos";
import SectionLinksSlide from "@/components/SectionLinksSlide";

const DesktopScrollPage = dynamic(
  () => import("@/components/DesktopScrollPage"),
  { ssr: true }
);

const MediaSectionView = dynamic(() => import("@/components/MediaSectionView"), { ssr: false });
const RiderSectionView = dynamic(() => import("@/components/RiderSectionView"), { ssr: false });
const ContactSectionView = dynamic(() => import("@/components/ContactSectionView"), { ssr: false });

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
            extraBelow={i === 3 ? <VenueLogos /> : undefined}
          >
            {text}
          </ImageSlide>
        ))}
        <SectionLinksSlide />
      </VerticalSlider>
    );
  }
  if (currentSection === "media") return <MediaSectionView />;
  if (currentSection === "rider") return <RiderSectionView />;
  if (currentSection === "contacto") return <ContactSectionView />;
  return null;
}

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileContent />;
  }

  return <DesktopScrollPage />;
}
