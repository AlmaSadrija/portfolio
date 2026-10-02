import { Section, type SectionProps } from '../../components/Section/Section.tsx';
import { TagList } from '../../components/TagList/TagList.tsx';
import { experience, experienceSection } from '../../content/content.ts';
import { cx } from '../../lib/cx.ts';
import { reveal } from '../../lib/reveal.ts';
import styles from './Experience.module.css';

export function Experience({ id }: SectionProps) {
  return (
    <Section id={id} eyebrow="Experience" title={experienceSection.title} intro={experienceSection.intro}>
      <ol className={styles.list}>
        {experience.map((item) => (
          <li key={`${item.organization}-${item.start.date}`} ref={reveal} className={cx('card', styles.item)}>
            <div className={styles.meta}>
              <p className={styles.period}>
                <time dateTime={item.start.date}>{item.start.label}</time>
                {' – '}
                {item.end ? <time dateTime={item.end.date}>{item.end.label}</time> : 'Present'}
              </p>
              {item.duration && <p className={styles.duration}>{item.duration}</p>}
              <p className={cx('label', styles.type)}>{item.type}</p>
            </div>

            <div>
              <h3 className={styles.role}>{item.role}</h3>
              <p className={styles.organization}>
                {item.organization} <span aria-hidden="true">·</span> {item.location}
              </p>
              <ul className={cx('dash-list', styles.highlights)}>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <TagList items={item.stack} size="sm" label={`Technologies used at ${item.organization}`} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
