import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";

type Stat = { key: string; value: string; label: string };

/* Stats are owned by the code and versioned in git — deliberately not read from Sanity,
   so the approved numbers can't be changed out from under the site by CMS content. */
const STATS: Stat[] = [
  { key: "universities", value: "50+", label: "Partnered Universities" },
  { key: "countries", value: "5+", label: "Countries" },
  { key: "courses", value: "500+", label: "Courses" },
  { key: "satisfaction", value: "95%", label: "Client Satisfaction" },
  { key: "support", value: "24/7", label: "Support" },
  { key: "guidance", value: "Personalized", label: "Guidance" },
  { key: "process", value: "Transparent", label: "Process" },
  { key: "e2e", value: "End-to-End", label: "Support" },
];

export function StatsBar() {
  return (
    <section className="relative z-20 mx-4 -mt-16 rounded-2xl bg-ink py-12 text-white shadow-xl sm:mx-10 lg:mx-16">
      <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-center gap-x-10 gap-y-8 px-6 text-center">
        {STATS.map((stat, index) => (
          <Reveal key={stat.key} delay={index * 100}>
            <div className="w-36 sm:w-44">
              <p className="font-heading text-3xl font-semibold text-gold sm:text-4xl">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/60">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
