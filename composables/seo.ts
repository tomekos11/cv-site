export const useSeo = (page: '' | '/projects-list', title: string, description: string, ogTitle: string, ogDescription: string) => {
  const { locale } = useI18n();
    
  const link = computed(() => {
    if(locale.value === 'pl') {
      return [
        { rel: 'canonical', href: `https://cv.tomasz-slapinski.pl${page}` },
        { rel: 'alternate', hreflang: 'en-US', href: `https://cv.tomasz-slapinski.pl/en${page}` },
        { rel: 'alternate', hreflang: 'pl-PL', href: `https://cv.tomasz-slapinski.pl${page}` },
      ];
    }

    return [
      { rel: 'canonical', href: `https://cv.tomasz-slapinski.pl/en${page}` },
      { rel: 'alternate', hreflang: 'pl-PL', href: `https://cv.tomasz-slapinski.pl${page}` },
      { rel: 'alternate', hreflang: 'en-US', href: `https://cv.tomasz-slapinski.pl/en${page}` },
    ];
  });

  const ogUrl = computed(() => locale.value === 'pl' ? `https://cv.tomasz-slapinski.pl${page}` : `https://cv.tomasz-slapinski.pl/en${page}`);

  useHead({
    htmlAttrs: { lang: locale.value },

    title,

    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },

      { property: 'og:type', content: 'website' },
    
      { property: 'og:title', content: ogTitle },

      { property: 'og:description', content: ogDescription },

      { property: 'og:image', content: 'https://cv.tomasz-slapinski.pl/assets/icons/img/2023_linkedin_no_bg.png' },

      { property: 'og:url', content: ogUrl.value },

      { name: 'twitter:card', content: 'summary_large_image' },
    ],

    link: link.value
  });
};
