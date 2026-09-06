"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthNav } from "@/components/AuthNav";

const PRIMARY_LINKS = [
  { href: "/destinations", label: "Destinations" },
  { href: "/universities", label: "Universities" },
  { href: "/courses", label: "Courses" },
  // Temporarily hidden — restore by uncommenting.
  // { href: "/scholarships", label: "Scholarships" },
  // { href: "/test-preparation", label: "Test Prep" },
  { href: "/careers", label: "Careers" },
];

const TOOLS_LINKS = [
  { href: "/cost-calculator", label: "Cost Calculator" },
  { href: "/intake-calendar", label: "Intake Calendar" },
  { href: "/visa-guidance", label: "Visa Guidance" },
  // Temporarily hidden — restore by uncommenting.
  // { href: "/student-portal", label: "Student Portal" },
  // { href: "/student-chat", label: "Student Chat" },
];

const SECONDARY_LINKS = [
  { href: "/blog", label: "Resources" },
  { href: "/about", label: "About" },
  // Temporarily hidden — restore by uncommenting.
  // { href: "/success-stories", label: "Success Stories" },
  // { href: "/contact", label: "Contact" },
];

// Mobile bottom tab bar — icon-first navigation, replaces the hamburger menu.
const MOBILE_TABS = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/destinations", label: "Destinations", icon: "public" },
  { href: "/universities", label: "Universities", icon: "school" },
  { href: "/courses", label: "Courses", icon: "menu_book" },
  { href: "/cost-calculator", label: "Tools", icon: "calculate" },
  { href: "/login", label: "Sign in", icon: "person" },
];

export function Navbar() {
  const pathname = usePathname();

  const linkClass =
    "border-b-2 border-transparent pb-1 text-sm font-medium text-navy/80 transition-colors hover:text-navy";
  const activeLinkClass = "border-b-2 border-gold pb-1 text-sm font-semibold text-navy";

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const toolsActive = TOOLS_LINKS.some((link) => isActive(link.href));

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-light-gray bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-10 px-4 py-3 sm:px-8">
          <Link href="/" aria-label="AIMU Global home" className="flex shrink-0 items-center text-navy">
            <Image
              src="/logo.png"
              alt="AIMU Global - Dream Beyond Borders"
              width={1536}
              height={1024}
              priority
              /* width drives the size; height follows the 1536:1024 ratio */
              className="h-auto w-[84px] sm:w-[104px] md:w-[112px] lg:w-[120px]"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
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

          <div className="hidden lg:flex">
            <AuthNav />
          </div>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-light-gray bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1">
          {MOBILE_TABS.map((tab) => {
            const active = isActive(tab.href);
            return (
              <li key={tab.href} className="flex-1">
                <Link
                  href={tab.href}
                  className={`flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-medium transition-colors ${
                    active ? "text-navy" : "text-navy/55 hover:text-navy"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[22px] ${active ? "text-gold" : ""}`}
                    aria-hidden
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

    </>
  );
}
