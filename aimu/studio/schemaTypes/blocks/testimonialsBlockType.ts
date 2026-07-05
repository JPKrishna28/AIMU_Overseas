import { defineType, defineField } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const testimonialsBlockType = defineType({
  name: 'testimonialsBlock',
  title: 'Success Stories Showcase',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Success Stories Showcase', media: CommentIcon }
    },
  },
})
