import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const coursesBlockType = defineType({
  name: 'coursesBlock',
  title: 'Courses Showcase',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      name: 'courses',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'course' }] }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Courses Showcase', media: DocumentTextIcon }
    },
  },
})
