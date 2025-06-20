<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 400px" class="t:dark:!bg-slate-900">

      <q-form @submit="sendInquiry">
        <q-card-section class="row items-center t:!pb-0">
          <div class="text-h6">{{ $t('inquiryModal.title') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="showModal = false" />
        </q-card-section>
        
        <q-card-section>

          <div class="t:text-center t:!text-sm t:!tracking-wider t:font-light t:text-slate-700 t:dark:text-slate-500 t:mb-2 t:px-3">
            {{ $t('inquiryModal.description') }}
          </div>

          <q-input
            v-model.trim="name"
            label=""
            type="text"
            dense
            hide-bottom-space
            filled
            no-error-icon
            :rules="[() => !!name ||  $t('fieldRequired', {field: $t('inquiryModal.name')})]"
          >
            <template #label>
              <span>{{ $t('inquiryModal.name') }}</span><span style="color: red;">*</span>
            </template>
          </q-input>
    
          <q-input v-model.trim="surname" label="" type="text" dense hide-bottom-space filled no-error-icon class="q-mt-sm" :rules="[() => !!surname || $t('fieldRequired', {field: $t('inquiryModal.surname')})]">
            <template #label>
              <span>{{ $t('inquiryModal.surname') }}</span><span style="color: red;">*</span>
            </template>
          </q-input>
    
          <q-input v-model.trim="company" :label="$t('inquiryModal.company')" type="text" dense hide-bottom-space filled no-error-icon class="q-mt-sm"/>
                
          <q-input v-model="email" type="email" label="" hide-bottom-space filled no-error-icon dense class="q-mt-sm" :rules="[() => !!email || $t('fieldRequired', {field: 'Email'})]">
            <template #label>
              Email<span style="color: red;">*</span>
            </template>

            <template #append>
              <q-icon name="mail" class="t:text-slate-900" />
            </template>
          </q-input>
    
          <q-input v-model.trim="content" label="" hide-bottom-space no-error-icon autogrow type="textarea" dense filled class="q-mt-sm" :rules="[() => !!content ||  $t('fieldRequired', {field: $t('inquiryModal.content')})]" >
            <template #label>
              <span>{{ $t('inquiryModal.content') }}</span><span style="color: red;">*</span>
            </template>    
          </q-input>
        </q-card-section>
        
        <q-card-actions align="center">
          <!-- <q-btn type="submit" :label="$t('inquiryModal.send')" color="primary" /> -->
          <q-btn
            type="submit"
            class="t:!px-3 t:!bg-gradient-to-r t:!from-slate-950 t:dark:!from-slate-800 t:!to-slate-800 t:dark:!to-slate-800 text-white t:!border t:!border-slate-800 t:font-[15px]"
            size="md"
            rounded
            no-caps
            icon="mail"
            :label="$t('inquiryModal.send')"
          />
  
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

const loading = ref(false);


const sendInquiry = async () => {
  loading.value = true;
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

      const message = locale.value === 'pl' ? 'Wiadomość dotarła do adresata.<br> <b>Dziękuję za kontakt</b>' : 'The message has been delivered to the recipient.<br> <b>Thank you for reaching out</b>';

      Notify.create({
        message,
        html: true,
        type: 'positive',
        timeout: 5000
      });
      showModal.value = false;
    }

  } catch (error) {
    console.error('Błąd:', error);
  } finally {
    loading.value = false;
  }
};

</script>

<style scoped>

:deep(.q-btn .q-icon){
  font-size: none;
}
</style>