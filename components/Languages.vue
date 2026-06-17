<template>
  <section id="languages" ref="section">
    <section-title :title="$t('nav.languages')" />

    <div class="languages-section">
      <div
        v-for="language in languages"
        :key="language.flag"
        class="language-item t:dark:!bg-slate-900"
      >
        <span
          :class="`flag-icon flag-icon-${language.flag} flag-icon-lg`"
          :aria-label="language.name"
          role="img"
        />
        <div class="language-info">
          <h4 class="language-name t:dark:!text-slate-400">{{ language.name }}</h4>
          <p class="language-level t:dark:!text-slate-500">{{ language.level }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { languages } = useCvData();

const section = useTemplateRef('section');
const { registerSection } = useActiveSection();

onMounted(() => {
  registerSection('languages', section);
});
</script>

<style scoped>
.languages-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding: 20px 12px 30px;
  max-width: 1000px;
  margin-inline: auto;
  box-sizing: border-box;
}

.language-item {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1 1 100%;
  max-width: 100%;
  box-sizing: border-box;
  background-color: #f9f9f9;
  padding: 16px 18px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.language-name {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #333;
}

.language-level {
  margin: 4px 0 0;
  font-size: 0.95rem;
  color: #64748b;
}

@media (min-width: 480px) {
  .language-item {
    flex: 1 1 calc(50% - 12px);
    max-width: calc(50% - 6px);
  }
}

@media (min-width: 768px) {
  .languages-section {
    padding: 30px;
  }

  .language-item {
    flex: 1 1 220px;
    max-width: none;
  }
}
</style>
