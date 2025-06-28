// export type Technology =  'Vue' | 'Quasar' | 'Nuxt'  | 'Laravel' | 'Java' | 'Spring' | 'Thymeleaf' | 'Python';

export const getTechColor = (tech: Technology) => {
  switch(tech) {
  case 'Vue': return 'green-7';
  case 'Laravel': return 'indigo-8';
  case 'Nuxt': return 'green-10';
  case 'Quasar': return 'blue-10';
  case 'Java': return 'amber-8';
  case 'Spring': return 'grey-9';
  case 'Thymeleaf': return 'primary';
  case 'Python': return 'indigo-10';
  }
};

export const technologies = ['Vue', 'Quasar', 'Nuxt', 'Nuxt UI', 'WebSocket', 'PHP', 'Laravel', 'Bootstrap', 'Python', 'Django', 'Computer Vision', 'AI Integration', 'Tailwind', 'Blockchain', 'MetaMask Integration', 'Node', 'Express', 'Prisma', 'Nest.js', 'Typeorm', 'GRPC', 'Java', 'Spring', 'Thymeleaf', 'Quasar UI', 'SEO', 'Arduino', 'C++', 'Adonis.js'] as const;

export type Technology = typeof technologies[number]
// export type Technology = 'Vue' | 'Quasar' | 'Nuxt' | 'Nuxt UI' | 'WebSocket' | 'PHP' | 'Laravel' | 'Bootstrap' | 'Python' | 'Django' | 'Computer Vision' | 'AI Integration' | 'Tailwind' | 'Blockchain' | 'MetaMask Integration' | 'Node' | 'Express' | 'Prisma' | 'Nest.js' | 'Typeorm' | 'GRPC' | 'Java' | 'Spring' | 'Thymeleaf' | 'Quasar UI' | 'SEO' | 'Arduino' | 'C++' | 'Adonis.js'

export const getTechClass = (tech: Technology) => {

  const frontendFrameworks: Technology[] = ['Vue'];
  const frontend2Frameworks: Technology[] = ['Nuxt', 'Quasar'];
  const uiFrameworks: Technology[] = ['Nuxt UI', 'Quasar UI', 'Thymeleaf'];
  const cssLibraries: Technology[] = ['Tailwind', 'Bootstrap'];

  const backendFrameworks: Technology[] = ['Express', 'Adonis.js', 'Nest.js', 'Express', 'Django', 'Laravel'];

  const jsTechs: Technology[] = ['WebSocket', 'Typeorm'];

  const backendLanguages: Technology[] = ['Python', 'Node', 'Python', 'C++', 'PHP'];

  const javaBackendFrameworks: Technology[] = ['Spring'];

  const integrations: Technology[] = ['AI Integration', 'MetaMask Integration'];

  // brakuje seo && computed-vision && blockchain

  if(frontendFrameworks.includes(tech)) return 't:!bg-slate-900 t:dark:!bg-slate-800';
  if(frontend2Frameworks.includes(tech)) return 't:!bg-slate-800 t:dark:!bg-slate-700';
  if(uiFrameworks.includes(tech)) return 't:!bg-slate-700 t:dark:!bg-slate-600';
  if(cssLibraries.includes(tech)) return 't:!bg-gray-900 t:dark:!bg-gray-700';

  if(backendFrameworks.includes(tech)) return 't:!bg-blue-700 t:dark:!bg-blue-700';
  if(jsTechs.includes(tech)) return 't:!bg-blue-600 t:dark:!bg-blue-600';

  if(backendLanguages.includes(tech)) return 't:!bg-blue-800 t:dark:!bg-blue-700';

};

