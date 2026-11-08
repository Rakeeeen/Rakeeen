import { useCallback, useEffect, useRef, useState } from 'react';
import { PixelGlyph } from '@/ui/PixelGlyph';
import { PIXEL_GLYPHS } from '@/ui/pixelGlyphs';

/**
 * A strip of pixel shapes sliding across the bottom of the home page on a slow wave. The motion is
 * written straight to the elements each frame, so React only re-renders when a shape is recycled.
 */
interface ActiveShape { id: number; x: number; shapeIndex: number }

const SPACING      = 185;
const SPEED        = 0.9;
const WAVE_AMP     = 22;    // px — amplitude of the traveling wave
const WAVE_PHASE_SPEED = 0.022; // how fast the wave travels (phase increment per frame)

const shuffle = (arr: number[]): number[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const AIVectorTicker = () => {
  const stripRef  = useRef<HTMLDivElement>(null);
  const [shapes, setShapes] = useState<ActiveShape[]>([]);

  // All hot animation state in refs — never triggers React re-renders
  const shapesRef   = useRef<ActiveShape[]>([]);
  const elRefs      = useRef<Map<number, HTMLDivElement>>(new Map());
  const phaseRef    = useRef(0);
  const animRef     = useRef<number | null>(null);
  const poolRef     = useRef<number[]>([]);
  const poolIdxRef  = useRef(0);
  const spawnCount  = useRef(0);
  const idRef       = useRef(0);

  const initPool = useCallback(() => {
    poolRef.current = shuffle(Array.from({ length: 100 }, (_, i) => i % PIXEL_GLYPHS.length));
    poolIdxRef.current = 0;
  }, []);

  const nextIdx = useCallback(() => {
    if (poolIdxRef.current >= poolRef.current.length) {
      initPool();
    }
    const idx = poolRef.current[poolIdxRef.current++];
    spawnCount.current++;
    if (spawnCount.current >= 100) {
      initPool();
      spawnCount.current = 0;
    }
    return idx;
  }, [initPool]);

  useEffect(() => {
    initPool();

    const count = Math.ceil(window.innerWidth / SPACING) + 3;
    const init: ActiveShape[] = Array.from({ length: count }, (_, i) => ({
      id: ++idRef.current,
      x:  i * SPACING,
      shapeIndex: nextIdx(),
    }));
    shapesRef.current = init;
    setShapes([...init]);

    const tick = () => {
      // ── Advance wave phase ─────────────────────────────────────────
      phaseRef.current += WAVE_PHASE_SPEED;

      // Calculate spatial frequency so that exactly one beautiful wave cycle 
      // spans the viewport width (high at one end, low at the other).
      const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const waveSpatial = Math.PI / Math.max(screenW, 800);

      for (const s of shapesRef.current) {
        s.x -= SPEED;
        const el = elRefs.current.get(s.id);
        if (el) {
          el.style.left = `${s.x}px`;
          const yOff = Math.sin(phaseRef.current + s.x * waveSpatial) * WAVE_AMP;
          el.style.transform = `translateY(calc(-50% + ${yOff}px))`;
        }
      }

      // ── 3. Recycle: remove exited shape, spawn new one on right ────
      if (shapesRef.current.length > 0 && shapesRef.current[0].x < -140) {
        shapesRef.current.shift();
        const last = shapesRef.current[shapesRef.current.length - 1];
        const newShape: ActiveShape = {
          id:         ++idRef.current,
          x:          last.x + SPACING + (Math.random() - 0.5) * 25,
          shapeIndex: nextIdx(),
        };
        shapesRef.current.push(newShape);
        // Only trigger React re-render when the shape LIST changes
        setShapes([...shapesRef.current]);
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        overflow: 'hidden',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        direction: 'ltr', // Force LTR to avoid RTL breaking absolute X positioning
      }}
    >
      <div
        ref={stripRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '60px',
          willChange: 'transform',
          direction: 'ltr', // Force LTR
        }}
      >
        {shapes.map(shape => (
          <div
            key={shape.id}
            ref={el => {
              if (el) {
                elRefs.current.set(shape.id, el);
                // Set initial left immediately on mount so it never flashes at 0
                el.style.left = `${shape.x}px`;
              } else {
                elRefs.current.delete(shape.id);
              }
            }}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--ink)',
              opacity: 0.55,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PixelGlyph pixels={PIXEL_GLYPHS[shape.shapeIndex] ?? PIXEL_GLYPHS[0]} size={44} />
          </div>
        ))}
      </div>
    </div>
  );
};
