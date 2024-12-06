<template>
  <div class="bg-grey-2 q-pt-sm">
    <h1 class="text-center fancy-text">technologies</h1>
    <div 
      class="q-pt-sm q-pb-md" 
      style="display: grid; grid-template-columns: repeat(auto-fit, 182px); gap: 10px; justify-content: center;"
    >
      <q-card
        v-for="(tech, index) in technologies"
        :key="index"
        class="bg-white text-dark text-center card-hover"
        style="transition: background-color 0.3s;"
      >
        <q-card-section class="d-flex flex-column full-height">
          <div class="d-flex flex-column flex-center full-height">
            <q-img 
              :src="tech.src" 
              style="width: 150px; height: auto; object-fit: cover;"
            />
          </div>
        
          <div class="q-my-sm text-bold">{{ tech.name }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import html5Icon from '/assets/icons/html5.png';
import cssIcon from '/assets/icons/css.png';
import jsIcon from '/assets/icons/js.png';
import tsIcon from '/assets/icons/ts.png';
import seo from '/assets/icons/seo.png';
import vue from '/assets/icons/vue.png';
import quasar from '/assets/icons/quasar.png';
import nuxt from '/assets/icons/nuxt.png';
import php from '/assets/icons/php.png';
import laravel from '/assets/icons/laravel.png';
import git from '/assets/icons/git.png';

const technologies = [
  { name: 'HTML', src: html5Icon },
  { name: 'CSS', src: cssIcon },
  { name: 'JavaScript', src: jsIcon  },
  { name: 'TypeScript', src: tsIcon },
  { name: 'SEO', src: seo },
  { name: 'Vue', src: vue },
  { name: 'Quasar', src: quasar },
  { name: 'Nuxt', src: nuxt },
  { name: 'PHP', src: php },
  { name: 'Laravel', src: laravel },
  { name: 'Git', src: git },
];
</script>
