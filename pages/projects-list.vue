<template>
  <q-page class="t:bg-white t:dark:bg-gradient-to-br t:dark:from-black t:dark:to-slate-800 t:mx-auto t:max-w-[2000px] t:pb-[50px]">
    <section class="landing-page q-pt-sm t:xl:p-5 t:lg:p-4 t:md:p-3 t:p-2">
      <section-title component="h1" :title="$t('nav.projects')">
        <div class="t:text-center t:!text-sm t:!tracking-wider t:font-light t:text-slate-700 t:dark:text-slate-400 t:mb-2 t:px-3">
          {{ t('projects.description') }}
        </div>

        <div class="t:flex t:justify-center t:gap-x-4 t:gap-y-2 t:flex-wrap t:max-w-[600px] t:mx-auto t:px-2">
          <q-select v-model="sorting" clearable dense filled :label="$t('projectsList.sort')" class="t:min-w-[180px] t:w-full t:sm:w-auto t:grow" :options="sortingOptions" />
          <q-select v-model="filter" use-input use-chips clearable dense filled multiple :input-debounce="300" :label="$t('projectsList.filter')" class="t:min-w-[180px] t:w-full t:sm:w-auto t:grow" :options="filterOptionsFiltered" @input-value="onFilter" />
        </div>
      </section-title>

      <div 
        class="t:grid t:gap-x-8 t:gap-y-8 t:py-6 t:px-2 t:justify-center
        t:grid-cols-1 t:sm:grid-cols-2 t:lg:grid-cols-3 t:xl:grid-cols-4"
      >
        <template v-for="(project, index) in projectsSorted" :key="index">
          <q-card
            class="t:!flex t:!flex-col bg-white text-dark text-center education-item t:dark:!bg-slate-900"
          >
            <nuxt-img :src="project.image" width="500" format="avif" class="t:object-cover t:w-full t:lg:h-[150px] t:h-[120px]" :alt="`${project.name}`" placeholder/>
            <q-card-section class="t:grow" >
              <div class="t:flex t:flex-col t:grow">
                <div class="t:flex">

                  <div v-if="project.githubLinks" class="t:w-[24px]"/>

                  <div class="t:grow">
                    <h2 class="q-my-sm text-bold t:dark:text-slate-300 t:!text-[14px]">{{ project.name }}</h2>

                    <div class="t-text-xs t-text-gray-500 t:mb-2 t:flex t:items-center t:justify-center t:gap-x-5 t:flex-wrap t:gap-y-1 t:dark:text-slate-300">
                      <div class="t-text-xs t-text-gray-500 t:flex t:items-center t:justify-center t:gap-0.5">
                        <q-icon name="account_circle" /> {{ project.peopleCount }}
                      </div>
                      <div class="t-text-xs t-text-gray-500 t:flex t:items-center t:justify-center t:gap-1">
                        <q-icon name="calendar_month" /> {{ formatDate(project.startDate) }} - {{ formatDate(project.endDate) }}
                      </div>
                    </div>

                    <div class="d-flex justify-center q-mb-sm t:gap-2 t:flex-wrap">
                      <template v-for="tech in project.technologies" :key="tech">
                        <technologies-badge :technology="tech" />
                      </template>
                    </div>
                  </div>

                  <q-btn v-if="project.githubLinks" flat round rounded class="t:self-start t:!p-0">
                    <q-menu class="t:!max-w-[180px]">
                      <div class="t:p-3 t:text-sm t:text-center t:tracking-wide t:dark:text-slate-400 t:text-slate-700">
                        {{ $t('projectsList.choose') }} 
                      </div>

                      <q-item v-if="project.githubLinks.project" dense clickable>
                        <q-item-section>
                          <a :href="project.githubLinks.project" target="_blank">
                            {{ $t('projectsList.wholeProject') }}  <q-icon name="code" />
                          </a>
                        </q-item-section>
                      </q-item>

                      <q-item v-if="project.githubLinks.frontend" dense clickable>
                        <q-item-section>
                          <a :href="project.githubLinks.frontend" target="_blank">
                            Frontend <q-icon name="code" />
                          </a>
                        </q-item-section>
                      </q-item>

                      <q-item v-if="project.githubLinks.backend" dense clickable>
                        <q-item-section>
                          <a :href="project.githubLinks.backend" target="_blank">
                            Backend <q-icon name="code" />
                          </a>
                        </q-item-section>
                      </q-item>

                      <q-item v-if="project.githubLinks['backend-2']" dense clickable>
                        <q-item-section>
                          <a :href="project.githubLinks['backend-2']" target="_blank">
                            Backend2 <q-icon name="code" />
                          </a>
                        </q-item-section>
                      </q-item>
                    </q-menu>
                    <Icon name="uil:github" size="24px" class="t:flex t:dark:text-slate-300"/>
                  </q-btn>
                </div>

                <p class="limit-lines t:dark:text-slate-400 t:text-sm">{{ project.description }}</p>

              </div>
              <q-btn flat color="blue-13" no-caps class="t:!w-full t:!mt-auto"> {{ $t('projects.readMore')}}...</q-btn>
            </q-card-section>
          </q-card>
        </template>
      </div>

    </section>
  </q-page>
</template>

<script setup lang="ts">
import type { Technology } from '~/helpers/technology';
import { technologies } from '~/helpers/technology';

interface Project {
  name: string;
  peopleCount: number;
  description: string;
  slug: string;
  technologies: Technology[];
  // technologies: string[];
  image: string;
  startDate: Date;
  endDate: Date;
  githubLinks?: Partial<Record<'frontend' | 'backend' | 'backend-2' | 'project', string>>;
}

const { t } = useI18n();

const title = computed(() => t('seo.projectsList.title'));
const description = computed(() => t('seo.projectsList.description'));

useSeo('/projects-list', title.value, description.value, title.value, description.value);

const { person } = usePerson();

useJsonld(() => ([
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Lista projektów Tomasza Słapińskiego',
    'description': 'Kolekcja projektów webowych, narzędzi i aplikacji stworzonych przez Tomasza Słapińskiego, Full-Stack Developera.',
    'url': 'https://cv.tomasz-slapinski.pl/projects-list',
    'creator': person.value,
  }
]));

const inputValue = ref('');

function onFilter(val: string) {
  inputValue.value = val;
}

const filterOptionsFiltered = computed(() => {
  if (!inputValue.value) return technologies;
  const val = inputValue.value.toLowerCase();
  return technologies.filter(opt => opt.toLowerCase().includes(val));
});

const sortingOptions = computed(() => [
  { value: 'date_desc', label: t('projectsList.sortingOptions.fromTheNewest')  },
  { value: 'date_asc', label: t('projectsList.sortingOptions.fromTheOldest') },
] as const);

const filter = ref<typeof technologies[number] | null>(null);
const sorting = ref<typeof sortingOptions.value[number] | null>(sortingOptions.value[0]);


const projects = computed<Project[]>(() => [
  {
    name: t('projects.heat-control-assistant.name'),
    description: t('projects.heat-control-assistant.description'),
    startDate: new Date('2024-01-05'),
    endDate: new Date('2023-10-10'),
    image: '/assets/icons/projects/heat-control-assistant.png',
    slug: 'heat-control-assistant',
    peopleCount: 1,
    technologies: ['Arduino', 'C++'],
    githubLinks: {
      project: 'https://github.com/tomekos11/heat_control_assistant'
    }
  },
  {
    name: t('projects.tic-tac-toe.name'),
    description: t('projects.tic-tac-toe.description'),
    startDate: new Date('2024-04-15'),
    endDate: new Date('2024-04-24'),
    image: '/assets/icons/projects/tic-tac-toe.png',
    slug: 'tic-tac-toe',
    peopleCount: 1,
    technologies: ['Vue', 'PHP', 'Laravel', 'Bootstrap'],
    githubLinks: {
      project: 'https://github.com/tomekos11/tic-tac-toe'
    }
  },
  {
    name: t('projects.checkers.name'),
    description: t('projects.checkers.description'),
    startDate: new Date('2023-12-04'),
    endDate: new Date('2024-12-19'),
    image: '/assets/icons/projects/checkers.png',
    slug: 'checkers',
    peopleCount: 3,
    technologies: ['Vue', 'Quasar', 'Python', 'Django', 'Computer Vision', 'AI Integration', 'WebSocket'],
    githubLinks: {
      project: 'https://github.com/tomekos11/warcaby'
    }
  },
  {
    name: t('projects.votingSystem.name'),
    description: t('projects.votingSystem.description'),
    startDate: new Date('2025-03-25'),
    endDate: new Date('2025-05-29'),
    image: '/assets/icons/projects/voting-system.png',
    slug: 'voting-system',
    peopleCount: 2,
    technologies: ['Vue', 'Nuxt', 'Nuxt UI', 'Tailwind', 'Blockchain', 'MetaMask Integration', 'Node', 'Express', 'Prisma'],
    githubLinks: {
      frontend: 'https://github.com/tomekos11/voting-app-frontend',
      backend: 'https://github.com/tomekos11/voting-app-backend',
    }
  },
  {
    name: t('projects.keystrokeDynamics.name'),
    description: t('projects.keystrokeDynamics.description'),
    startDate: new Date('2025-03-25'),
    endDate: new Date('2025-05-29'),
    image: '/assets/icons/projects/keystroke-dynamics.png',
    slug: 'forum',
    peopleCount: 2,
    technologies: ['Vue', 'Nuxt', 'Nuxt UI', 'Tailwind', 'Node', 'Nest.js', 'Typeorm', 'Python', 'GRPC'],
    githubLinks: {
      frontend: 'https://github.com/tomekos11/keystroke-dynamics-frontend',
      backend: 'https://github.com/Narelsiak/keystroke-dynamics-backend',
      'backend-2': 'https://github.com/Narelsiak/keystroke-dynamics-model',
    }
  },
  {
    name: t('projects.forum.name'),
    description: t('projects.forum.description'),
    startDate: new Date('2025-03-25'),
    endDate: new Date('2025-05-29'),
    image: '/assets/icons/projects/forum.png',
    slug: 'forum',
    peopleCount: 2,
    technologies: ['Vue', 'Nuxt', 'Nuxt UI', 'Tailwind', 'Node', 'Adonis.js'],
    githubLinks: {
      frontend: 'https://github.com/tomekos11/forum-frontend',
      backend: 'https://github.com/tomekos11/forum-backend',
    }
  },
  {
    name: t('projects.webAttacks.name'),
    description: t('projects.webAttacks.description'),
    startDate: new Date('2025-01-10'),
    endDate: new Date('2025-05-20'),
    image: '/assets/icons/projects/web-attacks.png',
    slug: 'web-attacks',
    peopleCount: 2,
    technologies: ['Vue', 'Quasar', 'Node', 'Express', 'WebSocket'],
    githubLinks: {
      frontend: 'https://github.com/tomekos11/web-attacks-frontend',
      backend: 'https://github.com/tomekos11/web-attacks-backend',
    }
  },
  {
    name: t('projects.cvSite.name'),
    description: t('projects.cvSite.description'),
    startDate: new Date('2024-12-15'),
    endDate: new Date('2025-06-24'),
    image: '/assets/icons/projects/cv-site.png',
    slug: 'cv-site',
    peopleCount: 1,
    technologies: ['Vue', 'Nuxt', 'Quasar UI', 'SEO'],
    githubLinks: {
      frontend: 'https://github.com/tomekos11/cv-site',
    }
  },
  { 
    name: t('projects.englishLearning.name'),
    description: t('projects.englishLearning.description'),
    startDate: new Date('2023-03-13'),
    endDate: new Date('2023-06-05'),
    slug: 'ela',
    technologies: ['Vue', 'Laravel'],
    image: '/assets/icons/projects/gb_flag.jpg',
    peopleCount: 3,
  },
  {
    name: t('projects.dtVisualization.name'),
    description: t('projects.dtVisualization.description'),
    startDate: new Date('2023-07-10'),
    endDate: new Date('2025-01-20'),
    slug: 'dt',
    technologies: ['Vue', 'Quasar', 'PHP', 'Laravel'],
    image: '/assets/icons/projects/trees.webp',
    peopleCount: 1,
  },
  {
    name: t('projects.AIchat.name'),
    description: t('projects.AIchat.description'),
    startDate: new Date('2024-06-05'),
    endDate: new Date('2024-06-26'),
    slug: 'ai-chat',
    technologies: ['Vue', 'Quasar', 'Java', 'Spring', 'AI Integration'],
    image: '/assets/icons/projects/czat.jpg',
    peopleCount: 1,
    githubLinks: {
      project: 'https://github.com/tomekos11/spring-chat-AI'
    }
  },
  {
    name: t('projects.testManagement.name'),
    description: t('projects.testManagement.description'),
    startDate: new Date('2024-06-11'),
    endDate: new Date('2024-06-29'),
    slug: 'test-management',
    technologies: ['Java', 'Spring', 'Thymeleaf'],
    image: '/assets/icons/projects/test.webp',
    peopleCount: 1,
    githubLinks: {
      frontend: 'https://github.com/tomekos11/spring-school-tests'
    }
  }
]);

const formatDate = (date: Date) => {
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short'
  });
};

const projectsSorted = computed(() => {

  const filtered = filter.value && filter.value.length
    ? projects.value.filter(p => p.technologies.some(el => filter.value?.includes(el)))
    : [...projects.value];
  
  if (sorting.value?.value === 'date_desc') {
    return [...filtered].sort((a, b) => b.endDate.getTime() - a.endDate.getTime());
  } 
  else if (sorting.value?.value  === 'date_asc') {
    return [...filtered].sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
  }
  
  return filtered;
});
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
