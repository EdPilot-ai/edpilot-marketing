"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const GLYPHS = "abcdefghijklmnopqrstuvwxyz";
const DURATION_MS = 520;

/**
 * One-shot scramble-in for the homepage hero accent word (T17). The real text
 * is server-rendered unchanged (LCP/SEO); after hydration, characters resolve
 * left-to-right out of brief glyph noise. Character count never changes, so
 * there is no layout shift. Skipped entirely under prefers-reduced-motion.
 */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (reducedMotion || !el) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      const settled = Math.floor(progress * text.length);
      let next = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        const char = text[i];
        next += char === " " || char === "." ? char : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = next;
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        el.textContent = text;
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, text]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
