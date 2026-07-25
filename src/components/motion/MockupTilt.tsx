"use client";

import { m, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useFinePointer } from "./useFinePointer";

const MAX_TILT_DEG = 5;
/** Px of pointer-parallax per unit of `data-tilt-depth` at full deflection. */
const LAYER_TRAVEL_PX = 3;

/**
 * Pointer-driven 3D tilt for the hero product mockup (T12). The whole mockup
 * rotates a few degrees on a damped spring, and any descendant carrying a
 * `data-tilt-depth` attribute parallax-shifts proportionally to that number,
 * which gives the window chrome / panels a soft sense of layered depth.
 *
 * All motion is transform-only on composited layers. Disabled entirely on
 * touch/coarse-pointer devices and under prefers-reduced-motion, where the
 * wrapper renders as a plain div and the mockup sits static.
 */
export function MockupTilt({ children, className }: { children: ReactNode; className?: string }) {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const rootRef = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 150, damping: 20, mass: 0.8 };
  // Normalized pointer position (-1..1) and the derived rotation, each with
  // a raw motion value feeding a spring — the springs do the damping.
  const rawNX = useMotionValue(0);
  const rawNY = useMotionValue(0);
  const nx = useSpring(rawNX, spring);
  const ny = useSpring(rawNY, spring);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, spring);
  const rotateY = useSpring(rawRotateY, spring);

  // Layer parallax: write transforms straight to the DOM (no React re-render).
  useMotionValueEvent(nx, "change", () => applyLayerParallax(rootRef.current, nx.get(), ny.get()));
  useMotionValueEvent(ny, "change", () => applyLayerParallax(rootRef.current, nx.get(), ny.get()));

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={rootRef}
      className={className}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const py = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        rawNX.set(px);
        rawNY.set(py);
        rawRotateX.set(-py * MAX_TILT_DEG);
        rawRotateY.set(px * MAX_TILT_DEG);
      }}
      onPointerLeave={() => {
        rawNX.set(0);
        rawNY.set(0);
        rawRotateX.set(0);
        rawRotateY.set(0);
      }}
    >
      <m.div style={{ rotateX, rotateY, transformPerspective: 1100, willChange: "transform" }}>
        {children}
      </m.div>
    </div>
  );
}

function applyLayerParallax(root: HTMLDivElement | null, x: number, y: number) {
  if (!root) return;
  for (const layer of root.querySelectorAll<HTMLElement>("[data-tilt-depth]")) {
    const depth = Number(layer.dataset.tiltDepth) || 0;
    layer.style.transform = `translate3d(${x * depth * LAYER_TRAVEL_PX}px, ${y * depth * LAYER_TRAVEL_PX}px, 0)`;
  }
}
