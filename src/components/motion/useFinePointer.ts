"use client";

import { useEffect, useState } from "react";

/**
 * True only on devices with a hover-capable fine pointer (mouse/trackpad).
 * Pointer-only effects (tilt, magnetic, cursor glow) gate on this so touch
 * and keyboard users never get motion they cannot control. SSR + first
 * client render both return false, so markup never diverges at hydration.
 */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return fine;
}
