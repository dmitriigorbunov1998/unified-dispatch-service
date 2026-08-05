import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './AppButton.css';

type AppButtonVariant = 'primary' | 'secondary' | 'danger';

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  href?: string;
  to?: string;
  variant?: AppButtonVariant;
}

export function AppButton({
  children,
  className = '',
  href,
  to,
  type = 'button',
  variant = 'primary',
  ...buttonProps
}: AppButtonProps) {
  const classes = `app-button app-button--${variant} ${className}`.trim();

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...buttonProps}>
      {children}
    </button>
  );
}
