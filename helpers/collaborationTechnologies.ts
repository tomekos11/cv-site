import type { CommercialProjectSlug } from '~/composables/useCommercialProjects';

export const collaborationSpecializationTechnologyKeys = [
  'Vue',
  'Nuxt',
  'Quasar',
  'Laravel',
  'Node',
  'SEO',
  'REST',
  'SSR',
] as const;

export const collaborationProjectTechnologyKeys: Partial<Record<CommercialProjectSlug, string[]>> = {
  shopify: ['Shopify'],
  cemex: ['Vue', 'Quasar', 'Laravel'],
  'infra-team': ['Vue', 'Bootstrap', 'Laravel'],
};
