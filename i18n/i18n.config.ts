export default defineI18nConfig(() => ({
  legacy: false,
  strategy: 'prefix_except_default',
  locale: 'pl',
  defaultLocale: 'pl',
  fallbackLocale: 'en',
  locales: [
    { code: 'en', iso: 'en-US', file: 'en.ts' },
    { code: 'pl', iso: 'pl-PL', file: 'pl.ts' },
  ],
  lazy: true,
  langDir: 'locales/',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
  }
}));