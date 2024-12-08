<template>
  <div class="bg-grey-2 q-pt-sm">
    <h1 class="text-center fancy-text">projects</h1>
    <div 
      class="q-pt-sm q-pb-md" 
      style="display: grid; grid-template-columns: repeat(auto-fit, min(374px, 100%)); gap: 30px; justify-content: center;"
    >
      <template
        v-for="(project, index) in projects"
        :key="index"
      >
        <q-parallax :src="project.image" class="full-width" :height="250">
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
              <p class="limit-lines">{{ project.description }}</p>
              <router-link :to="`/projects/${project.slug}`" class="styled-link">
                Czytaj więcej ...
              </router-link>
            </q-card-section>
          </q-card>
        </q-parallax>

      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import gbFlag from 'assets/icons/gb_flag.jpg';
import treesImg from 'assets/icons/trees.jpg';
import chatImg from 'assets/icons/czat.jpg';
import testImg from 'assets/icons/test.jpg';


type Technology =  'Vue' | 'Quasar' | 'Nuxt'  | 'Laravel' | 'Java' | 'Spring' | 'Thymeleaf';

interface Project {
  name: string;
  description: string;
  year: number;
  slug: string;
  technologies: Technology[];
  image: string;
}

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
  },
  {
    name: 'Aplikacja do konwersacji z wirtualnym asystentem',
    description: 'Aplikacja umożliwiająca prowadzenie rozmów z wirtualnym asystentem, zbudowana przy użyciu frameworka Spring i Java na backendzie oraz Vue.js z Quasar Framework na frontendzie. Aplikacja integruje się z OpenAI API, umożliwiając użytkownikom wymianę wiadomości, tworzenie konwersacji oraz udostępnianie wiadomości innym użytkownikom. Dzięki zaawansowanej integracji z OpenAI, aplikacja oferuje inteligentne odpowiedzi i asystencję w czasie rzeczywistym. Użytkownicy mogą również tworzyć, zarządzać wieloma konwersacjami i dzielić się wiadomościami za pomocą linków lub wybierając odbiorców z listy użytkowników.',
    year: 2024,
    slug: 'ai-chat',
    technologies: ['Quasar', 'Java', 'Spring'],
    image: chatImg
  },
  {
    name: 'Aplikacja do tworzenia i zarządzania testami',
    description: 'Aplikacja stworzona z wykorzystaniem Spring Boot i Thymeleaf, zaprojektowana z myślą o nauczycielach, którzy mogą tworzyć, zarządzać testami oraz przypisywać je do użytkowników w wyznaczonych grupach. Aplikacja umożliwia użytkownikom rozwiązywanie testów w ramach grup, podobnie jak w środowisku uniwersyteckim. Użytkownicy mogą rozwiązywać zadania w wyznaczonym czasie, a nauczyciele mają dostęp do wyników i statystyk. Aplikacja oferuje również funkcje generowania wyników i raportów z wykonanych testów.',
    year: 2024,
    slug: 'test-management',
    technologies: ['Spring', 'Thymeleaf'],
    image: testImg
  }
];

const getTechColor = (tech: Technology) => {
  switch(tech) {
  case 'Vue': return 'green-7';
  case 'Laravel': return 'indigo-8';
  case 'Nuxt': return 'green-10';
  case 'Quasar': return 'blue-10';
  case 'Java': return 'amber-8';
  case 'Spring': return 'grey-9';
  case 'Thymeleaf': return 'primary';
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

.limit-lines {
  display: -webkit-box;         /* Wymaga -webkit do działania */
  -webkit-box-orient: vertical; /* Określa kierunek, w którym element będzie rozciągany */
  -webkit-line-clamp: 5;        /* Liczba linii, do których tekst ma zostać przycięty */
  overflow: hidden;             /* Ukrywa nadmiarowy tekst */
  text-overflow: ellipsis;      /* Dodaje wielokropek, gdy tekst zostaje przycięty */
}

:deep(.q-parallax__content) {
  justify-content: start;
}
</style>