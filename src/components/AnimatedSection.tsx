"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useMounted } from "@/hooks/useMounted";

/**
 * Entradas al llegar al viewport. La animación es CSS (`reveal-in` en
 * globals.css); aquí sólo se decide cuándo, con el atributo `data-inview`.
 *
 * Con framer el HTML prerenderizado traía cada bloque a opacidad 0 hasta
 * hidratar: sin JS, o con JS lento, la página se veía vacía. Ahora el HTML no
 * lleva el atributo y se ve entero. Al hidratar sólo se ocultan los bloques que
 * aún quedan por debajo de la pantalla, que nadie ha visto; lo que ya está a la
 * vista se queda quieto. Lo que se monta después de hidratar (las secciones del
 * móvil, que no se prerenderizan) nace oculto y entra en cuanto aparece.
 */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  // `mounted` es false al hidratar y true en lo que se monta después.
  const [phase, setPhase] = useState<"shown" | "pending" | "run">(() =>
    mounted ? "pending" : "shown"
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPhase((p) => (p === "pending" ? "run" : p));
        observer.disconnect();
      } else if (entry.boundingClientRect.top > 0) {
        // Por debajo de la pantalla: se puede ocultar sin que nadie lo vea.
        setPhase((p) => (p === "shown" ? "pending" : p));
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView: phase === "shown" ? undefined : phase };
}

const ms = (seconds: number) => `${Math.round(seconds * 1000)}ms`;

type Motion = {
  y: number;
  scale?: number;
  duration: number;
  ease?: string;
};

const APPLE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const SOFT_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Todas las variables explícitas: si no, un bloque anidado heredaría las del de fuera. */
function motionVars({ y, scale = 1, duration, ease = APPLE_EASE }: Motion, delay: number, stagger = 0) {
  return {
    "--reveal-y": `${y}px`,
    "--reveal-scale": scale,
    "--reveal-duration": ms(duration),
    "--reveal-ease": ease,
    "--reveal-delay": ms(delay),
    "--reveal-stagger": ms(stagger),
    "--reveal-i": 0,
  } as CSSProperties;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Segundos. */
  delay?: number;
};

function Reveal({ children, className = "", delay = 0, motion }: RevealProps & { motion: Motion }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} data-inview={inView} className={`reveal ${className}`} style={motionVars(motion, delay)}>
      {children}
    </div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Segundos entre un hijo y el siguiente. */
  staggerDelay?: number;
};

/** Cada hijo va en su propio `.reveal-item` con su índice: el retardo lo calcula el CSS. */
function Stagger({ children, className = "", staggerDelay = 0.08, motion }: StaggerProps & { motion: Motion }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} data-inview={inView} className={className} style={motionVars(motion, 0.1, staggerDelay)}>
      {Children.toArray(children).map((child, i) => (
        <div
          key={isValidElement(child) && child.key != null ? child.key : i}
          className="reveal-item"
          style={{ "--reveal-i": i } as CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export function FadeIn(props: RevealProps) {
  return <Reveal {...props} motion={{ y: 0, duration: 0.7, ease: SOFT_EASE }} />;
}

export function AppleReveal(props: RevealProps) {
  return <Reveal {...props} motion={{ y: 48, scale: 0.96, duration: 1 }} />;
}

export function StaggerChildren(props: StaggerProps) {
  return <Stagger {...props} motion={{ y: 20, duration: 0.5, ease: SOFT_EASE }} />;
}

export function AppleStagger(props: StaggerProps) {
  return <Stagger {...props} motion={{ y: 36, scale: 0.96, duration: 0.85 }} />;
}
