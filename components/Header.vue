<template>
  <q-toolbar class="q-py-sm">
    <q-toolbar-title class="d-flex full-width justify-between items-center">

      <q-toolbar class="q-px-md justify-between">
        <q-toolbar-title>CV</q-toolbar-title>
        <nav class="d-none d-md-flex gap-20 flex-center">
          <navigation />
          <lang-switcher />
          <q-btn flat :label="isDark ? '☀️' : '🌙'" @click="toggleDarkMode" />
        </nav>

        <!-- Przycisk hamburgera dla mniejszych ekranów -->
        <q-btn
          flat
          round
          icon="menu"
          class="d-md-none"
          @click="drawer = !drawer"
        />
      </q-toolbar>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup lang="ts">
const Navigation = defineAsyncComponent(() => import('@/components/Navigation.vue'));

const drawer = defineModel<boolean>();

const $q = useQuasar();

const isDark = computed(() => $q.dark.isActive);

const toggleDarkMode = () => {
  const newValue = !$q.dark.isActive;
  $q.dark.set(newValue);
  $q.cookies.set('nuxt-color-mode', newValue ? 'dark' : 'light', { path: '/', expires: 365 });
};

</script>

<style scoped>
@media(min-width: 1024px) {
    .d-md-flex {
        display: flex;
    }

    .d-md-none {
        display: none;
    }
}
</style>