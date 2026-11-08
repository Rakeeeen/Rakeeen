import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSiteContent } from '@/data/SiteContent';
import { useLang } from '@/i18n/LangContext';

const fadeUp = (delay: number): React.CSSProperties => ({
  opacity: 0,
  transform: 'translateY(20px)',
  animation: `pd-up 0.85s cubic-bezier(0.19,1,0.22,1) ${delay}s forwards`,
});

const monoLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.58rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--ink)',
  opacity: 0.4,
  display: 'block',
  marginBottom: '0.5rem',
};

export const ProjectDetail = () => {
  const { id } = useParams();
  const { projects } = useSiteContent();
  const { t, resolveField, lang } = useLang();
  const navigate = useNavigate();

  const idx     = projects.findIndex(p => p.id === id);
  const project = idx !== -1 ? projects[idx] : projects[0];
  const ri      = idx === -1 ? 0 : idx;

  const [open, setOpen] = useState<string | null>(null);
  const isAr = lang === 'ar';

  useEffect(() => {
    if (project) {
      document.title = `${resolveField(project.title)} | Rakeeen`;
      window.scrollTo(0, 0);
    }
  }, [project, resolveField]);

  if (!project) return null;

  const prev = ri > 0 ? projects[ri - 1] : null;
  const next = ri < projects.length - 1 ? projects[ri + 1] : null;

  const metrics = [
    { label: t('problem_label'),    val: resolveField(project.challenge || project.painPoints) },
    { label: t('solution_label'),   val: resolveField(project.solution) },
    { label: t('role_label_short'), val: resolveField(project.role) },
    { label: t('outcome_label'),    val: resolveField(project.conclusion || project.keyResult) },
  ];

  const gallery = project.gallery ||
    project.detailImages?.map((url: string) => ({ url })) || [];

  const deepDive = [
    { id: 'research',   title: t('meal_research'),   content: project.strategy    || t('meal_research_fallback') },
    { id: 'wireframes', title: t('meal_wireframes'), content: project.architecture || t('meal_wireframes_fallback') },
    { id: 'ai',         title: t('meal_ai'),         content: project.aiWorkflow || t('meal_ai_fallback') },
  ];

  return (
    <div style={{ background: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh' }}>
      <style>{`
        @keyframes pd-up { to { opacity:1; transform:translateY(0); } }

        .pd-acc-row {
          border-top: 1px solid var(--border);
        }
        .pd-acc-row:last-child { border-bottom: 1px solid var(--border); }

        .pd-acc-btn {
          width: 100%;
          padding: 1.6rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: var(--font-display);
          font-size: clamp(0.95rem, 2vw, 1.4rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          color: var(--ink);
          text-align: start;
          transition: color 0.12s;
        }
        .pd-acc-btn:hover { opacity: 0.65; }

        .pd-nav-cell {
          padding: 2.5rem 0;
          cursor: pointer;
          transition: opacity 0.12s;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .pd-nav-cell:hover { opacity: 0.7; }

        .pd-metrics {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          border-top: 1px solid var(--border);
        }
        .pd-metric-cell {
          padding: 2rem 0 2rem;
          border-inline-end: 1px solid var(--border);
        }
        .pd-metric-cell:last-child { border-inline-end: none; }

        .pd-gallery-row {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          min-height: 400px;
          border-top: 1px solid var(--border);
        }
        .pd-gallery-row.flipped { grid-template-columns: 1.1fr 1fr; }

        @media (max-width: 768px) {
          .pd-metrics { grid-template-columns: 1fr 1fr; }
          .pd-metric-cell:nth-child(2) { border-inline-end: none; }
          .pd-metric-cell:nth-child(3) { border-top: 1px solid var(--border); }
          .pd-gallery-row,
          .pd-gallery-row.flipped { grid-template-columns: 1fr; min-height: auto; }
          .pd-gallery-text { border-inline-end: none !important; border-bottom: 1px solid var(--border); }
          .pd-nav-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══ BACK + HERO HEADER ══ */}
      <div className="page-container" style={{ paddingTop: '3.5rem' }}>
        {/* Back */}
        <button
          onClick={() => navigate('/projects')}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            opacity: 0.4,
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'opacity 0.12s',
            padding: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}
        >
          ← {isAr ? 'ارجع للأعمال' : 'All Projects'}
        </button>

        {/* Title area */}
        <div style={{
          borderBottom: '1px solid var(--border)',
          paddingBottom: '2.5rem',
          marginBottom: '0',
          ...fadeUp(0.05),
        }}>
          {/* Category + year */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {project.category && (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                opacity: 0.4,
              }}>
                {resolveField(project.category)}
              </span>
            )}
            {project.year && (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                opacity: 0.4,
              }}>
                {resolveField(project.year)}
              </span>
            )}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 7vw, 5.5rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            color: 'var(--ink)',
          }}>
            {resolveField(project.title)}
          </h1>

          {/* External links */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  opacity: 0.55,
                  border: '1px solid var(--border)',
                  padding: '0.35rem 0.8rem',
                  transition: 'opacity 0.12s',
                }}
              >
                {t('liveProject')}
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  opacity: 0.55,
                  border: '1px solid var(--border)',
                  padding: '0.35rem 0.8rem',
                  transition: 'opacity 0.12s',
                }}
              >
                {t('sourceCode')}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ══ 4 METRICS ══ */}
      <div className="page-container">
        <div className="pd-metrics" style={{ ...fadeUp(0.12) }}>
          {metrics.map((m, i) => (
            <div key={i} className="pd-metric-cell" style={{ paddingInlineEnd: '1.5rem', paddingInlineStart: i === 0 ? 0 : '1.5rem' }}>
              <span style={monoLabel}>{m.label}</span>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                lineHeight: 1.65,
                color: 'var(--ink-faded)',
              }}>
                {m.val || '—'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ HERO IMAGE ══ */}
      {project.image && (
        <div style={{
          width: '100%',
          aspectRatio: '16/7',
          overflow: 'hidden',
          borderTop: '1px solid var(--border)',
          marginTop: '3rem',
        }}>
          <img
            src={project.image}
            alt={resolveField(project.title)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      {/* ══ ALTERNATING GALLERY ══ */}
      {gallery.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border)', marginTop: project.image ? 0 : '3rem' }}>
          {gallery.slice(0, 3).map((img: { url: string; caption?: any }, i: number) => {
            const flip = i % 2 !== 0;
            const textBlock = (
              <div
                className="pd-gallery-text"
                style={{
                  padding: 'clamp(2rem,5vw,4rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderInlineEnd: !flip ? '1px solid var(--border)' : 'none',
                  borderInlineStart: flip ? '1px solid var(--border)' : 'none',
                }}
              >
                <span style={{ ...monoLabel, marginBottom: '1rem' }}>
                  {String(i + 1).padStart(2, '0')} / {String(Math.min(gallery.length, 3)).padStart(2, '0')}
                </span>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.1,
                  color: 'var(--ink)',
                  marginBottom: '1rem',
                }}>
                  {[t('snack_caption_1'), t('snack_caption_2'), t('snack_caption_3')][i]}
                </h2>
                {img.caption && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--ink-faded)' }}>
                    {resolveField(img.caption)}
                  </p>
                )}
              </div>
            );
            const imgBlock = (
              <div style={{ overflow: 'hidden', minHeight: '360px' }}>
                <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '360px' }} />
              </div>
            );

            return (
              <div
                key={i}
                className={`pd-gallery-row${flip ? ' flipped' : ''}`}
                style={{ borderBottom: i < Math.min(gallery.length, 3) - 1 ? '1px solid var(--border)' : 'none' }}
              >
                {flip ? <>{imgBlock}{textBlock}</> : <>{textBlock}{imgBlock}</>}
              </div>
            );
          })}
        </div>
      )}

      {/* ══ DEEP DIVE ══ */}
      <div className="page-container" style={{ paddingTop: '4rem', paddingBottom: '1rem' }}>
        <div style={{ marginBottom: '1.5rem', ...fadeUp(0.05) }}>
          <span style={monoLabel}>{isAr ? 'التفاصيل' : 'THE PROCESS'}</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.025em',
            lineHeight: 1,
            color: 'var(--ink)',
          }}>
            {t('theDeepDive')}
          </h2>
        </div>

        <div style={{ marginTop: '2rem' }}>
          {deepDive.map((s, i) => (
            <div key={s.id} className="pd-acc-row">
              <button
                className="pd-acc-btn"
                onClick={() => setOpen(open === s.id ? null : s.id)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    color: 'var(--ink)',
                    opacity: 0.3,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.title}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  opacity: 0.4,
                  flexShrink: 0,
                  marginInlineStart: '1rem',
                }}>
                  {open === s.id ? '−' : '+'}
                </span>
              </button>

              {open === s.id && (
                <div style={{ paddingBottom: '2rem' }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    lineHeight: 1.8,
                    color: 'var(--ink-faded)',
                    whiteSpace: 'pre-line',
                    maxWidth: '680px',
                  }}>
                    {resolveField(s.content)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ══ PREV / NEXT ══ */}
      <div
        className="pd-nav-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderTop: '1px solid var(--border)',
          marginTop: '4rem',
        }}
      >
        {/* Prev */}
        <div
          className="pd-nav-cell"
          onClick={() => prev && navigate(`/project/${prev.id}`)}
          style={{
            paddingInlineStart: 'clamp(1rem,3vw,2.5rem)',
            paddingInlineEnd: 'clamp(1rem,3vw,2.5rem)',
            borderInlineEnd: '1px solid var(--border)',
            opacity: prev ? 1 : 0.2,
            pointerEvents: prev ? 'auto' : 'none',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            opacity: 0.4,
          }}>
            ← {t('prevProject')}
          </span>
          {prev && (
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              marginTop: '0.4rem',
            }}>
              {resolveField(prev.title)}
            </p>
          )}
        </div>

        {/* Next */}
        <div
          className="pd-nav-cell"
          onClick={() => next && navigate(`/project/${next.id}`)}
          style={{
            paddingInlineStart: 'clamp(1rem,3vw,2.5rem)',
            paddingInlineEnd: 'clamp(1rem,3vw,2.5rem)',
            textAlign: 'end',
            alignItems: 'flex-end',
            opacity: next ? 1 : 0.2,
            pointerEvents: next ? 'auto' : 'none',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            opacity: 0.4,
          }}>
            {t('nextProject')} →
          </span>
          {next && (
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              marginTop: '0.4rem',
            }}>
              {resolveField(next.title)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
