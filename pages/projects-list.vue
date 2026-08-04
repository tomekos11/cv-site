<template>
  <q-page class="t:bg-white t:dark:bg-gradient-to-br t:dark:from-black t:dark:to-slate-800 t:mx-auto t:max-w-[2000px] t:pb-[50px]">
    <section class="landing-page q-pt-sm t:xl:p-5 t:lg:p-4 t:md:p-3 t:p-2">
      <projects-project-breadcrumb :current-name="$t('nav.projects')" :include-projects-link="false" />

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
            <nuxt-img :src="project.image" width="500" format="avif" class="t:object-cover t:w-full t:lg:h-[150px] t:h-[120px]" :alt="`${project.name}`"/>
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
                        <q-icon name="calendar_month" /> {{ formatProjectDate(project.startDate) }} - {{ formatProjectDate(project.endDate) }}
                      </div>
                    </div>

                    <div class="d-flex justify-center q-mb-sm t:gap-2 t:flex-wrap">
                      <template v-for="tech in project.technologies" :key="tech">
                        <technologies-badge :technology="tech" />
                      </template>
                    </div>
                  </div>

                  <q-btn v-if="project.githubLinks" flat round rounded class="t:self-start t:!p-0">
                    <q-menu class="t:!max-w-[260px]">
                      <div class="t:p-3 t:text-xs t:text-center t:tracking-wide t:dark:text-slate-400 t:text-slate-700">
                        <strong>{{ project.name }}</strong><br> {{ $t('projectsList.choose') }} 
                      </div>

                      <q-separator />

                      <q-list separator>

                      <q-item
                        v-for="(link, name) in project.githubLinks"
                        :key="link"
                        dense clickable
                      >
                        <q-item-section>
                          <a :href="link" target="_blank">
                            <q-badge :label="name" /> {{ link }}
                          </a>
                        </q-item-section>
                      </q-item>
                      </q-list>
                    </q-menu>
                    <Icon name="uil:github" size="24px" class="t:flex t:dark:text-slate-300"/>
                  </q-btn>
                </div>

                <p class="limit-lines t:dark:text-slate-400 t:text-sm">{{ project.description }}</p>

              </div>
              <div class="project-actions t:flex t:flex-wrap t:justify-center t:gap-2 t:mt-auto t:pt-2">
                <q-btn
                  flat
                  no-caps
                  class="project-action project-action--read t:grow"
                  :to="projectPath(project.slug)"
                  :aria-label="$t('projects.readMore') + ' ' + $t('aria.about') + ' ' + project.name"
                >
                  {{ $t('projects.readMore') }}...
                </q-btn>

                <q-btn
                  v-if="project.demoLink"
                  flat
                  no-caps
                  class="project-action project-action--demo t:grow"
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

    </section>
  </q-page>
</template>

<script setup lang="ts">
import { technologies } from '~/helpers/technology';

const { t } = useI18n();
const { projects, projectPath, formatProjectDate } = useProjects();

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
  line-clamp: 5;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
