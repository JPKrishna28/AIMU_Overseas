import { defineType, defineArrayMember } from 'sanity'

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineArrayMember({ type: 'hero' }),
    defineArrayMember({ type: 'features' }),
    defineArrayMember({ type: 'trustBlock' }),
    defineArrayMember({ type: 'trustIndicatorsBlock' }),
    defineArrayMember({ type: 'aboutBlock' }),
    defineArrayMember({ type: 'timelineBlock' }),
    defineArrayMember({ type: 'destinationsBlock' }),
    defineArrayMember({ type: 'coursesBlock' }),
    defineArrayMember({ type: 'testimonialsBlock' }),
    defineArrayMember({ type: 'ctaBlock' }),
  ],
})
