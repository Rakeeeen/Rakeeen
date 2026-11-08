import { useRef } from 'react';
import { useSettings } from '@/data/Settings';
import { useCustomCursor } from '@/ui/useCustomCursor';

// A soft arrow: its body and its paper outline both have round joins, like the buttons.
const ARROW = 'M5.4 4.4L17.2 11.3L11.5 12.7L9.3 18.2L5.4 4.4Z';

const CursorLayer = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useCustomCursor(cursorRef);

  return (
    <div ref={cursorRef} className="custom-cursor-wrapper" aria-hidden>
      <svg className="custom-cursor-svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d={ARROW} fill="var(--paper-dark)" stroke="var(--paper-dark)" strokeWidth={4.2} strokeLinejoin="round" />
        <path d={ARROW} fill="var(--ink)" stroke="var(--ink)" strokeWidth={2.2} strokeLinejoin="round" />
      </svg>
    </div>
  );
};

/** The pointer the site draws on desktop, when the visitor has not turned it off. */
export const CustomCursor = () => {
  const { showCursor } = useSettings();
  return showCursor ? <CursorLayer /> : null;
};
