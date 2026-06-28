"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { SIGN_IN_URL, SIGN_UP_URL } from "@/lib/marketing";

const NAV_LINKS = [
  { href: "/for-universities", label: "For Universities" },
  { href: "/products", label: "Products" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mobileMenuId = "primary-mobile-menu";

  // Close the mobile menu on Escape — standard disclosure keyboard behavior.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border-gray/80 bg-bg-deep/78 backdrop-blur-xl supports-[backdrop-filter]:bg-bg-deep/68">
      <nav
        aria-label="Primary"
        className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6"
      >
        <Link
          href="/"
          className="group flex w-fit items-center gap-2.5 rounded-lg focus-ring"
          aria-label="EdPilot home"
        >
          <BrandMark
            size={30}
            className="transition-transform duration-200 group-hover:scale-[1.04]"
          />
          <span className="text-sm font-semibold tracking-[-0.01em] text-text-primary">
            EdPilot
          </span>
        </Link>

        <ul className="hidden items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.03] p-1 xl:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors focus-ring ${
                    active
                      ? "bg-white/[0.07] text-text-primary"
                      : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center justify-end gap-3 xl:flex">
          <a
            href={SIGN_IN_URL}
            className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus-ring"
          >
            Sign in
          </a>
          <Button asChild size="sm">
            <a href={SIGN_UP_URL}>Get Started</a>
          </Button>
        </div>

        <button
          type="button"
          className="col-start-3 flex h-11 w-11 items-center justify-center justify-self-end rounded-lg border border-border-gray bg-bg-surface text-text-primary transition-colors hover:border-border-strong focus-ring xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={mobileMenuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {open && (
        <div id={mobileMenuId} className="border-t border-border-gray bg-bg-deep/95 backdrop-blur-xl xl:hidden">
          <ul className="space-y-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-text-secondary hover:bg-bg-elevated hover:text-text-primary focus-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={SIGN_IN_URL}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-text-secondary hover:bg-bg-elevated hover:text-text-primary focus-ring"
              >
                Sign in
              </a>
            </li>
            <li className="pt-2">
              <Button asChild size="sm" className="w-full">
                <a href={SIGN_UP_URL} onClick={() => setOpen(false)}>
                  Get Started
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
