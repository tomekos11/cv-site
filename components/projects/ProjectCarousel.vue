<template>
  <section class="project-carousel">
    <h2 class="content-page-heading content-page-heading--center project-carousel__title">
      {{ $t('projectDetail.otherProjects') }}
    </h2>

    <div class="project-carousel__wrapper">
      <q-btn
        flat
        round
        icon="chevron_left"
        class="project-carousel__arrow"
        :aria-label="$t('projectDetail.carousel.prev')"
        @click="prev"
      />

      <div class="project-carousel__viewport">
        <div
          class="project-carousel__track"
          :style="{ transform: `translateX(-${slide * 100}%)` }"
        >
          <div
            v-for="(chunk, index) in projectChunks"
            :key="index"
            class="project-carousel__slide"
          >
            <div class="project-carousel__grid">
              <NuxtLink
                v-for="project in chunk"
                :key="project.slug"
                :to="projectPath(project.slug)"
                class="project-carousel__card"
              >
                <nuxt-img
                  :src="project.image"
                  :alt="project.name"
                  width="480"
                  format="webp"
                  class="project-carousel__image"
                />

                <div class="project-carousel__body">
                  <h3 class="project-carousel__name">{{ project.name }}</h3>
                  <p class="project-carousel__description">{{ project.description }}</p>

                  <div class="project-carousel__tags">
                    <technologies-badge
                      v-for="tech in project.technologies.slice(0, 3)"
                      :key="tech"
                      :technology="tech"
                    />
                  </div>

                  <span class="project-carousel__cta">{{ $t('projects.readMore') }}...</span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <q-btn
        flat
        round
        icon="chevron_right"
        class="project-carousel__arrow"
        :aria-label="$t('projectDetail.carousel.next')"
        @click="next"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '~/composables/useProjects';

const props = defineProps<{
  projects: Project[];
  excludeSlug: string;
}>();

const { projectPath } = useProjects();
const slide = ref(0);

const { width } = useWindowSize();

const cardsPerSlide = computed(() => (width.value < 720 ? 1 : 2));

const visibleProjects = computed(() =>
  props.projects.filter((project) => project.slug !== props.excludeSlug),
);

const projectChunks = computed(() => {
  const chunks: Project[][] = [];
  const perSlide = cardsPerSlide.value;

  for (let index = 0; index < visibleProjects.value.length; index += perSlide) {
    chunks.push(visibleProjects.value.slice(index, index + perSlide));
  }

  return chunks.length ? chunks : [[]];
});

const slideCount = computed(() => projectChunks.value.length);

function prev() {
  slide.value = slide.value <= 0 ? slideCount.value - 1 : slide.value - 1;
}

function next() {
  slide.value = slide.value >= slideCount.value - 1 ? 0 : slide.value + 1;
}

watch(projectChunks, () => {
  slide.value = 0;
});
</script>

<style scoped>
.project-carousel {
  padding-inline: 0.75rem;
}

.project-carousel__title {
  margin-bottom: 1.5rem;
}

.project-carousel__wrapper {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.5rem;
  max-width: 980px;
  margin-inline: auto;
}

.project-carousel__viewport {
  overflow: hidden;
}

.project-carousel__track {
  display: flex;
  transition: transform 0.35s ease;
}

.project-carousel__slide {
  flex: 0 0 100%;
  min-width: 0;
}

.project-carousel__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  align-items: stretch;
}

@media (max-width: 719px) {
  .project-carousel__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

.project-carousel__card {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.project-carousel__card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.1);
}

.body--dark .project-carousel__card {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(148, 163, 184, 0.15);
}

.project-carousel__image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.project-carousel__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.65rem;
  padding: 1.1rem 1.15rem 1.2rem;
  text-align: left;
}

.project-carousel__name {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.35;
  color: #0f172a;
}

.body--dark .project-carousel__name {
  color: #e2e8f0;
}

.project-carousel__description {
  margin: 0;
  flex: 1;
  font-size: 0.92rem;
  line-height: 1.65;
  color: #64748b;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.body--dark .project-carousel__description {
  color: #94a3b8;
}

.project-carousel__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.project-carousel__cta {
  margin-top: 0.15rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0d9488;
}

.body--dark .project-carousel__cta {
  color: #2dd4bf;
}

.project-carousel__arrow {
  width: 42px;
  height: 42px;
  color: #0d9488;
}

.body--dark .project-carousel__arrow {
  color: #2dd4bf;
}
</style>
