import { useCallback, useSyncExternalStore } from 'react';
import { THEME_COLORS, THEME_STORAGE_KEY, type Theme } from '../lib/theme.ts';

// The initial theme is set before first paint by an inline script in <head>
// (see vite.config.ts); this hook reads and updates that same attribute.

const listeners = new Set<() => void>();

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  // Follow the OS setting until the visitor picks a theme themselves.
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystemChange = (event: MediaQueryListEvent) => {
    if (!readStoredTheme()) applyTheme(event.matches ? 'dark' : 'light');
  };
  media.addEventListener('change', onSystemChange);
  return () => {
    listeners.delete(listener);
    media.removeEventListener('change', onSystemChange);
  };
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

/** The server can't know the visitor's theme, so it renders a neutral state. */
const getServerSnapshot = (): Theme | null => null;

export function useTheme() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (e.g. private mode): the choice lasts for this visit.
    }
  }, []);

  return { theme, toggleTheme };
}
