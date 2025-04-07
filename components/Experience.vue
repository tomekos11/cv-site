<template>
  <section id="experience" ref="section">
    <h1 class="text-center fancy-text bg-grey-2">{{ $t('nav.experience') }}</h1>

    <q-timeline v-if="isDesktop" color="primary" layout="loose" class="q-pa-lg work-history">
      <q-timeline-entry
        v-for="(job, index) in workHistory"
        :key="index"
        :side="index % 2 === 0 ? 'left' : 'right'"
        :title="job.company"
        :header-class="'text-primary'"
      >
        <template #title>
          <div :class="`entry-header ${index % 2 === 0 ? 'justify-end' : ''}`">
            <img :src="job.logo" class="company-logo" >
            <div>
              <h2 class="text-bold" style="font-size: large;">{{ job.company }}</h2>
              <div class="text-caption">{{ job.dates }}</div>
            </div>
          </div>
        </template>
        <div>
          
          <job-description :job="job.slug"/>
        </div>
      </q-timeline-entry>
    </q-timeline>

    <div v-else>
      <div
        v-for="(job, index) in workHistory"
        :key="index"
        class="q-mb-lg"
      >
        <div class="entry-header q-px-xl">
          <q-img :src="job.logo" class="company-logo" />
          <div>
            <h2 class="text-bold" style="font-size: large;">{{ job.company }}</h2>
            <div class="text-caption">{{ job.dates }}</div>
          </div>
        </div>

        <job-description class="q-px-md" :job="job.slug"/>
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
  slug: 'polcar' | 'cemex' | 'infra-team';
  logo: string;
  dates: string;
  expanded: boolean;
}

const workHistory: WorkHistory[] = [
  {
    company: 'Polcar',
    slug: 'polcar',
    logo: '/assets/icons/companies/polcar.png',
    dates: t('experience.date1'),
    expanded: false,
  },
  {
    company: 'Infra Team',
    slug: 'cemex',
    logo: '/assets/icons/companies/infrateam.jpg',
    dates: t('experience.date2'),
    expanded: false,
  },
  {
    company: 'Infra Team',
    slug: 'infra-team',
    logo: '/assets/icons/companies/infrateam.jpg',
    dates: t('experience.date3'),
    expanded: false,
  },
];

const section = useTemplateRef('section');

onMounted(() => {
  const { registerSection } = useActiveSection();
  registerSection('experience', section);
});

</script>

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

.entry-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.q-expansion-item {
  margin-top: 10px;
}

@media (min-width: 800px) {
  .work-history {
    max-width: 1120px;
    margin: auto;
  }
}
</style>