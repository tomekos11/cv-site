<template>
  <q-page style="max-width: 2000px; margin-inline: auto;">
    <div class="row q-mt-xl" style="max-width: 95vw; margin-inline: auto;">
      <div class="col-12 col-lg-8 text-center">
        <h1 class="text-dark" style="font-size: 72px;">Tomasz Słapiński</h1>
        <h2 class="text-grey-8">Fullstack Developer</h2>

        <p style="font-size: 24px; width: min(600px, calc(100% - 24px));" class="text-center q-mx-auto q-mt-lg">
          {{ $t('myDescription') }}
        </p>

        <q-btn
          class="bg-primary text-white q-mr-sm"
          style="font-size: 15px;"
          size="md"
          rounded
          :loading="loading"
          icon="mail"
          :label="$t('inquire')"
          @click="showInquiryModal = true; loading = true"
        />

        <q-btn
          color="primary"
          outline
          style="font-size: 15px;"
          size="md"
          rounded
          icon="download"
          :label="$t('downloadCv')"
        />

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
    <technologies />
    <projects />
    <certificates />
    
    <inquiry-modal v-if="showInquiryModal" @hide="showInquiryModal = false" @before-show="loading = false"/>
    <analytics/>
  </q-page>
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';

const InquiryModal = defineAsyncComponent(() => import('@/components/InquiryModal.vue'));

const showInquiryModal = ref(false);
const loading = ref(false);
</script>

<style scoped>
:deep(.card-hover:hover) {
  /* background-color: #dbdbdb !important; */
  transform: scale(1.2);
}

.img {
  transition: 0.2s;
}

.img:hover {
  filter: drop-shadow(2px 4px 6px black);
}
</style>