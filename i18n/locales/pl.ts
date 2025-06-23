export default {
  nav: {
    experience: 'Doświadczenie',
    education: 'Edukacja',
    technologies: 'Technologie',
    projects: 'Projekty',
    certificates: 'Certyfikaty',
    'back-to-cv': 'Wróć do CV',
  },

  seo: {
    description: 'Zapoznaj się z doświadczeniem Tomasza Słapińskiego, które obejmuje pracę w Polcar i Infra Team, modernizację stron, optymalizację SEO i wdrażanie technologii',
    ogDescription: 'Full-Stack Developer z 2-letnim doświadczeniem.',
    country: 'PL',
    baseSalary: 'Płaca podstawowa roczna',
    role: {
      description: 'Full-Stack Developer odpowiada za projektowanie, tworzenie i utrzymanie zarówno front-endu, jak i back-endu aplikacji internetowych. Wymaga to znajomości technologii klienckich (HTML, CSS, JavaScript, Vue/React) oraz serwerowych (Node.js, PHP, Python). Współpracuje z zespołem projektowym, tworzy API, zarządza bazami danych, dba o wydajność i jakość kodu. Kluczowe są tu elastyczność, umiejętność rozwiązywania problemów i praca w całym cyklu życia oprogramowania.'
    }
  },

  inquire: 'Napisz do mnie',
  downloadCv: 'Pobierz CV',
  myDescription: 'Rozwijający się Full Stack Developer, z zamiłowaniem do rozwiązywania problemów. Zawsze gotów na wyzwania, nieustannie dążący do doskonalenia swoich umiejętności.',
  

  fieldRequired: 'Pole {field} jest wymagane',

  inquiryModal: {
    title: 'Wyślij zapytanie',
    description: 'Uzupełnij formularz, aby skontaktować się z właścicielem CV.',
    name: 'Imie',
    surname: 'Nazwisko',
    company: 'Firma',
    content: 'Treść zapytania',
    send: 'Wyślij'
  },

  experience: {
    description: 'Domyślnie pokazany jest tylko skrótowy opis. Aby rozwinąć szczegółowe informacje, naciśnij na nazwę firmy',
    polcar: {
      shortDescription: 'Hurtownia części samochowych',
      date: 'Lipiec 2023 - obecnie',
    },
    nda: {
      name: 'Popularna firma, tworząca gry komputerowe',
      shortDescription: 'Zlecenie NDA',
      date: 'Marzec 2025 - Maj 2025',
    },
    infraTeam2: {
      shortDescription: 'System zarządzania wydarzeniami',
      date: 'Sierpień 2024 - Wrzesień 2024',
    },
    infraTeam1: {
      shortDescription: 'System obsługi konferencji',
      date: 'Lipiec 2023 - Maj 2024',
    }
  },

  // experience: {
  //   name: 'Popularna firma, tworząca gry komputerowe',
  //   date1: 'Lipiec 2023 - obecnie',
  //   date2: 'Sierpień 2024 - Wrzesień 2024',
  //   date3: 'Lipiec 2023 - Maj 2024',
  //   date4: 'Marzec 2025 - Maj 2025',
  // },

  education: {
    grade: 'Ocena',
    currently: 'obecnie',

    school1: {
      name: 'Zespół Szkół Elektronicznych (ZSE) w Rzeszowie',
      title: 'Technik Informatyk, Informatyka'
    },
    school2: {
      name: 'Politechnika Rzeszowska im. Ignacego Łukasiewicza',
      title: 'Inżynier (Inż.), Informatyka - Inżynieria oprogramowania',
    },
    school3: {
      name: 'Politechnika Rzeszowska im. Ignacego Łukasiewicza',
      title: 'Magister (Mgr), Informatyka - Cyberbezpieczeństwo i technologie chmurowe',
    }
  },

  technologies: {
    filter: 'Filtruj przez kategorię'
  },

  projects: {
    viewAllProjects: 'Zobacz wszystkie projekty',
    readMore: 'Czytaj więcej',

    checkers: {
      name: 'System do analizy gry w warcaby i podpowiedziach w czasie rzeczywistym',
      description: 'TODO.'
    },

    votingSystem: {
      name: 'System do głosowania',
      description: 'Projekt systemu głosowań wykorzystujący technologię blockchain (z integracją MetaMask) oraz serwer off-chain do tworzenia i przeprowadzania głosowań. Umożliwia bezpieczne tworzenie ankiet, weryfikowalne oddawanie głosów oraz zapewnia pełną integralność danych poprzez niezmienny zapis transakcji w sieci blockchain. Rozwiązanie łączy zalety decentralizacji (transparentność i odporność na manipulacje) z wydajnością obliczeń off-chain, umożliwiając testowanie w warunkach edukacyjnych i instytucjonalnych.'
    },

    keystrokeDynamics: {
      name: 'Keystroke Dynamics',
      description: 'Pozwala na rejestrowanie i przetwarzanie charakterystycznych cech pisania, takich jak czas naciskania i zwalniania klawiszy czy przerwy między znakami, co umożliwia tworzenie dodatkowej warstwy zabezpieczeń opartych na zachowaniu użytkownika. Rozwiązanie może być wykorzystywane do testowania i edukacji w zakresie nowoczesnych metod uwierzytelniania oraz oceny skuteczności biometrii behawioralnej w warunkach edukacyjnych.'
    },

    forum: {
      name: 'Forum o cyberbezpieczeństwie',
      description: 'Projekt forum internetowego obejmującego różne kategorie, tematy i posty, z możliwością zarządzania profilami użytkowników oraz panelem administratora. Umożliwia przypinanie, edycję i usuwanie postów, a także usuwanie kont i wykonywanie wszystkich standardowych operacji typowych dla nowoczesnych forów dyskusyjnych.'
    },

    webAttacks: {
      name: 'Narzędzie do wizualizacji ataków na aplikacje webowe',
      description: 'Projekt obejmował stworzenie narzędzia do wizualizacji ataków na aplikacje webowe z centralnym backendem (ExpressJS) oraz dwoma aplikacjami SSR (Nuxt i Quasar). Aplikacja prezentuje różne rodzaje ataków (XSS, CSRF, clickjacking, SQL injection, path traversal, command line injection) oraz umożliwia interaktywne testowanie i włączanie zabezpieczeń, poprzez dedykowane API. Rozwiązanie pozwala na analizę skuteczności ochrony w różnych środowiskach frontendowych.'
    },

    cvSite: {
      name: 'Strona z CV',
      description: 'Strona z CV została stworzona jako projekt rozwijający umiejętności tworzenia aplikacji SSR(Nuxt) oraz optymalizacji SEO. Jej celem jest umożliwienie każdemu łatwego znalezienia mojego profilu zawodowego w internecie oraz zapoznania się z moimi kompetencjami, technologiami, edukacją, certyfikatami i projektami.'
    },

    englishLearning: {
      name: 'Aplikacja do nauki języka angielskiego',
      description: 'Aplikacja do nauki języka angielskiego stworzona w technologii Vue.js (frontend) i Laravel (backend). Umożliwia interaktywne lekcje, quizy, zarządzanie postępami oraz personalizację materiałów, zapewniając dynamiczny i nowoczesny sposób nauki.'
    },
    dtVisualization: {
      name: 'Aplikacja do wizualizacji drzew decyzyjnych',
      description: 'Aplikacja do wizualizacji klasyfikatora drzew decyzyjnych umożliwia interaktywne przedstawienie struktury drzewa, w tym węzłów decyzyjnych, gałęzi oraz wyników klasyfikacji. Użytkownik może eksplorować działanie modelu, analizując kryteria podziałów, ważność cech oraz klasyfikacje dla danych wejściowych w intuicyjny i graficzny sposób.'
    },
    AIchat: {
      name: 'Aplikacja do konwersacji z wirtualnym asystentem',
      description: 'Aplikacja umożliwiająca prowadzenie rozmów z wirtualnym asystentem, zbudowana przy użyciu frameworka Spring i Java na backendzie oraz Vue.js z Quasar Framework na frontendzie. Aplikacja integruje się z OpenAI API, umożliwiając użytkownikom wymianę wiadomości, tworzenie konwersacji oraz udostępnianie wiadomości innym użytkownikom. Dzięki zaawansowanej integracji z OpenAI, aplikacja oferuje inteligentne odpowiedzi i asystencję w czasie rzeczywistym. Użytkownicy mogą również tworzyć, zarządzać wieloma konwersacjami i dzielić się wiadomościami za pomocą linków lub wybierając odbiorców z listy użytkowników.'
    },
    testManagement: {
      name: 'Aplikacja do tworzenia i zarządzania testami',
      description: 'Aplikacja stworzona z wykorzystaniem Spring Boot i Thymeleaf, zaprojektowana z myślą o nauczycielach, którzy mogą tworzyć, zarządzać testami oraz przypisywać je do użytkowników w wyznaczonych grupach. Aplikacja umożliwia użytkownikom rozwiązywanie testów w ramach grup, podobnie jak w środowisku uniwersyteckim. Użytkownicy mogą rozwiązywać zadania w wyznaczonym czasie, a nauczyciele mają dostęp do wyników i statystyk. Aplikacja oferuje również funkcje generowania wyników i raportów z wykonanych testów.'
    },
  },

  certificates: {
    issued: 'Wydany',
    expand: 'Rozwiń dodatkowe informacje o certyfikacie',
    showPhoto: 'Pokaż zdjęcie',
    openLink: 'Otwórz poświadczenie',
    credentialId: 'Identyfikator poświadczenia',
    cert1: {
      name: 'Budowanie Nowoczesnych Aplikacji Webowych',
      description: 'Certyfikat nabyty został podczas zajęć prowadzonych przez firmę SoftSystem w Politechnice Rzeszowskiej.'
    },
    cert2: {
      name: 'Analytics Academy - SQL',
      description: ''
    },
    cert3: {
      name: 'TOEIC Certyfikat osiągnięcia',
      description: 'Certyfikat stanowi potwierdzenie '
    },
    cert4: {
      name: 'Certyfikacja SEO',
      description: 'Ten kurs pomógł mi zrozumieć najlepsze praktyki optymalizacji SEO zarówno pod kątem technicznym, jak i tworzenia skutecznych treści. Nauczyłem się, jakie czynniki wpływają na SEO, czego unikać, aby nie zaszkodzić pozycji strony, oraz jak skutecznie monitorować i analizować postępy. Kurs pozwolił mi lepiej zarządzać widocznością stron w wyszukiwarkach i stosować sprawdzone strategie poprawiające ich ranking.'
    },
    cert5: {
      name: 'Ścieżka szkoleniowa Cloud Digital Leader',
      description: 'Cloud Digital Leader Learning Path pozwolił mi zrozumieć kluczowe koncepcje chmury oraz sposoby wykorzystania Google Cloud do wspierania cyfrowej transformacji organizacji. Dzięki kursowi nauczyłem się, jak technologie chmurowe wpływają na efektywność biznesową i jakie strategie wdrażać, by skutecznie zarządzać zmianą.'
    },
  }
};