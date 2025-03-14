<template>
  <div ref="title">
    <h1 class="text-center fancy-text bg-grey-2">Experience</h1>

    <q-timeline v-if="isDesktop" color="primary" layout="loose" class="q-pa-lg work-history">
      <q-timeline-entry
        v-for="(job, index) in workHistory"
        :key="index"
        :side="index % 2 === 0 ? 'left' : 'right'"
        :title="job.company"
        :header-class="'text-primary'"
      >
        <template #title>
          <div :class="`entry-header ${index % 2 === 0 ? 'justify-end' : ''}`">
            <img :src="job.logo" class="company-logo" >
            <div>
              <div class="text-bold">{{ job.company }}</div>
              <div class="text-caption">{{ job.dates }}</div>
            </div>
          </div>
        </template>
        <div>
          <div class="text-justify" v-html="job.description" />
        </div>
      </q-timeline-entry>
    </q-timeline>

    <div v-else>
      <div
        v-for="(job, index) in workHistory"
        :key="index"
        class="q-mb-lg"
      >
        <div class="entry-header q-px-xl">
          <q-img :src="job.logo" class="company-logo" />
          <div>
            <div class="text-bold">{{ job.company }}</div>
            <div class="text-caption">{{ job.dates }}</div>
          </div>
        </div>

        <div class="q-px-sm" v-html="job.description" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isDesktop = ref(true);

if (import.meta.server) {
  const userAgent = useRequestHeaders(['user-agent'])['user-agent'] || '';
  isDesktop.value = !/Mobile|Android|iP(ad|hone)/i.test(userAgent);
} else {
  // Klient: aktualizacja szerokości ekranu
  const updateWidth = () => {
    isDesktop.value = window.innerWidth > 800;
  };
  window.addEventListener('resize', updateWidth);
  updateWidth();
}

const workHistory = [
  {
    company: 'Polcar',
    logo: '/assets/icons/companies/polcar.png',
    dates: 'Lipiec 2023 - obecnie',
    description: '<p><strong>Polcar</strong> to hurtownia części samochodowych, która zarządza stronami internetowymi dla partnerów. W ramach mojej roli realizowałem następujące zadania:</p> \
          <ul> \
            <li>Aktualizowałem i usprawniałem strony internetowe producentów części, koncentrując się na responsywności, wdrażaniu powiadomień o ciasteczkach, ulepszaniu map oraz aktualizowaniu wersji oprogramowania.</li> \
            <li>Tworzyłem dynamiczną dokumentację dla obszernego API, co ułatwiało szybkie lokalizowanie problemów.</li> \
            <li>Opracowałem aplikację do wizualizacji logów dla różnych typów dzienników, rozwijając swoje umiejętności w zakresie wyrażeń regularnych.</li> \
            <li>Zbudowałem system CMS dla stron internetowych producentów.</li> \
            <li>Aktualnie prowadzę proces refaktoryzacji frontendu projektu katalogowego z użyciem frameworka Quasar.</li> \
          </ul>',
    shortDescription: 'Worked as a Software Developer.',
    longDescription: 'I was responsible for developing web applications using Vue.js and Quasar Framework, ensuring optimal performance and scalability. My role involved collaborating with cross-functional teams, mentoring junior developers, and contributing to agile workflows.',
    expanded: false,
  },
  {
    company: 'Infra Team',
    logo: '/assets/icons/companies/infrateam.jpg',
    dates: 'Sierpień 2024 - Wrzesień 2024',
    description: 'Cemex to globalny lider w branży materiałów budowlanych, a InfraTeam współpracuje z nimi w zakresie zaawansowanych rozwiązań technologicznych. Zostałem zaproszony do współpracy nad projektem stworzenia systemu zarządzania użytkownikami i organizacją wydarzeń.',
    shortDescription: 'Frontend Engineer focusing on UI/UX.',
    longDescription: 'My responsibilities included designing and implementing user interfaces that improved user experience by 40%. I worked closely with the design team to translate wireframes into high-quality code and ensured cross-browser compatibility.',
    expanded: false,
  },
  {
    company: 'Infra Team',
    logo: '/assets/icons/companies/infrateam.jpg',
    dates: 'Lipiec 2023 - Maj 2024',
    description: '<p>W ramach mojej roli w <strong>InfraTeam</strong> byłem odpowiedzialny za projektowanie i rozwój strony internetowej dla najnowszego projektu – <strong>InfraDays</strong>, będącego expo oraz multi-konferencją poświęconą inżynierii i technologiom wykorzystywanym w projektowaniu, budowie i utrzymaniu infrastruktury liniowej. W trakcie realizacji projektu:</p> \
    <ul> \
        <li>Tworzyłem responsywny interfejs użytkownika, wykorzystując <strong>Vue.js</strong>, <strong>Bootstrap</strong>, a później <strong>Quasar</strong>.</li> \
        <li>Optymalizowałem czas ładowania strony, co pozwoliło na płynne działanie serwisu przy dużym natężeniu ruchu.</li> \
    </ul>',
    shortDescription: 'Junior Web Developer.',
    longDescription: 'Started my career as a Junior Web Developer, building and maintaining responsive websites. Gained hands-on experience in JavaScript, CSS, and HTML, and participated in multiple projects that enhanced my understanding of modern web development practices.',
    expanded: false,
  },
];


const title = useTemplateRef('title');

onMounted(() => {
  const intersection = useHeaderIntersectionObserver();
  intersection.createObserver(title.value, 'experience');
});

</script>

<style>
.work-history {
  max-width: 1000px;
  margin: auto;
}

.company-logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
}

.entry-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.q-expansion-item {
  margin-top: 10px;
}

@media (min-width: 800px) {
  .work-history {
    max-width: 1000px;
    margin: auto;
  }
}
</style>