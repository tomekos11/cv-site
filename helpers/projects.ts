import type { Technology } from '~/helpers/technology';

export type ProjectGithubLinkKey = 'frontend' | 'backend' | 'backend-2' | 'project';

export interface ProjectDefinition {
  slug: string;
  i18nKey: string;
  image: string;
  startDate: string;
  endDate: string;
  peopleCount: number;
  technologies: Technology[];
  githubLinks?: Partial<Record<ProjectGithubLinkKey, string>>;
  demoLink?: string;
  /** YouTube embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID?rel=0 */
  videoUrl?: string;
  featuredOnHomepage?: boolean;
  year?: number;
}

export const projectDefinitions: ProjectDefinition[] = [
  {
    slug: 'discrete-logarithm',
    i18nKey: 'discreteLogarithm',
    image: '/assets/icons/projects/discrete-logarithm.webp',
    startDate: '2026-01-15',
    endDate: '2026-06-09',
    peopleCount: 1,
    technologies: ['Vue', 'Nuxt'],
    demoLink: 'https://discrete-logarithm.tomasz-slapinski.pl/',
    featuredOnHomepage: true,
    year: 2026,
  },
  {
    slug: 'heat-control-assistant',
    i18nKey: 'heat-control-assistant',
    image: '/assets/icons/projects/heat-control-assistant.png',
    startDate: '2024-01-05',
    endDate: '2023-10-10',
    peopleCount: 1,
    technologies: ['Arduino', 'C++'],
    githubLinks: {
      project: 'https://github.com/tomekos11/heat_control_assistant',
    },
  },
  {
    slug: 'tic-tac-toe',
    i18nKey: 'tic-tac-toe',
    image: '/assets/icons/projects/tic-tac-toe.png',
    startDate: '2024-04-15',
    endDate: '2024-04-24',
    peopleCount: 1,
    technologies: ['Vue', 'PHP', 'Laravel', 'Bootstrap'],
    githubLinks: {
      project: 'https://github.com/tomekos11/tic-tac-toe',
    },
  },
  {
    slug: 'checkers',
    i18nKey: 'checkers',
    image: '/assets/icons/projects/checkers.png',
    startDate: '2023-12-04',
    endDate: '2024-12-19',
    peopleCount: 3,
    technologies: ['Vue', 'Quasar', 'Python', 'Django', 'Computer Vision', 'AI Integration', 'WebSocket'],
    githubLinks: {
      project: 'https://github.com/tomekos11/warcaby',
    },
  },
  {
    slug: 'voting-system',
    i18nKey: 'votingSystem',
    image: '/assets/icons/projects/voting-system.png',
    startDate: '2025-03-25',
    endDate: '2025-05-29',
    peopleCount: 2,
    technologies: ['Vue', 'Nuxt', 'Nuxt UI', 'Tailwind', 'Blockchain', 'MetaMask Integration', 'Node', 'Express', 'Prisma'],
    githubLinks: {
      frontend: 'https://github.com/tomekos11/voting-app-frontend',
      backend: 'https://github.com/tomekos11/voting-app-backend',
    },
  },
  {
    slug: 'keystroke-dynamics',
    i18nKey: 'keystrokeDynamics',
    image: '/assets/icons/projects/keystroke-dynamics.png',
    startDate: '2025-03-25',
    endDate: '2025-05-29',
    peopleCount: 2,
    technologies: ['Vue', 'Nuxt', 'Nuxt UI', 'Tailwind', 'Node', 'Nest.js', 'Typeorm', 'Python', 'GRPC'],
    githubLinks: {
      frontend: 'https://github.com/tomekos11/keystroke-dynamics-frontend',
      backend: 'https://github.com/Narelsiak/keystroke-dynamics-backend',
      'backend-2': 'https://github.com/Narelsiak/keystroke-dynamics-model',
    },
  },
  {
    slug: 'forum',
    i18nKey: 'forum',
    image: '/assets/icons/projects/forum.png',
    startDate: '2025-03-25',
    endDate: '2025-05-29',
    peopleCount: 2,
    technologies: ['Vue', 'Nuxt', 'Nuxt UI', 'Tailwind', 'Node', 'Adonis.js'],
    githubLinks: {
      frontend: 'https://github.com/tomekos11/forum-frontend',
      backend: 'https://github.com/tomekos11/forum-backend',
    },
  },
  {
    slug: 'web-attacks',
    i18nKey: 'webAttacks',
    image: '/assets/icons/projects/web-attacks.png',
    startDate: '2025-01-10',
    endDate: '2025-05-20',
    peopleCount: 2,
    technologies: ['Vue', 'Quasar', 'Node', 'Express', 'WebSocket'],
    githubLinks: {
      frontend: 'https://github.com/tomekos11/web-attacks-frontend',
      backend: 'https://github.com/tomekos11/web-attacks-backend',
    },
  },
  {
    slug: 'cv-site',
    i18nKey: 'cvSite',
    image: '/assets/icons/projects/cv-site.png',
    startDate: '2024-12-15',
    endDate: '2025-06-24',
    peopleCount: 1,
    technologies: ['Vue', 'Nuxt', 'Quasar UI', 'SEO'],
    githubLinks: {
      frontend: 'https://github.com/tomekos11/cv-site',
    },
  },
  {
    slug: 'ela',
    i18nKey: 'englishLearning',
    image: '/assets/icons/projects/gb_flag.jpg',
    startDate: '2023-03-13',
    endDate: '2023-06-05',
    peopleCount: 3,
    technologies: ['Vue', 'Laravel'],
    featuredOnHomepage: true,
    year: 2023,
  },
  {
    slug: 'dt',
    i18nKey: 'dtVisualization',
    image: '/assets/icons/projects/trees.webp',
    startDate: '2023-07-10',
    endDate: '2025-01-20',
    peopleCount: 1,
    technologies: ['Vue', 'Quasar', 'PHP', 'Laravel'],
    featuredOnHomepage: true,
    year: 2024,
  },
  {
    slug: 'ai-chat',
    i18nKey: 'AIchat',
    image: '/assets/icons/projects/czat.jpg',
    startDate: '2024-06-05',
    endDate: '2024-06-26',
    peopleCount: 1,
    technologies: ['Vue', 'Quasar', 'Java', 'Spring', 'AI Integration'],
    githubLinks: {
      project: 'https://github.com/tomekos11/spring-chat-AI',
    },
    featuredOnHomepage: true,
    year: 2024,
  },
  {
    slug: 'test-management',
    i18nKey: 'testManagement',
    image: '/assets/icons/projects/test.webp',
    startDate: '2024-06-11',
    endDate: '2024-06-29',
    peopleCount: 1,
    technologies: ['Java', 'Spring', 'Thymeleaf'],
    githubLinks: {
      frontend: 'https://github.com/tomekos11/spring-school-tests',
    },
    featuredOnHomepage: true,
    year: 2024,
  },
];

export function getProjectDefinitionBySlug(slug: string) {
  return projectDefinitions.find((project) => project.slug === slug);
}
