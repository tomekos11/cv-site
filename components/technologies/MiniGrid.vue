<template>
  <div class="tech-mini-grid">
    <article
      v-for="item in items"
      :key="item.name"
      class="tech-mini-card t:dark:!bg-slate-900 t:dark:!shadow-lg"
    >
      <div class="tech-mini-card__icon">
        <img
          v-if="item.src"
          :src="item.src"
          :alt="`logo ${item.name}`"
          class="tech-mini-card__image"
        >
        <span v-else class="tech-mini-card__fallback">{{ item.name }}</span>
      </div>
      <p class="tech-mini-card__label">{{ item.name }}</p>
    </article>

    <button
      v-if="remainingCount > 0"
      type="button"
      class="tech-mini-card tech-mini-card--more t:dark:!bg-slate-900 t:dark:!shadow-lg"
      :aria-label="$t('collaboration.moreTechnologiesAria', { count: remainingCount })"
      @click="showAllModal = true"
    >
      <span class="tech-mini-card__more-count">+{{ remainingCount }}</span>
      <span class="tech-mini-card__label">{{ $t('collaboration.moreTechnologies') }}</span>
    </button>

    <q-dialog v-model="showAllModal">
      <q-card class="tech-all-modal t:dark:!bg-slate-900">
        <q-card-section class="row items-center t:!pb-2">
          <div class="text-h6">{{ $t('nav.technologies') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="tech-all-modal__body t:!pt-0">
          <q-scroll-area
            class="tech-all-modal__scroll"
            :thumb-style="scrollThumbStyle"
          >
            <div class="tech-mini-grid tech-mini-grid--modal">
              <article
                v-for="item in allItems"
                :key="item.name"
                class="tech-mini-card t:dark:!bg-slate-800 t:dark:!shadow-none"
              >
                <div class="tech-mini-card__icon">
                  <img
                    v-if="item.src"
                    :src="item.src"
                    :alt="`logo ${item.name}`"
                    class="tech-mini-card__image"
                  >
                  <span v-else class="tech-mini-card__fallback">{{ item.name }}</span>
                </div>
                <p class="tech-mini-card__label">{{ item.name }}</p>
              </article>
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import type { TechnologyCatalogItem } from '~/helpers/technologyCatalog';

interface Props {
  items: TechnologyCatalogItem[];
  allItems?: TechnologyCatalogItem[];
}

const props = defineProps<Props>();

const showAllModal = ref(false);

const scrollThumbStyle = {
  width: '6px',
  background: '#64748b',
  opacity: 0.7,
  borderRadius: '6px',
};

const remainingCount = computed(() => {
  if (!props.allItems?.length) {
    return 0;
  }

  const shownNames = new Set(props.items.map((item) => item.name));
  return props.allItems.filter((item) => !shownNames.has(item.name)).length;
});
</script>

<style scoped>
.tech-mini-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.tech-mini-grid--modal {
  margin-top: 0;
  padding: 6px 10px 8px 4px;
}

.tech-mini-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 118px;
  padding: 0.75rem 0.5rem 0.65rem;
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tech-mini-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.tech-mini-card--more {
  cursor: pointer;
  font: inherit;
  color: inherit;
  background: #f1f5f9;
  border-style: dashed;
  border-color: rgba(100, 116, 139, 0.45);
}

.body--dark .tech-mini-card--more {
  background: rgba(51, 65, 85, 0.45);
  border-color: rgba(148, 163, 184, 0.35);
}

.tech-mini-card--more:hover {
  border-color: rgba(13, 148, 136, 0.55);
}

.tech-mini-card__more-count {
  font-size: 1.55rem;
  font-weight: 800;
  line-height: 1;
  color: #0f766e;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.body--dark .tech-mini-card__more-count {
  color: #2dd4bf;
}

.tech-mini-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 56px;
}

.tech-mini-card__image {
  width: 52px;
  height: 52px;
  object-fit: contain;
}

.tech-mini-card__fallback {
  font-size: 0.82rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.2;
  color: #334155;
  padding: 0 0.25rem;
}

.body--dark .tech-mini-card__fallback {
  color: #cbd5e1;
}

.tech-mini-card__label {
  margin: 0.45rem 0 0;
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.25;
  color: #334155;
}

.body--dark .tech-mini-card__label {
  color: #cbd5e1;
}

.tech-all-modal {
  width: min(920px, 96vw);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.tech-all-modal__body {
  padding-bottom: 1rem;
  flex: 1;
  min-height: 0;
}

.tech-all-modal__scroll {
  height: min(68vh, 620px);
  width: 100%;
}
</style>
