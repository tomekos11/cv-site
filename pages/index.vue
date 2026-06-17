<template>
  <q-page style="max-width: 2000px; margin-inline: auto;" class="t:bg-white t:dark:bg-gradient-to-br t:dark:from-black t:dark:to-slate-800">
    <div ref="landingViewport" class="landing-viewport">
      <div ref="landingPage" class="landing-page">
        <div class="landing-scale-host" :style="landingHostStyle">
          <div ref="landingInner" class="landing-inner" :style="landingScaleStyle">

      <div class="landing-text-col">
        <h1 class="t:text-slate-800 t:dark:text-slate-400 name-style">Tomasz Słapiński</h1>
        <h2 class="t:text-slate-600 t:dark:text-slate-500 position-style">Fullstack Developer</h2>

        <p class="description-style text-center q-mx-auto">
          {{ $t('myDescription') }}
        </p>

        <div class="languages-hero t:flex t:flex-wrap t:justify-center t:items-center">
          <span
            v-for="language in languages"
            :key="language.flag"
            :class="`flag-icon flag-icon-${language.flag} flag-icon-lg`"
            :aria-label="`${language.name} – ${language.level}`"
            :title="`${language.name} – ${language.level}`"
            role="img"
          />
        </div>

        <div class="landing-actions">
          <q-btn
            class="custom-button"
            size="sm"
            rounded
            :loading="loading"
            no-caps
            icon="mail"
            :label="$t('inquire')"
            @click="showInquiryModal = true; loading = true"
          />

          <q-btn
            class="custom-button"
            size="sm"
            rounded
            no-caps
            icon="download"
            :label="$t('downloadCv')"
            :loading="isGeneratingPdf"
            @click="downloadCv"
          />
        </div>

      </div>

      <div class="landing-image-col">
        <picture>
          <source srcset="/assets/icons/img/2023_linkedin_no_bg.webp" type="image/webp" fetchpriority="high" />
          <source srcset="/assets/icons/img/2023_linkedin_no_bg.png" type="image/png" />
          <img
            src="/assets/icons/img/2023_linkedin_no_bg.png"
            alt="Tomasz Słapiński"
            class="profile-img img"
            @load="updateLandingScale"
          />
        </picture>
      </div>

        </div>
        </div>
      </div>
    </div>
    
    <lazy-experience hydrate-on-idle />
    <lazy-education hydrate-on-idle>
      <template #fallback>
        <section id="education">
          <section-title :title="$t('nav.education')" />
          <education-skeleton />
        </section>
      </template>
    </lazy-education>
    <lazy-languages hydrate-on-idle />
    <lazy-technologies hydrate-on-idle />
    <lazy-projects hydrate-on-idle />
    <lazy-certificates hydrate-on-idle />
    
    <inquiry-modal v-if="showInquiryModal" @hide="showInquiryModal = false" @before-show="loading = false"/>
    <analytics/>
  </q-page>
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';

const InquiryModal = defineAsyncComponent(() => import('@/components/InquiryModal.vue'));

const showInquiryModal = ref(false);
const loading = ref(false);

const { t } = useI18n();
const { isGenerating: isGeneratingPdf, generatePdf } = useCvPdf();
const { languages } = useCvData();

const landingViewport = useTemplateRef<HTMLElement>('landingViewport');
const landingPage = useTemplateRef<HTMLElement>('landingPage');
const landingInner = useTemplateRef<HTMLElement>('landingInner');
const landingScale = ref(1);
const landingContentSize = ref({ width: 0, height: 0 });

const landingScaleStyle = computed(() => (
  landingScale.value < 1
    ? {
        transform: `scale(${landingScale.value})`,
        transformOrigin: 'top left',
      }
    : {}
));

const landingHostStyle = computed(() => {
  if (landingScale.value >= 1 || !landingContentSize.value.width) {
    return {};
  }

  return {
    width: `${landingContentSize.value.width * landingScale.value}px`,
    height: `${landingContentSize.value.height * landingScale.value}px`,
  };
});

const updateLandingScale = async () => {
  const page = landingPage.value;
  const inner = landingInner.value;

  if (!page || !inner) {
    return;
  }

  landingScale.value = 1;
  await nextTick();

  const availableWidth = page.clientWidth;
  const availableHeight = page.clientHeight;

  if (!availableWidth || !availableHeight) {
    return;
  }

  const contentWidth = inner.scrollWidth;
  const contentHeight = inner.scrollHeight;

  if (!contentWidth || !contentHeight) {
    return;
  }

  landingContentSize.value = { width: contentWidth, height: contentHeight };
  landingScale.value = Math.min(1, availableWidth / contentWidth, availableHeight / contentHeight);
};

let landingResizeObserver: ResizeObserver | undefined;

onMounted(async () => {
  await updateLandingScale();

  landingResizeObserver = new ResizeObserver(() => {
    void updateLandingScale();
  });

  if (landingViewport.value) {
    landingResizeObserver.observe(landingViewport.value);
  }

  if (landingPage.value) {
    landingResizeObserver.observe(landingPage.value);
  }

  if (landingInner.value) {
    landingResizeObserver.observe(landingInner.value);
  }
});

onBeforeUnmount(() => {
  landingResizeObserver?.disconnect();
});

watch(() => t('myDescription'), () => {
  nextTick(() => {
    void updateLandingScale();
  });
});

const downloadCv = async () => {
  try {
    await generatePdf();
  } catch (error) {
    console.error('Failed to generate CV PDF', error);
  }
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
    '@id': 'https://cv.tomasz-slapinski.pl/languages',
    'name': 'Języki',
    'url': 'https://cv.tomasz-slapinski.pl/languages',
    'description': 'Poznaj języki obce Tomasza Słapińskiego',
    'inLanguage': 'pl'
  },
  {
    '@type': 'WebPageElement',
    '@id': 'https://cv.tomasz-slapinski.pl/en/languages',
    'name': 'Languages',
    'url': 'https://cv.tomasz-slapinski.pl/en/languages',
    'description': 'Discover Tomasz Słapiński\'s language skills',
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

.landing-viewport {
  --header-h: 66px;
  --footer-h: calc(50px + env(safe-area-inset-bottom, 0px));
  height: calc(100svh - var(--header-h));
  max-height: calc(100svh - var(--header-h));
  box-sizing: border-box;
  padding-bottom: var(--footer-h);
  overflow: hidden;
  flex-shrink: 0;
}

.landing-page {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  overflow: hidden;
  padding: 1rem;
}

.landing-scale-host {
  max-width: 100%;
  max-height: 100%;
}

.landing-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 1100px;
  transform-origin: top left;
}

.landing-text-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.625rem;
  min-width: 0;
  flex: 1 1 auto;
}

.landing-image-col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  min-height: 0;
  min-width: 0;
}

.languages-hero {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.landing-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.375rem;
  width: 100%;
  max-width: 100%;
}

.landing-actions :deep(.q-btn) {
  min-height: 2.375rem;
  font-size: 0.875rem;
}

@media (max-width: 767.98px) {
  .landing-actions {
    gap: 0.375rem;
    padding-inline: 0.125rem;
  }

  .landing-actions :deep(.q-btn) {
    flex: 0 0 auto;
    width: auto;
    min-height: 1.875rem;
    padding: 0 0.5rem;
    font-size: 0.6875rem;
  }

  .landing-actions :deep(.q-btn .q-icon) {
    font-size: 0.875rem;
    margin-right: 0.25rem;
  }

  .landing-actions :deep(.q-btn .q-btn__content) {
    flex-wrap: nowrap;
    white-space: nowrap;
  }
}

@media (min-width: 768px) {
  .landing-actions :deep(.q-btn) {
    min-height: 2.375rem;
    padding: 0 1rem;
    font-size: 0.875rem;
  }
}

.profile-img {
  display: block;
  width: auto;
  height: auto;
  max-width: 280px;
  max-height: 220px;
  object-fit: contain;
  border-radius: 20%;
}

.name-style {
  font-size: clamp(1.5rem, 4vw, 4.5rem);
  line-height: 1.05;
  margin: 0;
}

.position-style {
  font-size: clamp(1rem, 2vw, 2.4rem);
  line-height: 1.15;
  margin: 0;
}

.description-style {
  font-size: clamp(0.9375rem, 1.4vw, 1.25rem);
  line-height: 1.35;
  width: min(560px, 100%);
  max-width: 100%;
  margin: 0;
}

@media (min-width: 768px) {
  .landing-inner {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }

  .landing-text-col {
    flex: 1 1 58%;
  }

  .landing-image-col {
    flex: 0 1 42%;
  }

  .profile-img {
    max-width: 320px;
    max-height: 360px;
  }
}

@media (min-width: 1024px) {
  .profile-img {
    max-width: 420px;
    max-height: 420px;
  }
}
</style>