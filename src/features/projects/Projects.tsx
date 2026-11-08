import { useEffect, useMemo, useState } from 'react';
import { useSiteContent } from '@/data/SiteContent';
import { filterByCategory, projectCategories } from '@/domain/projects';
import { useLang } from '@/i18n/LangContext';
import { FilterTabs } from '@/ui/FilterTabs';
import { IconArrowUpRight } from '@/ui/icons';
import '@/features/projects/projects.css';

const ALL = 'all';

export const Projects = () => {
  const { projects } = useSiteContent();
  const { t, resolveField } = useLang();
  const [category, setCategory] = useState(ALL);

  useEffect(() => {
    document.title = `${t('projects')} | Rakeeen`;
  }, [t]);

  const categories = useMemo(() => projectCategories(projects, resolveField), [projects, resolveField]);
  const visible = filterByCategory(projects, category === ALL ? null : category, resolveField);

  return (
    <div className="projects page">
      <header className="projects__header">
        <div>
          <p className="rise projects__kicker mono">{t('portfolioKicker')}</p>
          <h1 className="rise projects__title text-silver" style={{ '--step': 1 } as React.CSSProperties}>
            {t('selectedWorks')}
          </h1>
        </div>
        <p className="rise projects__count mono" style={{ '--step': 2 } as React.CSSProperties}>
          {String(visible.length).padStart(2, '0')}
        </p>
      </header>

      {categories.length > 0 && (
        <div className="rise projects__filters" style={{ '--step': 2 } as React.CSSProperties}>
          <FilterTabs
            label={t('projects')}
            value={category}
            onChange={setCategory}
            options={[{ value: ALL, label: t('all') }, ...categories.map((name) => ({ value: name, label: name }))]}
          />
        </div>
      )}

      <ul className="projects__grid">
        {visible.map((project, index) => {
          const title = resolveField(project.title);
          const summary = resolveField(project.summary);
          const categoryLabel = resolveField(project.category);
          const body = (
            <>
              <div className="project-card__top">
                <span className="project-card__number mono">{String(index + 1).padStart(2, '0')}</span>
                {categoryLabel && <span className="project-card__category mono">{categoryLabel}</span>}
              </div>

              <div className="project-card__body">
                <h2 className="project-card__title">{title}</h2>
                {summary && <p className="project-card__summary">{summary}</p>}
              </div>

              <div className="project-card__foot">
                <span className="mono">{project.link ? t('viewProject') : t('comingSoon')}</span>
                <span className="project-card__go">
                  <IconArrowUpRight size={16} />
                </span>
              </div>
            </>
          );
          const style = { '--step': 3 + index * 0.4 } as React.CSSProperties;

          return (
            <li key={project.id} className="rise" style={style}>
              {project.link ? (
                <a className="project-card card" href={project.link} target="_blank" rel="noreferrer noopener">
                  {body}
                </a>
              ) : (
                <div className="project-card project-card--idle card">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
