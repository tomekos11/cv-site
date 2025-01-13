<template>
  <div class="q-px-md">    
    <div class="fancy-text-gradient">
      Przegląd
    </div>

    <p>
      Ten projekt to aplikacja internetowa zbudowana za pomocą Javy i frameworka Spring jako RESTowe API oraz Vue.js z frameworkiem Quasar na froncie. Aplikacja integruje się z API OpenAI, tworząc czat z asystentem. Pozwala użytkownikom na wymianę wiadomości, tworzenie konwersacji oraz udostępnianie wiadomości innym użytkownikom (z listy użytkowników lub przez link).
    </p>

    <p>
      Więcej informacji <q-btn :icon="`img:${github}`" rounded class="q-mx-sm q-px-none" dense flat size="lg" :href="githubLink" target="_blank"/>
    </p>

    <div style="width:400px;" class="q-mx-auto">

      <q-video
        :ratio="16/9"
        src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
      />
    </div>

    <div class="fancy-text-gradient">
      Funkcje
    </div>

    <ul>
      <li>
        <strong>Wymiana Wiadomości</strong>: Użytkownicy mogą wysyłać i odbierać wiadomości w czasie rzeczywistym.
      </li>
      <li>
        <strong>Tworzenie Konwersacji</strong>: Użytkownicy mogą tworzyć i zarządzać wieloma konwersacjami.
      </li>
      <li>
        <strong>Udostępnianie Wiadomości</strong>: Użytkownicy mogą udostępniać wiadomości innym, wybierając z listy użytkowników lub generując link do udostępnienia.
      </li>
      <li>
        <strong>Integracja z OpenAI</strong>: Wykorzystuje API OpenAI do dostarczania odpowiedzi i asysty w czacie.
      </li>
    </ul>
 
    <div class="fancy-text-gradient">
      Wykorzystane Technologie
    </div>

    Backend

    <div class="d-flex gap-10">
      <q-card class="bg-white text-dark text-center">
        <q-card-section class="d-flex flex-column full-height fit">
          <div class="q-my-sm text-bold">Java</div>
          <div class="d-flex justify-center q-mb-sm" style="gap:5px">
            XDD
          </div>
        </q-card-section>
      </q-card>
    
      <q-card class="bg-white text-dark text-center">
        <q-card-section class="d-flex flex-column full-height fit">
          <div class="q-my-sm text-bold">Java</div>
          <div class="d-flex justify-center q-mb-sm" style="gap:5px">
            XDD
          </div>
        </q-card-section>
      </q-card>
    </div>
    
    

    Backend: Java, Spring Framework
    Frontend: Vue.js, Quasar Framework
    Integracja API: OpenAI API
  </div>
</template>

<script setup lang="ts">
import github from '/assets/icons/github.png';
const githubLink = 'https://github.com/tomekos11/spring-chat-AI';
</script>