"use client";

import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useFinePointer } from "./useFinePointer";

/**
 * Soft cursor-following radial glow for featured cards (T16). Renders an
 * absolutely-positioned overlay inside the nearest relatively-positioned
 * ancestor and listens to that ancestor's pointer events, so card markup
 * stays server-rendered. The glow rests at opacity 0 — on touch devices and
 * under prefers-reduced-motion it never appears.
 */
export function CursorGlow() {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const ref = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 180, damping: 22, mass: 0.7 };
  const rawGX = useMotionValue(0);
  const rawGY = useMotionValue(0);
  const gx = useSpring(rawGX, spring);
  const gy = useSpring(rawGY, spring);
  const rawOpacity = useMotionValue(0);
  const opacity = useSpring(rawOpacity, { stiffness: 200, damping: 26 });
  const background = useMotionTemplate`radial-gradient(240px circle at ${gx}px ${gy}px, rgb(139 92 246 / 0.12), transparent 70%)`;

  useEffect(() => {
    if (!enabled) return;
    const host = ref.current?.parentElement;
    if (!host) return;

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      rawGX.set(event.clientX - rect.left);
      rawGY.set(event.clientY - rect.top);
    };
    const onEnter = () => rawOpacity.set(1);
    const onLeave = () => rawOpacity.set(0);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, rawGX, rawGY, rawOpacity]);

  if (!enabled) return null;

  return (
    <m.div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ background, opacity }}
    />
  );
}
