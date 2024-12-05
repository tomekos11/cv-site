<template>
  <div 
    class="q-mt-md q-pt-lg q-pb-lg" 
    style="display: grid; grid-template-columns: repeat(auto-fit, 182px); gap: 10px; justify-content: center;"
  >
    <q-card
      v-for="(tech, index) in technologies"
      :key="index"
      class="bg-grey-8 text-white text-center card-hover"
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
];
</script>