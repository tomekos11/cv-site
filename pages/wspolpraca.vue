<template>
  <q-page class="collaboration-page t:bg-white t:dark:bg-gradient-to-br t:dark:from-black t:dark:to-slate-800 t:mx-auto t:max-w-[2000px] t:pb-[50px]">
    <section class="landing-page q-pt-sm t:xl:p-5 t:lg:p-4 t:md:p-3 t:p-2">
      <projects-project-breadcrumb :current-name="$t('collaboration.breadcrumb')" :include-projects-link="false" />

      <header class="collaboration-hero t:max-w-[960px] t:mx-auto t:px-3 t:mb-10">
        <h1 class="collaboration-hero__title">{{ $t('collaboration.title') }}</h1>
        <p class="collaboration-hero__lead">{{ $t('collaboration.lead') }}</p>
      </header>

      <article class="collaboration-content t:max-w-[920px] t:mx-auto t:px-3">
        <section class="collaboration-section">
          <p
            v-for="(paragraph, index) in introParagraphs"
            :key="index"
            class="collaboration-text"
          >
            {{ paragraph }}
          </p>
        </section>

        <section class="collaboration-section">
          <h2 class="collaboration-heading">{{ $t('collaboration.specializationsTitle') }}</h2>
          <p class="collaboration-text">{{ $t('collaboration.specializationsIntro') }}</p>
          <p class="collaboration-text collaboration-text--label">{{ $t('collaboration.technologiesLabel') }}</p>
          <technologies-mini-grid
            :items="specializationTechnologies"
            :all-items="allTechnologies"
          />
        </section>

        <section class="collaboration-section">
          <h2 class="collaboration-heading">{{ $t('collaboration.commercialProjectsTitle') }}</h2>
          <p class="collaboration-text">{{ $t('collaboration.commercialIntro') }}</p>

          <div class="collaboration-projects">
            <article
              v-for="project in commercialProjects"
              :key="project.slug"
              class="collaboration-project-card t:dark:!bg-slate-900/80"
            >
              <div class="collaboration-project-card__header">
                <nuxt-img
                  v-if="project.logo"
                  :src="project.logo"
                  :alt="`${project.company} logo`"
                  width="56"
                  format="webp"
                  class="collaboration-project-card__logo"
                />
                <div
                  v-else
                  class="collaboration-project-card__logo collaboration-project-card__logo--placeholder"
                >
                  <q-icon name="apartment" size="28px" />
                </div>

                <div>
                  <h3 class="collaboration-project-card__company">{{ project.company }}</h3>
                  <p class="collaboration-project-card__subtitle">{{ project.shortDescription }}</p>
                </div>
              </div>

              <p class="collaboration-project-card__description">
                {{ $t(`collaboration.commercialProjects.${project.slug}`) }}
              </p>

              <div v-if="getProjectTechnologies(project.slug).length" class="collaboration-project-card__tags">
                <p class="collaboration-project-card__tags-label">{{ $t('collaboration.technologiesLabel') }}</p>
                <technologies-mini-grid
                  :items="getProjectTechnologies(project.slug)"
                  class="collaboration-project-card__tech-grid"
                />
              </div>
            </article>
          </div>
        </section>

        <section class="collaboration-cta t:dark:!bg-slate-900/70">
          <h2 class="collaboration-cta__title">{{ $t('collaboration.contactTitle') }}</h2>

          <div class="collaboration-cta__content">
            <p class="collaboration-cta__text">{{ $t('collaboration.contactText.p1') }}</p>
            <p class="collaboration-cta__text">{{ $t('collaboration.contactText.p2') }}</p>

            <div class="collaboration-cta__actions">
              <a
                :href="`mailto:${contactEmail}`"
                class="collaboration-cta__email"
              >
                <q-icon name="mail" size="20px" />
                {{ contactEmail }}
              </a>

              <q-btn
                class="custom-button"
                size="md"
                rounded
                no-caps
                icon="mail"
                :loading="inquiryLoading"
                :label="$t('inquire')"
                @click="openInquiryModal"
              />
            </div>
          </div>
        </section>
      </article>
    </section>

    <inquiry-modal
      v-if="showInquiryModal"
      @hide="showInquiryModal = false"
      @before-show="inquiryLoading = false"
    />
  </q-page>
</template>

<script setup lang="ts">
import type { CommercialProjectSlug } from '~/composables/useCommercialProjects';
import {
  collaborationProjectTechnologyKeys,
  collaborationSpecializationTechnologyKeys,
} from '~/helpers/collaborationTechnologies';
import { getTechnologiesByNames, technologyCatalog, type TechnologyCatalogItem } from '~/helpers/technologyCatalog';

defineI18nRoute({
  paths: {
    pl: '/wspolpraca',
    en: '/collaboration',
  },
});

const InquiryModal = defineAsyncComponent(() => import('@/components/InquiryModal.vue'));

const { t } = useI18n();
const { commercialProjects } = useCommercialProjects();
const { person } = usePerson();

const contactEmail = 'kontakt@tomasz-slapinski.pl';
const showInquiryModal = ref(false);
const inquiryLoading = ref(false);

const introParagraphs = computed(() => [
  t('collaboration.paragraphs.p1'),
  t('collaboration.paragraphs.p2'),
  t('collaboration.paragraphs.p3'),
  t('collaboration.paragraphs.p4'),
]);

const specializationTechnologies = computed(() =>
  getTechnologiesByNames([...collaborationSpecializationTechnologyKeys]),
);

const allTechnologies = computed(() => technologyCatalog);

function getProjectTechnologies(slug: CommercialProjectSlug): TechnologyCatalogItem[] {
  const technologyNames = collaborationProjectTechnologyKeys[slug];
  if (technologyNames?.length) {
    return getTechnologiesByNames(technologyNames);
  }

  const project = commercialProjects.value.find((item) => item.slug === slug);
  return getTechnologiesByNames(project?.technologies ?? []);
}

const pagePath = computed(() => t('collaboration.path'));
const seoTitle = computed(() => t('collaboration.seo.title'));
const seoDescription = computed(() => t('collaboration.seo.description'));

useSeo(pagePath.value, seoTitle.value, seoDescription.value, seoTitle.value, seoDescription.value);

useJsonld(() => ([
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Tomasz Słapiński, Full-Stack Developer',
    description: seoDescription.value,
    url: `https://cv.tomasz-slapinski.pl${pagePath.value}`,
    email: contactEmail,
    areaServed: {
      '@type': 'City',
      name: 'Rzeszów',
    },
    provider: person.value,
    serviceType: [
      'Web Development',
      'Full-Stack Development',
      'Vue.js Development',
      'Nuxt Development',
    ],
  },
]));

function openInquiryModal() {
  showInquiryModal.value = true;
  inquiryLoading.value = true;
}
</script>

<style scoped>
.collaboration-hero {
  text-align: center;
  padding: 2rem 1rem 2.5rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 55%, #f1f5f9 100%);
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
}

.body--dark .collaboration-hero {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 55%, rgba(15, 23, 42, 0.95) 100%);
  border-color: rgba(148, 163, 184, 0.15);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
}

.collaboration-hero__eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #0d9488;
  font-weight: 600;
}

.collaboration-hero__title {
  margin: 0 0 1rem;
  font-size: clamp(1.75rem, 4vw, 2.6rem);
  font-weight: 700;
  line-height: 1.15;
  color: #0f172a;
}

.body--dark .collaboration-hero__title {
  color: #e2e8f0;
}

.collaboration-hero__lead {
  margin: 0 auto;
  max-width: 42rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #475569;
}

.body--dark .collaboration-hero__lead {
  color: #94a3b8;
}

.collaboration-section + .collaboration-section {
  margin-top: 2.75rem;
}

.collaboration-heading {
  margin: 0 0 0.75rem;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #334155;
}

.body--dark .collaboration-heading {
  color: #cbd5e1;
}

.collaboration-text {
  margin: 0 0 1rem;
  font-size: 1.02rem;
  line-height: 1.8;
  color: #475569;
}

.body--dark .collaboration-text {
  color: #94a3b8;
}

.collaboration-text:last-child {
  margin-bottom: 0;
}

.collaboration-text--label {
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: #334155;
}

.body--dark .collaboration-text--label {
  color: #cbd5e1;
}

.collaboration-project-card__tech-grid :deep(.tech-mini-grid) {
  margin-top: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
  gap: 0.5rem;
}

.collaboration-project-card__tech-grid :deep(.tech-mini-card) {
  min-height: 96px;
  padding: 0.55rem 0.35rem 0.45rem;
}

.collaboration-project-card__tech-grid :deep(.tech-mini-card__image) {
  width: 40px;
  height: 40px;
}

.collaboration-project-card__tech-grid :deep(.tech-mini-card__label) {
  font-size: 0.72rem;
}

.collaboration-projects {
  display: grid;
  gap: 1rem;
  margin-top: 1.25rem;
}

.collaboration-project-card {
  padding: 1.25rem 1.35rem;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.collaboration-project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
}

.collaboration-project-card__header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.collaboration-project-card__logo {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: contain;
  flex-shrink: 0;
  background: #fff;
  padding: 6px;
}

.collaboration-project-card__logo--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  background: #e2e8f0;
}

.body--dark .collaboration-project-card__logo {
  background: #0f172a;
}

.body--dark .collaboration-project-card__logo--placeholder {
  background: #1e293b;
  color: #94a3b8;
}

.collaboration-project-card__company {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
}

.body--dark .collaboration-project-card__company {
  color: #e2e8f0;
}

.collaboration-project-card__subtitle {
  margin: 0.2rem 0 0;
  font-size: 0.95rem;
  color: #64748b;
}

.body--dark .collaboration-project-card__subtitle {
  color: #94a3b8;
}

.collaboration-project-card__description {
  margin: 1rem 0 0;
  font-size: 0.96rem;
  line-height: 1.7;
  color: #475569;
}

.body--dark .collaboration-project-card__description {
  color: #94a3b8;
}

.collaboration-project-card__tags {
  margin-top: 1rem;
}

.collaboration-project-card__tags-label {
  margin: 0 0 0.35rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #475569;
}

.body--dark .collaboration-project-card__tags-label {
  color: #94a3b8;
}

.collaboration-cta {
  margin-top: 3rem;
  padding: 2.25rem 1.75rem;
  border-radius: 20px;
  text-align: center;
  background: linear-gradient(135deg, #f0fdfa 0%, #ecfeff 50%, #f8fafc 100%);
  border: 1px solid rgba(13, 148, 136, 0.2);
  box-shadow: 0 16px 36px rgba(13, 148, 136, 0.08);
}

.body--dark .collaboration-cta {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(19, 78, 74, 0.25) 100%);
  border-color: rgba(45, 212, 191, 0.2);
}

.collaboration-cta__title {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.body--dark .collaboration-cta__title {
  color: #e2e8f0;
}

.collaboration-cta__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 40rem;
  margin: 0 auto;
}

.collaboration-cta__text {
  margin: 0;
  width: 100%;
  font-size: 1.02rem;
  line-height: 1.75;
  color: #475569;
}

.body--dark .collaboration-cta__text {
  color: #94a3b8;
}

.collaboration-cta__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-top: 0.25rem;
}

.collaboration-cta__email {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: #0d9488;
  text-decoration: none;
  transition: color 0.2s ease;
}

.collaboration-cta__email:hover {
  color: #0f766e;
}

.body--dark .collaboration-cta__email {
  color: #2dd4bf;
}

.body--dark .collaboration-cta__email:hover {
  color: #5eead4;
}
</style>
