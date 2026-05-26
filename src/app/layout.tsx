import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { OrganizationSchema, SoftwareApplicationSchema } from "@/components/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "EdPilot", template: "%s | EdPilot" },
  description: "EdPilot: curriculum intelligence for higher education.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://edpilot.com"),
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
