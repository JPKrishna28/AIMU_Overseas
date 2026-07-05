import { defineType, defineField, defineArrayMember } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const timelineBlockType = defineType({
  name: 'timelineBlock',
  title: 'Timeline / Journey',
  type: 'object',
  icon: CalendarIcon,
  fields: [
    defineField({ name: 'heading', type: 'string', initialValue: 'Our Journey' }),
    defineField({
      name: 'milestones',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'milestone',
          fields: [
            defineField({ name: 'year', type: 'string', description: 'e.g. "2022" or "2026 & Beyond"', validation: (rule) => rule.required() }),
            defineField({ name: 'description', type: 'text', validation: (rule) => rule.required() }),
          ],
          preview: {
            select: { title: 'year', subtitle: 'description' },
          },
        }),
      ],
    }),
    defineField({ name: 'futureVisionHeading', type: 'string', initialValue: 'Future Vision' }),
    defineField({ name: 'futureVision', type: 'text' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Timeline / Journey', media: CalendarIcon }
    },
  },
})
