import { defineType, defineField, defineArrayMember } from 'sanity'
import { CheckmarkCircleIcon } from '@sanity/icons'

export const trustBlockType = defineType({
  name: 'trustBlock',
  title: 'Trust Section',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trustItem',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', type: 'text' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Trust Section', media: CheckmarkCircleIcon }
    },
  },
})
