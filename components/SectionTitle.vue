<template>
  <div class="t:flex t:items-center t:gap-6 t:my-4">
    <span class="t:flex-1 t:h-[6px] t:dark:h-[2px] t:bg-slate-950 t:dark:bg-slate-800"/>
    <h3 class="t:!text-[1rem] t:sm!text-[1.2rem] t:md!text-[1.4rem] t:lg:!text-[1.5rem] t:!tracking-wider t:uppercase t:font-light t:text-slate-700 t:dark:text-slate-300">
      {{ title }}
    </h3>
    <span class="t:flex-1 t:h-[6px] t:dark:h-[2px] t:bg-slate-950 t:dark:bg-slate-800"/>
  </div>

  <div v-if="description" class="t:text-center t:!text-sm t:!tracking-wider t:font-light t:text-slate-700 t:dark:text-slate-400 t:mb-2 t:px-3">
    {{ description }}
  </div>
  <div v-else-if="slots.default" >
    <slot />
  </div>
</template>

<script setup lang="ts">

interface Props {
  title: string;
  description?: string;
}

defineProps<Props>();

const slots = useSlots();
</script>