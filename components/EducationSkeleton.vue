<template>
  <div class="education-section" aria-hidden="true">
    <div
      v-for="i in 3"
      :key="i"
      class="education-item skeleton-item t:dark:!bg-slate-900"
    >
      <div class="d-flex align-center school">
        <div class="skeleton-logo t:animate-pulse t:bg-gray-200 t:dark:bg-slate-700" />
        <div class="school-info">
          <div class="skeleton-line skeleton-name t:animate-pulse t:bg-gray-200 t:dark:bg-slate-700" />
          <div class="skeleton-line skeleton-title t:animate-pulse t:bg-gray-200 t:dark:bg-slate-700" />
          <div class="skeleton-line skeleton-period t:animate-pulse t:bg-gray-200 t:dark:bg-slate-700" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.education-section {
  padding: 30px;
  max-width: 1000px;
  margin-inline: auto;
}

.education-item {
  background-color: #f9f9f9;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.skeleton-logo {
  width: min(150px, 100%);
  height: 80px;
  margin-right: 15px;
  border-radius: 6px;
  flex-shrink: 0;
}

.skeleton-line {
  border-radius: 4px;
}

.skeleton-name {
  height: 1.2rem;
  width: 70%;
}

.skeleton-title {
  height: 0.9rem;
  width: 55%;
  margin-top: 8px;
}

.skeleton-period {
  height: 0.9rem;
  width: 35%;
  margin-top: 8px;
}

@media (max-width: 500px) {
  .skeleton-logo {
    margin-right: 0;
    margin-bottom: 10px;
    width: 100%;
  }

  .school {
    flex-direction: column;
  }
}
</style>
