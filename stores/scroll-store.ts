import { defineStore } from 'pinia';
import type { QScrollArea } from 'quasar';

export const useScrollStore = defineStore('scroll', () => {

  const scrollAreaRef = ref<InstanceType<typeof QScrollArea> | null>(null);

  const init = (scrollArea: InstanceType<typeof QScrollArea>) => {
    scrollAreaRef.value = scrollArea;
  };

  const animateScroll = () => {
    if (scrollAreaRef.value) {
      const scrollPosition = scrollAreaRef.value.$el.scrollHeight; 
      scrollAreaRef.value.setScrollPosition('vertical', scrollPosition, 200);
    }
  };

  return {
    scrollAreaRef,
    init,
    animateScroll
  };
});