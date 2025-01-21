export type Technology =  'Vue' | 'Quasar' | 'Nuxt'  | 'Laravel' | 'Java' | 'Spring' | 'Thymeleaf' | 'Python';

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