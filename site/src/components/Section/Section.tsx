import type { ReactNode } from 'react';
import { cx } from '../../lib/cx.ts';
import { reveal } from '../../lib/reveal.ts';
import styles from './Section.module.css';

export interface SectionProps {
  id: string;
}

interface SectionLayoutProps extends SectionProps {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  /** "band" gives the section a tinted full-width background. */
  tone?: 'plain' | 'band';
  /** Wraps the heading and content in a card. */
  framed?: boolean;
  children: ReactNode;
}

/** Shared layout for page sections: eyebrow, heading, optional intro, content. */
export function Section({ id, eyebrow, title, intro, tone = 'plain', framed = false, children }: SectionLayoutProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className={cx(styles.section, tone === 'band' && styles.band)}>
      <div className="container">
        <div className={framed ? cx('card', styles.frame) : undefined}>
          <div ref={reveal} className={styles.header}>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
            {intro && <p className={styles.intro}>{intro}</p>}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
