import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { FooterPlane } from "@/components/FooterPlane";
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
      { href: "/success-stories", label: "Success Stories" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

const SOCIALS: { href: string; label: string; icon: ReactNode }[] = [
  {
    href: "mailto:info@aimuglobal.com",
    label: "Email",
    icon: (
      <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h13A1.5 1.5 0 0 1 18 5.5v9A1.5 1.5 0 0 1 16.5 16h-13A1.5 1.5 0 0 1 2 14.5v-9Zm2.2.5L10 10.2 15.8 6H4.2Zm11.8 1.2-6 4.3-6-4.3v7.1h12V7.2Z" />
    ),
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: (
      <path d="M10 6.7a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Zm0 5.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm3.4-5.6a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0ZM16 6.3c-.1-1-.3-2-1-2.7-.8-.7-1.7-1-2.7-1C11.2 2.5 8.8 2.5 7.7 2.6c-1 0-2 .3-2.7 1-.7.7-1 1.7-1 2.7C4 7.4 4 9.8 4 10.9c0 1 .3 2 1 2.7.7.7 1.7 1 2.7 1 1.1.1 3.5.1 4.6 0 1 0 2-.3 2.7-1 .7-.7 1-1.7 1-2.7.1-1.1.1-3.5 0-4.6ZM14.6 12c-.2.6-.7 1-1.3 1.3-.9.3-3 .3-4 .3s-3.1 0-4-.3c-.6-.3-1-.7-1.3-1.3-.3-.9-.3-3-.3-4s0-3.1.3-4c.3-.6.7-1 1.3-1.3.9-.3 3-.3 4-.3s3.1 0 4 .3c.6.3 1 .7 1.3 1.3.3.9.3 3 .3 4s0 3.1-.3 4Z" />
    ),
  },
  {
    href: "https://www.youtube.com/",
    label: "YouTube",
    icon: (
      <path d="M17.4 6.4a1.9 1.9 0 0 0-1.3-1.3C14.9 4.8 10 4.8 10 4.8s-4.9 0-6.1.3A1.9 1.9 0 0 0 2.6 6.4C2.3 7.6 2.3 10 2.3 10s0 2.4.3 3.6a1.9 1.9 0 0 0 1.3 1.3c1.2.3 6.1.3 6.1.3s4.9 0 6.1-.3a1.9 1.9 0 0 0 1.3-1.3c.3-1.2.3-3.6.3-3.6s0-2.4-.3-3.6ZM8.5 12.3V7.7l4 2.3-4 2.3Z" />
    ),
  },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    icon: (
      <path d="M6.1 5A1.1 1.1 0 1 1 6 2.8 1.1 1.1 0 0 1 6.1 5ZM5 6.6h2.2v9.6H5V6.6Zm4 0h2.1v1.3h.1a2.3 2.3 0 0 1 2.1-1.1c2.2 0 2.7 1.5 2.7 3.4v6h-2.2v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8v5.4H9V6.6Z" />
    ),
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

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
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

          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#3870dc] bg-[#3870dc] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#2f5fc7]"
          >
            Book a Free Consultation →
          </Link>

          <div className="mt-8">
            <p className="text-[15px] text-white/80">Socials</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-[50px] w-[50px] items-center justify-center rounded-xl border border-[#5e5e5e] bg-[#4f4f4f] text-white/90 transition-colors hover:bg-[#5e5e5e]"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
                      {s.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
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

      <div className="mx-auto max-w-7xl px-6 pb-6 text-sm font-medium text-[#848587]">
        © {new Date().getFullYear()} AIMU Global. All rights reserved.
      </div>

      {/* marbles.health-style blue band with a 3D aircraft breaking the top edge */}
      <div className="relative mt-8 h-[240px] overflow-visible rounded-t-[20px] bg-[#3870dc] sm:h-[280px]">
        <FooterPlane className="pointer-events-none absolute left-1/2 bottom-0 h-[360px] w-[560px] max-w-[92vw] -translate-x-1/2 sm:h-[440px] sm:w-[720px] lg:h-[500px] lg:w-[880px]" />
      </div>
    </footer>
  );
}
