<template>
  <div class="text-justify">

    <template v-if="locale === 'pl'">
      <pl-polcar v-if="job === 'polcar'"/>
      <pl-infrateam v-if="job === 'infra-team'"/>
      <pl-cemex v-if="job === 'cemex'"/>
    </template>

    <template v-else-if="locale === 'en'">
      <en-polcar v-if="job === 'polcar'"/>
      <en-infrateam v-if="job === 'infra-team'"/>
      <en-cemex v-if="job === 'cemex'"/>
    </template>
  </div>
</template>

<script setup lang="ts">

const PlPolcar = defineAsyncComponent(() => import('@/components/jobs/pl/Polcar.vue'));
const PlInfrateam = defineAsyncComponent(() => import('@/components/jobs/pl/InfraTeam.vue'));
const PlCemex = defineAsyncComponent(() => import('@/components/jobs/pl/Cemex.vue'));

const EnPolcar = defineAsyncComponent(() => import('@/components/jobs/en/Polcar.vue'));
const EnInfrateam = defineAsyncComponent(() => import('@/components/jobs/en/InfraTeam.vue'));
const EnCemex = defineAsyncComponent(() => import('@/components/jobs/en/Cemex.vue'));

interface Props {
  job: 'polcar' | 'infra-team' | 'cemex'
}

defineProps<Props>();

const { locale } = useI18n();
</script>