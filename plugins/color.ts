import { Dark } from 'quasar';

export default defineNuxtPlugin(() => {
  // Działamy tylko po stronie klienta

  const mode = Cookies.get('nuxt-color-mode');
  console.log(mode);

  Dark.set(mode === 'dark');

});
