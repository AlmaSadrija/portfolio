# Alma Sadrija — Portfolio

Personal portfolio of Alma Sadrija, junior full-stack developer in Prishtina, Kosovo.

The site lives in [`site/`](site). It is a single page built with **React 19, TypeScript and Vite**,
pre-rendered to static HTML at build time and styled with CSS Modules. There are no UI libraries.

> The files at the repository root (`index.html`, `css/`, `js/`, `images/`, `styles.html`,
> `readme.txt`, the favicons and `CV .(-3).pdf`) are the **previous** site, built on the Luther
> template. The new site doesn't use them. They can be deleted once you've switched over.

## Run it locally

Requires Node.js 20.19+ or 22.12+.

```bash
cd site
npm install
npm run dev        # http://localhost:5173
```

| Command             | What it does                                                     |
| ------------------- | ---------------------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                               |
| `npm run build`     | Type-check, build and pre-render to `site/dist`                  |
| `npm run preview`   | Serve the production build locally                               |
| `npm run lint`      | Lint with oxlint                                                 |

## Editing content

All content is in two files. Components only render it.

- **`site/src/content/site.ts`**: name, job title, contact details, social links, languages, SEO
  title and description, and the public site URL.
- **`site/src/content/content.ts`**: all page copy, including the hero, About, experience,
  projects, skills, education and the contact text.

Common changes:

- **Add a project:** add an entry to `projects`. Add `links: { live: '…', source: '…' }` and the
  "Live demo" and "Source code" links appear automatically.
- **Add experience:** add an entry to `experience` (`type` can be `Internship`, `Full-time`,
  `Part-time`, `Freelance` or `Volunteer`). The Experience section and its nav link only render
  when the list has entries.
- **Update the CV:** replace `site/public/Alma-Sadrija_CV.pdf`. If the file name changes, update
  `cvFile` in `site.ts`.
- **Screenshots:** card thumbnails are 16:10 WebP images (480 and 960 px wide) in
  `site/src/assets/projects/`. Import them in `content.ts` like the existing ones.

Keep the content honest: only add claims your CV or real project material supports.

## Deploying

### GitHub Pages (set up in this repo)

`.github/workflows/deploy.yml` builds `site/` and publishes it on every push to `main`.

1. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
   If Pages currently serves the old site from the branch, this switches it to the new one.
2. Push to `main`. The site appears at `https://almasadrija.github.io/portfolio/`.

The workflow sets `BASE_PATH` and `SITE_URL` automatically, which also enables the canonical URL
and the social-preview image (`site/public/og-image.png`).

### Other static hosts (Netlify, Vercel, Cloudflare Pages)

Base directory `site`, build command `npm run build`, output directory `site/dist`. Set the
`SITE_URL` environment variable (e.g. `https://example.com/`) to enable social-preview tags.

## Credits

- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces),
  [Geist and Geist Mono](https://vercel.com/font), all under the SIL Open Font License, self-hosted
  via Fontsource.
- Icons adapted from [Lucide](https://lucide.dev) (ISC License).
