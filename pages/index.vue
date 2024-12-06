<template>
  <div>
    <div class="row q-mt-xl">
      <div class="col-12 col-lg-6 text-center">
        <h1 class="text-dark" style="font-size: 72px;">Tomasz Słapiński</h1>
        <h2 class="text-grey-8">Fullstack Developer</h2>

        <p style="font-size: 24px; width: min(600px, 100%);" class="text-center q-mx-auto q-mt-lg">
          Rozwijającym się Full Stack Developer, z zamiłowaniem do rozwiązywania problemów.
          Zawsze gotów na wyzwania, nieustannie dążący do doskonalenia swoich umiejętności.
        </p>

        <div class="d-flex justify-center gap-20" >
          <q-btn :icon="`img:${linkedin}`" rounded class="q-px-sm" size="lg" href="https://www.linkedin.com/in/tomasz-slapinski/" target="_blank"/>
          <q-btn :icon="`img:${github}`" rounded class="q-px-sm" size="lg" href="https://github.com/tomekos11" target="_blank"/>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        xd
      </div>
    </div>
    
    <p>
      XD
    </p>

    <technologies />
    <projects />
    <certificates />
    
  </div>
</template>

<script setup lang="ts">
import github from '/assets/icons/github.png';
import linkedin from '/assets/icons/linkedin.png';
</script>

<style scoped>
:deep(.card-hover:hover) {
  background-color: #dbdbdb !important; /* Ciemniejszy kolor tła podczas hover */
}
</style>