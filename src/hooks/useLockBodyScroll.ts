"use client";

import { useEffect } from "react";

let lockCount = 0;

export function useLockBodyScroll(active: boolean = true) {
  useEffect(() => {
    if (!active) return;
    lockCount += 1;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    };
  }, [active]);
}
