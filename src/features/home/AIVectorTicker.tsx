import { useEffect, useRef, useState } from 'react';
import { PixelGlyph } from '@/ui/PixelGlyph';
import { PIXEL_GLYPHS } from '@/ui/pixelGlyphs';
import { SketchIconView } from '@/ui/Sketch';
import { SKETCH_GLYPHS } from '@/ui/sketchGlyphs';

/**
 * A strip of shapes sliding across the bottom of the home page on a slow wave: pixel art, and after
 * every ten of those one hand-drawn icon whose line boils. The motion is written straight to the
 * elements each frame, so React only re-renders when a shape is recycled.
 */
type Glyph = { kind: 'pixel' | 'sketch'; index: number };
interface ActiveShape extends Glyph { id: number; x: number }

const SPACING = 185;
const SPEED = 0.9;
const WAVE_AMPLITUDE = 30; // px of the travelling wave
const WAVE_SPEED = 0.022; // phase added per frame
const PIXELS_PER_SKETCH = 10;

function shuffled(count: number): number[] {
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/** Hands out glyphs: every pixel shape once in random order, with a sketch after each ten. */
function createGlyphSource() {
  let pixelOrder = shuffled(PIXEL_GLYPHS.length);
  let pixelsGiven = 0;
  let sketchesGiven = 0;
  return (): Glyph => {
    if (pixelsGiven === PIXELS_PER_SKETCH) {
      pixelsGiven = 0;
      return { kind: 'sketch', index: sketchesGiven++ % SKETCH_GLYPHS.length };
    }
    if (pixelOrder.length === 0) pixelOrder = shuffled(PIXEL_GLYPHS.length);
    pixelsGiven++;
    return { kind: 'pixel', index: pixelOrder.pop() as number };
  };
}

export const AIVectorTicker = () => {
  const [shapes, setShapes] = useState<ActiveShape[]>([]);
  const elements = useRef(new Map<number, HTMLDivElement>());

  useEffect(() => {
    const nextGlyph = createGlyphSource();
    let nextId = 0;
    let phase = 0;
    let frame = 0;
    let active: ActiveShape[] = Array.from({ length: Math.ceil(window.innerWidth / SPACING) + 3 }, (_, i) => ({
      id: ++nextId,
      x: i * SPACING,
      ...nextGlyph(),
    }));
    setShapes(active);

    const tick = () => {
      phase += WAVE_SPEED;
      // One wave cycle spans the screen: high at one end, low at the other.
      const spatial = Math.PI / Math.max(window.innerWidth, 800);

      for (const shape of active) {
        shape.x -= SPEED;
        const element = elements.current.get(shape.id);
        if (element) {
          element.style.left = `${shape.x}px`;
          element.style.transform = `translateY(calc(-50% + ${Math.sin(phase + shape.x * spatial) * WAVE_AMPLITUDE}px))`;
        }
      }

      // A shape that left on the left is replaced by a new one on the right.
      if (active[0].x < -140) {
        const last = active[active.length - 1];
        active = [
          ...active.slice(1),
          { id: ++nextId, x: last.x + SPACING + (Math.random() - 0.5) * 25, ...nextGlyph() },
        ];
        setShapes(active);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="ticker" aria-hidden>
      <div className="ticker__strip">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className="ticker__item"
            ref={(element) => {
              if (element) {
                elements.current.set(shape.id, element);
                // Placed at once, so it never flashes at the left edge.
                element.style.left = `${shape.x}px`;
              } else {
                elements.current.delete(shape.id);
              }
            }}
          >
            {shape.kind === 'pixel' ? (
              <PixelGlyph pixels={PIXEL_GLYPHS[shape.index]} size={44} />
            ) : (
              <SketchIconView frames={SKETCH_GLYPHS[shape.index].frames} size={56} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
