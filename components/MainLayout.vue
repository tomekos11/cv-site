<template>
  <q-layout view="hHh lpR fff">
    <q-scroll-area
      ref="scrollArea"
      style="height: 100vh;"
      :thumb-style="{width: '6px', background: 'red' }"
      :vertical-offset="[74,0]"
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

      <q-drawer v-model="drawer" side="left" class="bg-black text-white drawer">
        <div class="bg-white" style="height: 5px;" />

        <q-list class="sticky">
          <q-item v-ripple clickable @click="navigateTo('experience')">
            <q-item-section>Experience</q-item-section>
          </q-item>
          <q-item v-ripple clickable @click="navigateTo('technologies')">
            <q-item-section>Technologies</q-item-section>
          </q-item>
          <q-item v-ripple clickable @click="navigateTo('projects')">
            <q-item-section>Projects</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </q-scroll-area>
  </q-layout>
  
</template>

<script setup lang="ts">
import type { QScrollArea } from 'quasar';

const drawer = ref(false);
const scrollArea = ref<InstanceType<typeof QScrollArea> | null>(null);

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