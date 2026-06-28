"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { Container } from "@/components/marketing";
import { SIGN_UP_URL, SUPPORT_EMAIL } from "@/lib/marketing";

const FOOTER_SECTIONS = [
  {
    title: "For Universities",
    links: [
      { href: "/for-universities", label: "Governed AI" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "/products", label: "Product Suite" },
      { href: "/products/curriculum-intelligence", label: "Curriculum Intelligence" },
      {
        href: "/products/curriculum-intelligence#ai-teaching-assistant",
        label: "AI Teaching Assistant",
      },
      { href: "/products#roadmap", label: "Roadmap" },
    ],
  },
  {
    title: "Compare",
    links: [
      { href: "/compare/chatgpt", label: "ChatGPT" },
      { href: "/compare/tutoring-platforms", label: "Tutoring Platforms" },
      { href: "/compare/lms-native", label: "LMS-Native AI" },
      { href: "/compare/custom-solutions", label: "Custom Solutions" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
      { href: "/resources/positioning-language", label: "Positioning Language" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
]

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
]

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-border-gray bg-bg-deep">
      <Container size="wide" className="py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-3">
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
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-4 flex min-h-11 items-center gap-2 rounded-md text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
            >
              <Mail className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              {SUPPORT_EMAIL}
            </a>
            <a
              href={SIGN_UP_URL}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md text-xs font-semibold text-accent transition-colors hover:text-accent-soft focus-ring"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="md:col-span-2 last:md:col-span-1">
              <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center rounded-md text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border-gray pt-6 md:flex-row">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} EdPilot. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-md text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary focus-ring"
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
