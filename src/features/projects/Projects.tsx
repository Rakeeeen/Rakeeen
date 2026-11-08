import React, { useState, useEffect } from 'react';
import { useSiteContent } from '@/data/SiteContent';
import { useLang } from '@/i18n/LangContext';

const anim = (delay: number): React.CSSProperties => ({
  opacity: 0,
  transform: 'translateY(15px)',
  animation: `clean-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
});

export const Projects = () => {
  const { projects } = useSiteContent();
  const { t, resolveField, lang } = useLang();
  const [activeFilter, setActiveFilter] = useState('all');
  const isAr = lang === 'ar';

  useEffect(() => {
    document.title = `${t('projects')} | Rakeeen`;
  }, [t]);

  const cats: string[] = ['all', ...Array.from(
    new Set(projects.map(p => resolveField(p.category || '').trim()).filter(Boolean))
  ).slice(0, 5)];

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => resolveField(p.category || '').trim() === activeFilter);

  return (
    <div style={{ background: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @keyframes clean-fade-up {
          to { opacity: 1; transform: translateY(0); }
        }

        .clean-filter-btn {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.5rem 1.2rem;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--ink);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .clean-filter-btn.on,
        .clean-filter-btn:hover {
          background: var(--ink);
          color: var(--paper);
        }
        body.dark .clean-filter-btn.on,
        body.dark .clean-filter-btn:hover {
          color: #000;
        }

        /* Simplified modern grid card */
        .clean-proj-card {
          border: 1px solid var(--border);
          background: var(--paper-dark);
          padding: 2rem;
          transition: transform 0.15s cubic-bezier(0.19,1,0.22,1), box-shadow 0.15s cubic-bezier(0.19,1,0.22,1);
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 240px;
        }
        .clean-proj-card:hover {
          transform: translate(-4px, -4px);
          box-shadow: 5px 5px 0px 0px var(--ink);
        }
        .clean-proj-card:active {
          transform: translate(0, 0);
          box-shadow: none;
        }
        body.dark .clean-proj-card:hover {
          box-shadow: 5px 5px 0px 0px rgba(255,255,255,0.25) !important;
        }

        .clean-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
      `}</style>

      <div className="page-container" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>
        
        {/* ── Header ── */}
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={anim(0.05)}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                opacity: 0.4,
                marginBottom: '0.8rem',
              }}>
                {isAr ? 'ركين · أعمالي' : 'RAKEEEN · PORTFOLIO'}
              </p>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.03em',
                lineHeight: 0.9,
                color: 'var(--ink)',
              }}>
                {isAr ? 'أعمالي' : 'Selected\nWork'}
              </h1>
            </div>
            <div style={{ textAlign: isAr ? 'left' : 'right', ...anim(0.1) }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--ink)',
              }}>
                // {String(filtered.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* ── Filters ── */}
        {cats.length > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem', ...anim(0.15) }}>
            {cats.map(c => (
              <button
                key={c}
                className={`clean-filter-btn${activeFilter === c ? ' on' : ''}`}
                onClick={() => setActiveFilter(c)}
              >
                {c === 'all' ? (isAr ? 'الكل' : 'All') : c}
              </button>
            ))}
          </div>
        )}

        {/* ── Grid Layout with Clean Brutalist Cards & Vector Line Art Vibe ── */}
        <div className="clean-grid">
          {filtered.map((p, i) => {
            const hasLink = !!p.link;
            return (
              <div
                key={p.id}
                className="clean-proj-card"
                style={anim(0.2 + i * 0.05)}
                onClick={() => {
                  if (hasLink) {
                    window.open(p.link, '_blank', 'noopener,noreferrer');
                  }
                }}
              >

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      opacity: 0.3,
                      fontWeight: 700
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {p.category && (
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        background: 'var(--sepia)',
                        color: '#000000',
                        padding: '0.25rem 0.6rem',
                        border: '1px solid var(--border)'
                      }}>
                        {resolveField(p.category)}
                      </span>
                    )}
                  </div>

                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontWeight: 850,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    marginBottom: '0.8rem',
                    color: 'var(--ink)'
                  }}>
                    {resolveField(p.title)}
                  </h2>

                  {p.summary && (
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      color: 'var(--ink-faded)',
                      opacity: 0.85
                    }}>
                      {resolveField(p.summary)}
                    </p>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '2rem',
                  borderTop: '1px solid var(--border)',
                  paddingTop: '1rem'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    opacity: 0.5,
                    textTransform: 'uppercase'
                  }}>
                    {hasLink ? (isAr ? 'عرض المشروع ↗' : 'VIEW PROJECT ↗') : (isAr ? 'قريباً' : 'COMING SOON')}
                  </span>

                  {/* Clean Brutalist Vector Arrow */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: hasLink ? 'var(--sepia)' : 'transparent',
                    color: hasLink ? '#000000' : 'var(--ink)',
                    opacity: hasLink ? 1 : 0.25,
                    transition: 'all 0.12s'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
