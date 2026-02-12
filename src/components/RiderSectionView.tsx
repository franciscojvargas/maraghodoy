"use client";

import { useEffect } from "react";
import RiderSlide from "./RiderSlide";

export default function RiderSectionView() {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="h-full min-h-0 w-full overflow-y-auto overflow-x-hidden bg-black pt-20 pb-12 touch-pan-y"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <RiderSlide embedded />
    </div>
  );
}
