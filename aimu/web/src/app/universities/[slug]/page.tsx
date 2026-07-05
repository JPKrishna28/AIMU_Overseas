import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/client";
import { UNIVERSITY_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";
import { SuccessStoryCard } from "@/components/SuccessStoryCard";
import { urlFor } from "@/sanity/image";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-light-gray py-10 first:border-t-0 first:pt-0">
      <h2 className="font-heading text-2xl font-bold text-navy">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const university = await client.fetch(UNIVERSITY_QUERY, { slug });

  if (!university) return notFound();

  const keyFacts = university.keyFacts;
  const gallery = university.galleryImages ?? [];
  const testimonials = (university.studentTestimonials ?? []).filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <PageHeader
        title={`${university.name ?? ""} — ${university.destination?.country ?? ""}`}
        subtitle={[university.city, university.ranking].filter(Boolean).join(" · ")}
      />

      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* 1. Overview */}
        <Section title="University Overview">
          {university.heroImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(university.heroImage).width(1000).url()}
              alt={university.name ?? ""}
              className="mb-6 w-full rounded-2xl object-cover"
            />
          )}

          {Array.isArray(university.overview) && (
            <div className="prose max-w-none text-navy/80">
              <PortableText value={university.overview} />
            </div>
          )}

          {gallery.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((image, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  src={urlFor(image).width(300).height(220).url()}
                  alt={`${university.name} gallery ${index + 1}`}
                  className="h-32 w-full rounded-lg object-cover"
                />
              ))}
            </div>
          )}

          {keyFacts && (keyFacts.foundedYear || keyFacts.type || keyFacts.studentStrength || keyFacts.internationalStudents) && (
            <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-light-gray p-6 sm:grid-cols-4">
              {keyFacts.foundedYear && (
                <div>
                  <dt className="text-xs text-navy/50">Founded</dt>
                  <dd className="font-semibold text-navy">{keyFacts.foundedYear}</dd>
                </div>
              )}
              {keyFacts.type && (
                <div>
                  <dt className="text-xs text-navy/50">Type</dt>
                  <dd className="font-semibold text-navy">{keyFacts.type}</dd>
                </div>
              )}
              {keyFacts.studentStrength && (
                <div>
                  <dt className="text-xs text-navy/50">Students</dt>
                  <dd className="font-semibold text-navy">{keyFacts.studentStrength}</dd>
                </div>
              )}
              {keyFacts.internationalStudents && (
                <div>
                  <dt className="text-xs text-navy/50">International</dt>
                  <dd className="font-semibold text-navy">{keyFacts.internationalStudents}</dd>
                </div>
              )}
            </dl>
          )}
        </Section>

        {/* 2. Popular courses */}
        {university.courses && university.courses.length > 0 && (
          <Section title="Popular Courses / Programs">
            <div className="grid gap-4 sm:grid-cols-2">
              {university.courses.map((course) =>
                course?.slug?.current ? (
                  <Link
                    key={course._id}
                    href={`/courses/${course.slug.current}`}
                    className="rounded-xl border border-light-gray p-4 transition-colors hover:border-gold"
                  >
                    <p className="font-heading font-semibold text-navy">{course.title}</p>
                    <p className="mt-1 text-sm text-navy/60">
                      {[course.category, course.duration].filter(Boolean).join(" · ")}
                    </p>
                  </Link>
                ) : null
              )}
            </div>
          </Section>
        )}

        {/* 3. Tuition fees */}
        {(university.tuitionFrom || Array.isArray(university.feeStructure) || university.paymentOptions) && (
          <Section title="Tuition Fees">
            {university.tuitionFrom && (
              <p className="font-heading text-lg font-semibold text-navy">From {university.tuitionFrom}</p>
            )}
            {Array.isArray(university.feeStructure) && university.feeStructure.length > 0 && (
              <div className="prose mt-3 max-w-none text-navy/80">
                <PortableText value={university.feeStructure} />
              </div>
            )}
            {university.paymentOptions && university.paymentOptions.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-navy">Payment Options</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {university.paymentOptions.map((option) => (
                    <li key={option} className="rounded-full bg-light-gray px-3 py-1 text-sm text-navy">
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Section>
        )}

        {/* 4. Scholarships */}
        {university.scholarships && university.scholarships.length > 0 && (
          <Section title="Scholarships">
            <div className="flex flex-col gap-3">
              {university.scholarships.map((scholarship) => (
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
          </Section>
        )}

        {/* 5. Our students at this university */}
        {testimonials.length > 0 && (
          <Section title={`Our Students at ${university.name}`}>
            <div className="flex flex-col gap-10">
              {testimonials.map((story) => (
                <SuccessStoryCard key={story._id} story={story} />
              ))}
            </div>
          </Section>
        )}

        {/* 6. Accommodation */}
        {university.accommodation && (university.accommodation.onCampus || university.accommodation.offCampus) && (
          <Section title="Accommodation">
            <div className="grid gap-6 sm:grid-cols-2">
              {university.accommodation.onCampus && (
                <div>
                  <p className="font-heading font-semibold text-navy">On-Campus</p>
                  <p className="mt-2 text-sm text-navy/70">{university.accommodation.onCampus}</p>
                </div>
              )}
              {university.accommodation.offCampus && (
                <div>
                  <p className="font-heading font-semibold text-navy">Off-Campus</p>
                  <p className="mt-2 text-sm text-navy/70">{university.accommodation.offCampus}</p>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* 7. Location & city guide */}
        {university.cityGuide &&
          (university.cityGuide.overview || university.cityGuide.costOfLiving || university.cityGuide.climate || university.cityGuide.safety) && (
            <Section title="Location & City Guide">
              {university.cityGuide.overview && <p className="text-navy/80">{university.cityGuide.overview}</p>}
              <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {university.cityGuide.costOfLiving && (
                  <div>
                    <dt className="text-xs text-navy/50">Cost of Living</dt>
                    <dd className="font-medium text-navy">{university.cityGuide.costOfLiving}</dd>
                  </div>
                )}
                {university.cityGuide.climate && (
                  <div>
                    <dt className="text-xs text-navy/50">Climate</dt>
                    <dd className="font-medium text-navy">{university.cityGuide.climate}</dd>
                  </div>
                )}
                {university.cityGuide.safety && (
                  <div>
                    <dt className="text-xs text-navy/50">Safety</dt>
                    <dd className="font-medium text-navy">{university.cityGuide.safety}</dd>
                  </div>
                )}
              </dl>
            </Section>
          )}

        {/* 8. Connectivity */}
        {(university.nearestAirport || university.airportDistance || university.transportationOptions) && (
          <Section title="Connectivity">
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {university.nearestAirport && (
                <div>
                  <dt className="text-xs text-navy/50">Nearest Airport</dt>
                  <dd className="font-medium text-navy">{university.nearestAirport}</dd>
                </div>
              )}
              {university.airportDistance && (
                <div>
                  <dt className="text-xs text-navy/50">Distance from Airport</dt>
                  <dd className="font-medium text-navy">{university.airportDistance}</dd>
                </div>
              )}
            </dl>
            {university.transportationOptions && university.transportationOptions.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {university.transportationOptions.map((option) => (
                  <li key={option} className="rounded-full bg-light-gray px-3 py-1 text-sm text-navy">
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </Section>
        )}

        {/* 9. Indian student community */}
        {university.indianCommunity && (university.indianCommunity.studentCount || university.indianCommunity.description) && (
          <Section title="Indian Student Community">
            {university.indianCommunity.studentCount && (
              <p className="font-heading text-lg font-semibold text-navy">{university.indianCommunity.studentCount}</p>
            )}
            {university.indianCommunity.description && (
              <p className="mt-2 text-navy/70">{university.indianCommunity.description}</p>
            )}
          </Section>
        )}

        {Array.isArray(university.admissionRequirements) && university.admissionRequirements.length > 0 && (
          <Section title="Admission Requirements">
            <div className="prose max-w-none text-navy/80">
              <PortableText value={university.admissionRequirements} />
            </div>
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
