import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import type { SITE_SETTINGS_QUERY_RESULT } from "../../sanity.types";

type Stats = NonNullable<SITE_SETTINGS_QUERY_RESULT>["stats"];
type Stat = NonNullable<Stats>[number];

export function StatsBar({ stats }: { stats: Stats | undefined }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="border-y border-light-gray bg-white py-12">
      <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-center gap-x-8 gap-y-8 px-6 text-center">
        {stats.map((stat: Stat, index: number) => (
          <Reveal key={stat._key} delay={index * 100}>
            <div className="w-36 sm:w-44">
              <p className="font-heading text-2xl font-bold text-navy sm:text-3xl">
                <CountUp value={stat.value ?? ""} />
              </p>
              <p className="mt-1 text-sm text-navy/60">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
