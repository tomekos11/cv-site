

export const usePerson = () => {
  const { t } = useI18n();

  const person = computed(() => ({
    '@type': 'Person' as const,
    'name': 'Tomasz Słapiński',
    'alternateName': 'Tomasz Slapinski',
    'jobTitle': 'Full-Stack Developer',
    'url': 'https://cv.tomasz-slapinski.pl',
    'email': 'tom.slapinski@gmail.com',
    'description': t('seo.description'),
    'sameAs': [
      'https://www.linkedin.com/in/tomasz-slapinski/',
      'https://github.com/tomekos11'
    ],
    'image': 'https://cv.tomasz-slapinski.pl/assets/icons/img/2023_linkedin_no_bg.webp',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'ul. Przykładowa 12',
      'addressLocality': 'Rzeszów',
      'addressRegion': 'PL-18',
      'postalCode': '00-123',
      'addressCountry': t('seo.country')
    },
    'memberOf': {
      '@type': 'OrganizationRole',
      'roleName': 'Full-Stack Developer',
      'startDate': '2023-07-01',
      'memberOf': {
        '@type': 'Organization',
        'name': 'Polcar',
        'url': 'https://www.polcar.com'
      },
    },
    'hasOccupation': {
      '@type': 'Role',
      'hasOccupation': {
        '@type': 'Occupation',
        'name': 'Full-Stack Developer',
        'description': t('seo.role.description'),
        'estimatedSalary': {
          '@type': 'MonetaryAmountDistribution',
          'name': t('seo.baseSalary'),
          'currency': 'USD',
          'duration': 'P1Y',
          'percentile10': 10950,
          'percentile25': 14405,
          'median': 20630,
          'percentile75': 34025,
          'percentile90': 49750
        },
        'occupationLocation': [
          {
            '@type': 'City',
            'name': 'Rzeszów'
          },
          {
            '@type': 'Country',
            'name': t('seo.country')
          }
        ],
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': 'https://cv.tomasz-slapinski.pl',
          'lastReviewed': '2025-04-07'
        }
      }
    },
    'knowsAbout': [
      'JavaScript',
      'TypeScript',
      'Vue',
      'Vue.js',
      'Quasar',
      'Nuxt',
      'SSR',
      'Seo',
      'Docker',
      'Node.js',
      'PHP',
      'Laravel',
    ],
    'worksFor': [
      {
        '@type': 'Organization',
        'name': 'Polcar',
        'url': 'https://www.polcar.com'
      },
      {
        '@type': 'Organization',
        'name': 'StormCode',
        'url': 'https://stormcode.pl/'
      },
      {
        '@type': 'Organization',
        'name': 'Infra Team',
        'url': 'https://infrateam.eu/'
      }
    ],
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://cv.tomasz-slapinski.pl'
    },
    'gender': 'Male',
  }));

  return {
    person
  };
};