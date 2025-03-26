<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 400px">
      <q-form @submit="sendInquiry">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Wyślij zapytanie</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="showModal = false" />
        </q-card-section>
        
        <q-card-section>

          <q-input v-model.trim="name" label="" type="text" hide-bottom-space outlined no-error-icon :rules="[() => !!name ||  `Pole ${ $t('inquiryModal.name') } nie może być puste`]">
            <template #label>
              <span>{{ $t('inquiryModal.name') }}</span><span style="color: red;">*</span>
            </template>
          </q-input>
    
          <q-input v-model.trim="surname" label="" type="text" hide-bottom-space outlined no-error-icon class="q-mt-sm" :rules="[() => !!surname || `Pole ${ $t('inquiryModal.surname') } nie może być puste`]">
            <template #label>
              <span>{{ $t('inquiryModal.surname') }}</span><span style="color: red;">*</span>
            </template>
          </q-input>
    
          <q-input v-model.trim="company" :label="$t('inquiryModal.company')" type="text" hide-bottom-space outlined no-error-icon class="q-mt-sm"/>
                
          <q-input v-model="email" type="email" label="" hide-bottom-space outlined no-error-icon class="q-mt-sm" :rules="[() => !!email || `Pole Email nie może być puste`]">
            <template #label>
              Email<span style="color: red;">*</span>
            </template>

            <template #append>
              <q-icon name="mail" />
            </template>
          </q-input>
    
          <q-input v-model.trim="content" label="" hide-bottom-space no-error-icon autogrow type="textarea" outlined class="q-mt-sm" :rules="[() => !!content ||  `Pole ${ $t('inquiryModal.content') } nie może być puste`]" >
            <template #label>
              <span>{{ $t('inquiryModal.content') }}</span><span style="color: red;">*</span>
            </template>    
          </q-input>
        </q-card-section>
        
        <q-card-actions align="right">
          <q-btn type="submit" label="Wyślij" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';


const showModal = ref(true);

const name = ref('');
const surname = ref('');
const company = ref('');
const email = ref('');
const content = ref('');


const sendInquiry = async () => {
  try {
    const response = await fetch('/api/send-to-discord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        surname: surname.value,
        company: company.value,
        email: email.value,
        content: content.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Błąd wysyłania zapytania');
    else {
      Notify.create({
        message: 'Poprawnie wysłano wiadomość',
        type: 'positive'
      });
    }

  } catch (error) {
    console.error('Błąd:', error);
  }
};

</script>