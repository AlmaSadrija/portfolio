import { Section, type SectionProps } from '../../components/Section/Section.tsx';
import { TagList } from '../../components/TagList/TagList.tsx';
import { skillGroups, skillsSection } from '../../content/content.ts';
import { cx } from '../../lib/cx.ts';
import { reveal, revealDelay } from '../../lib/reveal.ts';
import styles from './Skills.module.css';

export function Skills({ id }: SectionProps) {
  return (
    <Section id={id} eyebrow="Skills" title={skillsSection.title} intro={skillsSection.intro}>
      <dl className={styles.groups}>
        {skillGroups.map((group, index) => (
          <div key={group.title} ref={reveal} style={revealDelay(index, 50)} className={styles.group}>
            <dt className={cx('label', styles.title)}>{group.title}</dt>
            <dd>
              <TagList items={group.skills} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
