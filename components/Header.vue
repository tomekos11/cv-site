<template>
  <q-toolbar class="q-py-sm">
    <q-toolbar-title class="d-flex full-width justify-between items-center">
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar class="q-px-md q-py-sm justify-between">
        <q-toolbar-title>My App</q-toolbar-title>
        <div class="d-none d-md-flex gap-20 flex-center">
          <q-btn flat @click="navigateTo('experience')">Experience</q-btn>
          <q-btn flat @click="navigateTo('technologies')">Technologies</q-btn>
          <q-btn flat @click="navigateTo('projects')">Projects</q-btn>
        </div>
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
const drawer = defineModel<boolean>();
</script>

<style scoped>
@media(min-width: 768px) {
    .d-md-flex {
        display: flex;
    }
}
</style>