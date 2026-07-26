"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { Container } from "@/components/marketing";
import { SIGN_UP_URL, SUPPORT_EMAIL } from "@/lib/marketing";

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-border-gray bg-bg-deep">
      <Container size="wide" className="py-14">
        {/*
            The 12-column row only holds up once there is room for it. At the
            md breakpoint exactly, eleven gap-10 gutters leave ~21px per column,
            so a `col-span-2` link column is 83px — narrower than the word
            "Accessibility", which overflowed and pushed the whole document to
            790px wide on every page. Twelve columns now start at lg; below
            that the links sit in a plain 2-up grid with room to breathe.
          */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="group mb-4 inline-flex min-h-11 items-center gap-2.5 rounded-lg focus-ring"
            >
              <BrandMark
                size={30}
                className="group-hover:scale-105 transition-transform duration-150"
              />
              <span className="font-display text-sm font-bold text-text-primary tracking-[-0.01em]">
                EdPilot
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-6 max-w-[280px]">
              The AI teaching assistant your faculty controls. Grounded in course materials,
              governed by professors, built for universities.
            </p>
            <a
              href={SIGN_UP_URL}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-accent transition-colors hover:text-accent-soft focus-ring"
            >
              Plan a university pilot
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Product */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[11px] font-medium tracking-[0.02em] text-text-primary">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/for-universities"
                  className="inline-flex min-h-11 items-center rounded-md text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  For Universities
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="inline-flex min-h-11 items-center rounded-md text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products/curriculum-intelligence"
                  className="inline-flex min-h-11 items-center rounded-md text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  Curriculum Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="inline-flex min-h-11 items-center rounded-md text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="inline-flex min-h-11 items-center rounded-md text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Compare */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[11px] font-medium tracking-[0.02em] text-text-primary">
              Compare
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/compare"
                  className="inline-flex min-h-11 items-center rounded-md text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  All Comparisons
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/chatgpt"
                  className="inline-flex min-h-11 items-center rounded-md text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  vs. ChatGPT
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/lms-native"
                  className="inline-flex min-h-11 items-center rounded-md text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  vs. LMS AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[11px] font-medium tracking-[0.02em] text-text-primary">
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
                    className="inline-flex min-h-11 items-center rounded-md text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[11px] font-medium tracking-[0.02em] text-text-primary">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center rounded-md text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  Book a demo
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="flex min-h-11 items-center gap-2 rounded-md text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                >
                  <Mail className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  {SUPPORT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border-gray pt-6 md:flex-row">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} EdPilot. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            {[
              { href: "/privacy-policy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/accessibility", label: "Accessibility" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-md text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
