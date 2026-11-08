import { useSiteContent } from '@/data/SiteContent';
import { useLang } from '@/i18n/LangContext';
import { MascotFace } from '@/ui/MascotFace';

export const Footer = () => {
  const { siteConfig } = useSiteContent();
  const { t } = useLang();

  return (
    <footer style={{
      background: 'var(--paper)',
      color: 'var(--ink)',
      padding: '4rem 1.5rem',
      textAlign: 'center',
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      alignItems: 'center',
      width: '100%'
    }}>
      {/* Socials mapped from Dashboard */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {(() => {
          const socialOrder = ['linkedin', 'behance'] as const;
          return socialOrder.map(key => {
            const url = siteConfig.socials[key];
            if (!url) return null;
            return (
              <a key={key} href={url as string} target="_blank" rel="noreferrer" style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: 'var(--ink)',
                textDecoration: "none",
                borderBottom: '1px solid var(--sepia)',
                textTransform: "capitalize",
                padding: "0.2rem 0.6rem",
                transition: 'opacity 0.2s'
              }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {key}
              </a>
            );
          });
        })()}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <MascotFace size={28} color="var(--ink)" />
        <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.2rem", color: "var(--ink)" }}>
          {t('madeBy')}
        </p>
      </div>
    </footer>
  );
};
