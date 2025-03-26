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
      { rel: 'canonical', href: 'https://cv-site-nu-henna.vercel.app' },
      { rel: 'alternate', hreflang: 'en', href: 'https://cv-site-nu-henna.vercel.app/en' },
    ];
  }

  return [
    { rel: 'canonical', href: 'https://cv-site-nu-henna.vercel.app/en' },
    { rel: 'alternate', hreflang: 'pl', href: 'https://cv-site-nu-henna.vercel.app' },
  ];
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Tomasz Słapiński',
        'jobTitle': 'Full-Stack Developer',
        'url': 'https://cv-site-nu-henna.vercel.app',
        'email': 'tom.slapinski@gmail.com',
        'sameAs': [
          'https://www.linkedin.com/in/tomasz-slapinski/',
          'https://github.com/tomekos11'
        ],
        'image': 'https://cv-site-nu-henna.vercel.app/assets/icons/img/2023_linkedin_no_bg.png',
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
      })
    }
  ],

  title: 'Tomasz Slapinski - CV | Fullstack developer',

  meta: [
    { name: 'description', content: t('seo.description') },
    { name: 'robots', content: 'index, nofollow' },
    { property: 'og:title', content: 'Tomasz Slapinski - CV' },
    { property: 'og:description', content: t('seo.ogDescription') },
    { property: 'og:image', content: 'https://cv-site-nu-henna.vercel.app/assets/icons/img/2023_linkedin_no_bg.png' },
    { property: 'og:url', content: 'https://cv-site-nu-henna.vercel.app' },
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