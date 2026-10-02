import { ExternalLink } from '../../components/ExternalLink/ExternalLink.tsx';
import { Icon } from '../../components/Icon/Icon.tsx';
import { TagList } from '../../components/TagList/TagList.tsx';
import type { Project } from '../../content/types.ts';
import { cx } from '../../lib/cx.ts';
import { reveal, revealDelay } from '../../lib/reveal.ts';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { live, source } = project.links ?? {};

  return (
    <li ref={reveal} style={revealDelay(index)} className={cx('card', styles.card)}>
      <div>
        <span className={styles.index} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className={cx('label', styles.kind)}>{project.kind}</p>
        <h3 className={styles.title}>{project.title}</h3>
        {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
      </div>

      <div className={styles.body}>
        <p className={styles.description}>{project.description}</p>

        {project.role && (
          <p className={styles.role}>
            <strong>My role:</strong> {project.role}
          </p>
        )}

        {project.highlights && (
          <ul className={cx('dash-list', styles.highlights)}>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        <TagList items={project.stack} size="sm" label={`${project.title} tech stack`} />

        {(live || source) && (
          <div className={styles.links}>
            {live && (
              <ExternalLink href={live} className={styles.link}>
                Live demo <Icon name="arrowUpRight" size={16} />
              </ExternalLink>
            )}
            {source && (
              <ExternalLink href={source} className={styles.link}>
                Source code <Icon name="arrowUpRight" size={16} />
              </ExternalLink>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
