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
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const pin = pinRef.current;
    const scroller = scrollerRef.current;
    if (!pin || !scroller) return;

    function onScroll() {
      if (!pin || !scroller) return;
      const rect = pin.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // rect.height = viewportH (pinned) + the extra scroll runway added below.
      const runway = rect.height - viewportH;
      if (runway <= 0) return;
      const pct = Math.min(1, Math.max(0, -rect.top / runway));
      setProgress(pct);
      const max = scroller.scrollWidth - scroller.clientWidth;
      scroller.scrollLeft = pct * max;
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
    <section ref={pinRef} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 flex h-[calc(100vh-60px)] flex-col justify-center overflow-hidden py-10 sm:h-screen sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <Reveal>
            <div className="mb-10 space-y-3 sm:mb-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-bright/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                # Your Study-Abroad Journey
              </span>
              <h2 className="font-heading text-2xl font-bold text-navy sm:text-4xl">
                You have a dream university.{" "}
                <span className="text-emerald">Here&rsquo;s how it happens.</span>
              </h2>
              <p className="text-sm text-navy/50">Keep scrolling to follow the journey &rarr;</p>
            </div>
          </Reveal>

          {/* Runway progress bar — a plane taxis along it as you scroll */}
          <div className="relative mb-8 h-8 w-full">
            {/* asphalt */}
            <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-sm bg-[#1a1a1a]" />
            {/* runway centre markings */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[repeating-linear-gradient(90deg,theme(colors.white)_0_10px,transparent_10px_22px)]"
            />
            {/* covered distance */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 top-1/2 h-3 -translate-y-1/2 rounded-sm bg-white/25 transition-[width] duration-100 ease-out"
              style={{ width: `${Math.max(3, progress * 100)}%` }}
            />
            {/* the plane */}
            <svg
              viewBox="0 0 64 24"
              fill="currentColor"
              aria-hidden="true"
              className="absolute top-1/2 h-6 w-9 -translate-y-1/2 text-[#1a1a1a] drop-shadow-[0_4px_6px_rgba(10,25,47,0.35)] transition-[left] duration-100 ease-out"
              style={{ left: `calc(${Math.max(3, progress * 100)}% - 18px)` }}
            >
              <path d="M2 13.2c0-.7.6-1.2 1.3-1.1l14.2 1.9 8-8.6c.3-.3.7-.5 1.1-.5h2.6c.5 0 .8.5.6.9l-4.3 8.6 13.6.4 4.6-4.1c.2-.2.5-.3.8-.3h2c.4 0 .7.4.5.8l-2.6 5.1 2.6 5.1c.2.4-.1.8-.5.8h-2c-.3 0-.6-.1-.8-.3l-4.6-4.1-13.6.4 4.3 8.6c.2.4-.1.9-.6.9h-2.6c-.4 0-.8-.2-1.1-.5l-8-8.6-14.2 1.9C2.6 20.4 2 19.9 2 19.2v-6z" />
            </svg>
          </div>
        </div>

        <div className="relative">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-24" />

          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-hidden px-6 pb-4 sm:gap-5 sm:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
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
      </div>
    </section>
  );
}
