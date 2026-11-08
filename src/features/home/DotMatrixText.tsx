import React from 'react';

/* ─── Grid constants (viewBox units) ────────────────────── */
const C = 10;   // cell size
const R = 3.9;  // dot radius (diameter = 7.8, matches reference dot density)
const G = 10;   // gap between letters (1 cell wide)

/* ─── 4-row Dot-matrix alphabet matching "HAMED" reference style ─── */
const GLYPHS: Record<string, number[][]> = {
  H: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
  ],
  N: [
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
  ],
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 1, 1, 1],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
};

/* ─── Space glyph width ──────────────────────────────────── */
const SPACE_W = C * 2;

/* ─── Component ──────────────────────────────────────────── */
interface DotMatrixTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Defaults to 'currentColor' — inherits CSS color */
  dotColor?: string;
}

export const DotMatrixText: React.FC<DotMatrixTextProps> = ({
  text,
  className,
  style,
  dotColor = 'currentColor',
}) => {
  const chars = text.toUpperCase().split('');

  /* ── Calculate total viewBox width ── */
  let totalW = 0;
  chars.forEach((ch, i) => {
    if (ch === ' ') {
      totalW += SPACE_W;
    } else if (GLYPHS[ch]) {
      totalW += GLYPHS[ch][0].length * C;
    }
    if (i < chars.length - 1 && ch !== ' ' && GLYPHS[chars[i]] && chars[i + 1] !== ' ') {
      totalW += G;
    }
  });

  const totalH = 4 * C;

  /* ── Build dots ── */
  const circles: React.ReactElement[] = [];
  let cx = 0;

  chars.forEach((ch, ci) => {
    if (ch === ' ') {
      cx += SPACE_W + G;
      return;
    }
    const glyph = GLYPHS[ch];
    if (!glyph) {
      cx += 4 * C + G; // default fallback width
      return;
    }

    glyph.forEach((row, ri) => {
      row.forEach((bit, ki) => {
        if (bit) {
          circles.push(
            <circle
              key={`${ci}-${ri}-${ki}`}
              cx={cx + ki * C + C / 2}
              cy={ri * C + C / 2}
              r={R}
              fill={dotColor}
            />
          );
        }
      });
    });

    cx += glyph[0].length * C;
    if (ci < chars.length - 1) cx += G;
  });

  return (
    <svg
      viewBox={`0 0 ${totalW} ${totalH}`}
      className={className}
      style={{
        display: 'inline',
        verticalAlign: 'middle',
        height: '0.62em', // Adjusted ratio to align perfectly with headline capital height
        width: 'auto',
        ...style,
      }}
      aria-label={text}
      role="img"
    >
      {circles}
    </svg>
  );
};
