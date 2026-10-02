import { useState } from 'react';
import { ExternalLink } from '../../components/ExternalLink/ExternalLink.tsx';
import { Icon } from '../../components/Icon/Icon.tsx';
import { ScreenshotDialog } from '../../components/ScreenshotDialog/ScreenshotDialog.tsx';
import { Section, type SectionProps } from '../../components/Section/Section.tsx';
import { earlierWork, earlierWorkSection, projects, projectsSection } from '../../content/content.ts';
import { site } from '../../content/site.ts';
import type { EarlierProject } from '../../content/types.ts';
import { reveal } from '../../lib/reveal.ts';
import { EarlierProjectCard } from './EarlierProjectCard.tsx';
import { ProjectCard } from './ProjectCard.tsx';
import styles from './Projects.module.css';

const github = site.socials.find((social) => social.kind === 'github');

export function Projects({ id }: SectionProps) {
  const [openProject, setOpenProject] = useState<EarlierProject | null>(null);

  return (
    <Section id={id} eyebrow="Projects" title={projectsSection.title} intro={projectsSection.intro} tone="band">
      <ol className={styles.featured}>
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </ol>

      {earlierWork.length > 0 && (
        <div className={styles.earlier}>
          <div ref={reveal} className={styles.earlierHeader}>
            <h3 className={styles.earlierTitle}>{earlierWorkSection.title}</h3>
            {earlierWorkSection.intro && <p className={styles.earlierIntro}>{earlierWorkSection.intro}</p>}
          </div>
          <ul className={styles.earlierGrid}>
            {earlierWork.map((project, index) => (
              <EarlierProjectCard
                key={project.slug}
                project={project}
                index={index}
                onOpenScreenshot={() => setOpenProject(project)}
              />
            ))}
          </ul>
        </div>
      )}

      {github && (
        <p className={styles.more}>
          <ExternalLink href={github.href} className={styles.moreLink}>
            <Icon name="github" />
            More of my code on GitHub
            <Icon name="arrowUpRight" size={16} />
          </ExternalLink>
        </p>
      )}

      <ScreenshotDialog
        screenshot={openProject && { title: openProject.title, image: openProject.screenshot }}
        onClose={() => setOpenProject(null)}
      />
    </Section>
  );
}
