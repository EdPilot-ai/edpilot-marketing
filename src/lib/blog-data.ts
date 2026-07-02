export type BlogCategory =
  | 'AI in Education'
  | 'Academic Policy'
  | 'Faculty Perspectives'
  | 'Future of Universities'
  | 'Product Updates'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    title: string
  }
  category: BlogCategory
  readingTime: number // in minutes
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  // ─── Article 1 — Featured ───────────────────────────────────────────────────
  {
    slug: 'students-already-using-ai-universities-need-to-catch-up',
    title: 'Students Are Already Using AI. Universities Need to Catch Up.',
    excerpt:
      'The policy debate inside most universities is still about whether to allow AI. Students resolved that question on their own a couple of years ago.',
    content: `
## The Decision Was Made Without You

Walk into any college library on a Sunday night and ask students what tools they're using to study. You'll hear about flashcard apps, YouTube lectures, tutoring services, and somewhere in there, usually said with a slight hedge, you'll hear about ChatGPT or Claude or Gemini.

The policy debate inside most universities is still about whether to allow AI. Students resolved that question on their own a couple of years ago.

That gap, between where students actually are and where institutional policy sits, is the problem worth solving. Not because students are doing something wrong. But because the AI they're using has absolutely no idea what their professor taught last Tuesday.

## What Students Are Actually Doing With It

It's worth being specific, because the fear-driven version of this conversation tends to imagine students submitting AI-generated essays wholesale. That happens. But it's not the dominant pattern.

More commonly, students use AI to unstick themselves at 11pm when the textbook isn't making sense, to get a second explanation of something covered in lecture, to generate practice questions before an exam, to check their understanding of a concept before committing it to an assignment.

These are legitimate study behaviors. The problem is the tool they're using for them has no idea what's in the syllabus, has never read the lecture slides, and will cheerfully explain a concept in a way that directly contradicts how the professor framed it three days ago.

## Why Banning It Doesn't Work

Institutions that have tried prohibition-first approaches have largely discovered the same thing: it doesn't stop usage, it just hides it. Students who were using AI to study still use it. They just stop mentioning it, and the interactions move entirely outside institutional visibility.

There's also a subtler problem. Blanket bans don't distinguish between using AI to avoid thinking and using AI to think better. A student who asks an AI to explain the same concept three different ways until it clicks is doing something academically valuable. A ban treats both behaviors the same.

The more honest question isn't "how do we stop students from using AI?" It's "what kind of AI experience do we want students to have?"

## The Structured Alternative

The institutions that will handle this well aren't the ones with the most restrictive policies. They're the ones that create a sanctioned, faculty-governed AI environment that students actually prefer to use because it's better at helping them learn their specific course material.

When AI is grounded in course materials (the actual syllabus, readings, and lecture content), it stops being a wild card and becomes an extension of what the professor teaches. Students get accurate, course-aligned explanations. Faculty can see how students are engaging. The institution has visibility it currently lacks entirely.

The tools exist. The question is whether universities will build the infrastructure to use them well, or continue debating a policy question that students have already moved past.
    `.trim(),
    author: {
      name: 'David Laszczkowski',
      title: 'Co-Founder, EdPilot',
    },
    category: 'AI in Education',
    readingTime: 5,
    featured: true,
  },

  // ─── Article 2 ──────────────────────────────────────────────────────────────
  {
    slug: 'what-instructor-controlled-ai-actually-means',
    title: 'What Does "Instructor-Controlled AI" Actually Mean?',
    excerpt:
      'The phrase gets used a lot. Most explanations stop at "faculty set the rules." That\'s not wrong, but it leaves out the part that actually matters.',
    content: `
## A Term That Needs Unpacking

"Instructor-controlled AI" has become one of those phrases that sounds self-explanatory until you try to build it. The phrase gets used in policy documents, vendor pitches, and faculty senate discussions, usually to mean something like "faculty have a say in how AI is used." That's not wrong, but it leaves out the part that actually matters.

Genuine instructor control isn't about having an approval checkbox in a workflow. It's about the AI operating within a knowledge boundary that the faculty member defined, responding in a manner the faculty member specified, and declining requests that fall outside what the faculty member determined was appropriate.

That's a meaningfully different thing.

## The Knowledge Boundary

The first dimension of instructor control is content. What does the AI know?

A general-purpose AI knows everything it was trained on: billions of pages of text from across the internet, covering every academic discipline, every political viewpoint, every level of rigor. When a student asks it a question, it draws from all of that.

An instructor-controlled AI knows what the instructor gave it. The syllabus. The assigned readings. The lecture slides. The supplementary materials the professor chose to include. Nothing else.

This matters for a concrete reason: professors teach specific things, in a specific order, with a specific framing. An economics professor who covers market failures through a particular theoretical lens doesn't want students getting answers grounded in a different lens. A writing professor who emphasizes a specific argumentative structure doesn't want AI reinforcing a different one.

The knowledge boundary isn't a restriction. It's an alignment mechanism.

## Response Behavior

The second dimension is how the AI responds. This is where "instructor control" often gets treated as a simple toggle, on or off, helpful or restricted, when it's actually a multi-dimensional set of choices.

Should the AI explain concepts directly, or ask students questions that guide them toward their own understanding? Should it handle practice problems, or redirect students to office hours for worked examples? Should it be more or less available during exam periods? Should it be formal and academic, or approachable and conversational?

These aren't trivial questions. They reflect pedagogical choices about how learning happens, choices that belong to the faculty member, not to the vendor who built the model.

Instructor-controlled AI gives faculty a way to encode those choices into how the system actually behaves, not just in a policy document that students may or may not read.

## What It's Not

Instructor control doesn't mean faculty micromanage every interaction. That's neither possible nor desirable.

It means the system operates within parameters the faculty member set, and those parameters are specific enough to actually shape behavior. "Be helpful with course content" is not a meaningful parameter. "Draw only from these materials, respond Socratically to conceptual questions, and decline requests to write assignment text" is.

The gap between those two descriptions is the gap between nominal control and actual control. Most AI products offer the former. Genuine instructor-controlled systems offer the latter.

## Why It Matters for Students

Students benefit from this directly, even if they don't think about it in these terms.

When the AI they're using is grounded in their actual course materials, its explanations align with what they were taught. When it's calibrated to their professor's pedagogical approach, its guidance reinforces the habits of thought the course is trying to build. When it has clear limits around assignment completion, using it for support doesn't inadvertently cross lines the student didn't intend to cross.

Instructor control, done right, makes AI more useful for students, not less.
    `.trim(),
    author: {
      name: 'Kelly Wen',
      title: 'Co-Founder, EdPilot',
    },
    category: 'Faculty Perspectives',
    readingTime: 6,
  },

  // ─── Article 3 ──────────────────────────────────────────────────────────────
  {
    slug: 'universities-ai-without-compromising-integrity',
    title: 'How Universities Can Use AI Without Compromising Academic Integrity',
    excerpt:
      'The worry that AI destroys academic integrity is understandable but imprecise. Unstructured AI use creates integrity risks. Structured AI use, governed by faculty, creates a different set of conditions entirely.',
    content: `
## The Concern Is Legitimate. The Framing Isn't.

When faculty express concern about AI and academic integrity, they're not wrong to be concerned. Uncontrolled AI use does create real problems: students submitting work that doesn't reflect their understanding, assignments that are trivially completable by a language model, assessments that can't distinguish between human reasoning and generated text.

But "AI compromises academic integrity" isn't quite right as a general claim. What compromises integrity is a specific configuration: students with access to powerful, general-purpose AI tools, no institutional oversight, and assessments that were designed before those tools existed.

Change the configuration and you change the risk profile.

## What Creates the Risk

It's worth being precise about where integrity risk actually comes from.

The risk isn't AI per se. It's AI that operates without any connection to course content, without faculty oversight, without visibility into how it's being used, and in an assessment environment that hasn't been designed with AI in mind.

When a student uses a general-purpose AI to complete an assignment, a few things are true simultaneously: the AI has no idea what the course requires, the faculty member has no visibility into the interaction, the interaction leaves no record, and the AI is optimized to produce finished-looking output. That combination is what creates the integrity problem.

## Changing the Configuration

A curriculum-grounded AI system changes most of those conditions.

When the AI only knows the course materials, it can help students understand what they were assigned to learn, but it can't substitute for that understanding with generic content. A student asking it to "just write the essay" gets something grounded in the syllabus they were supposed to have engaged with, not a generic composition. The task of producing genuinely good work remains with the student.

When the AI is governed by faculty-defined parameters, it can be configured to support understanding without completing assignment work. It can be set to guide rather than answer, to cite rather than summarize, to ask questions rather than provide conclusions.

When interactions are visible to faculty, the use is no longer invisible. Instructors can see what their students are actually asking, where they're struggling, and whether usage patterns look like learning or like shortcutting.

## Assessment Still Matters

This isn't an argument that curriculum-grounded AI eliminates integrity risk entirely. It doesn't.

Assessment design still matters. Assignments that ask students to produce a generic analytical essay are easier to game, with or without AI, than assignments that require students to synthesize specific course materials, apply frameworks from specific readings, or engage with their own documented process of inquiry.

What curriculum-grounded AI does is shift the calculus. It makes the AI less useful as a shortcut and more useful as a learning tool. It aligns student behavior with the goal of actual understanding, rather than making understanding and AI-assisted production equally easy paths to the same outcome.

## The Governance Frame

Ultimately, integrity isn't a technology problem. It's a governance problem. The question isn't whether AI exists. It's whether the institution has structured the learning environment in a way that makes genuine engagement the path of least resistance.

Faculty control over AI systems, visibility into how they're used, and assessment design that requires course-specific reasoning are the levers that matter. Technology alone doesn't solve this. Technology governed well by the people who understand what learning is supposed to accomplish can make meaningful progress.
    `.trim(),
    author: {
      name: 'Kelly Wen',
      title: 'Co-Founder, EdPilot',
    },
    category: 'Academic Policy',
    readingTime: 6,
  },

  // ─── Article 4 ──────────────────────────────────────────────────────────────
  {
    slug: 'problem-with-general-purpose-ai-in-higher-education',
    title: 'The Problem With General-Purpose AI in Higher Education',
    excerpt:
      'ChatGPT was not built for universities. It was built to be useful to everyone, which means it was built to be optimized for no one in particular, and that design choice has real consequences in academic settings.',
    content: `
## Built for Everyone, Optimized for No One

ChatGPT was not built for universities. That's not a criticism, just a description of what it is. It was built to be useful to everyone, which means it was optimized for no one in particular. Ask it about macroeconomics and it'll give you a reasonable answer. Ask it about the specific theoretical framework your professor assigned for your intermediate macro course and it'll give you something that sounds reasonable but may have nothing to do with what you actually need to know.

That gap is the core problem with deploying general-purpose AI in higher education. It's not that the tools are bad. It's that they were built for a different context than the one they're being used in.

## The Hallucination Problem

The most widely discussed failure mode is hallucination: AI systems confidently stating false information. This happens in all domains, but it's particularly consequential in academic settings where precision matters.

A student asking about a legal case for a law course, a specific historical event for a history seminar, or a particular experimental result for a biology lab is operating in a context where the details matter. Getting the general shape of an answer right but the specifics wrong isn't a minor inconvenience. It's the kind of error that leads to misconceptions that take weeks to undo.

General-purpose AI is trained to produce plausible-sounding text. It has no special obligation to accuracy in any specific domain, and no awareness of what your course actually covered.

## The Alignment Problem

Separate from hallucination is a subtler problem: even when general-purpose AI is factually accurate, it may not be teaching the right thing.

Every professor makes choices about how to frame concepts, which theoretical lenses to emphasize, what to include and what to leave out. Those choices are pedagogical decisions. They reflect what the professor believes students need to understand and in what order.

A general-purpose AI knows none of this. It answers questions based on what's broadly true, not based on what a specific course is trying to accomplish. A student in a course that deliberately avoids one framework in favor of developing intuition first gets answers that preempt the scaffolding their professor built. The AI isn't wrong exactly. It's just teaching a different course.

## The Governance Gap

The third problem is structural. When students use public AI tools, none of the interaction is visible to the institution. Faculty can't see what their students are asking, can't tell whether AI engagement is helping or hurting understanding, and can't tell when a student's confusion was introduced by an AI interaction two weeks ago.

This is a governance gap in the literal sense: a significant portion of the learning environment is operating without any institutional oversight. Universities have processes for everything (curriculum design, academic support, tutoring, office hours) and then this large unstructured thing where a substantial portion of student-AI interaction happens and nobody has any idea what's occurring.

## The Alternative

The answer isn't to pretend general-purpose AI doesn't exist or to try to ban it. The answer is to provide students with something better: AI that knows what their course actually covers, responds in a way their professor actually endorses, and generates visibility into how it's being used rather than operating in a black box.

General-purpose AI isn't going away. The question is whether universities will remain dependent on it, or build something designed for the context they're actually operating in.
    `.trim(),
    author: {
      name: 'David Laszczkowski',
      title: 'Co-Founder, EdPilot',
    },
    category: 'AI in Education',
    readingTime: 5,
  },

  // ─── Article 5 ──────────────────────────────────────────────────────────────
  {
    slug: 'ai-is-the-new-calculator',
    title: 'AI Is the New Calculator. Universities That Ignore That Will Struggle.',
    excerpt:
      'When calculators became cheap and common, universities didn\'t ban arithmetic. They redesigned what they were trying to teach. The same logic applies now, and the institutions that understand that will be better positioned.',
    content: `
## We've Done This Before

There's a version of the current AI debate that treats it as unprecedented, a crisis unlike anything higher education has faced. That framing is both overstated and unhelpful, because universities have navigated similar transitions before and the pattern is recognizable.

When calculators became cheap and common, there were educators who argued for strict prohibition. The concern was legitimate: if students can outsource computation, will they develop quantitative intuition? Some institutions banned calculators in certain contexts. Others redesigned what they were trying to teach, shifting emphasis from arithmetic execution to problem setup, interpretation, and analytical judgment.

The second group produced graduates who were better equipped for a world in which calculators exist.

The same logic applies now.

## What AI Does and Doesn't Change

AI changes what's easy to outsource. Writing a passable five-paragraph essay, producing a generic literature summary, generating a plausible first draft of an analysis. These things are genuinely easier with current AI tools than they were two years ago.

What AI doesn't change is the underlying goal of education. Universities exist to develop people who can think rigorously, evaluate evidence, construct arguments, apply knowledge in novel situations, and exercise judgment under uncertainty. AI doesn't do any of those things for you. It can produce text that looks like those things, which is a real integrity risk, but it can't actually develop those capacities in you.

The response to calculators wasn't to abandon quantitative education. It was to ask what quantitative skills actually matter when computation is cheap. The response to AI shouldn't be to abandon writing and analytical education. It should be to ask what analytical skills actually matter when first-draft generation is cheap.

## The Institutions That Adapt

The universities that will navigate this well aren't the ones that dig in most defensively. They're the ones that ask the honest question: given that students have access to these tools, what does rigorous education look like?

That question leads to different places depending on the discipline. In some fields it means more emphasis on synthesis and less on summary. In others it means more emphasis on the reasoning behind conclusions and less on the conclusions themselves. In others it means using AI as a teaching tool, something students interact with in structured ways that build understanding, rather than pretending it doesn't exist.

None of this requires abandoning academic standards. It requires thinking clearly about what those standards are actually for.

## A Practical Starting Point

The most immediate implication for most institutions isn't curriculum redesign, which is a longer project. The immediate implication is governance.

Right now, students at most universities are using AI extensively with no institutional visibility, no faculty oversight, and no connection to their actual course materials. The AI is operating in a completely unstructured way, and whatever impact it's having on learning is invisible.

The first step is building the infrastructure to change that: giving faculty actual control over the AI environment their students interact with, and giving institutions visibility into what's actually happening. That's the foundation everything else builds on.
    `.trim(),
    author: {
      name: 'David Laszczkowski',
      title: 'Co-Founder, EdPilot',
    },
    category: 'Future of Universities',
    readingTime: 5,
  },

  // ─── Article 6 ──────────────────────────────────────────────────────────────
  {
    slug: 'future-of-office-hours-ai-assistance',
    title: 'The Future of Office Hours',
    excerpt:
      'Most students who are confused at 11pm on a Tuesday don\'t have a good option. Office hours ended six hours ago. The TA is also studying. The textbook already didn\'t help. This is a solvable problem.',
    content: `
## The Gap Nobody Talks About

There's a gap in the support structure of almost every university that everyone knows about and nobody has a clean solution for. Students need help with course material at times when faculty aren't available. Office hours exist, but they cover a small slice of the week. TAs help, but they're stretched. Tutoring services work for some students and some subjects.

Most students who are confused at 11pm on a Tuesday don't have a good option. They go back to the textbook, which already didn't help. They ask a classmate who may or may not have it right. Or they open a general-purpose AI tool and get an answer that may or may not align with what their professor actually taught.

This is a solvable problem. It just requires thinking about AI differently than most institutions have so far.

## What Actually Happens in Office Hours

The best office hours interactions aren't students passively receiving explanations. They're students asking specific questions about things that don't make sense, and faculty helping them work through the confusion, usually by asking questions back, identifying where the conceptual gap is, and addressing that specifically.

That pattern is replicable. Not in every dimension (the faculty relationship, the contextual judgment about a specific student's learning trajectory), but the core loop of "student has a specific confusion, gets targeted help working through it" is something a well-designed AI system can support.

The key word is "well-designed." A general-purpose AI gives students answers. It doesn't necessarily help them develop understanding. The distinction matters.

## Course-Grounded, Faculty-Calibrated

The version of AI-supported study that actually extends office hours rather than replacing them has two properties.

First, it's grounded in the course materials. When a student is confused about a concept from week seven, the AI draws from the readings and lecture content of week seven, the same sources the professor would reference in office hours. The explanation is consistent with what the course taught, not with whatever a language model was trained on.

Second, it's calibrated to the faculty member's pedagogical approach. A professor who teaches through Socratic questioning doesn't want their AI substitute providing direct answers to every question. A professor who believes students need to work through confusion themselves doesn't want an AI that short-circuits that process. The AI should reflect the approach the faculty member would take, because that approach wasn't arbitrary; it was designed to produce a specific kind of learning.

## What This Doesn't Replace

It should be said clearly: AI-supported study doesn't replace office hours, and it shouldn't try to.

The relationship between a student and a professor is a real educational thing. The judgment a faculty member exercises when a student is struggling, recognizing when confusion is conceptual versus procedural, understanding a specific student's background, knowing what they'll need for the next unit, is irreplaceable.

What AI-supported study addresses is the specific problem of students having nowhere to go with their confusion outside of faculty availability windows. It extends the reach of what the professor teaches without substituting for the judgment only the professor can exercise.

For most students at most institutions, that's the gap that most needs filling.
    `.trim(),
    author: {
      name: 'Kelly Wen',
      title: 'Co-Founder, EdPilot',
    },
    category: 'Faculty Perspectives',
    readingTime: 5,
  },

  // ─── Article 7 ──────────────────────────────────────────────────────────────
  {
    slug: 'from-syllabus-to-intelligence',
    title: 'From Syllabus to Intelligence: How Curriculum-Grounded AI Works',
    excerpt:
      'The concept sounds straightforward: AI that knows your course materials. The implementation involves a series of choices that determine whether the result is actually useful or just a fancier version of the same problem.',
    content: `
## The Concept Is Simple. The Implementation Isn't.

The pitch for curriculum-grounded AI sounds straightforward: take the materials from a course, train or configure an AI system on those materials, and now the AI knows what the course teaches. Students get answers grounded in what they were actually assigned. Problem solved.

The concept is right. The implementation involves a series of choices that determine whether the result is actually useful or just a fancier version of the same problem.

## What Goes Into the Knowledge Model

The starting point is the materials themselves. A course generates a substantial corpus: syllabus, readings, lecture slides, assignments, supplementary documents, transcripts if lectures are recorded. Getting all of this into a form an AI can reason about is the first challenge.

Not all materials are equal. A syllabus tells you what topics the course covers and in what order. Readings tell you what sources and perspectives the professor considers authoritative. Lecture slides tell you how the professor actually frames things: which examples they use, which analogies they reach for, which distinctions they consider important. Assignments tell you what level of application and synthesis is expected.

A well-built knowledge model uses all of these. An AI that only has the textbook knows what the textbook covers. An AI that has the full course corpus knows what this professor is actually teaching.

## Retrieval, Not Generation

The next critical choice is how the AI uses what it knows.

A generation-based approach takes the materials and uses them to fine-tune a model. The materials shape the model's weights, and then the model generates responses drawing on that training. This approach produces fluent answers but can still hallucinate, still blend in information from outside the course, and still produce responses that sound course-specific but aren't.

A retrieval-based approach works differently. When a student asks a question, the system finds the most relevant passages from the actual course materials and constructs a response grounded in those specific sources. The response cites the document and section it's drawing from. If the answer isn't in the course materials, the system says so.

Retrieval is slower and less fluent than generation. It's also more honest and more verifiable. For an academic context where accuracy and traceability matter, it's the right architecture.

## Scoping the Boundary

The knowledge boundary isn't just about what the AI knows. It's about what happens when a student asks something that falls outside it.

A student might ask a follow-up question that's interesting but outside the course scope. They might ask for general background on a topic the course touches on. They might ask something that could be answered by the course materials or by external sources.

How the system handles these edge cases matters. The options aren't binary. The AI can stay strictly within the course corpus, can acknowledge what it knows from course materials and flag what would require going beyond them, or can allow controlled expansion to specified reference sources the professor endorses.

What it shouldn't do is blend internal and external sources without telling the student which is which.

## What Faculty See

The last piece is visibility. A curriculum-grounded AI that operates invisibly doesn't give faculty much more than a general-purpose tool would.

The value of grounding AI in course materials compounds when faculty can see how students are using it. Which concepts are generating the most questions? Where are students getting confused in ways that suggest the course materials could be clearer? Are certain topics showing up disproportionately in student questions before exams?

That feedback loop, from student interactions to faculty insight about the course, is one of the most practically useful things a curriculum-grounded AI can provide. It turns individual student interactions into aggregate data about where the course is working and where it isn't.
    `.trim(),
    author: {
      name: 'David Laszczkowski',
      title: 'Co-Founder, EdPilot',
    },
    category: 'AI in Education',
    readingTime: 6,
  },

  // ─── Article 8 ──────────────────────────────────────────────────────────────
  {
    slug: 'hidden-risks-of-public-ai-tools-for-students',
    title: 'The Hidden Risks of Letting Students Use Public AI Tools',
    excerpt:
      'The obvious risks get discussed. The subtler ones, the ones that compound quietly over a semester, are harder to see and do more lasting damage to actual learning.',
    content: `
## The Risks You've Already Heard About

The conversation about AI risks in higher education tends to focus on a few scenarios: a student submitting AI-generated work as their own, a model hallucinating a source that the student cites, an assignment that could be completed by anyone with a ChatGPT subscription.

These are real risks and worth taking seriously. But they're the visible ones, the scenarios that produce an obvious problem the institution can point to. There's a category of risk that's subtler, less dramatic, and in some ways more corrosive to actual learning.

## The Miscalibration Problem

When a student uses a general-purpose AI to study, the AI draws from whatever it was trained on, not from their course materials. The information is often accurate in a general sense. It may still be wrong for this course.

A professor's framing of a concept isn't arbitrary. They chose particular examples because they connect to what comes next. They defined terms a specific way because the rest of the course builds on that definition. They emphasized certain aspects of a theory and deemphasized others because of where they're taking students.

A student who spends a semester studying with a general-purpose AI is getting a parallel education, one that sounds like what their professor is teaching but is subtly misaligned. They develop mental models that make sense internally but don't connect correctly to the course's framework. The confusion this produces is genuinely hard to diagnose, because the student doesn't feel confused. They feel like they understand things.

That's the miscalibration problem. It shows up in exams as wrong answers delivered confidently.

## Privacy and Data Exposure

There's a second category of risk that gets less attention: what students share when they use public AI tools.

Students routinely paste assignment prompts, exam review materials, and course documents into public AI systems. In doing so, they're transmitting institutional content to platforms the institution has no agreement with, no visibility into, and no control over.

This matters for a few reasons. Course materials are intellectual property: lecture slides and assignment designs belong to the faculty member or institution. In some disciplines, students work with sensitive materials (case studies, datasets, documents) that may have privacy implications. And the training practices of public AI providers aren't always transparent; there are legitimate questions about how input data is used.

Most students don't think about any of this. They're using a free tool to study for an exam. The institution has no way to see it happening.

## The Dependency Risk

The most long-term risk is harder to quantify but may matter most.

AI tools are very good at producing the artifact of understanding, text that looks like someone has comprehended and synthesized something, without the underlying comprehension. A student who uses AI consistently as a study aid may gradually lose the habit of building their own understanding, because the friction that drives real learning keeps getting removed.

This isn't hypothetical. Learning requires productive struggle: working through confusion, making errors, revising thinking. AI that smooths all of that away efficiently doesn't build the cognitive muscle that education is supposed to develop.

The question isn't whether students should use AI. It's whether the AI they use is designed to build understanding or to produce the appearance of it.

## The Governance Answer

These risks don't argue for prohibition. They argue for structure.

An institution that provides students with curriculum-grounded AI (AI that faculty have configured, that draws from course materials, that prioritizes understanding over output generation) addresses most of these risks directly. Miscalibration goes away when the AI is grounded in the actual course. Privacy concerns are manageable when the platform is institutional rather than public. The dependency problem is at least partially mitigated when the AI is designed to guide learning rather than replace it.

The risks of public AI use in higher education are real. They're also mostly avoidable, given the right infrastructure.
    `.trim(),
    author: {
      name: 'Kelly Wen',
      title: 'Co-Founder, EdPilot',
    },
    category: 'Academic Policy',
    readingTime: 6,
  },

  // ─── Article 9 ──────────────────────────────────────────────────────────────
  {
    slug: 'ai-literacy-core-university-skill',
    title: 'AI Literacy Is Becoming a Core University Skill. Most Programs Aren\'t Teaching It.',
    excerpt:
      'Understanding how to work with AI, which means knowing its limits, evaluating its outputs, and applying it appropriately, is quickly becoming table stakes for professional competence in most fields.',
    content: `
## The New Research Skill

Twenty years ago, universities invested significant effort in teaching students how to evaluate sources: how to distinguish a peer-reviewed journal from an opinion site, how to identify bias in primary sources, how to construct a research trail that holds up to scrutiny. This was considered a core skill, not a specialty.

AI literacy is in the same position now. Understanding how to work with AI, which means knowing its limits, evaluating its outputs, and applying it appropriately, is quickly becoming table stakes for professional competence in most fields. Most university programs aren't teaching it yet.

## What AI Literacy Actually Involves

The term gets used loosely, so it's worth being specific. AI literacy isn't about being able to write a good prompt, though that's part of it. The more substantive components are these:

Understanding what AI systems can and can't do. Current AI systems are remarkably capable at certain tasks and reliably poor at others. Students who understand the difference use these tools more effectively and catch errors that students who don't understand the difference miss entirely.

Evaluating AI outputs critically. An AI-generated answer that sounds authoritative may be subtly wrong, partially fabricated, or accurate but incomplete for the specific purpose at hand. The skill of checking AI outputs (against primary sources, against domain knowledge, against the specific requirements of the task) is one that needs to be deliberately developed.

Understanding context and boundaries. AI trained on general data performs differently than AI trained on specialized materials. AI optimized for fluency performs differently than AI designed for accuracy. Students who understand these distinctions can select the right tool for the task and set appropriate expectations.

Thinking about attribution and transparency. When and how to disclose AI use, how to cite AI-assisted work, and how to think about intellectual ownership in an AI-assisted context are all questions that students will face in professional settings and need frameworks for.

## Why Universities Are Behind

There are a few reasons this hasn't moved faster.

One is velocity. AI capabilities have developed faster than curriculum review cycles. By the time a course is proposed, approved, designed, and staffed, the landscape has shifted.

Another is disciplinary fragmentation. AI literacy is genuinely cross-disciplinary (it matters differently in law than in biology, in journalism than in engineering), but the mechanisms for building cross-disciplinary curricula are slow.

The third reason is that the faculty who would design these courses are still developing their own understanding. You can't teach something you haven't worked through yourself.

## What Can Be Done Now

The full curriculum solution takes time. In the meantime, the most tractable approach is integration rather than standalone courses.

Faculty who are using AI tools in their own research can incorporate reflection on those tools into their teaching. Courses that involve research or writing can build in explicit discussion of when AI use is appropriate, what its limits are in that context, and how to verify AI-assisted work. Study environments that use AI can structure student interactions to build critical engagement rather than passive consumption.

None of this requires a new major or a major curriculum revision. It requires faculty who are thinking carefully about how they're preparing students for a world in which AI is a constant in professional and intellectual work, and building that preparation into what they already do.
    `.trim(),
    author: {
      name: 'David Laszczkowski',
      title: 'Co-Founder, EdPilot',
    },
    category: 'Future of Universities',
    readingTime: 6,
  },

  // ─── Article 10 ─────────────────────────────────────────────────────────────
  {
    slug: 'why-universities-need-their-own-ai-infrastructure',
    title: 'Why Universities Need Their Own AI Infrastructure',
    excerpt:
      'Right now, most universities\' AI strategy is "allow students to use whatever they find." That\'s not a strategy. It\'s an absence of one, and the costs of that absence are accumulating.',
    content: `
## The Default Strategy Isn't Working

Right now, most universities' AI strategy consists of two things: a policy document describing what students are and aren't allowed to do with AI, and implicit permission to use whatever tools they find on their own.

That's not a strategy. It's an absence of one. And the costs of that absence are accumulating in ways that are hard to see because they're distributed across millions of individual student interactions that no institution has any visibility into.

## What "Own Infrastructure" Actually Means

Saying universities need their own AI infrastructure sounds expensive and technically daunting. The practical version is more tractable than it sounds.

It doesn't mean every university builds its own language model. It means every university has a deployed AI environment that it governs, where the knowledge the AI draws from is defined by faculty, where the behavior of the AI is configured by people who understand the academic context, where interactions are visible to the institution, and where the platform is accountable to institutional policies rather than to a consumer product roadmap.

The difference between this and "use ChatGPT" is significant. Consumer AI products are built to be useful to everyone. Institutional AI infrastructure is built to be right for this context: this curriculum, these standards, this population of students.

## The Vendor Dependency Risk

There's a strategic dimension to this beyond the immediate educational context.

When universities become dependent on external AI platforms for a core part of their educational delivery, they've outsourced a significant amount of institutional knowledge to a third party. The course materials that get fed into these systems. The interaction patterns that reveal where students struggle. The aggregate data about what's working and what isn't in a given course.

All of that currently disappears into platforms that universities don't own, can't inspect, and can't guarantee will retain the same terms of service next year that they have today.

This isn't hypothetical risk management. It's the kind of dependency that becomes obvious in retrospect and expensive to unwind.

## What Institutional Visibility Makes Possible

The most immediate argument for institutional AI infrastructure is the visibility it creates.

Right now, most faculty don't know how their students are using AI. They don't know what questions students are asking, what confusions they're carrying into class, or where the course materials are failing to communicate what they're supposed to communicate.

An institutional AI environment that's grounded in course materials and visible to faculty generates all of that. Not as a surveillance mechanism, but as a feedback loop. Which concepts are generating consistent confusion? Which readings are students treating as authoritative? Where are the gaps between what the course assumes students know and what they actually know going in?

That feedback loop is valuable independently of any integrity concern. It makes courses better.

## The Practical Path

Building this doesn't require a massive upfront investment or a years-long implementation project. The practical starting point is a course-level deployment: one faculty member, one course, one semester.

Give a professor a tool to upload their course materials and configure how the AI responds to students. See whether it changes the quality of student questions in office hours, whether it surfaces confusions that the professor can address in class, whether students who use it perform differently than students who don't.

Universities that run those pilots now will have real data and real experience to draw on when the infrastructure question becomes unavoidable. That point is coming regardless of what institutions decide in the meantime.
    `.trim(),
    author: {
      name: 'David Laszczkowski',
      title: 'Co-Founder, EdPilot',
    },
    category: 'Academic Policy',
    readingTime: 6,
  },

  // ─── Article 11 ─────────────────────────────────────────────────────────────
  {
    slug: 'faculty-should-lead-the-ai-revolution',
    title: 'Faculty Should Lead the AI Revolution in Education. Most Aren\'t Being Given the Chance.',
    excerpt:
      'The people who understand pedagogy, disciplinary standards, and what students actually need to learn are being excluded from the decisions that will shape how AI operates in their classrooms.',
    content: `
## The Decision Is Being Made Elsewhere

When universities make AI-related decisions, the people in the room are usually administrators, IT leadership, legal counsel, and vendor representatives. Occasionally student government gets a voice. Faculty, when they appear at all, tend to appear as stakeholders being consulted rather than as decision-makers.

This is backwards. The people who understand pedagogy, disciplinary standards, what students actually need to learn, and where the intellectual integrity risks are most acute: those people are faculty. Cutting them out of the decision, or treating them as one constituency among many, produces AI policies that read like IT governance documents rather than educational frameworks.

## Why Faculty Expertise Is the Irreplaceable Element

It's worth being concrete about what faculty know that no one else in the room does.

Faculty understand their discipline's standards for evidence, argument, and rigor, and how those standards translate into what students need to learn to do. They know which concepts require genuine struggle to develop and which can be learned more efficiently. They know what shortcuts their students are prone to taking and why those shortcuts undermine actual learning. They know what the sequence of the course is trying to accomplish and why individual elements are ordered the way they are.

None of this is in any document. It lives in the professional judgment of the person who designed the course. Any AI system deployed in that course that doesn't encode or defer to that judgment is, to some degree, working against the educational goals the course was designed to achieve.

## What Faculty-Led AI Governance Looks Like

Saying faculty should lead doesn't mean every faculty member needs to become an AI expert. It means the governance structure for AI in education gives faculty meaningful control over the specific dimensions that are properly theirs.

What the AI knows: Faculty should define the knowledge boundaries for AI in their courses. What materials it draws from, what it excludes, and how it handles questions that fall outside the scope of those materials.

How the AI responds: Faculty should be able to configure response behavior to match their pedagogical approach. Whether the AI explains directly or guides through questions, how it handles requests to complete work rather than support understanding, what tone it takes with students.

What the AI doesn't do: Faculty should be able to set clear limits that reflect their academic integrity standards and their course's specific learning goals.

These aren't technical decisions. They're pedagogical ones. The governance structure should reflect that.

## The Practical Barrier

The reason faculty often aren't in the driver's seat isn't malice. It's infrastructure. Current AI tools don't give faculty meaningful control. They give faculty the ability to tell students whether to use AI, but not the ability to define what AI experience students have.

If faculty are going to lead, they need tools that make faculty governance technically feasible, not just administratively permitted. Systems where uploading course materials and setting response parameters is something a professor can do in an afternoon, not a month-long IT project.

That infrastructure is buildable. The question is whether institutions prioritize building it.
    `.trim(),
    author: {
      name: 'Kelly Wen',
      title: 'Co-Founder, EdPilot',
    },
    category: 'Faculty Perspectives',
    readingTime: 5,
  },

  // ─── Article 12 ─────────────────────────────────────────────────────────────
  {
    slug: 'ai-policy-playbook-for-universities',
    title: 'The AI Policy Playbook for Universities',
    excerpt:
      'Most university AI policies were drafted in a hurry, by people who were primarily thinking about risk. A policy that starts with what you\'re trying to accomplish educationally produces something more useful.',
    content: `
## Start With What You're Trying to Accomplish

Most university AI policies were drafted in a hurry, by people who were primarily thinking about risk. The questions driving the drafting process were: What can students abuse? What are we liable for? What do we need to prohibit?

Those are legitimate questions. They're not the right starting questions.

A policy that starts with "what are the risks we need to mitigate" produces a prohibition list. A policy that starts with "what are we trying to accomplish educationally, and how does AI affect our ability to accomplish it" produces something more useful: a governance framework that actually shapes the learning environment in productive ways.

## The Four Questions Every Policy Needs to Answer

**What AI tools will the institution make available, and under what conditions?**

If the institution isn't providing structured AI tools, students will use unstructured ones. The policy question isn't really "will students use AI" but "what AI environment will students be in." An institution that provides curriculum-grounded AI gives students something better than a prohibition gives them.

**How will faculty exercise governance over AI in their courses?**

Faculty authority over course content and academic standards should extend to AI. The policy should establish that faculty have the right to configure AI for their courses and provide the infrastructure to make that practically possible. A policy that says "faculty may set expectations about AI use" without giving faculty actual tools to shape AI behavior is largely symbolic.

**What constitutes appropriate use in different assessment contexts?**

The answer varies significantly across assignment types, disciplines, and learning objectives. A blanket policy that treats all AI use the same misses the important distinctions. The policy should establish a framework for thinking about this: not a single rule, but a principled way of distinguishing contexts where AI supports learning from contexts where it substitutes for it.

**How will the institution learn and adapt?**

AI capabilities are changing quickly. A policy written today will need revision within 18 months. Build in a review cadence. Establish who is responsible for tracking developments in AI capability and educational research on AI in learning. Make the policy a living document rather than a one-time exercise.

## Common Mistakes

Treating this as an academic integrity policy. Academic integrity is one dimension of this. It's not the whole framework. A policy that's primarily about what students aren't allowed to do misses the affirmative question of what good AI-enabled learning looks like.

Writing for today's tools. If the policy specifies particular platforms or particular capabilities, it'll be outdated quickly. Write for principles and let implementation guidance handle specifics.

Excluding faculty from the drafting process. Policy written without faculty input tends to reflect administrative and legal concerns more than educational ones. Faculty governance structures should have a substantial voice in how AI policy is developed.

Treating compliance as the goal. A policy that students follow because they're afraid of getting caught produces different behavior than a policy that reflects genuine shared understanding of what good academic practice looks like in an AI-enabled environment. Aim for the latter.

## What Good Policy Makes Possible

A well-designed AI policy doesn't just mitigate risk. It creates conditions in which AI can be used productively, where students know what's expected, faculty have the tools to govern the AI in their courses, and the institution has visibility into what's actually happening in the learning environment.

That foundation makes the educational case for AI possible: structured tools that extend what faculty can teach, that support students outside of office hours, that give faculty feedback about where their courses are working. None of that happens without a governance framework that makes it safe to try.
    `.trim(),
    author: {
      name: 'Kelly Wen',
      title: 'Co-Founder, EdPilot',
    },
    category: 'Academic Policy',
    readingTime: 6,
  },

  // ─── Article 13 ─────────────────────────────────────────────────────────────
  {
    slug: 'ai-improve-learning-without-replacing-professors',
    title: 'How AI Can Improve Learning Without Replacing Professors',
    excerpt:
      'The replacement fear keeps coming up, and it keeps distracting from the more interesting question: what can AI do that creates space for professors to do the things only professors can do?',
    content: `
## The Fear That Keeps Getting in the Way

Spend enough time talking with faculty about AI and the replacement question surfaces eventually. Sometimes as a genuine worry. Sometimes as a rhetorical move designed to shut down the conversation. Either way, it gets in the way of a more useful question.

The more useful question isn't whether AI will replace professors. It won't, at least not in any recognizable form of higher education. The more useful question is: what can AI do that creates space for professors to do the things only professors can do?

## What AI Is Actually Good At in Educational Contexts

AI is good at being available. A professor has office hours; an AI has no hours. Students who are confused at 10pm on a Thursday before an exam have a professor's recorded lectures and each other, which is often insufficient. AI can fill that gap, not with the professor's depth of judgment, but with the ability to explain a concept another way, generate a practice problem, or help a student identify where their understanding breaks down.

AI is good at patience with repetitive questions. A professor who has explained what a p-value is for the four hundredth time in their career may not explain it as well as they did the first time. The AI doesn't have this problem.

AI is good at scale. A professor with 150 students in a survey course can't give each one individualized attention. AI that's grounded in the course materials can provide something closer to individualized explanations at scale, not as good as what the professor would provide one-on-one, but meaningfully better than nothing.

## What Professors Are Actually Good At

Everything AI is not.

Professors know their students in a way no AI system does. They recognize when a question reflects a deeper confusion than the student is articulating. They know when a student who seems to understand something hasn't yet encountered the edge case that will reveal the gap. They can tell when someone is struggling with motivation rather than with content.

Professors understand their discipline with a depth that current AI doesn't approach. They know the contested questions, the debates that are still live, the areas where the textbook is out of date or oversimplified. They know what matters and why, not just what the current consensus says, but why the current consensus is what it is and where it might be wrong.

Professors exercise judgment about individual students' educational trajectories in ways that require knowing those students. Academic accommodations, extensions, letters of recommendation, honest feedback about career fit: all of these require a human relationship.

## The Productive Complement

The productive framing isn't AI versus professors. It's AI handling the tasks that scale poorly and degrade with repetition, freeing professor attention for the tasks that require human judgment and depth.

When AI handles the fourteenth explanation of a concept in a week, the professor has more energy for the conversations that require their actual expertise. When AI handles questions at 11pm, students arrive at office hours having already worked through the basic confusions, which makes those office hours conversations better.

That's not a technology-utopia argument. It's a resource-allocation argument. Professor time and attention are finite. Deploying them on the tasks that most require human judgment, while letting well-designed AI handle the tasks that don't, is just a sensible use of the available resources.

The fear of replacement makes sense as a response to a technology that's trying to do everything. It makes less sense as a response to a technology that's specifically designed to extend faculty reach rather than circumvent faculty judgment.
    `.trim(),
    author: {
      name: 'David Laszczkowski',
      title: 'Co-Founder, EdPilot',
    },
    category: 'Faculty Perspectives',
    readingTime: 5,
  },

  // ─── Article 14 ─────────────────────────────────────────────────────────────
  {
    slug: 'what-happens-when-every-student-has-an-ai-tutor',
    title: 'What Happens When Every Student Has an AI Tutor?',
    excerpt:
      'Access to one-on-one tutoring has always been one of the most powerful predictors of learning outcomes. It\'s also always been unevenly distributed. AI changes both of those facts simultaneously.',
    content: `
## The Access Problem AI Is Actually Solving

For most of the history of higher education, access to one-on-one academic support has been unevenly distributed in ways that mostly track with resources. Students at well-funded institutions have tutoring centers, abundant TA support, small discussion sections, and faculty who have time for them. Students at under-resourced institutions, or students who can't afford private tutoring, or students with work and family obligations that constrain when they can seek help: these students have always operated with a meaningful disadvantage.

AI-supported learning changes this. A student who can access AI that knows their course materials and can explain concepts in multiple ways, at any hour, doesn't have an advantage equivalent to private tutoring, but they have something meaningfully better than nothing, at a cost approaching nothing.

This is one of the genuinely significant things about the current moment. The access question is changing.

## What the Research on Tutoring Actually Says

The educational research on one-on-one tutoring is fairly consistent: individual tutoring, done well, substantially improves learning outcomes compared to lecture-based instruction. The effect size in well-designed studies is large enough that researchers have spent decades trying to understand why and how to replicate it at scale.

The reasons tend to cluster around a few mechanisms. Tutors catch misunderstandings immediately rather than letting them compound. Tutors adjust explanation depth and approach to the individual student's responses. Tutors maintain productive engagement rather than letting attention drift. Tutors provide immediate feedback on practice.

AI that's well-designed for educational contexts can replicate some of these mechanisms. Not all (the relationship component of effective tutoring isn't easily replicated), but the feedback and adaptation dimensions are addressable.

## The Risks of Getting It Wrong

The positive case for AI tutoring is real. So are the risks of implementing it poorly.

AI that's optimized for student satisfaction rather than learning tends to produce students who feel good about their understanding without developing it. AI that smooths all productive difficulty out of the learning process removes the struggle that produces durable knowledge. AI that's unconnected to course materials builds confidence grounded in potentially wrong answers.

The design choices matter enormously. AI that guides students toward answers through questions produces different outcomes than AI that provides answers. AI that requires students to demonstrate understanding before moving forward produces different outcomes than AI that accepts any response as engagement.

Getting these design choices right requires people who understand how learning works, which is primarily faculty.

## What Changes About the Classroom

If AI significantly improves the availability of foundational support (explanations, practice, conceptual clarification), the nature of what the classroom needs to do changes.

Class time that was previously devoted to explaining concepts students could get elsewhere becomes available for something else: application, discussion, analysis, synthesis, the things that require a room full of people engaging with ideas together.

This is already happening in fields that have experimented with flipped classroom models. The potential with AI-supported preparation is that students arrive with more robust foundational understanding, making the in-class time more productive.

The professors who adapt to this most effectively will be the ones who think clearly about what their class time is for and design accordingly, not assuming it needs to do the same things it did before, but asking what it can accomplish that AI-supported study can't.
    `.trim(),
    author: {
      name: 'Kelly Wen',
      title: 'Co-Founder, EdPilot',
    },
    category: 'Future of Universities',
    readingTime: 6,
  },

  // ─── Article 15 ─────────────────────────────────────────────────────────────
  {
    slug: 'ai-native-universities',
    title: 'The Next Generation of Learning Platforms: What AI-Native Universities Will Look Like',
    excerpt:
      'The AI-native university isn\'t one where AI has been added to existing processes. It\'s one where the learning environment was designed from the start with AI as a component, and the two are quite different.',
    content: `
## The Difference Between "AI-Added" and "AI-Native"

Most of what's happening in higher education right now is AI-added. An existing course, an existing LMS, an existing set of academic policies, and somewhere in there AI has been incorporated, with varying degrees of thought about how it fits.

This produces a specific kind of friction. The AI is being asked to plug into structures that weren't designed for it. The policies weren't written with it in mind. The assessments weren't designed considering its existence. The faculty governance mechanisms don't include it. The result is a kind of ongoing improvisation: reasonable people trying to figure out how to manage a thing that the institution's infrastructure doesn't know how to handle.

The AI-native university is something different. It's an institution where the learning environment was designed from the start with AI as a component of the educational infrastructure, the way libraries and labs and LMSs are components. This doesn't exist yet in any mature form. But it's possible to see what it points toward.

## What Changes About Course Design

In an AI-native environment, faculty design courses knowing that students will have access to AI support grounded in the course materials. This changes the design question.

Instead of "how do I structure this lecture to explain this concept," the question becomes "what do I need to be present for, and what can AI-supported engagement outside of class handle?" Instead of designing assessments primarily to prevent AI-assisted shortcuts, the question becomes "what evidence of understanding requires human reasoning in context that AI can't substitute for?"

These are good questions that make courses better independently of AI. AI just makes them necessary to ask.

## What Changes About the Student Experience

In an AI-native learning environment, students have access to course-specific support that's available when they need it, adapts to their current level of understanding, and provides feedback rather than just answers.

The experience of being stuck, confused about a concept with no good option except waiting for office hours, becomes less common. The experience of getting immediate feedback on practice work, calibrated to the specific course framework, becomes more common.

This doesn't eliminate the role of human instruction. It raises the quality of the baseline support available to students, which raises the level at which human instruction can engage.

## What Changes About Assessment

Assessment in an AI-native environment has to be designed with a clear view of what it's actually measuring.

The shift isn't away from rigor. It's toward rigor that's specifically targeted at human reasoning. Assessments that require students to synthesize specific course materials, apply frameworks to novel cases, defend positions under questioning, or produce work that demonstrates discipline-specific judgment are assessments that AI can support preparation for but can't complete.

The assessments that don't survive this shift (produce an essay, summarize a reading, apply a formula) probably weren't measuring the most important things anyway.

## The Timeline

This isn't a ten-year projection. The foundational infrastructure for AI-native learning environments exists today. Curriculum-grounded AI systems, faculty governance tools, interaction analytics: these are buildable with current technology.

What takes time is the institutional adaptation: the curriculum review cycles, the faculty development, the policy revision, the assessment redesign. These don't happen overnight. But institutions that start building the AI-native infrastructure now will be further along when the broader adaptation catches up.

The alternative is continuing to improvise: adapting existing structures to a thing they weren't designed for, with diminishing returns as AI capabilities continue to advance. At some point, the cost of that ongoing improvisation exceeds the cost of building something designed to work.
    `.trim(),
    author: {
      name: 'David Laszczkowski',
      title: 'Co-Founder, EdPilot',
    },
    category: 'Future of Universities',
    readingTime: 6,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((post) => post.featured) ?? blogPosts[0]
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPost(slug)
  if (!current) return blogPosts.slice(0, limit)

  const sameCategory = blogPosts.filter(
    (p) => p.slug !== slug && p.category === current.category
  )
  const others = blogPosts.filter(
    (p) => p.slug !== slug && p.category !== current.category
  )

  return [...sameCategory, ...others].slice(0, limit)
}

export const ALL_CATEGORIES: BlogCategory[] = [
  'AI in Education',
  'Academic Policy',
  'Faculty Perspectives',
  'Future of Universities',
  'Product Updates',
]
