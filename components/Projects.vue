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
          <!-- <q-img :src="project.image" class="t:w-full t:lg:h-[150px] t:h-[120px]" :alt="project.name"/> -->

          <nuxt-img
            :src="project.image"
            :alt="project.name"
            class="t:w-full t:lg:h-[150px] t:h-[120px] t:object-cover"
            width="400"
            format="webp"
            densities="x1 x2"
          />

          <q-card-section
            class="d-flex flex-column full-height fit"
            style="z-index: 1; position: relative;"
          >
            <h4 class="q-my-sm text-bold t:dark:text-slate-300" style="font-size: 14px">{{ project.name }}</h4>
            <div class="d-flex justify-center q-mb-sm gap-5">
              <template v-for="tech in project.technologies" :key="tech">
                <technologies-badge :technology="tech" />
              </template>
            </div>
            <p class="limit-lines t:dark:text-slate-400">{{ project.description }}</p>
            <div class="project-actions d-flex justify-center flex-wrap gap-5">
              <q-btn
                flat
                no-caps
                class="project-action project-action--read"
                :aria-label="$t('projects.readMore') + ' ' + $t('aria.about') + ' ' + project.name"
              >
                {{ $t('projects.readMore') }}...
              </q-btn>

              <q-btn
                v-if="project.demoLink"
                flat
                no-caps
                class="project-action project-action--demo"
                tag="a"
                :href="project.demoLink"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="$t('projects.viewDemo') + ' ' + project.name"
              >
                {{ $t('projects.viewDemo') }}
              </q-btn>
            </div>

          </q-card-section>
        </q-card>
      </template>
    </div>
      
    <div class="text-center q-py-lg q-pb-xl q-mx-lg">
      <q-btn
        class="custom-button t:!text-[15px] t:!z-50"
        size="md"
        rounded
        :to="`${localeForURL}/projects-list`"
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
// import gbFlag from 'assets/icons/projects/gb_flag.jpg';
// import treesImg from 'assets/icons/projects/trees.webp';
// import chatImg from 'assets/icons/projects/czat.jpg';
// import testImg from 'assets/icons/projects/test.webp';
import type { Technology } from '~/helpers/technology';

interface Project {
  name: string;
  description: string;
  year: number;
  slug: string;
  technologies: Technology[];
  image: string;
  demoLink?: string;
}

const { t, locale: currentLocale } = useI18n();

const localeForURL = computed(() => currentLocale.value === 'pl' ? '' : `/${currentLocale.value}`);

const projects = computed<Project[]>(() => [
  {
    name: t('projects.discreteLogarithm.name'),
    description: t('projects.discreteLogarithm.description'),
    year: 2026,
    slug: 'discrete-logarithm',
    technologies: ['Vue', 'Nuxt'],
    image: '/assets/icons/projects/discrete-logarithm.svg',
    demoLink: 'https://discrete-logarithm.tomasz-slapinski.pl/',
  },
  { 
    name: t('projects.englishLearning.name'),
    description: t('projects.englishLearning.description'),
    year: 2023,
    slug: 'ela',
    technologies: ['Vue', 'Laravel'],
    image: '/assets/icons/projects/gb_flag.jpg',
  },
  {
    name: t('projects.dtVisualization.name'),
    description: t('projects.dtVisualization.description'),
    year: 2024,
    slug: 'dt',
    technologies: ['Quasar', 'Laravel'],
    image: '/assets/icons/projects/trees.webp',
  },
  {
    name: t('projects.AIchat.name'),
    description: t('projects.AIchat.description'),
    year: 2024,
    slug: 'ai-chat',
    technologies: ['Quasar', 'Java', 'Spring'],
    image: '/assets/icons/projects/czat.jpg',
  },
  {
    name: t('projects.testManagement.name'),
    description: t('projects.testManagement.description'),
    year: 2024,
    slug: 'test-management',
    technologies: ['Spring', 'Thymeleaf'],
    image: '/assets/icons/projects/test.webp',
  }
]);

const section = useTemplateRef('section');
const { registerSection } = useActiveSection();

onMounted(() => {
  registerSection('projects', section);
});

</script>

<style scoped>

.project-actions {
  margin-top: 2px;
}

.project-actions .project-action {
  position: relative;
  overflow: hidden;
  padding-bottom: 2px;
  letter-spacing: 1px;
  font-size: 11px;
  padding: 10px;
  text-transform: uppercase;
  border-radius: 6px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.project-action--read {
  color: #64748b;
}

.project-action--read:hover {
  color: #334155;
  background-color: rgba(100, 116, 139, 0.1);
}

.project-action--demo {
  color: #0d9488;
}

.project-action--demo:hover {
  color: #0f766e;
  background-color: rgba(13, 148, 136, 0.1);
}

:global(.body--dark) .project-action--read {
  color: #94a3b8;
}

:global(.body--dark) .project-action--read:hover {
  color: #e2e8f0;
  background-color: rgba(148, 163, 184, 0.12);
}

:global(.body--dark) .project-action--demo {
  color: #2dd4bf;
}

:global(.body--dark) .project-action--demo:hover {
  color: #5eead4;
  background-color: rgba(45, 212, 191, 0.12);
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