import type { AnchorHTMLAttributes } from 'react';
import { cx } from '../../lib/cx.ts';
import { Icon, type IconName } from '../Icon/Icon.tsx';
import styles from './ButtonLink.module.css';

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: IconName;
  iconPosition?: 'start' | 'end';
}

/** A link styled as a button (for navigation and downloads, not actions). */
export function ButtonLink({
  variant = 'primary',
  icon,
  iconPosition = 'end',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cx(styles.button, styles[variant], className)} {...props}>
      {icon && iconPosition === 'start' && <Icon name={icon} />}
      <span>{children}</span>
      {icon && iconPosition === 'end' && <Icon name={icon} className={styles.trailingIcon} />}
    </a>
  );
}
