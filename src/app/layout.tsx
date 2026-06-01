import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { OrganizationSchema, SoftwareApplicationSchema } from "@/components/StructuredData";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://edpilot.ai";
const SITE_NAME = "EdPilot";
const SITE_TITLE = "EdPilot — Faculty-controlled AI teaching assistants";
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
    <html lang="en">
      <body>
        <OrganizationSchema />
        <SoftwareApplicationSchema />
        <Navbar />
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
