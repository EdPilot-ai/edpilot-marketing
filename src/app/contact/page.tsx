"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  ChevronDown,
  CheckCircle,
  HelpCircle,
  Loader2,
  Mail,
  MessageSquare,
  Rocket,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendContactMessage } from "./actions";
import {
  Container,
  Hero,
  IconChip,
  MarketingCard,
  PageShell,
  ProofPanel,
  Section,
  SectionHeader,
} from "@/components/marketing";
import { SUPPORT_EMAIL } from "@/lib/marketing";
import {
  INTENT_OPTIONS as intentOptions,
  LMS_OPTIONS as lmsOptions,
  ROLE_OPTIONS as roleOptions,
  TIMELINE_OPTIONS as timelineOptions,
  CONTACT_FIELD_LIMITS,
  type ContactSelectOption as SelectOption,
} from "@/lib/contact-options";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  intent: "book-demo",
  institution: "",
  department: "",
  lms: "",
  timeline: "",
  courseCount: "",
  message: "",
  company: "", // honeypot: stays empty for humans
};

function CustomSelect({
  id,
  label,
  value,
  options,
  placeholder,
  required,
  invalid,
  errorMessage,
  open,
  onOpenChange,
  onValueChange,
}: {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  placeholder: string;
  required?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onValueChange: (value: string) => void;
}) {
  const selected = options.find((option) => option.value === value);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxId = `${id}-listbox`;
  const errorId = `${id}-error`;

  // When the listbox opens, start keyboard navigation from the selected
  // option. Synced during render (React's "adjust state on prop change"
  // pattern) instead of an effect so the first open paints correctly.
  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (open) {
      const selectedIndex = options.findIndex((option) => option.value === value);
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    } else {
      setActiveIndex(-1);
    }
  }

  // Close on outside click. (Escape/Tab are handled on the trigger, which keeps
  // focus in the select-only combobox pattern.)
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open, onOpenChange]);

  // Keep the active option scrolled into view while arrow-navigating.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const selectIndex = (index: number) => {
    const option = options[index];
    if (!option) return;
    onValueChange(option.value);
    onOpenChange(false);
  };

  // WAI-ARIA APG "Select-Only Combobox" keyboard support.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) onOpenChange(true);
        else setActiveIndex((index) => Math.min(options.length - 1, index + 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) onOpenChange(true);
        else setActiveIndex((index) => Math.max(0, index - 1));
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) selectIndex(activeIndex);
        else onOpenChange(true);
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          onOpenChange(false);
        }
        break;
      case "Tab":
        if (open) onOpenChange(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative" ref={rootRef}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text-primary">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid && errorMessage ? errorId : undefined}
        onClick={() => onOpenChange(!open)}
        onKeyDown={handleKeyDown}
        className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border bg-bg-deep px-3.5 py-2 text-left text-sm text-text-primary transition-colors focus:outline-none ${
          invalid
            ? "border-status-danger/60 focus:border-status-danger"
            : "border-border-gray hover:border-border-strong focus:border-accent"
        }`}
      >
        <span className={selected ? "text-text-primary" : "text-text-tertiary"}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-text-tertiary transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute z-40 mt-2 max-h-72 w-full overflow-auto rounded-lg border border-border-gray bg-bg-deep p-1 shadow-2xl"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <div
                key={option.value}
                id={`${id}-option-${index}`}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                onClick={() => selectIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`cursor-pointer rounded-md px-3 py-2.5 text-left transition-colors ${
                  isActive
                    ? "bg-accent/5 text-text-primary"
                    : isSelected
                      ? "text-text-primary"
                      : "text-text-secondary"
                }`}
              >
                <span className="block text-sm font-medium">{option.label}</span>
                {option.detail && (
                  <span className="mt-0.5 block text-xs leading-5 text-text-tertiary">
                    {option.detail}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
      {invalid && errorMessage && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-status-danger">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // The native inputs enforce their own `required`, but the custom selects
    // are not native form controls, so validate them on the client so the user
    // gets inline feedback instead of a round-trip rejection toast.
    const nextErrors: Record<string, boolean> = {};
    if (!formData.intent) nextErrors.intent = true;
    if (!formData.role) nextErrors.role = true;
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      toast.error("Please select your role before sending.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactMessage(formData);

      if (result.success) {
        setShowSuccess(true);
        setFormData(initialFormData);
        toast.success("Message sent successfully.");
      } else {
        toast.error(result.error || "Failed to send message");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const inputClass =
    "h-11 w-full rounded-lg border border-border-gray bg-bg-deep px-3.5 text-sm text-text-primary placeholder:text-text-tertiary transition-colors hover:border-border-strong focus:border-accent focus:outline-none";

  const setFieldValue = (name: keyof typeof initialFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear a pending validation error once the field has a value.
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  return (
    <PageShell>
      <Hero
        eyebrow="Contact"
        title="Tell us what you want to launch."
        accent="We will route the rest."
        description="Demo, university pilot, security review, or procurement question: send the context once and we will come back with the right next step."
        actions={[
          { label: "Start the Form", href: "#contact-form" },
          { label: "Email Support", href: `mailto:${SUPPORT_EMAIL}`, variant: "secondary" },
        ]}
        className="pb-14 md:pb-20"
      />

      <Section className="py-14" surface="panel">
        <Container size="wide">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: CalendarCheck,
                title: "Book a demo",
                description:
                  "For administrators, departments, IT, and teams evaluating a university rollout.",
                meta: "University fit",
              },
              {
                icon: Rocket,
                title: "Start a pilot",
                description:
                  "For university teams who want to evaluate EdPilot with real course materials and faculty controls.",
                meta: "University pilot",
              },
              {
                icon: HelpCircle,
                title: "Ask a question",
                description:
                  "For privacy, procurement, accessibility, LMS, partnership, or support questions.",
                meta: "Routed reply",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="surface-gradient rounded-lg border border-border-gray p-5 shadow-lg"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <IconChip icon={item.icon} className="h-10 w-10" />
                  <span className="rounded-md border border-border-gray bg-bg-deep px-2.5 py-1 text-[10px] font-medium tracking-[0.01em] text-text-tertiary">
                    {item.meta}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-text-primary">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="contact-form" className="py-20 md:py-24">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Next step"
                title="A cleaner path to the right conversation."
                description="The form is structured around the details that actually change the next step: role, institution, LMS, timeline, and pilot size."
                className="mb-8"
              />
              <div className="overflow-hidden rounded-lg border border-border-gray bg-bg-deep">
                {[
                  {
                    title: "We read the context",
                    description:
                      "Your role, institution, timeline, and LMS help us route the right response.",
                    icon: MessageSquare,
                  },
                  {
                    title: "We propose a useful next step",
                    description:
                      "That may be a demo, course-material pilot, privacy conversation, or FAQ follow-up.",
                    icon: Shield,
                  },
                  {
                    title: "You see the product on real material",
                    description:
                      "For pilots, the most useful demo is usually built around your syllabus or course sample.",
                    icon: Building2,
                  },
                ].map((item, index) => (
                  <div key={item.title} className="border-b border-border-gray p-5 last:border-b-0">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/15 bg-accent/5 text-accent">
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="section-kicker text-accent">
                          Step {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-1 text-sm font-semibold text-text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[13px] leading-6 text-text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="mt-6 inline-flex items-center gap-3 rounded-lg border border-border-gray bg-bg-surface px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent/30 hover:bg-bg-elevated hover:text-text-primary focus-ring"
              >
                <IconChip icon={Mail} className="h-8 w-8" />
                {SUPPORT_EMAIL}
              </a>
            </div>

            <div className="surface-gradient-panel overflow-visible rounded-lg border border-border-gray p-5 shadow-2xl md:p-7">
              {showSuccess ? (
                <div role="status" aria-live="polite" className="py-12 text-center">
                  <div
                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg border border-status-success/20 bg-status-success/10"
                    aria-hidden="true"
                  >
                    <CheckCircle className="h-7 w-7 text-status-success-soft" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary">Message sent.</h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
                    We will reply within one business day with a useful next step.
                  </p>
                  <Button onClick={() => setShowSuccess(false)} className="mt-6">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot: hidden from users + assistive tech; bots fill it. */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="contact-company">Company (leave blank)</label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.company}
                      onChange={(event) => setFieldValue("company", event.target.value)}
                    />
                  </div>
                  <CustomSelect
                    id="contact-intent"
                    label="What do you want to do?"
                    value={formData.intent}
                    options={intentOptions}
                    placeholder="Choose a request type"
                    required
                    invalid={fieldErrors.intent}
                    errorMessage="Please choose a request type."
                    open={openSelect === "intent"}
                    onOpenChange={(open) => setOpenSelect(open ? "intent" : null)}
                    onValueChange={(value) => setFieldValue("intent", value)}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-first-name"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        First name *
                      </label>
                      <input
                        id="contact-first-name"
                        type="text"
                        name="firstName"
                        maxLength={CONTACT_FIELD_LIMITS.firstName}
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        autoComplete="given-name"
                        className={inputClass}
                        placeholder="Ada"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-last-name"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Last name *
                      </label>
                      <input
                        id="contact-last-name"
                        type="text"
                        name="lastName"
                        maxLength={CONTACT_FIELD_LIMITS.lastName}
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        autoComplete="family-name"
                        className={inputClass}
                        placeholder="Lovelace"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Work email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        maxLength={CONTACT_FIELD_LIMITS.email}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className={inputClass}
                        placeholder="you@university.edu"
                      />
                    </div>
                    <div>
                      <CustomSelect
                        id="contact-role"
                        label="Role"
                        value={formData.role}
                        options={roleOptions}
                        placeholder="Select your role"
                        required
                        invalid={fieldErrors.role}
                        errorMessage="Please select your role."
                        open={openSelect === "role"}
                        onOpenChange={(open) => setOpenSelect(open ? "role" : null)}
                        onValueChange={(value) => setFieldValue("role", value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-institution"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Institution *
                      </label>
                      <input
                        id="contact-institution"
                        type="text"
                        name="institution"
                        maxLength={CONTACT_FIELD_LIMITS.institution}
                        value={formData.institution}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="State University"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-department"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Department
                      </label>
                      <input
                        id="contact-department"
                        type="text"
                        name="department"
                        maxLength={CONTACT_FIELD_LIMITS.department}
                        value={formData.department}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Biology, Online Learning, IT..."
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <CustomSelect
                        id="contact-lms"
                        label="LMS"
                        value={formData.lms}
                        options={lmsOptions}
                        placeholder="Select one"
                        open={openSelect === "lms"}
                        onOpenChange={(open) => setOpenSelect(open ? "lms" : null)}
                        onValueChange={(value) => setFieldValue("lms", value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-course-count"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Courses
                      </label>
                      <input
                        id="contact-course-count"
                        type="text"
                        name="courseCount"
                        maxLength={CONTACT_FIELD_LIMITS.courseCount}
                        value={formData.courseCount}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="1, 5, 50..."
                      />
                    </div>
                    <div>
                      <CustomSelect
                        id="contact-timeline"
                        label="Timeline"
                        value={formData.timeline}
                        options={timelineOptions}
                        placeholder="Select one"
                        open={openSelect === "timeline"}
                        onOpenChange={(open) => setOpenSelect(open ? "timeline" : null)}
                        onValueChange={(value) => setFieldValue("timeline", value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-sm font-medium text-text-primary"
                    >
                      What should we know? *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      maxLength={CONTACT_FIELD_LIMITS.message}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full resize-none rounded-lg border border-border-gray bg-bg-deep px-3.5 py-3 text-sm text-text-primary placeholder:text-text-tertiary transition-colors focus:border-accent focus:outline-none"
                      placeholder="Tell us about the course, rollout, privacy question, or demo scenario you want to explore."
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send Request
                        <ArrowRight aria-hidden="true" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs leading-5 text-text-tertiary">
                    By submitting, you agree to our{" "}
                    <Link
                      href="/privacy-policy"
                      className="rounded-md text-accent hover:text-accent-soft focus-ring"
                    >
                      Privacy Policy
                    </Link>
                    . Required fields are marked with *.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16" surface="panel">
        <Container>
          <ProofPanel
            items={[
              {
                icon: Shield,
                label: "No commitment required",
                detail:
                  "The first conversation can be exploratory, procurement-focused, or course-specific.",
              },
              {
                icon: MessageSquare,
                label: "Response in one business day",
                detail: "We route messages to the right product, security, or pilot contact.",
              },
              {
                icon: Building2,
                label: "Course-material demo option",
                detail:
                  "When helpful, demos can be shaped around your syllabus rather than a generic sample.",
              },
            ]}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
