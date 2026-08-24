"use client";

import { useEffect, useRef, useState } from "react";
import { useMounted } from "@/hooks/useMounted";

/** Retardo entre palabras: deja unas tres a medias, y por eso se lee como escritura. */
const STEP_MS = 62;
/** Techo por bloque: un párrafo largo no debe tardar más que esto en completarse. */
const MAX_TOTAL_MS = 4000;

type Props = {
  text: string;
  className?: string;
};

/**
 * El texto va entero en el DOM desde el prerender y sólo se anima la opacidad:
 * sigue siendo indexable y legible por lector de pantalla. Sin JS se ve completo.
 */
export default function RevealText({ text, className }: Props) {
  const mounted = useMounted();
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || started) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [started]);

  const lines = text.split("\n");
  const totalWords = text.split(/\s+/).filter(Boolean).length;
  const step = Math.min(STEP_MS, MAX_TOTAL_MS / Math.max(totalWords, 1));

  let wordIndex = 0;

  return (
    <div
      ref={ref}
      className={className}
      // Sin montar no hay atributo: el HTML prerenderizado se ve completo.
      data-reveal={mounted ? (started ? "run" : "pending") : undefined}
      style={{ "--reveal-step": `${step.toFixed(1)}ms` } as React.CSSProperties}
    >
      {lines.map((line, lineIndex) => (
        <p key={lineIndex}>
          {line.split(" ").map((word, i) => (
            <span
              key={i}
              className="reveal-word"
              style={{ "--reveal-i": wordIndex++ } as React.CSSProperties}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
