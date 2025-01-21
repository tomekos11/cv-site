<template>
  <q-page style="max-width: 2000px; margin-inline: auto;">
    <div class="row q-mt-xl" style="max-width: 95vw; margin-inline: auto;">
      <div class="col-12 col-lg-8 text-center">
        <h1 class="text-dark" style="font-size: 72px;">Tomasz Słapiński</h1>
        <h2 class="text-grey-8">Fullstack Developer</h2>

        <p style="font-size: 24px; width: min(600px, calc(100% - 24px));" class="text-center q-mx-auto q-mt-lg">
          Rozwijający się Full Stack Developer, z zamiłowaniem do rozwiązywania problemów.
          Zawsze gotów na wyzwania, nieustannie dążący do doskonalenia swoich umiejętności.
        </p>

      </div>
      <div class="col-12 col-lg-4 text-center self-end">
        <img src="/assets/icons/img/2023_linkedin_no_bg.png" style="max-width: min(400px, 100%);">
        
        <div class="d-flex justify-center gap-10 q-my-sm" >

          <a href="https://www.linkedin.com/in/tomasz-slapinski/" target="_blank">
            <Icon name="uil:linkedin" style="color: #0a66c2" size="42px" class="d-flex"/>
          </a>

          <a href="https://github.com/tomekos11" target="_blank">
            <Icon name="uil:github" style="color: #010409" size="43px" class="d-flex"/>
          </a>
        </div>
      </div>
    </div>
    
    <experience />
    <education />
    <technologies2 />
    <projects />
    <!-- <certificates /> -->
    <certificates-new />
    
  </q-page>
</template>

<script setup lang="ts">
// import myPhoto from '/assets/icons/img/2023_linkedin_no_bg.png';
</script>

<style scoped>
:deep(.card-hover:hover) {
  background-color: #dbdbdb !important; /* Ciemniejszy kolor tła podczas hover */
}

.img {
  transition: 0.2s;
}

.img:hover {
  filter: drop-shadow(2px 4px 6px black);
}
</style>