import { defineType, defineField, defineArrayMember } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons'

export const aboutBlockType = defineType({
  name: 'aboutBlock',
  title: 'About Company',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({ name: 'heading', type: 'string', initialValue: 'About AIMU Global' }),
    defineField({ name: 'mission', type: 'text' }),
    defineField({ name: 'vision', type: 'text' }),
    defineField({ name: 'whyFoundedHeading', type: 'string', initialValue: 'Why AIMU Global Was Founded' }),
    defineField({ name: 'whyFounded', type: 'text' }),
    defineField({
      name: 'coreValues',
      title: 'Core Values',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'coreValue',
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
      return { title: title || 'Untitled', subtitle: 'About Company', media: InfoOutlineIcon }
    },
  },
})
