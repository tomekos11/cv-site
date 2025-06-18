<template>
  <div>
    <main-layout />
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const $q = useQuasar();

console.log('to?:', colorMode.value);

$q.dark.set(colorMode.value === 'dark');
</script>