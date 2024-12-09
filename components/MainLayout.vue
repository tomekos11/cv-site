<template>
  <q-layout view="hHh lpR fff">
    
    <q-header elevated class="bg-black text-white">
      <q-toolbar class="q-py-sm">
        <q-toolbar-title class="d-flex full-width justify-between">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <div class="d-flex gap-20 flex-center">
            <a>
              Experience
            </a>

            <a>
              Technologies
            </a>

            <a>
              Projects
            </a>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer
      v-model="drawer"
      show-if-above
      overlay
      elevated
      side="right"
      :width="300"
      :breakpoint="500"
    >
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>

          <q-item v-ripple active clickable>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>
              Star
            </q-item-section>
          </q-item>

          <q-item v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>
              Send
            </q-item-section>
          </q-item>

          <q-item v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section>
              Drafts
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  
    <q-footer elevated class="text-white" style="background-color: lightslategrey;">
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
  </q-layout>
</template>

<script setup lang="ts">
const drawer = ref(false);
</script>