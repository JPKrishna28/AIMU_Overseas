import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/client";
import { DESTINATION_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";
import { urlFor } from "@/sanity/image";
import { countryContent } from "@/lib/countryContent";
import { countryPageImage } from "@/lib/stitchImages";
import { CountryDetails } from "@/components/CountryDetails";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-light-gray py-10 first:border-t-0 first:pt-0">
      <h2 className="font-heading text-2xl font-bold text-navy">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const staticContent = countryContent[slug];
  const destination = await client.fetch(DESTINATION_QUERY, { slug });

  if (staticContent) {
    return (
      <>
        <PageHeader
          title={`${staticContent.flagEmoji} ${staticContent.heroTitle}`}
          subtitle={staticContent.heroSubtitle}
        />
        <div className="mx-auto max-w-4xl px-6 py-16">
          {(destination?.heroImage || countryPageImage(slug)) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={
                destination?.heroImage
                  ? urlFor(destination.heroImage).width(1000).url()
                  : countryPageImage(slug)!
              }
              alt={staticContent.country}
              className="mb-12 w-full rounded-2xl object-cover"
            />
          )}
          <CountryDetails content={staticContent} />
        </div>
      </>
    );
  }

  if (!destination) return notFound();

  return (
    <>
      <PageHeader
        title={`${destination.flagEmoji ?? ""} ${destination.country}`.trim()}
        subtitle={destination.summary ?? undefined}
      />

      <div className="mx-auto max-w-4xl px-6 py-16">
        {(destination.heroImage || countryPageImage(destination.country ?? slug)) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={
              destination.heroImage
                ? urlFor(destination.heroImage).width(1000).url()
                : countryPageImage(destination.country ?? slug)!
            }
            alt={destination.country ?? ""}
            className="mb-12 w-full rounded-2xl object-cover"
          />
        )}

        {/* Why study there */}
        {((destination.whyStudyPoints && destination.whyStudyPoints.length > 0) ||
          Array.isArray(destination.overview)) && (
          <Section title={`Why Study in ${destination.country}`}>
            {destination.whyStudyPoints && destination.whyStudyPoints.length > 0 && (
              <ul className="flex flex-col gap-2">
                {destination.whyStudyPoints.map((point, index) => (
                  <li key={index} className="flex gap-2 text-navy/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
            {Array.isArray(destination.overview) && (
              <div className="prose mt-4 max-w-none text-navy/80">
                <PortableText value={destination.overview} />
              </div>
            )}
          </Section>
        )}

        {/* Top universities */}
        {destination.universities && destination.universities.length > 0 && (
          <Section title="Top Universities">
            <div className="grid gap-4 sm:grid-cols-2">
              {destination.universities.map((university) =>
                university?.slug?.current ? (
                  <Link
                    key={university._id}
                    href={`/universities/${university.slug.current}`}
                    className="rounded-xl border border-light-gray p-4 transition-colors hover:border-gold"
                  >
                    <p className="font-heading font-semibold text-navy">{university.name}</p>
                    <p className="mt-1 text-sm text-navy/60">
                      {[university.city, university.ranking].filter(Boolean).join(" · ")}
                    </p>
                  </Link>
                ) : null
              )}
            </div>
          </Section>
        )}

        {/* Popular courses */}
        {destination.popularCourses && destination.popularCourses.length > 0 && (
          <Section title="Popular Courses">
            <div className="flex flex-wrap gap-2">
              {destination.popularCourses.map((course) =>
                course?.slug?.current ? (
                  <Link
                    key={course._id}
                    href={`/courses/${course.slug.current}`}
                    className="rounded-full bg-light-gray px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-gold/20"
                  >
                    {course.title}
                  </Link>
                ) : null
              )}
            </div>
          </Section>
        )}

        {/* Cities */}
        {((destination.mainCities && destination.mainCities.length > 0) ||
          (destination.citiesNearAirports && destination.citiesNearAirports.length > 0)) && (
          <Section title="Popular Cities">
            <div className="grid gap-6 sm:grid-cols-2">
              {destination.mainCities && destination.mainCities.length > 0 && (
                <div>
                  <p className="font-heading font-semibold text-navy">Preferred by Indian Students</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {destination.mainCities.map((city) => (
                      <li key={city} className="rounded-full bg-light-gray px-4 py-2 text-sm font-medium text-navy">
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {destination.citiesNearAirports && destination.citiesNearAirports.length > 0 && (
                <div>
                  <p className="font-heading font-semibold text-navy">Cities Near Airports</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {destination.citiesNearAirports.map((city) => (
                      <li key={city} className="rounded-full bg-light-gray px-4 py-2 text-sm font-medium text-navy">
                        ✈️ {city}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Accommodation */}
        {((destination.accommodationOptions && destination.accommodationOptions.length > 0) ||
          destination.accommodationAverageCost) && (
          <Section title="Accommodation">
            {destination.accommodationOptions && destination.accommodationOptions.length > 0 && (
              <ul className="flex flex-col gap-2">
                {destination.accommodationOptions.map((option) => (
                  <li key={option} className="flex gap-2 text-navy/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {option}
                  </li>
                ))}
              </ul>
            )}
            {destination.accommodationAverageCost && (
              <p className="mt-4 text-navy/80">
                <span className="font-semibold text-navy">Average cost:</span> {destination.accommodationAverageCost}
              </p>
            )}
          </Section>
        )}

        {/* Part-time work */}
        {(destination.partTimeJobInfo || destination.partTimeGuarantee) && (
          <Section title="Part-Time Job Opportunities">
            {destination.partTimeJobInfo && <p className="text-navy/80">{destination.partTimeJobInfo}</p>}
            {destination.partTimeGuarantee && (
              <div className="mt-4 rounded-xl bg-gold/10 p-4">
                <p className="text-sm font-semibold text-navy">✔ {destination.partTimeGuarantee}</p>
              </div>
            )}
          </Section>
        )}

        {/* Tuition fees */}
        {destination.tuitionFees && (
          <Section title="Tuition Fees">
            <p className="text-navy/80">{destination.tuitionFees}</p>
          </Section>
        )}

        {/* Living costs */}
        {destination.costOfLiving && (
          <Section title="Living Costs">
            <p className="text-navy/80">{destination.costOfLiving}</p>
          </Section>
        )}

        {/* Scholarships */}
        {destination.scholarships && destination.scholarships.length > 0 && (
          <Section title="Scholarships">
            <div className="flex flex-col gap-3">
              {destination.scholarships.map((scholarship) => (
                <div
                  key={scholarship._id}
                  className="flex flex-col gap-1 rounded-xl border border-light-gray p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-heading font-semibold text-navy">{scholarship.name}</p>
                    {scholarship.type && <p className="text-sm text-navy/60">{scholarship.type}</p>}
                  </div>
                  {scholarship.amount && <span className="font-semibold text-gold">{scholarship.amount}</span>}
                </div>
              ))}
            </div>
            <Link href="/scholarships" className="mt-4 inline-block text-sm font-semibold text-gold underline underline-offset-4">
              View all scholarships
            </Link>
          </Section>
        )}

        {/* Visa process */}
        {(destination.visaGuidance || (Array.isArray(destination.visaInfo) && destination.visaInfo.length > 0)) && (
          <Section title="Visa Process">
            {destination.visaGuidance?.processSteps && destination.visaGuidance.processSteps.length > 0 && (
              <ol className="flex flex-col gap-2">
                {destination.visaGuidance.processSteps.map((step, index) => (
                  <li key={index} className="flex gap-3 text-navy/80">
                    <span className="font-heading font-bold text-gold">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            )}

            {destination.visaGuidance?.documentsChecklist && destination.visaGuidance.documentsChecklist.length > 0 && (
              <div className="mt-6">
                <p className="font-heading font-semibold text-navy">Required Documents Checklist</p>
                <ul className="mt-2 flex flex-col gap-1">
                  {destination.visaGuidance.documentsChecklist.map((doc, index) => (
                    <li key={index} className="flex gap-2 text-sm text-navy/80">
                      <span className="text-emerald">✓</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {destination.visaGuidance?.timeline && (
                <div>
                  <p className="text-xs font-semibold text-navy/50">Timeline</p>
                  <p className="text-navy/80">{destination.visaGuidance.timeline}</p>
                </div>
              )}
              {destination.visaGuidance?.financialRequirements && (
                <div>
                  <p className="text-xs font-semibold text-navy/50">Financial Requirements</p>
                  <p className="text-navy/80">{destination.visaGuidance.financialRequirements}</p>
                </div>
              )}
            </div>

            {destination.visaGuidance?.commonMistakes && destination.visaGuidance.commonMistakes.length > 0 && (
              <div className="mt-6">
                <p className="font-heading font-semibold text-navy">Common Mistakes to Avoid</p>
                <ul className="mt-2 flex flex-col gap-1">
                  {destination.visaGuidance.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex gap-2 text-sm text-navy/80">
                      <span className="text-red-500">✕</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {destination.visaGuidance?.countryTips && (
              <div className="mt-6 rounded-xl bg-light-gray p-4">
                <p className="font-heading font-semibold text-navy">Country-Specific Tips</p>
                <p className="mt-2 text-sm text-navy/80">{destination.visaGuidance.countryTips}</p>
              </div>
            )}

            {!destination.visaGuidance && Array.isArray(destination.visaInfo) && destination.visaInfo.length > 0 && (
              <div className="prose max-w-none text-navy/80">
                <PortableText value={destination.visaInfo} />
              </div>
            )}
          </Section>
        )}

        {/* Work rights */}
        {destination.workRights && (
          <Section title="Work Rights">
            <p className="text-navy/80">{destination.workRights}</p>
          </Section>
        )}

        {/* Post-study opportunities */}
        {Array.isArray(destination.postStudyOpportunities) && destination.postStudyOpportunities.length > 0 && (
          <Section title="Post-Study Opportunities">
            <div className="prose max-w-none text-navy/80">
              <PortableText value={destination.postStudyOpportunities} />
            </div>
          </Section>
        )}

        {destination.intakeMonths && destination.intakeMonths.length > 0 && (
          <Section title="Intakes">
            <p className="text-navy/80">{destination.intakeMonths.join(", ")}</p>
          </Section>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="rounded-full bg-navy px-8 py-4 text-center text-sm font-semibold text-white hover:bg-navy/90"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </>
  );
}
