<template>
  <q-toolbar class="q-py-sm">
    <q-toolbar-title class="d-flex full-width justify-between items-center">

      <q-toolbar class="q-px-md justify-between">
        <q-toolbar-title>CV</q-toolbar-title>
        <div v-if="$q.screen.gt.sm" class="d-none d-md-flex gap-20 flex-center">
          <async-navigation />
          <lang-switcher />
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
const AsyncNavigation = defineAsyncComponent(() => import('@/components/Navigation.vue'));

const drawer = defineModel<boolean>();

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