import Link from "next/link";
import type { CountryContent, CourseCategoryIcon } from "@/lib/countryContent";

const courseCategoryIcons: Record<CourseCategoryIcon, React.ReactNode> = {
  business: (
    // briefcase
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-8 0h8m-8 0H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3M3 12h18" />
  ),
  computing: (
    // monitor with code
    <path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm5 16h6m-3-4v4M9.5 8l-2 2 2 2m5-4 2 2-2 2" />
  ),
  engineering: (
    // cog
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7.4 7.4 0 0 0-2-1.2L14.5 3h-5l-.4 2.6a7.4 7.4 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7.4 7.4 0 0 0 2 1.2l.4 2.6h5l.4-2.6a7.4 7.4 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.06-.4.1-.8.1-1.2Z" />
  ),
  healthcare: (
    // heart with pulse
    <path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6.3a5 5 0 1 1 7.5 6.3ZM7 12h3l1.5-3 2 5L15 12h2" />
  ),
  science: (
    // flask
    <path d="M10 3v6.3L4.7 18a2 2 0 0 0 1.8 3h11a2 2 0 0 0 1.8-3L14 9.3V3m-6 0h8M7.5 15h9" />
  ),
  law: (
    // scales
    <path d="M12 3v18m-5 0h10M12 5l-6 2m6-2 6 2M6 7l-3 7a3.5 3.5 0 0 0 6 0L6 7Zm12 0-3 7a3.5 3.5 0 0 0 6 0l-3-7Z" />
  ),
  arts: (
    // palette
    <path d="M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-1.8c-1.2 0-2.2 1-2.2 2.2 0 .6.2 1 .5 1.4.3.4.5.8.5 1.2 0 .7-.9 1.2-3 1.2ZM7.5 10.5h.01M12 7.5h.01m4.49 3h.01" />
  ),
};

function CourseCategoryBadge({ icon }: { icon: CourseCategoryIcon }) {
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-navy">
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {courseCategoryIcons[icon]}
      </svg>
    </span>
  );
}

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

export function CountryDetails({ content }: { content: CountryContent }) {
  return (
    <>
      {/* Overview */}
      <Section title="Overview">
        <div className="flex flex-col gap-4 text-navy/80">
          {content.overview.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {/* Quick Facts */}
      <Section title="Quick Facts">
        <div className="overflow-x-auto rounded-xl border border-light-gray">
          <table className="w-full text-left text-sm">
            <tbody>
              {content.quickFacts.map((fact) => (
                <tr key={fact.label} className="border-b border-light-gray last:border-b-0">
                  <th className="w-1/3 bg-light-gray/40 px-4 py-3 font-semibold text-navy">{fact.label}</th>
                  <td className="px-4 py-3 text-navy/80">{fact.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Why Choose */}
      <Section title={`Why Choose ${content.nameWithArticle}?`}>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.whyChoose.map((point) => (
            <div key={point.title} className="rounded-xl border border-light-gray p-4">
              <p className="font-heading font-semibold text-navy">
                <span className="mr-2">{point.icon}</span>
                {point.title}
              </p>
              <p className="mt-1 text-sm text-navy/70">{point.description}</p>
            </div>
          ))}
        </div>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {content.whyStudyPoints.map((point) => (
            <li key={point} className="flex gap-2 text-navy/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {point}
            </li>
          ))}
        </ul>
      </Section>

      {/* Education System */}
      <Section title={`${content.shortName} Education System`}>
        <div className="flex flex-col gap-4">
          {content.educationSystem.map((entry) => (
            <div key={entry.level} className="rounded-xl border border-light-gray p-4">
              <p className="font-heading font-semibold text-navy">{entry.level}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {entry.details.map((detail) => (
                  <li key={detail} className="flex gap-2 text-sm text-navy/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Popular Courses */}
      <Section title="Popular Courses">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.popularCourses.map((group) => (
            <div
              key={group.category}
              className="flex flex-col items-center gap-4 rounded-2xl border border-light-gray p-8 text-center transition-colors hover:border-gold"
            >
              <CourseCategoryBadge icon={group.icon} />
              <p className="font-heading text-lg font-semibold text-navy">{group.category}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Top Universities */}
      {content.topUniversities.length > 0 && (
        <Section title="Top Universities">
          <div className="grid gap-4 sm:grid-cols-2">
            {content.topUniversities.map((university) => (
              <div key={university.name} className="rounded-xl border border-light-gray p-4">
                <p className="font-heading font-semibold text-navy">{university.name}</p>
                <p className="mt-1 text-sm text-navy/60">
                  {university.city} · QS Ranking: {university.qsRanking}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {university.popularCourses.map((course) => (
                    <span key={course} className="rounded-full bg-light-gray px-3 py-1 text-xs font-medium text-navy">
                      {course}
                    </span>
                  ))}
                </div>
                {university.scholarship && (
                  <p className="mt-3 text-sm font-semibold text-gold">Scholarship: {university.scholarship}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Tuition Fees */}
      <Section title="Tuition Fees">
        <div className="overflow-x-auto rounded-xl border border-light-gray">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-light-gray/40">
                <th className="px-4 py-3 font-semibold text-navy">Program</th>
                <th className="px-4 py-3 font-semibold text-navy">Average Annual Fees</th>
              </tr>
            </thead>
            <tbody>
              {content.tuitionFees.map((row) => (
                <tr key={row.program} className="border-t border-light-gray">
                  <td className="px-4 py-3 text-navy/80">{row.program}</td>
                  <td className="px-4 py-3 text-navy/80">{row.fees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Cost of Living */}
      <Section title="Cost of Living">
        <div className="overflow-x-auto rounded-xl border border-light-gray">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-light-gray/40">
                <th className="px-4 py-3 font-semibold text-navy">Expense</th>
                <th className="px-4 py-3 font-semibold text-navy">Average Monthly Cost</th>
              </tr>
            </thead>
            <tbody>
              {content.costOfLiving.map((row) => (
                <tr key={row.expense} className="border-t border-light-gray">
                  <td className="px-4 py-3 text-navy/80">{row.expense}</td>
                  <td className="px-4 py-3 text-navy/80">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {content.costOfLivingTotals.map((total) => (
            <div key={total.label} className="rounded-xl bg-gold/10 p-4">
              <p className="text-xs font-semibold text-navy/50">{total.label}</p>
              <p className="font-heading text-lg font-bold text-navy">{total.value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Student Earnings */}
      <Section title="Student Earnings">
        <div className="grid gap-4 sm:grid-cols-2">
          {content.studentEarnings.map((item) => (
            <div key={item.label} className="rounded-xl border border-light-gray p-4">
              <p className="text-xs font-semibold text-navy/50">{item.label}</p>
              <p className="mt-1 font-semibold text-navy">{item.value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Scholarships */}
      <Section title="Scholarships">
        <div className="flex flex-wrap gap-2">
          {content.scholarships.map((scholarship) => (
            <span key={scholarship} className="rounded-full bg-light-gray px-4 py-2 text-sm font-medium text-navy">
              🎓 {scholarship}
            </span>
          ))}
        </div>
        <Link
          href="/scholarships"
          className="mt-4 inline-block text-sm font-semibold text-gold underline underline-offset-4"
        >
          View all scholarships
        </Link>
      </Section>

      {/* Admission Requirements */}
      <Section title="Admission Requirements">
        <div className="grid gap-4 sm:grid-cols-2">
          {content.admissionRequirements.map((group) => (
            <div key={group.level} className="rounded-xl border border-light-gray p-4">
              <p className="font-heading font-semibold text-navy">{group.level}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-navy/80">
                    <span className="text-emerald">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Your Journey */}
      <Section title={`Your Journey in ${content.admissionProcess.length} Steps`}>
        <div className="rounded-2xl bg-navy px-6 py-10 sm:px-10">
          {/* Horizontal timeline (desktop) */}
          <ol className="hidden md:grid" style={{ gridTemplateColumns: `repeat(${content.admissionProcess.length}, 1fr)` }}>
            {content.admissionProcess.map((step, index) => {
              const above = index % 2 === 0;
              return (
                <li key={step.step} className="relative flex h-64 flex-col items-center">
                  {/* dashed connecting line */}
                  <span
                    aria-hidden
                    className={`absolute top-1/2 h-0 -translate-y-1/2 border-t-2 border-dashed border-white/30 ${
                      index === 0 ? "left-1/2 right-0" : index === content.admissionProcess.length - 1 ? "left-0 right-1/2" : "left-0 right-0"
                    }`}
                  />
                  {/* label above */}
                  <div className={`flex h-1/2 w-full flex-col items-center ${above ? "justify-start" : ""}`}>
                    {above && (
                      <>
                        <p className="px-2 text-center text-sm font-semibold leading-snug text-white">{step.title}</p>
                        <span aria-hidden className="mt-2 w-px flex-1 bg-white/60" />
                      </>
                    )}
                  </div>
                  {/* numbered dot */}
                  <span className="relative z-10 flex h-10 w-10 shrink-0 -translate-y-1/2 items-center justify-center rounded-full bg-white font-heading text-sm font-bold text-navy shadow-lg ring-4 ring-white/20">
                    {step.step}
                  </span>
                  {/* label below */}
                  <div className="flex h-1/2 w-full -translate-y-10 flex-col items-center">
                    {!above && (
                      <>
                        <span aria-hidden className="mb-2 w-px flex-1 bg-white/60" />
                        <p className="px-2 text-center text-sm font-semibold leading-snug text-white">{step.title}</p>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Vertical timeline (mobile) */}
          <ol className="flex flex-col gap-6 md:hidden">
            {content.admissionProcess.map((step, index) => (
              <li key={step.step} className="relative flex items-center gap-4">
                {index < content.admissionProcess.length - 1 && (
                  <span aria-hidden className="absolute left-5 top-10 h-full w-px border-l-2 border-dashed border-white/30" />
                )}
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-heading text-sm font-bold text-navy ring-4 ring-white/20">
                  {step.step}
                </span>
                <p className="text-sm font-semibold text-white">{step.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Job Opportunities */}
      <Section title="Job Opportunities">
        <p className="text-navy/80">Top sectors hiring graduates:</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {content.jobSectors.map((sector) => (
            <span key={sector} className="rounded-full bg-light-gray px-4 py-2 text-sm font-medium text-navy">
              {sector}
            </span>
          ))}
        </div>
      </Section>

      {/* Graduate Salaries */}
      <Section title="Graduate Salaries">
        <div className="overflow-x-auto rounded-xl border border-light-gray">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-light-gray/40">
                <th className="px-4 py-3 font-semibold text-navy">Industry</th>
                <th className="px-4 py-3 font-semibold text-navy">Fresher</th>
                <th className="px-4 py-3 font-semibold text-navy">Experienced</th>
              </tr>
            </thead>
            <tbody>
              {content.graduateSalaries.map((row) => (
                <tr key={row.industry} className="border-t border-light-gray">
                  <td className="px-4 py-3 text-navy/80">{row.industry}</td>
                  <td className="px-4 py-3 text-navy/80">{row.fresher}</td>
                  <td className="px-4 py-3 text-navy/80">{row.experienced}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Student Life */}
      <Section title={`Student Life in ${content.nameWithArticle}`}>
        <ul className="flex flex-col gap-2">
          {content.studentLife.map((item, index) => (
            <li key={index} className="flex gap-2 text-navy/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Visa Information */}
      <Section title="Visa Information">
        <ul className="flex flex-col gap-2">
          {content.visaInformation.map((item, index) => (
            <li key={index} className="flex gap-2 text-navy/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQs */}
      <Section title="Frequently Asked Questions">
        <div className="flex flex-col gap-3">
          {content.faqs.map((faq) => (
            <details key={faq.question} className="group rounded-xl border border-light-gray p-4">
              <summary className="cursor-pointer font-heading font-semibold text-navy">{faq.question}</summary>
              <p className="mt-2 text-sm text-navy/80">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Why AIMU */}
      <Section title="Why Choose AIMU Global Consultancy?">
        <div className="rounded-2xl bg-navy p-6 text-white sm:p-8">
          <p className="text-white/80">
            From your first counselling session to your first day on campus, AIMU supports you at every step:
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {content.aimuServices.map((service) => (
              <li key={service} className="flex gap-2 text-sm text-white/90">
                <span className="text-gold">✓</span>
                {service}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold/90"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Book Free Counselling
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
