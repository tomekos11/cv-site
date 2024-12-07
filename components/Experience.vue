<template>
  <div class="work-history">
    <q-timeline color="primary">
      <q-timeline-entry
        v-for="(job, index) in workHistory"
        :key="index"
        :side="index % 2 === 0 ? 'left' : 'right'"
        :title="job.company"
        :subtitle="job.dates"
        :header-class="'text-primary'"
      >
        <div class="entry-header">
          <q-img :src="job.logo" class="company-logo" />
          <div>
            <div class="text-bold">{{ job.company }}</div>
            <div class="text-caption">{{ job.dates }}</div>
          </div>
        </div>
        <q-expansion-item v-model:expanded="job.expanded" expand-separator>
          <template #header>
            <div>{{ job.shortDescription }}</div>
          </template>
          <div>
            <p>{{ job.longDescription }}</p>
          </div>
        </q-expansion-item>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script setup lang="ts">
const workHistory = [
  {
    company: 'Company A',
    logo: 'https://via.placeholder.com/50',
    dates: 'Jan 2020 - Dec 2022',
    shortDescription: 'Worked as a Software Developer.',
    longDescription: 'I was responsible for developing web applications using Vue.js and Quasar Framework, ensuring optimal performance and scalability. My role involved collaborating with cross-functional teams, mentoring junior developers, and contributing to agile workflows.',
    expanded: false,
  },
  {
    company: 'Company B',
    logo: 'https://via.placeholder.com/50',
    dates: 'Feb 2018 - Dec 2019',
    shortDescription: 'Frontend Engineer focusing on UI/UX.',
    longDescription: 'My responsibilities included designing and implementing user interfaces that improved user experience by 40%. I worked closely with the design team to translate wireframes into high-quality code and ensured cross-browser compatibility.',
    expanded: false,
  },
  {
    company: 'Company C',
    logo: 'https://via.placeholder.com/50',
    dates: 'Jul 2015 - Jan 2018',
    shortDescription: 'Junior Web Developer.',
    longDescription: 'Started my career as a Junior Web Developer, building and maintaining responsive websites. Gained hands-on experience in JavaScript, CSS, and HTML, and participated in multiple projects that enhanced my understanding of modern web development practices.',
    expanded: false,
  },
];
</script>

<style>
.work-history {
  max-width: 800px;
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