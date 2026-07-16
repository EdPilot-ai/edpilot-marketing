import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { OrganizationSchema, SoftwareApplicationSchema } from "@/components/StructuredData";
import "./globals.css";

// Self-hosted via next/font so the design's intended typeface actually loads
// (globals.css referenced "Inter" in --font-sans but nothing ever loaded it,
// so the site silently fell back to system fonts). `variable` feeds the same
// --font-sans token the Tailwind `font-sans` utility already consumes.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Display face for headlines: the same family the product app uses, so the
// marketing site and app.edpilot.ai read as one brand.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const SITE_URL = process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://edpilot.ai";
const SITE_NAME = "EdPilot";
const SITE_TITLE = "EdPilot | The AI teaching assistant your faculty controls";
const SITE_DESCRIPTION =
  "EdPilot helps universities launch AI support grounded in course materials, governed by faculty, and ready for institutional review.";

export const metadata: Metadata = {
  title: { default: SITE_TITLE, template: "%s | EdPilot" },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  keywords: [
    "AI teaching assistant",
    "course-grounded AI",
    "higher education AI",
    "faculty-controlled AI",
    "university AI",
    "FERPA",
    "Canvas LMS",
    "curriculum intelligence",
  ],
  alternates: { canonical: "/" },
  // Tab/app icons are generated as PNGs via the app/icon.tsx and
  // app/apple-icon.tsx file conventions (Next injects the <link> tags
  // automatically). PNG is used instead of the old SVG-only favicon because
  // Safari on macOS does not reliably render SVG favicons.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        {/* Scroll-reveal elements ship with inline opacity:0 in the SSR
            markup and rely on JS to animate in. Without JS (or in no-JS
            renderers), force them visible so content is never hidden. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-lg border border-border-gray bg-bg-surface px-4 py-2 text-sm font-medium text-text-primary focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <OrganizationSchema />
        <SoftwareApplicationSchema />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <MotionProvider>{children}</MotionProvider>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
