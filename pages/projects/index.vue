<template>
  <div>
    <q-breadcrumbs class="q-mt-lg q-px-lg">

      <q-breadcrumbs-el
        icon="home"
        :to="{
          path: homeLink
        }" />

      <q-breadcrumbs-el
        label="Projects list"
      />
    </q-breadcrumbs>




  </div>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n';

const localePath = useLocalePath();
const homeLink = localePath('/');

</script>

<style scoped>

.name-style {
  font-size: 72px;
}

</style>