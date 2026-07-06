import { defineType, defineField } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export const journeyBlockType = defineType({
  name: 'journeyBlock',
  title: 'Student Journey',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({ name: 'heading', type: 'string', initialValue: 'Student Journey' }),
    defineField({ name: 'subheading', type: 'text' }),
    defineField({
      name: 'steps',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Journey steps in order, e.g. "Free Consultation", "Career Guidance", …',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Student Journey', media: RocketIcon }
    },
  },
})
