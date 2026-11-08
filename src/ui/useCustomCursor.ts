import { useEffect, type RefObject } from 'react';
import { MIN_PRESS_MS } from '@/ui/motion';

const CLICKABLE = 'a, button, [role="button"], input, select, textarea, label[for], .cursor-pointer';

/**
 * Moves the pointer with the mouse exactly, drawing only when it moved. What it does over something
 * clickable (a tilt) and when pressed (a squeeze) is CSS on the arrow (base.css), on the spring, so
 * the position never lags while only the arrow has weight.
 */
export const useCustomCursor = (cursorRef: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let x = -999;
    let y = -999;
    let isHovered = false;
    let isVisible = false;
    let frame = 0;
    let pressedAt = 0;

    // Hidden until the first real movement.
    el.style.opacity = '0';

    const draw = () => {
      frame = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!isVisible) {
        isVisible = true;
        el.style.opacity = '1';
      }
      schedule();
    };
    const onOver = (event: MouseEvent) => {
      const hovered = event.target instanceof Element && !!event.target.closest(CLICKABLE);
      if (hovered !== isHovered) {
        isHovered = hovered;
        el.toggleAttribute('data-hover', hovered);
      }
    };
    const onDown = () => {
      pressedAt = Date.now();
      el.setAttribute('data-pressed', '');
    };
    const onUp = () => {
      // A quick click is held long enough to show.
      window.setTimeout(() => el.removeAttribute('data-pressed'), Math.max(0, MIN_PRESS_MS - (Date.now() - pressedAt)));
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(frame);
    };
  }, [cursorRef]);
};
