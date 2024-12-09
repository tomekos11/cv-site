<template>
  <div class="bg-grey-2 q-pt-sm">
    <h1 class="text-center fancy-text">projects</h1>
    <div 
      class="q-pt-sm q-pb-md" 
      style="display: grid; grid-template-columns: repeat(auto-fit, min(374px, 100%)); gap: 10px; justify-content: center;"
    >
      <template
        v-for="(project, index) in projects"
        :key="index"
      >
        <q-parallax :src="project.image" class="full-width" style="height: 300px">
          <q-card
            class="bg-white text-dark text-center project-hover"
            style="transition: 1s; position: relative; color: white; overflow: hidden;"
          >
            <q-card-section 
              class="d-flex flex-column full-height fit"
              style="z-index: 1; position: relative;"
            >
              <div class="q-my-sm text-bold">{{ project.name }}</div>
              <div class="d-flex justify-center q-mb-sm" style="gap:5px">
                <template v-for="tech in project.technologies" :key="tech">
                  <q-badge 
                    :color="getTechColor(tech)" 
                    :label="tech" 
                    class="q-py-xs q-px-sm text-with-border"
                  />
                </template>
              </div>
              <p>{{ project.description }}</p>
              <router-link :to="`/projects/${project.slug}`" class="styled-link">
                Czytaj więcej ...
              </router-link>
            </q-card-section>
          </q-card>
        </q-parallax>

      </template>
      <!-- <q-card
        v-for="(project, index) in projects"
        :key="index"
        class="bg-white text-dark text-center project-hover"
        style="transition: 1s; position: relative; color: white; overflow: hidden;"
      >
          <q-card-section 
            class="d-flex flex-column full-height fit"
            style="z-index: 1; position: relative;"
          >
            <div class="q-my-sm text-bold">{{ project.name }}</div>
            <div class="d-flex justify-center q-mb-sm" style="gap:5px">
              <template v-for="tech in project.technologies" :key="tech">
                <q-badge 
                  :color="getTechColor(tech)" 
                  :label="tech" 
                  class="q-py-xs q-px-sm text-with-border"
                />
              </template>
            </div>
            <p>{{ project.description }}</p>
            <router-link :to="`/projects/${project.slug}`" class="styled-link">
              Czytaj więcej ...
            </router-link>
          </q-card-section>
        </q-parallax>
      </q-card> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import gbFlag from 'assets/icons/gb_flag.jpg';
import treesImg from 'assets/icons/trees.jpg';

type Technology =  'Vue' | 'Quasar' | 'Nuxt'  | 'Laravel'

interface Project {
  name: string;
  description: string;
  year: number;
  slug: string;
  technologies: Technology[];
  image: string;
}

const drawer = ref(true);

const projects: Project[] = [
  { 
    name: 'Aplikacja do nauki języka angielskiego',
    description: 'Aplikacja do nauki języka angielskiego stworzona w technologii Vue.js (frontend) i Laravel (backend). Umożliwia interaktywne lekcje, quizy, zarządzanie postępami oraz personalizację materiałów, zapewniając dynamiczny i nowoczesny sposób nauki.',
    year: 2023,
    slug: 'ela',
    technologies: ['Vue', 'Laravel'],
    image: gbFlag
  },
  {
    name: 'Aplikacja do wizualizacji drzew decyzyjnych',
    description: 'Aplikacja do wizualizacji klasyfikatora drzew decyzyjnych umożliwia interaktywne przedstawienie struktury drzewa, w tym węzłów decyzyjnych, gałęzi oraz wyników klasyfikacji. Użytkownik może eksplorować działanie modelu, analizując kryteria podziałów, ważność cech oraz klasyfikacje dla danych wejściowych w intuicyjny i graficzny sposób.',
    year: 2024,
    slug: 'dt',
    technologies: ['Quasar', 'Laravel'],
    image: treesImg
  }
];

const getTechColor = (tech: Technology) => {
  switch(tech) {
  case 'Vue': return 'green-7';
  case 'Laravel': return 'indigo-8';
  case 'Nuxt': return 'green-10';
  case 'Quasar': return 'blue-10';
  }
};
</script>

<style scoped>
.project-hover:hover {
  box-shadow: 0 0 20px 1px inset pink;
}

.styled-link {
  position: relative;
  text-decoration: none;
  color: palevioletred; /* Indigo-10 */
  font-weight: 500;
  transition: color 0.3s ease;
  display: inline-block; /* Zapewnia dokładne dopasowanie pseudo-elementu */
}

.styled-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px; /* Lekko poniżej tekstu */
  width: 0;
  height: 2px;
  background-color: pink; /* Indigo-10 */
  transition: width 0.3s ease;
}

.styled-link:hover {
  color: palevioletred; /* Slightly darker indigo */
}

.styled-link:hover::after {
  width: 100%; /* Teraz zajmuje szerokość tekstu */
}

.background-image:hover {
  transform: scale(1.1);
  transition: transform 0.5s ease;
}

.text-with-border {
  color: white; /* Tekst biały */
  text-shadow: 
    -1px -1px 0 #000, /* Czarny cień dookoła */
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>