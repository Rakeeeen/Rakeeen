import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useSiteContent } from '@/data/SiteContent';
import { findProject, projectGallery } from '@/domain/projectDetail';
import { useLang } from '@/i18n/LangContext';
import { ButtonLink } from '@/ui/Button';
import { IconArrow, IconArrowUpRight, IconClose } from '@/ui/icons';
import '@/features/project-detail/projectDetail.css';

const GALLERY_CAPTIONS = ['snack_caption_1', 'snack_caption_2', 'snack_caption_3'] as const;

const step = (n: number) => ({ '--step': n }) as React.CSSProperties;

export const ProjectDetail = () => {
  const { id } = useParams();
  const { projects } = useSiteContent();
  const { t, resolveField } = useLang();

  const found = findProject(projects, id);
  const title = found ? resolveField(found.project.title) : '';

  useEffect(() => {
    if (title) document.title = `${title} | Rakeeen`;
  }, [title]);

  if (!found) return <Navigate to="/projects" replace />;
  const { project, previous, next } = found;
  const gallery = projectGallery(project);

  const facts = [
    { label: t('problem_label'), value: resolveField(project.challenge || project.painPoints) },
    { label: t('solution_label'), value: resolveField(project.solution) },
    { label: t('role_label_short'), value: resolveField(project.role) },
    { label: t('outcome_label'), value: resolveField(project.conclusion || project.keyResult) },
  ];

  const process = [
    { key: 'research', title: t('meal_research'), text: resolveField(project.strategy) || t('meal_research_fallback') },
    { key: 'wireframes', title: t('meal_wireframes'), text: resolveField(project.architecture) || t('meal_wireframes_fallback') },
    { key: 'ai', title: t('meal_ai'), text: resolveField(project.aiWorkflow) || t('meal_ai_fallback') },
  ];

  return (
    <article className="detail page">
      <Link to="/projects" className="rise detail__back mono">
        <IconArrow size={16} className="icon-directional icon-backwards" />
        {t('backToProjects')}
      </Link>

      <header className="detail__header">
        <p className="rise detail__meta mono" style={step(1)}>
          {resolveField(project.category)}
          {project.year && <span>{resolveField(project.year)}</span>}
        </p>
        <h1 className="rise detail__title text-silver" style={step(2)}>{title}</h1>
        <div className="rise detail__links" style={step(3)}>
          {project.link && (
            <ButtonLink href={project.link} target="_blank" rel="noreferrer noopener">
              {t('liveProject')}
              <IconArrowUpRight size={16} />
            </ButtonLink>
          )}
          {project.github && (
            <ButtonLink href={project.github} target="_blank" rel="noreferrer noopener">
              {t('sourceCode')}
            </ButtonLink>
          )}
        </div>
      </header>

      <dl className="rise detail__facts" style={step(4)}>
        {facts.map(({ label, value }) => (
          <div key={label} className="detail__fact">
            <dt className="mono">{label}</dt>
            <dd>{value || '—'}</dd>
          </div>
        ))}
      </dl>

      {project.image && <img className="detail__cover rounded-card" src={project.image} alt={title} />}

      {gallery.length > 0 && (
        <section className="detail__gallery">
          {gallery.map((picture, index) => (
            <figure key={picture.url} className="detail__row">
              <figcaption className="detail__caption">
                <span className="mono">{String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
                <h2>{t(GALLERY_CAPTIONS[index])}</h2>
                {picture.caption && <p>{resolveField(picture.caption)}</p>}
              </figcaption>
              <img className="rounded-card" src={picture.url} alt="" loading="lazy" />
            </figure>
          ))}
        </section>
      )}

      <section className="detail__process">
        <p className="detail__kicker mono">{t('theProcess')}</p>
        <h2 className="detail__heading text-silver">{t('theDeepDive')}</h2>
        <div className="detail__sections">
          {process.map(({ key, title: sectionTitle, text }, index) => (
            <details key={key} name="process" className="detail__section">
              <summary>
                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                {sectionTitle}
                <IconClose size={18} className="detail__plus" />
              </summary>
              <p>{text}</p>
            </details>
          ))}
        </div>
      </section>

      <nav className="detail__neighbours" aria-label={t('projects')}>
        {previous ? (
          <Link to={`/project/${previous.id}`} className="card detail__neighbour">
            <span className="mono"><IconArrow size={14} className="icon-directional icon-backwards" />{t('previous')}</span>
            <strong>{resolveField(previous.title)}</strong>
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/project/${next.id}`} className="card detail__neighbour detail__neighbour--next">
            <span className="mono">{t('upNext')}<IconArrow size={14} className="icon-directional" /></span>
            <strong>{resolveField(next.title)}</strong>
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
};
