"use client";

import { MediaContent } from "./MediaContent";

export default function MediaSectionView() {
  return (
    <div
      className="h-screen max-h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-black pt-20 pb-12 touch-pan-y"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <MediaContent />
    </div>
  );
}
