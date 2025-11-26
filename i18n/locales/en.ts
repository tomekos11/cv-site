export default {
  aria: {
    open: 'Open menu',
    close: 'Close menu',
    about: 'about',
  },

  nav: {
    experience: 'Experience',
    education: 'Education',
    technologies: 'Technologies',
    projects: 'Projects',
    certificates: 'Certificates',
    'back-to-cv': 'Back to CV',
  },
  
  seo: {
    title: 'Tomasz Slapinski {\'|\'}  Fullstack Dev {\'|\'}  Vue {\'|\'}  Nuxt {\'|\'}  Rzeszow',
    description: 'Explore Tomasz Słapiński\'s work at Polcar and Infra Team – website modernization, SEO, advanced technologies',
    ogDescription: 'Full-Stack Developer with 3 years of experience',
    country: 'PL',
    baseSalary: 'Base salary',
    role: {
      description: 'A Full-Stack Developer is responsible for designing, developing, and maintaining both front-end and back-end parts of web applications. This role requires knowledge of client-side technologies (HTML, CSS, JavaScript, Vue/React) as well as server-side ones (Node.js, PHP, Python). They collaborate with the project team, build APIs, manage databases, and ensure performance and code quality. Flexibility, problem-solving skills, and the ability to work across the full software development lifecycle are essential in this role.'
    },

    projectsList: {
      title: 'Projects {\'|\'} Tomasz Slapinski',
      description: 'Browse projects by Tomasz Słapiński – from web applications and security tools to educational solutions and advanced real-time data analysis systems',
      collection: {
        name: 'Tomasz Słapiński\'s Project List',
        description: 'A collection of web projects, tools, and applications created by Tomasz Słapiński',
        url: 'https://cv.tomasz-slapinski.pl/en/projects-list',
      }
    }
  },

  inquire: 'Send Inquiry',
  downloadCv: 'Download CV',
  myDescription: 'Evolving Full Stack Developer with a passion for problem-solving. Always ready for new challenges, constantly striving to refine and enhance skills.',

  fieldRequired: 'Field {field} is required',

  inquiryModal: {
    title: 'Send Inquiry',
    description: 'Fill out the form to contact the CV owner.',
    name: 'Name',
    surname: 'Surname',
    company: 'Company',
    content: 'Inquiry content',
    send: 'Send'
  },


  experience: {
    description: 'By default, only a brief description is shown. To view detailed information, click on the company name.',
    polcar: {
      shortDescription: 'Wholesale distributor of car parts',
      date: 'July 2023 - Present',
    },
    nda: {
      name: 'Well-known company developing computer games',
      shortDescription: 'NDA project',
      date: 'March 2025 - May 2025',
    },
    infraTeam2: {
      shortDescription: 'Event management system',
      date: 'August 2024 - September 2024',
    },
    infraTeam1: {
      shortDescription: 'Conference management system',
      date: 'July 2023 - May 2024',
    }
  },

  education: {
    grade: 'Grade',
    currently: 'currently',

    school1: {
      name: 'Electronic Schools Complex in Rzeszów',
      title: 'IT Technician, Computer Science'
    },
    school2: {
      name: 'Rzeszów University of Technology',
      title: 'Bachelor\'s Degree in Computer Science – Software Engineering'
    },
    school3: {
      name: 'Rzeszów University of Technology',
      title: 'Master\'s Degree in Computer Science – Cybersecurity and Cloud Technologies'
    }
  },

  technologies: {
    filter: 'Filter by category'
  },

  projects: {
    viewAllProjects: 'View All Projects',
    readMore: 'Read more',
    description: 'On this subpage, you will find most of the projects that I have created or co-created.',

    'heat-control-assistant': {
      name: 'Heat Control Assistant',
      description: 'Heat Control Assistant is a project designed to help manage temperature in homes or offices. The system sends notifications about when to feed the boiler and informs users about temperature changes, saving time and increasing convenience.'
    },

    'tic-tac-toe': {
      name: 'Tic-Tac-Toe Game',
      description: 'The "Tic-Tac-Toe Game" application was developed as a university project. It allows users to play against a bot, with each match result being saved to a database.'
    },

    checkers: {
      name: 'System for analyzing checkers games and providing real-time suggestions',
      description: 'A real-time checkers game analysis application utilizing computer vision techniques and AI to recognize the position of pieces on the board. The system automatically tracks the course of the game and generates move suggestions for various game modes. The solution provides educational support and strategy analysis, enabling interactive skill improvement for players.'
    },

    votingSystem: {
      name: 'Voting System',
      description: 'A voting system project leveraging blockchain technology (with MetaMask integration) and an off-chain server for creating and conducting polls. It enables secure poll creation, verifiable vote casting, and ensures full data integrity through immutable transaction recording on the blockchain. The solution combines decentralization advantages (transparency and tamper-resistance) with off-chain computational efficiency, supporting testing in educational and institutional environments.'
    },

    keystrokeDynamics: {
      name: 'Keystroke Dynamics',
      description: 'A behavioral biometrics system analyzing individual typing patterns on a keyboard. It enables recording and processing unique writing characteristics – including key press/release durations, inter-key intervals, and typing rhythms – to create an additional security layer based on user behavior. The solution supports testing and educational applications for modern authentication methods, allowing evaluation of behavioral biometric effectiveness in academic environments.'
    },

    forum: {
      name: 'Cybersecurity Forum',
      description: 'An internet forum project encompassing various categories, topics, and posts, with user profile  management and an admin panel. It allows pinning, editing, and deleting posts, as well as deleting accounts and performing all standard operations typical of modern discussion forums.'
    },

    webAttacks: {
      name: 'Tool for visualizing attacks on web applications',
      description: ' The project involved developing a tool for visualizing web application attacks, featuring a central backend (ExpressJS) and two server-side rendered (SSR) applications built with Nuxt and Quasar. The solution demonstrates various attack types – including XSS, CSRF, clickjacking, SQL injection, path traversal, and command line injection – while enabling interactive testing and activation of security measures through a dedicated API. This setup allows comparative analysis of protection effectiveness across different frontend environments.'
    },

    cvSite: {
      name: 'CV site',
      description: 'The CV website was created as a project to develop my skills in building SSR (Nuxt) applications and SEO optimization. Its purpose is to make it easy for anyone to find my professional profile online and learn about my competencies, technologies, education, certifications, and projects.'
    },

    englishLearning: {
      name: 'English Learning Application',
      description: 'An English learning application built using Vue.js (frontend) and Laravel (backend). It offers interactive lessons, quizzes, progress tracking, and content customization, providing a dynamic and modern approach to language learning.'
    },
    dtVisualization: {
      name: 'Decision Tree Visualization Application',
      description: 'An application for visualizing decision tree classifiers, allowing interactive representation of tree structures, including decision nodes, branches, and classification outcomes. Users can explore model functionality by analyzing split criteria, feature importance, and classifications for input data in an intuitive and graphical manner.'
    },
    AIchat: {
      name: 'Virtual Assistant Chat Application',
      description: 'A chat application for conversing with a virtual assistant, built using the Spring framework and Java on the backend, and Vue.js with the Quasar Framework on the frontend. The application integrates with the OpenAI API, enabling users to exchange messages, create conversations, and share messages with others. Thanks to advanced OpenAI integration, the application provides intelligent real-time responses and assistance. Users can also manage multiple conversations and share messages via links or by selecting recipients from a user list.'
    },
    testManagement: {
      name: 'Test Creation and Management Application',
      description: 'An application developed using Spring Boot and Thymeleaf, designed for educators to create, manage, and assign tests to users in designated groups. Users can take tests within their groups, similar to a university environment. The application allows users to complete tasks within a specified timeframe, while teachers have access to results and statistics. Additional features include result generation and report creation for completed tests.'
    },
  },

  certificates: {
    issued: 'Issued',
    expand: 'Expand for additional certificate details',
    showPhoto: 'Show photo',
    openLink: 'View Certificate',
    credentialId: 'Credential ID',
    cert1: {
      name: 'Building Modern Web Applications',
      description: 'Certificate obtained during training sessions conducted by SoftSystem at Rzeszów University of Technology.'
    },
    cert2: {
      name: 'Analytics Academy - SQL',
      description: ''
    },
    cert3: {
      name: 'TOEIC Certificate of Achievement',
      description: 'The TOEIC (Test of English for International Communication) is a standardized English test designed for professionals and businesses. It consists of two separate tests: one assessing receptive English skills (reading and listening) and the other assessing productive English skills (speaking and writing).'
    },
    cert4: {
      name: 'SEO Certification',
      description: 'This course helped me understand the best SEO optimization practices, both from a technical perspective and in terms of creating effective content. I learned which factors influence SEO, what to avoid to prevent harming a website’s ranking, and how to effectively monitor and analyze progress. The course enabled me to better manage website visibility in search engines and apply proven strategies to improve rankings.'
    },
    cert5: {
      name: 'Cloud Digital Leader Learning Path',
      description: 'Cloud Digital Leader Learning Path helped me understand the key concepts of cloud computing and how to use Google Cloud to support an organization’s digital transformation. Through the course, I learned how cloud technologies impact business efficiency and which strategies to implement for effective change management.'
    },
    cert6: {
      name: '',
      description: 'During the "OWASP Top 10 Minutes Hack" course, I explored the most critical cybersecurity threats according to the OWASP Top 10. I practically exercised attacks such as Broken Access Control, Injection, Security Misconfiguration, and other common vulnerabilities. I learned to identify and secure applications against JWT attacks, deserialization flaws, and weak hash algorithms. Finally, I became familiar with Vibe Coding principles with a focus on security in the context of artificial intelligence.'
    },
    cert7: {
      name: '',
      description: 'During the Certified Mid-Level Vue.js Developer course, I confirmed my skills in building components and applications with Vue while discovering several new aspects I hadn\`t fully known before. The course covered advanced state management techniques, performance optimization, and best practices for creating scalable Vue.js applications. This deepened my understanding of Vue 3\`s capabilities and improved my ability to build efficient and maintainable web applications.'
    },
  },

  projectsList: {
    sort: 'Sorting',
    filter: 'Filtering',
    choose: 'Choose the repository whose code you want to view',
    wholeProject: 'Whole project',
    sortingOptions: {
      fromTheNewest: 'Newest first',
      fromTheOldest: 'Oldest first'
    }
  },

  faq: {
    1: {
      question: 'What technologies does Tomasz Słapiński use?',
      answer: 'I specialize in JavaScript, Vue.js, Quasar, Nuxt, Node.js, PHP, Laravel, and modern frontend and backend web technologies.'
    },
    2: {
      question: 'Which companies has Tomasz Słapiński worked for?',
      answer: 'I gained experience at companies like Polcar and Infra Team, where I implemented advanced systems and modernized websites.'
    },
    3: {
      question: 'What are Tomasz’s main areas of specialization?',
      answer: 'I focus on full-stack development, SEO, implementing new technologies, and modernizing existing web applications.'
    },
    4: {
      question: 'Does Tomasz have experience working in a team?',
      answer: 'Yes, I collaborate with project teams to effectively complete tasks and apply best practices in software development.'
    },
    5: {
      question: 'Where can I find Tomasz Słapiński’s portfolio?',
      answer: 'My portfolio and project details are available at https://cv.tomasz-slapinski.pl in the “Projects” section.'
    },
    6: {
      question: 'Does Tomasz work with backend technologies?',
      answer: 'Yes, I build APIs and backend services using Node.js and PHP (primarily Laravel), often integrated with frontend apps in Nuxt.'
    },
    7: {
      question: 'Does Tomasz deploy applications to production?',
      answer: 'Yes, I have experience with Docker-based deployments, SSR apps, and setting up hosting environments and CI/CD pipelines.'
    },
    8: {
      question: 'Which programming languages does Tomasz use?',
      answer: 'Mainly JavaScript and TypeScript — both on the frontend (Vue, Nuxt) and the backend (Node.js).'
    },
    9: {
      question: 'Does Tomasz hold any industry certifications?',
      answer: 'Yes, I hold certifications confirming my skills, which you can find in the "Certificates" section of my online CV.'
    },
    10: {
      question: 'Does Tomasz care about SEO?',
      answer: 'Yes, SEO optimization is an integral part of my projects. I build SSR apps following best practices for search engines.'
    }
  }
};