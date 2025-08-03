import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

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
    'nuxt-jsonld',
    '@nuxtjs/color-mode'
  ],

  colorMode: {
    preference: 'light',
    fallback: 'dark',
    storage: 'cookie',
  },

  plugins: [
    { src: '~/plugins/pinia.ts', mode: 'client' },
    { src: '~/plugins/color.ts', mode: 'client' },
  ],

  nitro: {
    plugins: [
      '~/server/plugins/color.ts'
    ]
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  
  image: {
    quality: 80,
    format: ['webp'],
    densities: [1],
  },

  css: [
    '@/assets/styles/global.css',
    // 'flag-icon-css/css/flag-icons.min.css',
  ],

  site: {
    url: 'https://cv.tomasz-slapinski.pl',
    indexable: true,
  },

  sitemap: {
    autoI18n: true,
    discoverImages: true,
    defaults: {
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.3,
    },

    autoLastmod: true,

    sitemapName: 'Tomasz Słapiński - CV',

    urls: [
      {
        loc: '/',
        priority: 1,
        lastmod: new Date().toISOString(),
        changefreq: 'daily'
      },
      {
        loc: '/en',
        priority: 1,
        lastmod: new Date().toISOString(),
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
        'upgrade-insecure-requests': true,
      },
    },
  },

  quasar: {
    plugins: [
      'Notify',
      'Cookies',
    ],
    config: {
      notify: {
        progress: true
      }
    },
    sassVariables: 'assets/styles/quasar.variables.scss'
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
  },

  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'dynamic',
        path: '/:slug*',
        file: resolve(__dirname, 'pages/index.vue')
      });
    }
  }
});