"use client";

import { useEffect, useSyncExternalStore } from "react";

const VAR = "--slide-h";
/** El alto definitivo tras un giro puede tardar un par de fotogramas en llegar. */
const SETTLE_MS = 250;

function subscribe(onStoreChange: () => void) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const settle = () => {
    onStoreChange();
    clearTimeout(timer);
    timer = setTimeout(onStoreChange, SETTLE_MS);
  };

  window.addEventListener("resize", onStoreChange);
  window.addEventListener("orientationchange", settle);
  window.visualViewport?.addEventListener("resize", onStoreChange);

  return () => {
    clearTimeout(timer);
    window.removeEventListener("resize", onStoreChange);
    window.removeEventListener("orientationchange", settle);
    window.visualViewport?.removeEventListener("resize", onStoreChange);
  };
}

const getSnapshot = () => window.innerHeight;
/** En el servidor no hay viewport: 0 deja que el CSS use el `100dvh` de respaldo. */
const getServerSnapshot = () => 0;

/**
 * Alto del viewport en píxeles, publicado además en `--slide-h`.
 *
 * No usar `dvh` aquí: en móvil no siempre se recalcula tras un giro y, con el
 * scroll bloqueado, nada fuerza el reflow que lo corregiría. Que el alto del
 * pase y el recorrido del slider salgan del mismo número es lo que evita el
 * borde negro al fondo.
 */
export function useViewportHeight(): number {
  const height = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!height) return;
    const root = document.documentElement;
    root.style.setProperty(VAR, `${height}px`);
    return () => {
      root.style.removeProperty(VAR);
    };
  }, [height]);

  return height;
}
