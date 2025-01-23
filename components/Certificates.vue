<template>
  <h1 class="text-center fancy-text bg-grey-2">Certificates</h1>
  <div class="education-section">
    <q-list class="education-list">
      <q-item v-for="(cert, index) in certificates" :key="index" class="education-item">
        <q-item-section>
          <div class="d-flex align-center school">
            <img :src="cert.companyImage" alt="company logo" class="school-logo" style="object-fit: scale-down;" >
            <div class="school-info full-width">
              <div class="d-flex justify-between">
                <div class="school-name">{{ cert.name }}</div>
                <div>
                  <q-btn v-if="cert.link" round class="q-mr-sm" size="xs" :href="cert.link" target="_blank">
                    <Icon name="fa-solid:external-link-alt" style="color: #2c3e50" size="0.8rem" />
                    <q-tooltip class="bg-dark" :delay="400" max-width="300px">
                      Otwórz poświadczenie
                    </q-tooltip>
                  </q-btn>

                  <q-btn v-if="cert.image" round size="xs" @click="openModal(cert)">
                    <Icon name="pepicons-pop:photo-camera" style="color: #2c3e50" class="q-pa-sm" size="1rem"/>
                    <q-tooltip class="bg-dark" :delay="400" max-width="300px">
                      Pokaż zdjęcie
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
              <div class="school-title">{{ cert.company }}</div>
              <div class="school-period">Wydany {{ cert.receivedDate }}</div>
              <div v-if="cert.identifier" class="school-period">Identyfikator poświadczenia {{ cert.identifier }}</div>
              
              <q-expansion-item
                icon="star"
                label="Rozwiń nabyte umiejętności"
                header-class="text-amber-10"
                dense
              >
                <q-card class="bg-grey-1">
                  <q-card-section>
                    <div class="d-flex justify-center q-mb-sm gap-5">
                      <template v-for="technology in cert.skills" :key="technology">
                        <technologies-badge :technology="technology" />
                      </template>
                    </div>

                    <p v-if="cert.description">
                      {{ cert.description }}
                    </p>
                    
                  </q-card-section>
                </q-card>
              </q-expansion-item>
      
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <q-dialog v-model="showModal">
    <q-card style="max-width: min(1200px, 100%); width: 100%; max-height: 90svh;">
      <q-card-section>
        <img :src="modalImage" :alt="modalImage" style="object-fit: cover;" >
      </q-card-section>
      <q-card-actions>
        <q-btn label="Close" color="primary" @click="showModal = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
  
<script setup lang="ts">
import type { Technology } from '~/helpers/technology';

interface Certificate {
    name: string;
    company: string;
    receivedDate: string;
    skills: Technology[];
    companyImage: string;
    image?: string;
    identifier?: string;
    link?: string;
    description?: string;
}

const showModal = ref(false);
const modalImage = ref('');

const certificates: Certificate[] = [
  {
    name: 'Building Modern Web Applications',
    company: 'SoftSystem Sp. z.o.o',
    receivedDate: '2023-05',
    skills: ['Vue', 'Python'],
    companyImage: '/assets/icons/companies/softsystem.jpg',
    image: '/assets/icons/companies/softsystem.jpg',
    description: 'Certyfikat nabyty został podczas zajęć prowadzonych przez firmę SoftSystem w Politechnice Rzeszowskiej.'
  },
  {
    name: 'TOEIC Certificate of achievement',
    company: 'ETS',
    receivedDate: '2024-01',
    skills: ['English C1'],
    companyImage: '/assets/icons/companies/ets.jpg',
    image: '/assets/icons/certificates/toeic.jpg',
    identifier: '776460',
    link: 'https://www.etsglobal.org/fr/en/digital-score-report/E82351FEC236574022D93D920C6A29DD1F27DA6347D454A35F19C46A8084FBB4cnFwWjVjKzFPWnArVnlXQnA2VDdsRmZFbGJoNmp5UC9Bazk2M3FwSThoTjJva1Rs',
    description: 'Certyfikat nabyty został podczas zajęć prowadzonych przez firmę SoftSystem w Politechnice Rzeszowskiej.'
  },
];

const openModal = (certificate: Certificate) => {
  if(!certificate.image) return;

  modalImage.value = certificate.image;
  showModal.value = true;
};
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
    width: min(100px, 100%);
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
  