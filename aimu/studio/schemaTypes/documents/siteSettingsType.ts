import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'AIMU Global' }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({
      name: 'stats',
      title: 'Homepage Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'value', type: 'string', description: 'e.g. "50+"' }),
            defineField({ name: 'label', type: 'string', description: 'e.g. "Partner Institutions"' }),
          ],
        },
      ],
    }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'whatsappNumber', type: 'string' }),
    defineField({ name: 'address', type: 'text' }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({ name: 'platform', type: 'string', options: { list: ['Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'Twitter'] } }),
            defineField({ name: 'url', type: 'url' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
