<template>
  <q-page style="max-width: 2000px; margin-inline: auto;" class="t:bg-white t:dark:bg-gradient-to-br t:dark:from-black t:dark:to-slate-800">
    <section class="q-pt-sm">
      <section-title :title="$t('nav.projects')">
        <div class="t:text-center t:!text-sm t:!tracking-wider t:font-light t:text-slate-700 t:dark:text-slate-400 t:mb-2 t:px-3">
          Na tej podstronie znajdziesz większość projektów które stworzyłem lub współtworzyłem.
        </div>
      </section-title>

      <div 
        class="t:grid t:gap-x-8 t:gap-y-8 t:py-6 t:px-4 t:justify-center
        t:grid-cols-1 t:md:grid-cols-2 t:lg:grid-cols-3"
      >
        <template v-for="(project, index) in projects" :key="index">
          <q-card
            class="bg-white text-dark text-center education-item t:dark:!bg-slate-900"
          >
            <q-img :src="project.image" class="t:w-full t:lg:h-[150px] t:h-[120px]" />

            <q-card-section
              class="d-flex flex-column full-height fit"
              style="z-index: 1; position: relative;"
            >
              <h2 class="q-my-sm text-bold t:dark:text-slate-300 t:!text-[14px]">{{ project.name }}</h2>

              <div class="t-text-xs t-text-gray-500 t:mb-2 t:flex t:items-center t:justify-center t:gap-x-5 t:flex-wrap t:gap-y-1">
                <div class="t-text-xs t-text-gray-500 t:flex t:items-center t:justify-center t:gap-0.5">
                  <q-icon name="account_circle" /> {{ project.peopleCount }}
                </div>
                <div class="t-text-xs t-text-gray-500 t:flex t:items-center t:justify-center t:gap-1">
                  <q-icon name="calendar_month" /> {{ formatDate(project.startDate) }} - {{ formatDate(project.endDate) }}
                </div>
              </div>

              <div class="d-flex justify-center q-mb-sm t:gap-2">
                <template v-for="tech in project.technologies" :key="tech">
                  <technologies-badge :technology="tech" />
                </template>
              </div>

              <p class="limit-lines t:dark:text-slate-400 t:text-sm">{{ project.description }}</p>
              <q-btn flat color="blue-13" no-caps> {{ $t('projects.readMore')}}...</q-btn>
            </q-card-section>
          </q-card>
        </template>
      </div>

    </section>
  </q-page>
</template>

<script setup lang="ts">
import gbFlag from 'assets/icons/projects/gb_flag.jpg';
import treesImg from 'assets/icons/projects/trees.jpg';
import chatImg from 'assets/icons/projects/czat.jpg';
import testImg from 'assets/icons/projects/test.webp';
import type { Technology } from '~/helpers/technology';

interface Project {
  name: string;
  peopleCount: number;
  description: string;
  slug: string;
  technologies: Technology[];
  image: string;
  startDate: Date;
  endDate: Date;
}

const { t } = useI18n();

const projects = computed<Project[]>(() => [
  { 
    name: t('projects.englishLearning.name'),
    description: t('projects.englishLearning.description'),
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-05-15'),
    slug: 'ela',
    technologies: ['Vue', 'Laravel'],
    image: gbFlag,
    peopleCount: 3,
  },
  {
    name: t('projects.dtVisualization.name'),
    description: t('projects.dtVisualization.description'),
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-05-15'),
    slug: 'dt',
    technologies: ['Quasar', 'Laravel'],
    image: treesImg,
    peopleCount: 1,
  },
  {
    name: t('projects.AIchat.name'),
    description: t('projects.AIchat.description'),
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-05-15'),
    slug: 'ai-chat',
    technologies: ['Quasar', 'Java', 'Spring'],
    image: chatImg,
    peopleCount: 1,
  },
  {
    name: t('projects.testManagement.name'),
    description: t('projects.testManagement.description'),
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-05-15'),
    slug: 'test-management',
    technologies: ['Spring', 'Thymeleaf'],
    image: testImg,
    peopleCount: 1,
  }
]);

const formatDate = (date: Date) => {
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short'
  });
};

</script>

<style scoped>
.education-item {
  background-color: #f9f9f9 !important;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.6s ease, opacity 0.6s ease;
}

.limit-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
