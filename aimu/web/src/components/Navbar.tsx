"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PRIMARY_LINKS = [
  { href: "/destinations", label: "Destinations" },
  { href: "/universities", label: "Universities" },
  { href: "/courses", label: "Courses" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/test-preparation", label: "Test Prep" },
];

const TOOLS_LINKS = [
  { href: "/cost-calculator", label: "Cost Calculator" },
  { href: "/intake-calendar", label: "Intake Calendar" },
  { href: "/visa-guidance", label: "Visa Guidance" },
  { href: "/student-portal", label: "Student Portal" },
];

const SECONDARY_LINKS = [
  { href: "/blog", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on navigation
  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkClass =
    "border-b-2 border-transparent pb-1 text-sm font-medium text-navy/80 transition-colors hover:text-navy";
  const activeLinkClass = "border-b-2 border-gold pb-1 text-sm font-semibold text-navy";

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const toolsActive = TOOLS_LINKS.some((link) => isActive(link.href));

  return (
    <header className="sticky top-0 z-50 border-b border-light-gray bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight text-navy">
          AIMU <span className="text-gold">Global</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {PRIMARY_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={isActive(link.href) ? activeLinkClass : linkClass}>
              {link.label}
            </Link>
          ))}

          <div className="group relative">
            <button type="button" className={toolsActive ? activeLinkClass : linkClass}>
              Tools ▾
            </button>
            <div className="invisible absolute left-0 top-full flex w-48 translate-y-1 flex-col gap-1 rounded-xl border border-light-gray bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {TOOLS_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors hover:bg-light-gray hover:text-navy ${
                    isActive(link.href) ? "bg-gold/10 font-semibold text-navy" : "text-navy/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {SECONDARY_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={isActive(link.href) ? activeLinkClass : linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-all hover:brightness-110 active:scale-95 sm:block"
          >
            Book Consultation
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg lg:hidden"
          >
            <span
              className={`h-0.5 w-6 rounded bg-navy transition-transform duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-6 rounded bg-navy transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-6 rounded bg-navy transition-transform duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-light-gray bg-white transition-all duration-300 ease-out lg:hidden ${
          mobileOpen ? "max-h-[80vh] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {PRIMARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-light-gray hover:text-navy ${
                isActive(link.href) ? "border-l-4 border-gold bg-gold/10 font-semibold text-navy" : "text-navy/80"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setToolsOpen((open) => !open)}
            className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-navy/80 transition-colors hover:bg-light-gray hover:text-navy"
          >
            Tools
            <span className={`transition-transform duration-300 ${toolsOpen ? "rotate-180" : ""}`}>▾</span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${toolsOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
          >
            {TOOLS_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-6 py-2.5 text-sm transition-colors hover:bg-light-gray hover:text-navy ${
                  isActive(link.href) ? "border-l-4 border-gold bg-gold/10 font-semibold text-navy" : "text-navy/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {SECONDARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-light-gray hover:text-navy ${
                isActive(link.href) ? "border-l-4 border-gold bg-gold/10 font-semibold text-navy" : "text-navy/80"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-navy transition-all hover:brightness-110"
          >
            Book Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
