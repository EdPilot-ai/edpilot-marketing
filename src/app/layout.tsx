import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { OrganizationSchema, SoftwareApplicationSchema } from "@/components/StructuredData";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "EdPilot", template: "%s · EdPilot" },
  description: "EdPilot — curriculum intelligence for higher education.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://edpilot.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <OrganizationSchema />
        <SoftwareApplicationSchema />
        <Navbar />
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
