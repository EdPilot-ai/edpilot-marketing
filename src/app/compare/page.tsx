import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  GraduationCap,
  Layers,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { BreadcrumbSchema } from "@/components/StructuredData";
import type { Metadata } from "next";
import {
  CTABand,
  ComparisonMatrix,
  Container,
  FeatureCard,
  Hero,
  IconChip,
  PageShell,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "EdPilot Comparisons - How We Compare to Alternatives",
  description:
    "See how EdPilot compares to ChatGPT, tutoring platforms, LMS-native AI, and custom in-house builds — capability by capability, for students, faculty, and institutions.",
  keywords:
    "EdPilot vs ChatGPT, instructor-controlled AI comparison, course-grounded AI, educational AI",
};

const comparisons = [
  {
    slug: "chatgpt",
    title: "EdPilot vs. ChatGPT",
    subtitle: "Purpose-built university AI vs. general-purpose chat",
    description:
      "When a student asks at midnight, does the answer know your course or just sound confident?",
    icon: Bot,
    signal: "Course-grounded answers",
  },
  {
    slug: "tutoring-platforms",
    title: "EdPilot vs. Tutoring Platforms",
    subtitle: "Institutional oversight vs. student-directed support",
    description: "Tutoring can help. Invisible tutoring that ignores your syllabus? Less charming.",
    icon: GraduationCap,
    signal: "Faculty-governed support",
  },
  {
    slug: "lms-native",
    title: "EdPilot vs. LMS-Native AI",
    subtitle: "Vendor-independent AI vs. built-in LMS alternatives",
    description: "Your AI strategy should not wait politely for an LMS roadmap update.",
    icon: Layers,
    signal: "Vendor-independent rollout",
  },
  {
    slug: "custom-solutions",
    title: "EdPilot vs. Custom In-House Builds",
    subtitle: "Deployable platform vs. build-from-scratch infrastructure",
    description:
      "A prototype is easy. Governance, citations, audits, and support are the fun part.",
    icon: Wrench,
    signal: "Governance without rebuilds",
  },
];

export default function ComparePage() {
  const breadcrumbItems = [
    { name: "EdPilot", url: "https://edpilot.ai" },
    { name: "Compare", url: "https://edpilot.ai/compare" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <PageShell>
        <Hero
          eyebrow="Compare"
          title="Pick the AI that knows"
          accent="the assignment."
          description="Every alternative can answer questions. Only one is grounded in your courses, governed by your faculty, and accountable to your institution. Here's the whole market on one table."
        />

        <Section className="pb-20 pt-4 md:pb-28">
          <Container size="wide">
            <SectionHeader
              eyebrow="The decision matrix"
              title="Nine capabilities. Five options. One honest table."
              description="We marked the alternatives fairly — including the rows they win. Click any capability to see why it matters and what each option actually does."
            />
            <Reveal>
              <ComparisonMatrix />
            </Reveal>
            <p className="mt-6 text-center text-sm text-text-secondary">
              Weighing a build-vs-buy decision or a specific vendor? The deep dives below go
              comparison by comparison.
            </p>
          </Container>
        </Section>

        <Section className="py-20 md:py-28" surface="panel">
          <Container size="wide">
            <SectionHeader
              eyebrow="Deep dives"
              title="The full case, alternative by alternative."
              description="Each deep dive covers the real scenarios — exam week, rubric changes, procurement review — where the differences stop being theoretical."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {comparisons.map((comparison, index) => {
                const Icon = comparison.icon;

                return (
                  <Reveal key={comparison.slug} delay={index * 0.06} className="h-full">
                    <Link href={`/compare/${comparison.slug}`} className="group block h-full">
                      <div className="surface-gradient relative h-full overflow-hidden rounded-lg border border-border-gray p-5 shadow-lg transition duration-200 hover:-translate-y-px hover:border-accent/25 hover:shadow-2xl md:p-6">
                        <div
                          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent opacity-0 transition group-hover:opacity-100"
                          aria-hidden="true"
                        />
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <IconChip icon={Icon} className="h-11 w-11 [&_svg]:h-5 [&_svg]:w-5" />
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                                Deep dive {String(index + 1).padStart(2, "0")}
                              </p>
                              <h2 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.02em] text-text-primary">
                                {comparison.title}
                              </h2>
                            </div>
                          </div>
                          <ArrowRight
                            className="mt-1 h-4 w-4 shrink-0 text-text-tertiary transition duration-200 group-hover:translate-x-1 group-hover:text-accent"
                            aria-hidden="true"
                          />
                        </div>

                        <p className="mt-5 text-sm leading-7 text-text-secondary">
                          {comparison.description}
                        </p>

                        <div className="mt-6 flex items-center justify-between gap-3 border-t border-border-gray pt-5">
                          <div>
                            <p className="text-sm font-semibold text-text-primary">
                              {comparison.signal}
                            </p>
                            <p className="mt-1 text-[13px] leading-6 text-text-secondary">
                              {comparison.subtitle}
                            </p>
                          </div>
                          <span className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border-gray bg-bg-deep px-3 py-2 text-sm font-semibold text-accent transition group-hover:border-accent/25 group-hover:bg-bg-surface">
                            Read
                            <ArrowRight
                              className="h-4 w-4 transition-transform group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </Section>

        <Section className="py-20 md:py-28">
          <Container>
            <SectionHeader
              eyebrow="The short version"
              title="EdPilot wins when stakes are real."
              description="The moment a student, professor, or IT team asks a practical question, generic AI starts leaking context. EdPilot was built for those moments."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: GraduationCap,
                  title: "Student asks before the exam",
                  description:
                    "Generic AI gives a polished guess. EdPilot answers from Week 4 slides and points back to the exact source.",
                },
                {
                  icon: Bot,
                  title: "Professor changes the rubric",
                  description:
                    "A chatbot shrugs. EdPilot updates the course model so support follows the new standard.",
                },
                {
                  icon: ShieldCheck,
                  title: "IT asks who owns the data",
                  description:
                    "EdPilot has the grown-up answer: institution-bound data, governance, and clear boundaries.",
                },
                {
                  icon: Building2,
                  title: "The dean asks if this scales",
                  description:
                    "One-off tools multiply risk. EdPilot gives departments a repeatable way to deploy course-aware AI.",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06} className="h-full">
                  <FeatureCard
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    className="h-full"
                  />
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-text-secondary">
              Want the product tour before you book time?{" "}
              <Link
                href="/how-it-works"
                className="font-semibold text-accent hover:text-accent-soft focus-ring"
              >
                See how it works
              </Link>
              . Already planning scope?{" "}
              <Link
                href="/pricing"
                className="font-semibold text-accent hover:text-accent-soft focus-ring"
              >
                See Pricing
              </Link>
              .
            </p>
          </Container>
        </Section>

        <CTABand
          title="Ready to see EdPilot in action?"
          description="Schedule a demo and see how course-grounded AI changes the support layer for your institution."
          actions={[{ label: "Schedule a Demo", href: "/contact" }]}
        />
      </PageShell>
    </>
  );
}
