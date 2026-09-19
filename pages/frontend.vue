<template>
  <q-page class="frontend-page t:bg-white t:dark:bg-gradient-to-br t:dark:from-black t:dark:to-slate-800 t:mx-auto t:max-w-[1100px] t:pb-[60px]">
    <section class="frontend-hero t:mx-3 t:mt-6 t:md:mt-10">
      <div class="frontend-hero__text">
        <p class="frontend-hero__eyebrow">{{ t('frontendPage.eyebrow') }}</p>
        <h1 class="frontend-hero__title">{{ t('frontendPage.heading') }}</h1>
        <p class="frontend-hero__lead">{{ t('frontendPage.lead') }}</p>

        <div class="frontend-hero__actions">
          <q-btn
            class="custom-button"
            size="md"
            rounded
            no-caps
            icon="mail"
            :loading="isOpeningInquiry"
            :label="t('inquire')"
            @click="showInquiryModal = true; isOpeningInquiry = true"
          />

          <q-btn
            class="custom-button"
            size="md"
            rounded
            no-caps
            icon="download"
            :label="t('frontendPage.downloadCv')"
            :loading="isGeneratingPdf"
            @click="downloadFrontendCv"
          />
        </div>
      </div>

      <aside class="frontend-hero__aside">
        <picture>
          <source srcset="/assets/icons/img/2023_linkedin_no_bg.webp" type="image/webp">
          <source srcset="/assets/icons/img/2023_linkedin_no_bg.png" type="image/png">
          <img
            src="/assets/icons/img/2023_linkedin_no_bg.png"
            :alt="t('frontendPage.eyebrow')"
            class="frontend-hero__photo"
            width="140"
            height="140"
          >
        </picture>

        <div class="frontend-hero__languages">
          <span
            v-for="language in languages"
            :key="language.flag"
            :class="`flag-icon flag-icon-${language.flag} flag-icon-lg`"
            :aria-label="`${language.name} - ${language.level}`"
            :title="`${language.name} - ${language.level}`"
            role="img"
          />
        </div>
      </aside>
    </section>

    <section class="frontend-section">
      <h2 class="frontend-heading">{{ t('frontendPage.whyVueTitle') }}</h2>
      <p class="frontend-text">{{ t('frontendPage.whyVueText') }}</p>
    </section>

    <section class="frontend-section">
      <h2 class="frontend-heading">{{ t('frontendPage.stackTitle') }}</h2>
      <technologies-mini-grid :items="frontendTechnologies" />
    </section>

    <section class="frontend-section">
      <h2 class="frontend-heading">{{ t('frontendPage.projectsTitle') }}</h2>
      <div class="frontend-projects">
        <article
          v-for="project in vueProjects"
          :key="project.slug"
          class="frontend-project-card t:dark:!bg-slate-900/80"
        >
          <header class="frontend-project-card__header">
            <img
              v-if="project.logo"
              :src="project.logo"
              :alt="`logo ${project.company}`"
              class="frontend-project-card__logo"
              loading="lazy"
            >
            <div>
              <h3 class="frontend-project-card__title">{{ project.company }}</h3>
              <p class="frontend-project-card__subtitle">{{ project.shortDescription }}</p>
            </div>
          </header>
          <p class="frontend-project-card__text">{{ project.description }}</p>
          <div class="frontend-project-card__tech">
            <technologies-mini-grid :items="getTechnologiesByNames(project.technologies)" />
          </div>
        </article>
      </div>
    </section>

    <section class="frontend-section">
      <h2 class="frontend-heading">{{ t('frontendPage.sideProjectsTitle') }}</h2>
      <p class="frontend-text frontend-section__intro">{{ t('frontendPage.sideProjectsIntro') }}</p>

      <ul class="frontend-side-projects">
        <li
          v-for="project in sideProjects"
          :key="project.slug"
          class="frontend-side-project t:dark:!bg-slate-900/80"
        >
          <nuxt-link class="frontend-side-project__media" :to="projectPath(project.slug)">
            <nuxt-img
              :src="project.image"
              :alt="project.name"
              width="180"
              height="180"
              format="webp"
              loading="lazy"
              class="frontend-side-project__image"
            />
          </nuxt-link>

          <div class="frontend-side-project__body">
            <div class="frontend-side-project__head">
              <h3 class="frontend-side-project__title">{{ project.name }}</h3>
              <span class="frontend-side-project__year">{{ project.endDate.getFullYear() }}</span>
            </div>

            <p class="frontend-side-project__text">{{ project.summary }}</p>

            <div class="frontend-side-project__footer">
              <technologies-mini-badges :items="project.techBadges" class="frontend-side-project__tech" />

              <div class="frontend-side-project__actions">
                <nuxt-link class="frontend-side-project__link" :to="projectPath(project.slug)">
                  {{ t('projects.readMore') }}
                </nuxt-link>
                <a
                  v-if="project.demoLink"
                  class="frontend-side-project__link"
                  :href="project.demoLink"
                  target="_blank"
                  rel="noopener"
                >
                  {{ t('projects.viewDemo') }}
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="frontend-side-projects__more">
        <nuxt-link class="frontend-side-project__link" :to="localePath('/projects-list')">
          {{ t('frontendPage.sideProjectsMore') }}
        </nuxt-link>
      </div>
    </section>

    <p class="frontend-footnote">{{ t('frontendPage.footnote') }}</p>

    <inquiry-modal
      v-if="showInquiryModal"
      @hide="showInquiryModal = false"
      @before-show="isOpeningInquiry = false"
    />
  </q-page>
</template>

<script setup lang="ts">
import { getTechnologiesByNames } from '~/helpers/technologyCatalog';

const InquiryModal = defineAsyncComponent(() => import('@/components/InquiryModal.vue'));

const { t } = useI18n();
const { isGenerating: isGeneratingPdf, generatePdf } = useCvPdf();
const { experience, commercialProjects, languages } = useCvData();
const { projects, projectPath } = useProjects();
const localePath = useLocalePath();

const showInquiryModal = ref(false);
const isOpeningInquiry = ref(false);

const frontendTechnologyNames = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue', 'Nuxt', 'Quasar', 'Nuxt UI',
  'Shadcn', 'Tailwind', 'React', 'Bootstrap', 'SEO', 'SSR',
];

const frontendTechnologies = computed(() => getTechnologiesByNames(frontendTechnologyNames));

// Vue work from both the main job (Polcar) and the commercial projects
const vueProjects = computed(() =>
  [...experience.value, ...commercialProjects.value]
    .filter((project) => project.technologies.includes('Vue'))
    .map((project) => ({
      ...project,
      logo: getWorkEntryLogo(project.slug),
      description: t(`frontendPage.projects.${project.slug}.description`),
    })),
);

// Non-commercial work, kept short here: the projects pages carry the full descriptions
const sideProjects = computed(() =>
  projects.value
    .filter((project) => project.technologies.includes('Vue'))
    .map((project) => ({
      ...project,
      summary: t(`frontendPage.sideProjects.${project.slug}`),
      // Longer stacks are trimmed so the compact cards stay readable
      techBadges: getTechnologiesByNames(project.technologies.slice(0, 3)),
    })),
);

const downloadFrontendCv = async () => {
  try {
    await generatePdf('frontend');
  } catch (error) {
    console.error('Failed to generate frontend CV PDF', error);
  }
};

// Hidden page: not linked from navigation, sitemap, or crawlLinks, so it must never be indexed.
useHead(() => ({
  title: t('frontendPage.title'),
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
}));
</script>

<style scoped>
.frontend-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 2rem 2.25rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 55%, #f1f5f9 100%);
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
}

.body--dark .frontend-hero {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 55%, rgba(15, 23, 42, 0.95) 100%);
  border-color: rgba(148, 163, 184, 0.15);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
}

.frontend-hero__text {
  flex: 1 1 auto;
  min-width: 0;
}

.frontend-hero__aside {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
}

.frontend-hero__languages {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}

.frontend-hero__photo {
  width: 140px;
  height: 140px;
  margin: 0;
  display: block;
  border-radius: 50%;
  object-fit: cover;
  object-position: top center;
  background: #fff;
  border: 3px solid rgba(13, 148, 136, 0.35);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
}

.body--dark .frontend-hero__photo {
  background: #0f172a;
  border-color: rgba(45, 212, 191, 0.35);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
}

.frontend-hero__eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #0d9488;
  font-weight: 600;
}

.frontend-hero__title {
  margin: 0 0 1rem;
  font-size: clamp(1.75rem, 4vw, 2.6rem);
  font-weight: 700;
  line-height: 1.15;
  color: #0f172a;
}

.body--dark .frontend-hero__title {
  color: #e2e8f0;
}

.frontend-hero__lead {
  margin: 0;
  max-width: 44rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #475569;
}

.body--dark .frontend-hero__lead {
  color: #94a3b8;
}

.frontend-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

@media (max-width: 720px) {
  .frontend-hero {
    flex-direction: column-reverse;
    text-align: center;
    padding: 1.75rem 1.25rem 2.25rem;
  }

  .frontend-hero__lead {
    margin-inline: auto;
  }

  .frontend-hero__actions {
    justify-content: center;
  }
}

.frontend-section {
  margin: 2.75rem 1.25rem 0;
}

.frontend-heading {
  margin: 0 0 0.75rem;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #334155;
}

.body--dark .frontend-heading {
  color: #cbd5e1;
}

.frontend-text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #475569;
}

.body--dark .frontend-text {
  color: #94a3b8;
}

.frontend-projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.frontend-project-card {
  padding: 1.25rem;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
}

.frontend-project-card__title {
  margin: 0 0 0.15rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
}

.frontend-project-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.frontend-project-card__logo {
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
  padding: 3px;
  border: 1px solid rgba(148, 163, 184, 0.25);
}

.frontend-project-card__subtitle {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #0d9488;
}

.body--dark .frontend-project-card__title {
  color: #e2e8f0;
}

.frontend-project-card__text {
  margin: 0 0 0.85rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #475569;
}

.body--dark .frontend-project-card__text {
  color: #94a3b8;
}

.frontend-project-card__tech :deep(.tech-mini-grid) {
  grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.frontend-project-card__tech :deep(.tech-mini-card) {
  min-height: 74px;
  padding: 0.5rem 0.35rem 0.4rem;
  border-radius: 10px;
}

.frontend-project-card__tech :deep(.tech-mini-card__icon) {
  min-height: 32px;
}

.frontend-project-card__tech :deep(.tech-mini-card__image) {
  width: 30px;
  height: 30px;
}

/* Iconless technologies (e.g. PWA) would otherwise print their name twice: fallback + label */
.frontend-project-card__tech :deep(.tech-mini-card__fallback) {
  display: none;
}

.frontend-project-card__tech :deep(.tech-mini-card__label) {
  margin-top: 0.3rem;
  font-size: 0.68rem;
}

.frontend-section__intro {
  margin-bottom: 1.25rem;
}

.frontend-side-projects {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(430px, 1fr));
  gap: 0.75rem;
}

.frontend-side-project {
  display: flex;
  gap: 0.85rem;
  padding: 0.7rem 0.85rem 0.7rem 0.7rem;
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.frontend-side-project:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
}

.frontend-side-project__media {
  flex: 0 0 auto;
  line-height: 0;
}

.frontend-side-project__image {
  width: 72px;
  height: 72px;
  border-radius: 10px;
  object-fit: cover;
  background: #e2e8f0;
}

.frontend-side-project__body {
  flex: 1 1 auto;
  min-width: 0;
}

.frontend-side-project__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.6rem;
}

.frontend-side-project__title {
  margin: 0 0 0.25rem;
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
}

.body--dark .frontend-side-project__title {
  color: #e2e8f0;
}

.frontend-side-project__year {
  flex: 0 0 auto;
  font-size: 0.7rem;
  font-weight: 700;
  color: #94a3b8;
}

.frontend-side-project__text {
  margin: 0 0 0.5rem;
  font-size: 0.82rem;
  line-height: 1.45;
  color: #475569;
}

.body--dark .frontend-side-project__text {
  color: #94a3b8;
}

.frontend-side-project__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.frontend-side-project__actions {
  display: flex;
  gap: 0.75rem;
}

.frontend-side-project__link {
  font-size: 0.76rem;
  font-weight: 700;
  color: #0d9488;
  text-decoration: none;
  white-space: nowrap;
}

.frontend-side-project__link:hover {
  text-decoration: underline;
}

.body--dark .frontend-side-project__link {
  color: #2dd4bf;
}

@media (max-width: 520px) {
  .frontend-side-projects {
    grid-template-columns: 1fr;
  }

  .frontend-side-project__image {
    width: 56px;
    height: 56px;
  }
}

.frontend-side-projects__more {
  margin-top: 1rem;
  text-align: center;
}

.frontend-footnote {
  margin: 3rem 1.25rem 0;
  text-align: center;
  font-size: 0.8rem;
  color: #94a3b8;
}
</style>
