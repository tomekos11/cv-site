import { buildCvPdf } from '~/helpers/buildCvPdf';

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

  const getFileName = () => {
    const upperCaseLocale = locale.value.toUpperCase();
    return `${upperCaseLocale}_Tomasz_Slapinski_Fullstack_Developer.pdf`;
  };

  const generatePdf = async () => {
    if (!import.meta.client) return;

    isGenerating.value = true;

    try {
      await buildCvPdf({
        personal: personal.value,
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
      }, getFileName());
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
