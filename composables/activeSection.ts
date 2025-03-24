import { ref, isRef } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type { QScrollArea } from 'quasar';

type SectionName = 'experience' | 'education' | 'technologies' | 'projects' | 'certificates';

const sections = new Map<SectionName, { ref: Ref<HTMLElement | null>, visibleHeight: number }>();
const activeSection = ref<SectionName | null>(null);

const visibilityThreshold = 0.2;

export function useActiveSection() {
  const registerSection = (name: SectionName, element: Ref<HTMLElement | null>) => {
    if (!isRef(element)) return;
    sections.set(name, { ref: element, visibleHeight: 0 });
  };

  const updateVisibleSections = useDebounceFn((scrollArea: Ref<InstanceType<typeof QScrollArea> | null>) => {
    const scrollAreaHeight = scrollArea.value ? scrollArea.value.clientHeight : window.innerHeight;

    const visibleSections = Array.from(sections.entries())
      .map(([name, { ref }]) => {
        if (!ref.value) return { name, visibleHeight: 0 };

        const rect = ref.value.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;

        const visibleHeight = Math.max(0, Math.min(bottom, scrollAreaHeight) - Math.max(top, 0));

        const sectionHeight = ref.value.clientHeight;

        const visibilityRatio = visibleHeight / sectionHeight;

        return { name, visibleHeight, visibilityRatio };
      })
      .filter(({ visibilityRatio }) => visibilityRatio >= visibilityThreshold)
      .sort((a, b) => b.visibleHeight - a.visibleHeight);

    activeSection.value = visibleSections[0]?.name || null;
  }, 10);

  const isSectionActive = (name: SectionName) => {
    return activeSection.value === name;
  };

  const scrollToSection = (name: SectionName) => {
    const element = sections.get(name);
    if (element?.ref.value) {
      element?.ref.value.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    registerSection,
    updateVisibleSections,
    activeSection,
    isSectionActive,
    scrollToSection,
  };
}
