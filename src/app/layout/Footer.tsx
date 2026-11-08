import { useSiteContent } from '@/data/SiteContent';
import { useLang } from '@/i18n/LangContext';
import { MascotFace } from '@/ui/MascotFace';
import '@/app/layout/footer.css';

const SOCIALS = ['linkedin', 'behance'] as const;

export const Footer = () => {
  const { siteConfig } = useSiteContent();
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer__socials spring-group">
        {SOCIALS.map((name) => {
          const url = siteConfig.socials[name];
          return url ? (
            <a key={name} className="footer__social" href={url} target="_blank" rel="noreferrer">
              {name}
            </a>
          ) : null;
        })}
      </div>

      <p className="footer__credit">
        <MascotFace size={24} color="currentColor" />
        {t('madeBy')}
      </p>
    </footer>
  );
};
