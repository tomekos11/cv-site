<template>
  <div>
    <main-layout />
  </div>
</template>

<script setup lang="ts">
const $q = useQuasar();

if($q.cookies.get('nuxt-color-mode')) {
  $q.dark.set($q.cookies.get('nuxt-color-mode') === 'dark');
}

onMounted(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/OneSignalSDKWorker.js', { scope: '/app' })
      .catch(error => {
        console.error('Rejestracja OneSignal SDK Service Workera nie powiodła się:', error);
      });
  }
});
</script>