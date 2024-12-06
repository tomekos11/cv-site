<template>
  <div class="q-pt-sm">
    <h1 class="text-center fancy-text">Certificates</h1>
    
    <div class="row">
      <div class="col-12 offset-sm-1 col-sm-10 col-md-6 offset-md-3">
        <q-list>
          <!-- Pętla po elementach listy -->
          <template v-for="(item, index) in items" :key="index">
            <!-- Zawartość każdego elementu listy -->
            <q-item>
              <q-item-section>
                <q-item-label class="cert-title">{{ item.name }}</q-item-label>
                <q-item-label class="text-h6">{{ item.company }}</q-item-label>

                <q-item-label class="text-caption text-bold text-grey-10" >Issued {{ item.receivedDate }}</q-item-label>

                <q-item-label>
                  <strong>Umiejętności</strong>: 
                  <span v-for="(skill, skillIndex) in item.skills" :key="skill">
                    {{ skill }}<span v-if="skillIndex !== item.skills.length - 1"> | </span>
                  </span>
                
                </q-item-label>

                <q-item-label v-if="item.identifier">
                  Identyfikator poświadczenia {{ item.identifier }}
                </q-item-label>

                <q-item-label class="q-pt-sm">
                  <q-btn rounded class="q-px-md q-mr-sm" no-caps>
                    <span class="q-mr-sm">
                      Poświadczenie
                    </span>
                    <Icon name="fa-solid:external-link-alt" style="color: darkblue" />
                  </q-btn>

                  <q-btn v-if="item.certImage" rounded class="q-px-md" no-caps @click="openModal(item)">
                    <span class="q-mr-sm">
                      Zdjęcie
                    </span>
                    <Icon name="pepicons-pop:photo-camera" style="color: darkblue" size="1.4em"/>
                  </q-btn>
                </q-item-label>

              </q-item-section>
              <q-item-section side>
                <!-- Miniatura zdjęcia certyfikatu -->
                <q-img :src="item.certImage" :alt="item.name" width="50px" height="50px" />
              </q-item-section>

            </q-item>
            <q-separator class="q-my-sm" />
          </template>
          
        </q-list>
      </div>
    </div>


    <!-- Modal do wyświetlania większego zdjęcia -->
    <q-dialog v-model="showModal">
      <q-card style="min-width: 400px;">
        <q-card-section>
          <q-img :src="modalImage" :alt="modalImage" />
        </q-card-section>
        <q-card-actions>
          <q-btn label="Close" color="primary" @click="showModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import softSystem from 'assets/icons/softsystem.jpg';
import ets from 'assets/icons/ets.jpg';

interface Item {
    name: string;
    company: string;
    receivedDate: string;
    skills: string[];
    certImage?: string;
    identifier?: string;
    link?: string;
}

const showModal = ref(false);
const modalImage = ref('');

const items: Item[] = [
  {
    name: 'Building Modern Web Applications',
    company: 'SoftSystem Sp. z.o.o',
    receivedDate: '2023-05',
    skills: ['Vue', 'Python'],
    certImage: softSystem,
  },
  {
    name: 'TOEIC Certificate of achievement',
    company: 'ETS',
    receivedDate: '2024-01',
    skills: ['English C1'],
    certImage: ets,
    identifier: '776460',
    link: 'https://www.etsglobal.org/fr/en/digital-score-report/E82351FEC236574022D93D920C6A29DD1F27DA6347D454A35F19C46A8084FBB4cnFwWjVjKzFPWnArVnlXQnA2VDdsRmZFbGJoNmp5UC9Bazk2M3FwSThoTjJva1Rs'
  },
  {
    name: 'Certyfikat 3',
    company: 'xd',
    receivedDate: '2024-11-20',
    skills: ['Vue', 'Python'],
  },
];

const openModal = (item: Item) => {
  if(!item.certImage) return;

  modalImage.value = item.certImage;
  showModal.value = true;
};
</script>

<style scoped>
.cert-title {
  font-size: 1.8rem;
  letter-spacing: 0.03em;
  line-height: 1.6;
  font-weight: 300;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>