import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock,
  FileCheck2,
  GraduationCap,
  KeyRound,
  Lock,
  Rocket,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { InteractiveLaunchpad, RoleExplorer } from "@/components/marketing/SelfServeExperience";
import {
  CTABand,
  Container,
  FeatureCard,
  GovernedAnswerWalkthrough,
  Hero,
  IconChip,
  PageShell,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/marketing";
import { SIGN_UP_URL } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "How It Works: The Whole Product in Minutes",
  description:
    "Watch one governed answer happen with faculty rules, course-grounded citations, and learning signals. Then see how a university launches EdPilot in days: an admin signs up, EdPilot verifies, and professors teach the same week.",
  keywords:
    "how EdPilot works, EdPilot setup, self-serve university AI, course-grounded AI walkthrough, Canvas integration, FERPA AI teaching assistant",
};

const easeFeatures = [
  {
    icon: Rocket,
    title: "Nothing to install",
    description:
      "EdPilot runs in the browser. Canvas connects with a secure token in seconds, not a six-week IT integration.",
  },
  {
    icon: GraduationCap,
    title: "Professors stay in control",
    description:
      "Every instructor sets their own assistant mode, guardrails, and which materials the AI can use. No central team dictates the classroom.",
  },
  {
    icon: Lock,
    title: "FERPA-safe by default",
    description:
      "Student data stays scoped to each course. Admins approve access, professors govern content, and nothing leaks between classes.",
  },
  {
    icon: Sparkles,
    title: "Free to start",
    description:
      "Spin up a pilot at no cost. Add courses and faculty as adoption grows, with no upfront commitment to find out if it works.",
  },
];

const heroStats = [
  {
    label: "Admin signup",
    value: "~2 min",
    detail: "Request the workspace from an official university email.",
    icon: UserCheck,
  },
  {
    label: "Rollout speed",
    value: "Same week",
    detail: "Invite faculty as soon as the institution is verified.",
    icon: Rocket,
  },
  {
    label: "IT lift",
    value: "Optional",
    detail: "Start with uploads; add Canvas and SSO when the pilot grows.",
    icon: Settings2,
  },
];

const safetyChecks = [
  {
    icon: ShieldCheck,
    label: "Admin approved",
    detail: "Institutions are verified by EdPilot before any workspace goes live.",
  },
  {
    icon: Lock,
    label: "Course-scoped data",
    detail: "Student activity stays inside the course it belongs to, FERPA-aligned by design.",
  },
  {
    icon: Clock,
    label: "Live the same week",
    detail: "Most universities go from sign-up to teaching faculty in days, not a semester.",
  },
];

const safetyPolicies = [
  {
    title: "Workspace access",
    detail: "Your admin approves who joins, so no one self-enrolls into your workspace.",
    icon: KeyRound,
  },
  {
    title: "Faculty controls",
    detail: "Professors decide what the AI can see and how it behaves in their course.",
    icon: GraduationCap,
  },
  {
    title: "Operational control",
    detail: "Add or remove faculty and courses anytime, right from the dashboard.",
    icon: Building2,
  },
];

export default function HowItWorksPage() {
  const breadcrumbItems = [
    { name: "EdPilot", url: "https://edpilot.ai" },
    { name: "How It Works", url: "https://edpilot.ai/how-it-works" },
  ];

  return (
    <PageShell>
      <BreadcrumbSchema items={breadcrumbItems} />

      <Hero
        eyebrow="How it works"
        title="The whole product,"
        accent="understood in minutes."
        description="EdPilot does one thing exceptionally well: it answers students from the professor's own materials, under the professor's own rules, and tells faculty where students are struggling. Watch it happen below."
        actions={[
          { label: "Get Started Free", href: SIGN_UP_URL },
          { label: "Watch a Governed Answer", href: "#governed-answer", variant: "secondary" },
        ]}
      />

      <Section id="governed-answer" className="py-16 md:py-24">
        <Container size="wide">
          <SectionHeader
            eyebrow="Step by step"
            title="What happens when a student asks a question."
            description="This is the entire product in one interaction. Step through the four stages. The same answer is on the right, and each stage highlights the part it controls."
          />
          <Reveal>
            <GovernedAnswerWalkthrough />
          </Reveal>
        </Container>
      </Section>

      <Section id="self-serve-setup" className="py-16 md:py-24" surface="panel">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="surface-gradient-panel overflow-hidden rounded-lg border border-border-gray shadow-2xl">
                <div className="border-b border-border-gray p-6 md:p-7">
                  <p className="section-kicker text-accent">Interactive setup</p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.025em] text-text-primary">
                    Click through the launch path.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">
                    The onboarding flow is deliberately small: request the workspace, get verified,
                    invite faculty, and let professors choose Canvas or direct uploads.
                  </p>
                </div>
                <div className="grid gap-px bg-border-gray">
                  {heroStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="group bg-bg-deep p-4 transition-colors hover:bg-bg-surface"
                    >
                      <div className="flex items-start gap-4">
                        <IconChip icon={stat.icon} className="h-10 w-10" />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <p className="text-sm font-semibold text-text-primary">{stat.label}</p>
                            <p className="text-lg font-semibold tracking-[-0.02em] text-accent">
                              {stat.value}
                            </p>
                          </div>
                          <p className="mt-1 text-xs leading-5 text-text-secondary">
                            {stat.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-border-gray bg-accent/5 px-5 py-4">
                  <span className="text-xs font-medium text-text-secondary">
                    No rollout team required.
                  </span>
                  <ArrowRight className="h-4 w-4 text-accent" aria-hidden="true" />
                </div>
              </div>
            </div>

            <InteractiveLaunchpad />
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionHeader
              eyebrow="Why it's effortless"
              title="Built to set up itself."
              description="EdPilot is designed so a university can adopt it without a rollout team, a budget cycle, or a single line of code."
              align="left"
              className="mb-0"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {easeFeatures.map((feature, index) => (
                <Reveal key={feature.title} delay={index * 0.08}>
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    featured={index === 0}
                    className="h-full"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28" surface="panel">
        <Container size="wide">
          <SectionHeader
            eyebrow="Who does what"
            title="Three lanes. No handoffs."
            description="The same onboarding gives each role exactly what they need and nothing they don't."
          />
          <RoleExplorer />
          <p className="mt-6 text-center text-sm text-text-secondary">
            Need the product view before setup details?{" "}
            <Link
              href="/products"
              className="font-semibold text-accent hover:text-accent-soft focus-ring"
            >
              Explore Products
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container size="wide">
          <div className="overflow-hidden rounded-lg border border-border-gray bg-bg-deep shadow-2xl">
            <div className="grid gap-px bg-border-gray lg:grid-cols-[0.88fr_1.12fr]">
              <div className="surface-gradient-featured p-7 md:p-9">
                <p className="section-kicker text-accent">Safe by design</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.025em] text-text-primary md:text-4xl">
                  Fast to launch, careful with data.
                </h2>
                <p className="mt-5 text-sm leading-7 text-text-secondary md:text-base">
                  Self-serve does not mean a free-for-all. Every institution is verified and every
                  course is walled off before students ever ask a question.
                </p>
                <div className="mt-8 rounded-lg border border-accent/15 bg-accent/5 p-4">
                  <div className="flex items-start gap-3">
                    <FileCheck2
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-6 text-text-primary">
                      Verification, access, and course boundaries are part of setup, not a separate
                      security project.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-px bg-border-gray">
                {safetyChecks.map((item) => (
                  <div key={item.label} className="bg-bg-surface p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <IconChip icon={item.icon} className="h-10 w-10" />
                      <div>
                        <p className="section-kicker text-text-primary">{item.label}</p>
                        <p className="mt-2 text-sm leading-6 text-text-secondary">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-px bg-border-gray md:grid-cols-3">
              {safetyPolicies.map((item) => (
                <div key={item.title} className="bg-bg-deep p-5 md:p-6">
                  <IconChip
                    icon={item.icon}
                    className="mb-4 h-9 w-9 border-border-gray bg-bg-surface"
                  />
                  <h3 className="text-sm font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-text-secondary">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-text-secondary">
            Ready to understand rollout cost?{" "}
            <Link
              href="/pricing"
              className="font-semibold text-accent hover:text-accent-soft focus-ring"
            >
              See Pricing
            </Link>
            . Still comparing approaches?{" "}
            <Link
              href="/compare"
              className="font-semibold text-accent hover:text-accent-soft focus-ring"
            >
              Compare alternatives
            </Link>
            .
          </p>
        </Container>
      </Section>

      <CTABand
        title="Set up your university today."
        description="It takes a couple of minutes to register. Once EdPilot approves your institution, you'll be inviting professors the same day."
        actions={[
          { label: "Get Started Free", href: SIGN_UP_URL },
          { label: "Talk to Our Team", href: "/contact", variant: "secondary" },
        ]}
      />
    </PageShell>
  );
}
