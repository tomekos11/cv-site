import type { Technology } from '~/helpers/technology';

export type JobSlug = 'polcar' | 'cemex' | 'infra-team' | 'nda';

export const getWorkEntryLogo = (slug: JobSlug): string | null => {
  const logos: Partial<Record<JobSlug, string>> = {
    polcar: '/assets/icons/companies/polcar_no_bg.png',
    cemex: '/assets/icons/companies/stormcode.png',
    'infra-team': '/assets/icons/companies/infrateam_no_bg.png',
  };

  return logos[slug] ?? null;
};

export interface CvWorkEntry {
  company: string;
  shortDescription: string;
  slug: JobSlug;
  dates: string;
  technologies: string[];
}

export interface CvEducationEntry {
  id: number;
  name: string;
  title: string;
  when: string;
  img: string;
  mark?: string;
  status: 'ongoing' | 'ended';
}

export interface CvProjectEntry {
  name: string;
  description: string;
  year: number;
  slug: string;
  technologies: Technology[];
  image: string;
  demoLink?: string;
}

export interface CvCertificateEntry {
  name: string;
  company: string;
  receivedDate: string;
  skills: string[];
  companyImage: string;
  image?: string;
  identifier?: string;
  link?: string;
  description?: string;
}

export type CvLanguageFlag = 'pl' | 'gb' | 'es';

export interface CvLanguageEntry {
  name: string;
  level: string;
  flag: CvLanguageFlag;
}

export interface CvTechnologyGroup {
  label: string;
  items: string[];
}

export const CV_TECHNOLOGIES = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'SEO', 'Vue', 'Nuxt', 'Quasar', 'Nuxt UI',
  'Shadcn', 'Tailwind', 'React', 'PHP', 'Laravel', 'SQL', 'ORM', 'REST', 'gRPC', 'GraphQL',
  'WebSocket', 'Redis', 'NX', 'Node', 'Express', 'Nest', 'Adonis.js', 'Bootstrap', 'Git',
  'Docker', 'Jenkins', 'GitHub Actions', 'Agile', 'Scrum', 'AWS', 'Terraform',
] as const;

export const useCvData = () => {
  const { t } = useI18n();

  const personal = computed(() => ({
    name: 'Tomasz Słapiński',
    title: 'Fullstack Developer',
    email: 'tom.slapinski@gmail.com',
    description: t('cvPdf.aboutDescription'),
    linkedin: 'https://www.linkedin.com/in/tomasz-slapinski/',
    github: 'https://github.com/tomekos11',
    website: 'https://cv.tomasz-slapinski.pl',
  }));

  const experience = computed<CvWorkEntry[]>(() => [
    {
      company: 'Polcar',
      shortDescription: t('experience.polcar.shortDescription'),
      slug: 'polcar',
      dates: t('experience.polcar.date'),
      technologies: ['Vue', 'Quasar', 'SSR', 'PWA', 'Laravel', 'SEO'],
    },
  ]);

  const commercialProjects = computed<CvWorkEntry[]>(() => [
    {
      company: t('commercialProjects.nda.name'),
      shortDescription: t('commercialProjects.nda.shortDescription'),
      slug: 'nda',
      dates: t('commercialProjects.nda.date'),
      technologies: [],
    },
    {
      company: 'StormCode',
      shortDescription: t('commercialProjects.infraTeam2.shortDescription'),
      slug: 'cemex',
      dates: t('commercialProjects.infraTeam2.date'),
      technologies: ['Vue', 'Quasar', 'Laravel'],
    },
    {
      company: 'Infra Team',
      shortDescription: t('commercialProjects.infraTeam1.shortDescription'),
      slug: 'infra-team',
      dates: t('commercialProjects.infraTeam1.date'),
      technologies: ['Vue', 'Bootstrap', 'Laravel'],
    },
  ]);

  const education = computed<CvEducationEntry[]>(() => [
    {
      id: 3,
      name: t('education.school3.name'),
      when: '02/2025 - 07/2026',
      title: t('education.school3.title'),
      img: '/assets/icons/companies/prz.webp',
      status: 'ongoing',
    },
    {
      id: 2,
      name: t('education.school2.name'),
      when: '10/2021 - 02/2025',
      title: t('education.school2.title'),
      img: '/assets/icons/companies/prz.webp',
      mark: '5.0',
      status: 'ended',
    },
    {
      id: 1,
      name: t('education.school1.name'),
      when: '09/2017 - 06/2021',
      title: t('education.school1.title'),
      img: '/assets/icons/companies/zse.svg',
      status: 'ended',
    },
  ]);

  const projects = computed<CvProjectEntry[]>(() => [
    {
      name: t('projects.discreteLogarithm.name'),
      description: t('projects.discreteLogarithm.description'),
      year: 2026,
      slug: 'discrete-logarithm',
      technologies: ['Vue', 'Nuxt'],
      image: '/assets/icons/projects/discrete-logarithm.svg',
      demoLink: 'https://discrete-logarithm.tomasz-slapinski.pl/',
    },
    {
      name: t('projects.englishLearning.name'),
      description: t('projects.englishLearning.description'),
      year: 2023,
      slug: 'ela',
      technologies: ['Vue', 'Laravel'],
      image: '/assets/icons/projects/gb_flag.jpg',
    },
    {
      name: t('projects.dtVisualization.name'),
      description: t('projects.dtVisualization.description'),
      year: 2024,
      slug: 'dt',
      technologies: ['Quasar', 'Laravel'],
      image: '/assets/icons/projects/trees.webp',
    },
    {
      name: t('projects.AIchat.name'),
      description: t('projects.AIchat.description'),
      year: 2024,
      slug: 'ai-chat',
      technologies: ['Quasar', 'Java', 'Spring'],
      image: '/assets/icons/projects/czat.jpg',
    },
    {
      name: t('projects.testManagement.name'),
      description: t('projects.testManagement.description'),
      year: 2024,
      slug: 'test-management',
      technologies: ['Spring', 'Thymeleaf'],
      image: '/assets/icons/projects/test.webp',
    },
  ]);

  const certificates = computed<CvCertificateEntry[]>(() => [
    {
      name: t('certificates.cert8.name'),
      company: 'Eksperckie Centrum Szkolenia Cyberbezpieczeństwa',
      receivedDate: '2025-11',
      skills: ['Cybersecurity', 'Cisco Networking Academy'],
      companyImage: '/assets/icons/companies/eksperckie_centrum_szkolenia_cyberbezpieczestwa_logo.jpg',
      image: '/assets/icons/certificates/cyberanalist.jpg',
      description: t('certificates.cert8.description'),
      identifier: 'f68360e7-dbef-4fbb-9d85-120fadf7326b',
      link: 'https://www.credly.com/badges/f68360e7-dbef-4fbb-9d85-120fadf7326b',
    },
    {
      name: 'Certified Mid-Level Vue.js Developer',
      company: 'Certificates.dev',
      receivedDate: '2025-10',
      skills: ['Vue', 'JS', 'TS', 'Frontend'],
      companyImage: '/assets/icons/companies/certificates_dev.jpg',
      image: '/assets/icons/certificates/vue_mid.png',
      description: t('certificates.cert7.description'),
      identifier: 'a0383457-31aa-4170-adf5-c4ff8530a240',
      link: 'https://api.certificates.dev/certificates/a0383457-31aa-4170-adf5-c4ff8530a240/download?signature=68376c8bff19ba427067db6188d98a25203f33cf4badbbb69a8674f44e7662d3',
    },
    {
      name: 'OWASP Top 10 Minutes Hack',
      company: 'easytools',
      receivedDate: '2025-07',
      skills: ['Cybersecurity', 'XSS', 'SQL Injection', 'JWT Attacks', 'Deserialization Attacks', 'Vibe Coding (AI/Security)', 'Hashing Algorithms', 'Breaking Weak Hashes'],
      companyImage: '/assets/icons/companies/easytools.jpg',
      image: '/assets/icons/certificates/10minuteshack.png',
      description: t('certificates.cert6.description'),
      identifier: 'VFPUDMqpz6Vm1tghCXh-Q',
      link: 'https://app.easy.tools/players/owasp-top-10-pl/certificates/VFPUDMqpz6Vm1tghCXh-Q',
    },
    {
      name: t('certificates.cert5.name'),
      company: 'Google Cloud Skill Boost',
      receivedDate: '2025-05',
      skills: ['Cloud', 'Google cloud'],
      companyImage: '/assets/icons/companies/google_cloud.jpg',
      image: '/assets/icons/certificates/google_cloud.png',
      description: t('certificates.cert5.description'),
    },
    {
      name: t('certificates.cert4.name'),
      company: 'HubSpot Academy',
      receivedDate: '2024-07',
      skills: ['SEO'],
      companyImage: '/assets/icons/companies/hubspot.jpg',
      image: '/assets/icons/certificates/hubspot.png',
      identifier: '3061024de9a74a61bc8c971f450688c1',
      description: t('certificates.cert4.description'),
    },
    {
      name: t('certificates.cert3.name'),
      company: 'ETS',
      receivedDate: '2024-01',
      skills: ['English C1'],
      companyImage: '/assets/icons/companies/ets.jpg',
      image: '/assets/icons/certificates/toeic.jpg',
      identifier: '776460',
      link: 'https://www.etsglobal.org/fr/en/digital-score-report/E82351FEC236574022D93D920C6A29DD1F27DA6347D454A35F19C46A8084FBB4cnFwWjVjKzFPWnArVnlXQnA2VDdsRmZFbGJoNmp5UC9Bazk2M3FwSThoTjJva1Rs',
      description: t('certificates.cert3.description'),
    },
    {
      name: t('certificates.cert2.name'),
      company: 'LabMasters Analytics Academy',
      receivedDate: '2023-07',
      skills: ['SQL'],
      companyImage: '/assets/icons/companies/lab_masters.jpg',
      image: '/assets/icons/certificates/lab_masters_sql.png',
      description: t('certificates.cert2.description'),
    },
    {
      name: t('certificates.cert1.name'),
      company: 'SoftSystem Sp. z.o.o',
      receivedDate: '2023-05',
      skills: ['Vue', 'Python'],
      companyImage: '/assets/icons/companies/softsystem.jpg',
      image: '/assets/icons/companies/softsystem.jpg',
      description: t('certificates.cert1.description'),
    },
  ]);

  const technologies = computed(() => [...CV_TECHNOLOGIES]);

  const technologyGroups = computed<CvTechnologyGroup[]>(() => [
    {
      label: t('cvPdf.technologyGroups.frontend'),
      items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'SEO', 'Vue', 'Nuxt', 'Quasar', 'Nuxt UI', 'Shadcn', 'Tailwind', 'React', 'Bootstrap'],
    },
    {
      label: t('cvPdf.technologyGroups.backend'),
      items: ['PHP', 'Laravel', 'SQL', 'ORM', 'REST', 'gRPC', 'GraphQL', 'WebSocket', 'Redis', 'Node', 'Express', 'Nest', 'Adonis.js'],
    },
    {
      label: t('cvPdf.technologyGroups.tools'),
      items: ['Git', 'Docker', 'Jenkins', 'GitHub Actions', 'NX', 'AWS', 'Terraform'],
    },
    {
      label: t('cvPdf.technologyGroups.workflow'),
      items: ['Agile', 'Scrum'],
    },
  ]);

  const languages = computed<CvLanguageEntry[]>(() => [
    {
      name: t('languages.polish.name'),
      level: t('languages.polish.level'),
      flag: 'pl',
    },
    {
      name: t('languages.english.name'),
      level: t('languages.english.level'),
      flag: 'gb',
    },
    {
      name: t('languages.spanish.name'),
      level: t('languages.spanish.level'),
      flag: 'es',
    },
  ]);

  return {
    personal,
    experience,
    commercialProjects,
    education,
    projects,
    certificates,
    technologies,
    technologyGroups,
    languages,
  };
};
