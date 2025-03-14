import { scroll } from 'quasar';

const { getScrollTarget, setVerticalScrollPosition } = scroll;

export const useScroll = () => {

  const scrollTo = (element: Element ) => {
    if (element) {
      const target = getScrollTarget(element);
      const offset = element.offsetTop + 50;
      const duration = 300;
      setVerticalScrollPosition(target, offset, duration);
    }
  };

  return {
    scrollTo
  };
};