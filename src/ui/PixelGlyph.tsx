import { memo } from 'react';
import type { Pixel } from '@/ui/pixelGlyphs';

interface PixelGlyphProps {
  pixels: readonly Pixel[];
  size?: number;
}

/**
 * A pixel-art shape on an 8×8 grid, drawn as square pixels with a hair of space between them, the
 * way old screens did. It takes its colour from the surrounding text.
 */
export const PixelGlyph = memo(({ pixels, size = 32 }: PixelGlyphProps) => {
  // A few shapes list a cell twice while tracing their outline; one rect each is enough.
  const cells = [...new Map(pixels.map(([column, row]) => [`${column},${row}`, [column, row] as const])).entries()];
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="currentColor" shapeRendering="crispEdges" overflow="visible" aria-hidden style={{ display: 'block' }}>
      {cells.map(([key, [column, row]]) => (
        <rect key={key} x={column + 0.08} y={row + 0.08} width={0.84} height={0.84} />
      ))}
    </svg>
  );
});
PixelGlyph.displayName = 'PixelGlyph';
