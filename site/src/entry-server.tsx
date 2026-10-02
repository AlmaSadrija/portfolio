import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

/** Renders the page to static HTML at build time (see scripts/prerender.js). */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
