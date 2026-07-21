export const principalImages = [
  "/images/press-1.webp",
  "/images/press-2.webp",
  "/images/press-3.webp",
  "/images/press-4.webp",
  "/images/press-5.webp",
] as const;

export const siteConfig = {
  name: "Mara Ghodoy",
  title: "Mara Ghodoy | DJ & Producer — Hardgroove & Hypnotic Techno",
  description: {
    es: "Press kit oficial de Mara Ghodoy, DJ y productora de techno (hardgroove e hypnotic techno). Sesiones, vídeos, fotos de prensa, technical rider y contacto de booking. Residente en Cosmos Club, Sevilla.",
    en: "Official press kit of DJ and producer Mara Ghodoy. Hardgroove & hypnotic techno. Music, videos, press photos, technical rider and booking contact. Resident at Cosmos Club, Seville.",
  },
  url: "https://maraghodoy.com",
  email: "booking@maraghodoy.com",
  socials: {
    instagram: "https://instagram.com/maraghodoy",
    soundcloud: "https://soundcloud.com/mara-ghodoy",
    youtube: "https://youtu.be/vWLnck3Br4k",
  },
  videos: [
    { id: "vWLnck3Br4k", titleKey: "videoElectrolunch" },
    { id: "MSB1qcutY_M", titleKey: "videoRastroLive" },
  ],
  soundcloudSessions: [
    {
      url: "https://soundcloud.com/mara-ghodoy/electrolunch-07-04-2026-parque",
      title: "Electrolunch (07/04/2026)",
    },
  ],
  downloads: {
    pressKitPdf: "https://drive.google.com/drive/folders/1hBNHAowXAhwakbR0eZweSXjTt4NhztuP?usp=sharing",
    mediaFolder: "https://drive.google.com/drive/folders/1hBNHAowXAhwakbR0eZweSXjTt4NhztuP?usp=sharing",
  },
} as const;
