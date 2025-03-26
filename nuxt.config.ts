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

  quasar: {
    plugins: [
      'Notify'
    ],
    config: {
      notify: {
        progress: true
      }
    }
  },

  i18n: {
    strategy: 'prefix_except_default', // Język w URL, ale nie dla domyślnego
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.ts' },
      { code: 'pl', iso: 'pl-PL', file: 'pl.ts' },
    ],
    defaultLocale: 'pl',
    lazy: true, // Lazy loading tłumaczeń
    langDir: 'locales/', // Folder z tłumaczeniami
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  }
});