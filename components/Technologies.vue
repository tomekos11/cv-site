<template>
  <section id="technologies" ref="section">
    
    <div class="q-pt-sm q-mt-md">
      <section-title :title="$t('nav.technologies')" />

      <div ref="select-container" class="q-mx-auto q-py-sm">
        <q-select
          id="technologies-category-filter"
          v-model="selectedCategory"
          :options="options"
          outlined
          dense
          color="blue-9"
          options-selected-class="text-blue-9"
          :label="$t('technologies.filter')"
          style="width: 200px; margin-inline: auto"
          :clearable="true"
          @update:model-value="slide = 0"
        />
      </div>

      <div ref="carouselContainer" class="custom-carousel">
      
        <div v-if="!maxCardsAmountUpdated" class="carousel-grid q-pb-xl" >
          <div
            v-for="index in placeholderCardCount"
            :key="index"
            class="bg-grey-4 text-dark text-center card-hover carousel-card placeholder-card"
          >
            <q-card-section class="d-flex flex-column full-height">
              <div class="d-flex flex-column flex-center full-height">
                <div class="placeholder-image"/>
              </div>
              <div class="q-my-sm text-bold placeholder-text"/>
            </q-card-section>
          </div>
        </div>

        <q-carousel
          v-else
          v-model="slide"
          animated
          control-color="primary"
          arrows
          infinite
          class="t:!bg-transparent"
          transition-next="jump-left"
          transition-prev="jump-right"
        >
          <q-carousel-slide v-for="(tech, index) in filteredTechnologies" :key="tech.name" :name="index">
            <div class="carousel-grid">
              <q-card
                v-for="vt in visibleTechnologies"
                :key="vt.name"
                class="bg-white text-dark text-center card-hover carousel-card t:dark:!bg-slate-900 t:dark:!shadow-2xl"
              >
                <q-card-section class="d-flex flex-column full-height">
                  <div class="d-flex flex-column flex-center full-height">
                    <template v-if="vt.src">
                      <!-- <nuxt-img :src="tech.src" :alt="`logo ${tech.name}`" width="150" densities="x1 x2" style="object-fit: cover;" /> -->
                      <img :src="vt.src" :alt="`logo ${vt.name}`" width="150px" style="object-fit: cover;" >
                    </template>
                    <template v-else>
                      <div class="t:text-[32px] t:dark:!text-slate-300 t:w-[150px]">
                        {{ vt.name }}
                      </div>
                    </template>
                  </div>
                  <h4 class="q-my-sm text-bold t:!text-[16px] t:dark:!text-slate-300">{{ vt.name }}</h4>
                </q-card-section>
              </q-card>
            </div>
          </q-carousel-slide>
  
        </q-carousel>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';

import { technologyCatalog, type TechnologyCatalogItem } from '~/helpers/technologyCatalog';

const options = ['frontend', 'backend'] as const;

const technologies: TechnologyCatalogItem[] = technologyCatalog;

const carouselContainer = useTemplateRef<HTMLElement | null>('carouselContainer');

const selectedCategory = ref<typeof options[number] | null>(null);
const slide = ref(0);
const maxCardsPerSlide = ref(5);
const maxCardsAmountUpdated = ref(false);
const placeholderCardCount = ref(5);

const filteredTechnologies = computed(() => technologies.filter(el => !selectedCategory.value || el.type === selectedCategory.value || el.type === 'all'));

const visibleTechnologies = computed(() => {
  const start = slide.value;
  const end = start + maxCardsPerSlide.value;

  let items = filteredTechnologies.value.slice(start, end);

  // Jeśli długość jest mniejsza niż maxCardsPerSlide, dodajemy brakujące elementy z początku listy
  if (items.length < maxCardsPerSlide.value) {
    items = [...items, ...filteredTechnologies.value.slice(0, maxCardsPerSlide.value - items.length)];
  }

  return items;
});

const updateMaxCardsPerSlide = () => {
  if (typeof window === 'undefined') return;

  const container = carouselContainer.value;
  if (!container) return;

  slide.value = 0;
  const containerWidth = container.offsetWidth || container.clientWidth;
  const cardWidth = 220; // szerokość karty + gap
  maxCardsPerSlide.value = Math.max(1, Math.floor(containerWidth / cardWidth));
  placeholderCardCount.value = maxCardsPerSlide.value;
  maxCardsAmountUpdated.value = true;
};

let resizeObserver: ResizeObserver | null = null;

const section = useTemplateRef('section');
const { registerSection } = useActiveSection();

onMounted(async () => {
  await nextTick();
  updateMaxCardsPerSlide();

  if (!maxCardsAmountUpdated.value) {
    await nextTick();
    updateMaxCardsPerSlide();
  }

  if (carouselContainer.value) {
    resizeObserver = new ResizeObserver(() => {
      updateMaxCardsPerSlide();
    });
    resizeObserver.observe(carouselContainer.value);
  }

  window.addEventListener('resize', updateMaxCardsPerSlide);

  registerSection('technologies', section);
});


onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMaxCardsPerSlide);
  resizeObserver?.disconnect();
});
</script>


<style>
.custom-carousel {
  width: 90%;
  max-width: 1200px;
  margin: auto;
}

.carousel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 182px);
  gap: 10px;
  justify-content: center;
  height: 100%;
  align-items: center;
}

.carousel-card {
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.placeholder-card {
  background-color: #e0e0e0;
  border-radius: 8px;
  animation: pulse 1.5s infinite ease-in-out;
}

.placeholder-image {
  width: 150px;
  height: 150px;
  background-color: #cfcfcf;
  border-radius: 4px;
}

.placeholder-text {
  width: 80%;
  height: 16px;
  background-color: #cfcfcf;
  border-radius: 4px;
  margin: 8px auto;
}

@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
</style>
