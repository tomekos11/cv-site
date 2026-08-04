<template>
  <nav aria-label="Breadcrumb" class="project-breadcrumb">
    <ol class="project-breadcrumb__list">
      <li>
        <NuxtLink :to="localePath('/')" class="breadcrumb-link">
          {{ $t('projectDetail.breadcrumb.home') }}
        </NuxtLink>
      </li>
      <li aria-hidden="true" class="t:px-1">/</li>
      <li v-if="includeProjectsLink">
        <NuxtLink :to="localePath('/projects-list')" class="breadcrumb-link">
          {{ $t('nav.projects') }}
        </NuxtLink>
      </li>
      <li v-if="includeProjectsLink" aria-hidden="true" class="t:px-1">/</li>
      <li aria-current="page" class="t:text-slate-800 t:dark:text-slate-200">
        {{ currentName }}
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  currentName: string;
  includeProjectsLink?: boolean;
}>(), {
  includeProjectsLink: true,
});

const localePath = useLocalePath();
</script>

<style scoped>
.project-breadcrumb {
  padding: 1.5rem 0.75rem 1.75rem;
  margin-bottom: 0.5rem;
}

.project-breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #475569;
}

.body--dark .project-breadcrumb__list {
  color: #94a3b8;
}

.breadcrumb-link {
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #0d9488;
}

:global(.body--dark) .breadcrumb-link:hover {
  color: #2dd4bf;
}
</style>
