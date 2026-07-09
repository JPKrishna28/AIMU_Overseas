import Link from "next/link";
import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";

export const metadata = { title: "About — AIMU Global" };

const WHY_CARDS = [
  {
    icon: "school",
    title: "University Insiders",
    description:
      "We don't just know the requirements; we know the culture and expectations of the world's top universities.",
  },
  {
    icon: "account_balance_wallet",
    title: "Funding Champions",
    description:
      "We help our students secure substantial scholarships and financial aid every single intake.",
  },
  {
    icon: "support_agent",
    title: "End-to-End Support",
    description:
      "From the first IELTS mock test to finding your student accommodation, we are with you at every step.",
  },
];

export default async function AboutPage() {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-24 sm:pb-28">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span
              className="animate-hero inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold"
              style={{ "--hero-delay": "0ms" } as React.CSSProperties}
            >
              Our Heritage
            </span>
            <h1
              className="animate-hero mt-6 font-heading text-4xl font-bold leading-tight text-navy sm:text-6xl"
              style={{ "--hero-delay": "120ms" } as React.CSSProperties}
            >
              Empowering <span className="text-gold">Global Ambitions</span> with Academic
              Excellence.
            </h1>
            <p
              className="animate-hero mt-8 max-w-2xl text-lg text-navy/60"
              style={{ "--hero-delay": "240ms" } as React.CSSProperties}
            >
              At AIMU Global, we don&rsquo;t just process applications. We bridge the gap between
              human potential and world-class education, guided by a legacy of trust and
              transformative results.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative + Values bento */}
      <section className="bg-light-gray/60 px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6">
          <Reveal className="col-span-12 lg:col-span-7">
            <div className="h-full rounded-xl border border-navy/10 bg-white p-10 shadow-[0_10px_30px_-10px_rgba(13,28,50,0.1)]">
              <h2 className="mb-6 font-heading text-3xl font-semibold text-navy">The AIMU Narrative</h2>
              <div className="space-y-4 text-navy/70">
                <p>
                  Founded on the principle that quality education should be accessible and
                  transparent, AIMU Global began as a boutique consultancy with a single promise:
                  put the student&rsquo;s future first. We have since grown into a trusted partner
                  for academic navigation across the world&rsquo;s leading study destinations.
                </p>
                <p>
                  Our journey is defined by the success stories of students who found their home in
                  prestigious institutions across the UK, USA, Canada, Australia, and Europe. Every
                  student has a unique trajectory — our role is to sharpen that focus through
                  data-driven insights and personalized mentorship.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 text-navy">
                <span className="material-symbols-outlined text-gold">verified</span>
                <span className="text-sm font-semibold">
                  {siteSettings?.tagline ?? "A Global Education & Career Advisory Platform"}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="col-span-12 grid grid-rows-2 gap-6 lg:col-span-5">
            <Reveal>
              <div className="flex h-full flex-col justify-center rounded-xl bg-navy p-10 text-white">
                <h3 className="mb-2 text-lg font-semibold text-gold-bright">Transparency</h3>
                <p className="text-white/80">
                  Absolute clarity in processes, fees, and outcomes. We demystify the complex web of
                  international admissions.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="flex h-full flex-col justify-center rounded-xl bg-gold p-10 text-navy">
                <h3 className="mb-2 text-lg font-semibold">Excellence</h3>
                <p className="text-navy/80">
                  A relentless pursuit of perfection in every application, visa file, and
                  consultation session.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      {siteSettings?.stats && siteSettings.stats.length > 0 && (
        <section className="bg-navy px-6 py-24 text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 text-center md:grid-cols-4">
            {siteSettings.stats.map((stat, index) => (
              <Reveal key={stat._key} delay={index * 100}>
                <div>
                  <div className="mb-1 font-heading text-4xl font-bold text-gold-bright sm:text-5xl">
                    <CountUp value={stat.value ?? ""} />
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Global Footprint */}
      <section className="overflow-hidden bg-light-gray/60 px-6 py-20 sm:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row">
          <Reveal className="lg:w-1/3">
            <div>
              <h2 className="mb-6 font-heading text-3xl font-semibold text-navy sm:text-4xl">
                Global Footprint
              </h2>
              <p className="mb-8 text-navy/60">
                Our team serves as a beacon for aspiring students, providing on-ground support and
                direct lines to our counsellors in key educational hubs.
              </p>
              <ul className="space-y-4">
                {siteSettings?.address && (
                  <li className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-white">
                    <span className="material-symbols-outlined text-gold">location_on</span>
                    <span className="text-sm font-medium text-navy">{siteSettings.address}</span>
                  </li>
                )}
                {siteSettings?.phone && (
                  <li className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-white">
                    <span className="material-symbols-outlined text-gold">call</span>
                    <span className="text-sm font-medium text-navy">{siteSettings.phone}</span>
                  </li>
                )}
                {siteSettings?.email && (
                  <li className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-white">
                    <span className="material-symbols-outlined text-gold">mail</span>
                    <span className="text-sm font-medium text-navy">{siteSettings.email}</span>
                  </li>
                )}
              </ul>
            </div>
          </Reveal>
          <Reveal className="lg:w-2/3">
            <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-navy lg:h-96">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, rgba(255,224,136,0.25) 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative z-10 text-center text-white">
                <span className="material-symbols-outlined text-7xl text-gold-bright">public</span>
                <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-white/70">
                  Serving students across 20+ countries
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why AIMU Global */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
                Why AIMU Global?
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {WHY_CARDS.map((card, index) => (
              <Reveal key={card.title} delay={index * 90}>
                <div className="hover-lift h-full rounded-xl border border-navy/10 bg-white p-10 text-center shadow-[0_10px_30px_-10px_rgba(13,28,50,0.1)]">
                  <span className="material-symbols-outlined mb-4 text-4xl text-gold">{card.icon}</span>
                  <h3 className="mb-3 text-lg font-semibold text-navy">{card.title}</h3>
                  <p className="text-navy/60">{card.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:pb-28">
        <Reveal>
          <div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink py-24 text-center text-white"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(255,224,136,0.08) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10 mx-auto max-w-2xl px-6">
              <h2 className="mb-6 font-heading text-3xl font-bold leading-tight sm:text-5xl">
                Your Global Journey <span className="text-gold-bright">Starts Here.</span>
              </h2>
              <p className="mb-10 text-lg text-white/70">
                Schedule a complimentary strategy session with one of our expert advisors today.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-gold px-10 py-5 text-sm font-semibold uppercase tracking-wider text-navy transition-all hover:scale-105"
                >
                  Book Free Consultation
                </Link>
                <Link
                  href="/success-stories"
                  className="rounded-full border border-white/30 px-10 py-5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                >
                  View Success Stories
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
