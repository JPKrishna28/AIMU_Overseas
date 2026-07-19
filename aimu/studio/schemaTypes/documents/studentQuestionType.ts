import { defineType, defineField } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const studentQuestionType = defineType({
  name: 'studentQuestion',
  title: 'Student Question',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'question', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'createdAt', type: 'datetime', readOnly: true }),
    defineField({
      name: 'answers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string' }),
            defineField({ name: 'text', type: 'text' }),
            defineField({
              name: 'isAdmin',
              title: 'Answered by AIMU team',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({ name: 'createdAt', type: 'datetime' }),
          ],
          preview: {
            select: { title: 'text', subtitle: 'name' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'name' },
  },
})
