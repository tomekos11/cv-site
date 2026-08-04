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
                :to="projectPath(project.slug)"
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
const { locale: currentLocale } = useI18n();
const { homepageProjects, projectPath } = useProjects();

const localeForURL = computed(() => currentLocale.value === 'pl' ? '' : `/${currentLocale.value}`);

const projects = homepageProjects;

const section = useTemplateRef('section');
const { registerSection } = useActiveSection();

onMounted(() => {
  registerSection('projects', section);
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

:deep(.q-parallax__content) {
  justify-content: start;
}
</style>
