import { useIntersectionObserver } from '@vueuse/core';

type Name = 'experience' | 'education' | 'technologies' | 'projects' | 'certificates'

const observedElements = new Map<string, Element>();
const activeHeaderItem = ref<string | null>(null);

export function useHeaderIntersectionObserver() {

  const createObserver = (element: Element, name: Name) => {
    observedElements.set(name, element);

    useIntersectionObserver(element, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        console.log(name);
        console.log(element);
        activeHeaderItem.value = name;
      }
    }, {
      threshold: 0.3,
    });
  };
  
  const isHeaderLinkActive = (name: Name) => {
    return activeHeaderItem.value === name;
  };

  const scrollToSection = (name: Name) => {
    const element = observedElements.get(name);
    if (element) {
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
