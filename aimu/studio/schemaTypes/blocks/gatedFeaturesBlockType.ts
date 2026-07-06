import { defineType, defineField, defineArrayMember } from 'sanity'
import { LockIcon } from '@sanity/icons'

export const gatedFeaturesBlockType = defineType({
  name: 'gatedFeaturesBlock',
  title: 'Gated Section (Members Only)',
  type: 'object',
  icon: LockIcon,
  description: 'Content hidden until the visitor creates an account (submits their details)',
  fields: [
    defineField({ name: 'heading', type: 'string', initialValue: 'Why Students Choose AIMU Global' }),
    defineField({
      name: 'teaser',
      type: 'text',
      description: 'Public text shown above the unlock form — the items themselves stay hidden',
      initialValue: 'Create a free account to see why AIMU is different.',
    }),
    defineField({ name: 'unlockCtaLabel', type: 'string', initialValue: 'Create Account & Unlock' }),
    defineField({
      name: 'items',
      title: 'Confidential Items',
      type: 'array',
      description: 'Only visible to visitors after they create an account',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'gatedItem',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', type: 'text' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Untitled', subtitle: 'Gated Section (Members Only)', media: LockIcon }
    },
  },
})
