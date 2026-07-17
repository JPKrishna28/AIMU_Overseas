import Link from "next/link";
import { client } from "@/sanity/client";
import { DESTINATIONS_QUERY, UNIVERSITIES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { Reveal } from "@/components/Reveal";
import { urlFor } from "@/sanity/image";
import { STITCH_IMAGES, countryImage } from "@/lib/stitchImages";
import { countryContent, type CountryContent } from "@/lib/countryContent";

export const metadata = { title: "Study Destinations — AIMU Global" };

type DestinationCard = {
  _id: string;
  country: string | null;
  flagEmoji: string | null;
  slug: { current?: string } | null;
  heroImage: Parameters<typeof urlFor>[0] | null;
  whyStudyPoints: string[] | null;
  tuitionFees: string | null;
  costOfLiving: string | null;
  workRights: string | null;
  intakeMonths: string[] | null;
};

function staticDestinationCard(content: CountryContent): DestinationCard {
  const mastersFees =
    content.tuitionFees.find((row) => row.program.toLowerCase().includes("master"))?.fees ??
    content.tuitionFees[0]?.fees ??
    null;
  return {
    _id: `static-${content.slug}`,
    country: content.country,
    flagEmoji: content.flagEmoji,
    slug: { current: content.slug },
    heroImage: null,
    whyStudyPoints: content.whyStudyPoints,
    tuitionFees: mastersFees,
    costOfLiving: content.costOfLivingTotals.map((total) => total.value).join(" / "),
    workRights: content.quickFacts.find((fact) => fact.label.startsWith("Work During"))?.value ?? null,
    intakeMonths:
      content.quickFacts
        .find((fact) => fact.label === "Popular Intake")
        ?.value.split(", ") ?? null,
  };
}

export default async function DestinationsPage() {
  const [sanityDestinations, universities, siteSettings] = await Promise.all([
    client.fetch(DESTINATIONS_QUERY),
    client.fetch(UNIVERSITIES_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
  ]);

  // Merge hardcoded countries with Sanity docs; static content wins on slug clash.
  const staticContents = [...new Set(Object.values(countryContent))];
  const staticSlugs = new Set(staticContents.map((content) => content.slug));
  const staticCountryNames = new Set(staticContents.map((content) => content.country.toLowerCase()));
  const destinations: DestinationCard[] = [
    ...staticContents.map(staticDestinationCard),
    ...sanityDestinations.filter(
      (d) =>
        !(d.slug?.current && staticSlugs.has(d.slug.current)) &&
        !(d.country && staticCountryNames.has(d.country.toLowerCase()))
    ),
  ];

  const rankedUniversities = universities.filter((u) => u.ranking).slice(0, 4);
  const comparisonDestinations = destinations
    .filter((d) => d.tuitionFees || d.costOfLiving || d.workRights || d.intakeMonths?.length)
    .slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              destinations[0]?.heroImage
                ? urlFor(destinations[0].heroImage).width(1920).url()
                : STITCH_IMAGES.destinationsHero
            }
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-12">
          <div className="max-w-2xl space-y-8">
            <span
              className="animate-hero inline-block rounded-full border border-gold px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-bright"
              style={{ "--hero-delay": "0ms" } as React.CSSProperties}
            >
              Global Admissions {new Date().getFullYear() + 1}
            </span>
            <h1
              className="animate-hero font-heading text-4xl font-bold leading-tight sm:text-6xl"
              style={{ "--hero-delay": "120ms" } as React.CSSProperties}
            >
              Explore Your Future <span className="text-gold-bright">Destinations</span>
            </h1>
            <p
              className="animate-hero max-w-xl text-lg text-white/70"
              style={{ "--hero-delay": "240ms" } as React.CSSProperties}
            >
              Unlock globally ranked universities and career-ready opportunities. From Ivy League to
              Russell Group, your journey starts here with expert guidance and transparent roadmaps.
            </p>
            <div
              className="animate-hero flex flex-wrap gap-4"
              style={{ "--hero-delay": "360ms" } as React.CSSProperties}
            >
              <Link
                href="/contact"
                className="rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-navy transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                Start Your Application
              </Link>
              <Link
                href="/universities"
                className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                Find Universities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Explorer */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <Reveal>
          <div className="mb-12 space-y-2">
            <h2 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
              World-Class Study Hubs
            </h2>
            <p className="max-w-lg text-navy/60">
              Find the perfect match for your academic goals and career aspirations.
            </p>
          </div>
        </Reveal>

        {destinations.length === 0 ? (
          <p className="text-center text-navy/60">No destinations yet. Add some in the Sanity Studio.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, index) =>
              destination.slug?.current ? (
                <Reveal key={destination._id} delay={index * 90}>
                  <div className="hover-lift group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_-10px_rgba(10,25,47,0.1)]">
                    <div className="relative h-64 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          destination.heroImage
                            ? urlFor(destination.heroImage).width(800).height(520).url()
                            : countryImage(destination.country, index)
                        }
                        alt={destination.country ?? ""}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-widest text-navy">
                        {destination.flagEmoji} {destination.country}
                      </div>
                    </div>

                    <div className="flex flex-grow flex-col p-8">
                      <h3 className="mb-4 font-heading text-2xl font-semibold text-navy">
                        Study in {destination.country}
                      </h3>

                      {destination.whyStudyPoints && destination.whyStudyPoints.length > 0 && (
                        <ul className="mb-8 flex-grow space-y-2">
                          {destination.whyStudyPoints.slice(0, 3).map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-navy/70">
                              <span className="material-symbols-outlined mt-0.5 text-lg text-gold">
                                check_circle
                              </span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}

                      {(destination.tuitionFees || destination.intakeMonths?.length) && (
                        <div className="grid grid-cols-2 gap-4 border-t border-navy/10 pt-4 text-xs uppercase tracking-wide text-navy/50">
                          {destination.tuitionFees && (
                            <div>
                              <span className="block font-bold text-navy">Cost/Year</span>
                              {destination.tuitionFees}
                            </div>
                          )}
                          {destination.intakeMonths && destination.intakeMonths.length > 0 && (
                            <div>
                              <span className="block font-bold text-navy">Intakes</span>
                              {destination.intakeMonths.join(", ")}
                            </div>
                          )}
                        </div>
                      )}

                      <Link
                        href={`/destinations/${destination.slug.current}`}
                        className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-light-gray py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold hover:text-white"
                      >
                        Explore {destination.country} Universities
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ) : null
            )}
          </div>
        )}
      </section>

      {/* Top Ranked Partner Universities */}
      {rankedUniversities.length > 0 && (
        <section className="bg-light-gray/60 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="mb-12 text-center">
                <h2 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
                  Top Ranked Partner Universities
                </h2>
                <p className="mt-2 text-navy/60">
                  Access the world&apos;s most prestigious institutions through our exclusive partnerships.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {rankedUniversities.map((university, index) => (
                <Reveal key={university._id} delay={index * 90}>
                  <Link
                    href={university.slug?.current ? `/universities/${university.slug.current}` : "/universities"}
                    className="hover-lift flex h-full flex-col items-center rounded-xl border border-navy/10 bg-white p-8 text-center shadow-[0_10px_30px_-10px_rgba(10,25,47,0.1)]"
                  >
                    <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-light-gray">
                      {university.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={urlFor(university.logo).width(120).height(120).fit("max").url()}
                          alt={university.name ?? ""}
                          className="h-12 w-12 object-contain"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-3xl text-navy/40">school</span>
                      )}
                    </div>
                    <span className="block font-heading font-semibold text-navy">{university.name}</span>
                    <span className="mt-1 text-xs font-bold uppercase text-gold">{university.ranking}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table */}
      {comparisonDestinations.length > 1 && (
        <section className="mx-auto max-w-7xl overflow-x-auto px-6 py-20 sm:py-28">
          <Reveal>
            <div className="mb-12">
              <h2 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
                Destination Comparison At-a-Glance
              </h2>
              <p className="mt-2 text-navy/60">
                Directly compare key metrics to help refine your choice of study location.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="rounded-tl-xl p-4 font-semibold">Comparison Criteria</th>
                    {comparisonDestinations.map((d, i) => (
                      <th
                        key={d._id}
                        className={`p-4 font-semibold ${i === comparisonDestinations.length - 1 ? "rounded-tr-xl" : ""}`}
                      >
                        {d.flagEmoji} {d.country}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-navy/10">
                    <td className="p-4 font-semibold text-navy">Average Tuition</td>
                    {comparisonDestinations.map((d) => (
                      <td key={d._id} className="p-4 text-navy/70">{d.tuitionFees ?? "—"}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-navy/10">
                    <td className="p-4 font-semibold text-navy">Post-Study Work Rights</td>
                    {comparisonDestinations.map((d) => (
                      <td key={d._id} className="p-4 text-navy/70">{d.workRights ?? "—"}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-navy/10">
                    <td className="p-4 font-semibold text-navy">Living Costs / Month</td>
                    {comparisonDestinations.map((d) => (
                      <td key={d._id} className="p-4 text-navy/70">{d.costOfLiving ?? "—"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="rounded-bl-xl p-4 font-semibold text-navy">Intakes</td>
                    {comparisonDestinations.map((d, i) => (
                      <td
                        key={d._id}
                        className={`p-4 text-navy/70 ${i === comparisonDestinations.length - 1 ? "rounded-br-xl" : ""}`}
                      >
                        {d.intakeMonths?.join(", ") ?? "—"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 pb-20 sm:pb-28">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-ink p-10 text-center text-white sm:p-20">
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
            </div>
            <div className="relative z-10 mx-auto max-w-2xl space-y-8">
              <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
                Not Sure Which Destination is Right for You?
              </h2>
              <p className="text-lg text-white/70">
                Our expert counsellors have helped thousands of students choose their perfect academic
                home based on their career goals, budget, and lifestyle preferences.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-gold px-10 py-5 text-sm font-semibold uppercase tracking-wider text-navy transition-all hover:scale-105"
                >
                  Book Free Consultation
                </Link>
                {siteSettings?.phone && (
                  <a
                    href={`tel:${siteSettings.phone.replace(/\s/g, "")}`}
                    className="rounded-full border border-white/30 px-10 py-5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                  >
                    Call {siteSettings.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
