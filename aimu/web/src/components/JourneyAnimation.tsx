"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";

type SubStep = {
  icon: string;
  title: string;
  body: React.ReactNode;
  chips?: string[];
};

type Milestone = {
  index: string;
  quote: string;
  large?: boolean;
  steps: SubStep[];
};

const MILESTONES: Milestone[] = [
  {
    index: "01",
    quote: "“I want to study abroad.”",
    steps: [
      {
        icon: "school",
        title: "Free profile review goes live",
        body: (
          <>
            Share your marks, budget, and goals &mdash; done in under 2 minutes. You get a{" "}
            <span className="rounded bg-gold-bright/20 px-1 text-navy">shareable shortlist link</span>{" "}
            in your inbox.
          </>
        ),
        chips: ["Ready in 2 min", "No fees to start"],
      },
    ],
  },
  {
    index: "02",
    quote: "“Time to shortlist.”",
    steps: [
      {
        icon: "campaign",
        title: "Counsellor matches universities",
        body: (
          <>
            One session sends your profile to{" "}
            <span className="rounded bg-gold-bright/20 px-1 text-navy">every matching course & scholarship</span>.
          </>
        ),
        chips: ["1:1 Sessions", "Scholarship Match"],
      },
      {
        icon: "forum",
        title: "Applications become offers",
        body: (
          <>
            Once you pick a course, our team{" "}
            <span className="rounded bg-gold-bright/20 px-1 text-navy">instantly starts the application</span>.
          </>
        ),
      },
      {
        icon: "payments",
        title: "They approve, you get funded",
        body: <>Loan and scholarship paperwork &mdash; tracked live on your portal. No follow-ups needed.</>,
        chips: ["Loan Assist", "Fee Waivers"],
      },
      {
        icon: "notifications_active",
        title: "Auto reminders via WhatsApp",
        body: <>1 week, 1 day, 1 hour before every deadline.</>,
        chips: ["WhatsApp", "Auto Reminders"],
      },
      {
        icon: "task_alt",
        title: "Visa prep takes minutes",
        body: (
          <>
            Upload docs on your portal, done.{" "}
            <span className="rounded bg-gold-bright/20 px-1 text-navy">Missing doc? Instant alert.</span>
          </>
        ),
        chips: ["Doc Vault", "Instant Alert"],
      },
      {
        icon: "groups",
        title: "You know where you stand",
        body: (
          <>
            <span className="rounded bg-gold-bright/20 px-1 text-navy">Live dashboard</span> &mdash; offer status,
            visa stage, real-time updates.
          </>
        ),
        chips: ["Real-Time", "Export"],
      },
    ],
  },
  {
    index: "03",
    quote: "“How do I fund this?”",
    steps: [
      {
        icon: "account_balance",
        title: "Add your bank & loan details",
        body: (
          <>
            Link your documents in settings &mdash; <span className="rounded bg-gold-bright/20 px-1 text-navy">one-time setup</span>, takes 30 seconds.
          </>
        ),
        chips: ["One-Time Setup", "Secure"],
      },
      {
        icon: "schedule",
        title: "Sanction in 3–7 days",
        body: <>Once approved, your loan is <span className="rounded bg-gold-bright/20 px-1 text-navy">automatically disbursed to the university</span>. No chasing.</>,
        chips: ["Auto Disbursal", "3–7 Days"],
      },
    ],
  },
  {
    index: "04",
    quote: "“Let's land the offer.”",
    large: true,
    steps: [
      {
        icon: "flight_takeoff",
        title: "Pre-departure & beyond",
        body: (
          <>
            Every document is saved.{" "}
            <span className="rounded bg-gold-bright/20 px-1 text-navy">Import your profile</span> into visa
            interviews and pre-departure briefings, and land ready.
          </>
        ),
        chips: ["Doc Vault", "Alumni Network"],
      },
    ],
  },
];

export function JourneyAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height + viewportH;
      const covered = viewportH - rect.top;
      const pct = Math.min(1, Math.max(0, covered / total));
      setProgress(pct);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="mb-16 space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-bright/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
            # Your Study-Abroad Journey
          </span>
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            You have a dream university.
            <br />
            <span className="text-emerald">Here&rsquo;s how it happens.</span>
          </h2>
        </div>
      </Reveal>

      <div ref={containerRef} className="relative">
        {/* Track */}
        <div
          aria-hidden
          className="absolute left-5 top-2 bottom-2 w-px bg-navy/10 sm:left-6"
        />
        {/* Animated fill */}
        <div
          aria-hidden
          className="absolute left-5 top-2 w-px bg-gradient-to-b from-emerald to-gold-bright transition-[height] duration-150 ease-out sm:left-6"
          style={{ height: `calc(${progress * 100}% - 8px)` }}
        />

        <ol className="space-y-14">
          {MILESTONES.map((milestone) => (
            <li key={milestone.index} className="relative pl-14 sm:pl-16">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-navy/20 bg-white font-heading text-xs font-bold text-navy shadow-sm sm:h-12 sm:w-12 -ml-14 sm:-ml-16"
                  >
                    {milestone.index}
                  </span>

                  <p
                    className={`font-heading italic text-navy ${
                      milestone.large ? "text-3xl font-bold sm:text-4xl" : "text-xl font-semibold sm:text-2xl"
                    }`}
                  >
                    {milestone.quote}
                  </p>
                </div>
              </Reveal>

              {milestone.steps.length > 0 && (
                <div className="mt-6 space-y-6">
                  {milestone.steps.map((step, i) => (
                    <Reveal key={step.title} delay={i * 80}>
                      <div className="flex gap-3">
                        <span className="material-symbols-outlined mt-0.5 shrink-0 text-lg text-emerald">
                          {step.icon}
                        </span>
                        <div>
                          <p className="font-semibold text-navy">{step.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-navy/70">{step.body}</p>
                          {step.chips && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {step.chips.map((chip) => (
                                <span
                                  key={chip}
                                  className="rounded-full border border-navy/10 bg-light-gray px-2.5 py-1 text-xs font-medium text-navy/60"
                                >
                                  {chip}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
