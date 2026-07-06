import { defineType, defineField, defineArrayMember } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const leadershipBlockType = defineType({
  name: 'leadershipBlock',
  title: 'Leadership Messages',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'heading', type: 'string', initialValue: 'Leadership Messages' }),
    defineField({
      name: 'subheading',
      type: 'text',
      initialValue: 'Hear directly from the visionaries behind AIMU.',
    }),
    defineField({
      name: 'messages',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'leaderMessage',
          fields: [
            defineField({ name: 'role', type: 'string', description: 'e.g. "Chairman", "CEO"', validation: (rule) => rule.required() }),
            defineField({ name: 'name', type: 'string' }),
            defineField({ name: 'messageTitle', type: 'string', description: 'e.g. "A Vision for Global Education"' }),
            defineField({ name: 'videoUrl', type: 'url', description: 'YouTube link to the message video' }),
            defineField({ name: 'photo', type: 'image', options: { hotspot: true }, description: 'Thumbnail shown before the video plays' }),
          ],
          preview: {
            select: { title: 'role', subtitle: 'messageTitle', media: 'photo' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Leadership Messages', media: UsersIcon }
    },
  },
})
