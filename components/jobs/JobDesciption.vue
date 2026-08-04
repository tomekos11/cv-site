<template>
  <div class="text-justify">

    <template v-if="locale === 'pl'">
      <pl-polcar v-if="job === 'polcar'"/>
      <pl-infrateam v-if="job === 'infra-team'"/>
      <pl-cemex v-if="job === 'cemex'"/>
      <pl-shopify v-if="job === 'shopify'"/>
      <pl-nda v-if="job === 'nda'" />
    </template>

    <template v-else-if="locale === 'en'">
      <en-polcar v-if="job === 'polcar'"/>
      <en-infrateam v-if="job === 'infra-team'"/>
      <en-cemex v-if="job === 'cemex'"/>
      <en-shopify v-if="job === 'shopify'"/>
      <en-nda v-if="job === 'nda'" />
    </template>
  </div>
</template>

<script setup lang="ts">

const PlPolcar = defineAsyncComponent(() => import('@/components/jobs/pl/Polcar.vue'));
const PlInfrateam = defineAsyncComponent(() => import('@/components/jobs/pl/InfraTeam.vue'));
const PlCemex = defineAsyncComponent(() => import('@/components/jobs/pl/Cemex.vue'));
const PlShopify = defineAsyncComponent(() => import('@/components/jobs/pl/Shopify.vue'));
const PlNda = defineAsyncComponent(() => import('@/components/jobs/pl/Nda.vue'));

const EnPolcar = defineAsyncComponent(() => import('@/components/jobs/en/Polcar.vue'));
const EnInfrateam = defineAsyncComponent(() => import('@/components/jobs/en/InfraTeam.vue'));
const EnCemex = defineAsyncComponent(() => import('@/components/jobs/en/Cemex.vue'));
const EnShopify = defineAsyncComponent(() => import('@/components/jobs/en/Shopify.vue'));
const EnNda = defineAsyncComponent(() => import('@/components/jobs/en/Nda.vue'));

interface Props {
  job: 'polcar' | 'infra-team' | 'cemex' | 'shopify' | 'nda'
}

defineProps<Props>();

const { locale } = useI18n();
</script>