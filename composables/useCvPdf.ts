export type CvPdfVariant = 'fullstack' | 'frontend';

const frontendDescription: Record<'pl' | 'en', string> = {
  pl: 'Frontend Developer specjalizujący się w Vue i ekosystemie Nuxt. Buduję szybkie, dopracowane interfejsy (Vue, Nuxt, Quasar, Nuxt UI, TypeScript, Tailwind), dbając o SSR, SEO i wydajność. Vue to moje główne, najlepiej opanowane narzędzie pracy.',
  en: 'Frontend Developer specializing in Vue and the Nuxt ecosystem. I build fast, polished interfaces (Vue, Nuxt, Quasar, Nuxt UI, TypeScript, Tailwind) with a focus on SSR, SEO and performance. Vue is my primary, most deeply mastered tool.',
};

export const useCvPdf = () => {
  const { locale, t } = useI18n();
  const { notify } = useQuasar();
  const {
    personal,
    experience,
    commercialProjects,
    education,
    languages,
    projects,
    certificates,
    technologyGroups,
  } = useCvData();
  const isGenerating = ref(false);

  const getFileName = (variant: CvPdfVariant) => {
    const upperCaseLocale = locale.value.toUpperCase();
    const suffix = variant === 'frontend' ? 'Frontend_Developer' : 'Fullstack_Developer';
    return `${upperCaseLocale}_Tomasz_Slapinski_${suffix}.pdf`;
  };

  const generatePdf = async (variant: CvPdfVariant = 'fullstack') => {
    if (!import.meta.client) return;

    isGenerating.value = true;

    try {
      // Lazy-load heavy jspdf stack only when generating a PDF
      const { buildCvPdf } = await import('~/helpers/buildCvPdf');

      const isFrontend = variant === 'frontend';
      const localeKey = (locale.value as 'pl' | 'en') === 'en' ? 'en' : 'pl';

      await buildCvPdf({
        personal: {
          ...personal.value,
          title: isFrontend ? 'Frontend Developer' : personal.value.title,
          description: isFrontend ? frontendDescription[localeKey] : personal.value.description,
        },
        labels: {
          experience: t('nav.experience'),
          commercialProjects: t('nav.commercialProjects'),
          education: t('nav.education'),
          languages: t('nav.languages'),
          technologies: t('nav.technologies'),
          projects: t('nav.projects'),
          certificates: t('nav.certificates'),
          issued: t('certificates.issued'),
          grade: t('education.grade'),
          currently: t('education.currently'),
          certificateLink: t('cvPdf.certificateLink'),
          consentClause: t('cvPdf.consentClause'),
        },
        experience: experience.value,
        commercialProjects: commercialProjects.value,
        education: education.value,
        languages: languages.value,
        technologyGroups: technologyGroups.value,
        skillsNotePrefix: t('cvPdf.skillsNotePrefix'),
        projects: projects.value,
        certificates: certificates.value,
        locale: locale.value as 'pl' | 'en',
      }, getFileName(variant));
    } catch (error) {
      console.error('Failed to generate CV PDF', error);
      notify({
        type: 'negative',
        message: t('cvPdf.generationError'),
      });
      throw error;
    } finally {
      isGenerating.value = false;
    }
  };

  return {
    isGenerating,
    generatePdf,
  };
};
