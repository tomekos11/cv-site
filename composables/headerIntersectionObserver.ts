import { useIntersectionObserver } from '@vueuse/core';
import { useScroll } from '~/stores/scroll-store';

type Name = 'experience' | 'education' | 'technologies' | 'projects' | 'certificates'

const observedElements = new Map<string, Element>();
const activeHeaderItem = ref<string | null>(null);

export function useHeaderIntersectionObserver() {
  // const observedElements = new Map<Element, string>();

  const createObserver = (element: Element, name: Name) => {
    observedElements.set(name, element);

    useIntersectionObserver(element, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        console.log(name);
        console.log(element);
        activeHeaderItem.value = name;
      }
    }, {
      threshold: 0.3, // Możesz dostosować tę wartość
    });
  };
  
  const isHeaderLinkActive = (name: Name) => {
    return activeHeaderItem.value === name;
  };

  const scrollToSection = (name: Name) => {
    const element = observedElements.get(name);
    if (element) {
      // element.scrollIntoView({
      //   behavior: 'smooth', // Wygładzenie przewijania
      //   block: 'start',     // Wyrównanie do początku elementu
      // });

      useScroll().scrollTo(element);
    }
  };

  return {
    createObserver,
    isHeaderLinkActive,
    scrollToSection,
    activeHeaderItem,
  };
}
