import { Icon } from '../../components/Icon/Icon.tsx';
import { TagList } from '../../components/TagList/TagList.tsx';
import type { EarlierProject } from '../../content/types.ts';
import { cx } from '../../lib/cx.ts';
import { reveal, revealDelay } from '../../lib/reveal.ts';
import styles from './EarlierProjectCard.module.css';

interface EarlierProjectCardProps {
  project: EarlierProject;
  index: number;
  onOpenScreenshot: () => void;
}

export function EarlierProjectCard({ project, index, onOpenScreenshot }: EarlierProjectCardProps) {
  const { thumbnail } = project;

  return (
    <li ref={reveal} style={revealDelay(index)} className={styles.card}>
      <button
        type="button"
        className={styles.shot}
        onClick={onOpenScreenshot}
        aria-label={`View full-size screenshot of ${project.title}`}
        aria-haspopup="dialog"
      >
        <span className={styles.frame}>
          <span className={styles.bar} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <img
            src={thumbnail.src}
            srcSet={thumbnail.srcSet}
            sizes="(min-width: 72rem) 17rem, (min-width: 40rem) 45vw, 8rem"
            width={thumbnail.width}
            height={thumbnail.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </span>
        <span className={styles.expand} aria-hidden="true">
          <Icon name="expand" size={16} />
        </span>
      </button>

      <div>
        <p className={cx('label', styles.kind)}>{project.kind}</p>
        <h4 className={styles.title}>{project.title}</h4>
        <p className={styles.description}>{project.description}</p>
        <TagList items={project.stack} size="sm" label={`${project.title} tech stack`} />
      </div>
    </li>
  );
}
