import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Test Preparation — AIMU Global",
  description:
    "Prepare for IELTS, PTE, TOEFL, Duolingo, GRE and GMAT with expert trainers, structured study plans, and mock tests.",
};

const EXAMS = [
  { flag: "🇬🇧", name: "IELTS Academic" },
  { flag: "🇬🇧", name: "IELTS General Training" },
  { flag: "🇬🇧", name: "PTE Academic" },
  { flag: "🇺🇸", name: "TOEFL iBT" },
  { flag: "🦉", name: "Duolingo English Test" },
  { flag: "🎓", name: "GRE" },
  { flag: "🎓", name: "GMAT" },
  { flag: "🩺", name: "OET", comingSoon: true },
  { flag: "🩺", name: "NCLEX", comingSoon: true },
  { flag: "💻", name: "CBT", comingSoon: true },
];

const OFFERINGS = [
  "Expert Trainers",
  "Small Batch Classes",
  "One-to-One Coaching",
  "Flexible Online & Offline Classes",
  "Mock Tests",
  "Speaking Practice",
  "Writing Evaluation",
  "Reading & Listening Practice",
  "Study Materials",
  "Performance Tracking",
  "Exam Booking Guidance",
];

const PROCESS_STEPS = [
  "Free Assessment",
  "Skill Evaluation",
  "Choose Your Course",
  "Expert Training",
  "Weekly Mock Tests",
  "Personal Feedback",
  "Final Exam Preparation",
  "Book Your Exam",
  "Achieve Your Target Score",
];

const WHY_CHOOSE = [
  "Certified Trainers",
  "Personalized Learning Plans",
  "Flexible Timings",
  "Regular Mock Exams",
  "Individual Progress Reports",
  "High Success Rate",
  "Complete Admission & Visa Support After Your Exam",
];

const RESULTS = [
  { score: "8.5", exam: "IELTS Band" },
  { score: "79+", exam: "PTE Academic" },
  { score: "110+", exam: "TOEFL iBT" },
  { score: "140+", exam: "Duolingo" },
];

export default function TestPreparationPage() {
  return (
    <>
      <PageHeader
        title="Test Preparation"
        subtitle="Helping you achieve your target score with expert trainers, structured study plans, and mock tests."
      />

      {/* Exams */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">Exams We Offer</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMS.map((exam, index) => (
            <Reveal key={exam.name} delay={index * 60}>
              <div className="hover-lift flex items-center justify-between rounded-2xl border border-light-gray p-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{exam.flag}</span>
                  <p className="font-heading font-semibold text-navy">{exam.name}</p>
                </div>
                {exam.comingSoon && (
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-navy">
                    Coming Soon
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What students get */}
      <section className="bg-light-gray py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">What Students Get</h2>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERINGS.map((item, index) => (
              <Reveal key={item} delay={index * 50}>
                <li className="flex items-center gap-3 rounded-xl bg-white p-4">
                  <span className="text-gold">✔</span>
                  <span className="text-sm font-medium text-navy">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Learning process */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">Learning Process</h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-y-5">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal key={step} delay={index * 70} className="flex items-center">
              <div className="flex items-center gap-3 rounded-full bg-light-gray px-5 py-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-navy">{step}</span>
              </div>
              {index < PROCESS_STEPS.length - 1 && <span className="mx-2 text-gold">→</span>}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-center text-2xl font-bold sm:text-3xl">Why Choose AIMU Test Preparation?</h2>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {WHY_CHOOSE.map((item, index) => (
              <Reveal key={item} delay={index * 60}>
                <li className="flex items-center gap-3 rounded-xl bg-white/5 p-4">
                  <span className="text-gold">✔</span>
                  <span className="text-sm text-white/90">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">Student Results</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-navy/70">
            Scores our students achieve with structured training and weekly mock tests.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {RESULTS.map((result, index) => (
            <Reveal key={result.exam} delay={index * 90}>
              <div className="hover-lift rounded-2xl bg-light-gray p-6 text-center">
                <p className="font-heading text-3xl font-bold text-navy">{result.score}</p>
                <p className="mt-1 text-sm text-navy/60">{result.exam}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-navy/50">
          Student testimonials and scorecards are shared with their permission.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-20 text-center">
        <Reveal>
          <div className="rounded-2xl bg-gold/10 p-10">
            <h2 className="font-heading text-xl font-bold text-navy">Start with a Free Assessment</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-navy/70">
              We evaluate your current level, recommend the right exam and course, and build a study plan around your
              target score.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full bg-navy px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-navy/90"
            >
              Book Your Free Assessment
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
