<template>
  <q-toolbar class="q-py-sm">
    <q-toolbar-title class="d-flex full-width justify-between items-center">

      <q-toolbar class="q-px-md justify-between">
        <q-toolbar-title>CV</q-toolbar-title>
        <div class="d-none d-md-flex gap-20 flex-center">
          <q-btn flat :class="{ 'active-link': isHeaderLinkActive('experience')}" @click="scrollToSection('experience')">Experience</q-btn>
          <q-btn flat :class="{ 'active-link': isHeaderLinkActive('education')}" @click="scrollToSection('education')">Education</q-btn>
          <q-btn flat :class="{ 'active-link': isHeaderLinkActive('technologies')}" @click="scrollToSection('technologies')">Technologies</q-btn>
          <q-btn flat :class="{ 'active-link': isHeaderLinkActive('projects')}" @click="scrollToSection('projects')">Projects</q-btn>
          <q-btn flat :class="{ 'active-link': isHeaderLinkActive('certificates')}" @click="scrollToSection('certificates')">Certificates</q-btn>
        </div>
        <!-- Przycisk hamburgera dla mniejszych ekranów -->
        <q-btn
          flat
          round
          icon="menu"
          class="d-md-none"
          @click="drawer = !drawer"
        />
      </q-toolbar>

    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup lang="ts">
const { isHeaderLinkActive, scrollToSection } = useHeaderIntersectionObserver();

const drawer = defineModel<boolean>();

</script>

<style scoped>
@media(min-width: 768px) {
    .d-md-flex {
        display: flex;
    }

    .d-md-none {
        display: none;
    }
}

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