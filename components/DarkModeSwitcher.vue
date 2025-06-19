<template>
  <q-btn
    flat
    :icon="isDark ? 'light_mode' : 'dark_mode'"
    :color="isDark ? 'orange-7' : 'blue-12'"
    @click="toggleDarkMode"
  />
</template>

<script setup lang="ts">
const $q = useQuasar();

const isDark = computed(() => $q.dark.isActive);

const toggleDarkMode = () => {
  const newValue = !$q.dark.isActive;
  $q.dark.set(newValue);
  $q.cookies.set('nuxt-color-mode', newValue ? 'dark' : 'light', { path: '/', expires: 365 });
};

</script>