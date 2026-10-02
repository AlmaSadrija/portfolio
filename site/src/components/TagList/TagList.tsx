import { cx } from '../../lib/cx.ts';
import styles from './TagList.module.css';

interface TagListProps {
  items: string[];
  /** Accessible name for the list, e.g. "MediSlot tech stack". */
  label?: string;
  size?: 'md' | 'sm';
  className?: string;
}

export function TagList({ items, label, size = 'md', className }: TagListProps) {
  return (
    <ul className={cx(styles.list, styles[size], className)} aria-label={label}>
      {items.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  );
}
