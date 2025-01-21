<template>
  <q-badge 
    :color="getTechColor(technology)" 
    :label="technology" 
    class="q-py-xs q-px-sm text-with-border"
  />
</template>

<script setup lang="ts">
import { getTechColor, type Technology } from '~/helpers/technology';

interface Props {
  technology: Technology
}

defineProps<Props>();
</script>

<!-- <style scoped>
.text-with-border {
  color: white; /* Tekst biały */
  text-shadow: 
    -1px -1px 0 #000, /* Czarny cień dookoła */
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style> -->