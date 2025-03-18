export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'pl',
  defaultLocale: 'pl',
  fallbackLocale: 'en',
  locales: ['pl', 'en'],
  messages: {
    pl: {
      welcome: 'polski'
    },
    en: {
      welcome: 'ang'
    },
  }
}));