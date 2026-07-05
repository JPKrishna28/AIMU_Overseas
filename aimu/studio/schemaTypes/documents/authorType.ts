import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', type: 'text' }),
  ],
  preview: {
    select: { title: 'name', media: 'photo' },
  },
})
