<template>
  <div class="row q-col-gutter-md q-mt-md q-pt-lg q-pb-lg">
    <q-card
      v-for="(tech, index) in technologies"
      :key="index"
      class="col-8 col-md-4 col-lg-3 bg-indigo text-white text-center q-pa-sm"
    >
      <q-card-section>
        <q-icon :name="tech.icon" size="64px" class="q-mb-md" />
        <h6>{{ tech.name }}</h6>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
const technologies = [
  { name: 'HTML', icon: 'mdi-language-html5' },
  { name: 'CSS', icon: 'mdi-language-css3' },
  { name: 'JavaScript', icon: 'mdi-language-javascript' },
  { name: 'TypeScript', icon: 'mdi-language-typescript' }
];
</script>