<template>
  <q-layout view="hHh lpR fff">
    
    <q-header elevated class="bg-black text-white">
      <Header />
    </q-header>

    <q-page-container>
      <nuxt-page />
    </q-page-container>
  
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
