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

          <technologies-mini-badges
            :items="jobTechnologies"
            class="t:justify-center t:md:justify-start"
          />

          <p class="experience-dates">{{ job.dates }}</p>
        </div>
      </header>

      <div class="experience-body t:dark:!bg-slate-900">
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

                <technologies-mini-badges
                  v-if="project.technologies.length"
                  :items="getTechnologiesByNames(project.technologies)"
                />
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

      <div class="commercial-collaboration-cta t:dark:!bg-slate-900">
        <div class="commercial-collaboration-cta__media">
          <nuxt-img
            src="/assets/images/collaboration-handshake.jpg"
            :alt="$t('collaboration.homeCta')"
            width="520"
            height="340"
            format="webp"
            class="commercial-collaboration-cta__image"
          />
        </div>

        <div class="commercial-collaboration-cta__content">
          <p class="commercial-collaboration-cta__text">{{ $t('collaboration.experiencePromo.p1') }}</p>
          <p class="commercial-collaboration-cta__text">{{ $t('collaboration.experiencePromo.p2') }}</p>

          <div class="commercial-collaboration-cta__actions">
            <a
              :href="`mailto:${contactEmail}`"
              class="commercial-collaboration-cta__email"
            >
              <q-icon name="mail" size="18px" />
              {{ contactEmail }}
            </a>

            <div class="commercial-collaboration-cta__buttons">
              <q-btn
                class="custom-button"
                size="sm"
                rounded
                no-caps
                icon="mail"
                :loading="inquiryLoading"
                :label="$t('inquire')"
                @click="openInquiryModal"
              />
              <q-btn
                class="custom-button"
                size="sm"
                rounded
                no-caps
                icon="handshake"
                :label="$t('collaboration.homeCta')"
                :to="collaborationPath"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <inquiry-modal
      v-if="showInquiryModal"
      @hide="showInquiryModal = false"
      @before-show="inquiryLoading = false"
    />
  </section>
</template>

<script setup lang="ts">
import JobDescription from '@/components/jobs/JobDesciption.vue';
import { getTechnologiesByNames } from '~/helpers/technologyCatalog';

const InquiryModal = defineAsyncComponent(() => import('@/components/InquiryModal.vue'));

const { t } = useI18n();
const { commercialProjects } = useCommercialProjects();
const localePath = useLocalePath();
const collaborationPath = computed(() => localePath('wspolpraca'));

const contactEmail = 'kontakt@tomasz-slapinski.pl';
const showInquiryModal = ref(false);
const inquiryLoading = ref(false);

const jobTechnologyKeys = ['Vue', 'Quasar', 'SSR', 'PWA', 'Laravel', 'SEO'] as const;

const job = computed(() => ({
  company: 'Polcar',
  shortDescription: t('experience.polcar.shortDescription'),
  slug: 'polcar' as const,
  logo: '/assets/icons/companies/polcar_no_bg.png',
  dates: t('experience.polcar.date'),
  technologies: [...jobTechnologyKeys],
}));

const jobTechnologies = computed(() => getTechnologiesByNames([...jobTechnologyKeys]));

const section = useTemplateRef('section');
const { registerSection } = useActiveSection();

function openInquiryModal() {
  showInquiryModal.value = true;
  inquiryLoading.value = true;
}

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

.body--dark .experience-logo {
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

.body--dark .experience-company {
  color: #e2e8f0;
}

.experience-subtitle {
  margin: 0;
  font-size: 1.05rem;
  color: #64748b;
}

.body--dark .experience-subtitle {
  color: #94a3b8;
}

.experience-dates {
  margin: 4px 0 0;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #312e81;
}

.body--dark .experience-dates {
  color: #94a3b8;
}

.experience-body {
  margin-top: 28px;
  padding: 24px;
  border-radius: 16px;
  background: #f8fafc;
}

.body--dark .experience-body {
  background: #0f172a;
  border: 1px solid rgba(148, 163, 184, 0.12);
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

.body--dark .commercial-heading {
  color: #cbd5e1;
}

.commercial-description {
  margin: 0 0 20px;
  text-align: center;
  font-size: 0.95rem;
  color: #64748b;
}

.body--dark .commercial-description {
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

.body--dark .commercial-company {
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

.body--dark .commercial-subtitle {
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

.commercial-collaboration-cta {
  margin-top: 1.75rem;
  padding: 1.25rem;
  border-radius: 16px;
  text-align: center;
  background: linear-gradient(135deg, #f0fdfa 0%, #f8fafc 100%);
  border: 1px solid rgba(13, 148, 136, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
}

.body--dark .commercial-collaboration-cta {
  background-image: linear-gradient(135deg, #0f172a 0%, #134e4a 100%);
  background-color: #0f172a;
  border-color: rgba(45, 212, 191, 0.2);
}

.commercial-collaboration-cta__media {
  width: 100%;
  max-width: 420px;
  flex-shrink: 0;
}

.commercial-collaboration-cta__image {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}

.commercial-collaboration-cta__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  min-width: 0;
}

.commercial-collaboration-cta__text {
  margin: 0 0 1rem;
  font-size: 0.98rem;
  line-height: 1.75;
  color: #475569;
}

.commercial-collaboration-cta__text:last-of-type {
  margin-bottom: 1.15rem;
}

.body--dark .commercial-collaboration-cta__text {
  color: #94a3b8;
}

.commercial-collaboration-cta__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
}

.commercial-collaboration-cta__email {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #0d9488;
  text-decoration: none;
  transition: color 0.2s ease;
  word-break: break-all;
}

.commercial-collaboration-cta__email:hover {
  color: #0f766e;
}

.body--dark .commercial-collaboration-cta__email {
  color: #2dd4bf;
}

.body--dark .commercial-collaboration-cta__email:hover {
  color: #5eead4;
}

.commercial-collaboration-cta__buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem;
}

@media (min-width: 768px) {
  .commercial-collaboration-cta {
    flex-direction: row;
    align-items: center;
    text-align: left;
    padding: 1.35rem 1.5rem;
    gap: 1.75rem;
  }

  .commercial-collaboration-cta__media {
    width: 42%;
    max-width: 300px;
  }

  .commercial-collaboration-cta__content {
    align-items: flex-start;
    flex: 1;
  }

  .commercial-collaboration-cta__actions {
    align-items: flex-start;
  }

  .commercial-collaboration-cta__buttons {
    justify-content: flex-start;
  }
}
</style>
