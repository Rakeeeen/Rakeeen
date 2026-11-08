/**
 * The single source for every plain icon on the site. They are small controls, read at a glance, so
 * the hand-drawn style is kept light: round blunt ends and joins. The characterful drawings (the
 * mascot) are fully hand-drawn instead, see ui/Sketch.tsx. There is no SVG filter on these icons:
 * a filter has to be computed whenever the icon is drawn again, and in some browsers that shows as a
 * dark flash.
 *
 * Three constants are the whole system; change one here and every icon follows.
 */
import type { ReactNode } from 'react';

export const ICON_STROKE_WIDTH = 2;
export const ICON_STROKE_LINECAP = 'round' as const;
export const ICON_STROKE_LINEJOIN = 'round' as const;

interface IconProps {
  size?: number;
  className?: string;
}

const createIcon = (paths: ReactNode, label: string) => {
  const Icon = ({ size = 20, className }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STROKE_WIDTH}
      strokeLinecap={ICON_STROKE_LINECAP}
      strokeLinejoin={ICON_STROKE_LINEJOIN}
      className={className}
      aria-hidden
    >
      {paths}
    </svg>
  );
  Icon.displayName = label;
  return Icon;
};

export const IconMenu = createIcon(<path d="M4 7h16M4 12h16M4 17h16" />, 'IconMenu');
export const IconClose = createIcon(<path d="M6 6l12 12M18 6L6 18" />, 'IconClose');
export const IconSun = createIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </>,
  'IconSun',
);
export const IconMoon = createIcon(<path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a6.8 6.8 0 0 0 9.7 9.7z" />, 'IconMoon');
/** Points in the reading direction: it turns round in Arabic (see base.css). */
export const IconArrow = createIcon(<path d="M4 12h15M13 6l6 6-6 6" />, 'IconArrow');
export const IconArrowUpRight = createIcon(<path d="M7 17L17 7M8 7h9v9" />, 'IconArrowUpRight');
