// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: true,
  modules: [
    'nuxt-quasar-ui',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/i18n'
  ],
  plugins: [
    { src: '~/plugins/pinia.ts', mode: 'client' }
  ],
  css: [
    '@/assets/styles/global.css',
    'flag-icon-css/css/flag-icons.min.css'
  ],
});