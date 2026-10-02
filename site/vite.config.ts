import react from '@vitejs/plugin-react';
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite';
import { site } from './src/content/site.ts';
import { THEME_COLORS, THEME_STORAGE_KEY } from './src/lib/theme.ts';

// BASE_PATH: sub-path the site is served from, e.g. "/portfolio/" on GitHub Pages.
// SITE_URL:  absolute public URL; enables canonical and social-image tags.
const base = process.env.BASE_PATH || '/';
const siteUrl = process.env.SITE_URL || site.url;

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), headTags()],
});

/** Generates the <head> tags from src/content/site.ts, so copy lives in one place. */
function headTags(): Plugin {
  return {
    name: 'portfolio-head-tags',
    transformIndexHtml: {
      order: 'post',
      handler: (_html, { bundle }) => [
        { tag: 'title', children: site.title },
        meta('name', 'description', site.description),
        meta('name', 'author', site.name),
        meta('name', 'theme-color', THEME_COLORS.light),
        // Runs before first paint so the page never flashes the wrong theme.
        { tag: 'script', children: themeBootstrap() },
        ...socialTags(),
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: structuredData() },
        ...fontPreloads(Object.values(bundle ?? {})),
      ].map((tag): HtmlTagDescriptor => ({ injectTo: 'head', ...tag })),
    },
  };
}

function meta(key: 'name' | 'property', value: string, content: string): HtmlTagDescriptor {
  return { tag: 'meta', attrs: { [key]: value, content } };
}

function themeBootstrap(): string {
  return `(function () {
  var theme;
  try { theme = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}); } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = theme;
  var color = document.querySelector('meta[name="theme-color"]');
  if (color) color.setAttribute('content', theme === 'dark' ? ${JSON.stringify(THEME_COLORS.dark)} : ${JSON.stringify(THEME_COLORS.light)});
})();`;
}

function socialTags(): HtmlTagDescriptor[] {
  const tags = [
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', site.name),
    meta('property', 'og:title', site.title),
    meta('property', 'og:description', site.description),
    meta('property', 'og:locale', site.locale),
    meta('name', 'twitter:card', siteUrl ? 'summary_large_image' : 'summary'),
  ];
  // Crawlers need absolute URLs, so these are only emitted once the site URL is known.
  if (siteUrl) {
    const image = new URL(site.ogImage.file, siteUrl).href;
    tags.push(
      { tag: 'link', attrs: { rel: 'canonical', href: siteUrl } },
      meta('property', 'og:url', siteUrl),
      meta('property', 'og:image', image),
      meta('property', 'og:image:width', String(site.ogImage.width)),
      meta('property', 'og:image:height', String(site.ogImage.height)),
      meta('property', 'og:image:alt', site.ogImage.alt),
    );
  }
  return tags;
}

function structuredData(): string {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.jobTitle,
    ...(siteUrl && { url: siteUrl, image: new URL(site.ogImage.file, siteUrl).href }),
    email: `mailto:${site.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: site.university.name,
      url: site.university.url,
    },
    knowsLanguage: site.languages.map((language) => language.code),
    sameAs: site.socials.map((social) => social.href),
  };
  return JSON.stringify(person).replace(/</g, '\\u003c');
}

/** Preloads the two fonts used above the fold (production builds only). */
function fontPreloads(files: Array<{ type: string; fileName: string }>): HtmlTagDescriptor[] {
  const aboveTheFold = [/fraunces-latin-opsz-normal/, /geist-latin-wght-normal/];
  return files
    .filter((file) => file.type === 'asset' && aboveTheFold.some((pattern) => pattern.test(file.fileName)))
    .map((file) => ({
      tag: 'link',
      attrs: { rel: 'preload', href: base + file.fileName, as: 'font', type: 'font/woff2', crossorigin: true },
    }));
}
