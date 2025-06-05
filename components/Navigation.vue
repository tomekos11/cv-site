<template>
  <template v-if="['index___pl', 'index___en', 'dynamic___pl', 'dynamic___en'].includes($route.name)">
    <q-btn flat :class="{ 'active-link': isSectionActive('experience'), 'd-block': isBlock, 'full-width': isBlock}" tag="a" :href="localeForURL + '/experience'" @click.prevent="scrollToSection('experience')"> {{ $t('nav.experience') }}</q-btn>
    <q-btn flat :class="{ 'active-link': isSectionActive('education'), 'd-block': isBlock, 'full-width': isBlock}" tag="a" :href="localeForURL + '/education'" @click.prevent="scrollToSection('education')">{{ $t('nav.education') }}</q-btn>
    <q-btn flat :class="{ 'active-link': isSectionActive('technologies'), 'd-block': isBlock, 'full-width': isBlock}" tag="a" :href="localeForURL + '/technologies'" @click.prevent="scrollToSection('technologies')">{{ $t('nav.technologies') }}</q-btn>
    <q-btn flat :class="{ 'active-link': isSectionActive('projects'), 'd-block': isBlock, 'full-width': isBlock}" tag="a" :href="localeForURL + '/projects'" @click.prevent="scrollToSection('projects')">{{ $t('nav.projects') }}</q-btn>
    <q-btn flat :class="{ 'active-link': isSectionActive('certificates'), 'd-block': isBlock, 'full-width': isBlock}" tag="a" :href="localeForURL + '/certificates'" @click.prevent="scrollToSection('certificates')">{{ $t('nav.certificates') }}</q-btn>
  </template>
  <template v-else>
    <q-btn flat :class="{ 'd-block': isBlock, 'full-width': isBlock}" tag="a" :to="localeForURL + '/'"> {{ $t('nav.back-to-cv') }}</q-btn>
  </template>
</template>

<script setup lang="ts">

interface Props {
  isBlock?: boolean;
}

const { isBlock = false } = defineProps<Props>();

const { isSectionActive, scrollToSection } = useActiveSection();

const { locale: currentLocale } = useI18n();

const localeForURL = computed(() => currentLocale.value === 'pl' ? '' : `/${currentLocale.value}`);
</script>

<style scoped>

.q-btn {
  position: relative;
  overflow: hidden;
  padding-bottom: 2px; /* Odstęp między tekstem a efektem podkreślenia */
  letter-spacing: 2px;
  font-size: 11px;
  padding: 10px;
}

/* Styl dla aktywnego przycisku */
.active-link {
  font-weight: bold;
}

.q-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #007bff; /* Kolor podkreślenia */
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
}

/* Aktywne podkreślenie */
.active-link::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>