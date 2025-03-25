<template>
  <section ref="section">
    
    <div class="q-pt-sm q-mt-md">
      <h1 class="text-center fancy-text bg-grey-2">{{ $t('nav.technologies') }}</h1>

      <div ref="select-container" class="bg-grey-2 q-mx-auto q-py-sm">
        <q-select
          v-model="selectedCategory"
          :options="options"
          outlined
          dense
          color="blue-9"
          options-selected-class="text-blue-9"
          bg-color="white"
          :label="$t('technologies.filter')"
          style="width: 200px; margin-inline: auto"
          :clearable="true"
          @update:model-value="slide = 0"
        />
      </div>

      <div ref="carousel" class="custom-carousel">
      
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
          v-model="slide"
          animated
          control-color="primary"
          arrows
          infinite
          transition-next="jump-left"
          transition-prev="jump-right"
        >
          <q-carousel-slide v-for="(tech, index) in technologies" :key="tech.name" :name="index">
            <div class="carousel-grid">
              <q-card
                v-for="(tech, index) in visibleTechnologies"
                :key="index"
                class="bg-white text-dark text-center card-hover carousel-card"
              >
                <q-card-section class="d-flex flex-column full-height">
                  <div class="d-flex flex-column flex-center full-height">
                    <img :src="tech.src" style="width: 150px; height: auto; object-fit: cover;">
                  </div>
                  <div class="q-my-sm text-bold">{{ tech.name }}</div>
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
import type { QCarousel } from 'quasar';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const options = ['frontend', 'backend'] as const;

interface Technology {
  name: string;
  src: string;
  type?: typeof options[number];
}

const technologies: Technology[] = [
  { name: 'HTML', src: '/assets/icons/technologies/html5.png', type: 'frontend' },
  { name: 'CSS', src: '/assets/icons/technologies/css.png', type: 'frontend' },
  { name: 'JavaScript', src: '/assets/icons/technologies/js.png', type: 'frontend' },
  { name: 'TypeScript', src: '/assets/icons/technologies/tss.png', type: 'frontend' },
  { name: 'SEO', src: '/assets/icons/technologies/seo_no_bg.png', type: 'frontend' },
  { name: 'Vue', src: '/assets/icons/technologies/vue.png', type: 'frontend' },
  { name: 'Quasar', src: '/assets/icons/technologies/quasar.png', type: 'frontend' },
  { name: 'Nuxt', src: '/assets/icons/technologies/nuxt.png', type: 'frontend' },
  { name: 'PHP', src: '/assets/icons/technologies/php.png', type: 'backend' },
  { name: 'Laravel', src: '/assets/icons/technologies/laravel.png', type: 'backend' },
  { name: 'Node', src: '/assets/icons/technologies/node.png', type: 'backend' },
  { name: 'Bootstrap', src: 'assets/icons/technologies/bootstrap.png', type: 'frontend' },
  { name: 'Git', src: '/assets/icons/technologies/git.png' },
];

const carousel = useTemplateRef<InstanceType<typeof QCarousel> | null>('carousel');

const selectedCategory = ref<typeof options[number] | null>(null);
const slide = ref(0);
const maxCardsPerSlide = ref(5);
const maxCardsAmountUpdated = ref(false);
const placeholderCardCount = ref(5);

const visibleTechnologies = computed(() => {
  const start = slide.value;
  const end = start + maxCardsPerSlide.value;
  let items = technologies.slice(start, end);

  // Jeśli długość jest mniejsza niż maxCardsPerSlide, dodajemy brakujące elementy z początku listy
  if (items.length < maxCardsPerSlide.value) {
    items = [...items, ...technologies.slice(0, maxCardsPerSlide.value - items.length)];
  }

  return items;
});

const updateMaxCardsPerSlide = () => {
  if (typeof window === 'undefined' || !carousel.value) return; // Sprawdzanie środowiska klienta
  slide.value = 0;
  const containerWidth = carousel.value.offsetWidth;
  const cardWidth = 220; // szerokość karty + gap
  maxCardsPerSlide.value = Math.max(1, Math.floor(containerWidth / cardWidth));
  placeholderCardCount.value = maxCardsPerSlide.value; // Ustawienie liczby placeholderów
  if (!maxCardsAmountUpdated.value) {
    maxCardsAmountUpdated.value = true;
  }
};

const section = useTemplateRef('section');

onMounted(() => {
  updateMaxCardsPerSlide();
  window.addEventListener('resize', updateMaxCardsPerSlide);

  const { registerSection } = useActiveSection();
  registerSection('technologies', section);
});


onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMaxCardsPerSlide);
});
</script>


<style>
.custom-carousel {
  width: 100%;
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
