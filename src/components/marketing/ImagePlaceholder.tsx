import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Imagery slot for the marketing pages (T8). Real photography does not exist
 * yet, so the slot renders a tasteful gradient block at the FINAL aspect
 * ratio — the layout is stable today and swapping in the real asset later is
 * a one-line `src` change with zero CLS.
 *
 * TODO(ASSET): replace each usage's placeholder with licensed photography
 * (see the `label`/`alt` at the call site for the intended subject), then
 * pass `src` here. Everything is already wired for next/image: lazy below
 * the fold, `sizes` hint required, descriptive alt — never "image of ...".
 */
export function ImagePlaceholder({
  src,
  alt,
  label,
  aspect = "4/3",
  sizes = "(min-width: 768px) 50vw, 100vw",
  className,
}: {
  /** When provided, renders a real next/image instead of the placeholder block. */
  src?: string;
  /** Descriptive alt text (also the accessible name of the placeholder block). */
  alt: string;
  /** Short caption shown inside the placeholder so reviewers know the intended subject. */
  label?: string;
  /** CSS aspect-ratio, e.g. "4/3" or "16/9". */
  aspect?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "image-placeholder relative overflow-hidden rounded-xl border border-border-gray",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} loading="lazy" className="object-cover" />
      ) : (
        <div role="img" aria-label={alt} className="absolute inset-0 flex items-end p-4">
          {label && (
            <span className="section-kicker rounded-md border border-border-gray bg-bg-deep px-2.5 py-1.5 text-text-tertiary">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
