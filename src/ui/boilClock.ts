/**
 * The one clock behind every hand-drawn icon's "line boil" (ui/Sketch.tsx). Each icon is drawn three
 * times and one of the three shows at a time. That used to be a CSS animation on every redraw of every
 * icon: dozens of animations, each restyled on the main thread, and every icon off its own beat.
 *
 * Now one timer sets `data-boil` on <html> (which of the three redraws shows), and the CSS (motion.css,
 * "Hand-drawn icons") shows the matching redraw of every icon at once: one style change per tick,
 * however many icons are on the page.
 *
 * The clock runs only while an icon is mounted and the tab is visible. With no clock (reduced motion,
 * a hidden tab) the attribute is absent and every icon shows its first drawing, still, never empty.
 */

const FRAMES = 3;
/** Four a second, as the boil always was: three redraws in 0.75 s. */
const TICK_MS = 250;

let users = 0;
let timer: ReturnType<typeof setInterval> | null = null;
let ticks = 0;
let listening = false;

const root = () => document.documentElement;
const wantsStill = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const show = () => root().setAttribute('data-boil', String(ticks % FRAMES));

function sync() {
  const run = users > 0 && !document.hidden && !wantsStill();
  if (run && !timer) {
    ticks = 0;
    show();
    timer = setInterval(() => {
      ticks += 1;
      show();
    }, TICK_MS);
  } else if (!run && timer) {
    clearInterval(timer);
    timer = null;
    root().removeAttribute('data-boil');
  }
}

/** An icon calls this while it is mounted; the returned function says it has gone. */
export function joinBoil(): () => void {
  users += 1;
  if (!listening) {
    listening = true;
    document.addEventListener('visibilitychange', sync);
  }
  sync();
  return () => {
    users -= 1;
    sync();
  };
}
