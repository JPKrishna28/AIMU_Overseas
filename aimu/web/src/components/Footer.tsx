import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { SITE_CONTACT } from "@/lib/siteContact";
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
      // Temporarily hidden — restore by uncommenting.
      // { href: "/scholarships", label: "Scholarships" },
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
      { href: "/student-chat", label: "Student Chat" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      // Temporarily hidden — restore by uncommenting.
      // { href: "/success-stories", label: "Success Stories" },
      { href: "/careers", label: "Careers" },
      // { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer({
  siteSettings,
  countries = [],
  courses = [],
}: {
  siteSettings: SITE_SETTINGS_QUERY_RESULT | (Partial<NonNullable<SITE_SETTINGS_QUERY_RESULT>> & Record<string, unknown>);
  countries?: string[];
  courses?: string[];
}) {
  return (
    <footer className="bg-ink text-white">
      <div id="footer-lead-form" className="mx-auto max-w-3xl scroll-mt-24 px-6 pt-16">
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
          <div className="flex items-center">
            <Image
              src="/footer_logo.png"
              alt="AIMU Global - Dream Beyond Borders"
              width={661}
              height={578}
              className="h-auto w-[150px] sm:w-[170px]"
            />
          </div>
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

      {/* Free Counselling + Contact Us CTA row */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 pb-10 sm:flex-row sm:justify-center">
        <a
          href="#footer-lead-form"
          className="w-full rounded-full bg-gold px-8 py-3 text-center text-sm font-semibold uppercase tracking-wider text-navy transition-all hover:brightness-110 sm:w-auto"
        >
          Free Counselling
        </a>
        <a
          href={`tel:${SITE_CONTACT.phone.replace(/\s+/g, "")}`}
          className="w-full rounded-full border border-white/30 px-8 py-3 text-center text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10 sm:w-auto"
        >
          Contact Us
        </a>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} AIMU Global. All rights reserved.
      </div>
    </footer>
  );
}
