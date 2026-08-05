import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock3,
  ListChecks,
  LoaderCircle,
  MapPin,
  Play,
  RotateCcw,
  ScrollText,
  Trash2,
  XCircle,
  Zap,
} from 'lucide-react';

import { StatsCard } from '@/widgets/StatsCard/StatsCard';
import { AppButton } from '@/shared/ui/AppButton/AppButton';
import type { DashboardProps } from './Dashboard.types';

import './Dashboard.css';

export function Dashboard({
  districts,
  error,
  isClearingLogs,
  isRunning,
  logs,
  logsContentRef,
  totalApplications,
  t,
  onClearLogs,
  onStart,
}: DashboardProps) {
  return (
    <div className="dashboard">
      <section className="dashboard-hero">
        <div className="dashboard-hero-content">
          <div className="dashboard-hero-icon">
            <Zap size={24} />
          </div>

          <div>
            <h1 className="dashboard-hero-title">{t('dashboard.title')}</h1>

            <p className="dashboard-hero-desc">{t('dashboard.description')}</p>
          </div>
        </div>

        <div
          className={[
            'dashboard-status-badge',
            isRunning
              ? 'dashboard-status-badge--running'
              : 'dashboard-status-badge--idle',
          ].join(' ')}
        >
          {isRunning ? (
            <LoaderCircle className="dashboard-spinner" size={16} />
          ) : (
            <Clock3 size={16} />
          )}

          <span>{isRunning ? t('script.running') : t('status.idle')}</span>
        </div>
      </section>

      <section className="automation-panel">
        <div className="automation-panel-header">
          <div className="automation-panel-heading">
            <span className="dashboard-eyebrow">{t('automation.eyebrow')}</span>

            <h2 className="dashboard-section-title">{t('automation.title')}</h2>

            <p className="automation-panel-description">
              {t('automation.description')}
            </p>
          </div>

          <AppButton
            className="automation-start-button"
            disabled={isRunning}
            onClick={onStart}
            type="button"
          >
            {isRunning ? (
              <LoaderCircle className="dashboard-spinner" size={19} />
            ) : (
              <Play size={19} fill="currentColor" />
            )}

            <span>{isRunning ? t('script.running') : t('script.start')}</span>
          </AppButton>
        </div>

        {error && (
          <div className="automation-error" role="alert">
            <AlertCircle size={19} />

            <span>{error}</span>
          </div>
        )}

        <div className="automation-logs">
          <div className="automation-logs-header">
            <div className="automation-logs-heading">
              <div className="automation-logs-icon">
                <ScrollText size={19} />
              </div>

              <div>
                <h3>{t('logs.title')}</h3>

                <span>{t('logs.entries', { count: logs.length })}</span>
              </div>
            </div>

            <AppButton
              className="automation-clear-button"
              disabled={logs.length === 0 || isClearingLogs}
              onClick={onClearLogs}
              type="button"
              variant="danger"
            >
              {isClearingLogs ? (
                <RotateCcw className="dashboard-spinner" size={16} />
              ) : (
                <Trash2 size={16} />
              )}

              <span>{t('logs.clear')}</span>
            </AppButton>
          </div>

          <div
            ref={logsContentRef}
            className="automation-logs-content"
            aria-live="polite"
          >
            {logs.length === 0 ? (
              <div className="automation-logs-empty">
                <div className="automation-logs-empty-icon">
                  <ScrollText size={28} />
                </div>

                <strong>{t('logs.emptyTitle')}</strong>

                <span>{t('logs.emptyDescription')}</span>
              </div>
            ) : (
              <ol className="automation-log-list">
                {logs.map((log, index) => (
                  <li className="automation-log-item" key={`${index}-${log}`}>
                    <span className="automation-log-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <code>{log}</code>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <span className="dashboard-eyebrow">{t('districts.eyebrow')}</span>

            <h2 className="dashboard-section-title">{t('districts.title')}</h2>
          </div>

          <div className="dashboard-section-total">
            <ListChecks size={17} />

            <span>{t('districts.total', { count: totalApplications })}</span>
          </div>
        </div>

        <div className="district-stats-grid">
          {districts.map((district) => (
            <StatsCard
              key={district.id}
              title={t(district.nameKey)}
              value={district.applicationsCount}
              subtitle={t('districts.applications')}
              trend={t('dashboard.stats.waiting')}
              icon={<MapPin size={20} />}
              color={district.color}
            />
          ))}

          <StatsCard
            title={t('districts.selected')}
            value={districts.length}
            subtitle={t('districts.selectedDescription')}
            icon={<Building2 size={20} />}
            color="green"
          />
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <span className="dashboard-eyebrow">{t('statistics.eyebrow')}</span>

            <h2 className="dashboard-section-title">{t('statistics.title')}</h2>
          </div>
        </div>

        <div className="dashboard-stats">
          <StatsCard
            title={t('dashboard.stats.total')}
            value={totalApplications}
            subtitle={t('dashboard.stats.currentRun')}
            icon={<ListChecks size={20} />}
            color="blue"
          />

          <StatsCard
            title={t('dashboard.stats.success')}
            value={0}
            subtitle={t('dashboard.stats.notProcessed')}
            icon={<CheckCircle2 size={20} />}
            color="green"
          />

          <StatsCard
            title={t('dashboard.stats.skipped')}
            value={0}
            subtitle={t('dashboard.stats.notProcessed')}
            icon={<Clock3 size={20} />}
            color="yellow"
          />

          <StatsCard
            title={t('dashboard.stats.errors')}
            value={error ? 1 : 0}
            subtitle={
              error
                ? t('dashboard.stats.errorDetected')
                : t('dashboard.stats.noErrors')
            }
            icon={<XCircle size={20} />}
            color="red"
          />

          <StatsCard
            title={t('dashboard.stats.session')}
            value={isRunning ? t('status.title') : t('status.idle')}
            subtitle={isRunning ? t('script.running') : t('script.ready')}
            icon={<Clock3 size={20} />}
            color="cyan"
          />
        </div>
      </section>
    </div>
  );
}
