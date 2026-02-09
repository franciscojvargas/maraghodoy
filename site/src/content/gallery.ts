const GALLERY_BASE = "/images/gallery";

const MIXED_ORDER = [
  "gallery-12.jpg",
  "gallery-2.jpg",
  "gallery-18.jpg",
  "gallery-5.jpg",
  "gallery-15.jpg",
  "gallery-8.png",
  "gallery-10.jpg",
  "gallery-3.jpg",
  "gallery-21.jpg",
  "gallery-6.jpg",
  "gallery-14.jpg",
  "gallery-4.jpg",
  "gallery-9.jpg",
  "gallery-22.png",
  "gallery-7.jpg",
  "gallery-17.jpg",
  "gallery-11.jpg",
  "gallery-13.jpg",
  "gallery-16.jpg",
  "gallery-19.jpg",
  "gallery-20.jpg",
] as const;

export const galleryImages = MIXED_ORDER.map((file) => ({
  src: `${GALLERY_BASE}/${file}`,
  alt: "Mara Ghodoy",
})) as readonly { src: string; alt: string }[];

export const INITIAL_GALLERY_COUNT = 6;
