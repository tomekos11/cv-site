<template>
  <section ref="section">
    <h1 class="text-center fancy-text bg-grey-2">{{ $t('nav.experience') }}</h1>

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

        <div class="q-px-lg" v-html="job.description" />
      </div>
    </div>
  </section>
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
    description: '<p><strong>Polcar</strong> to jedna z największych i najbardziej dynamicznych hurtowni części samochodowych w Europie.</p> \
          <p>Jako członek działu innowacji i rozwoju oprogramowania odpowiadam za webowe aspekty firmy – od modernizacji stron i katalogów części po optymalizację wydajności, SEO i wdrażanie nowoczesnych technologii, które kształtują cyfrową przyszłość firmy.</p> \
          <ul> \
            <li>Doprowadzam kluczowe projekty firmy do nowoczesnej formy, dbając o ich bezpieczeństwo, responsywność oraz wydajność. Moje działania zapewniają długoterminową stabilność i lepsze doświadczenie użytkownika.</li> \
            <li>Wdrażam asynchroniczne komponenty i SSR (Server-Side Rendering), co znacząco poprawia szybkość ładowania stron oraz ich efektywność operacyjną, zapewniając płynne działanie systemów Polcar.</li> \
            <li>Zoptymalizowałem strony pod kątem SEO, co przełożyło się na wyższe pozycje w wynikach wyszukiwania i zwiększenie ruchu organicznego, a także lepszą konwersję użytkowników.</li> \
            <li>Stworzyłem dedykowany system zarządzania treścią (CMS), umożliwiający kontrahentom firmy sprawne zarządzanie treściami i aktualizowanie stron, co usprawnia procesy i zwiększa efektywność obsługi partnerów biznesowych.</li> \
            <li>Prowadzę modernizację frontendu katalogu części Polcar, wykorzystując framework Quasar, co zapewnia większą skalowalność, wydajność oraz łatwiejszy dalszy rozwój projektu.</li> \
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


const section = useTemplateRef('section');

onMounted(() => {
  const { registerSection } = useActiveSection();
  registerSection('experience', section);
});

</script>

<style>
.work-history {
  max-width: 1120px;
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
    max-width: 1120px;
    margin: auto;
  }
}
</style>