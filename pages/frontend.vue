<template>
  <q-page class="frontend-page t:bg-white t:dark:bg-gradient-to-br t:dark:from-black t:dark:to-slate-800 t:mx-auto t:max-w-[1100px] t:pb-[60px]">
    <section class="frontend-hero t:mx-3 t:mt-6 t:md:mt-10">
      <p class="frontend-hero__eyebrow">Tomasz Słapiński</p>
      <h1 class="frontend-hero__title">Frontend Developer</h1>
      <p class="frontend-hero__lead">
        Na co dzień buduję fullstackowe aplikacje, ale sercem mojego warsztatu jest frontend —
        a w nim <strong>Vue</strong> jest narzędziem, które znam najlepiej i którym posługuję się
        najsprawniej: od małych komponentów po duże, wydajne, SSR-owe aplikacje w Nuxt.
      </p>

      <div class="frontend-hero__actions">
        <q-btn
          class="custom-button"
          size="md"
          rounded
          no-caps
          icon="download"
          label="Pobierz CV (PDF) — Frontend Developer"
          :loading="isGeneratingPdf"
          @click="downloadFrontendCv"
        />
      </div>
    </section>

    <section class="frontend-section">
      <h2 class="frontend-heading">Dlaczego Vue</h2>
      <p class="frontend-text">
        Vue jest moim głównym frameworkiem od lat — pracowałem w nim komercyjnie (m.in. w duecie
        z Nuxt i Quasar) przy aplikacjach wymagających SSR, dobrego SEO oraz wysokiej wydajności
        na urządzeniach mobilnych. Znam Composition API, zarządzanie stanem (Pinia), routing,
        SSR/hydration, optymalizację renderowania oraz budowę systemów komponentów od podstaw —
        w tym stronę, którą właśnie oglądasz.
      </p>
    </section>

    <section class="frontend-section">
      <h2 class="frontend-heading">Stack frontendowy</h2>
      <technologies-mini-grid :items="frontendTechnologies" />
    </section>

    <section class="frontend-section">
      <h2 class="frontend-heading">Projekty z Vue</h2>
      <div class="frontend-projects">
        <article
          v-for="project in vueCommercialProjects"
          :key="project.slug"
          class="frontend-project-card t:dark:!bg-slate-900/80"
        >
          <h3 class="frontend-project-card__title">{{ project.company }}</h3>
          <p class="frontend-project-card__text">{{ project.shortDescription }}</p>
          <technologies-mini-grid :items="getTechnologiesByNames(project.technologies)" />
        </article>
      </div>
    </section>

    <p class="frontend-footnote">
      Ta strona nie jest linkowana z głównej witryny i nie jest indeksowana przez wyszukiwarki —
      dostęp masz tylko dzięki temu linkowi.
    </p>
  </q-page>
</template>

<script setup lang="ts">
import { getTechnologiesByNames } from '~/helpers/technologyCatalog';

const { isGenerating: isGeneratingPdf, generatePdf } = useCvPdf();
const { commercialProjects } = useCvData();

const frontendTechnologyNames = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue', 'Nuxt', 'Quasar', 'Nuxt UI',
  'Shadcn', 'Tailwind', 'React', 'Bootstrap', 'SEO', 'SSR',
];

const frontendTechnologies = computed(() => getTechnologiesByNames(frontendTechnologyNames));

const vueCommercialProjects = computed(() =>
  commercialProjects.value.filter((project) => project.technologies.includes('Vue')),
);

const downloadFrontendCv = async () => {
  try {
    await generatePdf('frontend');
  } catch (error) {
    console.error('Failed to generate frontend CV PDF', error);
  }
};

// Hidden page: not linked from navigation, sitemap, or crawlLinks — must never be indexed.
useHead({
  title: 'Tomasz Słapiński — Frontend Developer',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
});
</script>

<style scoped>
.frontend-hero {
  text-align: center;
  padding: 2rem 1.25rem 2.5rem;
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
  margin: 0 auto;
  max-width: 42rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #475569;
}

.body--dark .frontend-hero__lead {
  color: #94a3b8;
}

.frontend-hero__actions {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
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
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
}

.body--dark .frontend-project-card__title {
  color: #e2e8f0;
}

.frontend-project-card__text {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #475569;
}

.body--dark .frontend-project-card__text {
  color: #94a3b8;
}

.frontend-footnote {
  margin: 3rem 1.25rem 0;
  text-align: center;
  font-size: 0.8rem;
  color: #94a3b8;
}
</style>
