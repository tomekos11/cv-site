<template>
  <section ref="section">
    
    <div class="q-pt-sm q-mt-md">
      <h1 class="text-center fancy-text bg-grey-2">technologies</h1>
      <q-select v-model="selectedCategory" :options="options" label="Filtruj przez kategorię" style="width: 200px; margin-inline: auto" @update:model-value="slide = 0" />

      <div ref="carousel" class="custom-carousel">
        <div v-if="!maxCardsAmountUpdated" class="carousel-grid q-py-xl" >
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
          swipeable
          :arrows="visibleChunks.length > 1"
          infinite
        >
          <q-carousel-slide
            v-for="(chunk, chunkIndex) in visibleChunks"
            :key="chunkIndex"
            :name="chunkIndex"
          >
            <div class="carousel-grid">
              <q-card
                v-for="(tech, index) in chunk"
                :key="index"
                class="bg-white text-dark text-center card-hover carousel-card"
                style="transition: background-color 0.3s;"
              >
                <q-card-section class="d-flex flex-column full-height">
                  <div class="d-flex flex-column flex-center full-height">
                    <img
                      :src="tech.src"
                      style="width: 150px; height: auto; object-fit: cover;"
                    >
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const options = ['frontend', 'backend'] as const;

interface Technology {
  name: string;
  src: string;
  type?: typeof options[number];
}

const technologies: Technology[] = [
  { name: 'HTML', src: '/assets/icons/html5.png', type: 'frontend' },
  { name: 'CSS', src: '/assets/icons/css.png', type: 'frontend' },
  { name: 'JavaScript', src: '/assets/icons/js.png', type: 'frontend' },
  { name: 'TypeScript', src: '/assets/icons/tss.png', type: 'frontend' },
  { name: 'SEO', src: '/assets/icons/seo_no_bg.png', type: 'frontend' },
  { name: 'Vue', src: '/assets/icons/vue.png', type: 'frontend' },
  { name: 'Quasar', src: '/assets/icons/quasar.png', type: 'frontend' },
  { name: 'Nuxt', src: '/assets/icons/nuxt.png', type: 'frontend' },
  { name: 'PHP', src: '/assets/icons/php.png', type: 'backend' },
  { name: 'Laravel', src: '/assets/icons/laravel.png', type: 'backend' },
  { name: 'Bootstrap', src: 'assets/icons/bootstrap.png', type: 'frontend' },
  { name: 'Git', src: '/assets/icons/git.png' },
];

const selectedCategory = ref<typeof options[number] | null>(null);
const carousel = ref<HTMLElement | null>(null);
const slide = ref(0);
const maxCardsPerSlide = ref(5);
const maxCardsAmountUpdated = ref(false);
const placeholderCardCount = ref(5);

const visibleChunks = computed(() => {
  const chunkSize = maxCardsPerSlide.value;
  const filteredTechnologies = technologies.filter(
    (tech) => !selectedCategory.value || tech.type === selectedCategory.value || !tech.type
  );

  return filteredTechnologies.reduce<Technology[][]>((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
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
