<template>
  <q-layout view="hHh lpR fff">
    <q-scroll-area
      ref="scrollArea"
      style="height: 100vh;"
      :thumb-style="{width: '6px', background: '#2c3e50' }"
      :vertical-offset="[68,52]"
      @scroll="handleScroll"
    >
      <q-header elevated class="bg-black text-white">
        <Header v-model="drawer" />
      </q-header>

      <q-page-container>
        <nuxt-page />
      </q-page-container>
  
      <q-footer elevated class="text-white" style="background-color: #2c3e50;">
        <q-toolbar class="q-py-sm">
          <q-toolbar-title>
            <div class="row justify-between">
              <span>
                created by Tomasz Słapiński
              </span>
              <span>
                all rights reserved
              </span>
            </div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-drawer v-if="shouldDownloadDrawer" v-model="drawer" side="left" class="bg-black text-white drawer">
        <div class="bg-white" style="height: 5px;" />

        <q-list class="sticky">
          <async-navigation :is-block="true" />
          <lang-switcher :is-block="true" />
        </q-list>
      </q-drawer>
    </q-scroll-area>
  </q-layout>
  
</template>

<script setup lang="ts">
import type { QScrollArea } from 'quasar';

const AsyncNavigation = defineAsyncComponent(() => import('@/components/Navigation.vue'));

const drawer = ref(false);
const shouldDownloadDrawer = ref(false);

const scrollArea = useTemplateRef<InstanceType<typeof QScrollArea>>('scrollArea');

const { updateVisibleSections } = useActiveSection();

const handleScroll = () => {
  updateVisibleSections(scrollArea.value);
};

onMounted(() => {
  updateVisibleSections(scrollArea.value);
});

watch(drawer, (newValue) => {
  if (newValue) {
    shouldDownloadDrawer.value = true;
  }
});

</script>

<style scoped>

.drawer {
  overflow: unset;
}

.sticky {
  top:80px;
  position: sticky;
}
</style>