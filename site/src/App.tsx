import type { ComponentType } from 'react';
import { Footer } from './components/Footer/Footer.tsx';
import { Header, type NavItem } from './components/Header/Header.tsx';
import type { SectionProps } from './components/Section/Section.tsx';
import { experience } from './content/content.ts';
import { About } from './sections/About/About.tsx';
import { Contact } from './sections/Contact/Contact.tsx';
import { Education } from './sections/Education/Education.tsx';
import { Experience } from './sections/Experience/Experience.tsx';
import { Hero } from './sections/Hero/Hero.tsx';
import { Projects } from './sections/Projects/Projects.tsx';
import { Skills } from './sections/Skills/Skills.tsx';

interface PageSection extends NavItem {
  Component: ComponentType<SectionProps>;
}

/** Page order and navigation in one list, so ids and nav links stay in sync. */
const sections: PageSection[] = [
  { id: 'about', label: 'About', Component: About },
  ...(experience.length > 0 ? [{ id: 'experience', label: 'Experience', Component: Experience }] : []),
  { id: 'projects', label: 'Projects', Component: Projects },
  { id: 'skills', label: 'Skills', Component: Skills },
  { id: 'education', label: 'Education', Component: Education },
  { id: 'contact', label: 'Contact', Component: Contact },
];

const navItems: NavItem[] = sections.map(({ id, label }) => ({ id, label }));

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header items={navItems} />
      <main id="main" tabIndex={-1}>
        <Hero />
        {sections.map(({ id, Component }) => (
          <Component key={id} id={id} />
        ))}
      </main>
      <Footer />
    </>
  );
}
