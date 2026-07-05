import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings" && _id == "siteSettings"][0]`
);

export const PAGES_QUERY = defineQuery(
  `*[_type == "page" && defined(slug.current)] | order(title asc){ _id, title, slug }`
);

export const PAGE_QUERY = defineQuery(
  `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    seoTitle,
    seoDescription,
    pageBuilder[]{
      _key,
      _type,
      ...,
      destinations[]->{ _id, country, flagEmoji, slug, summary, heroImage, whyStudyPoints, galleryImages },
      courses[]->{
        _id,
        title,
        slug,
        category,
        duration,
        averageSalary,
        topUniversities[]->{ _id, destination->{ _id, country, slug } }
      },
      testimonials[]->{
        _id,
        studentName,
        headline,
        photo,
        quote,
        counsellorName,
        videoUrl,
        university->{ name },
        course->{ title },
        destination->{ country }
      }
    }
  }`
);

export const DESTINATIONS_QUERY = defineQuery(
  `*[_type == "destination"] | order(country asc){ _id, country, flagEmoji, slug, summary, heroImage, whyStudyPoints, galleryImages }`
);

export const DESTINATION_QUERY = defineQuery(
  `*[_type == "destination" && slug.current == $slug][0]{
    _id,
    country,
    flagEmoji,
    slug,
    heroImage,
    summary,
    whyStudyPoints,
    overview,
    tuitionFees,
    costOfLiving,
    visaInfo,
    visaGuidance,
    workRights,
    postStudyOpportunities,
    intakeMonths,
    seoTitle,
    seoDescription,
    popularCourses[]->{ _id, title, slug, category },
    universities[]->{ _id, name, slug, logo, city, ranking },
    scholarships[]->{ _id, name, slug, type, amount, deadline }
  }`
);

export const VISA_GUIDANCE_INDEX_QUERY = defineQuery(
  `*[_type == "destination" && defined(visaGuidance)] | order(country asc){
    _id,
    country,
    flagEmoji,
    slug,
    visaGuidance
  }`
);

export const INTAKE_CALENDAR_QUERY = defineQuery(
  `*[_type == "destination" && (defined(intakeMonths) || defined(applicationDeadlines))] | order(country asc){
    _id,
    country,
    flagEmoji,
    intakeMonths,
    applicationDeadlines
  }`
);

export const COST_CALCULATOR_QUERY = defineQuery(
  `*[_type == "destination" && defined(costBreakdownUSD)] | order(country asc){
    _id,
    country,
    flagEmoji,
    costBreakdownUSD,
    universities[]->{ _id, name }
  }`
);

export const UNIVERSITIES_QUERY = defineQuery(
  `*[_type == "university"] | order(name asc){
    _id,
    name,
    slug,
    logo,
    city,
    ranking,
    tuitionFrom,
    tuitionFromUSD,
    destination->{ _id, country, slug, intakeMonths },
    courses[]->{ _id, title, demand }
  }`
);

export const UNIVERSITY_QUERY = defineQuery(
  `*[_type == "university" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    logo,
    heroImage,
    galleryImages,
    city,
    ranking,
    overview,
    keyFacts,
    tuitionFrom,
    feeStructure,
    paymentOptions,
    scholarshipsAvailable,
    admissionRequirements,
    studentSatisfaction,
    indianCommunity,
    accommodation,
    cityGuide,
    nearestAirport,
    airportDistance,
    transportationOptions,
    seoTitle,
    seoDescription,
    destination->{ _id, country, slug },
    courses[]->{ _id, title, slug, category, duration },
    scholarships[]->{ _id, name, slug, type, amount },
    studentTestimonials[]->{
      _id,
      studentName,
      headline,
      photo,
      quote,
      counsellorName,
      videoUrl,
      university->{ name },
      course->{ title },
      destination->{ country }
    }
  }`
);

export const COURSES_QUERY = defineQuery(
  `*[_type == "course"] | order(title asc){
    _id,
    title,
    slug,
    category,
    duration,
    tuitionFrom,
    tuitionFromUSD,
    averageSalary,
    demand,
    careerOutcomes,
    topUniversities[]->{
      _id,
      name,
      slug,
      studentSatisfaction,
      destination->{ _id, country, slug, intakeMonths }
    }
  }`
);

export const COURSE_QUERY = defineQuery(
  `*[_type == "course" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    category,
    overview,
    duration,
    averageSalary,
    demand,
    admissionRequirements,
    careerOutcomes,
    seoTitle,
    seoDescription,
    topUniversities[]->{ _id, name, slug, city, destination->{ country } }
  }`
);

export const SCHOLARSHIPS_QUERY = defineQuery(
  `*[_type == "scholarship"] | order(deadline asc){
    _id,
    name,
    slug,
    type,
    amount,
    deadline,
    destination->{ country },
    university->{ name }
  }`
);

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    slug,
    category,
    excerpt,
    coverImage,
    publishedAt,
    author->{ name, photo }
  }`
);

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    category,
    excerpt,
    coverImage,
    body,
    publishedAt,
    seoTitle,
    seoDescription,
    author->{ name, photo, bio }
  }`
);

export const LEAD_FORM_OPTIONS_QUERY = defineQuery(
  `{
    "countries": *[_type == "destination"] | order(country asc).country,
    "courses": *[_type == "course"] | order(title asc).title
  }`
);

export const TESTIMONIALS_QUERY = defineQuery(
  `*[_type == "testimonial"]{
    _id,
    studentName,
    headline,
    photo,
    quote,
    counsellorName,
    videoUrl,
    university->{ name },
    course->{ title },
    destination->{ country }
  }`
);
