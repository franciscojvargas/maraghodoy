"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useSlider } from "@/context/SliderContext";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useViewportHeight } from "@/hooks/useViewportHeight";

const SWIPE_THRESHOLD = 35;
/** Un trackpad dispara decenas de eventos por gesto: sin freno, un gesto se comía cuatro pases. */
const WHEEL_COOLDOWN_MS = 500;

function SliderInner({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { currentIndex, setTotalSlides, goToSlide } = useSlider();
  const total = React.Children.count(children);
  const touchStartY = useRef(0);

  useLayoutEffect(() => {
    setTotalSlides(total);
  }, [total, setTotalSlides]);

  const isMobile = useIsMobile();
  useLockBodyScroll(isMobile);

  useEffect(() => {
    if (!isMobile) return;
    const html = document.documentElement;
    const body = document.body;
    html.style.height = "100%";
    body.style.height = "100%";
    return () => {
      html.style.height = "";
      body.style.height = "";
    };
  }, [isMobile]);

  const slideHeight = useViewportHeight();
  const y = useMotionValue(0);
  const translateY = useTransform(y, (v) => `${v}px`);
  const lastHeight = useRef(0);

  useEffect(() => {
    if (!slideHeight) return;
    const target = -currentIndex * slideHeight;

    // Si lo que ha cambiado es el alto (un giro de pantalla), se recoloca en
    // seco: deslizar ahí se vería como un salto.
    if (lastHeight.current !== slideHeight) {
      lastHeight.current = slideHeight;
      y.set(target);
      return;
    }

    const controls = animate(y, target, {
      type: "tween",
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return controls.stop;
  }, [currentIndex, slideHeight, y]);

  const currentIndexRef = useRef(currentIndex);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const lastWheel = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < WHEEL_COOLDOWN_MS) return;
      const idx = currentIndexRef.current;
      if (e.deltaY > 30) {
        lastWheel.current = now;
        goToSlide(idx + 1);
      } else if (e.deltaY < -30) {
        lastWheel.current = now;
        goToSlide(idx - 1);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goToSlide]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const idx = currentIndexRef.current;
      if (e.key === "ArrowDown" || e.key === "PageDown") goToSlide(idx + 1);
      else if (e.key === "ArrowUp" || e.key === "PageUp") goToSlide(idx - 1);
      else if (e.key === "Home") goToSlide(0);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToSlide]);

  const touchTarget = useRef<EventTarget | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchTarget.current = e.target;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const el = touchTarget.current as Node | null;
    const endY = e.changedTouches[0].clientY;
    const delta = touchStartY.current - endY;
    const idx = currentIndexRef.current;
    const maxIndex = Math.max(0, total - 1);

    if (el && typeof (el as Element).closest === "function") {
      const scrollable = (el as Element).closest("[data-scrollable]");
      const scrollContainer = (el as Element).closest("[data-scroll-container]") as HTMLElement | null;
      if (scrollable && scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 20;
        const atTop = scrollTop <= 20;
        if (atBottom && delta > SWIPE_THRESHOLD && idx < maxIndex) {
          goToSlide(idx + 1);
          return;
        }
        if (atTop && delta < -SWIPE_THRESHOLD && idx > 0) {
          goToSlide(idx - 1);
          return;
        }
        return;
      }
    }

    if (delta > SWIPE_THRESHOLD && idx < maxIndex) goToSlide(idx + 1);
    else if (delta < -SWIPE_THRESHOLD && idx > 0) goToSlide(idx - 1);
  };

  return (
    <div
      ref={ref}
      className="h-full overflow-hidden touch-manipulation"
      onTouchStartCapture={handleTouchStart}
      onTouchEndCapture={handleTouchEnd}
    >
      <motion.div
        className="flex flex-col"
        style={{ translateY, height: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function VerticalSlider({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full overflow-hidden bg-black">
      <SliderInner>{children}</SliderInner>
    </div>
  );
}
