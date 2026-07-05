import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const ctaBlockType = defineType({
  name: 'ctaBlock',
  title: 'Call To Action',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({ name: 'heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'subheading', type: 'text' }),
    defineField({ name: 'ctaLabel', type: 'string', title: 'CTA Label' }),
    defineField({ name: 'ctaUrl', type: 'url', title: 'CTA URL' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Call To Action', media: LinkIcon }
    },
  },
})
