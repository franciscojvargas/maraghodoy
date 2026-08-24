"use client";

import dynamic from "next/dynamic";
import { usePresentationContent } from "@/hooks/usePresentationContent";
import { useSlider } from "@/context/SliderContext";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";
import { principalImages } from "@/content/site";
import VerticalSlider from "@/components/VerticalSlider";
import HeroSlide from "@/components/HeroSlide";
import ImageSlide from "@/components/ImageSlide";
import VenueLogos from "@/components/VenueLogos";
import ResidencyLogos from "@/components/ResidencyLogos";
import SectionLinksSlide from "@/components/SectionLinksSlide";
import MobileSectionShell from "@/components/MobileSectionShell";
import SectionSkeleton from "@/components/SectionSkeleton";
import SliderDots from "@/components/SliderDots";
import { useSectionHash } from "@/hooks/useSectionHash";

const RESIDENCY_BLOCK_INDEX = 2;
const VENUE_LOGOS_BLOCK_INDEX = 3;

const DesktopScrollPage = dynamic(
  () => import("@/components/DesktopScrollPage"),
  { ssr: true }
);

// Sin `loading`, tocar una sección con la caché fría deja la pantalla en negro.
const loading = () => <SectionSkeleton />;

const EventsSection = dynamic(() => import("@/components/EventsSection"), { ssr: false, loading });
const MediaSection = dynamic(() => import("@/components/MediaSection"), { ssr: false, loading });
const RiderSection = dynamic(() => import("@/components/RiderSection"), { ssr: false, loading });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: false, loading });

function MobileContent() {
  const { blocks } = usePresentationContent();
  const { currentSection } = useSlider();

  if (currentSection === "presentacion") {
    return (
      <>
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
        <SliderDots />
      </>
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
  useSectionHash();

  const isMobile = useIsMobile();
  const mounted = useMounted();

  // Los dos árboles van en el HTML para que el primer paint sea correcto sin
  // flash; el que sobra se desmonta al hidratar, no antes, o el primer render
  // del cliente no cuadraría con el HTML.
  const showMobile = !mounted || isMobile;
  const showDesktop = !mounted || !isMobile;

  return (
    <>
      {showMobile && (
        <div className="md:hidden max-md:h-full">
          <MobileContent />
        </div>
      )}
      {showDesktop && (
        <div className="hidden md:block">
          <DesktopScrollPage />
        </div>
      )}
    </>
  );
}
