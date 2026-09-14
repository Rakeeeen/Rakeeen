import React from 'react';
import { useSiteContext } from '../contexts/SiteContext';
import { useLang } from '../contexts/LangContext';
import { useNavigate } from 'react-router-dom';
import { DotMatrixText } from '../components/ui/DotMatrixText';
import { MascotFace } from '../components/ui/MascotFace';
import { AIVectorTicker } from '../components/ui/AIVectorTicker';

/* ──────────────────────────────────────────────────────────────
   HeadlineFormatted
   • Splits headline before "with / and / ..." → 2 lines
   • Replaces the word "human" with a 5×7 dot-matrix SVG
   ────────────────────────────────────────────────────────────── */
const HeadlineFormatted: React.FC<{ text: string }> = ({ text }) => {

  const renderChunk = (chunk: string, key: string): React.ReactNode => {
    // We split by "human" or "ai" case-insensitively using regex
    const regex = /(human|ai)/gi;
    const parts = chunk.split(regex);
    
    return (
      <React.Fragment key={key}>
        {parts.map((part, i) => {
          const lower = part.toLowerCase();
          if (lower === 'human') {
            return (
              <span 
                key={i} 
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 900,
                  fontSize: '1em',
                  color: 'var(--ink)',
                }}
              >
                {part}
              </span>
            );
          }
          if (lower === 'ai') {
            return (
              <React.Fragment key={i}>
                A
                <DotMatrixText
                  text="I"
                  style={{
                    height: '0.74em',          // Matches General Sans capital letters height perfectly
                    width: 'auto',
                    verticalAlign: 'baseline',  // Flow seamlessly along the text baseline
                    position: 'relative',
                    top: '-0.02em',             // Micro-adjust alignment to look completely integrated
                    margin: '0 0.05em',
                  }}
                />
              </React.Fragment>
            );
          }
          return <React.Fragment key={i}>{part}</React.Fragment>;
        })}
      </React.Fragment>
    );
  };

  const isAr = /[\u0600-\u06FF]/.test(text);
  if (isAr) {
    return <>{text}</>;
  }

  /* Split at natural break before "with / and / ..." */
  const breakIdx = text.search(/\s+(with|and|\.\.\.)\s/i);

  if (breakIdx === -1) {
    return <>{renderChunk(text, 'full')}</>;
  }

  const line1 = text.slice(0, breakIdx).trim();
  const line2 = text.slice(breakIdx).trim();

  return (
    <>
      <span style={{ display: 'block' }}>{renderChunk(line1, 'l1')}</span>
      <span style={{ display: 'block' }}>{renderChunk(line2, 'l2')}</span>
    </>
  );
};

/* ──────────────────────────────────────────────────────────────
   Home
   ────────────────────────────────────────────────────────────── */
export const Home = () => {
  const { siteConfig, setInitialLoadComplete } = useSiteContext();
  const { t, resolveField, lang } = useLang() as any;
  const navigate = useNavigate();

  const isArabic = lang === 'ar';

  React.useEffect(() => {
    // Home keeps the full branding title
    document.title = `Rakeeen — UX Designer`;
    // Instantly mark load complete on mount to ensure navbar & standard scroll behave correctly
    if (setInitialLoadComplete) {
      setInitialLoadComplete();
    }
  }, [siteConfig, resolveField, setInitialLoadComplete, t]);

  /* staggered physical spring entrance (instant load with critically damped spring physics animation) */
  const anim = (delay: number, y = 20): React.CSSProperties => ({
    opacity: 0,
    transform: `translateY(${y}px) scale(0.98)`,
    animation: `physics-entrance 0.95s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s forwards`,
    willChange: 'opacity, transform',
  });

  /* content */
  const headline   = resolveField((siteConfig as any).heroHeadline)      || t('hero_headline');
  const subtitle   = resolveField((siteConfig as any).heroSubtitle)      || t('hero_subtitle');
  const btnPrimary = resolveField((siteConfig as any).heroBtnPrimary)    || t('seeMyWork');
  const btnAbout   = resolveField((siteConfig as any).heroBtnSecondary2) || t('knowMore');
  const btnContact = resolveField((siteConfig as any).heroBtnSecondary1) || t('sayHello');

  return (
    <div className="home-hero fade-in">
      {/* Self-contained highly responsive spring physics animation keyframes */}
      <style>{`
        @keyframes physics-entrance {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <section className="home-hero-inner">

        {/* ── Portrait with Premium Bracket Vectors Frame ── */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '2.5rem', 
            width: '100%',
            direction: 'ltr',
            ...anim(0.02, 16) 
          }}
        >
          <div style={{
            width: '120px',
            height: '120px',
            overflow: 'hidden',
            background: 'transparent',
            borderRadius: '50%'
          }}>
            {siteConfig.siteImages?.aboutPortrait ? (
              <img 
                src={siteConfig.siteImages.aboutPortrait} 
                alt="Hamed" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : null}
          </div>
        </div>

        {/* ── Headline (Elegant size & font weight precisely matching UX Pilot, rendered instantly!) ── */}
        <h1
          className={`home-headline ${isArabic ? 'home-headline--ar' : ''}`}
          style={anim(0.18, 44)}
        >
          <HeadlineFormatted text={headline} />
        </h1>

        {/* ── Subtitle (Description) ── */}
        <p
          className={`home-subtitle ${isArabic ? 'home-subtitle--ar' : ''}`}
          style={{
            ...anim(0.32, 16),
            marginTop: '1.2rem',
            marginBottom: '3rem',
          }}
        >
          {subtitle}
        </p>

        {/* ── Workflow Entrance CTA Button ── */}
        <div className="home-cta-group" style={anim(0.44, 12)}>
          <button
            id="home-cta-workflow"
            className="btn-brutalist"
            onClick={() => navigate('/workflow')}
            style={{ padding: '1.2rem 2.5rem', minWidth: '0', maxWidth: '100%', width: 'fit-content', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}
          >
            {t('howWeBuild')}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </section>

      {/* ── AI Vector DNA Animation Ticker (Exactly positioned at bottom) ── */}
      <div style={{ width: '100vw', marginTop: '4.5rem' }}>
        <AIVectorTicker />
      </div>
    </div>
  );
};
