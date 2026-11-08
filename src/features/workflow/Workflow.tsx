import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteContent } from '@/data/SiteContent';
import { phaseContent } from '@/domain/workflow';
import { useLang } from '@/i18n/LangContext';
import { Button } from '@/ui/Button';
import { PHASE_ICONS } from '@/ui/phaseIcons';
import { SketchIconView } from '@/ui/Sketch';
import { useActiveStep } from '@/ui/useActiveStep';
import '@/features/workflow/workflow.css';

const step = (n: number) => ({ '--step': n }) as React.CSSProperties;

export const Workflow = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const { workflowPhases } = useSiteContent();
  const { list, active } = useActiveStep<HTMLOListElement>(workflowPhases.length);

  useEffect(() => {
    document.title = `${t('howWeBuild')} | Rakeeen`;
  }, [t]);

  return (
    <div className="workflow page">
      <header className="workflow__header">
        <p className="rise workflow__kicker mono">{t('workflow')}</p>
        <h1 className="rise workflow__title text-silver" style={step(1)}>{t('howWeBuild')}</h1>
      </header>

      <ol className="phases" ref={list}>
        {workflowPhases.map((phase, index) => {
          const { title, subtitle, description, skills } = phaseContent(phase, lang);
          return (
            <li key={index} className="rise phase card" style={step(2 + index * 0.3)} data-active={active === index || undefined}>
              <span className="phase__glyph">
                <SketchIconView frames={PHASE_ICONS[index % PHASE_ICONS.length].frames} size={48} />
              </span>
              <div className="phase__body">
                <div className="phase__head">
                  <h2 className="phase__title">{title}</h2>
                  <span className="phase__subtitle mono">{subtitle}</span>
                </div>
                <p className="phase__description">{description}</p>
                {skills.length > 0 && (
                  <ul className="phase__skills">
                    {skills.map((skill) => (
                      <li key={skill} className="mono">{skill}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <footer className="rise workflow__next" style={step(2)}>
        <p className="workflow__kicker mono">{t('continueJourney')}</p>
        {/* Three equal choices, none before the others: all purple, and they share their space. */}
        <div className="workflow__buttons spring-group">
          <Button onClick={() => navigate('/projects')}>{t('projects')}</Button>
          <Button onClick={() => navigate('/about')}>{t('about')}</Button>
          <Button onClick={() => navigate('/contact')}>{t('sayHeyyy')}</Button>
        </div>
      </footer>
    </div>
  );
};
