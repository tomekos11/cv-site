<template>
  <q-btn>
    <div>
      {{ locale }}
      <span :class="`flag-icon flag-icon-${getCountryCode(locale)}`"/>
    </div>
    <q-menu>
      <div>
        <q-btn v-for="availableLocale in availableLocales" :key="availableLocale" @click="setLocale(availableLocale)">
          {{ availableLocale }}
          <span :class="`q-ml-sm flag-icon flag-icon-${ getCountryCode(availableLocale) }`"/>
        </q-btn>
      </div>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale, availableLocales, setLocale } = useI18n();

const getCountryCode = (availableLocale: string): string => {
  return availableLocale.toLowerCase() === 'en' ? 'gb' : availableLocale.toLowerCase();
};
</script>

<style scoped>
.flag-icon {
  font-size: 20px;
}
</style>