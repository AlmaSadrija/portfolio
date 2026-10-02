import { Section, type SectionProps } from '../../components/Section/Section.tsx';
import { about } from '../../content/content.ts';
import { cx } from '../../lib/cx.ts';
import { reveal } from '../../lib/reveal.ts';
import styles from './About.module.css';

export function About({ id }: SectionProps) {
  return (
    <Section id={id} eyebrow="About" title={about.title}>
      <div className={styles.grid}>
        <div ref={reveal} className={styles.story}>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div ref={reveal} className={cx('card', styles.card)}>
          <h3 className="label">At a glance</h3>
          <dl className={styles.facts}>
            {about.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
