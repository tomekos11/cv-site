<template>
  <div class="tech-mini-badges">
    <span
      v-for="item in items"
      :key="item.name"
      class="tech-mini-badge t:dark:!bg-slate-800 t:dark:!border-slate-600"
    >
      <img
        v-if="item.src"
        :src="item.src"
        :alt="`logo ${item.name}`"
        class="tech-mini-badge__icon"
        width="18"
        height="18"
      >
      <span class="tech-mini-badge__label">{{ item.name }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { TechnologyCatalogItem } from '~/helpers/technologyCatalog';

interface Props {
  items: TechnologyCatalogItem[];
}

defineProps<Props>();
</script>

<style scoped>
.tech-mini-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-mini-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.55rem 0.28rem 0.4rem;
  border-radius: 999px;
  background: #f1f5f9;
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.body--dark .tech-mini-badge {
  background: #1e293b;
  border-color: rgba(148, 163, 184, 0.22);
}

.tech-mini-badge__icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  flex-shrink: 0;
}

.tech-mini-badge__label {
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1;
  color: #334155;
  white-space: nowrap;
}

.body--dark .tech-mini-badge__label {
  color: #cbd5e1;
}
</style>
