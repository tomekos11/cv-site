<template>
  <section ref="section">
    <h1 class="text-center fancy-text bg-grey-2">Edukacja</h1>
    <div class="education-section">
      <q-list class="education-list">
        <q-item
          v-for="(school, index) in education"
          :key="school.when"
          ref="educationItems"
          class="education-item"
          :class="{ visible: visibleItems.includes(index) }"
        >
          <q-item-section>
            <div class="d-flex align-center school">
              <img :src="school.img" alt="school logo" class="school-logo" style="object-fit: scale-down" loading="lazy">
              <div class="school-info">
                <div class="school-name">{{ school.name }}</div>
                <div class="school-title">{{ school.title }}</div>
                <div v-if="school.mark" class="school-title">Ocena: {{ school.mark }}</div>
                <div class="school-period">
                  {{ school.when }}
                  <span v-if="school.status === 'ongoing'" class="text-orange-10">
                    (obecnie)
                  </span>
                  <q-icon v-else name="done" color="green-10" />
                </div>
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </section>
</template>
  
<script setup lang="ts">
import type { QItem } from 'quasar';

import { useIntersectionObserver } from '@vueuse/core';

  
const education = [
  {
    name: 'Politechnika Rzeszowska im. Ignacego Łukasiewicza',
    when: '02/2025 - 07/2026',
    title: 'Magister (Mgr), Informatyka - Cyberbezpieczeństwo i technologie chmurowe',
    img: '/assets/icons/companies/prz.png',
    status: 'ongoing'
  },
  {
    name: 'Politechnika Rzeszowska im. Ignacego Łukasiewicza',
    when: '10/2021 - 02/2025',
    title: 'Inżynier (Inż.), Informatyka - Inżynieria oprogramowania',
    img: '/assets/icons/companies/prz.png',
    mark: '5.0',
    status: 'ended'
  },
  {
    name: 'Zespół Szkół Elektronicznych (ZSE) w Rzeszowie',
    when: '09/2017 - 06/2021',
    title: 'Technik Informatyk, Informatyka',
    img: '/assets/icons/companies/zse.svg',
    status: 'ended'
  }
];

const visibleItems = ref<number[]>([]);
const educationItems = ref<InstanceType<typeof QItem>[]>([]);

onMounted(() => {
  educationItems.value.forEach((el, index) => {
    const { stop } = useIntersectionObserver(
      el,
      ([entry]) => {
        console.log(entry.isIntersecting);
        if (entry.isIntersecting) {
          visibleItems.value.push(index);
          stop();
        }
      },
      { threshold: 0.01 }
    );
  });
});

const section = useTemplateRef('section');

onMounted(() => {
  const { registerSection } = useActiveSection();
  registerSection('education', section);
});


</script>
  
  <style scoped>
  .education-section {
    padding: 30px;
    max-width: 1000px;
    margin-inline: auto;
  }
  
  .education-list {
    margin-top: 20px;
  }

  .education-item {
  background-color: #f9f9f9;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.6s ease, opacity 0.6s ease;
  transform: translateX(-100%);
  opacity: 0;
}

.education-item.visible {
  transform: translateX(0);
  opacity: 1;
}
  
  .school-logo {
    width: min(150px, 100%);
    margin-right: 15px;
  }
  
  .school-info {
    display: flex;
    flex-direction: column;
  }
  
  .school-name {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }
  
  .school-title {
    font-style: italic;
    margin-top: 5px;
    color: #555;
  }
  
  .school-period {
    margin-top: 5px;
    color: #777;
  }

  @media(max-width: 500px) {
    .school-logo {
      margin-right: 0;
      margin-bottom: 10px;
      width: 100%;
    }
    .school {
      flex-direction: column;
    }

    .education-item {
      transform: translateX(0);
      opacity: 1;
    }
  }
  </style>
  