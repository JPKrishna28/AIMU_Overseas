/**
 * Static artwork from the Stitch "Next-Gen Consulting UI" mockups, served from
 * /public/images/stitch. Used as backgrounds and fallbacks when Sanity content
 * has no image yet — Sanity images always take precedence.
 */

export const STITCH_IMAGES = {
  homeHero: "/images/stitch/home-hero.jpg",
  destinationsHero: "/images/explorestudydestinations.jpeg",
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
  "united kingdom": "/images/uk.jpeg",
  uk: "/images/uk.jpeg",
  canada: "/images/canada.jpeg",
  australia: "/images/australia.jpeg",
  "united states": "/images/usa.jpeg",
  "united states of america": "/images/usa.jpeg",
  usa: "/images/usa.jpeg",
  france: "/images/france.jpeg",
  germany: "/images/germany.jpeg",
  ireland: "/images/ireland.jpeg",
};

const COUNTRY_CYCLE = [
  "/images/uk.jpeg",
  "/images/canada.jpeg",
  "/images/australia.jpeg",
  "/images/usa.jpeg",
  "/images/france.jpeg",
  "/images/germany.jpeg",
  "/images/ireland.jpeg",
];

/** Country-specific campus artwork; falls back to a rotating pick so grids stay varied. */
export function countryImage(country: string | null | undefined, index = 0): string {
  const exact = country ? COUNTRY_IMAGES[country.trim().toLowerCase()] : undefined;
  return exact ?? COUNTRY_CYCLE[index % COUNTRY_CYCLE.length];
}

/** Hero artwork for the per-country destination pages, keyed by slug or country name. */
const COUNTRY_PAGE_IMAGES: Record<string, string> = {
  uk: "/images/uk_overview.jpeg",
  "united kingdom": "/images/uk_overview.jpeg",
  "united-kingdom": "/images/uk_overview.jpeg",
  usa: "/images/usa_country.jpeg",
  "united states": "/images/usa_country.jpeg",
  "united-states": "/images/usa_country.jpeg",
  "united states of america": "/images/usa_country.jpeg",
  canada: "/images/canada_country.jpeg",
  france: "/images/france_overview.jpeg",
  germany: "/images/germany_overview.jpeg",
  ireland: "/images/ireland_overview.jpeg",
};

/** Image shown at the top of a country's destination page; null when we have none. */
export function countryPageImage(countryOrSlug: string | null | undefined): string | null {
  return countryOrSlug ? COUNTRY_PAGE_IMAGES[countryOrSlug.trim().toLowerCase()] ?? null : null;
}
