"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { SIGN_UP_URL, SUPPORT_EMAIL } from "@/lib/marketing";

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-[#27272A] bg-bg-deep">
      <div className="container mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="group mb-4 inline-flex items-center gap-2.5 rounded-lg focus-ring"
            >
              <BrandMark
                size={30}
                className="group-hover:scale-105 transition-transform duration-150"
              />
              <span className="text-sm font-semibold text-text-primary tracking-[-0.01em]">
                EdPilot
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-6 max-w-[260px]">
              Course-grounded AI infrastructure for universities that want control, clarity, and
              trust.
            </p>
            <a
              href={SIGN_UP_URL}
              className="mt-5 inline-flex items-center gap-2 rounded-md text-xs font-semibold text-accent transition-colors hover:text-[#A78BFA] focus-ring"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Product */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="rounded-md text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products/curriculum-intelligence"
                  className="rounded-md text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  Curriculum Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="rounded-md text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Compare */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
              Compare
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/compare"
                  className="rounded-md text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  All Comparisons
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/chatgpt"
                  className="rounded-md text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  vs. ChatGPT
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/lms-native"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-150 text-xs"
                >
                  vs. LMS AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/blog", label: "Blog" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="flex items-center gap-2 rounded-md text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  <Mail className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  {SUPPORT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#27272A] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9898A3] text-xs">
            &copy; {new Date().getFullYear()} EdPilot. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: "/privacy-policy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/accessibility", label: "Accessibility" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md text-xs text-[#9898A3] transition-colors duration-150 hover:text-text-primary focus-ring"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
