import { ref, isRef } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type { QScrollArea } from 'quasar';
import { scroll } from 'quasar';
const { getScrollTarget, setVerticalScrollPosition } = scroll;

type SectionName = 'experience' | 'education' | 'technologies' | 'projects' | 'certificates';

const sections = new Map<SectionName, { ref: Ref<HTMLElement | null>, visibleHeight: number }>();
const activeSection = ref<SectionName | null>(null);

const visibilityThreshold = 0.2;

export function useActiveSection() {

  const { locale } = useI18n();
  const route = useRoute();

  const registerSection = (name: SectionName, element: Ref<HTMLElement | null>) => {
    if (!isRef(element)) return;
    sections.set(name, { ref: element, visibleHeight: 0 });
  };

  let lastVisibleSection: null|SectionName = null;

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

    if (visibleSections[0]?.name) {
      if(lastVisibleSection === visibleSections[0]?.name) return;

      history.replaceState(history.state, '', `${locale.value === 'pl' ? '' : `/${locale.value}`}/${visibleSections[0].name}`);
      lastVisibleSection = visibleSections[0]?.name;

    } else {
      if(!['index___pl', 'index___en', 'dynamic___pl', 'dynamic___en'].includes(route.name)) return;

      history.replaceState(history.state, '', `/${locale.value === 'pl' ? '' : locale.value}${ window.location.search ? `/${  window.location.search}` : ''}`);
      lastVisibleSection = null;
    }
  }, 10);

  const isSectionActive = (name: SectionName) => {
    return activeSection.value === name;
  };

  // const scrollToSection = (name: SectionName) => {
  //   const element = sections.get(name);
  //   if (element?.ref.value) {
  //     element?.ref.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //   }
  // };

  const scrollToSection = (name: SectionName) => {
    console.log('scroll');
    const element = sections.get(name);
    if (element?.ref.value) {
      const el = element.ref.value;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      if (rect.height > viewportHeight * 0.9) {
        const offset = -10;

        const target = getScrollTarget(el);
        const height = el.offsetTop + offset;
        const duration = 500;

        setVerticalScrollPosition(target, height, duration);
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      history.replaceState(history.state, '', `${locale.value === 'pl' ? '' : `/${locale.value}`}/${name}`);
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
