import { defineType, defineField } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const scholarshipType = defineType({
  name: 'scholarship',
  title: 'Scholarship',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: { list: ['Merit', 'Need-based', 'Government', 'Private'], layout: 'radio' },
    }),
    defineField({ name: 'destination', type: 'reference', to: [{ type: 'destination' }] }),
    defineField({ name: 'university', type: 'reference', to: [{ type: 'university' }] }),
    defineField({ name: 'amount', type: 'string', description: 'e.g. "Up to £5,000"' }),
    defineField({ name: 'eligibility', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'deadline', type: 'date' }),
    defineField({ name: 'applyUrl', type: 'url' }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'type' },
  },
})
