/**
 * Static artwork from the Stitch "Next-Gen Consulting UI" mockups, served from
 * /public/images/stitch. Used as backgrounds and fallbacks when Sanity content
 * has no image yet — Sanity images always take precedence.
 */

export const STITCH_IMAGES = {
  homeHero: "/images/stitch/home-hero.jpg",
  destinationsHero: "/images/explorestudydestinations.webp",
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
  "united kingdom": "/images/uk.webp",
  uk: "/images/uk.webp",
  canada: "/images/canada.webp",
  australia: "/images/australia.webp",
  "united states": "/images/usa.webp",
  "united states of america": "/images/usa.webp",
  usa: "/images/usa.webp",
  france: "/images/france.webp",
  germany: "/images/germany.webp",
  ireland: "/images/ireland.webp",
};

const COUNTRY_CYCLE = [
  "/images/uk.webp",
  "/images/canada.webp",
  "/images/australia.webp",
  "/images/usa.webp",
  "/images/france.webp",
  "/images/germany.webp",
  "/images/ireland.webp",
];

/** Country-specific campus artwork; falls back to a rotating pick so grids stay varied. */
export function countryImage(country: string | null | undefined, index = 0): string {
  const exact = country ? COUNTRY_IMAGES[country.trim().toLowerCase()] : undefined;
  return exact ?? COUNTRY_CYCLE[index % COUNTRY_CYCLE.length];
}

/** Hero artwork for the per-country destination pages, keyed by slug or country name. */
const COUNTRY_PAGE_IMAGES: Record<string, string> = {
  uk: "/images/uk_overview.webp",
  "united kingdom": "/images/uk_overview.webp",
  "united-kingdom": "/images/uk_overview.webp",
  usa: "/images/usa_country.webp",
  "united states": "/images/usa_country.webp",
  "united-states": "/images/usa_country.webp",
  "united states of america": "/images/usa_country.webp",
  canada: "/images/canada_country.webp",
  france: "/images/france_overview.webp",
  germany: "/images/germany_overview.webp",
  ireland: "/images/ireland_overview.webp",
};

/** Image shown at the top of a country's destination page; null when we have none. */
export function countryPageImage(countryOrSlug: string | null | undefined): string | null {
  return countryOrSlug ? COUNTRY_PAGE_IMAGES[countryOrSlug.trim().toLowerCase()] ?? null : null;
}
