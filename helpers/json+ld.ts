export default JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'Tomasz Słapiński',
  'jobTitle': 'Full-Stack Developer',
  'url': 'https://cv.tomasz-slapinski.pl',
  'email': 'tom.slapinski@gmail.com',
  'sameAs': [
    'https://www.linkedin.com/in/tomasz-slapinski/',
    'https://github.com/tomekos11'
  ],
  'image': 'https://cv.tomasz-slapinski.pl/assets/icons/img/2023_linkedin_no_bg.webp',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'ul. Przykładowa 12',
    'addressLocality': 'Rzeszów',
    'addressRegion': 'Podkarpacie',
    'postalCode': '00-123',
    'addressCountry': t('seo.country')
  },
  'hasOccupation': [
    {
      '@type': 'Role',
      'hasOccupation': {
        '@type': 'Occupation',
        'name': 'Full-Stack Developer'
      },
      'startDate': '2023-07-01'
    }
  ],
  'worksFor': {
    '@type': 'Organization',
    'name': 'Polcar',
    'url': 'https://www.polcar.com'
  }
});