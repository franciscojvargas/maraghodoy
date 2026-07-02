"use client";

import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useIsMobile } from "@/hooks/useMediaQuery";

export default function MobileSectionShell({ children }: { children: React.ReactNode }) {
  useLockBodyScroll(useIsMobile());

  return (
    <div
      className="h-full min-h-0 w-full overflow-y-auto overflow-x-hidden bg-black pt-20 pb-12 touch-pan-y"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {children}
    </div>
  );
}
