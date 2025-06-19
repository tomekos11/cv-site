<template>
  <q-btn flat :class="{'d-block': isBlock, 'full-width': isBlock}">
    <div class="t:flex">
      <span :class="`flag-icon flag-icon-${getCountryCode(locale)}`"/>
    </div>
    <q-menu>
      <div>
        <q-btn v-for="availableLocale in availableLocales" :key="availableLocale" @click="setLocaleCustom(availableLocale)">
          {{ availableLocale }}
          <span :class="`q-ml-sm flag-icon flag-icon-${ getCountryCode(availableLocale) }`"/>
        </q-btn>
      </div>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface Props {
  isBlock?: boolean;
}

const { isBlock = false } = defineProps<Props>();

const { locale, availableLocales, setLocale } = useI18n();

const { activeSection, scrollToSection } = useActiveSection();

const getCountryCode = (availableLocale: string): string => {
  return availableLocale.toLowerCase() === 'en' ? 'gb' : availableLocale.toLowerCase();
};

const setLocaleCustom = (lang: 'en' | 'pl') => {
  if(activeSection.value) {
    locale.value = lang;
    scrollToSection(activeSection.value);
  } else {
    setLocale(lang);
  }
};
</script>

<style scoped>
.flag-icon {
  font-size: 20px;
}
</style>