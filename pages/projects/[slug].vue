<template>
  <q-page class="project-detail-page t:bg-white t:dark:bg-gradient-to-br t:dark:from-black t:dark:to-slate-800 t:mx-auto t:max-w-[2000px] t:pb-[50px]">
    <section class="landing-page q-pt-sm t:xl:p-5 t:lg:p-4 t:md:p-3 t:p-2">
      <projects-project-breadcrumb :current-name="project.name" />

      <header class="content-page-hero">
        <nuxt-img
          :src="project.image"
          :alt="project.name"
          width="500"
          format="webp"
          class="content-page-hero__image"
        />

        <h1 class="content-page-hero__title">{{ project.name }}</h1>

        <div class="content-page-hero__meta">
          <span class="content-page-hero__meta-item">
            <q-icon name="account_circle" size="18px" />
            {{ project.peopleCount }}
          </span>
          <span class="content-page-hero__meta-item">
            <q-icon name="calendar_month" size="18px" />
            {{ formatProjectDate(project.startDate) }} - {{ formatProjectDate(project.endDate) }}
          </span>
        </div>
      </header>

      <article class="content-page-body">
        <section class="content-page-section">
          <h2 class="content-page-heading">{{ $t('projectDetail.about') }}</h2>
          <p class="content-page-text">{{ project.description }}</p>
        </section>

        <section class="content-page-section">
          <h2 class="content-page-heading">{{ $t('projectDetail.technologies') }}</h2>
          <technologies-mini-grid :items="projectTechnologies" />
        </section>

        <section v-if="hasProjectLinks" class="content-page-section">
          <div class="content-page-card">
            <h2 class="content-page-heading">{{ $t('projectDetail.links') }}</h2>
            <div class="project-actions t:flex t:flex-wrap t:gap-3">
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

              <q-btn
                v-for="(link, name) in project.githubLinks"
                :key="link"
                flat
                no-caps
                class="project-action project-action--read"
                tag="a"
                :href="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="uil:github" size="18px" class="t:mr-1" />
                {{ name }}
              </q-btn>
            </div>
          </div>
        </section>

        <section v-if="project.videoUrl" class="content-page-section">
          <div class="content-page-card content-page-card--video">
            <q-video :ratio="16 / 9" :src="project.videoUrl" />
          </div>
        </section>
      </article>

      <projects-project-carousel
        class="t:mt-12"
        :projects="otherProjects"
        :exclude-slug="project.slug"
      />
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { getProjectDefinitionBySlug } from '~/helpers/projects';
import { getTechnologiesByNames } from '~/helpers/technologyCatalog';

const route = useRoute();
const slug = route.params.slug as string;

if (!getProjectDefinitionBySlug(slug)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
  });
}

const { getProjectBySlug, getOtherProjects, formatProjectDate } = useProjects();
const project = computed(() => getProjectBySlug(slug)!);
const otherProjects = computed(() => getOtherProjects(slug));

const projectTechnologies = computed(() =>
  getTechnologiesByNames(project.value.technologies),
);

const hasProjectLinks = computed(() =>
  Boolean(project.value.demoLink)
  || (project.value.githubLinks && Object.keys(project.value.githubLinks).length > 0),
);

const { t } = useI18n();

const pagePath = `/projects/${slug}`;
const seoTitle = `${project.value.name} | ${t('seo.projectsList.title')}`;
const seoDescription = project.value.description;

useSeo(pagePath, seoTitle, seoDescription, seoTitle, seoDescription);

const { person } = usePerson();

useJsonld(() => ([
  {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.value!.name,
    description: project.value!.description,
    image: `https://cv.tomasz-slapinski.pl${project.value!.image}`,
    creator: person.value,
  },
]));
</script>
