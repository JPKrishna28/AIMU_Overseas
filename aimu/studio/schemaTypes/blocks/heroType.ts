import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'rotatingQuotes',
      title: 'Rotating Quotes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Motivational quotes that rotate/type above the headline',
    }),
    defineField({ name: 'heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'subheading', type: 'text' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ctaLabel', type: 'string', title: 'Primary CTA Label' }),
    defineField({ name: 'ctaUrl', type: 'url', title: 'Primary CTA URL' }),
    defineField({ name: 'secondaryCtaLabel', type: 'string', title: 'Secondary CTA Label' }),
    defineField({ name: 'secondaryCtaUrl', type: 'url', title: 'Secondary CTA URL' }),
    defineField({ name: 'tertiaryCtaLabel', type: 'string', title: 'Tertiary CTA Label' }),
    defineField({ name: 'tertiaryCtaUrl', type: 'url', title: 'Tertiary CTA URL' }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Untitled', subtitle: 'Hero', media: media ?? ImageIcon }
    },
  },
})
