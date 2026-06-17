import type { JobSlug } from '~/composables/useCvData';

export interface JobDescriptionContent {
  paragraphs: string[];
  bullets?: string[];
}

export const cvJobDescriptions: Record<'pl' | 'en', Record<JobSlug, JobDescriptionContent>> = {
  pl: {
    polcar: {
      paragraphs: [
        'Odpowiadam za rozwój i utrzymanie katalogu części samochodowych oraz rozbudowanej platformy B2B. Projektuję i wdrażam nowe funkcjonalności wspierające procesy biznesowe, a także optymalizuję istniejące rozwiązania pod kątem wydajności i użyteczności. Tworzę i rozwijam dedykowane serwisy internetowe dla producentów oraz partnerów biznesowych, dbając o ich integrację z systemami firmy i spójność całego ekosystemu aplikacji.',
      ],
    },
    'infra-team': {
      paragraphs: [
        'Odpowiadałem za projektowanie i rozwój platformy internetowej dla InfraDays – wydarzenia branżowego łączącego expo i konferencję dla sektora infrastrukturalnego. Projektowałem i rozwijałem nowoczesny, responsywny interfejs użytkownika z wykorzystaniem Vue.js, Bootstrap i Quasar. Optymalizowałem wydajność aplikacji oraz czas ładowania strony, zapewniając wysoką dostępność i płynne działanie przy dużym ruchu użytkowników. Współtworzyłem architekturę frontendową oraz wdrażałem rozwiązania poprawiające UX i skalowalność serwisu.',
      ],
    },
    cemex: {
      paragraphs: [
        'Współtworzyłem system zarządzania użytkownikami oraz organizacją wydarzeń dla CEMEX, realizowany przez StormCode. Odpowiadałem za rozwój kluczowych funkcjonalności aplikacji wspierającej zarządzanie procesami biznesowymi, zasobami oraz koordynację wydarzeń na poziomie organizacyjnym.',
      ],
    },
    nda: {
      paragraphs: [],
    },
  },
  en: {
    polcar: {
      paragraphs: [
        'I am responsible for developing and maintaining the automotive parts catalog and an extensive B2B platform. I design and implement new features that support business processes and optimize existing solutions for performance and usability. I create and develop dedicated web services for manufacturers and business partners, ensuring their integration with the company\'s systems and consistency across the entire application ecosystem.',
      ],
    },
    'infra-team': {
      paragraphs: [
        'I was responsible for designing and developing the web platform for InfraDays – an industry event combining an expo and conference for the infrastructure sector. I designed and developed a modern, responsive user interface using Vue.js, Bootstrap, and Quasar. I optimized application performance and page load times, ensuring high availability and smooth operation under heavy user traffic. I co-created the frontend architecture and implemented solutions that improved UX and service scalability.',
      ],
    },
    cemex: {
      paragraphs: [
        'I co-developed a user and event management system for CEMEX, delivered by StormCode. I was responsible for developing key application features supporting business process management, resource allocation, and event coordination at the organizational level.',
      ],
    },
    nda: {
      paragraphs: [],
    },
  },
};
