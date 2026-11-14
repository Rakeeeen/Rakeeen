import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteContent } from '@/data/SiteContent';
import { AIVectorTicker } from '@/features/home/AIVectorTicker';
import roundPortrait from '@/features/home/portrait-round.png';
import { useLang } from '@/i18n/LangContext';
import { Button } from '@/ui/Button';
import { IconArrow } from '@/ui/icons';
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

  return (
    <div className="home">
      <section className="home__hero">
        <p className="rise home__kicker mono">{t('productBuilder')}</p>

        <h1 className="rise home__title text-silver">{headline}</h1>

        <div className="rise home__row">
          <img className="home__portrait" src={roundPortrait} alt="" width={88} height={88} />
          <p className="home__lede">{subtitle}</p>
          <Button className="home__cta" onClick={() => navigate('/workflow')}>
            {t('howWeBuild')}
            <IconArrow className="icon-directional" size={18} />
          </Button>
        </div>
      </section>

      <AIVectorTicker />
    </div>
  );
};
