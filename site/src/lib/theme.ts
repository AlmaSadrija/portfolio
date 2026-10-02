/**
 * Theme constants shared by the app and vite.config.ts.
 * Keep this file free of DOM access so it can be imported in Node.
 */
export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

/** Page background per theme. Keep in sync with --color-bg in src/styles/global.css. */
export const THEME_COLORS: Record<Theme, string> = {
  light: '#f6f4ef',
  dark: '#121110',
};
