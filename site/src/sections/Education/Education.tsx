import { ExternalLink } from '../../components/ExternalLink/ExternalLink.tsx';
import { Section, type SectionProps } from '../../components/Section/Section.tsx';
import { awards, certifications, education, educationSection } from '../../content/content.ts';
import { cx } from '../../lib/cx.ts';
import { reveal } from '../../lib/reveal.ts';
import styles from './Education.module.css';

interface EntryProps {
  title: string;
  badge?: string;
  institution: string;
  institutionUrl?: string;
  meta?: string;
}

/** A degree, course or award: title, issuing institution and a meta line. */
function Entry({ title, badge, institution, institutionUrl, meta }: EntryProps) {
  return (
    <li className={styles.entry}>
      <div className={styles.entryHead}>
        <h4 className={styles.entryTitle}>{title}</h4>
        {badge && <span className={cx('label', styles.badge)}>{badge}</span>}
      </div>
      <p className={styles.institution}>
        {institutionUrl ? <ExternalLink href={institutionUrl}>{institution}</ExternalLink> : institution}
      </p>
      {meta && <p className={styles.meta}>{meta}</p>}
    </li>
  );
}

export function Education({ id }: SectionProps) {
  return (
    <Section id={id} eyebrow="Education" title={educationSection.title} intro={educationSection.intro}>
      <div className={styles.grid}>
        <div ref={reveal}>
          <h3 className={cx('label', styles.columnTitle)}>Studies</h3>
          <ul>
            {education.map((item) => (
              <Entry
                key={item.title}
                title={item.title}
                badge={item.badge}
                institution={item.institution}
                institutionUrl={item.institutionUrl}
                meta={[item.location, item.period].filter(Boolean).join(' · ')}
              />
            ))}
          </ul>

          {awards.length > 0 && (
            <>
              <h3 className={cx('label', styles.columnTitle, styles.spaced)}>Honors & awards</h3>
              <ul>
                {awards.map((award) => (
                  <Entry key={award.title} title={award.title} institution={award.issuer} meta={award.year} />
                ))}
              </ul>
            </>
          )}
        </div>

        <div ref={reveal}>
          <h3 className={cx('label', styles.columnTitle)}>Certifications & courses</h3>
          <ul>
            {certifications.map((item) => (
              <li key={item.title} className={styles.certification}>
                <span className={styles.certificationTitle}>{item.title}</span>
                <span className={styles.meta}>{[item.issuer, item.year].filter(Boolean).join(' · ')}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
