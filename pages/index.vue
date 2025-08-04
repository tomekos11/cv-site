<template>
  <q-page style="max-width: 2000px; margin-inline: auto;" class="t:bg-white t:dark:bg-gradient-to-br t:dark:from-black t:dark:to-slate-800">
    <div class="row landing-page t:xl:p-5 t:lg:p-4 t:md:p-3 t:p-2">

      <div class="col-12 col-md-7 col-lg-8 text-center d-flex flex-column justify-center">
        <h1 class="t:text-slate-800  t:dark:text-slate-400 name-style">Tomasz Słapiński</h1>
        <h2 class="t:text-slate-600 t:dark:text-slate-500 position-style">Fullstack Developer</h2>

        <p class="description-style text-center q-mx-auto q-mt-lg">
          {{ $t('myDescription') }}
        </p>

        <div class="t:flex t:flex-col t:justify-center t:items-center t:gap-3.5 t:space-x-1 t:space-y-1 t:md:flex-row">
          <q-btn
            class="custom-button"
            size="md"
            rounded
            :loading="loading"
            no-caps
            icon="mail"
            :label="$t('inquire')"
            @click="showInquiryModal = true; loading = true"
          />
  
          <q-btn
            class="custom-button"
            size="md"
            rounded
            no-caps
            icon="download"
            :label="$t('downloadCv')"
            @click="downloadCv"
          />
        </div>

      </div>

      <div class="col-12 col-md-5 col-lg-4 text-center self-center d-flex justify-center">
        <nuxt-img src="/assets/icons/img/2023_linkedin_no_bg.png" class="profile-img" alt="Tomasz Słapiński" width="420" densities="x1 x2" format="webp" fetchpriority="high" />
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

const downloadCv = () => {
  const fileUrl = `/assets/files/cv_${locale.value}.pdf`;

  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = `cv_${locale.value}.pdf`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const graph = [
  {
    '@type': 'WebPageElement',
    '@id': 'https://cv.tomasz-slapinski.pl/experience',
    'name': 'Doświadczenie',
    'url': 'https://cv.tomasz-slapinski.pl/experience',
    'description': 'Dowiedz się więcej o moim doświadczeniu',
    'inLanguage': 'pl'
  },
  {
    '@type': 'WebPageElement',
    '@id': 'https://cv.tomasz-slapinski.pl/en/experience',
    'name': 'Experience',
    'url': 'https://cv.tomasz-slapinski.pl/en/experience',
    'description': 'Learn more about my experience',
    'inLanguage': 'en'
  },
  {
    '@type': 'WebPageElement',
    '@id': 'https://cv.tomasz-slapinski.pl/education',
    'name': 'Edukacja',
    'url': 'https://cv.tomasz-slapinski.pl/education',
    'description': 'Dowiedz się więcej o mojej edukacji',
    'inLanguage': 'pl'
  },
  {
    '@type': 'WebPageElement',
    '@id': 'https://cv.tomasz-slapinski.pl/en/education',
    'name': 'Education',
    'url': 'https://cv.tomasz-slapinski.pl/en/education',
    'description': 'Learn more about my education',
    'inLanguage': 'en'
  },
  {
    '@type': 'WebPageElement',
    '@id': 'https://cv.tomasz-slapinski.pl/technologies',
    'name': 'Technologie',
    'url': 'https://cv.tomasz-slapinski.pl/technologies',
    'description': 'Odkryj używane przeze mnie technologie',
    'inLanguage': 'pl'
  },
  {
    '@type': 'WebPageElement',
    '@id': 'https://cv.tomasz-slapinski.pl/en/technologies',
    'name': 'Technologies',
    'url': 'https://cv.tomasz-slapinski.pl/en/technologies',
    'description': 'Discover the technologies I use',
    'inLanguage': 'en'
  },
  {
    '@type': 'WebPageElement',
    '@id': 'https://cv.tomasz-slapinski.pl/projects',
    'name': 'Projekty',
    'url': 'https://cv.tomasz-slapinski.pl/projects',
    'description': 'Sprawdź jakie projekty stworzyłem podczas mojej przygody z programowaniem',
    'inLanguage': 'pl'
  },
  {
    '@type': 'WebPageElement',
    '@id': 'https://cv.tomasz-slapinski.pl/en/projects',
    'name': 'Projects',
    'url': 'https://cv.tomasz-slapinski.pl/en/projects',
    'description': 'Check out the projects I’ve created during my journey with programming',
    'inLanguage': 'en'
  },
  {
    '@type': 'WebPageElement',
    '@id': 'https://cv.tomasz-slapinski.pl/certificates',
    'name': 'Certyfikaty',
    'url': 'https://cv.tomasz-slapinski.pl/certificates',
    'description': 'Zobacz jakie certyfikaty udało mi się osiągnąć',
    'inLanguage': 'pl'
  },
  {
    '@type': 'WebPageElement',
    '@id': 'https://cv.tomasz-slapinski.pl/en/certificates',
    'name': 'Certificates',
    'url': 'https://cv.tomasz-slapinski.pl/en/certificates',
    'description': 'See the certifications I have achieved',
    'inLanguage': 'en'
  }
];

interface Faq {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  }
}

const faqArray = computed<Faq[]>(() =>
  Array.from({ length: 10 }, (_, i) => {
    const id = i + 1;
    return {
      '@type': 'Question',
      name: t(`faq.${id}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`faq.${id}.answer`)
      }
    };
  })
);

const { person } = usePerson();

useJsonld(() => (
  [{
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    'dateCreated': '2025-05-01T18:34:00+01:00',
    'dateModified': '2025-07-31T23:10:00+01:00',
    'mainEntity': person.value,
    'hasPart': graph
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqArray.value,
  }
  ]));

useSeo('', t('seo.title'),  t('seo.description'), t('seo.title'), t('seo.ogDescription'));

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