import type { ReactNode } from 'react';

import './StatsCard.css';

export interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'cyan';
  subtitle?: string;
  trend?: string;
  onClick?: () => void;
}

export function StatsCard({
  title,
  value,
  icon,
  color,
  subtitle,
  trend,
  onClick,
}: StatsCardProps) {
  const className = [
    'stats-card',
    `stats-card--${color}`,
    onClick ? 'stats-card--interactive' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <div className="stats-card-background" />

      <div className="stats-card-orb" />

      <div className="stats-card-shine" />

      <div className="stats-card-content">
        <div className="stats-card-top">
          <div className="stats-card-icon">{icon}</div>

          {trend && (
            <span className="stats-card-trend">
              <span className="stats-card-trend-dot" />

              {trend}
            </span>
          )}
        </div>

        <div className="stats-card-value">{value}</div>

        <div className="stats-card-title">{title}</div>

        {subtitle && <div className="stats-card-subtitle">{subtitle}</div>}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button className={className} onClick={onClick} type="button">
        {content}
      </button>
    );
  }

  return <article className={className}>{content}</article>;
}
