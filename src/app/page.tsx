import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  Database,
  Eye,
  EyeOff,
  FileText,
  Globe,
  Lock,
  MessageSquare,
  Puzzle,
  RefreshCw,
  Shield,
  ShieldOff,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AdminPreview,
  CTABand,
  CheckList,
  Container,
  CourseAssistantMockup,
  FAQList,
  FeatureCard,
  GovernanceContrastPreview,
  Hero,
  PageShell,
  ProfessorPreview,
  ProofPanel,
  Reveal,
  RoleValueGrid,
  Section,
  SectionEyebrow,
  SectionHeader,
  StatBand,
  StudentPreview,
  Testimonials,
  TextLink,
  WorkflowSteps,
} from "@/components/marketing";
import { evidenceStats, productFacts, testimonials } from "@/lib/social-proof";
import { ContainerScroll } from "@/components/motion/ContainerScroll";
import { MockupTilt } from "@/components/motion/MockupTilt";
import { ParallaxY } from "@/components/motion/ParallaxY";
import { SIGN_UP_URL } from "@/lib/marketing";

const HOMEPAGE_FAQS = [
  {
    question: "How is EdPilot different from ChatGPT?",
    answer: (
      <>
        ChatGPT answers from the open internet and follows its own rules. EdPilot answers only from
        the materials a professor uploads, cites those sources, and follows the guardrails the
        professor sets, including refusing to complete graded work.{" "}
        <Link href="/compare/chatgpt" className="font-semibold text-accent hover:text-accent-soft">
          See the full comparison
        </Link>
        .
      </>
    ),
  },
  {
    question: "Do professors control what the AI can and can't do?",
    answer:
      "Yes. Instructors set the knowledge boundary (course materials only, or course-plus-context), the citation policy, how the assistant handles assessment questions, and its tone. The AI works for the professor, not around them.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Registering a university takes about two minutes, and professors can be teaching with EdPilot the same week. There is no IT integration project. Upload materials, set the rules, and share the class link.",
  },
  {
    question: "What does it cost to try?",
    answer: (
      <>
        Universities can evaluate EdPilot in real courses before committing to a broader rollout.
        Institutional pricing scales with campus size, so a focused pilot never carries enterprise
        pricing.{" "}
        <Link href="/pricing" className="font-semibold text-accent hover:text-accent-soft">
          See pricing
        </Link>
        .
      </>
    ),
  },
  {
    question: "How is student data handled?",
    answer: (
      <>
        Course materials and student interactions are scoped to your institution and course, and
        student records are never used to train public models.{" "}
        <Link href="/for-universities" className="font-semibold text-accent hover:text-accent-soft">
          Read the answers we prepare for IT, legal, and procurement
        </Link>
        .
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <Hero
        eyebrow="AI built for higher education"
        title="The AI teaching assistant"
        accent="your faculty controls."
        scrambleAccent
        description="EdPilot grounds every answer in your actual course materials, inside guardrails professors set. Students get a tutor that knows the class. Universities get AI adoption on their terms."
        actions={[
          { label: "Plan a University Pilot", href: SIGN_UP_URL },
          {
            label: "Prefer a walkthrough first? Book a demo",
            href: "/contact",
            variant: "link",
          },
        ]}
        note="University-led evaluation · Set up in minutes · No IT project required"
      >
        {/* The mockup is the hero's credibility: a governed, cited answer a
            professor would recognize. The old TrustStrip of unsourced posture
            pills is gone — every claim it made is proven by a real module
            further down (FERPA/security panel, integrations, citations). */}
        {/* Replaces the plain vertical parallax: both were scroll-driven, and
            stacking two would just fight over the same Y. */}
        <ContainerScroll className="mt-14">
          <MockupTilt>
            <CourseAssistantMockup annotated />
          </MockupTilt>
        </ContainerScroll>
      </Hero>

      <Section className="py-16 md:py-24" surface="panel">
        <Container>
          <SectionHeader
            eyebrow="The problem"
            title="Students are already using AI on your courses."
            description="Right now that happens through generic chatbots: outside your policies, outside your visibility, and often wrong about your class. The real question is whether your institution has any say in how."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: ShieldOff,
                title: "Ungoverned",
                detail:
                  "Generic chatbots follow their own rules, not your syllabus, your honor code, or your assessment policy.",
              },
              {
                icon: EyeOff,
                title: "Invisible",
                detail:
                  "Faculty get no signal about what students ask, where they struggle, or how AI is shaping their learning.",
              },
              {
                icon: MessageSquare,
                title: "Unaccountable",
                detail:
                  "Answers come from the open internet with no citations, confidently wrong about your course and impossible to check.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <FeatureCard icon={item.icon} title={item.title} description={item.detail} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <StatBand items={evidenceStats} className="mt-12" />
          </Reveal>
        </Container>
      </Section>

      {/* Split imagery band (T8): the P0 evidence line carries into a
          text-left / image-right layout so no more than two consecutive
          sections share the centered-header skeleton. */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <Reveal>
              <div>
                <SectionEyebrow className="mb-5">The stakes</SectionEyebrow>
                <p className="font-display text-[1.65rem] font-medium leading-[1.3] tracking-[-0.02em] text-text-primary md:text-[2rem]">
                  The question is no longer whether students use AI on your courses. It&apos;s
                  whether the institution can see it, shape it, and answer for it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              {/* Was a placeholder block standing in for lecture-hall
                  photography. The section's claim is about governance, so it
                  argues the point instead: the same question, ungoverned and
                  grounded. */}
              <ParallaxY amount={22}>
                <GovernanceContrastPreview />
              </ParallaxY>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            eyebrow="How it works"
            title="From syllabus to student support in an afternoon."
            description="No IT project, no migration. A professor uploads materials, sets the rules, and shares a link. The course model does the rest."
          />
          <WorkflowSteps
            steps={[
              {
                icon: Upload,
                step: "01",
                title: "Upload course materials",
                description:
                  "Syllabi, lectures, readings, rubrics, policies, and assignments become the source of truth.",
              },
              {
                icon: Shield,
                step: "02",
                title: "Configure guardrails",
                description:
                  "Faculty choose citation rules, assessment boundaries, tone, and what the assistant can answer.",
              },
              {
                icon: MessageSquare,
                step: "03",
                title: "Students ask safely",
                description:
                  "The assistant gives grounded explanations, practice prompts, and hints without completing work.",
              },
              {
                icon: BarChart3,
                step: "04",
                title: "Faculty see patterns",
                description:
                  "Confusion, misuse attempts, and concept gaps become visible before the next assessment.",
              },
            ]}
          />
          <Reveal>
            <StatBand items={productFacts} className="mt-12" />
          </Reveal>
          <Reveal className="mt-8 text-center">
            <TextLink href="/how-it-works">
              Step through a real governed answer
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </TextLink>
          </Reveal>
        </Container>
      </Section>

      <Section className="py-16 md:py-24" surface="light">
        <Container>
          <SectionHeader
            eyebrow="Built for the institution"
            title="One campus decision. Three clear experiences."
            description="The university owns the evaluation. Each role gets a focused experience inside the same governed academic boundary."
          />
          <RoleValueGrid
            items={[
              {
                icon: Building2,
                role: "Administrators",
                promise: "A governed path for campus AI adoption.",
                detail:
                  "Pilot course-grounded AI with privacy posture, rollout controls, and faculty ownership built into the experience.",
                preview: <AdminPreview />,
              },
              {
                icon: BookOpen,
                role: "Professors",
                promise: "Fewer repetitive questions, more useful signals.",
                detail:
                  "Set the knowledge boundary, review source-backed answers, and see where students are struggling before office hours fill up.",
                preview: <ProfessorPreview />,
              },
              {
                icon: Sparkles,
                role: "Students",
                promise: "24/7 help that speaks the language of the class.",
                detail:
                  "Get explanations, practice prompts, and citations from the actual syllabus, slides, readings, and rubrics.",
                preview: <StudentPreview />,
              },
            ]}
          />
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Why EdPilot"
                title="Built for higher education, not generic chat."
                description="Other AI tools are built for everyone. EdPilot is scoped to a course, governed by faculty, and designed for institutional review."
                className="mb-6"
              />
              <TextLink href="/compare">
                Compare EdPilot to the alternatives
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </TextLink>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal>
                <FeatureCard
                  featured
                  icon={BookOpen}
                  title="Course-specific by default"
                  description="Every answer is grounded in uploaded course materials, not a generic web-scale guess."
                  className="h-full"
                />
              </Reveal>
              <Reveal delay={0.08}>
                <FeatureCard
                  icon={Eye}
                  title="Faculty-controlled"
                  description="Instructors define what the AI knows, how it responds, and where it stops."
                  className="h-full"
                />
              </Reveal>
              <Reveal delay={0.12}>
                <FeatureCard
                  icon={Shield}
                  title="Integrity-first"
                  description="Designed to guide students toward understanding instead of completing assessed work."
                  className="h-full"
                />
              </Reveal>
              <Reveal delay={0.16}>
                <FeatureCard
                  icon={BarChart3}
                  title="Insight-rich"
                  description="Show where students are confused before confusion becomes an exam result."
                  className="h-full"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24" surface="panel">
        <Container>
          <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            <SectionHeader
              align="left"
              eyebrow="Featured product"
              title="AI Teaching Assistant"
              description="A teaching assistant that answers student questions at 2am using your materials, your terminology, and your standards."
              className="mb-0"
            />
            <Reveal>
              <div className="shadow-card rounded-xl border border-border-gray bg-bg-deep p-6 md:p-8">
                <CheckList
                  items={[
                    "Cites your readings instead of random internet sources.",
                    "Flags misconceptions before they reach the exam.",
                    "Follows the guardrails and knowledge boundary you set.",
                    "Separates fast pilots from responsible institutional rollout.",
                  ]}
                />
                <Button asChild variant="outline" className="mt-7">
                  <Link href="/products/curriculum-intelligence">
                    Explore Curriculum Intelligence
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            eyebrow="Integrations"
            title="Meets your campus where it already works."
            description="EdPilot runs in the browser and connects to the tools your courses already live in, starting with Canvas."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: RefreshCw,
                title: "Canvas LMS",
                detail:
                  "Sync courses, rosters, assignments, and due dates directly from Canvas, so the assistant knows what's due and when.",
                status: "live" as const,
              },
              {
                icon: Globe,
                title: "Works with or without an LMS",
                detail:
                  "Fully browser-based. No installation, no plugin approval, no migration. Professors share a link and students are in.",
                status: "live" as const,
              },
              {
                icon: Puzzle,
                title: "LTI 1.3 embedding",
                detail:
                  "Deeper embedding inside Canvas, Moodle, and Blackboard through the LTI standard is on the roadmap.",
                status: "planned" as const,
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <FeatureCard
                  icon={item.icon}
                  title={item.title}
                  description={item.detail}
                  className="h-full"
                >
                  <div className="mt-4 pl-[3.125rem]">
                    <span
                      className={
                        item.status === "live"
                          ? "inline-flex items-center gap-1.5 rounded-md border border-status-success/20 bg-status-success/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-status-success-soft"
                          : "inline-flex items-center gap-1.5 rounded-md border border-border-gray bg-bg-deep px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary"
                      }
                    >
                      {item.status === "live" ? "Live" : "Planned"}
                    </span>
                  </div>
                </FeatureCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24" surface="panel">
        <Container>
          <SectionHeader
            eyebrow="Security & privacy"
            title="Prepared for the questions buyers actually ask."
            description="EdPilot makes the academic, privacy, and implementation posture visible before a pilot turns into a procurement surprise."
          />
          {/* The one place the homepage makes posture claims. This panel
              absorbed the old ProcurementBadges pill row — encryption, WCAG,
              and SOC 2 status now live in the tiles — so FERPA is stated
              exactly once on this page and legal still has a single data
              source to review (the copy below mirrors lib/social-proof.ts). */}
          <Reveal>
            <ProofPanel
              items={[
                {
                  icon: Lock,
                  label: "FERPA & student data",
                  detail:
                    "Handling built around institution-bound course and student data. Student records never train public models.",
                },
                {
                  icon: Database,
                  label: "Data boundaries",
                  detail:
                    "Course materials, interactions, and deployments are scoped by institution and course, encrypted in transit and at rest.",
                },
                {
                  icon: FileText,
                  label: "Compliance status",
                  detail:
                    "SOC 2 Type II audit in progress. Procurement-ready notes cover data handling, LMS status, retention, and rollout.",
                },
                {
                  icon: CheckCircle2,
                  label: "WCAG 2.2 AA accessibility",
                  detail:
                    "Interaction patterns and content flows are designed and reviewed against WCAG 2.2 AA.",
                },
                {
                  icon: Users,
                  label: "Faculty ownership",
                  detail:
                    "Course control stays with the instructor instead of moving into a generic AI layer.",
                },
                {
                  icon: Shield,
                  label: "Integrity controls",
                  detail:
                    "Assessment and homework requests can be routed toward hints, practice, or refusal states.",
                },
              ]}
            />
          </Reveal>
          <Reveal className="mt-8 text-center">
            <TextLink href="/for-universities">
              See the answers we prepare for IT, legal, and procurement
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </TextLink>
          </Reveal>
        </Container>
      </Section>

      {testimonials.length > 0 && (
        <Section className="py-16 md:py-24">
          <Container>
            {/* Left-aligned header breaks what would otherwise be a run of
                three consecutive centered-header sections (T9). */}
            <SectionHeader
              align="left"
              eyebrow="What educators say"
              title="Trusted in real classrooms."
            />
            <Testimonials quotes={testimonials} />
          </Container>
        </Section>
      )}

      <Section className="py-16 md:py-24">
        <Container size="narrow">
          <SectionHeader eyebrow="Questions" title="What people ask before they pilot." />
          <Reveal>
            <FAQList items={HOMEPAGE_FAQS} />
          </Reveal>
          <Reveal className="mt-8 text-center">
            <TextLink href="/faq">
              See all questions
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </TextLink>
          </Reveal>
        </Container>
      </Section>

      {/* The closing band restates the page's single primary action and
          nothing else — the walkthrough alternative already had its moment
          in the hero, and a decisive close converts better than a hedged one. */}
      <CTABand
        surface="navy"
        title="See EdPilot on your course materials."
        description="Plan a university-led pilot with real syllabus content. Set up in minutes, evaluated on your terms."
        actions={[{ label: "Plan a University Pilot", href: SIGN_UP_URL }]}
      />
    </PageShell>
  );
}
