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
const colorMode = useColorMode();

const toggleDarkMode = () => {
  const newValue = !$q.dark.isActive;
  $q.dark.set(newValue);

  // zmienia ciastko
  colorMode.preference = newValue ? 'dark' : 'light';
};

</script>