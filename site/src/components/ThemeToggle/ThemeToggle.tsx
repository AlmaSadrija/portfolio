import { useTheme } from '../../hooks/useTheme.ts';
import { Icon } from '../Icon/Icon.tsx';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  // `theme` is null during pre-rendering; both icons are rendered and CSS shows
  // the right one, so the markup never depends on the visitor's theme.
  const label = theme ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme` : 'Toggle color theme';

  return (
    <button type="button" className={styles.toggle} onClick={toggleTheme} aria-label={label} title={label}>
      <Icon name="moon" className={styles.moon} />
      <Icon name="sun" className={styles.sun} />
    </button>
  );
}
