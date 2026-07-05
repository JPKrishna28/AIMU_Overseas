import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

export const featuresType = defineType({
  name: 'features',
  title: 'Features',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Feature Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'featureItem',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', type: 'text' }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Features', media: BlockContentIcon }
    },
  },
})
