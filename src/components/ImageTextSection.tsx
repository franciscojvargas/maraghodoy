"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RevealText from "./RevealText";

const appleEase = [0.16, 1, 0.3, 1] as const;

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
  extraAbove?: React.ReactNode;
  extraBelow?: React.ReactNode;
};

export default function ImageTextSection({ src, alt, children, extraAbove, extraBelow }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "8%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 1.08]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-[75vh] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/35" />
      </motion.div>

      {/* Sólo desliza: el texto entra con el revelado por palabras, y si además
          se fundiera el contenedor entero las dos animaciones se solaparían y no
          se percibiría ninguna. */}
      <motion.div
        initial={{ y: 56 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-100px", amount: 0.25 }}
        transition={{ duration: 0.8, ease: appleEase }}
        className="relative z-10 px-6 max-w-2xl text-center"
      >
        {extraAbove}
        {typeof children === "string" ? (
          <RevealText
            text={children}
            className="text-lg md:text-xl text-neutral-100 leading-relaxed drop-shadow-lg space-y-2"
          />
        ) : (
          <p className="text-lg md:text-xl text-neutral-100 leading-relaxed drop-shadow-lg">
            {children}
          </p>
        )}
        {extraBelow}
      </motion.div>
    </motion.section>
  );
}
