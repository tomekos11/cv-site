<template>
  <section id="projects" ref="section" class="q-pt-sm">

    <section-title :title="$t('nav.projects')" />

    <div 
      class="q-pt-sm q-pb-md q-px-md" 
      style="display: grid; grid-template-columns: repeat(auto-fit, min(374px, 100%)); gap: 0 30px; justify-content: center;"
    >
      <template
        v-for="(project, index) in projects"
        :key="index"
      >
        <q-card
          class="bg-white text-dark text-center education-item t:dark:!bg-slate-900"
        >
          <q-img :src="project.image" class="t:w-full t:lg:h-[150px] t:h-[120px]" />

          <q-card-section
            class="d-flex flex-column full-height fit"
            style="z-index: 1; position: relative;"
          >
            <h2 class="q-my-sm text-bold t:dark:text-slate-300" style="font-size: 14px">{{ project.name }}</h2>
            <div class="d-flex justify-center q-mb-sm gap-5">
              <template v-for="tech in project.technologies" :key="tech">
                <technologies-badge :technology="tech" />
              </template>
            </div>
            <p class="limit-lines t:dark:text-slate-400">{{ project.description }}</p>
            <q-btn flat color="blue-13" no-caps> {{ $t('projects.readMore')}}...</q-btn>

          </q-card-section>
        </q-card>
      </template>
    </div>

    <div class="text-center q-py-lg q-pb-xl q-mx-lg">
      <q-btn
        class="custom-button"
        style="font-size: 15px;"
        size="md"
        rounded
        to="/projects-list"
      >
        <div>
          {{ $t('projects.viewAllProjects') }}
        </div>
        
        <Icon name="fa-solid:external-link-alt" size="1rem" class="q-mx-sm"/>
      </q-btn>
    </div>
  </section>
</template>

<script setup lang="ts">
import gbFlag from 'assets/icons/projects/gb_flag.jpg';
import treesImg from 'assets/icons/projects/trees.jpg';
import chatImg from 'assets/icons/projects/czat.jpg';
import testImg from 'assets/icons/projects/test.webp';
import type { Technology } from '~/helpers/technology';


interface Project {
  name: string;
  description: string;
  year: number;
  slug: string;
  technologies: Technology[];
  image: string;
}

const { t } = useI18n();

const projects = computed<Project[]>(() => [
  { 
    name: t('projects.englishLearning.name'),
    description: t('projects.englishLearning.description'),
    year: 2023,
    slug: 'ela',
    technologies: ['Vue', 'Laravel'],
    image: gbFlag
  },
  {
    name: t('projects.dtVisualization.name'),
    description: t('projects.dtVisualization.description'),
    year: 2024,
    slug: 'dt',
    technologies: ['Quasar', 'Laravel'],
    image: treesImg
  },
  {
    name: t('projects.AIchat.name'),
    description: t('projects.AIchat.description'),
    year: 2024,
    slug: 'ai-chat',
    technologies: ['Quasar', 'Java', 'Spring'],
    image: chatImg
  },
  {
    name: t('projects.testManagement.name'),
    description: t('projects.testManagement.description'),
    year: 2024,
    slug: 'test-management',
    technologies: ['Spring', 'Thymeleaf'],
    image: testImg
  }
]);

const section = useTemplateRef('section');

onMounted(() => {
  const { registerSection } = useActiveSection();
  registerSection('projects', section);
});

</script>

<style scoped>

.q-btn {
  position: relative;
  overflow: hidden;
  padding-bottom: 2px; /* Odstęp między tekstem a efektem podkreślenia */
  letter-spacing: 1px;
  font-size: 11px;
  padding: 10px;
  text-transform: uppercase;
}


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

:deep(.q-parallax__content) {
  justify-content: start;
}


</style>