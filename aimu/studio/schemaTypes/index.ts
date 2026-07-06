import { pageType } from './pageType'
import { pageBuilderType } from './pageBuilderType'

import { heroType } from './blocks/heroType'
import { featuresType } from './blocks/featuresType'
import { trustBlockType } from './blocks/trustBlockType'
import { trustIndicatorsBlockType } from './blocks/trustIndicatorsBlockType'
import { aboutBlockType } from './blocks/aboutBlockType'
import { timelineBlockType } from './blocks/timelineBlockType'
import { destinationsBlockType } from './blocks/destinationsBlockType'
import { coursesBlockType } from './blocks/coursesBlockType'
import { testimonialsBlockType } from './blocks/testimonialsBlockType'
import { ctaBlockType } from './blocks/ctaBlockType'
import { journeyBlockType } from './blocks/journeyBlockType'
import { leadershipBlockType } from './blocks/leadershipBlockType'
import { campusToursBlockType } from './blocks/campusToursBlockType'
import { gatedFeaturesBlockType } from './blocks/gatedFeaturesBlockType'

import { destinationType } from './documents/destinationType'
import { universityType } from './documents/universityType'
import { courseType } from './documents/courseType'
import { scholarshipType } from './documents/scholarshipType'
import { authorType } from './documents/authorType'
import { postType } from './documents/postType'
import { testimonialType } from './documents/testimonialType'
import { siteSettingsType } from './documents/siteSettingsType'
import { leadType } from './documents/leadType'

export const schemaTypes = [
  // documents
  pageType,
  destinationType,
  universityType,
  courseType,
  scholarshipType,
  authorType,
  postType,
  testimonialType,
  siteSettingsType,
  leadType,
  // page builder
  pageBuilderType,
  heroType,
  featuresType,
  trustBlockType,
  trustIndicatorsBlockType,
  aboutBlockType,
  timelineBlockType,
  destinationsBlockType,
  coursesBlockType,
  testimonialsBlockType,
  ctaBlockType,
  journeyBlockType,
  leadershipBlockType,
  campusToursBlockType,
  gatedFeaturesBlockType,
]
