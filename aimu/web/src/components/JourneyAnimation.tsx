"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type Step = {
  milestone?: string;
  quote?: string;
  icon: string;
  title: string;
  body: ReactNode;
  chips?: string[];
};

// One flat left-to-right sequence. `milestone`/`quote` mark where a new phase begins.
const STEPS: Step[] = [
  {
    milestone: "01",
    quote: "“I want to study abroad.”",
    icon: "school",
    title: "Free profile review goes live",
    body: (
      <>
        Share your marks, budget, and goals &mdash; done in under 2 minutes. You get a{" "}
        <span className="rounded bg-gold-bright/20 px-1 text-navy">shareable shortlist link</span> in your inbox.
      </>
    ),
    chips: ["Ready in 2 min", "No fees to start"],
  },
  {
    milestone: "02",
    quote: "“Time to shortlist.”",
    icon: "campaign",
    title: "Counsellor matches universities",
    body: (
      <>
        One session sends your profile to{" "}
        <span className="rounded bg-gold-bright/20 px-1 text-navy">every matching course &amp; scholarship</span>.
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
        <span className="rounded bg-gold-bright/20 px-1 text-navy">Live dashboard</span> &mdash; offer status, visa
        stage, real-time updates.
      </>
    ),
    chips: ["Real-Time", "Export"],
  },
  {
    milestone: "03",
    quote: "“How do I fund this?”",
    icon: "account_balance",
    title: "Add your bank & loan details",
    body: (
      <>
        Link your documents in settings &mdash;{" "}
        <span className="rounded bg-gold-bright/20 px-1 text-navy">one-time setup</span>, takes 30 seconds.
      </>
    ),
    chips: ["One-Time Setup", "Secure"],
  },
  {
    icon: "schedule",
    title: "Sanction in 3–7 days",
    body: (
      <>
        Once approved, your loan is{" "}
        <span className="rounded bg-gold-bright/20 px-1 text-navy">automatically disbursed to the university</span>. No
        chasing.
      </>
    ),
    chips: ["Auto Disbursal", "3–7 Days"],
  },
  {
    milestone: "04",
    quote: "“Let's land the offer.”",
    icon: "flight_takeoff",
    title: "Pre-departure & beyond",
    body: (
      <>
        Every document is saved.{" "}
        <span className="rounded bg-gold-bright/20 px-1 text-navy">Import your profile</span> into visa interviews and
        pre-departure briefings, and land ready.
      </>
    ),
    chips: ["Doc Vault", "Alumni Network"],
  },
];

export function JourneyAnimation() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      const pct = max > 0 ? el.scrollLeft / max : 1;
      setProgress(Math.min(1, Math.max(0, pct)));
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft >= max - 4);
    }

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function nudge(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: "smooth" });
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-bright/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              # Your Study-Abroad Journey
            </span>
            <h2 className="font-heading text-2xl font-bold text-navy sm:text-4xl">
              You have a dream university.{" "}
              <span className="text-emerald">Here&rsquo;s how it happens.</span>
            </h2>
            <p className="text-sm text-navy/50">Scroll or drag sideways to follow every step &rarr;</p>
          </div>

          {/* Prev / next controls */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Previous steps"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition-opacity hover:bg-light-gray disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="Next steps"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition-opacity hover:bg-light-gray disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>
        </div>
      </Reveal>

      {/* Progress rail */}
      <div className="relative mb-6 h-1 w-full overflow-hidden rounded-full bg-navy/10">
        <div
          aria-hidden
          className="h-full rounded-full bg-gradient-to-r from-emerald to-gold-bright transition-[width] duration-150 ease-out"
          style={{ width: `${Math.max(6, progress * 100)}%` }}
        />
      </div>

      <div className="relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={scrollerRef}
          className="snap-carousel flex gap-4 overflow-x-auto pb-4 sm:gap-5"
        >
          {STEPS.map((step, i) => (
            <article
              key={step.title}
              className="flex h-[300px] w-[260px] shrink-0 flex-col rounded-2xl border border-navy/10 bg-white p-5 shadow-[0_10px_30px_-12px_rgba(10,25,47,0.12)] sm:h-[320px] sm:w-[300px]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/5 font-heading text-xs font-bold text-navy">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="material-symbols-outlined text-2xl text-emerald">{step.icon}</span>
              </div>

              {step.quote && (
                <p className="mt-3 font-heading text-sm font-semibold italic text-gold">{step.quote}</p>
              )}

              <h3 className="mt-2 font-semibold leading-snug text-navy">{step.title}</h3>
              <p className="mt-1.5 flex-1 overflow-hidden text-sm leading-relaxed text-navy/70">{step.body}</p>

              {step.chips && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {step.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-navy/10 bg-light-gray px-2 py-0.5 text-[11px] font-medium text-navy/60"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
