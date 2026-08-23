"use client";

import { useEffect, useRef, useState } from "react";
import { useMounted } from "@/hooks/useMounted";

/**
 * Retardo entre palabras. Con el fundido corto de 200 ms deja sólo unas tres
 * palabras a medias en cada momento, que es lo que hace que se lea como
 * escritura y no como un fundido en bloque.
 */
const STEP_MS = 62;
/** Techo por bloque: un párrafo largo no debe tardar más que esto en completarse. */
const MAX_TOTAL_MS = 4000;

type Props = {
  text: string;
  className?: string;
};

/**
 * Revela el texto palabra a palabra. El texto va entero en el DOM desde el
 * prerender: sólo se anima la opacidad, así que sigue siendo indexable,
 * seleccionable y legible por lector de pantalla. Sin JS, o antes de montar,
 * se ve completo.
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
