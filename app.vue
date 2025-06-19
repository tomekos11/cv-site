<template>
  <div>
    <main-layout />
  </div>
</template>

<script setup lang="ts">
const $q = useQuasar();

$q.dark.set($q.cookies.get('nuxt-color-mode') === 'dark');
</script>