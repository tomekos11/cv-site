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
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt'
  ],

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Tomasz Słapiński - CV',
      short_name: 'Tomasz Słapiński',
      description: 'Aplikacja skupia się na przedstawieniu historii, umiejętności, zdobytych certyfikatów i wiele więcej przez Tomasz Słapińskiego',
      lang: 'pl',
      start_url: '/',
      screenshots: [
        {
          'src': '/assets/icons/pwa/screen.png',
          'sizes': '800x600',
          'type': 'image/png',
          'form_factor': 'wide'
        }
      ],
      theme_color: '#000',
      background_color: '#000',
      icons: [
        {
          src: '/assets/icons/pwa/ts_192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/assets/icons/pwa/ts_512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },

  app: {
    head: {
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'icon', type: 'image/png', href: '/assets/icons/favicons/ts_16.png', sizes: '16x16' },
        { rel: 'icon', type: 'image/png', href: '/assets/icons/favicons/ts_32.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/assets/icons/favicons/ts_48.png', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', href: '/assets/icons/favicons/ts_96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/png', href: '/assets/icons/favicons/ts_180.png', sizes: '180x180' },
      ],
      script: [
        {
          src: 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js',
          defer: true,
        },
        {
          innerHTML: `
            if (window.location.origin === "${process.env.NUXT_PUBLIC_APP_ORIGIN}") {
              window.OneSignalDeferred = window.OneSignalDeferred || [];
              OneSignalDeferred.push(async function(OneSignal) {
                await OneSignal.init({
                  appId: "${process.env.NUXT_PUBLIC_ONE_SIGNAL_APP_ID}",
                });
              });
            }
          `,
          type: 'text/javascript',
        }
      ]
    },
  },

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
    provider: process.env.NODE_ENV === 'development' ? 'ipx' : 'ipxStatic',
    // dir: 'public/assets/icons'
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

    sitemapName: 'Tomasz Słapiński - CV.xml',

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
        'connect-src': ['\'self\'', 'https://api.onesignal.com', 'https://api.iconify.design'],
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