/**
 * All page copy, in one place.
 *
 * Source of truth: Alma's current CV (public/Alma-Sadrija_CV.pdf). The "earlier
 * frontend work" entries come from her previous portfolio and screenshots.
 * Only add claims that the CV or real project material supports.
 */
import portrait from '../assets/profile/alma-sadrija.webp';
import arianaNila480 from '../assets/projects/ariana-nila-480.webp';
import arianaNila960 from '../assets/projects/ariana-nila-960.webp';
import arianaNilaFull from '../assets/projects/ariana-nila-full.webp';
import natours480 from '../assets/projects/natours-480.webp';
import natours960 from '../assets/projects/natours-960.webp';
import natoursFull from '../assets/projects/natours-full.webp';
import nexter480 from '../assets/projects/nexter-480.webp';
import nexter960 from '../assets/projects/nexter-960.webp';
import nexterFull from '../assets/projects/nexter-full.webp';
import trillo480 from '../assets/projects/trillo-480.webp';
import trillo960 from '../assets/projects/trillo-960.webp';
import trilloFull from '../assets/projects/trillo-full.webp';
import { site } from './site.ts';
import type {
  Credential,
  EarlierProject,
  EducationItem,
  ExperienceItem,
  Fact,
  Image,
  Project,
  ResponsiveImageSource,
  SectionCopy,
  SkillGroup,
} from './types.ts';

/* ------------------------------------------------------------------ Hero */

export const hero = {
  eyebrow: 'Junior full-stack developer',
  lead: 'I build web applications from the interface to the API: React, Next.js and TypeScript on the frontend, FastAPI and Node.js on the backend.',
  summary:
    'Most recently a Full Stack Developer Intern at Genpact, where I led a team and helped build MediSlot, a clinic appointment platform.',
  status: 'Open to junior full-stack & frontend roles',
  portrait: {
    src: portrait,
    width: 413,
    height: 413,
    alt: 'Portrait of Alma Sadrija',
  } satisfies Image,
};

/* ----------------------------------------------------------------- About */

export const about: SectionCopy & { paragraphs: string[]; facts: Fact[] } = {
  title: 'From CSS layouts to full-stack apps',
  paragraphs: [
    'I’m a Computer and Software Engineering student at the University of Prishtina, based in Prishtina, Kosovo. On the web, I started with HTML, CSS and Sass, building responsive layouts and a WordPress site, then moved on to JavaScript, React and Next.js on the frontend and Node.js, FastAPI and Spring Boot on the backend.',
    'From March to July 2026, I was a Full Stack Developer Intern at Genpact, working remotely. As team lead, I coordinated tasks, supported teammates and helped drive technical decisions while we built MediSlot, a scheduling platform for medical clinics.',
    'I’m used to working in Git and GitHub with code reviews, testing APIs with Postman and pytest, and keeping code clean through refactoring. Next, I’m looking for a junior full-stack role in a collaborative team.',
  ],
  facts: [
    { label: 'Based in', value: `${site.location.city}, ${site.location.country}` },
    { label: 'Studying', value: 'Computer and Software Engineering, University of Prishtina' },
    { label: 'Latest role', value: 'Full Stack Developer Intern, Genpact (2026)' },
    {
      label: 'Languages',
      value: site.languages.map((language) => `${language.name} (${language.level})`).join(', '),
    },
    { label: 'Strengths', value: 'Ownership, leadership, teamwork, adaptability, analytical thinking' },
  ],
};

/* ------------------------------------------------------------ Experience */

export const experienceSection: SectionCopy = {
  title: 'Leading a team as a full-stack intern',
};

/** Rendered (and added to the navigation) only when it has entries. */
export const experience: ExperienceItem[] = [
  {
    role: 'Full Stack Developer Intern',
    organization: 'Genpact',
    type: 'Internship',
    location: 'Remote',
    start: { label: 'Mar 2026', date: '2026-03' },
    end: { label: 'Jul 2026', date: '2026-07' },
    duration: '5 months',
    highlights: [
      'Served as team lead: coordinated tasks, supported teammates and helped drive technical decisions throughout the internship.',
      'Built MediSlot with the team: a scheduling platform for medical clinics with JWT authentication, REST APIs and data models in SQLAlchemy and Alembic.',
      'Shipped additional full-stack features with JavaScript, Node.js, Express and MongoDB; tested endpoints with Postman and debugged for reliability.',
      'Worked in Git and GitHub with code reviews, applying clean-code and refactoring practices across the codebase.',
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'Alembic',
      'Node.js',
      'Express',
      'MongoDB',
      'Postman',
    ],
  },
];

/* -------------------------------------------------------------- Projects */

export const projectsSection: SectionCopy = {
  title: 'Things I’ve built',
  intro:
    'A clinic platform built with a team, a tested and containerized REST API, and a JavaScript app, followed by my earlier frontend work.',
};

export const projects: Project[] = [
  {
    slug: 'medislot',
    title: 'MediSlot',
    subtitle: 'Medical appointment platform',
    kind: 'Team project · Genpact internship',
    description:
      'A full-stack booking platform for medical clinics, with an end-to-end flow from browsing doctors to managing appointments.',
    role: 'Team lead. I coordinated tasks, supported teammates and helped drive technical decisions.',
    highlights: [
      'JWT authentication and protected endpoints',
      'REST APIs built with FastAPI',
      'Data models with SQLAlchemy and Alembic migrations',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL'],
  },
  {
    slug: 'library-lending-api',
    title: 'Library Lending API',
    kind: 'Backend project',
    description: 'A REST API for library management, with CRUD endpoints and borrowing workflows.',
    highlights: [
      'API-key authentication',
      'Database migrations with Alembic',
      'Test coverage with pytest',
      'Containerized with Docker',
    ],
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'SQLite', 'Docker'],
  },
  {
    slug: 'forkify',
    title: 'Forkify',
    subtitle: 'Recipe search app',
    kind: 'Course project · The Complete JavaScript Course',
    description:
      'Searches recipes from a public REST API and renders the results dynamically with asynchronous JavaScript.',
    stack: ['JavaScript', 'REST API'],
  },
];

export const earlierWorkSection: SectionCopy = {
  title: 'Earlier frontend work',
  intro:
    'A WordPress site for a jewelry brand, plus three hand-coded layouts from the Advanced CSS and Sass course, all from before my full-stack work. Select a screenshot to see it full size.',
};

const thumbnail = (small: string, large: string): ResponsiveImageSource => ({
  src: large,
  srcSet: `${small} 480w, ${large} 960w`,
  width: 960,
  height: 600,
});

export const earlierWork: EarlierProject[] = [
  {
    slug: 'ariana-nila',
    title: 'Ariana Nila',
    kind: 'WordPress website',
    description:
      'A responsive website for a jewelry brand, presenting its collections and products with full-width campaign banners and social sharing.',
    stack: ['WordPress', 'Responsive design'],
    thumbnail: thumbnail(arianaNila480, arianaNila960),
    screenshot: {
      src: arianaNilaFull,
      width: 1447,
      height: 764,
      alt: 'Ariana Nila homepage: a full-width photo of a model wearing gold jewelry under the headline “You owe yourself this moment”, with share buttons for Facebook, X, email and Pinterest below.',
    },
  },
  {
    slug: 'natours',
    title: 'Natours',
    kind: 'Course project',
    description:
      'A responsive landing page for an adventure-tour company, with a full-screen hero, an angled section edge and a clear call to action.',
    stack: ['HTML', 'CSS', 'Sass'],
    thumbnail: thumbnail(natours480, natours960),
    screenshot: {
      src: natoursFull,
      width: 1598,
      height: 873,
      alt: 'Natours hero section: the headline “Outdoors is where life happens” and a “Discover our tours” button over a green-tinted mountain photo, with an angled bottom edge.',
    },
  },
  {
    slug: 'trillo',
    title: 'Trillo',
    kind: 'Course project',
    description:
      'A responsive hotel-booking interface with sidebar navigation, search, a photo gallery, amenities and guest reviews.',
    stack: ['HTML', 'CSS', 'Sass'],
    thumbnail: thumbnail(trillo480, trillo960),
    screenshot: {
      src: trilloFull,
      width: 1291,
      height: 929,
      alt: 'Trillo hotel page for “Hotel Las Palmas”: a sidebar with hotel, flight, car rental and tours links, a search bar, a three-photo gallery, an amenities list and guest review cards with ratings.',
    },
  },
  {
    slug: 'nexter',
    title: 'Nexter',
    kind: 'Course project',
    description:
      'A real-estate website for buying and selling homes, with a large hero, a top-realtors panel and a press section.',
    stack: ['HTML', 'CSS', 'Sass'],
    thumbnail: thumbnail(nexter480, nexter960),
    screenshot: {
      src: nexterFull,
      width: 1600,
      height: 874,
      alt: 'Nexter homepage: the headline “The ultimate personal freedom” with a “View our properties” button over a dark photo of a house, and a “Top 3 realtors” list on the right.',
    },
  },
];

/* ---------------------------------------------------------------- Skills */

export const skillsSection: SectionCopy = {
  title: 'Technologies I work with',
  intro: 'The languages, frameworks and tools I’ve used in my internship, projects and courses.',
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Sass / SCSS', 'HTML', 'CSS'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'Python', 'Java', 'Spring Boot', 'REST APIs', 'JWT authentication'],
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'SQLite', 'SQL', 'SQLAlchemy', 'Alembic', 'Mongoose'],
  },
  {
    title: 'Testing & tools',
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'pytest', 'Jira', 'Vercel', 'Claude Code'],
  },
  {
    title: 'Practices',
    skills: ['Code reviews', 'Automated testing', 'Database migrations', 'Clean code & refactoring'],
  },
];

/* ------------------------------------------------------------- Education */

export const educationSection: SectionCopy = {
  title: 'Education & certifications',
};

export const education: EducationItem[] = [
  {
    title: 'Bachelor of Computer and Software Engineering',
    institution: site.university.name,
    institutionUrl: site.university.url,
    location: `${site.location.city}, ${site.location.country}`,
    period: 'Ongoing',
  },
  {
    title: 'CS50: Introduction to Computer Science',
    institution: 'Harvard University',
    badge: 'Course',
  },
];

export const awards: Credential[] = [
  {
    title: 'Women in STEM Scholarship',
    issuer: 'Ministry of Education, Science, Technology and Innovation (MASHTI)',
    year: '2021',
  },
];

export const certifications: Credential[] = [
  { title: 'FastAPI — The Complete Course', issuer: 'Udemy', year: '2026' },
  { title: 'Spring Boot 3 & Spring Framework 6 with Java', issuer: 'Udemy', year: '2026' },
  { title: 'The Complete SQL Bootcamp', issuer: 'Udemy', year: '2026' },
  { title: 'The Git & GitHub Bootcamp', issuer: 'Udemy', year: '2026' },
  { title: 'The Complete Python Bootcamp', issuer: 'Udemy', year: '2025' },
  { title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp', issuer: 'Udemy', year: '2025' },
  { title: 'React — The Complete Guide (incl. Hooks, Redux, React Router & Next.js)', issuer: 'Udemy', year: '2025' },
  { title: 'The Complete JavaScript Course: From Zero to Expert!', issuer: 'Udemy', year: '2025' },
  { title: 'Advanced CSS and Sass: Flexbox, Grid, Animations and More!', issuer: 'Udemy' },
];

/* --------------------------------------------------------------- Contact */

export const contactSection: SectionCopy = {
  title: 'Hiring a junior developer?',
  intro:
    'I’m open to junior full-stack and frontend roles in a collaborative team. Email is the quickest way to reach me.',
};
