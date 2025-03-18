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