<template>
  <q-toolbar class="q-py-sm">
    <q-toolbar-title class="d-flex full-width justify-between items-center">

      <q-toolbar class="q-px-md justify-between">
        <q-toolbar-title>
          <q-btn flat tag="a" :to="localeForURL + '/'" class="t:!text-[18px]"> CV</q-btn>
        </q-toolbar-title>
        <nav class="d-none d-md-flex gap-20 flex-center t:lg:pe-5 t:md:pe-4 t:sm:pe-2">
          <navigation />
        </nav>

        <div class="d-none d-md-flex flex-center">
          <lang-switcher />
          <dark-mode-switcher />
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
const Navigation = defineAsyncComponent(() => import('@/components/Navigation.vue'));

const drawer = defineModel<boolean>();

const { locale: currentLocale } = useI18n();

const localeForURL = computed(() => currentLocale.value === 'pl' ? '' : `/${currentLocale.value}`);

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