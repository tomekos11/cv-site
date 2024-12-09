<template>
  <h1 class="text-center fancy-text bg-grey-2">Experience</h1>

  <div v-if="$q.screen.gt.sm" class="work-history">
    <q-timeline color="primary" layout="loose">
      <q-timeline-entry
        v-for="(job, index) in workHistory"
        :key="index"
        :side="index % 2 === 0 ? 'left' : 'right'"
        :title="job.company"
        :header-class="'text-primary'"
      >
        <template #title>
          <div :class="`entry-header ${index % 2 === 0 ? 'justify-end' : ''}`">
            <q-img :src="job.logo" class="company-logo" />
            <div>
              <div class="text-bold">{{ job.company }}</div>
              <div class="text-caption">{{ job.dates }}</div>
            </div>
          </div>
        </template>
        <div>
          <q-expansion-item v-model:expanded="job.expanded" expand-separator :switch-toggle-side="index % 2 === 0"  >
            <template #header>
              <!-- <div>{{ job.shortDescription }}</div> -->
              <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
            </template>
            <div>
              <p>{{ job.longDescription }}</p>
            </div>
          </q-expansion-item>
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>

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

      <q-expansion-item v-model:expanded="job.expanded" expand-separator >
        <template #header>
          <!-- <div>{{ job.shortDescription }}</div> -->
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
        </template>
        <div>
          <p>{{ job.longDescription }}</p>
        </div>
      </q-expansion-item>
    </div>
  </div>
    
</template>

<script setup lang="ts">
import polcarLogo from 'assets/icons/companies/polcar.png';
import infraTeamLogo from 'assets/icons/companies/infrateam.jpg';

const workHistory = [
  {
    company: 'Polcar',
    logo: polcarLogo,
    dates: 'Lipiec 2023 - obecnie',
    shortDescription: 'Worked as a Software Developer.',
    longDescription: 'I was responsible for developing web applications using Vue.js and Quasar Framework, ensuring optimal performance and scalability. My role involved collaborating with cross-functional teams, mentoring junior developers, and contributing to agile workflows.',
    expanded: false,
  },
  {
    company: 'Infra Team',
    logo: infraTeamLogo,
    dates: 'Sierpień 2024 - Wrzesień 2024',
    shortDescription: 'Frontend Engineer focusing on UI/UX.',
    longDescription: 'My responsibilities included designing and implementing user interfaces that improved user experience by 40%. I worked closely with the design team to translate wireframes into high-quality code and ensured cross-browser compatibility.',
    expanded: false,
  },
  {
    company: 'Infra Team',
    logo: infraTeamLogo,
    dates: 'Lipiec 2023 - Maj 2024',
    shortDescription: 'Junior Web Developer.',
    longDescription: 'Started my career as a Junior Web Developer, building and maintaining responsive websites. Gained hands-on experience in JavaScript, CSS, and HTML, and participated in multiple projects that enhanced my understanding of modern web development practices.',
    expanded: false,
  },
];
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
</style>