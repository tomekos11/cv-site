<template>
  <div class="q-pt-sm q-mt-md">
    <h1 class="text-center fancy-text bg-grey-2">technologies</h1>
    <q-select v-model="selectedCategory" :options="options" label="Filtruj przez kategorię" style="width: 200px; margin-inline: auto" @update:model-value="slide = 0"/>

    <div ref="carousel" class="custom-carousel">
      <q-carousel
        v-if="maxCardsAmountUpdated"
        v-model="slide"
        animated
        control-color="primary"
        swipeable
        arrows
        infinite
      >
        <q-carousel-slide
          v-for="(chunk, chunkIndex) in visibleChunks"
          :key="JSON.stringify(chunk)"
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
                  <q-img
                    :src="tech.src"
                    style="width: 150px; height: auto; object-fit: cover;"
                    no-spinner
                  />
                </div>
                <div class="q-my-sm text-bold">{{ tech.name }}</div>
              </q-card-section>
            </q-card>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import html5Icon from '/assets/icons/html5.png';
import cssIcon from '/assets/icons/css.png';
import jsIcon from '/assets/icons/js.png';
import tsIcon from '/assets/icons/tss.png';
import seo from '/assets/icons/seo_no_bg.png';
import vue from '/assets/icons/vue.png';
import quasar from '/assets/icons/quasar.png';
import nuxt from '/assets/icons/nuxt.png';
import php from '/assets/icons/php.png';
import laravel from '/assets/icons/laravel.png';
import git from '/assets/icons/git.png';
import bootstrap from 'assets/icons/bootstrap.png';

const options = [
  'frontend',
  'backend',
  'all'
] as const;

interface Technology {
  name: string;
  src: string;
  type: typeof options[number]
}

const technologies: Technology[] = [
  { name: 'HTML', src: html5Icon, type: 'frontend' },
  { name: 'CSS', src: cssIcon, type: 'frontend' },
  { name: 'JavaScript', src: jsIcon, type: 'frontend'  },
  { name: 'TypeScript', src: tsIcon, type: 'frontend' },
  { name: 'SEO', src: seo, type: 'frontend' },
  { name: 'Vue', src: vue, type: 'frontend' },
  { name: 'Quasar', src: quasar, type: 'frontend' },
  { name: 'Nuxt', src: nuxt, type: 'frontend' },
  { name: 'PHP', src: php, type: 'backend' },
  { name: 'Laravel', src: laravel, type: 'backend' },
  { name: 'Bootstrap', src: bootstrap, type: 'frontend' },
  { name: 'Git', src: git, type: 'all' },
];

const selectedCategory = ref<typeof options[number]>('all');

const carousel = ref<HTMLElement | null>(null);

const slide = ref(0);
const maxCardsPerSlide = ref(5);
const maxCardsAmountUpdated = ref(false);

const visibleChunks = computed(() => {
  const chunkSize = maxCardsPerSlide.value;

  // Filtrowanie technologii według wybranego typu
  const filteredTechnologies = technologies.filter(
    tech => selectedCategory.value === 'all' || tech.type === selectedCategory.value || tech.type === 'all'
  );

  // Redukcja z podziałem na segmenty
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
  if(!carousel.value) return;
  // Dynamically update the number of cards based on the width of the container
  slide.value = 0;
  const containerWidth = carousel.value?.offsetWidth;
  const cardWidth = 220; // szerokość karty + gap
  maxCardsPerSlide.value = Math.max(1, Math.floor(containerWidth / cardWidth));
  if(!maxCardsAmountUpdated.value) {
    maxCardsAmountUpdated.value = true;
  }
  
};

onMounted(() => {
  updateMaxCardsPerSlide();
  window.addEventListener('resize', updateMaxCardsPerSlide);
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
</style>