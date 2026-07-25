import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import {
  Badge,
  CTABand,
  Container,
  Hero,
  MarketingCard,
  PageShell,
  ProcurementBadges,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/marketing";
import { procurementBadges } from "@/lib/social-proof";
import { SIGN_UP_URL } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Pricing: University pilots and institutional rollout",
  description:
    "EdPilot pricing is built for university adoption: begin with a scoped pilot, then scale courses and faculty as value is proven.",
  keywords:
    "EdPilot pricing, higher education AI pricing, university AI cost, university pilot, institutional AI pricing",
};

type Tier = {
  name: string;
  price: string;
  cadence?: string;
  audience: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "University Pilot",
    price: "No-cost",
    cadence: "evaluation",
    audience: "For a scoped campus cohort",
    description:
      "Put EdPilot into real courses with university ownership, faculty controls, and a clear success plan before a broader commitment.",
    features: [
      "Real course materials and faculty controls",
      "A shared evaluation plan for academic and IT teams",
      "Student learning signals and answer-level citations",
      "No long-term commitment while you evaluate fit",
    ],
    cta: { label: "Plan a University Pilot", href: SIGN_UP_URL },
    featured: true,
  },
  {
    name: "Campus Rollout",
    price: "Custom",
    cadence: "scaled to your size",
    audience: "For departments and universities",
    description:
      "Roll out across courses with admin controls, governance, and the procurement support your institution needs.",
    features: [
      "Admin dashboard & adoption visibility",
      "Institution-wide governance & data boundaries",
      "SSO and deeper LMS integration (roadmap)",
      "Security, accessibility & procurement support",
    ],
    cta: { label: "Talk to Our Team", href: "/contact" },
  },
];

export default function PricingPage() {
  const breadcrumbItems = [
    { name: "EdPilot", url: "https://edpilot.ai" },
    { name: "Pricing", url: "https://edpilot.ai/pricing" },
  ];

  return (
    <PageShell>
      <BreadcrumbSchema items={breadcrumbItems} />

      <Hero
        eyebrow="Pricing"
        title="Pricing that meets your campus"
        accent="where it is."
        description="Every university engagement starts with a scoped evaluation. Once value is proven, pricing scales with the courses, faculty, and governance your campus needs."
        actions={[
          { label: "Plan a University Pilot", href: SIGN_UP_URL },
          { label: "Explore the Product", href: "/products", variant: "secondary" },
        ]}
        className="pb-12 md:pb-16"
      />

      <Section className="py-16 md:py-20">
        <Container size="wide">
          <Reveal className="mb-10">
            <ProcurementBadges badges={procurementBadges} />
          </Reveal>
          <div className="mx-auto grid max-w-4xl items-stretch gap-4 md:grid-cols-2">
            {tiers.map((tier, index) => (
              <Reveal key={tier.name} delay={index * 0.08} className="h-full">
                <MarketingCard featured={tier.featured} className="flex h-full flex-col p-6 md:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-medium tracking-[0.01em] text-accent">
                      {tier.name}
                    </h2>
                    {tier.featured && <Badge className="border-accent/20">Most popular</Badge>}
                  </div>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-4xl font-semibold tracking-[-0.03em] text-text-primary">
                      {tier.price}
                    </span>
                    {tier.cadence && (
                      <span className="text-sm text-text-tertiary">{tier.cadence}</span>
                    )}
                  </div>
                  <p className="section-kicker mt-2 text-text-tertiary">{tier.audience}</p>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">{tier.description}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-sm leading-6 text-text-secondary"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={tier.featured ? "default" : "outline"}
                    className="mt-7 w-full"
                  >
                    <Link href={tier.cta.href}>
                      {tier.cta.label}
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </MarketingCard>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-7 text-text-secondary">
            Institutional pricing scales with the number of courses and faculty. Start with a
            university-owned pilot and grow as adoption does. We’ll put real numbers in front of you
            once we understand your scope; there’s no upfront commitment to evaluate EdPilot.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-7 text-text-secondary">
            Need to see what is included first?{" "}
            <Link
              href="/products"
              className="font-semibold text-accent hover:text-accent-soft focus-ring"
            >
              Explore Products
            </Link>
            . Need the rollout sequence?{" "}
            <Link
              href="/how-it-works"
              className="font-semibold text-accent hover:text-accent-soft focus-ring"
            >
              See How It Works
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section className="py-16 md:py-24" surface="panel">
        <Container>
          <SectionHeader
            eyebrow="How institutional pricing works"
            title="No surprises, no shelfware."
            description="You only scale up once a pilot proves the value. Pricing follows real adoption, meaning courses and faculty actually using the assistant, not a seat count you have to predict in advance."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Align the pilot",
                detail:
                  "Choose the courses, faculty, and evaluation criteria with the people who own the campus decision.",
              },
              {
                step: "02",
                title: "Scope the rollout",
                detail:
                  "We size pricing to your courses, faculty, and the controls your institution needs.",
              },
              {
                step: "03",
                title: "Grow as adoption grows",
                detail:
                  "Add departments and courses over time, so you’re never paying ahead of usage.",
              },
            ].map((item, index) => (
              <Reveal key={item.step} delay={index * 0.08} className="h-full">
                <MarketingCard surface="deep" className="h-full p-5 md:p-6">
                  <span className="text-xs font-bold text-text-tertiary">{item.step}</span>
                  <h3 className="mt-4 text-sm font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-text-secondary">{item.detail}</p>
                </MarketingCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-text-secondary">
            If your team is comparing EdPilot with general AI, LMS-native AI, or a custom build,{" "}
            <Link
              href="/compare"
              className="font-semibold text-accent hover:text-accent-soft focus-ring"
            >
              review the comparisons
            </Link>
            .
          </p>
        </Container>
      </Section>

      <CTABand
        title="Find out what EdPilot would cost your campus."
        description="Plan a university pilot with real course materials, or talk to our team about an institutional rollout and we’ll scope pricing to your scale."
        actions={[
          { label: "Plan a University Pilot", href: SIGN_UP_URL },
          { label: "Talk to Our Team", href: "/contact", variant: "secondary" },
        ]}
      />
    </PageShell>
  );
}
