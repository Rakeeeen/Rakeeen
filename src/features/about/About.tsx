import React, { useEffect, useRef } from 'react';
import { useSiteContent } from '@/data/SiteContent';
import { useLang } from '@/i18n/LangContext';
import { SkillTag } from '@/features/about/SkillTag';

const fadeUp = (delay: number): React.CSSProperties => ({
  opacity: 0,
  transform: 'translateY(24px)',
  animation: `ab-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
});

export const About = () => {
  const { siteConfig, timeline, competencies } = useSiteContent();
  const { t, resolveField, lang } = useLang();
  const isAr = lang === 'ar';
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `${t('about')} | Rakeeen`;
  }, [siteConfig, t, resolveField]);

  // Scroll spy to highlight active timeline node based on viewport scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const steps = timelineRef.current.querySelectorAll('.journey-step');
      const triggerPoint = window.innerHeight * 0.45;

      steps.forEach((step: any) => {
        const rect = step.getBoundingClientRect();
        // If the step is passing through the trigger zone, activate it
        if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
          step.classList.add('active-step');
        } else {
          step.classList.remove('active-step');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check on mount
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [timeline]);

  return (
    <div style={{ background: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @keyframes ab-up { to { opacity:1; transform:translateY(0); } }

        /* Journey Timeline Styles */
        .journey-container {
          position: relative;
          padding-left: 2.5rem;
          margin-top: 4rem;
        }

        /* About bio grid responsive */
        .about-bio-grid {
          display: grid;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-bio-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem;
          }
          .about-bio-grid .about-portrait-card {
            max-width: 240px;
            margin: 0 auto;
          }
        }
        html[dir="rtl"] .journey-container {
          padding-left: 0;
          padding-right: 2.5rem;
        }

        /* Continuous timeline vector line */
        .journey-line {
          position: absolute;
          left: 0;
          top: 0.5rem;
          bottom: 0;
          width: 2px;
          background: var(--ink);
          opacity: 0.15;
        }
        html[dir="rtl"] .journey-line {
          left: auto;
          right: 0;
        }

        .journey-step {
          position: relative;
          margin-bottom: 5rem;
          transition: opacity 0.3s ease;
        }

        /* Journey node indicator */
        .journey-node {
          position: absolute;
          left: calc(-2.5rem - 5px);
          top: 0.5rem;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--paper);
          z-index: 2;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        html[dir="rtl"] .journey-node {
          left: auto;
          right: calc(-2.5rem - 5px);
        }

        /* Highlight node when scrolled to */
        .journey-step.active-step .journey-node {
          background: var(--ink);
          border-color: var(--border);
          transform: scale(1.4);
        }

        .journey-year {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--ink);
          opacity: 0.4;
          margin-bottom: 0.4rem;
          display: block;
          transition: opacity 0.3s ease;
        }

        .journey-step.active-step .journey-year {
          opacity: 0.55;
          color: var(--ink);
        }

        .journey-title {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: var(--ink);
          line-height: 1.1;
          margin-bottom: 0.2rem;
        }

        .journey-meta {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--ink);
          opacity: 0.45;
          margin-bottom: 1rem;
          display: block;
        }

        .journey-story {
          font-family: var(--font-body);
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--ink);
          opacity: 0.65; /* Lowered opacity for description as requested */
          max-width: 700px;
        }
      `}</style>

      <div className="page-container" style={{ paddingTop: '5rem', paddingBottom: '7rem' }}>

        {/* ── Header (Simple, clean and beautiful) ── */}
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2.5rem', marginBottom: '4rem' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            opacity: 0.4,
            marginBottom: '1rem',
            ...fadeUp(0.05),
          }}>
            {isAr ? 'ركين · عن ركين' : 'RAKEEEN · ABOUT'}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            color: 'var(--ink)',
            ...fadeUp(0.1),
          }}>
            {t('behindPixels')}
          </h1>
        </div>

        {/* ── Bio / Intro (First Section: kept direct & premium) ── */}
        <div
          className="about-bio-grid"
          style={{
            gridTemplateColumns: siteConfig.siteImages?.aboutPortrait ? '1fr 280px' : '1fr',
            marginBottom: '6rem',
            ...fadeUp(0.18),
          }}
        >
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              lineHeight: 1.8,
              color: 'var(--ink)',
              opacity: 0.6,
              maxWidth: '680px',
              fontWeight: 500,
            }}>
              {resolveField(siteConfig.detailed_summary) || resolveField(siteConfig.summary)}
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.7rem',
              marginTop: '2.5rem',
              paddingTop: '1.2rem',
              borderTop: '1px solid var(--border)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                opacity: 0.5,
              }}>
                {t('bio_tagline')}
              </span>
            </div>
          </div>

          {/* Portrait card */}
          {siteConfig.siteImages?.aboutPortrait && (
            <div className="about-portrait-card" style={{
              border: '1px solid var(--border)',
              padding: '0.6rem',
              background: 'var(--paper-dark)',
              transform: 'rotate(-1deg)',
              boxShadow: '4px 4px 0 var(--ink)'
            }}>
              <img
                src={siteConfig.siteImages.aboutPortrait}
                alt={resolveField(siteConfig.name)}
                style={{ width: '100%', display: 'block', aspectRatio: '3/4', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>

        {/* ── The Journey: Scroll-Linked Timeline ── */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ marginBottom: '3rem', ...fadeUp(0.25) }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              opacity: 0.4,
              display: 'block',
              marginBottom: '0.5rem'
            }}>{isAr ? 'رحلتي حتى الآن' : 'THE ROAD I TRAVELLED'}</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}>
              {isAr ? 'الرحلة والخبرات' : 'My Narrative'}
            </h2>
          </div>

          <div ref={timelineRef} className="journey-container" style={fadeUp(0.3)}>
            <div className="journey-line" />
            
            {/* Timeline Narrative Steps */}
            {timeline.map((item, i) => (
              <div key={i} className="journey-step">
                <div className="journey-node" />
                <span className="journey-year">
                  {resolveField(item.year) || `0${i + 1}`}
                </span>
                <h3 className="journey-title">{resolveField(item.role)}</h3>
                <span className="journey-meta">{resolveField(item.company)}</span>
                <p className="journey-story">{resolveField(item.description)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Skills Chapter: Kept completely separate as requested ── */}
        <div style={{ marginBottom: '6rem', ...fadeUp(0.35) }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              opacity: 0.4,
              display: 'block',
              marginBottom: '0.5rem'
            }}>{isAr ? 'القدرات والأسلحة' : 'THE TOOLKIT'}</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}>
              {isAr ? 'المهارات' : 'Skills'}
            </h2>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '1.2rem', 
            maxWidth: '1050px' 
          }}>
            {competencies.map((skill, i) => (
              <SkillTag key={i} title={skill.title} description={skill.description} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
