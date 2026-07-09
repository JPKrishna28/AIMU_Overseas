import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { STITCH_IMAGES } from "@/lib/stitchImages";

export function BentoGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="mb-12 space-y-2 text-center">
          <h2 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
            Everything You Need, In One Place
          </h2>
          <p className="mx-auto max-w-lg text-navy/60">
            Explore destinations, compare costs, find scholarships, and plan your journey — all with
            expert guidance behind you.
          </p>
        </div>
      </Reveal>

      <div className="grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Destinations — large visual tile */}
        <Reveal className="h-full sm:col-span-2 lg:col-span-4">
          <Link
            href="/destinations"
            className="hover-lift group relative flex h-full min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={STITCH_IMAGES.destinationsHero}
              alt="Study destinations"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
            <div className="relative z-10 p-8 text-white">
              <p className="text-3xl">🇬🇧 🇺🇸 🇮🇪 🇩🇪 🇫🇷 🇨🇦 🇦🇺</p>
              <h3 className="mt-3 font-heading text-2xl font-semibold">Explore Study Destinations</h3>
              <p className="mt-1 max-w-md text-sm text-white/75">
                Country guides covering tuition, living costs, work rights, visas, and post-study
                opportunities.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-bright">
                Browse countries
                <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Cost calculator */}
        <Reveal delay={180} className="h-full">
          <Link
            href="/cost-calculator"
            className="hover-lift group flex h-full flex-col justify-between rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_10px_30px_-10px_rgba(10,25,47,0.1)]"
          >
            <span className="material-symbols-outlined text-4xl text-gold">calculate</span>
            <div className="mt-6">
              <h3 className="font-heading text-lg font-semibold text-navy">Cost Calculator</h3>
              <p className="mt-1 text-sm text-navy/60">
                Estimate tuition and living costs for your city and course.
              </p>
            </div>
          </Link>
        </Reveal>

        {/* Scholarships */}
        <Reveal delay={270} className="h-full">
          <Link
            href="/scholarships"
            className="hover-lift group flex h-full flex-col justify-between rounded-2xl bg-gold/15 p-8"
          >
            <span className="material-symbols-outlined text-4xl text-gold">workspace_premium</span>
            <div className="mt-6">
              <h3 className="font-heading text-lg font-semibold text-navy">Scholarships</h3>
              <p className="mt-1 text-sm text-navy/60">
                Chevening, DAAD, Eiffel, and university awards worth up to 100% of tuition.
              </p>
            </div>
          </Link>
        </Reveal>

        {/* Intake calendar */}
        <Reveal delay={180} className="h-full">
          <Link
            href="/intake-calendar"
            className="hover-lift group flex h-full flex-col justify-between rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_10px_30px_-10px_rgba(10,25,47,0.1)]"
          >
            <span className="material-symbols-outlined text-4xl text-gold">calendar_month</span>
            <div className="mt-6">
              <h3 className="font-heading text-lg font-semibold text-navy">Intake Calendar</h3>
              <p className="mt-1 text-sm text-navy/60">
                Track application windows and never miss a deadline.
              </p>
            </div>
          </Link>
        </Reveal>

        {/* Visa guidance */}
        <Reveal delay={270} className="h-full">
          <Link
            href="/visa-guidance"
            className="hover-lift group flex h-full flex-col justify-between rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_10px_30px_-10px_rgba(10,25,47,0.1)]"
          >
            <span className="material-symbols-outlined text-4xl text-gold">approval_delegation</span>
            <div className="mt-6">
              <h3 className="font-heading text-lg font-semibold text-navy">Visa Guidance</h3>
              <p className="mt-1 text-sm text-navy/60">
                Step-by-step visa process, document checklists, and mock interviews.
              </p>
            </div>
          </Link>
        </Reveal>

        {/* University finder — sits below the destinations tile */}
        <Reveal delay={90} className="h-full sm:col-span-2 lg:col-span-2">
          <Link
            href="/universities"
            className="hover-lift group flex h-full flex-col justify-between rounded-2xl bg-navy p-8 text-white"
          >
            <span className="material-symbols-outlined text-4xl text-gold-bright">school</span>
            <div className="mt-6">
              <h3 className="font-heading text-xl font-semibold">Find Your University</h3>
              <p className="mt-1 text-sm text-white/70">
                Search globally ranked partner universities by country, ranking, and course.
              </p>
            </div>
          </Link>
        </Reveal>

        {/* Success stories */}
        <Reveal delay={90} className="h-full lg:col-span-2">
          <Link
            href="/success-stories"
            className="hover-lift group flex h-full flex-col justify-between rounded-2xl bg-light-gray p-8"
          >
            <span className="material-symbols-outlined text-4xl text-emerald">verified</span>
            <div className="mt-6">
              <h3 className="font-heading text-lg font-semibold text-navy">Success Stories</h3>
              <p className="mt-1 text-sm text-navy/60">
                Real students, real visa approvals, real global careers.
              </p>
            </div>
          </Link>
        </Reveal>

        {/* CTA tile */}
        <Reveal delay={180} className="h-full sm:col-span-2 lg:col-span-4">
          <div className="hover-lift relative flex h-full flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-ink p-8 text-white sm:flex-row sm:items-center">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative z-10">
              <h3 className="font-heading text-2xl font-semibold">Not sure where to start?</h3>
              <p className="mt-1 text-white/70">
                Get a free profile review and a personalised country-and-course shortlist.
              </p>
            </div>
            <Link
              href="/contact"
              className="relative z-10 shrink-0 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-navy transition-all hover:brightness-110"
            >
              Book Free Counselling
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
