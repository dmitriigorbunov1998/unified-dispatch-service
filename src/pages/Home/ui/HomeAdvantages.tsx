import { ArrowRight, Bot, CheckCircle2, Play } from 'lucide-react';

import type { Translate } from '@/shared/config/i18n';
import { AppButton } from '@/shared/ui/AppButton';

export function HomeAdvantages({ t }: { t: Translate }) {
  return (
    <section className="landing-section landing-section--dark" id="benefits">
      <div className="landing-container landing-showcase">
        <div className="landing-showcase-content">
          <span className="landing-section-eyebrow">
            {t('home.advantages.eyebrow')}
          </span>
          <h2>
            {t('home.advantages.titleFirst')}
            <br />
            {t('home.advantages.titleSecond')}
          </h2>
          <p>{t('home.advantages.description')}</p>

          <ul className="landing-check-list">
            {[
              'home.advantages.authorization',
              'home.advantages.filters',
              'home.advantages.logs',
              'home.advantages.statistics',
            ].map((key) => (
              <li key={key}>
                <CheckCircle2 size={18} />
                {t(key)}
              </li>
            ))}
          </ul>

          <AppButton to="/dashboard">
            {t('home.actions.openDashboard')}
            <ArrowRight size={19} />
          </AppButton>
        </div>

        <DashboardPreview t={t} />
      </div>
    </section>
  );
}

function DashboardPreview({ t }: { t: Translate }) {
  const stats = [
    ['1248', t('dashboard.stats.total')],
    ['23', t('home.preview.inProgress')],
    ['1156', t('home.preview.completed')],
    ['12', t('dashboard.stats.errors')],
  ];

  return (
    <div className="landing-dashboard-preview" aria-hidden="true">
      <div className="landing-preview-header">
        <div className="landing-preview-dots">
          <span />
          <span />
          <span />
        </div>
        <span>EDS Manager</span>
      </div>

      <div className="landing-preview-body">
        <aside className="landing-preview-sidebar">
          <div className="landing-preview-sidebar-logo">
            <Bot size={19} />
          </div>
          <span className="is-active" />
          <span />
          <span />
          <span />
        </aside>

        <div className="landing-preview-content">
          <div className="landing-preview-title">
            <div>
              <span />
              <span />
            </div>
            <div className="landing-preview-run">
              <Play size={14} />
            </div>
          </div>

          <div className="landing-preview-stats">
            {stats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="landing-preview-panels">
            <div className="landing-preview-chart">
              <div className="landing-preview-panel-title" />
              <span style={{ width: '88%' }} />
              <span style={{ width: '65%' }} />
              <span style={{ width: '43%' }} />
            </div>
            <div className="landing-preview-logs">
              <div className="landing-preview-panel-title" />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
