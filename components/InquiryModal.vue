<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 400px">
      <q-form @submit="sendInquiry">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ $t('inquiryModal.title') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="showModal = false" />
        </q-card-section>
        
        <q-card-section>

          <q-input v-model.trim="name" label="" type="text" hide-bottom-space outlined no-error-icon :rules="[() => !!name ||  $t('fieldRequired', {field: $t('inquiryModal.name')})]">
            <template #label>
              <span>{{ $t('inquiryModal.name') }}</span><span style="color: red;">*</span>
            </template>
          </q-input>
    
          <q-input v-model.trim="surname" label="" type="text" hide-bottom-space outlined no-error-icon class="q-mt-sm" :rules="[() => !!surname || $t('fieldRequired', {field: $t('inquiryModal.surname')})]">
            <template #label>
              <span>{{ $t('inquiryModal.surname') }}</span><span style="color: red;">*</span>
            </template>
          </q-input>
    
          <q-input v-model.trim="company" :label="$t('inquiryModal.company')" type="text" hide-bottom-space outlined no-error-icon class="q-mt-sm"/>
                
          <q-input v-model="email" type="email" label="" hide-bottom-space outlined no-error-icon class="q-mt-sm" :rules="[() => !!email || $t('fieldRequired', {field: 'Email'})]">
            <template #label>
              Email<span style="color: red;">*</span>
            </template>

            <template #append>
              <q-icon name="mail" />
            </template>
          </q-input>
    
          <q-input v-model.trim="content" label="" hide-bottom-space no-error-icon autogrow type="textarea" outlined class="q-mt-sm" :rules="[() => !!content ||  $t('fieldRequired', {field: $t('inquiryModal.content')})]" >
            <template #label>
              <span>{{ $t('inquiryModal.content') }}</span><span style="color: red;">*</span>
            </template>    
          </q-input>
        </q-card-section>
        
        <q-card-actions align="right">
          <q-btn type="submit" :label="$t('inquiryModal.send')" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';

const { locale } = useI18n();

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

      const message = locale.value === 'pl' ? 'Wiadomość dotarła do adresata.<br> <b>Dziękuję za kontakt</b>' : 'The message has been delivered to the recipient.<br> <b>Thank you for reaching out</b>'

      Notify.create({
        message,
        html: true,
        type: 'positive',
        timeout: 5000
      });
      showModal.value = false
    }

  } catch (error) {
    console.error('Błąd:', error);
  }
};

</script>