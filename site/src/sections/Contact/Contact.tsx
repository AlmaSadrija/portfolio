import { ButtonLink } from '../../components/ButtonLink/ButtonLink.tsx';
import { CopyButton } from '../../components/CopyButton/CopyButton.tsx';
import { ExternalLink } from '../../components/ExternalLink/ExternalLink.tsx';
import { Icon } from '../../components/Icon/Icon.tsx';
import { Section, type SectionProps } from '../../components/Section/Section.tsx';
import { contactSection } from '../../content/content.ts';
import { site } from '../../content/site.ts';
import { publicUrl } from '../../lib/paths.ts';
import styles from './Contact.module.css';

const [emailUser, emailDomain] = site.email.split('@');

export function Contact({ id }: SectionProps) {
  return (
    <Section id={id} eyebrow="Contact" title={contactSection.title} intro={contactSection.intro} framed>
      <div className={styles.email}>
        <a href={`mailto:${site.email}`} className={styles.emailLink}>
          {/* If the address must wrap, break before the @ rather than mid-word. */}
          {emailUser}
          <wbr />@{emailDomain}
        </a>
        <CopyButton value={site.email} label="Copy email" confirmation="Email address copied to clipboard" />
      </div>

      <ul className={styles.channels}>
        <li>
          <Icon name="phone" />
          <span className="visually-hidden">Phone: </span>
          <a href={site.phone.href}>{site.phone.display}</a>
        </li>
        {site.socials.map((social) => (
          <li key={social.kind}>
            <Icon name={social.kind} />
            <span className="visually-hidden">{social.label}: </span>
            <ExternalLink href={social.href}>{social.display}</ExternalLink>
          </li>
        ))}
        <li>
          <Icon name="mapPin" />
          <span className="visually-hidden">Location: </span>
          {site.location.city}, {site.location.country}
        </li>
      </ul>

      <ButtonLink
        href={publicUrl(site.cvFile)}
        download
        variant="secondary"
        icon="download"
        iconPosition="start"
        className={styles.cv}
      >
        Download CV (PDF)
      </ButtonLink>
    </Section>
  );
}
