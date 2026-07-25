import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Eye,
  GraduationCap,
  Lightbulb,
  Lock,
  Shield,
} from "lucide-react";
import {
  CTABand,
  Container,
  FeatureCard,
  Hero,
  ImagePlaceholder,
  MarketingCard,
  PageShell,
  Reveal,
  Section,
  SectionHeader,
  TrustBar,
} from "@/components/marketing";
import { ParallaxY } from "@/components/motion/ParallaxY";
import { SIGN_UP_URL } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "About: Why we built EdPilot",
  description:
    "EdPilot builds course-grounded AI infrastructure for universities that want control, clarity, and trust. Meet the team and the principles behind faculty-controlled AI.",
  keywords:
    "about EdPilot, EdPilot founders, higher education AI company, faculty-controlled AI mission",
};

const founders = [
  {
    name: "David Laszczkowski",
    title: "Co-Founder",
    // TODO(CONFIRM): replace with David's verified one-line higher-ed background.
    background: "Builds EdPilot's course-grounded AI platform end to end.",
    image: "/founders/david-laszczkowski.jpg",
    linkedin: "https://www.linkedin.com/in/david-laszczkowski-70139a19b/",
  },
  {
    name: "Kelly Wen",
    title: "Co-Founder",
    // TODO(CONFIRM): replace with Kelly's verified one-line higher-ed background.
    background: "Came up through higher education and its AI problem firsthand.",
    image: "/founders/kelly-wen.jpg",
    linkedin: "https://www.linkedin.com/in/drkwen/",
  },
];

type Advisor = { name: string; title: string; background?: string; image?: string };

/**
 * Faculty advisors. Intentionally empty: the section renders nothing while
 * there are none, so no placeholder people appear for advisors who don't exist.
 * TODO(ASSET): add { name, title, background, image? } once advisors are confirmed.
 */
const advisors: Advisor[] = [];

export default function AboutPage() {
  return (
    <PageShell>
      <Hero
        eyebrow="About EdPilot"
        title="The AI should reflect your expertise."
        accent="Not replace it."
        description="EdPilot builds course-specific AI from faculty materials. Instructors define what it knows, how it responds, and where it stops."
      />

      <Section className="py-16" surface="panel">
        <Container size="narrow" className="text-center">
          <SectionHeader
            eyebrow="The challenge"
            title="Students are using AI to study for your exams right now."
            description="Generic AI does not know your syllabus, your framing, or your standards. It gives confident answers that can directly contradict what you taught."
            className="mb-0"
          />
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            eyebrow="How we are different"
            title="Built at the course level."
            description="Most ed-tech AI is institution-wide and curriculum-agnostic. EdPilot starts with the course and the faculty member responsible for it."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Course-bound",
                description:
                  "Each course gets its own AI, trained on its own materials. Nothing bleeds across courses or departments.",
              },
              {
                icon: GraduationCap,
                title: "Faculty-governed",
                description:
                  "Scope, tone, and guardrails are set by the instructor, not by a vendor default.",
              },
              {
                icon: Building2,
                title: "Institutionally designed",
                description:
                  "Built for IT, legal, and compliance teams to approve, not for shadow adoption.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} className="h-full">
                <FeatureCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-20" surface="deep">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="border-l-2 border-accent pl-7">
              <p className="text-xl font-medium leading-9 text-text-primary md:text-2xl">
                AI in education is inevitable. Our mission is to ensure it amplifies the
                professor&apos;s expertise, not replace it.
              </p>
              <p className="section-kicker mt-5 text-accent">Our mission</p>
            </div>
            <Reveal>
              {/* TODO(ASSET): faculty-at-desk / classroom photography. */}
              <ParallaxY amount={22}>
                <ImagePlaceholder
                  alt="Faculty member preparing course materials at a desk in a classroom"
                  label="Faculty at desk"
                  aspect="4/3"
                />
              </ParallaxY>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <SectionHeader eyebrow="Principles" title="How we build" />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: Lock,
                title: "Faculty authority",
                description:
                  "The instructor defines what the AI knows and what it will not touch. Those boundaries are enforced.",
              },
              {
                icon: Shield,
                title: "Integrity by design",
                description:
                  "EdPilot guides students toward understanding. It does not hand over finished work.",
              },
              {
                icon: Lightbulb,
                title: "Learning over convenience",
                description:
                  "If a student wants a fast answer instead of understanding, EdPilot is intentionally less useful.",
              },
              {
                icon: Eye,
                title: "No black boxes",
                description:
                  "We explain what data goes in, how course models work, and where the system has limits.",
              },
            ].map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.06} className="h-full">
                <FeatureCard
                  icon={principle.icon}
                  title={principle.title}
                  description={principle.description}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24" surface="panel">
        <Container>
          <SectionHeader
            eyebrow="The team"
            title="Founded by practitioners."
            description="Two people who came up through higher education and got tired of watching it fumble its own AI problem."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {founders.map((founder, index) => (
              <Reveal key={founder.name} delay={index * 0.08} className="h-full">
                <MarketingCard surface="deep" className="h-full p-8 text-center">
                  <Image
                    src={founder.image}
                    alt={`${founder.name}, ${founder.title}`}
                    width={128}
                    height={128}
                    className="mx-auto mb-5 h-32 w-32 rounded-lg border border-border-gray object-cover"
                  />
                  <h3 className="text-base font-semibold text-text-primary">{founder.name}</h3>
                  <p className="mt-1 text-sm font-medium text-accent">{founder.title}</p>
                  {founder.background && (
                    <p className="mx-auto mt-3 max-w-xs text-[13px] leading-6 text-text-secondary">
                      {founder.background}
                    </p>
                  )}
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-strong px-4 text-sm font-medium text-text-secondary transition-colors hover:border-brand-linkedin hover:bg-brand-linkedin hover:text-white focus-ring"
                  >
                    LinkedIn
                  </a>
                </MarketingCard>
              </Reveal>
            ))}
          </div>

          {advisors.length > 0 && (
            <div className="mt-14">
              <p className="section-kicker mb-6 text-center text-text-tertiary">Faculty advisors</p>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                {advisors.map((advisor, index) => (
                  <Reveal key={advisor.name} delay={index * 0.08} className="h-full">
                    <MarketingCard surface="deep" className="h-full p-6 text-center">
                      {advisor.image && (
                        <Image
                          src={advisor.image}
                          alt={`${advisor.name}, ${advisor.title}`}
                          width={96}
                          height={96}
                          className="mx-auto mb-4 h-24 w-24 rounded-lg border border-border-gray object-cover"
                        />
                      )}
                      <h3 className="text-sm font-semibold text-text-primary">{advisor.name}</h3>
                      <p className="mt-1 text-xs font-medium text-accent">{advisor.title}</p>
                      {advisor.background && (
                        <p className="mx-auto mt-3 max-w-xs text-[13px] leading-6 text-text-secondary">
                          {advisor.background}
                        </p>
                      )}
                    </MarketingCard>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          <TrustBar
            items={[
              {
                label: "FERPA aligned",
                detail:
                  "Student data never trains public models. Course data stays inside your institution.",
              },
              {
                label: "WCAG & ADA",
                detail: "Accessibility is a requirement, not an afterthought.",
              },
              {
                label: "Data isolation",
                detail: "Nothing crosses institution or course boundaries without authorization.",
              },
            ]}
          />
        </Container>
      </Section>

      <CTABand
        title="See what it looks like on your course."
        description="Send us your materials. We will build a live demo and walk through exactly what students would see."
        actions={[
          { label: "Contact Sales", href: "/contact" },
          { label: "Get Started Free", href: SIGN_UP_URL, variant: "secondary" },
        ]}
      />
    </PageShell>
  );
}
