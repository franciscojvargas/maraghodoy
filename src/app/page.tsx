"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { usePresentationContent } from "@/hooks/usePresentationContent";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useSlider } from "@/context/SliderContext";
import { principalImages } from "@/lib/site";
import VerticalSlider from "@/components/VerticalSlider";
import HeroSlide from "@/components/HeroSlide";
import ImageSlide from "@/components/ImageSlide";
import VenueLogos from "@/components/VenueLogos";
import SectionLinksSlide from "@/components/SectionLinksSlide";

const COSMOS_LOGO_BLOCK_INDEX = 2;

const cosmosLogoBelow = (
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
);

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
            extraBelow={
              i === COSMOS_LOGO_BLOCK_INDEX ? cosmosLogoBelow : i === 3 ? <VenueLogos /> : undefined
            }
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
