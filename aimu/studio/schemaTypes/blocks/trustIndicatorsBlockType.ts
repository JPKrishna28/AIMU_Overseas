import { defineType, defineField, defineArrayMember } from 'sanity'
import { BadgeIcon } from '@sanity/icons'

export const trustIndicatorsBlockType = defineType({
  name: 'trustIndicatorsBlock',
  title: 'Trust Indicators',
  type: 'object',
  icon: BadgeIcon,
  fields: [
    defineField({ name: 'heading', type: 'string', initialValue: 'Trusted by Thousands of Students Worldwide' }),
    defineField({ name: 'trustLine', type: 'text', description: 'e.g. "Join thousands of students who trusted AIMU Global..."' }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trustStat',
          fields: [
            defineField({ name: 'value', type: 'string', description: 'e.g. "5000+"' }),
            defineField({ name: 'label', type: 'string', description: 'e.g. "Students Guided"' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'partnerLogos',
      title: 'Partner Logos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'partnerLogo',
          fields: [
            defineField({ name: 'name', type: 'string' }),
            defineField({ name: 'logo', type: 'image' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'awards',
      title: 'Awards & Recognitions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Trust Indicators', media: BadgeIcon }
    },
  },
})
