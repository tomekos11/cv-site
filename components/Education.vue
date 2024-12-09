<template>
  <h1 class="text-center fancy-text bg-grey-2">Edukacja</h1>
  <div class="education-section">
    <q-list class="education-list">
      <q-item v-for="school in education" :key="school.when" class="education-item">
        <q-item-section>
          <div class="d-flex align-center school">
            <q-img :src="school.img" alt="school logo" class="school-logo" fit="scale-down"/>
            <div class="school-info">
              <div class="school-name">{{ school.name }}</div>
              <div class="school-title">{{ school.title }}</div>
              <div class="school-period">{{ school.when }}</div>
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
  
<script setup lang="ts">
import przLogo from 'assets/icons/companies/prz.png';
import zseLogo from 'assets/icons/companies/zse.svg';
  
const education = [
  {
    name: 'Politechnika Rzeszowska im. Ignacego Łukasiewicza',
    when: '10/2021 - 02/2025',
    title: 'Inżynier (Inż) Informatyka',
    img: przLogo
  },
  {
    name: 'Zespół Szkół Elektronicznych (ZSE) w Rzeszowie',
    when: '09/2017 - 06/2021',
    title: 'Technik Informatyk, Informatyka',
    img: zseLogo
  }
];
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
    transition: all 0.3s ease;
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
  }
  </style>
  