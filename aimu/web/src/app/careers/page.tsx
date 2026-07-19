import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: "Careers — AIMU Global" };

const OPEN_ROLES = [
  {
    title: "Campus Ambassador",
    type: "Part-Time",
    location: "Your Campus / Remote",
    summary:
      "Represent AIMU Global at your university and help fellow students discover opportunities to study abroad. Ideal for outgoing students who love networking and want to build real marketing and leadership experience alongside their studies.",
    responsibilities: [
      "Promote AIMU Global events, webinars, and services on your campus",
      "Share study-abroad opportunities with student communities and clubs",
      "Organise info sessions and connect interested students with our counsellors",
      "Create and share content about study-abroad journeys on social media",
      "Act as the first point of contact for students curious about studying overseas",
    ],
    perks: [
      "Certificate of experience and letter of recommendation",
      "Performance-based incentives and rewards",
      "Mentorship from our counselling and marketing teams",
      "Priority guidance for your own study-abroad plans",
      "Flexible hours that fit around your classes",
    ],
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Careers at AIMU Global"
        subtitle="Join us in helping students achieve their dream of studying abroad."
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <h2 className="font-heading text-2xl font-bold text-navy">Open Positions</h2>
        </Reveal>

        <div className="mt-8 flex flex-col gap-8">
          {OPEN_ROLES.map((role) => (
            <Reveal key={role.title}>
              <div className="rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_10px_30px_-10px_rgba(10,25,47,0.1)]">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-heading text-xl font-semibold text-navy">{role.title}</h3>
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
                    {role.type}
                  </span>
                  <span className="rounded-full bg-light-gray px-3 py-1 text-xs font-medium text-navy/70">
                    {role.location}
                  </span>
                </div>

                <p className="mt-4 text-navy/80">{role.summary}</p>

                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="font-heading font-semibold text-navy">What You&rsquo;ll Do</p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {role.responsibilities.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-navy/80">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-navy">What You&rsquo;ll Get</p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {role.perks.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-navy/80">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-block rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
