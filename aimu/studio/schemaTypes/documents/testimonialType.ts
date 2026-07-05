import { defineType, defineField } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Success Story',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({ name: 'studentName', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'headline',
      type: 'string',
      description: 'e.g. "Study in UK — Journey of Shailja Kumar"',
    }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'university', type: 'reference', to: [{ type: 'university' }] }),
    defineField({ name: 'course', type: 'reference', to: [{ type: 'course' }] }),
    defineField({ name: 'destination', type: 'reference', to: [{ type: 'destination' }] }),
    defineField({ name: 'quote', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'counsellorName', type: 'string', description: 'e.g. "Senior Counsellor Nabeel"' }),
    defineField({ name: 'videoUrl', type: 'url', title: 'Video URL (YouTube)' }),
  ],
  preview: {
    select: { title: 'studentName', media: 'photo' },
  },
})
