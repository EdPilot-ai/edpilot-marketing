"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useFinePointer } from "./useFinePointer";

/** Hard cap on cursor-follow travel — "within a few px", never a rubber band. */
const MAX_OFFSET_PX = 5;

/**
 * Subtle magnetic hover for the primary CTA (T16). The wrapped control drifts
 * a few px toward the cursor on a damped spring and settles back on leave.
 * Pointer-only: on touch devices and under prefers-reduced-motion it renders
 * children untouched, so layout, keyboard focus, and tap behavior are identical.
 */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const spring = { stiffness: 220, damping: 16, mass: 0.6 };
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <m.div
      className={className}
      style={{ x, y, willChange: "transform" }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        rawX.set(Math.max(-MAX_OFFSET_PX, Math.min(MAX_OFFSET_PX, dx * 0.15)));
        rawY.set(Math.max(-MAX_OFFSET_PX, Math.min(MAX_OFFSET_PX, dy * 0.15)));
      }}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      {children}
    </m.div>
  );
}
