import { defineType, defineField, defineArrayMember } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const campusToursBlockType = defineType({
  name: 'campusToursBlock',
  title: 'Campus Tours',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({ name: 'heading', type: 'string', initialValue: 'Visit Universities' }),
    defineField({
      name: 'subheading',
      type: 'text',
      initialValue: 'How is the campus? What does student life look like?',
    }),
    defineField({
      name: 'tours',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'campusTour',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', type: 'text' }),
            defineField({ name: 'videoUrl', type: 'url', description: 'YouTube link — official university video or narrated slideshow' }),
            defineField({ name: 'thumbnail', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'university', type: 'reference', to: [{ type: 'university' }] }),
          ],
          preview: {
            select: { title: 'title', media: 'thumbnail' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Campus Tours', media: PlayIcon }
    },
  },
})
