<template>
  <q-badge 
    :color="getTechColor(technology)"
    :label="technology" 
    :class="`q-py-xs q-px-sm text-with-border ${getTechClass(technology)}`"
  />
</template>

<script setup lang="ts">
import { getTechColor, getTechClass, type Technology } from '~/helpers/technology';

interface Props {
  technology: Technology
}

defineProps<Props>();
</script>