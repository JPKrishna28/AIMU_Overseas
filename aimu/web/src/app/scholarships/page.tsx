import Link from "next/link";
import { client } from "@/sanity/client";
import { SCHOLARSHIPS_QUERY } from "@/sanity/queries";
import { Reveal } from "@/components/Reveal";
import { ScholarshipFinder } from "@/components/ScholarshipFinder";

export const metadata = { title: "Scholarships — AIMU Global" };

const ESSAY_TIPS = [
  {
    title: "Be Authentic, Not Generic",
    description:
      "Committees read thousands of essays. Share a specific personal challenge you overcame rather than reciting your CV.",
  },
  {
    title: "Map Your Future",
    description:
      "Clearly articulate how this specific scholarship helps you give back to your home country or industry.",
  },
];

export default async function ScholarshipsPage() {
  const scholarships = await client.fetch(SCHOLARSHIPS_QUERY);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-6 pb-32 pt-20 text-white">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span
              className="animate-hero inline-block rounded-full border border-gold px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-bright"
              style={{ "--hero-delay": "0ms" } as React.CSSProperties}
            >
              Financial Support
            </span>
            <h1
              className="animate-hero mt-6 font-heading text-4xl font-bold leading-tight sm:text-6xl"
              style={{ "--hero-delay": "120ms" } as React.CSSProperties}
            >
              Your Academic Excellence, <span className="text-gold-bright">Fully Funded.</span>
            </h1>
            <p
              className="animate-hero mt-8 max-w-xl text-lg text-white/80"
              style={{ "--hero-delay": "240ms" } as React.CSSProperties}
            >
              Access a curated directory of premier global scholarships. We bridge the gap between
              your potential and the resources needed to achieve it at the world&rsquo;s leading
              institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Filters + results (client) */}
      {scholarships.length === 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-center text-navy/60">No scholarships yet. Add some in the Sanity Studio.</p>
        </section>
      ) : (
        <ScholarshipFinder scholarships={scholarships} />
      )}

      {/* Essay Mastery — bento */}
      <section className="bg-light-gray/60 px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="flex h-full flex-col justify-center">
              <span className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
                Insider Insights
              </span>
              <h2 className="mb-6 font-heading text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                Mastering the Scholarship Essay
              </h2>
              <p className="mb-8 text-lg text-navy/60">
                Our admissions experts have helped thousands of students secure funding. Here&rsquo;s
                the AIMU blueprint for a winning personal statement.
              </p>
              <div className="space-y-6">
                {ESSAY_TIPS.map((tip, index) => (
                  <div key={tip.title} className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-navy">{tip.title}</h4>
                      <p className="text-navy/60">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-6 md:col-span-7">
            <Reveal>
              <div className="flex h-full flex-col justify-center rounded-xl bg-white p-8 text-center shadow-[0_10px_30px_-10px_rgba(13,28,50,0.1)]">
                <span className="material-symbols-outlined mb-4 text-[48px] text-gold">history_edu</span>
                <h5 className="mb-2 text-lg font-semibold text-navy">Essay Review</h5>
                <p className="text-sm text-navy/60">
                  Get professional feedback on your drafts from our alumni network.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="flex h-full flex-col justify-center rounded-xl bg-navy p-8 text-center text-white shadow-[0_10px_30px_-10px_rgba(13,28,50,0.1)]">
                <span className="material-symbols-outlined mb-4 text-[48px] text-gold-bright">lightbulb</span>
                <h5 className="mb-2 text-lg font-semibold">Strategy Guide</h5>
                <p className="text-sm text-white/70">
                  Get our expert playbook on scholarship navigation in a free consultation.
                </p>
              </div>
            </Reveal>
            <Reveal delay={180} className="col-span-2">
              <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl bg-ink">
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
                  <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
                </div>
                <Link
                  href="/contact"
                  className="relative z-10 bg-white px-8 py-4 text-sm font-semibold uppercase tracking-widest text-navy transition-colors hover:bg-gold"
                >
                  Book Essay Coaching
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Deadline CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-6 font-heading text-3xl font-semibold text-navy sm:text-4xl">
              Never Miss a Deadline
            </h2>
            <p className="mb-8 text-lg text-navy/60">
              Get scholarship alerts tailored to your profile — deadlines, new funding rounds, and
              eligibility windows, tracked by your counsellor.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-navy px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:opacity-90"
            >
              Get Scholarship Alerts
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
