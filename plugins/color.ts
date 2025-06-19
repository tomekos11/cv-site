import { Dark } from 'quasar';

// Funkcja do odczytu ciasteczka
// function getCookie(name: string): string | undefined {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(';').shift();
// }

export default defineNuxtPlugin(() => {
  // Działamy tylko po stronie serwera
//   const colorMode = useColorMode();

  const mode = Cookies.get('nuxt-color-mode');
  console.log(mode);

  Dark.set(mode === 'dark');

});
