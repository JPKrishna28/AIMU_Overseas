import Link from "next/link";
import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";

export const metadata = { title: "About — AIMU Global" };

const GUIDANCE_SERVICES = [
  { icon: "explore", label: "Career and course guidance" },
  { icon: "public", label: "Country and university selection" },
  { icon: "edit_document", label: "Application preparation" },
  { icon: "account_balance_wallet", label: "Scholarship and financial guidance" },
  { icon: "approval_delegation", label: "Visa support" },
  { icon: "home_pin", label: "Accommodation and travel preparation" },
  { icon: "flight_takeoff", label: "Pre-departure guidance" },
  { icon: "work_history", label: "Part-time job awareness" },
  { icon: "business_center", label: "Internship and career preparation" },
  { icon: "support_agent", label: "Post-arrival student support" },
];

const PROMISE_POINTS = ["Aim higher.", "Choose wisely.", "Move confidently.", "Build globally."];

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
              About AIMU Global
            </span>
            <h1
              className="animate-hero mt-6 font-heading text-4xl font-bold leading-tight text-navy sm:text-6xl"
              style={{ "--hero-delay": "120ms" } as React.CSSProperties}
            >
              Built From Experience. <span className="text-gold">Created for Students.</span>
            </h1>
            <p
              className="animate-hero mt-8 max-w-2xl text-lg text-navy/60"
              style={{ "--hero-delay": "240ms" } as React.CSSProperties}
            >
              AIMU Global was not created simply to help students apply to universities. It was
              created from a real international student journey filled with ambition, uncertainty,
              challenges and important lessons.
            </p>
          </div>
        </div>
      </section>

      {/* Founder story + belief */}
      <section className="bg-light-gray/60 px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6">
          <Reveal className="col-span-12 lg:col-span-7">
            <div className="h-full rounded-xl border border-navy/10 bg-white p-10 shadow-[0_10px_30px_-10px_rgba(13,28,50,0.1)]">
              <h2 className="mb-6 font-heading text-3xl font-semibold text-navy">Our Story</h2>
              <div className="space-y-4 text-navy/70">
                <p>
                  Our founder personally experienced the process of planning higher education in the
                  USA and the UK. During this journey, he faced many of the same challenges that
                  students continue to experience today. Choosing the right country and university
                  was difficult. Understanding the application process was confusing. Reliable
                  guidance was not always easy to find.
                </p>
                <p>
                  After arriving abroad, new challenges began. Finding genuine part-time work,
                  preparing for internships, managing studies and expenses, adapting to a new
                  country and avoiding misleading information became part of everyday student life.
                  There were also distractions, unreliable promises and situations where students
                  could easily be misled or taken advantage of.
                </p>
                <p>
                  Studying abroad is not only about receiving an admission letter. It is about
                  choosing the right course, protecting the family&rsquo;s investment, adjusting to
                  a new environment and building a successful career. Students need more than an
                  application agent. They need someone who understands the full journey.
                </p>
                <p>
                  That is why AIMU Global was created — to support students from their first
                  question until they become confident in their education, life and career abroad.
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
                <h3 className="mb-2 text-lg font-semibold text-gold-bright">
                  No Student Should Have to Face This Journey Alone
                </h3>
                <p className="text-white/80">
                  These experiences created one strong belief: every student deserves someone who
                  understands the full journey — not just the application.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="flex h-full flex-col justify-center rounded-xl bg-gold p-10 text-navy">
                <h3 className="mb-2 text-lg font-semibold">What AIMU Means</h3>
                <p className="text-navy/80">
                  AIMU means &ldquo;Aim You.&rdquo; Every student has a different goal, background
                  and dream. We do not push every student toward the same university or course — we
                  understand each student, identify their strengths and help them choose a path
                  that can shape their future.
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

      {/* More than admissions */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
                More Than Admissions
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-navy/60">
                Our work does not end when a student receives an offer letter. We aim to provide
                end-to-end guidance throughout the international education journey, so students feel
                informed, prepared and supported at every stage.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {GUIDANCE_SERVICES.map((service, index) => (
              <Reveal key={service.label} delay={(index % 5) * 90}>
                <div className="hover-lift flex h-full flex-col items-center gap-3 rounded-xl border border-navy/10 bg-white p-6 text-center shadow-[0_10px_30px_-10px_rgba(13,28,50,0.1)]">
                  <span className="material-symbols-outlined text-3xl text-gold">{service.icon}</span>
                  <p className="text-sm font-medium text-navy">{service.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Honest guidance */}
      <section className="bg-light-gray/60 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
              Honest Guidance Matters
            </h2>
            <div className="mt-6 space-y-4 text-lg text-navy/70">
              <p>
                We understand how easily students can become confused by unrealistic promises,
                incomplete information and unreliable advice. That is why transparency is one of the
                most important values at AIMU Global.
              </p>
              <p>
                We believe students and parents deserve clear information about universities, costs,
                visa requirements, career possibilities and the realities of living abroad. We do
                not want students to make decisions based only on marketing. We want them to make
                decisions based on understanding.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl bg-navy p-10 text-white">
              <span className="material-symbols-outlined mb-4 text-4xl text-gold-bright">flag</span>
              <h3 className="mb-3 font-heading text-2xl font-semibold">Our Mission</h3>
              <p className="text-white/80">
                To provide honest, personalised and career-focused guidance that helps students make
                confident decisions about their education and future.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="h-full rounded-xl bg-gold p-10 text-navy">
              <span className="material-symbols-outlined mb-4 text-4xl">visibility</span>
              <h3 className="mb-3 font-heading text-2xl font-semibold">Our Vision</h3>
              <p className="text-navy/80">
                To build a trusted global education platform that supports students not only in
                reaching another country, but also in building a meaningful life and career there.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

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

      {/* Our Promise / CTA */}
      <section className="px-6 py-20 sm:py-28">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink py-24 text-center text-white">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(255,224,136,0.08) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10 mx-auto max-w-3xl px-6">
              <h2 className="mb-6 font-heading text-3xl font-bold leading-tight sm:text-5xl">
                Our <span className="text-gold-bright">Promise</span>
              </h2>
              <p className="mb-8 text-lg text-white/70">
                We do not see students as application numbers. Every student comes to us with a
                dream, and every family places trust in that dream. Our responsibility is to guide
                that ambition carefully, protect it with honest advice and help turn it into a
                practical plan.
              </p>
              <div className="mb-10 flex flex-wrap justify-center gap-3">
                {PROMISE_POINTS.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-sm font-semibold text-gold-bright"
                  >
                    {point}
                  </span>
                ))}
              </div>
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
