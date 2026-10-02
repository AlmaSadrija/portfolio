export interface ImageSource {
  src: string;
  width: number;
  height: number;
}

export interface Image extends ImageSource {
  alt: string;
}

export interface ResponsiveImageSource extends ImageSource {
  srcSet: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface SectionCopy {
  title: string;
  intro?: string;
}

/** A display label plus a machine-readable date (YYYY-MM) for <time>. */
export interface MonthYear {
  label: string;
  date: string;
}

export type EmploymentType = 'Internship' | 'Full-time' | 'Part-time' | 'Freelance' | 'Volunteer';

export interface ExperienceItem {
  role: string;
  organization: string;
  type: EmploymentType;
  location: string;
  start: MonthYear;
  /** Omit for a current position. */
  end?: MonthYear;
  duration?: string;
  highlights: string[];
  stack: string[];
}

export interface ProjectLinks {
  live?: string;
  source?: string;
}

interface ProjectBase {
  slug: string;
  title: string;
  /** Short category label, e.g. "Team project · Genpact internship". */
  kind: string;
  description: string;
  stack: string[];
  links?: ProjectLinks;
}

export interface Project extends ProjectBase {
  subtitle?: string;
  /** Documented personal contribution. */
  role?: string;
  highlights?: string[];
}

export interface EarlierProject extends ProjectBase {
  /** 16:10 card crop. Decorative: the card's button names the project. */
  thumbnail: ResponsiveImageSource;
  /** Full screenshot shown in the lightbox, with a descriptive alt text. */
  screenshot: Image;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface EducationItem {
  title: string;
  institution: string;
  institutionUrl?: string;
  location?: string;
  period?: string;
  /** Small badge, e.g. "Ongoing" or "Course". */
  badge?: string;
}

export interface Credential {
  title: string;
  issuer: string;
  year?: string;
}
