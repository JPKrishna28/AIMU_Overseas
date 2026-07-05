import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const leadType = defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'fullName', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'email', type: 'string', validation: (rule) => rule.required().email() }),
    defineField({ name: 'phone', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'preferredCountry', type: 'string' }),
    defineField({ name: 'interestedCourse', type: 'string' }),
    defineField({ name: 'source', type: 'string', description: 'Which page/form the lead came from', readOnly: true }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['New', 'Contacted', 'Converted', 'Closed'], layout: 'radio' },
      initialValue: 'New',
    }),
    defineField({ name: 'submittedAt', type: 'datetime', readOnly: true }),
  ],
  preview: {
    select: { title: 'fullName', subtitle: 'email' },
  },
})
