"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const NUMERIC = /^([^\d]*?)(\d+)([\s\S]*)$/;

/**
 * Scroll-into-view stat counter (T14). Parses a display value like "95%" or
 * "~2 min" into prefix / integer / suffix and counts the integer up once when
 * visible. The server-rendered text is always the FINAL value, so no-JS and
 * reduced-motion users see the real stat instantly, and screen readers get a
 * stable sr-only copy while the animated span is aria-hidden.
 *
 * Non-numeric values ("Half", "Same week") render statically — no fake count.
 * A ch-unit min-width reserves the final width so counting never shifts layout.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "0px 0px -60px 0px" });

  const match = value.match(NUMERIC);
  const target = match ? Number.parseInt(match[2], 10) : null;

  useEffect(() => {
    if (reducedMotion || !inView || !match || target === null || target === 0) return;
    const [, prefix, , suffix] = match;
    const controls = animate(0, target, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (numberRef.current) {
          numberRef.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
        }
      },
    });
    return () => controls.stop();
    // match/target derive from `value`, which is static per call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reducedMotion, target, value]);

  if (!match || target === 0) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={rootRef} className={className}>
      <span
        ref={numberRef}
        aria-hidden="true"
        className="inline-block tabular-nums"
        style={{ minWidth: `${value.length}ch` }}
      >
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
