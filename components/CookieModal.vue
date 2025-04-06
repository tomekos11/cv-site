<template>
  <q-dialog 
    v-model="showModal" 
    persistent
    no-close-on-backdrop
    no-esc-dismiss
  >
    <q-card class="cookie-modal">
      <q-card-section>
        <h2 class="text-h6">{{ $t('cookie.title') }}</h2>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p>{{ $t('cookie.description') }}</p>
        
        <div class="q-mt-md">
          <q-checkbox
            v-model="necessaryCookies"
            :label="$t('cookie.necessary.label')"
            disable
            checked-icon="task_alt"
            unchecked-icon="pan_close"
          >
            <q-tooltip>{{ $t('cookie.necessary.tooltip') }}</q-tooltip>
          </q-checkbox>
          
          <q-checkbox
            v-model="analyticsCookies"
            :label="$t('cookie.analytics.label')"
          >
            <div class="text-caption">
              (Vercel Analytics, _vercel_analytics)
            </div>
            <q-tooltip>{{ $t('cookie.analytics.tooltip') }}</q-tooltip>
          </q-checkbox>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn 
          color="primary" 
          :label="$t('cookie.settings')" 
          flat
          @click="showSettings = !showSettings"
        />
        <q-btn 
          color="primary" 
          :label="$t('cookie.reject')" 
          @click="rejectAll"
        />
        <q-btn 
          color="primary" 
          :label="$t('cookie.accept')" 
          @click="acceptSelection"
        />
      </q-card-actions>

      <q-card-section v-if="showSettings">
        <cookie-settings-details />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Cookies } from 'quasar';
import { ref, onMounted } from 'vue';

const showModal = ref(false);
const showSettings = ref(false);
const necessaryCookies = ref(true);
const analyticsCookies = ref(false);

// Initialize cookies
const initCookies = () => {
  if (!Cookies.get('cookie_consent')) {
    showModal.value = true;
  }
};

const acceptSelection = () => {
  Cookies.set('cookie_consent', JSON.stringify({
    necessary: true,
    analytics: analyticsCookies.value,
    date: new Date().toISOString()
  }), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production'
  });

  if(analyticsCookies.value) {
    enableVercelAnalytics();
  }
  
  showModal.value = false;
};

const rejectAll = () => {
  Cookies.set('cookie_consent', JSON.stringify({
    necessary: true,
    analytics: false,
    date: new Date().toISOString()
  }), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production'
  });
  
  showModal.value = false;
};

const enableVercelAnalytics = () => {
  // Implement Vercel analytics script injection
};

onMounted(() => {
  if(!Cookies.get('cookie_consent')) {
    initCookies();
  }
});
</script>

<style scoped>
.cookie-modal {
  max-width: 500px;
  
  .q-checkbox__label {
    font-size: 1rem;
  }
}
</style>
