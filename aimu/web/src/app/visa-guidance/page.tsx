import Link from "next/link";
import { client } from "@/sanity/client";
import { VISA_GUIDANCE_INDEX_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: "Complete Visa Guidance — AIMU Global" };

const TRACKER_STAGES = [
  {
    icon: "verified_user",
    title: "Profile Audit",
    description: "Initial evaluation of academic and financial credentials.",
    status: "done" as const,
  },
  {
    icon: "folder_shared",
    title: "Doc Compilation",
    description: "Systematic organization of the mandatory checklist.",
    status: "done" as const,
  },
  {
    icon: "send_and_archive",
    title: "Embassy Filing",
    description: "Official submission and slot booking for biometrics.",
    status: "active" as const,
  },
  {
    icon: "workspace_premium",
    title: "Final Grant",
    description: "Passport stamping and pre-departure orientation.",
    status: "pending" as const,
  },
];

const ROADMAP_STEPS = [
  {
    title: "Strategic Assessment",
    description: "Personalized evaluation of your background to identify potential red flags and strength points.",
  },
  {
    title: "Financial Grooming",
    description: "Guidance on fund presentation, sponsorships, and proof of income to meet strict embassy standards.",
  },
  {
    title: "SOP & Documentation",
    description: "Expert assistance in crafting a compelling Statement of Purpose that aligns with visa intentions.",
  },
  {
    title: "Mock Interviews",
    description: "Intensive simulation sessions with experienced counsellors to build confidence and refine responses.",
  },
  {
    title: "Application Filing",
    description: "Precision submission of the final dossier through official government portals and tracking.",
  },
];

export default async function VisaGuidancePage() {
  const [destinations, siteSettings] = await Promise.all([
    client.fetch(VISA_GUIDANCE_INDEX_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
  ]);

  const visaStat = siteSettings?.stats?.find((s) => s.label?.toLowerCase().includes("visa"));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-ink px-6 pb-32 pt-20 text-white">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span
              className="animate-hero inline-block rounded-full bg-gold px-4 py-1 text-xs font-semibold uppercase tracking-widest text-navy"
              style={{ "--hero-delay": "0ms" } as React.CSSProperties}
            >
              Premier Visa Concierge
            </span>
            <h1
              className="animate-hero mt-6 font-heading text-4xl font-bold leading-tight sm:text-6xl"
              style={{ "--hero-delay": "120ms" } as React.CSSProperties}
            >
              Your Global Future,
              <br />
              <span className="text-gold-bright">Certified.</span>
            </h1>
            <p
              className="animate-hero mt-8 max-w-lg text-lg text-white/80"
              style={{ "--hero-delay": "240ms" } as React.CSSProperties}
            >
              Navigating the complexities of international student visas with an industry-leading
              success rate. We turn bureaucratic hurdles into a seamless journey toward your academic
              dreams.
            </p>
            <div
              className="animate-hero mt-10 flex flex-wrap gap-4"
              style={{ "--hero-delay": "360ms" } as React.CSSProperties}
            >
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-xl bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-navy transition-transform hover:scale-105"
              >
                <span className="material-symbols-outlined">description</span> Start Assessment
              </Link>
              <a
                href="#roadmap"
                className="rounded-xl border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-navy"
              >
                View Roadmap
              </a>
            </div>
          </div>

          {/* Stats card */}
          <div className="relative hidden lg:block">
            <div className="ml-auto max-w-sm rounded-2xl border border-gold/30 bg-white/95 p-10 shadow-2xl backdrop-blur">
              <div className="font-heading text-5xl font-bold text-navy">
                {visaStat?.value ?? "98%"}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-navy/60">
                {visaStat?.label ?? "Visa Approval Rate"}
              </div>
              <div className="mt-6 flex -space-x-3">
                <div className="h-10 w-10 rounded-full border-2 border-white bg-light-gray" />
                <div className="h-10 w-10 rounded-full border-2 border-white bg-navy/20" />
                <div className="h-10 w-10 rounded-full border-2 border-white bg-gold/40" />
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-navy text-[10px] font-bold text-white">
                  +2k
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Success Tracker */}
      <section className="bg-light-gray/60 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="mb-4 font-heading text-3xl font-semibold text-navy sm:text-4xl">
                  Visa Success Tracker
                </h2>
                <p className="max-w-xl text-navy/60">
                  Monitor your journey in real-time. Our tracking system keeps you updated on every
                  micro-step of the approval process.
                </p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald" /> Completed
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-gold" /> In Progress
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {TRACKER_STAGES.map((stage, index) => (
              <Reveal key={stage.title} delay={index * 90}>
                <div
                  className={`h-full rounded-2xl bg-white p-8 transition-all ${
                    stage.status === "active"
                      ? "border-2 border-gold shadow-md"
                      : stage.status === "pending"
                        ? "border border-navy/10 opacity-60"
                        : "border border-navy/10 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        stage.status === "done"
                          ? "bg-emerald/10 text-emerald"
                          : stage.status === "active"
                            ? "bg-gold/15 text-gold"
                            : "bg-light-gray text-navy/40"
                      }`}
                    >
                      <span className="material-symbols-outlined">{stage.icon}</span>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        stage.status === "done"
                          ? "text-emerald"
                          : stage.status === "active"
                            ? "italic text-gold"
                            : "text-navy/40"
                      }`}
                    >
                      {stage.status === "done" ? "100%" : stage.status === "active" ? "Processing" : "Pending"}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-navy">{stage.title}</h3>
                  <p className="mb-6 text-sm text-navy/60">{stage.description}</p>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-light-gray">
                    {stage.status === "done" && <div className="h-full w-full bg-emerald" />}
                    {stage.status === "active" && <div className="h-full w-2/3 animate-pulse bg-gold" />}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="bg-navy px-6 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-20 text-center">
              <h2 className="mb-6 font-heading text-3xl font-bold sm:text-5xl">Roadmap to Approval</h2>
              <p className="mx-auto max-w-2xl text-lg text-white/70">
                Our proven 5-step methodology ensures no detail is overlooked, transforming a complex
                process into a clear path.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {ROADMAP_STEPS.map((step, index) => (
              <Reveal key={step.title} delay={index * 90}>
                <div className="group">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold font-heading text-xl font-bold text-gold-bright transition-all duration-300 group-hover:bg-gold group-hover:text-navy">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h4 className="mb-4 text-lg font-semibold">{step.title}</h4>
                  <p className="text-sm text-white/70">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Universal Document Library */}
      <section className="bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12">
              <h2 className="mb-4 font-heading text-3xl font-semibold text-navy sm:text-4xl">
                Universal Document Library
              </h2>
              <p className="max-w-2xl text-lg text-navy/60">
                Country-specific requirements for your study permit application.
              </p>
            </div>
          </Reveal>

          {destinations.length === 0 ? (
            <p className="text-center text-navy/60">
              No visa guidance yet. Add it to destinations in the Sanity Studio.
            </p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {destinations.map((destination, index) => (
                <Reveal key={destination._id} delay={index * 90}>
                  <div className="h-full rounded-2xl border border-navy/15 bg-white p-8 shadow-sm transition-all hover:border-navy hover:shadow-lg">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{destination.flagEmoji ?? "🌍"}</span>
                        <h3 className="font-heading text-xl font-semibold text-navy">
                          {destination.country} Student Visa
                        </h3>
                      </div>
                      {destination.visaGuidance?.timeline && (
                        <span className="whitespace-nowrap rounded bg-navy px-3 py-1 text-xs text-white">
                          {destination.visaGuidance.timeline}
                        </span>
                      )}
                    </div>

                    {destination.visaGuidance?.documentsChecklist &&
                      destination.visaGuidance.documentsChecklist.length > 0 && (
                        <ul className="mb-6 space-y-3">
                          {destination.visaGuidance.documentsChecklist.map((doc, i) => (
                            <li key={i} className="flex items-start gap-3 text-navy/70">
                              <span className="material-symbols-outlined mt-0.5 text-sm text-emerald">
                                check_circle
                              </span>
                              {doc}
                            </li>
                          ))}
                        </ul>
                      )}

                    {destination.visaGuidance?.commonMistakes &&
                      destination.visaGuidance.commonMistakes.length > 0 && (
                        <div className="mb-6 rounded-lg bg-gold/10 p-4">
                          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gold">
                            Common Mistakes to Avoid
                          </p>
                          <ul className="space-y-1">
                            {destination.visaGuidance.commonMistakes.map((mistake, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-navy/70">
                                <span className="material-symbols-outlined mt-0.5 text-sm text-gold">
                                  warning
                                </span>
                                {mistake}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {destination.slug?.current && (
                      <Link
                        href={`/destinations/${destination.slug.current}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy transition-transform hover:translate-x-1"
                      >
                        Full {destination.country} Guide
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interview CTA */}
      <section className="bg-ink px-6 py-20 text-center text-white sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <span className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" /> Available Now
            </span>
            <h2 className="mb-8 font-heading text-3xl font-bold sm:text-5xl">Master the Visa Interview</h2>
            <p className="mx-auto mb-12 max-w-3xl text-lg text-white/70">
              Don&rsquo;t leave your future to chance. Schedule an intensive 1-on-1 session with our
              visa experts who have conducted thousands of successful mock interviews.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xl bg-gold px-10 py-5 text-base font-semibold text-navy shadow-lg shadow-gold/20 transition-all hover:scale-105"
            >
              Book Interview Prep
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
