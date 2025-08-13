<template>
  <q-scroll-area
    ref="scrollArea"
    style="height: 100svh;"
    :thumb-style="{width: '6px', background: '#2c3e50' }"
    :vertical-offset="[68,52]"
    @scroll="handleScroll"
  >
    <q-layout view="hHh lpR fff">
  
      <q-header elevated class="bg-black text-white" :height-hint="66">
        <Header v-model="drawer" class="bg-black" />
      </q-header>

      <q-page-container>
        <nuxt-page />
      </q-page-container>
  
      <!-- style="background-color: #2c3e50;" -->
      <q-footer elevated class="text-white t:!bg-slate-900" :height-hint="50"> 
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

        <q-list class="sticky d-flex flex-column" style="height: 90%;">
          <div>
            <navigation :is-block="true" />
            <div class="t:flex t:justify-center t:gap-1">
              <lang-switcher />
              <dark-mode-switcher />
            </div>
          </div>
          <div class="q-mt-auto" style="background: #ffffff1a; padding-bottom: env(safe-area-inset-bottom)">
            <div class="d-flex justify-center gap-5 q-my-xs">
              <a href="https://www.linkedin.com/in/tomasz-slapinski/" target="_blank">
                <Icon name="uil:linkedin" style="color: white" size="36px" class="d-flex"/>
              </a>

              <a href="https://github.com/tomekos11" target="_blank">
                <Icon name="uil:github" style="color: white;" size="36px" class="d-flex"/>
              </a>
            </div>
          </div>
        </q-list>

      </q-drawer>
    </q-layout>
  </q-scroll-area>
</template>

<script setup lang="ts">
import type { QScrollArea } from 'quasar';

const Navigation = defineAsyncComponent(() => import('@/components/Navigation.vue'));

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

const route = useRoute();

watch(() => route.name, () => {
  if(scrollArea.value) {
    scrollArea.value.setScrollPosition('vertical', 0, 0);
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