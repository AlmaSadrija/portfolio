import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { site } from '../../content/site.ts';
import { useActiveSection } from '../../hooks/useActiveSection.ts';
import { useScrolledPast } from '../../hooks/useScrolledPast.ts';
import { cx } from '../../lib/cx.ts';
import { publicUrl } from '../../lib/paths.ts';
import { Icon } from '../Icon/Icon.tsx';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle.tsx';
import styles from './Header.module.css';

export interface NavItem {
  id: string;
  label: string;
}

/** Must match the `max-width` breakpoint in Header.module.css. */
const DESKTOP_QUERY = '(min-width: 56rem)';

export function Header({ items }: { items: NavItem[] }) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveSection(ids);
  const scrolled = useScrolledPast(8);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;

    const close = () => setMenuOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      close();
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    desktop.addEventListener('change', close);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      desktop.removeEventListener('change', close);
    };
  }, [menuOpen]);

  const cvUrl = publicUrl(site.cvFile);

  return (
    <header
      ref={headerRef}
      className={cx(styles.header, (scrolled || menuOpen) && styles.raised)}
      data-menu-open={menuOpen || undefined}
    >
      <div className={cx('container', styles.inner)}>
        <a href="#top" className={styles.brand}>
          {site.name}
          <span className={styles.brandDot} aria-hidden="true">
            .
          </span>
        </a>

        <nav className={styles.nav} aria-label="Main">
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
            <span className="visually-hidden">Menu</span>
          </button>

          <ul id={menuId} className={styles.links}>
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={styles.link}
                  aria-current={activeId === item.id ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className={styles.menuOnly}>
              <a href={cvUrl} download className={styles.link} onClick={() => setMenuOpen(false)}>
                Download CV
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <a href={cvUrl} download className={styles.cv}>
            <Icon name="download" size={16} />
            CV
          </a>
        </div>
      </div>
    </header>
  );
}
