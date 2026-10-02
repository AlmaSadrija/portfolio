import { site } from '../../content/site.ts';
import { cx } from '../../lib/cx.ts';
import { ExternalLink } from '../ExternalLink/ExternalLink.tsx';
import { Icon } from '../Icon/Icon.tsx';
import styles from './Footer.module.css';

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={cx('container', styles.inner)}>
        <p className={styles.copyright}>
          © {/* The pre-rendered year can differ from the visitor's clock at New Year. */}
          <span suppressHydrationWarning>{year}</span> {site.name}
        </p>

        <ul className={styles.links} aria-label="Elsewhere">
          {site.socials.map((social) => (
            <li key={social.kind}>
              <ExternalLink href={social.href} className={styles.link}>
                {social.label}
              </ExternalLink>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className={styles.link}>
              Email
            </a>
          </li>
        </ul>

        <a href="#top" className={styles.top}>
          Back to top
          <Icon name="arrowUp" size={16} />
        </a>
      </div>
    </footer>
  );
}
