import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomCursor } from '@/ui/CustomCursor';

// Detect current theme from body class or localStorage
const getTheme = (): 'dark' | 'light' => {
  if (document.body.classList.contains('light')) return 'light';
  if (document.body.classList.contains('dark')) return 'dark';
  try {
    const saved = localStorage.getItem('visitor_settings');
    if (saved) return JSON.parse(saved).theme ?? 'dark';
  } catch {}
  return 'dark';
};

// Film grain canvas
const FilmCanvas: React.FC<{ isLight: boolean }> = ({ isLight }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Film grain
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const noise = (Math.random() - 0.5) * (isLight ? 40 : 80);
        const base = isLight ? 160 : 128;
        imageData.data[i] = base + noise;
        imageData.data[i + 1] = base + noise;
        imageData.data[i + 2] = base + noise;
        imageData.data[i + 3] = Math.random() * (isLight ? 30 : 55) + 10;
      }
      ctx.putImageData(imageData, 0, 0);

      // Vertical scratches
      for (let s = 0; s < 3; s++) {
        if (Math.random() > 0.65) {
          const x = Math.random() * canvas.width;
          const alpha = Math.random() * 0.5 + 0.15;
          ctx.strokeStyle = isLight
            ? `rgba(0,0,0,${alpha * 0.4})`
            : `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = Math.random() * 1.5 + 0.5;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          for (let y = 0; y < canvas.height; y += 20) {
            ctx.lineTo(x + (Math.random() - 0.5) * 2, y);
          }
          ctx.stroke();
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isLight]);

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10,
      mixBlendMode: isLight ? 'multiply' : 'screen',
    }} />
  );
};

// Film sprocket holes
const FilmSprockets: React.FC<{ isLight: boolean }> = ({ isLight }) => {
  const holes = Array.from({ length: 14 });
  const bg = isLight ? '#e0ddd7' : '#0a0a0a';
  const holeBg = isLight ? '#c8c5bf' : '#1a1a1a';
  const holeBorder = isLight ? '#aaa' : '#333';

  const SprocketSide = ({ side }: { side: 'left' | 'right' }) => (
    <div style={{
      position: 'fixed', top: 0, bottom: 0, [side]: 0,
      width: 'clamp(28px, 4vw, 48px)',
      background: bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'space-around',
      paddingBlock: '20px', zIndex: 20,
    }}>
      {holes.map((_, i) => (
        <div key={i} style={{
          width: 'clamp(12px, 2vw, 20px)',
          height: 'clamp(8px, 1.2vw, 14px)',
          background: holeBg,
          border: `1.5px solid ${holeBorder}`,
          borderRadius: '3px',
        }} />
      ))}
    </div>
  );

  return <><SprocketSide side="left" /><SprocketSide side="right" /></>;
};

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'dark' | 'light'>(getTheme);

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const isLight = theme === 'light';

  const sprocketW = 'clamp(28px, 4vw, 48px)';
  const stripH = 'clamp(32px, 5vh, 40px)';

  const colors = {
    bg: isLight ? '#f5f0e8' : '#0a0908',
    text: isLight ? '#2a2018' : '#e9e2d2',
    muted: isLight ? 'rgba(42,32,24,0.45)' : 'rgba(233,226,210,0.45)',
    stripBg: isLight ? '#ede8db' : '#0e0d0c',
    stripBorder: isLight ? '#c8c0b0' : '#1e1c1a',
    stripText: isLight ? 'rgba(42,32,24,0.35)' : 'rgba(233,226,210,0.35)',
    btnBorder: isLight ? 'rgba(42,32,24,0.4)' : 'rgba(233,226,210,0.5)',
    btnText: isLight ? '#2a2018' : '#c8c8c8',
    btnHoverBg: isLight ? 'rgba(42,32,24,0.08)' : 'rgba(233,226,210,0.1)',
    barColor: isLight ? 'rgba(42,32,24,' : 'rgba(233,226,210,',
    glitchR: isLight ? 'rgba(200,0,0,0.25)' : 'rgba(255,0,0,0.3)',
    glitchC: isLight ? 'rgba(0,100,200,0.25)' : 'rgba(0,200,255,0.3)',
  };

  const staticBars = [0.7, 0.35, 0.55, 0.25, 0.6, 0.2, 0.8, 0.45];

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Courier New', Courier, monospace",
      color: colors.text,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      filter: 'grayscale(1) contrast(1.05)',
    }}>
      <CustomCursor />
      <FilmCanvas isLight={isLight} />
      <FilmSprockets isLight={isLight} />

      {/* Top film strip */}
      <div style={{
        position: 'fixed', top: 0,
        left: sprocketW, right: sprocketW,
        height: stripH,
        background: colors.stripBg,
        borderBottom: `1px solid ${colors.stripBorder}`,
        display: 'flex', alignItems: 'center',
        paddingInline: 'clamp(12px, 3vw, 24px)',
        gap: '12px', zIndex: 15,
        fontSize: 'clamp(0.45rem, 1.2vw, 0.6rem)',
        letterSpacing: '0.25em',
        color: colors.stripText,
      }}>
        <span>RAKEEEEN</span>
        <span style={{ opacity: 0.4 }}>◆</span>
        <span>FRAME 404</span>
        <span style={{ marginLeft: 'auto', opacity: 0.3 }}>○ ○ ●</span>
      </div>

      {/* Bottom film strip */}
      <div style={{
        position: 'fixed', bottom: 0,
        left: sprocketW, right: sprocketW,
        height: stripH,
        background: colors.stripBg,
        borderTop: `1px solid ${colors.stripBorder}`,
        display: 'flex', alignItems: 'center',
        paddingInline: 'clamp(12px, 3vw, 24px)',
        zIndex: 15,
        fontSize: 'clamp(0.4rem, 1.1vw, 0.55rem)',
        letterSpacing: '0.25em',
        color: colors.stripText,
        textTransform: 'uppercase',
      }}>
        PAGE NOT FOUND — REEL MISSING
      </div>

      {/* Main content — padded away from strips + sprockets */}
      <div style={{
        position: 'relative', zIndex: 5,
        textAlign: 'center',
        paddingInline: `calc(${sprocketW} + clamp(16px, 5vw, 60px))`,
        paddingBlock: `calc(${stripH} + clamp(20px, 5vh, 60px))`,
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
        animation: 'flicker 4s infinite',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        {/* 404 number */}
        <div style={{
          fontSize: 'clamp(5rem, 20vw, 11rem)',
          fontWeight: 900,
          letterSpacing: '0.1em',
          color: colors.text,
          textShadow: `2px 0 0 ${colors.glitchR}, -2px 0 0 ${colors.glitchC}`,
          lineHeight: 1,
          marginBottom: 'clamp(0.3rem, 1vh, 0.6rem)',
          animation: 'glitch 6s infinite',
        }}>
          404
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 'clamp(0.55rem, 2vw, 0.85rem)',
          letterSpacing: '0.5em',
          color: colors.muted,
          marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)',
          textTransform: 'uppercase',
        }}>
          page not found
        </div>

        {/* Static bars — centered, uniform width */}
        <div style={{
          width: 'clamp(160px, 50%, 260px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)',
        }}>
          {staticBars.map((op, i) => (
            <div key={i} style={{
              height: '5px',
              background: `${colors.barColor}${op})`,
              width: '100%', // all same width, centered
            }} />
          ))}
        </div>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(0.65rem, 1.8vw, 0.82rem)',
          color: colors.muted,
          letterSpacing: '0.12em',
          lineHeight: 2,
          maxWidth: '360px',
          marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)',
          textTransform: 'uppercase',
        }}>
          The reel is missing.<br />
          This scene was never shot.<br />
          Go back to the main feature.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
            fontWeight: 700,
            padding: 'clamp(0.5rem, 1.5vh, 0.7rem) clamp(1.2rem, 4vw, 2rem)',
            background: 'transparent',
            color: colors.btnText,
            border: `1.5px solid ${colors.btnBorder}`,
            cursor: 'pointer',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.background = colors.btnHoverBg;
            (e.target as HTMLButtonElement).style.borderColor = colors.btnText;
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.background = 'transparent';
            (e.target as HTMLButtonElement).style.borderColor = colors.btnBorder;
          }}
        >
          ← Back to Main Feature
        </button>
      </div>

      <style>{`
        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); }
          91% { transform: translate(-3px, 1px); }
          92% { transform: translate(3px, -1px); }
          93% { transform: translate(-2px, 2px); clip-path: inset(20% 0 30% 0); }
          94% { transform: translate(0); }
        }
        @keyframes flicker {
          0%, 95%, 100% { opacity: 1; }
          96% { opacity: 0.75; }
          97% { opacity: 1; }
          98% { opacity: 0.55; }
          99% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};
