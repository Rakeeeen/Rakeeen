import { useEffect } from 'react';
import { useSiteContent } from '@/data/SiteContent';
import { SkillTag } from '@/features/about/SkillTag';
import { useActiveStep } from '@/ui/useActiveStep';
import { useLang } from '@/i18n/LangContext';
import '@/features/about/about.css';

const step = (n: number) => ({ '--step': n }) as React.CSSProperties;

export const About = () => {
  const { siteConfig, timeline, competencies } = useSiteContent();
  const { t, resolveField } = useLang();
  const { list: journey, active } = useActiveStep<HTMLOListElement>(timeline.length);

  useEffect(() => {
    document.title = `${t('about')} | Rakeeen`;
  }, [t]);

  const portrait = siteConfig.siteImages.aboutPortrait;
  const bio = resolveField(siteConfig.detailed_summary) || resolveField(siteConfig.summary);

  return (
    <div className="about page">
      <header className="about__header">
        <p className="rise about__kicker mono">{t('aboutKicker')}</p>
        <h1 className="rise about__title text-silver" style={step(1)}>{t('behindPixels')}</h1>
      </header>

      <section className={`rise about__intro ${portrait ? 'about__intro--with-portrait' : ''}`} style={step(2)}>
        <div>
          <p className="about__bio">{bio}</p>
          <p className="about__tagline mono">{t('bio_tagline')}</p>
        </div>
        {portrait && <img className="about__portrait rounded-card" src={portrait} alt={resolveField(siteConfig.name)} />}
      </section>

      <section className="about__section">
        <p className="about__kicker mono">{t('roadTravelled')}</p>
        <h2 className="about__heading">{t('myNarrative')}</h2>

        <ol className="journey" ref={journey}>
          {timeline.map((item, index) => (
            <li key={index} className="journey__step" data-active={active === index || undefined}>
              <span className="journey__node" aria-hidden />
              <span className="journey__year mono">{resolveField(item.year) || String(index + 1).padStart(2, '0')}</span>
              <h3 className="journey__role">{resolveField(item.role)}</h3>
              <span className="journey__company mono">{resolveField(item.company)}</span>
              <p className="journey__story">{resolveField(item.description)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about__section">
        <p className="about__kicker mono">{t('theToolkit')}</p>
        <h2 className="about__heading">{t('mySkills')}</h2>
        <ul className="skills">
          {competencies.map((skill, index) => (
            <SkillTag key={index} title={skill.title} description={skill.description} />
          ))}
        </ul>
      </section>
    </div>
  );
};
