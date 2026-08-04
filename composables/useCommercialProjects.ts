export type CommercialProjectSlug = 'nda' | 'shopify' | 'cemex' | 'infra-team';

export interface CommercialProject {
  company: string;
  shortDescription: string;
  slug: CommercialProjectSlug;
  logo: string | null;
  technologies: string[];
}

export function useCommercialProjects() {
  const { t } = useI18n();

  const commercialProjects = computed<CommercialProject[]>(() => [
    {
      company: t('commercialProjects.nda.name'),
      shortDescription: t('commercialProjects.nda.shortDescription'),
      slug: 'nda',
      logo: null,
      technologies: [],
    },
    {
      company: 'Adastra',
      shortDescription: t('commercialProjects.shopify.shortDescription'),
      slug: 'shopify',
      logo: '/assets/icons/companies/adastra.webp',
      technologies: ['Shopify'],
    },
    {
      company: 'StormCode',
      shortDescription: t('commercialProjects.infraTeam2.shortDescription'),
      slug: 'cemex',
      logo: '/assets/icons/companies/stormcode.png',
      technologies: ['Vue', 'Quasar', 'Laravel'],
    },
    {
      company: 'Infra Team',
      shortDescription: t('commercialProjects.infraTeam1.shortDescription'),
      slug: 'infra-team',
      logo: '/assets/icons/companies/infrateam_no_bg.png',
      technologies: ['Vue', 'Bootstrap', 'Laravel'],
    },
  ]);

  return { commercialProjects };
}
