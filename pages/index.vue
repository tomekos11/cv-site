<!-- <div class="d-flex justify-end" style="padding-right: 15px; padding-top: 15px;">
          <a href="https://www.linkedin.com/in/tomasz-slapinski/" target="_blank">
            <Icon name="uil:linkedin" style="color: #0a66c2" size="36px" class="d-flex"/>
          </a>

          <a href="https://github.com/tomekos11" target="_blank">
            <Icon name="uil:github" style="color: #010409" size="36px" class="d-flex"/>
          </a>
        </div> -->
<template>
  <q-page style="max-width: 2000px; margin-inline: auto;">
    <div class="row landing-page" style="max-width: 95vw; margin-inline: auto;">

      <div class="col-12 col-lg-8 text-center d-flex flex-column justify-center">
        <h1 class="text-dark name-style">Tomasz Słapiński</h1>
        <h2 class="text-grey-8 position-style">Fullstack Developer</h2>

        <p class="description-style text-center q-mx-auto q-mt-lg">
          {{ $t('myDescription') }}
        </p>

        <div>
          <q-btn
            class="bg-primary text-white q-mr-sm q-mb-sm"
            style="font-size: 15px; min-width: 190px;"
            size="md"
            rounded
            :loading="loading"
            icon="mail"
            :label="$t('inquire')"
            @click="showInquiryModal = true; loading = true"
          />
  
          <q-btn
            class="q-mb-sm"
            color="primary"
            outline
            style="font-size: 15px; min-width: 190px;"
            size="md"
            rounded
            icon="download"
            :label="$t('downloadCv')"
          />
        </div>

      </div>

      <div class="col-12 col-lg-4 text-center self-center d-flex justify-center">
        <img src="/assets/icons/img/2023_linkedin_no_bg.png" class="profile-img">
      </div>
    </div>
    
    <experience />
    <education />
    <technologies />
    <projects />
    <certificates />
    
    <inquiry-modal v-if="showInquiryModal" @hide="showInquiryModal = false" @before-show="loading = false"/>
    <analytics/>
  </q-page>
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';

const InquiryModal = defineAsyncComponent(() => import('@/components/InquiryModal.vue'));

const showInquiryModal = ref(false);
const loading = ref(false);

const { t, locale } = useI18n();

const link = computed(() => {
  if(locale.value === 'pl') {
    return [
      { rel: 'canonical', href: 'https://cv.tomasz-slapinski.pl' },
      { rel: 'alternate', hreflang: 'en', href: 'https://cv.tomasz-slapinski.pl/en' },
    ];
  }

  return [
    { rel: 'canonical', href: 'https://cv.tomasz-slapinski.pl/en' },
    { rel: 'alternate', hreflang: 'pl', href: 'https://cv.tomasz-slapinski.pl' },
  ];
});

const ogUrl = computed(() => locale.value === 'pl' ? 'https://cv.tomasz-slapinski.pl' : 'https://cv.tomasz-slapinski.pl/en');

 
useJsonld(() => ({
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
  'image': 'https://cv.tomasz-slapinski.pl/assets/icons/img/2023_linkedin_no_bg.png',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'ul. Przykładowa 12',
    'addressLocality': 'Rzeszów',
    'addressRegion': 'Podkarpacie',
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
  'hasOccupation': [
    {
      '@type': 'Role',
      'hasOccupation': {
        '@type': 'Occupation',
        'name': 'Full-Stack Developer',
        'description': t('seo.role.description'),
        'estimatedSalary': {
          '@type': 'MonetaryAmount',
          'currency': 'PLN',
          'value': {
            '@type': 'QuantitativeValue',
            'value': 13000,
            'unitText': 'MONTH'
          }
        },
        'occupationLocation': {
          '@type': 'AdministrativeArea',
          'name': 'Podkarpacie, Poland'
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': 'https://cv.tomasz-slapinski.pl'
        }
      }
    }
  ],
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
  'worksFor': {
    '@type': 'Organization',
    'name': 'Polcar',
    'url': 'https://www.polcar.com'
  },
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://cv.tomasz-slapinski.pl'
  },
  'gender': 'Male',
  '@graph': [
    {
      '@type': 'WebPageElement',
      '@id': 'https://cv.tomasz-slapinski.pl/#experience',
      'name': 'Doświadczenie',
      'url': 'https://cv.tomasz-slapinski.pl/#experience',
      'description': 'Dowiedz się więcej o moim doświadczeniu',
      'inLanguage': 'pl'
    },
    {
      '@type': 'WebPageElement',
      '@id': 'https://cv.tomasz-slapinski.pl/en#experience',
      'name': 'Experience',
      'url': 'https://cv.tomasz-slapinski.pl/en#experience',
      'description': 'Learn more about my experience',
      'inLanguage': 'en'
    },
    {
      '@type': 'WebPageElement',
      '@id': 'https://cv.tomasz-slapinski.pl/#education',
      'name': 'Edukacja',
      'url': 'https://cv.tomasz-slapinski.pl/#education',
      'description': 'Dowiedz się więcej o mojej edukacji',
      'inLanguage': 'pl'
    },
    {
      '@type': 'WebPageElement',
      '@id': 'https://cv.tomasz-slapinski.pl/en#education',
      'name': 'Education',
      'url': 'https://cv.tomasz-slapinski.pl/en#education',
      'description': 'Learn more about my education',
      'inLanguage': 'en'
    },
    {
      '@type': 'WebPageElement',
      '@id': 'https://cv.tomasz-slapinski.pl/#technologies',
      'name': 'Technologie',
      'url': 'https://cv.tomasz-slapinski.pl/#technologies',
      'description': 'Odkryj używane przeze mnie technologie',
      'inLanguage': 'pl'
    },
    {
      '@type': 'WebPageElement',
      '@id': 'https://cv.tomasz-slapinski.pl/en#technologies',
      'name': 'Technologies',
      'url': 'https://cv.tomasz-slapinski.pl/en#technologies',
      'description': 'Discover the technologies I use',
      'inLanguage': 'en'
    },
    {
      '@type': 'WebPageElement',
      '@id': 'https://cv.tomasz-slapinski.pl/#projects',
      'name': 'Projekty',
      'url': 'https://cv.tomasz-slapinski.pl/#projects',
      'description': 'Sprawdź jakie projekty stworzyłem podczas mojej przygody z programowaniem',
      'inLanguage': 'pl'
    },
    {
      '@type': 'WebPageElement',
      '@id': 'https://cv.tomasz-slapinski.pl/en#projects',
      'name': 'Projects',
      'url': 'https://cv.tomasz-slapinski.pl/en#projects',
      'description': 'Check out the projects I’ve created during my journey with programming',
      'inLanguage': 'en'
    },
    {
      '@type': 'WebPageElement',
      '@id': 'https://cv.tomasz-slapinski.pl/#certificates',
      'name': 'Certyfikaty',
      'url': 'https://cv.tomasz-slapinski.pl/#certificates',
      'description': 'Zobacz jakie certyfikaty udało mi się osiągnąć',
      'inLanguage': 'pl'
    },
    {
      '@type': 'WebPageElement',
      '@id': 'https://cv.tomasz-slapinski.pl/en#certificates',
      'name': 'Certificates',
      'url': 'https://cv.tomasz-slapinski.pl/en#certificates',
      'description': 'See the certifications I have achieved',
      'inLanguage': 'en'
    }
  ]
}));

useHead({
  title: 'Tomasz Slapinski - CV | Fullstack developer',

  meta: [
    { name: 'description', content: t('seo.description') },
    { name: 'robots', content: 'index, nofollow' },

    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Tomasz Slapinski - CV' },
    { property: 'og:description', content: t('seo.ogDescription') },
    { property: 'og:image', content: 'https://cv.tomasz-slapinski.pl/assets/icons/img/2023_linkedin_no_bg.png' },
    { property: 'og:url', content: ogUrl.value },

    { name: 'twitter:card', content: 'summary_large_image' },
  ],

  link: link.value
});
</script>

<style scoped>
:deep(.card-hover:hover) {
  transform: scale(1.2);
}

.img {
  transition: 0.2s;
}

.img:hover {
  filter: drop-shadow(2px 4px 6px black);
}

.landing-page {
  min-height: 93vh;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 95vw;
  margin-inline: auto;
  padding: 24px; 
}

.profile-img {
  max-width: min(420px, 100%);
  height: auto;
  border-radius: 20%;
}

.name-style {
  font-size: 72px;
}

.position-style {
  font-size: 2.4rem
}

.description-style {
  font-size: 24px;
  width: min(600px, calc(100% - 24px));
}

@media (max-width: 610px) {
  .profile-img {
    max-width: min(320px, 100%);
  }

  .name-style {
    font-size: 48px;
  }

  .position-style {
    font-size: 2rem;
  }

  .description-style {
    font-size: 19px
  }
}
</style>