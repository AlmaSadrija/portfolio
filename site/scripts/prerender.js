// Injects the server-rendered app into dist/index.html after `vite build`, so the
// page is complete HTML for visitors, search engines and link previews before
// any JavaScript runs. React then hydrates it in the browser (src/main.tsx).
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const htmlPath = `${root}dist/index.html`;
const serverEntry = pathToFileURL(`${root}dist-ssr/entry-server.js`).href;
const placeholder = '<!--app-html-->';

const { render } = await import(serverEntry);
const template = await readFile(htmlPath, 'utf8');

if (!template.includes(placeholder)) {
  throw new Error(`${placeholder} not found in dist/index.html`);
}

// A replacer function keeps "$" sequences in the markup from being treated as patterns.
await writeFile(htmlPath, template.replace(placeholder, () => render()));
console.log('Pre-rendered dist/index.html');
