import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const STEPS = [
  { step: 1, title: "Free Profile Review", href: "/contact" },
  { step: 2, title: "University & Scholarship Shortlisting", href: "/universities" },
  { step: 3, title: "Application Submission", href: "/intake-calendar" },
  { step: 4, title: "Visa & Accommodation Support", href: "/visa-guidance" },
  { step: 5, title: "Pre-Departure & Arrival Assistance", href: "/student-portal" },
];

export function JourneySteps() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="mb-12 space-y-2 text-center">
          <h2 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
            Your Journey in {STEPS.length} Steps
          </h2>
          <p className="mx-auto max-w-lg text-navy/60">
            A clear, guided path from your first counselling session to landing in your new campus.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-2xl bg-navy px-6 py-10 sm:px-10">
          {/* Horizontal timeline (desktop) */}
          <ol
            className="hidden md:grid"
            style={{ gridTemplateColumns: `repeat(${STEPS.length}, 1fr)` }}
          >
            {STEPS.map((step, index) => {
              const above = index % 2 === 0;
              return (
                <li key={step.step} className="relative flex h-64 flex-col items-center">
                  {/* dashed connecting line */}
                  <span
                    aria-hidden
                    className={`absolute top-1/2 h-0 -translate-y-1/2 border-t-2 border-dashed border-white/30 ${
                      index === 0
                        ? "left-1/2 right-0"
                        : index === STEPS.length - 1
                          ? "left-0 right-1/2"
                          : "left-0 right-0"
                    }`}
                  />
                  {/* label above */}
                  <div className={`flex h-1/2 w-full flex-col items-center ${above ? "justify-start" : ""}`}>
                    {above && (
                      <>
                        <Link
                          href={step.href}
                          className="px-2 text-center text-base font-semibold leading-[1.5] text-white transition-colors hover:text-gold-bright"
                        >
                          {step.title}
                        </Link>
                        <span aria-hidden className="mt-2 w-px flex-1 bg-white/60" />
                      </>
                    )}
                  </div>
                  {/* numbered dot */}
                  <Link
                    href={step.href}
                    aria-label={step.title}
                    className="relative z-10 flex h-10 w-10 shrink-0 -translate-y-1/2 items-center justify-center rounded-full bg-white font-heading text-sm font-bold text-navy shadow-lg ring-4 ring-white/20 transition-transform hover:scale-110 hover:ring-gold-bright/60"
                  >
                    {step.step}
                  </Link>
                  {/* label below */}
                  <div className="flex h-1/2 w-full -translate-y-10 flex-col items-center">
                    {!above && (
                      <>
                        <span aria-hidden className="mb-2 w-px flex-1 bg-white/60" />
                        <Link
                          href={step.href}
                          className="px-2 text-center text-base font-semibold leading-[1.5] text-white transition-colors hover:text-gold-bright"
                        >
                          {step.title}
                        </Link>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Vertical timeline (mobile) */}
          <ol className="flex flex-col gap-6 md:hidden">
            {STEPS.map((step, index) => (
              <li key={step.step} className="relative flex items-center gap-4">
                {index < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-5 top-10 h-full w-px border-l-2 border-dashed border-white/30"
                  />
                )}
                <Link href={step.href} className="group flex items-center gap-4">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-heading text-sm font-bold text-navy ring-4 ring-white/20 transition-transform group-hover:scale-110">
                    {step.step}
                  </span>
                  <p className="text-base font-semibold leading-[1.5] text-white transition-colors group-hover:text-gold-bright">
                    {step.title}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
