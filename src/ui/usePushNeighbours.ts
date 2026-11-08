import { useEffect, useRef } from 'react';
import { MIN_PRESS_MS } from '@/ui/motion';

type Direction = 'left' | 'right' | 'up' | 'down';

interface Box { x: number; y: number; width: number; height: number }

/** The nearest box in each direction that shares a row (left, right) or a column (up, down) with `from`. */
function neighboursOf(from: Box, others: readonly Box[]): Map<number, Direction> {
  const center = (box: Box) => ({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
  const origin = center(from);
  const nearest: Partial<Record<Direction, { index: number; distance: number }>> = {};

  others.forEach((box, index) => {
    const c = center(box);
    const sameRow = Math.abs(c.y - origin.y) < from.height / 2;
    const sameColumn = Math.abs(c.x - origin.x) < from.width / 2;
    let direction: Direction | null = null;
    if (sameRow && c.x < origin.x) direction = 'left';
    else if (sameRow && c.x > origin.x) direction = 'right';
    else if (sameColumn && c.y < origin.y) direction = 'up';
    else if (sameColumn && c.y > origin.y) direction = 'down';
    if (!direction) return;
    const distance = Math.hypot(c.x - origin.x, c.y - origin.y);
    if (!nearest[direction] || distance < (nearest[direction] as { distance: number }).distance) nearest[direction] = { index, distance };
  });

  return new Map(Object.entries(nearest).map(([direction, found]) => [(found as { index: number }).index, direction as Direction]));
}

/** The edge of a neighbour that faces the pressed card: a card to its left meets it with its right edge. */
const FACING: Record<Direction, Direction> = { left: 'right', right: 'left', up: 'down', down: 'up' };

/**
 * For a grid of cards: pressing one marks it `data-pressed` and `data-reach` (the sides on which it has
 * a neighbour, the only sides it stretches towards), and marks each neighbour, to its left, right,
 * above and below, with `data-yield` (its facing edge, which gives way) (motion.css, .push-group). A
 * press is held at least MIN_PRESS_MS so a quick click still shows. Put the returned ref on the grid,
 * whose children are the cards.
 */
export function usePushNeighbours<T extends HTMLElement>() {
  const grid = useRef<T>(null);

  useEffect(() => {
    const element = grid.current;
    if (!element) return;
    let pressed: Element | null = null;
    let pressedAt = 0;

    const clear = () => {
      for (const child of element.children) {
        child.removeAttribute('data-pressed');
        child.removeAttribute('data-reach');
        child.removeAttribute('data-yield');
      }
    };
    const down = (event: PointerEvent) => {
      const card = event.target instanceof Element ? [...element.children].find((child) => child.contains(event.target as Node)) : undefined;
      if (!card) return;
      pressed = card;
      pressedAt = Date.now();
      const cards = [...element.children];
      const others = cards.filter((child) => child !== card);
      const found = neighboursOf(card.getBoundingClientRect(), others.map((child) => child.getBoundingClientRect()));
      card.setAttribute('data-pressed', '');
      card.setAttribute('data-reach', [...found.values()].join(' '));
      found.forEach((direction, index) => others[index].setAttribute('data-yield', FACING[direction]));
    };
    const up = () => {
      if (!pressed) return;
      pressed = null;
      window.setTimeout(clear, Math.max(0, MIN_PRESS_MS - (Date.now() - pressedAt)));
    };

    element.addEventListener('pointerdown', down);
    document.addEventListener('pointerup', up);
    document.addEventListener('pointercancel', up);
    return () => {
      element.removeEventListener('pointerdown', down);
      document.removeEventListener('pointerup', up);
      document.removeEventListener('pointercancel', up);
    };
  }, []);

  return grid;
}
