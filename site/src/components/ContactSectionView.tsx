"use client";

import ContactSlide from "./ContactSlide";

export default function ContactSectionView() {
  return (
    <div
      className="h-screen max-h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-black pt-20 pb-12 touch-pan-y"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <ContactSlide embedded />
    </div>
  );
}
