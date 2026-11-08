import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteContent } from '@/data/SiteContent';
import { AIVectorTicker } from '@/features/home/AIVectorTicker';
import { useLang } from '@/i18n/LangContext';
import { Button } from '@/ui/Button';
import '@/features/home/home.css';

export const Home = () => {
  const { siteConfig } = useSiteContent();
  const { t, resolveField } = useLang();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Rakeeen — UX Designer';
  }, []);

  const headline = resolveField(siteConfig.heroHeadline) || t('hero_headline');
  const subtitle = resolveField(siteConfig.heroSubtitle) || t('hero_subtitle');
  const portrait = siteConfig.siteImages.aboutPortrait;

  return (
    <div className="home">
      <section className="home__hero">
        <p className="rise home__kicker mono">{t('productBuilder')}</p>

        <h1 className="rise home__title text-silver">{headline}</h1>

        <div className="rise home__row">
          {portrait && <img className="home__portrait rounded-card" src={portrait} alt="" />}
          <p className="home__lede">{subtitle}</p>
          <Button className="home__cta" onClick={() => navigate('/workflow')}>
            {t('howWeBuild')}
            <span aria-hidden className="home__arrow">→</span>
          </Button>
        </div>
      </section>

      <AIVectorTicker />
    </div>
  );
};
