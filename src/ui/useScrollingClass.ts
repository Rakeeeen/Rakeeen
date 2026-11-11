import { useEffect } from 'react';

const SETTLE_MS = 900;

/**
 * Marks <html> with `is-scrolling` while anything on the page is being scrolled, and for a moment
 * after, so the scrollbar can show itself only then (base.css). Capturing, so a scrolling panel
 * inside the page counts too.
 */
export function useScrollingClass() {
  useEffect(() => {
    const root = document.documentElement;
    let timer = 0;
    const onScroll = () => {
      // Only when it changes: setting the class again on every scroll event still restyles the page.
      if (!root.classList.contains('is-scrolling')) root.classList.add('is-scrolling');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => root.classList.remove('is-scrolling'), SETTLE_MS);
    };
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.clearTimeout(timer);
      root.classList.remove('is-scrolling');
    };
  }, []);
}
