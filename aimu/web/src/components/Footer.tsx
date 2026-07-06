import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import type { SITE_SETTINGS_QUERY_RESULT } from "../../sanity.types";

const FOOTER_LINKS = [
  {
    heading: "Destinations",
    links: [
      { href: "/destinations", label: "All Destinations" },
      { href: "/universities", label: "Universities" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { href: "/courses", label: "Courses" },
      { href: "/scholarships", label: "Scholarships" },
      { href: "/blog", label: "Resources" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { href: "/cost-calculator", label: "Cost Calculator" },
      { href: "/intake-calendar", label: "Intake Calendar" },
      { href: "/visa-guidance", label: "Visa Guidance" },
      { href: "/student-portal", label: "Student Portal" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/success-stories", label: "Success Stories" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer({
  siteSettings,
  countries = [],
  courses = [],
}: {
  siteSettings: SITE_SETTINGS_QUERY_RESULT;
  countries?: string[];
  courses?: string[];
}) {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-3xl px-6 pt-16">
        <div className="rounded-2xl bg-white/5 p-8">
          <h2 className="font-heading text-xl font-bold">Get Free Counseling</h2>
          <p className="mt-2 text-sm text-white/70">
            Tell us your goals and a counsellor will get back to you shortly.
          </p>
          <div className="mt-6 [&_input]:bg-white/10 [&_input]:border-white/20 [&_input]:text-white [&_input::placeholder]:text-white/50 [&_select]:bg-white/10 [&_select]:border-white/20 [&_select]:text-white">
            <LeadForm countries={countries} courses={courses} source="footer" />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <p className="font-heading text-lg font-bold">
            AIMU <span className="text-gold">Global</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            {siteSettings?.tagline ??
              "A Global Education & Career Advisory Platform powered by trusted expertise and intelligent technology."}
          </p>
        </div>

        {FOOTER_LINKS.map((group) => (
          <div key={group.heading}>
            <p className="text-sm font-semibold text-gold">{group.heading}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-sm font-semibold text-gold">Contact</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-white/70">
            {siteSettings?.phone && <li>{siteSettings.phone}</li>}
            {siteSettings?.email && <li>{siteSettings.email}</li>}
            {siteSettings?.address && <li>{siteSettings.address}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} AIMU Global. All rights reserved.
      </div>
    </footer>
  );
}
