import { ButtonLink } from '../../components/ButtonLink/ButtonLink.tsx';
import { ExternalLink } from '../../components/ExternalLink/ExternalLink.tsx';
import { Icon } from '../../components/Icon/Icon.tsx';
import { hero } from '../../content/content.ts';
import { site } from '../../content/site.ts';
import { cx } from '../../lib/cx.ts';
import { publicUrl } from '../../lib/paths.ts';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={cx('container', styles.inner)}>
        <div className={styles.text}>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className={styles.name}>
            {site.name}
          </h1>
          <p className={styles.lead}>{hero.lead}</p>
          <p className={styles.summary}>{hero.summary}</p>

          <div className={styles.actions}>
            <ButtonLink href="#projects" icon="arrowRight">
              View projects
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Contact me
            </ButtonLink>
            <ButtonLink
              href={publicUrl(site.cvFile)}
              download
              variant="ghost"
              icon="download"
              iconPosition="start"
              className={styles.cvLink}
            >
              Download CV
            </ButtonLink>
          </div>

          <ul className={styles.meta}>
            <li className={styles.status}>
              <span className={styles.dot} aria-hidden="true" />
              {hero.status}
            </li>
            <li>
              <Icon name="mapPin" size={16} />
              {site.location.city}, {site.location.country}
            </li>
            {site.socials.map((social) => (
              <li key={social.kind}>
                <ExternalLink href={social.href} className={styles.metaLink}>
                  <Icon name={social.kind} size={16} />
                  {social.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.portrait}>
          <img
            src={hero.portrait.src}
            width={hero.portrait.width}
            height={hero.portrait.height}
            alt={hero.portrait.alt}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
