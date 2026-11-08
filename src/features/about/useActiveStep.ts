import { useEffect, useRef, useState } from 'react';

/**
 * Which step of a list is crossing the middle of the screen, as a ref for the list and the index.
 * The list's children are the steps. Uses an observer rather than a scroll handler, so nothing runs
 * while the page is still.
 */
export function useActiveStep<T extends HTMLElement>(stepCount: number) {
  const list = useRef<T>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const steps = list.current ? [...list.current.children] : [];
    // A thin band a little above the middle of the screen: only the step in it counts.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(steps.indexOf(entry.target));
        }
      },
      { rootMargin: '-45% 0px -55% 0px' },
    );
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [stepCount]);

  return { list, active };
}
