"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.edpilot.com";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#27272A] bg-[#0F0F12]/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6"
      >
        <Link href="/" className="flex items-center gap-2" aria-label="EdPilot home">
          <BrandMark />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm transition-colors ${
                    active ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`${APP_URL}/signin`}
            className="text-sm text-text-secondary hover:text-text-primary"
          >
            Sign in
          </a>
          <a href={`${APP_URL}/register`}>
            <Button size="sm">Get Started</Button>
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-text-primary"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[#27272A] bg-[#0F0F12] md:hidden">
          <ul className="space-y-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-text-secondary hover:text-text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={`${APP_URL}/signin`}
                className="block py-2 text-sm text-text-secondary hover:text-text-primary"
              >
                Sign in
              </a>
            </li>
            <li>
              <a href={`${APP_URL}/register`} className="block pt-2">
                <Button size="sm" className="w-full">
                  Get Started
                </Button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
