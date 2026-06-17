<template>
  <section id="experience" ref="section">
    <section-title :title="$t('nav.experience')" />

    <article class="experience-feature">
      <header class="experience-header">
        <nuxt-img
          :src="job.logo"
          :alt="`${job.company} logo`"
          class="experience-logo"
          width="96"
          format="webp"
        />

        <div class="experience-meta">
          <h4 class="experience-company">{{ job.company }}</h4>
          <p class="experience-subtitle">{{ job.shortDescription }}</p>

          <div class="t:flex t:gap-2 t:flex-wrap t:justify-center t:md:justify-start">
            <q-badge v-for="tech in job.technologies" :key="tech" class="dark-badge">
              {{ tech }}
            </q-badge>
          </div>

          <p class="experience-dates">{{ job.dates }}</p>
        </div>
      </header>

      <div class="experience-body">
        <job-description :job="job.slug" class="t:text-base t:leading-relaxed t:dark:text-slate-300" />
      </div>
    </article>

    <div class="commercial-subsection">
      <h3 class="commercial-heading">{{ $t('nav.commercialProjects') }}</h3>
      <p class="commercial-description">{{ $t('commercialProjects.description') }}</p>

      <div
        v-for="(project, index) in commercialProjects"
        :key="project.slug"
        class="commercial-item"
      >
        <q-expansion-item
          expand-separator
          expand-icon="none"
          expand-icon-class="hidden"
          :disable="project.slug === 'nda'"
          class="t:!mt-2 t:hover:!bg-blue-100 t:dark:hover:!bg-transparent"
        >
          <template #header>
            <div class="commercial-item-header">
              <nuxt-img
                v-if="project.logo"
                :src="project.logo"
                :alt="`${project.company} logo`"
                class="company-logo t:bg-gray-100 t:dark:bg-slate-900 t:!object-scale-down t:p-[5px]"
                width="50"
                format="webp"
              />

              <div v-else>
                <q-icon
                  name="apartment"
                  size="30px"
                  color="grey-800"
                  class="t:bg-gray-100 t:dark:bg-slate-900 t:dark:!text-gray-400 t:!text-gray-800 t:p-2.5 t:rounded-full"
                />
              </div>

              <div class="commercial-item-meta">
                <p class="commercial-company">{{ project.company }}</p>
                <p class="commercial-subtitle">{{ project.shortDescription }}</p>

                <div v-if="project.technologies.length" class="t:flex t:gap-2 t:flex-wrap t:justify-center t:md:justify-start">
                  <q-badge v-for="tech in project.technologies" :key="tech" class="dark-badge">
                    {{ tech }}
                  </q-badge>
                </div>

                <p class="commercial-dates">{{ project.dates }}</p>
              </div>
            </div>
          </template>

          <q-card v-if="project.slug !== 'nda'" class="t:dark:!bg-transparent t:dark:text-white">
            <q-card-section class="t:!py-4 t:!px-4">
              <job-description :job="project.slug" class="t:text-sm t:leading-relaxed" />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator v-if="index < commercialProjects.length - 1" class="t:!mx-2 t:!bg-slate-300 t:dark:!bg-slate-700" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import JobDescription from '@/components/jobs/JobDesciption.vue';

const { t } = useI18n();

const job = computed(() => ({
  company: 'Polcar',
  shortDescription: t('experience.polcar.shortDescription'),
  slug: 'polcar' as const,
  logo: '/assets/icons/companies/polcar_no_bg.png',
  dates: t('experience.polcar.date'),
  technologies: ['Vue', 'Quasar', 'SSR', 'PWA', 'Laravel', 'SEO'],
}));

const commercialProjects = computed(() => [
  {
    company: t('commercialProjects.nda.name'),
    shortDescription: t('commercialProjects.nda.shortDescription'),
    slug: 'nda' as const,
    logo: null,
    dates: t('commercialProjects.nda.date'),
    technologies: [] as string[],
  },
  {
    company: 'StormCode',
    shortDescription: t('commercialProjects.infraTeam2.shortDescription'),
    slug: 'cemex' as const,
    logo: '/assets/icons/companies/stormcode.png',
    dates: t('commercialProjects.infraTeam2.date'),
    technologies: ['Vue', 'Quasar', 'Laravel'],
  },
  {
    company: 'Infra Team',
    shortDescription: t('commercialProjects.infraTeam1.shortDescription'),
    slug: 'infra-team' as const,
    logo: '/assets/icons/companies/infrateam_no_bg.png',
    dates: t('commercialProjects.infraTeam1.date'),
    technologies: ['Vue', 'Bootstrap', 'Laravel'],
  },
]);

const section = useTemplateRef('section');
const { registerSection } = useActiveSection();

onMounted(() => {
  registerSection('experience', section);
});
</script>

<style scoped>
.experience-feature {
  max-width: 920px;
  margin: 0 auto;
  padding: 24px 20px 32px;
}

.experience-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.experience-logo {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: contain;
  padding: 8px;
  background: #f1f5f9;
}

:global(.body--dark) .experience-logo {
  background: #0f172a;
}

.experience-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.experience-company {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
}

:global(.body--dark) .experience-company {
  color: #e2e8f0;
}

.experience-subtitle {
  margin: 0;
  font-size: 1.05rem;
  color: #64748b;
}

:global(.body--dark) .experience-subtitle {
  color: #94a3b8;
}

.experience-dates {
  margin: 4px 0 0;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #312e81;
}

:global(.body--dark) .experience-dates {
  color: #94a3b8;
}

.experience-body {
  margin-top: 28px;
  padding: 24px;
  border-radius: 16px;
  background: #f8fafc;
}

:global(.body--dark) .experience-body {
  background: rgba(15, 23, 42, 0.55);
}

.commercial-subsection {
  max-width: 920px;
  margin: 8px auto 0;
  padding: 0 20px 32px;
}

.commercial-heading {
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #334155;
  text-align: center;
}

:global(.body--dark) .commercial-heading {
  color: #cbd5e1;
}

.commercial-description {
  margin: 0 0 20px;
  text-align: center;
  font-size: 0.95rem;
  color: #64748b;
}

:global(.body--dark) .commercial-description {
  color: #94a3b8;
}

.commercial-item-header {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  padding: 4px 0;
}

.commercial-item :deep(.q-item) {
  font-family: inherit;
}

.commercial-item-meta {
  flex: 1;
  min-width: 0;
  text-align: left;
}

.commercial-company {
  margin: 0;
  font-family: 'Lato', sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.25;
  color: #0f172a;
}

:global(.body--dark) .commercial-company {
  color: #e2e8f0;
}

@media (max-width: 767.98px) {
  .commercial-company {
    font-size: 1rem;
  }
}

.commercial-subtitle {
  margin: 4px 0 8px;
  font-size: 0.9rem;
  color: #64748b;
}

:global(.body--dark) .commercial-subtitle {
  color: #94a3b8;
}

.commercial-dates {
  margin: 6px 0 0;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #312e81;
}

:global(.body--dark) .commercial-dates {
  color: #94a3b8;
}

.company-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

:deep(.body--light .q-expansion-item--expanded) {
  background: var(--t-color-slate-200);
}

:deep(.body--dark .q-expansion-item--expanded) {
  background: transparent;
}

:deep(.q-card--dark) {
  background: transparent;
}

:deep(.q-item) {
  transition: none;
}

@media (min-width: 768px) {
  .experience-header {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }

  .experience-meta {
    align-items: flex-start;
    flex: 1;
  }

  .commercial-heading,
  .commercial-description {
    text-align: left;
  }
}
</style>
