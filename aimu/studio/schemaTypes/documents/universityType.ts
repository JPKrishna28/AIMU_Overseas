import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const universityType = defineType({
  name: 'university',
  title: 'University',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'overview', title: 'Overview' },
    { name: 'academics', title: 'Academics & Fees' },
    { name: 'community', title: 'Students & Community' },
    { name: 'location', title: 'Location & Accommodation' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required(), group: 'overview' }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
      group: 'overview',
    }),
    defineField({ name: 'logo', type: 'image', group: 'overview' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true }, group: 'overview' }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      group: 'overview',
    }),
    defineField({ name: 'destination', type: 'reference', to: [{ type: 'destination' }], validation: (rule) => rule.required(), group: 'overview' }),
    defineField({ name: 'city', type: 'string', group: 'overview' }),
    defineField({ name: 'ranking', type: 'string', description: 'e.g. "QS World #120"', group: 'overview' }),
    defineField({ name: 'overview', type: 'array', of: [{ type: 'block' }], group: 'overview' }),
    defineField({
      name: 'keyFacts',
      title: 'Key Facts',
      type: 'object',
      group: 'overview',
      fields: [
        defineField({ name: 'foundedYear', type: 'string', description: 'e.g. "1824"' }),
        defineField({ name: 'type', type: 'string', description: 'e.g. "Public Research University"' }),
        defineField({ name: 'studentStrength', type: 'string', description: 'e.g. "40,000+ students"' }),
        defineField({ name: 'internationalStudents', type: 'string', description: 'e.g. "8,000+ international students"' }),
      ],
    }),

    defineField({ name: 'courses', type: 'array', of: [{ type: 'reference', to: [{ type: 'course' }] }], group: 'academics' }),
    defineField({ name: 'tuitionFrom', type: 'string', description: 'e.g. "£14,000/year"', group: 'academics' }),
    defineField({
      name: 'tuitionFromUSD',
      title: 'Tuition From (USD, for filtering)',
      type: 'number',
      description: 'Annual tuition in USD, used only for the budget filter on the university search page',
      group: 'academics',
    }),
    defineField({
      name: 'feeStructure',
      title: 'Fee Structure Details',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'academics',
    }),
    defineField({
      name: 'paymentOptions',
      title: 'Payment Options',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'academics',
    }),
    defineField({ name: 'scholarshipsAvailable', type: 'boolean', group: 'academics' }),
    defineField({
      name: 'scholarships',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'scholarship' }] }],
      group: 'academics',
    }),
    defineField({ name: 'admissionRequirements', type: 'array', of: [{ type: 'block' }], group: 'academics' }),
    defineField({ name: 'studentSatisfaction', type: 'string', description: 'e.g. "88%"', group: 'academics' }),

    defineField({
      name: 'indianCommunity',
      title: 'Indian Student Community',
      type: 'object',
      group: 'community',
      fields: [
        defineField({ name: 'studentCount', type: 'string', description: 'e.g. "150+ Telugu students"' }),
        defineField({ name: 'description', type: 'text', description: 'Community support, associations, network details' }),
      ],
    }),
    defineField({
      name: 'studentTestimonials',
      title: 'Student Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      group: 'community',
    }),

    defineField({
      name: 'accommodation',
      title: 'Accommodation',
      type: 'object',
      group: 'location',
      fields: [
        defineField({ name: 'onCampus', type: 'text', description: 'On-campus housing options, cost, facilities' }),
        defineField({ name: 'offCampus', type: 'text', description: 'Off-campus housing options, cost, facilities' }),
      ],
    }),
    defineField({
      name: 'cityGuide',
      title: 'City Guide',
      type: 'object',
      group: 'location',
      fields: [
        defineField({ name: 'overview', type: 'text' }),
        defineField({ name: 'costOfLiving', type: 'string', description: 'e.g. "£900–1,200/month"' }),
        defineField({ name: 'climate', type: 'string' }),
        defineField({ name: 'safety', type: 'string' }),
      ],
    }),
    defineField({ name: 'nearestAirport', type: 'string', group: 'location' }),
    defineField({ name: 'airportDistance', title: 'Distance from Airport', type: 'string', description: 'e.g. "25 mins by car"', group: 'location' }),
    defineField({
      name: 'transportationOptions',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'location',
    }),

    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title', group: 'seo' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description', group: 'seo' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'city', media: 'logo' },
  },
})
