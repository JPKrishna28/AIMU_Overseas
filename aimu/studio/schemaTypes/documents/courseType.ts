import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const courseType = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          'Business', 'Engineering', 'Computer Science', 'Artificial Intelligence',
          'Cyber Security', 'Data Science', 'Healthcare', 'Finance', 'Law', 'Psychology', 'Design',
        ],
      },
    }),
    defineField({ name: 'overview', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'duration', type: 'string', description: 'e.g. "1 year"' }),
    defineField({ name: 'tuitionFrom', type: 'string', description: 'e.g. "£15,000/year"' }),
    defineField({
      name: 'tuitionFromUSD',
      title: 'Tuition From (USD, for filtering)',
      type: 'number',
      description: 'Annual tuition in USD, used only for the Course Finder budget filter',
    }),
    defineField({ name: 'averageSalary', type: 'string', description: 'e.g. "£45,000/year"' }),
    defineField({ name: 'demand', type: 'string', options: { list: ['Low', 'Medium', 'High', 'Very High'] } }),
    defineField({
      name: 'topUniversities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'university' }] }],
      description: 'Used to derive the "Countries" and "Universities" counts shown on course cards',
    }),
    defineField({ name: 'admissionRequirements', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'careerOutcomes', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
})
