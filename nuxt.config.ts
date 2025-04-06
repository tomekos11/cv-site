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
    '@nuxtjs/i18n',
    'nuxt-security',
    '@nuxtjs/sitemap',
    'nuxt-jsonld'
  ],

  plugins: [
    { src: '~/plugins/pinia.ts', mode: 'client' }
  ],
  
  css: [
    '@/assets/styles/global.css',
    'flag-icon-css/css/flag-icons.min.css'
  ],

  site: {
    url: 'https://cv.tomasz-slapinski.pl',
    indexable: true,
  },

  sitemap: {
    autoI18n: true,
    defaults: {
      changefreq: 'daily',
      priority: 0.3,
    },

    urls: [
      {
        loc: '/',
        priority: 1,
        changefreq: 'daily'
      },
      {
        loc: '/en',
        priority: 1,
        changefreq: 'daily'
      },
    ]
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'default-src': ['\'self\''],
        'script-src': ['\'self\'', 'https:', '\'unsafe-inline\''],
        'style-src': ['\'self\'', 'https:', '\'unsafe-inline\''],
        'img-src': ['\'self\'', 'data:', 'https:'],
        'font-src': ['\'self\'', 'https:', 'data:'],
        'object-src': ['\'none\''],
        'frame-src': ['\'self\'', 'www.youtube.com'],
        'upgrade-insecure-requests': true,
      },
    },
  },

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
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.ts' },
      { code: 'pl', iso: 'pl-PL', file: 'pl.ts' },
    ],
    defaultLocale: 'pl',
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  }
});