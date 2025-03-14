import { createPinia } from 'pinia';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
  // Pinia jest dodawana tylko po stronie klienta
  if (import.meta.client) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
  }
});