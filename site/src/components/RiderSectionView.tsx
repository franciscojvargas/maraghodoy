"use client";

import RiderSlide from "./RiderSlide";

export default function RiderSectionView() {
  return (
    <div
      className="h-screen max-h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-black pt-20 pb-12 touch-pan-y"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <RiderSlide embedded />
    </div>
  );
}
