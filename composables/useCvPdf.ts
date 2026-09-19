export type CvPdfVariant = 'fullstack' | 'frontend';

const frontendDescription: Record<'pl' | 'en', string> = {
  pl: 'Frontend Developer z doświadczeniem komercyjnym przy dużych aplikacjach produkcyjnych. Na co dzień rozwijam nowe funkcjonalności i porządkuję istniejące rozwiązania, dbając o wydajność, czytelny kod i wygodę użytkownika. Pracuję głównie w Vue, Nuxt i TypeScript, a bliska współpraca z backendem sprawia, że rozumiem projekt w całości, od interfejsu po API. Najbardziej lubię produkty, przy których widać efekt pracy i można je spokojnie rozwijać przez lata.',
  en: 'Frontend Developer with commercial experience on large production applications. Day to day I build new features and clean up existing ones, with an eye on performance, readable code and the experience of the people using them. I work mainly with Vue, Nuxt and TypeScript, and close cooperation with the backend means I understand a project end to end, from the interface to the API. What I enjoy most are products where the work is visible and that can keep growing for years.',
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
