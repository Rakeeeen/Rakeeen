import { Fragment, useEffect } from 'react';
import { joinBoil } from '@/ui/boilClock';
import type { Layers } from '@/ui/sketchIcons.data';

/**
 * Renders the hand-drawn icons (scripts/illustrations → sketchIcons.data.ts): a thick ink line over
 * a flat paper shape set a little off it. Paper is --icon-paper and ink follows the text colour,
 * so both follow the theme.
 */
const Sketch = ({ layers }: { layers: Layers }) => (
  <>
    {layers.map(([paper, ink], i) => (
      <Fragment key={i}>
        <g fill="var(--icon-paper)">{paper.map((d, j) => <path key={j} d={d} />)}</g>
        <g fill="currentColor">{ink.map((d, j) => <path key={j} d={d} />)}</g>
      </Fragment>
    ))}
  </>
);

interface SketchIconViewProps {
  frames: readonly Layers[];
  size: number;
  className?: string;
}

/**
 * The "line boil" of a hand-drawn film: three slightly different redraws, one showing at a time, four
 * a second. Which one shows is decided by one clock for the whole page (ui/boilClock.ts) through an
 * attribute on <html>, and motion.css shows it: nothing here animates. With reduced motion the first
 * redraw stays.
 */
export const SketchIconView = ({ frames, size, className }: SketchIconViewProps) => {
  useEffect(joinBoil, []);
  return (
    <svg width={size} height={size} viewBox="0 0 1000 1000" className={className} aria-hidden overflow="visible">
      <g className="sketch-boil-set">
        {frames.map((layers, i) => (
          <g key={i} className="sketch-boil" data-f={i}>
            <Sketch layers={layers} />
          </g>
        ))}
      </g>
    </svg>
  );
};
