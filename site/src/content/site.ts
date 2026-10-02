/**
 * Identity, contact details and SEO metadata.
 *
 * Pure data with no asset imports, so vite.config.ts can read it to generate the
 * <head> tags. Page copy lives in content.ts.
 */
export type SocialKind = 'github' | 'linkedin';

export interface SocialLink {
  kind: SocialKind;
  label: string;
  href: string;
  /** Short form shown on the page, e.g. "github.com/AlmaSadrija". */
  display: string;
}

export interface SiteConfig {
  name: string;
  jobTitle: string;
  title: string;
  description: string;
  /**
   * Public URL of the deployed site, with a trailing slash
   * (e.g. "https://almasadrija.github.io/portfolio/"). When set, canonical and
   * social-image tags are added. The SITE_URL env variable overrides it at build time.
   */
  url: string;
  locale: string;
  location: { city: string; country: string; countryCode: string };
  email: string;
  phone: { display: string; href: string };
  /** File name of the CV inside /public. */
  cvFile: string;
  socials: SocialLink[];
  /** Spoken languages; `code` is the ISO 639-1 code used in structured data. */
  languages: Array<{ name: string; code: string; level: string }>;
  university: { name: string; url: string };
  ogImage: { file: string; width: number; height: number; alt: string };
}

export const site: SiteConfig = {
  name: 'Alma Sadrija',
  jobTitle: 'Junior Full-Stack Developer',
  title: 'Alma Sadrija — Junior Full-Stack Developer',
  description:
    'Junior full-stack developer in Prishtina, Kosovo, building web apps with React, Next.js, TypeScript, FastAPI and Node.js. Former full-stack intern at Genpact.',
  url: '',
  locale: 'en_US',
  location: { city: 'Prishtina', country: 'Kosovo', countryCode: 'XK' },
  email: 'almasadrija2@gmail.com',
  phone: { display: '+383 45 627 336', href: 'tel:+38345627336' },
  cvFile: 'Alma-Sadrija_CV.pdf',
  socials: [
    {
      kind: 'github',
      label: 'GitHub',
      href: 'https://github.com/AlmaSadrija',
      display: 'github.com/AlmaSadrija',
    },
    {
      kind: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/alma-sadrija',
      display: 'linkedin.com/in/alma-sadrija',
    },
  ],
  languages: [
    { name: 'Albanian', code: 'sq', level: 'native' },
    { name: 'English', code: 'en', level: 'fluent, C2' },
  ],
  university: { name: 'University of Prishtina “Hasan Prishtina”', url: 'https://uni-pr.edu' },
  ogImage: {
    file: 'og-image.png',
    width: 1200,
    height: 630,
    alt: 'Alma Sadrija, junior full-stack developer in Prishtina, Kosovo.',
  },
};
