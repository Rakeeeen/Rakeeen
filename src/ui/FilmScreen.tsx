import type { ReactNode } from 'react';
import { CustomCursor } from '@/ui/CustomCursor';
import '@/ui/filmScreen.css';

const SPROCKET_HOLES = 14;
const STATIC_BARS = [0.7, 0.35, 0.55, 0.25, 0.6, 0.2, 0.8, 0.45];

interface FilmScreenProps {
  /** Small labels on the film strips, top and bottom. */
  stripLabel: string;
  footerLabel: ReactNode;
  /** The big word, and the smaller line under it. */
  title: string;
  subtitle: string;
  /** Lines of text under the bars; a line break in the string is a line break on the screen. */
  body: string;
  /** Interference: a split, flickering title and bars of static. Off for good news. */
  glitching?: boolean;
  children?: ReactNode;
}

const Sprockets = ({ side }: { side: 'start' | 'end' }) => (
  <div className={`film__sprockets film__sprockets--${side}`} aria-hidden>
    {Array.from({ length: SPROCKET_HOLES }, (_, i) => <i key={i} className="rounded-box" />)}
  </div>
);

/**
 * A screen made like a frame of old film: sprocket holes down both sides, a strip of small print at
 * the top and the bottom, grain and scratches over everything, and a title that splits and flickers
 * when something is wrong. Used for the pages that say so: not found, and offline.
 */
export const FilmScreen = ({ stripLabel, footerLabel, title, subtitle, body, glitching = true, children }: FilmScreenProps) => (
  <div className="film">
    <CustomCursor />
    <div className="film__grain" aria-hidden />
    <div className="film__scratch film__scratch--a" aria-hidden />
    <div className="film__scratch film__scratch--b" aria-hidden />
    <Sprockets side="start" />
    <Sprockets side="end" />

    <div className="film__strip film__strip--top mono">
      <span>RAKEEEEN</span>
      <span className="film__faint">◆</span>
      <span>{stripLabel}</span>
      <span className="film__lights film__faint">○ ○ ●</span>
    </div>
    <div className="film__strip film__strip--bottom mono">{footerLabel}</div>

    <main className={`film__content mono ${glitching ? 'film__content--glitching' : ''}`}>
      <h1 className="film__title">{title}</h1>
      <p className="film__subtitle">{subtitle}</p>
      {glitching && (
        <div className="film__bars" aria-hidden>
          {STATIC_BARS.map((opacity, i) => <span key={i} style={{ opacity }} />)}
        </div>
      )}
      <p className="film__body">{body}</p>
      {children}
    </main>
  </div>
);
