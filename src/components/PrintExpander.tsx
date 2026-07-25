"use client";

import { useEffect } from "react";

/**
 * Print helper for FAQ-style <details> content (T11). Browsers print closed
 * <details> without their content and CSS cannot force them open, so on
 * beforeprint we open every <details> and restore the prior state on
 * afterprint. Mounted once in the root layout.
 */
export function PrintExpander() {
  useEffect(() => {
    const openedForPrint: HTMLDetailsElement[] = [];
    const onBeforePrint = () => {
      document.querySelectorAll("details").forEach((node) => {
        const details = node as HTMLDetailsElement;
        if (!details.open) {
          details.open = true;
          openedForPrint.push(details);
        }
      });
    };
    const onAfterPrint = () => {
      openedForPrint.forEach((details) => {
        details.open = false;
      });
      openedForPrint.length = 0;
    };
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
    };
  }, []);

  return null;
}
