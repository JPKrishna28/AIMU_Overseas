/**
 * Static artwork from the Stitch "Next-Gen Consulting UI" mockups, served from
 * /public/images/stitch. Used as backgrounds and fallbacks when Sanity content
 * has no image yet — Sanity images always take precedence.
 */

export const STITCH_IMAGES = {
  homeHero: "/images/stitch/home-hero.jpg",
  destinationsHero: "/images/stitch/destinations-hero.jpg",
  visaPassport: "/images/stitch/visa-passport.jpg",
  resourcesLibrary: "/images/stitch/resources-library.jpg",
  resourcesCityscape: "/images/stitch/resources-cityscape.jpg",
  contactOffice: "/images/stitch/contact-office.jpg",
  contactBoardroom: "/images/stitch/contact-boardroom.jpg",
  scholarshipUk: "/images/stitch/scholarship-uk.jpg",
  scholarshipLab: "/images/stitch/scholarship-lab.jpg",
  scholarshipIvy: "/images/stitch/scholarship-ivy.jpg",
  courseLab: "/images/stitch/course-lab.jpg",
  courseLibrary: "/images/stitch/course-library.jpg",
  campusManchester: "/images/stitch/campus-manchester.jpg",
  campusToronto: "/images/stitch/campus-toronto.jpg",
} as const;

const COUNTRY_IMAGES: Record<string, string> = {
  "united kingdom": "/images/stitch/uk.jpg",
  uk: "/images/stitch/uk.jpg",
  canada: "/images/stitch/canada.jpg",
  australia: "/images/stitch/australia.jpg",
  "united states": "/images/stitch/usa.jpg",
  usa: "/images/stitch/usa.jpg",
};

const COUNTRY_CYCLE = [
  "/images/stitch/uk.jpg",
  "/images/stitch/canada.jpg",
  "/images/stitch/australia.jpg",
  "/images/stitch/usa.jpg",
];

/** Country-specific campus artwork; falls back to a rotating pick so grids stay varied. */
export function countryImage(country: string | null | undefined, index = 0): string {
  const exact = country ? COUNTRY_IMAGES[country.trim().toLowerCase()] : undefined;
  return exact ?? COUNTRY_CYCLE[index % COUNTRY_CYCLE.length];
}
