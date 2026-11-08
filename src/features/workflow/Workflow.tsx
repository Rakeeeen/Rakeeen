import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '@/i18n/LangContext';
import { useSiteContent } from '@/data/SiteContent';

const fadeUp = (delay: number): React.CSSProperties => ({
  opacity: 0,
  transform: 'translateY(15px)',
  animation: `wf-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
});

// Pool of geometric pixel-art vectors (cycles as phases grow)
const VECTOR_POOL = [
  [[3,0],[4,0],[3,1],[4,1],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[3,6],[4,6],[3,7],[4,7]],
  [[3,0],[4,0],[2,1],[5,1],[1,2],[6,2],[0,3],[7,3],[1,4],[6,4],[2,5],[5,5],[3,6],[4,6]],
  [[3,0],[4,0],[2,1],[3,1],[4,1],[5,1],[1,2],[2,2],[5,2],[6,2],[0,3],[1,3],[6,3],[7,3],[0,4],[1,4],[6,4],[7,4],[1,5],[2,5],[5,5],[6,5],[2,6],[3,6],[4,6],[5,6],[3,7],[4,7]],
  [[1,0],[6,0],[2,1],[5,1],[3,2],[4,2],[3,3],[4,3],[2,4],[5,4],[1,5],[6,5],[2,6],[5,6],[3,7],[4,7]],
  [[1,2],[2,1],[3,2],[3,3],[2,4],[1,3],[4,2],[5,1],[6,2],[6,3],[5,4],[4,3]],
  [[0,0],[1,0],[6,0],[7,0],[0,1],[7,1],[0,6],[7,6],[0,7],[1,7],[6,7],[7,7],[3,3],[4,3],[3,4],[4,4]],
  [[4,0],[3,1],[4,1],[5,1],[2,2],[3,2],[5,2],[6,2],[1,3],[7,3],[1,4],[7,4],[2,5],[3,5],[5,5],[6,5],[3,6],[4,6],[5,6],[4,7]],
  [[0,2],[1,1],[2,0],[5,0],[6,1],[7,2],[7,5],[6,6],[5,7],[2,7],[1,6],[0,5],[3,3],[4,3],[3,4],[4,4]],
];

const PHASE_COLORS = [
  'var(--sepia)',
  '#3B82F6',
  '#A855F7',
  '#F97316',
  '#22C55E',
  '#EC4899',
  '#14B8A6',
  '#F59E0B',
];

export const Workflow = () => {
  const { lang, t } = useLang();
  const navigate = useNavigate();
  const { workflowPhases } = useSiteContent();
  const isAr = lang === 'ar';
  const [activePhase, setActivePhase] = useState(0);
  const [sidebarY, setSidebarY] = useState(0);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `${t('howWeBuild')} | Rakeeen`;
  }, [t]);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = window.innerHeight * 0.5;
      let best = 0;
      let bestDist = Infinity;
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mid = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(mid - trigger);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActivePhase(best);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 150);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleSidebarScroll = () => {
      if (!sidebarWrapperRef.current || !sidebarRef.current) return;
      const wrapperRect = sidebarWrapperRef.current.getBoundingClientRect();
      const wrapperHeight = wrapperRect.height;
      const sidebarHeight = sidebarRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Center the sidebar vertically at 40% of the screen height
      const triggerTop = viewportHeight * 0.4;
      const currentYInViewport = triggerTop - wrapperRect.top;
      const maxMove = wrapperHeight - sidebarHeight;

      // Clamp between 0 (top line) and maxMove (bottom line)
      const targetY = Math.max(0, Math.min(maxMove, currentYInViewport));
      setSidebarY(targetY);
    };

    window.addEventListener('scroll', handleSidebarScroll, { passive: true });
    window.addEventListener('resize', handleSidebarScroll);
    setTimeout(handleSidebarScroll, 150);
    return () => {
      window.removeEventListener('scroll', handleSidebarScroll);
      window.removeEventListener('resize', handleSidebarScroll);
    };
  }, [workflowPhases]);

  const phases = workflowPhases && workflowPhases.length > 0 ? workflowPhases : [
    {
      en_title: '01 · DISCOVERY & STRATEGY',
      ar_title: '01 · الاكتشاف والاستراتيجية',
      it_title: '01 · SCOPERTA E STRATEGIA',
      en_sub: 'BUSINESS LOGIC & USER RESEARCH',
      ar_sub: 'منطق العمل والبحث عن المستخدم',
      it_sub: 'LOGICA DI BUSINESS E RICERCA UTENTE',
      en_desc: 'We start by understanding the problem, not the screen. Business goals, user needs, and technical constraints are mapped before a single wireframe is drawn.',
      ar_desc: 'نبدأ من فهم المشكلة وليس الشاشة. نرسم أهداف العمل واحتياجات المستخدم والقيود التقنية قبل حتى رسم أي هيكل أولي.',
      it_desc: 'Partiamo dal capire il problema, non dallo schermo. Obiettivi, bisogni degli utenti e vincoli tecnici vengono mappati prima di disegnare anche solo un wireframe.',
      en_skills: 'User Research · Competitive Analysis · Problem Definition',
      ar_skills: 'بحث المستخدم · تحليل المنافسين · تعريف المشكلة',
      it_skills: 'Ricerca Utente · Analisi Competitiva · Definizione del Problema',
    },
    {
      en_title: '02 · UX & LOGIC',
      ar_title: '02 · تجربة المستخدم والمنطق',
      it_title: '02 · UX E LOGICA',
      en_sub: 'USER FLOWS & WIREFRAMES',
      ar_sub: 'مسارات المستخدم والهياكل الأولية',
      it_sub: 'FLUSSI UTENTE E WIREFRAME',
      en_desc: 'Every journey is designed before it is built. Flows, wireframes, and early testing keep the logic sharp and the direction locked.',
      ar_desc: 'كل رحلة يتم تصميمها قبل بنائها. المسارات والهياكل الأولية والاختبارات المبكرة تجعل المنطق واضحًا والاتجاه ثابتًا.',
      it_desc: 'Ogni viaggio viene progettato prima di essere costruito. Flussi, wireframe e test iniziali mantengono la logica chiara e la direzione definita.',
      en_skills: 'User Flows · Wireframes · Usability Testing',
      ar_skills: 'مسارات المستخدم · الهياكل الأولية · اختبار الاستخدام',
      it_skills: 'Flussi Utente · Wireframe · Usability Testing',
    },
    {
      en_title: '03 · UI & FIGMA ENGINEERING',
      ar_title: '03 · تصميم الواجهة والهندسة في فيجما',
      it_title: '03 · UI E FIGMA ENGINEERING',
      en_sub: 'DESIGN TOKENS & COMPONENT ARCHITECTURE',
      ar_sub: 'الرموز التصميمية وهندسة المكونات',
      it_sub: 'DESIGN TOKENS E ARCHITETTURA DEI COMPONENTI',
      en_desc: 'High-fidelity screens built inside a design system that mirrors production code — consistent, scalable, and handoff-ready.',
      ar_desc: 'شاشات عالية الدقة تُبنى داخل نظام تصميم يطابق الكود الإنتاجي — متسق وقابل للتطوير وجاهز للتسليم.',
      it_desc: 'Schermate ad alta fedeltà costruite all’interno di un design system che rispecchia il codice di produzione — coerente, scalabile e pronta per il handoff.',
      en_skills: 'Figma Auto-Layout · Design Tokens · Edge Cases',
      ar_skills: 'Auto Layout · الرموز التصميمية · الحالات الخاصة',
      it_skills: 'Figma Auto-Layout · Design Tokens · Edge Cases',
    },
    {
      en_title: '04 · DEVELOPMENT',
      ar_title: '04 · التطوير',
      it_title: '04 · SVILUPPO',
      en_sub: 'FRONT-END · BACK-END · FLUTTER',
      ar_sub: 'الواجهة الأمامية · الخلفية · فلاتر',
      it_sub: 'FRONT-END · BACK-END · FLUTTER',
      en_desc: 'The product gets built. Clean code, responsive layouts, and solid backend logic — all aligned with the design system.',
      ar_desc: 'يتم بناء المنتج. كود نظيف، تخطيطات متجاوبة، ومنطق خلفي قوي — كل ذلك متوافق مع نظام التصميم.',
      it_desc: 'Il prodotto viene costruito. Codice pulito, layout responsivi e una solida logica backend — tutto allineato al design system.',
      en_skills: 'React · Tailwind · Flutter · API Integration',
      ar_skills: 'React · Tailwind · Flutter · ربط الـ API',
      it_skills: 'React · Tailwind · Flutter · Integrazione API',
    },
    {
      en_title: '05 · QA & TESTING',
      ar_title: '05 · الجودة والاختبار',
      it_title: '05 · QA E TEST',
      en_sub: 'VISUAL · FUNCTIONAL · PERFORMANCE',
      ar_sub: 'بصري · وظيفي · أداء',
      it_sub: 'VISIVO · FUNZIONALE · PERFORMANCE',
      en_desc: 'Every pixel and every function gets tested. No broken flows, no layout bugs, no surprises after launch.',
      ar_desc: 'كل بكسل وكل وظيفة يتم اختبارها. لا توجد مسارات مكسورة ولا أخطاء تخطيط ولا مفاجآت بعد الإطلاق.',
      it_desc: 'Ogni pixel e ogni funzione vengono testati. Nessun flusso rotto, nessun bug di layout, nessuna sorpresa dopo il lancio.',
      en_skills: 'Design Parity · Code Standards · Cross-Device Testing',
      ar_skills: 'التطابق البصري · معايير الكود · اختبار عبر الأجهزة',
      it_skills: 'Parità di Design · Standard di Codice · Test Cross-Device',
    },
    {
      en_title: '06 · LAUNCH & MONITOR',
      ar_title: '06 · الإطلاق والمراقبة',
      it_title: '06 · LANCIO E MONITORAGGIO',
      en_sub: 'LIVE · DEPLOYED · TRACKED',
      ar_sub: 'مباشر · مُنَفَّذ · مُتَابَع',
      it_sub: 'LIVE · DEPLOYED · TRACKED',
      en_desc: 'The product goes live. Deployed, monitored, and ready for real users — not handed off, delivered.',
      ar_desc: 'يخرج المنتج للحياة. يُنشر ويُراقب ويكون جاهزًا للمستخدمين الحقيقيين — وليس مجرد تسليم.',
      it_desc: 'Il prodotto va live. Deployato, monitorato e pronto per utenti reali — non solo consegnato.',
      en_skills: 'App Store · Web Deployment · Analytics Setup',
      ar_skills: 'متجر التطبيقات · النشر على الويب · إعداد التحليلات',
      it_skills: 'App Store · Deploy Web · Setup Analytics',
    },
  ];

  return (
    <div style={{ background: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @keyframes wf-up { to { opacity:1; transform:translateY(0); } }

        .wf-step-box {
          padding: 2.5rem 2.8rem;
          border: 1px solid var(--border);
          background: var(--paper-dark);
          margin-bottom: 1.6rem;
          width: 100%;
          box-sizing: border-box;
        }

        /* Two-column: [vectors sidebar] [cards] */
        .wf-cols {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 0 3rem;
          position: relative;
        }
        /* CSS Grid already handles RTL visual reordering — no column swap needed */

        .wf-sidebar-wrapper {
          position: relative;
          height: 100%;
        }

        /* Fluid sliding sidebar, fully bounded inside the column */
        .wf-sidebar {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.8rem;
          will-change: transform;
          transition: transform 0.1s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* The sub-label — on the opposite side from the title */
        .wf-sub-label {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--ink);
          opacity: 0.4;
          padding: 0.32rem 0.75rem;
          border: 1px solid var(--border);
          flex-shrink: 0;
          margin-top: 0.1rem;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .wf-step-box { padding: 1.4rem 1.2rem; }
          .wf-cols { grid-template-columns: 36px 1fr; gap: 0 1rem; }
          .wf-sidebar { gap: 1rem; }
        }
        @media (max-width: 480px) {
          .wf-step-box { padding: 1.2rem 1rem; }
          .wf-cols { grid-template-columns: 1fr; gap: 0; }
          .wf-sidebar-wrapper { display: none; }
        }
      `}</style>

      <div className="page-container" style={{ paddingTop: '4rem', paddingBottom: '5rem', maxWidth: '820px', margin: '0 auto' }}>

        {/* ── Heading ── */}
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2.5rem', marginBottom: '3.5rem', ...fadeUp(0.05) }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            opacity: 0.4,
            marginBottom: '1rem',
          }}>
            {t('workflow')}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            color: 'var(--ink)',
            ...fadeUp(0.1),
          }}>
            {t('howWeBuild')}
          </h1>
        </div>

        {/* ── Two-column: vectors sidebar + cards ── */}
        <div className="wf-cols" style={fadeUp(0.18)}>

          {/* Sidebar Wrapper (holds the 52px column space and bounds the sliding sidebar) */}
          <div className="wf-sidebar-wrapper" ref={sidebarWrapperRef}>
            <div className="wf-sidebar" ref={sidebarRef} style={{ transform: `translateY(${sidebarY}px)` }}>
              {phases.map((_: any, i: number) => {
                const isActive = i === activePhase;
                const dots = VECTOR_POOL[i % VECTOR_POOL.length];
                return (
                  <div
                    key={i}
                    style={{
                      transform: isActive ? 'scale(1.25) rotate(45deg)' : 'scale(0.85) rotate(0deg)',
                      transition: 'all 0.45s cubic-bezier(0.19, 1, 0.22, 1)',
                      color: isActive ? PHASE_COLORS[i % PHASE_COLORS.length] : 'var(--ink)',
                      opacity: isActive ? 1 : 0.18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="32" height="32" viewBox="-0.5 -0.5 9 9"
                      style={{ shapeRendering: 'crispEdges', overflow: 'visible', display: 'block' }}>
                      {dots.map(([cx, cy]: number[], di: number) => (
                        <circle key={di} cx={cx + 0.5} cy={cy + 0.5} r="0.45" fill="currentColor" />
                      ))}
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phase Cards */}
          <div ref={cardsContainerRef} style={{ height: '100%' }}>
            {phases.map((phase: any, i: number) => (
              <div
                key={i}
                ref={el => { stepsRef.current[i] = el; }}
                className="wf-step-box"
              >
                {/* Title row: title one side, badge opposite */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                }}>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 850,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    color: 'var(--ink)',
                    margin: 0,
                  }}>
                    {isAr ? phase.ar_title : phase.en_title}
                  </h2>
                  <span className="wf-sub-label">
                    {isAr ? phase.ar_sub : phase.en_sub}
                  </span>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  color: 'var(--ink)',
                  opacity: 0.6,
                  marginBottom: '1.4rem',
                }}>
                  {isAr ? phase.ar_desc : phase.en_desc}
                </p>

                {/* Skills footer */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  borderTop: '1px dashed var(--border)',
                  paddingTop: '0.65rem',
                  color: 'var(--ink)',
                  opacity: 0.45,
                }}>
                  {isAr ? phase.ar_skills : phase.en_skills}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '5rem',
          marginTop: '5rem',
          textAlign: 'center',
          ...fadeUp(0.72)
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            opacity: 0.4,
            marginBottom: '2.5rem'
          }}>
            {isAr ? 'اكتشف المزيد من الملف المهني' : 'CONTINUE THE JOURNEY'}
          </p>
          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <button className="btn-brutalist" onClick={() => navigate('/projects')} style={{ flex: '1 1 160px', maxWidth: '220px', fontFamily: 'var(--font-mono)' }}>
              {isAr ? 'أعمالي' : 'Projects'}
            </button>
            <button className="btn-brutalist btn-brutalist--outline" onClick={() => navigate('/about')} style={{ flex: '1 1 160px', maxWidth: '220px', fontFamily: 'var(--font-mono)' }}>
              {isAr ? 'عني' : 'About'}
            </button>
            <button className="btn-brutalist btn-brutalist--ghost" onClick={() => navigate('/contact')} style={{ flex: '1 1 160px', maxWidth: '220px', fontFamily: 'var(--font-mono)' }}>
              {isAr ? 'تواصل معي' : 'Say Heyyy'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
