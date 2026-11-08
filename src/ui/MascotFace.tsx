import type { CSSProperties } from 'react';
import { SketchIconView } from '@/ui/Sketch';
import { MASCOT_ICON } from '@/ui/sketchIcons.data';

interface MascotFaceProps {
  size?: number;
  color?: string;
  style?: CSSProperties;
}

/** The face: hand-drawn, with a line that boils. It takes its colour from the surrounding text. */
export const MascotFace = ({ size = 48, color = 'var(--ink)', style }: MascotFaceProps) => (
  <span style={{ display: 'inline-flex', color, ...style }}>
    <SketchIconView frames={MASCOT_ICON.frames} size={size} />
  </span>
);
