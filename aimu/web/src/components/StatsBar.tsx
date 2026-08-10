import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import type { SITE_SETTINGS_QUERY_RESULT } from "../../sanity.types";

type Stats = NonNullable<SITE_SETTINGS_QUERY_RESULT>["stats"];
type Stat = NonNullable<Stats>[number];

/* Fallback only — the live site renders siteSettings.stats from Sanity when present. */
const DEFAULT_STATS: Stat[] = [
  { _type: "stat", _key: "universities", value: "50+", label: "Partnered Universities" },
  { _type: "stat", _key: "countries", value: "5+", label: "Countries" },
  { _type: "stat", _key: "courses", value: "500+", label: "Courses" },
  { _type: "stat", _key: "satisfaction", value: "95%", label: "Client Satisfaction" },
  { _type: "stat", _key: "support", value: "24/7", label: "Support" },
  { _type: "stat", _key: "guidance", value: "Personalized", label: "Guidance" },
  { _type: "stat", _key: "process", value: "Transparent", label: "Process" },
  { _type: "stat", _key: "e2e", value: "End-to-End", label: "Support" },
];

export function StatsBar({ stats }: { stats: Stats | undefined }) {
  const items = stats && stats.length > 0 ? stats : DEFAULT_STATS;

  return (
    <section className="relative z-20 mx-4 -mt-16 rounded-2xl bg-ink py-12 text-white shadow-xl sm:mx-10 lg:mx-16">
      <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-center gap-x-10 gap-y-8 px-6 text-center">
        {items.map((stat: Stat, index: number) => (
          <Reveal key={stat._key} delay={index * 100}>
            <div className="w-36 sm:w-44">
              <p className="font-heading text-3xl font-semibold text-gold sm:text-4xl">
                <CountUp value={stat.value ?? ""} />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/60">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
