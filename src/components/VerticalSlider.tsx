"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useSlider } from "@/context/SliderContext";

const SWIPE_THRESHOLD = 35;

function SliderInner({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { currentIndex, setTotalSlides, goToSlide } = useSlider();
  const total = React.Children.count(children);
  const touchStartY = useRef(0);

  useLayoutEffect(() => {
    setTotalSlides(total);
  }, [total, setTotalSlides]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHeight = html.style.height;
    html.style.overflow = "hidden";
    html.style.height = "100%";
    body.style.overflow = "hidden";
    body.style.height = "100%";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      html.style.height = prevHeight;
      body.style.overflow = prevBodyOverflow;
      body.style.height = "";
    };
  }, []);

  const y = useMotionValue(0);
  const translateY = useTransform(y, (v) => `${v}dvh`);

  useEffect(() => {
    const controls = animate(y, -currentIndex * 100, {
      type: "tween",
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return controls.stop;
  }, [currentIndex, y]);

  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const idx = currentIndexRef.current;
      if (e.deltaY > 30) goToSlide(idx + 1);
      else if (e.deltaY < -30) goToSlide(idx - 1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
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
    <div className="h-screen max-h-[100dvh] w-full overflow-hidden bg-black">
      <SliderInner>{children}</SliderInner>
    </div>
  );
}
