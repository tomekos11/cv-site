<template>
  <section id="experience" ref="section">
    <section-title :title="$t('nav.experience')" :description="$t('experience.description')" />

    <q-timeline v-if="isDesktop" color="indigo-11" layout="loose" class="q-pa-lg work-history">
      <q-timeline-entry
        v-for="(job, index) in workHistory"
        :key="index"
        :side="index % 2 === 0 ? 'left' : 'right'"
        :title="job.company"
      >
        <template #title>
          <q-expansion-item
            expand-separator
            :header-class="`${index % 2 === 0 ? 'justify-end' : ''}`"
            expand-icon="none"
            expand-icon-class="hidden"
            class="t:!mt-2 t:hover:!bg-blue-100 t:dark:hover:!bg-transparent"
          >
            <template #header>
              <div :class="`t:flex t:gap-2 t:items-center t:justify-center  t:dark:p-3 t:rounded-2xl ${index % 2 === 0 ? 'justify-end' : ''}`">
                <nuxt-img
                  v-if="job.logo"
                  :src="job.logo"
                  :alt="`${job.company} logo`"
                  :class="`company-logo t:bg-gray-100 t:dark:bg-slate-900 t:!object-scale-down t:p-[5px]`"
                  width="50"
                  format="auto"
                  loading="lazy"
                />

                <div v-else>
                  <q-icon name="apartment" size="30px" color="grey-800" class="t:bg-gray-100 t:dark:bg-slate-900 t:dark:!text-gray-400 t:!text-gray-800 t:p-2.5 t:mr-[10px] t:rounded-full" />
                </div>
                <div>
                  <h4 class="text-bold t:text-center t:!text-lg">{{ job.company }}</h4>
                  <div class="t:text-sm t:mt-0.5 t:mb-2 t:text-center t:dark:text-slate-400">{{ job.shortDescription }}</div>

                  <div class="t:flex t:gap-2 t:flex-wrap">
                    <q-badge v-for="tech in job.technologies" :key="tech" class="dark-badge">
                      {{ tech }}
                    </q-badge>
                  </div>
                
                  <div class="text-caption t:text-center t:!tracking-wider t:text-indigo-900 t:dark:text-slate-400 t:font-bold t:mt-1">{{ job.dates }}</div>
                </div>
              </div>
            </template>

            <q-card class="t:dark:!bg-transparent t:dark:text-white">
              <q-card-section>
                <job-description :job="job.slug" class="t:text-sm"/>
              </q-card-section>
            </q-card>

          </q-expansion-item>
        </template>
      </q-timeline-entry>
    </q-timeline>

    <!-- dla mobilek -->
    <div v-else>
      <div
        v-for="(job, index) in workHistory"
        :key="index"
        class="t:px-3"
      >
        <q-expansion-item
          header-class="justify-start"
          expand-icon="none"
          expand-icon-class="hidden"
          class="t:!mt-2 t:hover:!bg-blue-100"
        >
          <template #header>
            <div class="t:flex t:gap-2 t:items-center t:justify-center">
              <nuxt-img
                v-if="job.logo"
                :src="job.logo"
                :alt="`${job.company} logo`"
                :class="`company-logo t:bg-gray-100 t:dark:bg-slate-900 t:!object-scale-down t:p-[5px]`"
                width="50"
                format="auto"
                loading="lazy"
              />
                
              <div v-else>
                <q-icon name="apartment" size="30px" color="grey-800" class="t:bg-gray-100 t:dark:bg-slate-900 t:dark:!text-gray-400 t:!text-gray-800 t:p-2.5 t:mr-[10px] t:rounded-full" />
              </div>
              <div>
                <h4 class="text-bold t:!text-lg">{{ job.company }}</h4>
                <div class="t:text-sm t:mt-0.5 t:mb-2">{{ job.shortDescription }}</div>

                <div class="t:flex t:gap-2 t:flex-wrap">
                  <q-badge v-for="tech in job.technologies" :key="tech" class="dark-badge">
                    {{ tech }}
                  </q-badge>
                </div>

                <div class="t:text-slate-900 t:dark:text-slate-700 t:font-semibold t:my-1">{{ job.dates }}</div>
              </div>
            </div>
          </template>
          <q-card>
            <q-card-section>
              <job-description :job="job.slug" class="t:text-sm"/>
            </q-card-section>
          </q-card>

          <q-separator class="t:!mx-4 t:!bg-slate-900"/>

        </q-expansion-item>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import JobDescription from '@/components/jobs/JobDesciption.vue';

const isDesktop = ref(true);

if (import.meta.server) {
  const userAgent = useRequestHeaders(['user-agent'])['user-agent'] || '';
  isDesktop.value = !/Mobile|Android|iP(ad|hone)/i.test(userAgent);
} else {
  // Klient: aktualizacja szerokości ekranu
  const updateWidth = () => {
    isDesktop.value = window.innerWidth > 800;
  };
  window.addEventListener('resize', updateWidth);
  updateWidth();
}


const { t } = useI18n();

interface WorkHistory {
  company: string;
  shortDescription: string;
  slug: 'polcar' | 'cemex' | 'infra-team' | 'nda';
  logo: string | null;
  dates: string;
  technologies: string[];
  expanded: boolean;
}

const workHistory: WorkHistory[] = computed(() => [
  {
    company: 'Polcar',
    shortDescription: t('experience.polcar.shortDescription'),
    slug: 'polcar',
    logo: '/assets/icons/companies/polcar_no_bg.png',
    dates: t('experience.polcar.date'),
    technologies: ['Vue', 'Quasar', 'SSR', 'PWA', 'Laravel', 'SEO'],
    expanded: false,
  },
  {
    company: t('experience.nda.name'),
    shortDescription: t('experience.nda.shortDescription'),
    slug: 'nda',
    logo: null,
    dates: t('experience.nda.date'),
    technologies: [],
    expanded: false,
  },
  {
    company: 'StormCode',
    shortDescription: t('experience.infraTeam2.shortDescription'),
    slug: 'cemex',
    logo: '/assets/icons/companies/stormcode.png',
    dates: t('experience.infraTeam2.date'),
    technologies: ['Vue', 'Quasar', 'Laravel'],
    expanded: false,
  },
  {
    company: 'Infra Team',
    shortDescription: t('experience.infraTeam1.shortDescription'),
    slug: 'infra-team',
    logo: '/assets/icons/companies/infrateam_no_bg.png',
    dates: t('experience.infraTeam1.date'),
    technologies: ['Vue', 'Bootstrap', 'Laravel'],
    expanded: false,
  },
]);

const section = useTemplateRef('section');

onMounted(() => {
  const { registerSection } = useActiveSection();
  registerSection('experience', section);
});

</script>

<style scoped>
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
</style>

<style>
.work-history {
  max-width: 1120px;
  margin: auto;
}

.company-logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
}

</style>