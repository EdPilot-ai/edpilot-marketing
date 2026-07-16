import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact: Book a demo or start a pilot",
  description:
    "Talk to EdPilot about a university demo, a university-led pilot, or security and procurement questions. We respond to faculty, administrators, and IT teams.",
  keywords:
    "contact EdPilot, book university demo, plan university pilot, EdPilot security procurement, higher education AI demo",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
