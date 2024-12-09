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

    <q-footer elevated class="bg-grey-8 text-white">
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