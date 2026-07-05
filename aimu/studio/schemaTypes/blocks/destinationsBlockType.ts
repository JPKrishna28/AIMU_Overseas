import { defineType, defineField } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

export const destinationsBlockType = defineType({
  name: 'destinationsBlock',
  title: 'Destinations Showcase',
  type: 'object',
  icon: EarthGlobeIcon,
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      name: 'destinations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'destination' }] }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Destinations Showcase', media: EarthGlobeIcon }
    },
  },
})
