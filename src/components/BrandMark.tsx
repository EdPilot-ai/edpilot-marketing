/**
 * BrandMark: design-system canonical EdPilot logo.
 *
 * A three-facet paper-airplane dart pointing up-right:
 *   • Top wing in violet gradient catching light
 *   • Fuselage keel in deep violet running down the body
 *   • Hairline spine reads as the paper fold
 *
 * Use this everywhere the brand mark appears (Navbar, Footer, auth pages,
 * empty states). Do NOT inline a fresh SVG; it'll drift from the system.
 *
 * The component generates unique gradient IDs per instance so multiple
 * BrandMarks on one page don't collide.
 */

import { useId } from "react";
import { designTokens } from "@/lib/design-tokens";

type Variant = "gradient" | "mono";

export function BrandMark({
  size = 28,
  variant = "gradient",
  className,
}: {
  /** Width in px. Height is derived from the 100×90 viewBox. */
  size?: number;
  /** `gradient` for normal use, `mono` (currentColor) for stamps on tiles. */
  variant?: Variant;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const height = (size * 90) / 100;

  if (variant === "mono") {
    return (
      <svg
        width={size}
        height={height}
        viewBox="0 0 100 90"
        fill="none"
        shapeRendering="geometricPrecision"
        className={className}
        aria-hidden="true"
      >
        <path d="M90 8 L8 36 L48 48 Z" fill="currentColor" strokeLinejoin="round" />
        <path d="M90 8 L48 48 L50 80 Z" fill="currentColor" opacity="0.7" strokeLinejoin="round" />
        <path
          d="M90 8 L48 48 L50 80"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 100 90"
      fill="none"
      shapeRendering="geometricPrecision"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-wing`} x1="10%" y1="15%" x2="85%" y2="75%">
          <stop offset="0%" stopColor={designTokens.brandMarkWingLight} />
          <stop offset="45%" stopColor={designTokens.accent} />
          <stop offset="100%" stopColor={designTokens.accentPress} />
        </linearGradient>
        <linearGradient id={`${id}-fuse`} x1="40%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor={designTokens.brandMarkFuse} />
          <stop offset="100%" stopColor={designTokens.brandMarkFuseDeep} />
        </linearGradient>
      </defs>
      <path d="M90 8 L48 48 L50 80 Z" fill={`url(#${id}-fuse)`} strokeLinejoin="round" />
      <path d="M90 8 L8 36 L48 48 Z" fill={`url(#${id}-wing)`} strokeLinejoin="round" />
      <path
        d="M90 8 L48 48 L50 80"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
